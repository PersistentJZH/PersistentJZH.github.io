---
title: Go singleflight
createTime: 2026/05/25 16:10:37
permalink: /en/notes/program-language/go/singleflight/
sourceHash: ede9db5edabf29a94427679b3c9c572622bb1c5a0f2f81e7f4df6931ec78f5d9
---

# Notes on Go singleflight

`golang.org/x/sync/singleflight` is a small utility in Go's official `x/sync` extension library for **duplicate call suppression**.

Its typical use case is many goroutines requesting the same resource at once: the same user information, configuration, or hot cache key. If every request queries the database, calls an RPC, or repeats a calculation, the backend can be overwhelmed. `singleflight` ensures that only one function runs for a given key at a time. Duplicate callers wait for that execution's result and then return together.

In one sentence:

> `singleflight` is not a cache. It combines concurrent requests for the same key into one execution.

## Installation

`singleflight` is not part of Go's standard library. Add the `golang.org/x/sync` module:

```bash
go get golang.org/x/sync
```

Import it with:

```go
import "golang.org/x/sync/singleflight"
```

## Core API

`singleflight` has a small public API: a `Group` and three methods:

```go
type Group struct {}

func (g *Group) Do(key string, fn func() (any, error)) (v any, err error, shared bool)
func (g *Group) DoChan(key string, fn func() (any, error)) <-chan Result
func (g *Group) Forget(key string)
```

`Result` is the result structure returned by `DoChan`:

```go
type Result struct {
	Val    any
	Err    error
	Shared bool
}
```

The fields mean:

- `Val`: the value returned by the function that actually ran.
- `Err`: the error returned by that function.
- `Shared`: whether multiple callers shared this result.

## Basic Usage

Start with a minimal example. If ten goroutines load the same key at once, the actual slow operation runs only once.

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

The output's `real calls` is usually `1`, indicating that the slow function ran only once.

`Do` roughly follows these steps:

1. The first goroutine registers an in-flight call under the key.
2. Later goroutines see that the key is already running and do not invoke their own `fn`.
3. When the first call completes, all waiters receive the same `Val` and `Err`.
4. The key is removed from the `Group`, allowing the next round of requests to execute again.

## Loading from the Backend on Cache Misses

The most common use of `singleflight` is alongside a cache, preventing many requests from hitting the backend simultaneously when a hot key expires.

