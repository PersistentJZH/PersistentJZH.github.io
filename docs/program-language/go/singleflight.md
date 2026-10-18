---
title: Go singleflight
createTime: 2026/05/25 16:10:37
permalink: /program-language/go/singleflight/
---

# Go singleflight 使用笔记

`golang.org/x/sync/singleflight` 是 Go 官方扩展库 `x/sync` 里的一个小工具，用来做 **重复调用抑制**。

它解决的典型问题是：同一时刻有很多 goroutine 请求同一个资源，例如同一个用户信息、同一份配置、同一个热点缓存 key。如果每个请求都去查数据库、调用 RPC 或重新计算，就会把后端打爆。`singleflight` 可以保证同一个 key 在同一时间只有一个函数真正执行，其他重复调用等待这个执行结果，然后一起返回。

一句话概括：

> `singleflight` 不是缓存，它只负责把同一时间、同一个 key 的重复请求合并成一次执行。

## 安装

`singleflight` 不在 Go 标准库里，需要引入 `golang.org/x/sync` 模块：

```bash
go get golang.org/x/sync
```

使用时导入：

```go
import "golang.org/x/sync/singleflight"
```

## 核心 API

`singleflight` 的公开 API 很少，主要是一个 `Group` 和三个方法：

```go
type Group struct {}

func (g *Group) Do(key string, fn func() (any, error)) (v any, err error, shared bool)
func (g *Group) DoChan(key string, fn func() (any, error)) <-chan Result
func (g *Group) Forget(key string)
```

`Result` 是 `DoChan` 返回的结果结构：

```go
type Result struct {
	Val    any
	Err    error
	Shared bool
}
```

字段含义：

- `Val`：真正执行函数返回的值。
- `Err`：真正执行函数返回的错误。
- `Shared`：这个结果是否被多个调用者共享。

## 基本用法

先看一个最小例子。假设有 10 个 goroutine 同时加载同一个 key，实际的慢操作只会执行一次。

```go
package main

import (
	"fmt"
	"sync"
	"sync/atomic"
	"time"

	"golang.org/x/sync/singleflight"
)

func main() {
	var g singleflight.Group
	var calls int32

	var wg sync.WaitGroup
	start := make(chan struct{})
	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func(id int) {
			defer wg.Done()
			<-start

			v, err, shared := g.Do("user:1001", func() (any, error) {
				atomic.AddInt32(&calls, 1)
				time.Sleep(500 * time.Millisecond)
				return "user-info", nil
			})
			if err != nil {
				fmt.Println("error:", err)
				return
			}

			fmt.Printf("goroutine=%d value=%s shared=%v\n", id, v.(string), shared)
		}(i)
	}

	close(start)
	wg.Wait()
	fmt.Println("real calls:", calls)
}
```

输出里的 `real calls` 通常是 `1`，说明真正的慢函数只执行了一次。

`Do` 的执行过程大致是：

1. 第一个 goroutine 用 key 注册一次正在执行的调用。
2. 后续 goroutine 发现这个 key 已经在执行，就不再调用自己的 `fn`。
3. 第一个调用执行完成后，所有等待者拿到同一份 `Val` 和 `Err`。
4. 这个 key 从 `Group` 内部删除，下一轮请求可以重新执行。

## 用在缓存回源场景

`singleflight` 最常见的用法是配合缓存，防止热点 key 失效时大量请求同时回源。

下面是一个简化的读缓存流程：

```go
package service

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"golang.org/x/sync/singleflight"
)

type User struct {
	ID   int64
	Name string
}

type UserService struct {
	sf singleflight.Group
}

func (s *UserService) GetUser(ctx context.Context, id int64) (*User, error) {
	cacheKey := fmt.Sprintf("user:%d", id)

	// 1. 先查缓存。命中缓存时不需要进入 singleflight。
	if data, ok := getFromCache(ctx, cacheKey); ok {
		var user User
		if err := json.Unmarshal(data, &user); err == nil {
			return &user, nil
		}
	}

	// 2. 缓存未命中时，对同一个 cacheKey 的回源请求只执行一次。
	v, err, _ := s.sf.Do(cacheKey, func() (any, error) {
		// 双重检查：等待期间可能已有其他请求把数据写回缓存。
		if data, ok := getFromCache(ctx, cacheKey); ok {
			var user User
			if err := json.Unmarshal(data, &user); err == nil {
				return &user, nil
			}
		}

		user, err := queryUserFromDB(ctx, id)
		if err != nil {
			return nil, err
		}

		data, err := json.Marshal(user)
		if err == nil {
			setCache(ctx, cacheKey, data, 5*time.Minute)
		}

		return user, nil
	})
	if err != nil {
		return nil, err
	}

	return v.(*User), nil
}
```