Here is a simplified cache-read flow:

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

	// 1. Check the cache first. A hit does not need to enter singleflight.
	if data, ok := getFromCache(ctx, cacheKey); ok {
		var user User
		if err := json.Unmarshal(data, &user); err == nil {
			return &user, nil
		}
	}

	// 2. On a miss, execute only one backend load for the same cacheKey.
	v, err, _ := s.sf.Do(cacheKey, func() (any, error) {
		// Double-check: another request may have filled the cache while we waited.
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

There are two key points:

- Return immediately on a cache hit, bypassing `singleflight` to avoid additional lock contention.
- Check the cache again inside `fn`, avoiding another backend load if somebody filled the cache while this goroutine was waiting.

`singleflight` combines concurrent requests only within one process. If a service has multiple instances, each has its own `Group`; it cannot combine calls across processes or machines. Distributed systems still need complementary mechanisms such as caching, rate limiting, distributed locks, or request queues.

## The shared Return Value of Do

The third return value of `Do`, `shared`, indicates whether multiple callers shared the result:

```go
v, err, shared := g.Do(key, func() (any, error) {
	return loadData(), nil
})
```

Note that `shared == true` does not mean that the current caller must have been a waiter. It means that multiple callers used this execution's result. The first caller, which actually executes `fn`, also receives `shared == true` if others join while it is running.

This field is generally useful for observability and logging, such as counting requests that were combined:

```go
if shared {
	metrics.SingleflightSharedTotal.Inc()
}
```

Business logic usually should not branch on `shared`; otherwise it becomes tightly coupled to concurrency timing and difficult to reason about.

## Using DoChan to Limit Waiting Time

`Do` blocks. If callers want to wait only for a limited time, they can combine `DoChan` with a `context`:

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

A caller returning on timeout does not automatically stop the underlying `fn`. The channel returned by `DoChan` is not closed either; it receives exactly one result.

If the underlying operation must support cancellation, use a cancelable `context` inside `fn`. Design this carefully: if the first request's context is canceled quickly while later requests are waiting, they may all receive a cancellation error. A common practical approach is to give the backend operation its own reasonable timeout instead of directly reusing a short-lived HTTP request's context.

## Using Forget to Stop Joining an Old Call

`Forget` makes the `Group` forget a key. Subsequent `Do` calls start a new execution instead of waiting for the old in-flight call.

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
		// This caller stops waiting; later calls with this key may run their own fn.
		g.Forget(name)
		return nil, ctx.Err()
	}
}
```

`Forget` does not cancel a function that has already started. It affects only subsequent calls with the same key: they execute their own `fn` instead of continuing to wait for the old call.

Common uses include:

- A backend load for a key is stuck, and new requests should not remain attached to it.
- The caller already knows the old result is no longer useful and wants subsequent requests to reload.
- A manual refresh or configuration reload should bypass an existing in-flight result.

Do not treat `Forget` as cache deletion. It removes in-flight state inside `singleflight.Group`; it does not delete Redis entries, local cache entries, or database data.

## Designing the Key

Correct use of `singleflight` depends primarily on choosing the right key.

A good key has this property: requests with the same key can safely share the same result.

For example:

```go
key := fmt.Sprintf("tenant:%s:user:%d", tenantID, userID)
```

Do not simply write:

```go
key := fmt.Sprintf("user:%d", userID)
```

If the system is multi-tenant, or results depend on language, region, permissions, A/B experiments, or query parameters, include those dimensions in the key. Otherwise different requests may incorrectly share results.

Common key dimensions include:

- Resource IDs, such as user IDs, order IDs, or configuration names.
- Tenant, business line, and environment.
- Permission scope or caller identity.
- Query parameters, pagination, and filters.
- Version numbers or rollout flags that affect the result.

## Differences from sync.Once, Locks, and Caches

`singleflight` is often confused with `sync.Once`, `sync.Mutex`, and caching. They solve different problems.

| Tool | Problem solved | Repeated execution? | Stores results? |
| --- | --- | --- | --- |
| `sync.Once` | Run logic only once during the process lifetime | No | Does not directly cache results |
| `sync.Mutex` | Protect a critical section against concurrent read/write conflicts | Depends on the code | Does not directly cache results |
| Cache | Store results to reduce the cost of later access | Depends on cache hits | Yes |
| `singleflight` | Combine duplicate concurrent calls | Once per in-flight round | No |

A complete approach for reading hot data therefore usually looks like this:

```text
Check cache -> Miss -> singleflight combines backend loads -> Populate cache -> Return result
```

`singleflight` operates during the backend-loading stage after a cache miss. It does not replace caching; it reduces the burst of concurrent work when cached data expires.

## Common Pitfalls

### 1. Treating singleflight as a Cache

A `singleflight` key is removed from the internal map when its function finishes. The next request executes again even if it uses the same key.

To reuse the result for later requests, store it in a cache yourself.

### 2. Errors Are Shared Too

If the executing `fn` returns an error, all callers waiting for the same key receive that error.

This helps protect downstream services by preventing one failure from immediately multiplying into many retries. However, callers still need a suitable retry policy; if every request retries immediately after receiving the error, another traffic spike results.

### 3. Keys That Are Too Broad

Overly broad keys combine requests that should not share results, causing data to be mixed between callers. Be particularly careful with multi-tenancy, permission boundaries, and personalized results.

### 4. Keys That Are Too Specific

Overly specific keys provide little deduplication. Including a request ID or trace ID that changes on every request makes combining requests almost impossible.

### 5. One Global Group for Everything

A `Group` is a namespace. Different business operations sharing one `Group` may collide if their keys lack business prefixes.

Prefer separate `Group` instances for different business domains:

```go
type Service struct {
	userSF   singleflight.Group
	configSF singleflight.Group
}
```

Alternatively, add clear prefixes to keys:

```go
key := "user:" + userID
```

### 6. Too Much Unrelated Work Inside fn

Other requests for the same key wait while `fn` runs. Include only the slow operation that needs deduplication; do not pack it with logging, complex post-processing, or unrelated calculations.

## Suitable Use Cases

`singleflight` works well for:

- Cache stampede protection: combine backend loads after a hot key expires.
- Configuration loading: fetch the same remote configuration only once.
- Metadata queries: repeated short-term reads of service discovery, permission metadata, or tenant information.
- Expensive calculations: avoid concurrent duplicate calculations with identical parameters.
- External API calls: combine repeated short-term requests for the same resource to reduce pressure on third-party APIs.

It is unsuitable when:

- Requests must be combined across processes.
- Results must be retained long term.
- Strict queuing, rate limiting, or concurrency limits are required.
- Different callers cannot share results.
- Every request must execute independently, as with charging, order placement, or writes.

## Summary

The value of `singleflight` is its simplicity. It knows nothing about caching, storage, or business semantics. It does one thing: allow only one function to run for the same key at the same time.

Remember three principles:

1. It suppresses duplicate calls; it is not a cache.
2. The key must fully express which requests can share a result.
3. It works only within one process. In distributed systems, design it together with caching, rate limiting, and retry policies.

Official documentation:

- [golang.org/x/sync/singleflight](https://pkg.go.dev/golang.org/x/sync/singleflight)