这里有两个关键点：

- 缓存命中时直接返回，不走 `singleflight`，避免额外锁竞争。
- `fn` 内部再查一次缓存，避免等待期间别人已经把缓存写回，而当前 goroutine 仍然重复回源。

`singleflight` 只合并同一进程内的并发请求。如果服务部署了多个实例，每个实例都有自己的 `Group`，它不能跨进程、跨机器合并请求。分布式场景仍然需要缓存、限流、分布式锁或请求队列等手段一起配合。

## Do 的 shared 字段

`Do` 的第三个返回值 `shared` 表示结果是否被多个调用者共享：

```go
v, err, shared := g.Do(key, func() (any, error) {
	return loadData(), nil
})
```

注意：`shared == true` 不等于“当前调用者一定是等待者”。它的含义是这次执行结果被多个调用者使用了。第一个真正执行 `fn` 的调用者，如果执行期间有其他调用者加入等待，它拿到的 `shared` 也会是 `true`。

这个字段一般用于观测和日志，例如统计有多少请求被合并：

```go
if shared {
	metrics.SingleflightSharedTotal.Inc()
}
```

业务逻辑通常不应该依赖 `shared` 做分支，否则代码会和并发时序强绑定，变得难以推理。

## 使用 DoChan 支持超时等待

`Do` 是阻塞式调用。如果调用方希望自己最多等一段时间，可以使用 `DoChan` 配合 `context`：

```go
func GetWithTimeout(ctx context.Context, g *singleflight.Group, key string) (string, error) {
	resultCh := g.DoChan(key, func() (any, error) {
		time.Sleep(2 * time.Second)
		return "value", nil
	})

	select {
	case res := <-resultCh:
		if res.Err != nil {
			return "", res.Err
		}
		return res.Val.(string), nil
	case <-ctx.Done():
		return "", ctx.Err()
	}
}
```

需要注意的是：调用方超时返回，不代表底层 `fn` 会自动停止。`DoChan` 返回的 channel 也不会被关闭，它只会收到一次结果。

如果底层操作需要被取消，应该在 `fn` 里使用可取消的 `context`。但这也要谨慎设计：如果第一个请求的 context 很快取消，而很多后续请求正在等待，那么它们可能一起拿到取消错误。实际项目里常见做法是给回源操作单独设置合理的 timeout，而不是直接复用某个短生命周期 HTTP 请求的 context。

## 使用 Forget 放弃等待旧调用

`Forget` 会让 `Group` 忘记某个 key。之后新的 `Do` 调用不会再等待旧的 in-flight 调用，而是会启动一次新的执行。

```go
var g singleflight.Group

func ReloadConfig(ctx context.Context, name string) (*Config, error) {
	resultCh := g.DoChan(name, func() (any, error) {
		return loadRemoteConfig(ctx, name)
	})

	select {
	case res := <-resultCh:
		if res.Err != nil {
			return nil, res.Err
		}
		return res.Val.(*Config), nil
	case <-ctx.Done():
		// 当前调用不再等待；后续同 key 调用可以重新执行自己的 fn。
		g.Forget(name)
		return nil, ctx.Err()
	}
}
```

`Forget` 不是取消已经开始执行的函数。它只影响之后进来的同 key 调用：新调用会重新执行自己的 `fn`，而不是继续排队等待旧调用。

常见使用场景：

- 某个 key 的回源调用卡住了，不希望新请求继续挂在旧调用上。
- 调用方已经知道旧结果没有价值，希望后续请求重新加载。
- 做手动刷新、配置重载等操作时，希望跳过已有的 in-flight 结果。

不要把 `Forget` 当成缓存删除。它删除的是 `singleflight.Group` 内部的 in-flight 状态，不会删除你的 Redis、本地缓存或数据库数据。

## key 应该怎么设计

`singleflight` 是否正确，核心取决于 key 是否正确。

好的 key 应该满足：同一个 key 的请求可以安全共享同一个结果。

例如：

```go
key := fmt.Sprintf("tenant:%s:user:%d", tenantID, userID)
```

不要只写：

```go
key := fmt.Sprintf("user:%d", userID)
```

如果系统是多租户的，或者结果和语言、地区、权限、AB 实验、查询参数有关，这些维度都应该进入 key。否则不同请求可能错误地共享结果。

常见 key 维度包括：

- 资源 ID，例如用户 ID、订单 ID、配置名。
- 租户、业务线、环境。
- 权限范围或调用方身份。
- 查询参数、分页参数、过滤条件。
- 影响结果的版本号或灰度标记。

## 和 sync.Once、锁、缓存的区别

`singleflight` 经常和 `sync.Once`、`sync.Mutex`、缓存混淆。它们解决的问题不同。

| 工具 | 解决的问题 | 是否重复执行 | 是否保存结果 |
| --- | --- | --- | --- |
| `sync.Once` | 某段逻辑在进程生命周期只执行一次 | 不重复 | 不直接提供结果缓存 |
| `sync.Mutex` | 保护临界区，避免并发读写冲突 | 取决于代码 | 不直接提供结果缓存 |
| 缓存 | 保存结果，减少后续访问成本 | 取决于缓存命中 | 保存结果 |
| `singleflight` | 合并同一时刻的重复调用 | 每轮 in-flight 只执行一次 | 不保存结果 |

所以热点数据读取的完整方案通常是：

```text
先查缓存 -> 未命中 -> singleflight 合并回源 -> 写入缓存 -> 返回结果
```

`singleflight` 位于缓存未命中的回源阶段。它不会替代缓存，只是降低缓存失效瞬间的并发压力。

## 常见坑

### 1. 把 singleflight 当缓存用

`singleflight` 的 key 在函数执行完成后就会从内部 map 删除。下一次请求即使 key 相同，也会重新执行。

如果希望后续请求复用结果，需要自己把结果写到缓存里。

### 2. 错误也会被共享

如果真正执行的 `fn` 返回错误，等待同一个 key 的调用者都会拿到同一个错误。

这对保护下游是好事，因为不会因为一次失败而瞬间放大成大量重试。但也意味着调用方要设计好错误重试策略，避免所有请求拿到错误后立刻一起重试，形成新的流量尖峰。

### 3. key 粒度过粗

key 粒度过粗会把不应该共享的请求合并在一起，导致数据串用。尤其是多租户、权限隔离、个性化结果场景，要特别小心。

### 4. key 粒度过细

key 粒度过细会导致合并效果很差。例如把 request id、trace id 这类每次请求都不同的字段放进 key，就几乎无法合并。

### 5. 一个全局 Group 管所有事情

`Group` 是一个命名空间。不同业务如果共用同一个 `Group`，key 又没有加业务前缀，就可能出现碰撞。

更推荐按业务域持有不同的 `Group`：

```go
type Service struct {
	userSF   singleflight.Group
	configSF singleflight.Group
}
```

或者在 key 里加清晰的前缀：

```go
key := "user:" + userID
```

### 6. 在 fn 里做太多无关工作

`fn` 的执行期间，同 key 的其他请求都会等待。因此 `fn` 里应该只放必须被合并的慢操作，不要把日志上报、复杂后处理、无关计算都塞进去。

## 适合使用的场景

`singleflight` 适合这些场景：

- 缓存击穿保护：热点 key 失效后合并回源。
- 配置加载：同一份远程配置只拉取一次。
- 元数据查询：服务发现、权限元数据、租户信息等短时间内重复读取。
- 昂贵计算：同一个参数的计算任务避免并发重复执行。
- 外部 API 调用：同一资源的短时间重复请求合并，降低第三方接口压力。

不适合这些场景：

- 需要跨进程合并请求。
- 需要长期保存结果。
- 需要严格队列、限速或并发数控制。
- 不同调用者不能共享结果。
- 每次请求都必须独立执行，例如扣费、下单、写操作。

## 小结

`singleflight` 的价值在于简单：它不关心缓存、不关心存储、不关心业务语义，只做一件事：同一时刻、同一个 key，只让一个函数执行。

使用时记住三个原则：

1. 它是重复调用抑制，不是缓存。
2. key 必须完整表达“哪些请求可以共享同一个结果”。
3. 它只在单进程内生效，分布式系统里要和缓存、限流、重试策略一起设计。

官方文档：

- [golang.org/x/sync/singleflight](https://pkg.go.dev/golang.org/x/sync/singleflight)
