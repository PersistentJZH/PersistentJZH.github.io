---
title: 'Kubernetes Checkpoint/Restore 深度解析：原理、实战与方案对比'
createTime: 2026/05/28 12:00:00
permalink: /k8s/k8s-checkpoint-restore/
---

# Kubernetes Checkpoint/Restore 深度解析：原理、实战与方案对比

## 一句话理解

Pod checkpoint / restore 的目标是把一个正在运行的容器状态保存下来，之后再从这个状态继续运行。它保存的不是简单的镜像，也不是普通的磁盘备份，而是运行时状态：进程树、内存页、寄存器、文件描述符、部分 socket 状态、namespace / cgroup 相关信息等。

可以把它理解成：

```text
普通重启：重新执行 entrypoint，应用从头启动
Checkpoint / Restore：把进程运行现场保存下来，之后从保存点继续执行
```

这类能力常见于几个场景：

1. **故障取证**：发现可疑容器时，把运行现场保存下来，后续离线分析内存、文件描述符和进程状态。
2. **长任务容错**：批处理、仿真、训练任务运行很久，节点维护或抢占前先保存状态。
3. **冷启动优化**：Java、模型服务、Notebook 等启动和预热很慢，先启动到某个状态，再通过 restore 快速拉起。
4. **Pod 迁移**：把运行中的 workload 从一个 Node 迁移到另一个 Node，理论上减少业务中断。
5. **资源调度**：低优先级任务被抢占时不直接杀掉，而是 checkpoint 后释放资源，之后再恢复。

但是需要先明确一个边界：**截至 2026-05，Kubernetes 原生提供的是 kubelet 级别的容器 checkpoint API，restore 还不是一个稳定、统一的 Kubernetes Pod API**。因此真正落地时，通常需要 CRIU、容器运行时、节点 Agent、对象存储或镜像仓库，以及上层控制器一起配合。

## 基本原理

Linux 容器本质上还是宿主机上的一组进程，只是被 namespace、cgroup、rootfs、seccomp、capabilities 等机制隔离。Checkpoint / Restore 的底层核心通常是 CRIU，即 Checkpoint/Restore In Userspace。

CRIU 在 checkpoint 时大致做几件事：

1. 找到目标进程树。
2. 冻结或暂停这些进程，避免状态继续变化。
3. 从 `/proc` 读取进程、线程、内存映射、文件描述符、socket、信号、凭据等信息。
4. 把内存页、寄存器、打开的文件、IPC、namespace 等状态写成一组 checkpoint 文件。
5. 解除冻结，让原进程继续运行，或者根据 runtime 参数停止原容器。

Restore 时则反过来：

1. 读取 checkpoint 文件。
2. 重新创建 namespace、cgroup、进程树和相关资源。
3. 恢复内存、寄存器、文件描述符、socket 等状态。
4. 让进程从 checkpoint 时的位置继续执行。

### CRIU 内部实现原理

上面只是概括了 CRIU 做了什么，下面深入它在内核层面是怎么实现的。

#### 1. 进程冻结（Freeze）

CRIU 使用 `ptrace` 或 cgroup freezer 来冻结目标进程：

```text
方式一：ptrace
  CRIU attach 到每个目标线程
  -> PTRACE_SEIZE 接管线程
  -> PTRACE_INTERRUPT 让线程停在内核态

方式二：cgroup freezer（更高效）
  echo FROZEN > /sys/fs/cgroup/<cgroup>/cgroup.freeze
  -> 内核调度器将该 cgroup 中的所有进程移出运行队列
  -> 进程进入不可中断睡眠（TASK_UNINTERRUPTIBLE），对应用透明
```

现代 CRIU 默认使用 cgroup freezer，因为它对进程透明且性能更好。冻结成功后，CRIU 可以从 `/proc` 安全读取进程状态而不用担心数据变化。

#### 2. 进程树发现

CRIU 通过 `/proc/<pid>/task/` 和 `/proc/<pid>/children` 递归发现所有线程和子进程：

```text
PID 1 (容器 init)
├── PID 10 (子进程 A)
│   ├── 线程 10 (主线程)
│   └── 线程 11 (工作线程)
└── PID 20 (子进程 B)
    └── 线程 20 (主线程)
```

CRIU 记录每个进程/线程的 PID、PPID、TGID、SID、PGID 等关系信息，确保 restore 时能精确重建进程树结构。

#### 3. 内存收集（核心）

这是 checkpoint 最重的一环。CRIU 通过以下步骤收集进程内存：

**Step 1 — 读取内存映射（VMA）**

```bash
cat /proc/<pid>/maps
```

输出类似：

```text
00400000-00401000 r-xp ... /usr/bin/app        # 代码段
00600000-00601000 r--p ... /usr/bin/app        # 只读数据
7f1234000000-7f1234021000 rwxp ... [heap]      # 堆
7ffe00000000-7ffe00021000 rw-p ... [stack]     # 栈
7f1230000000-7f1230020000 rwxp ... libc.so     # 共享库
```

CRIU 对每个 VMA 段记录：起始地址、结束地址、权限、映射文件路径、偏移量。

**Step 2 — 判断内存来源**

CRIU 将 VMA 分为两类，采用不同策略：

| 类型 | 判断条件 | dump 策略 |
|------|---------|----------|
| **文件映射（file-backed）** | VMA 有关联文件（如代码段、共享库的 .so 段） | 只保存对文件的引用 + 偏移，不保存文件内容本身 |
| **匿名映射（anonymous）** | 无关联文件（如堆、栈、mmap 匿名区） | 全量保存内存页内容 |

**Step 3 — 页面收集（Page Collection）**

CRIU 通过 `/proc/<pid>/mem` 或 `process_vm_readv` 系统调用读取每个内存页。

```text
/proc/<pid>/mem 方式：
  对于每个 VMA [start, end)：
    lseek 到 /proc/<pid>/mem 的 start 偏移
    read 读取 (end - start) 字节
```

CRIU 引入了 **Soft-Dirty 页面跟踪**机制来支持增量 checkpoint。启用后，内核标记哪些页面被写过，后续 checkpoint 只需保存脏页：

```bash
# 启用 soft-dirty tracking
echo 4 > /proc/<pid>/clear_refs

# 查看哪些页面被修改过
cat /proc/<pid>/pagemap  # bit 55 标记 soft-dirty
```

**Step 4 — 压缩和写入**

CRIU 使用 Google 的 snappy 或 zlib 对内存页压缩，写入 `.img` 文件。典型 checkpoint 输出目录结构：

```text
checkpoint-dir/
├── inventory.img          # 所有镜像文件的清单
├── pagemap-<pid>.img      # 页映射（哪些页在 page.img 中）
├── pages-<id>.img         # 实际内存页数据（压缩）
├── mm-<pid>.img           # 内存映射 / VMA 信息
├── core-<pid>.img         # 进程核心信息（寄存器、信号等）
├── ids-<pid>.img          # UID/GID 等凭据
├── fdinfo-<pid>.img       # 文件描述符信息
├── fs-<pid>.img           # 文件系统信息（cwd, root）
├── files.img              # 打开的文件注册表
├── pipes.img              # Pipe 和 FIFO 数据（未读内容）
├── unixsk.img             # Unix domain socket 信息
├── inetsk.img             # INET socket 信息
├── netns-<id>.img         # 网络 namespace
├── ns-files.img           # namespace 文件描述符
└── tcp-stream-<id>.img    # TCP 流中未读数据（如有）
```

#### 4. 文件描述符处理

CRIU 需要对各类 FD 做不同处理：

| FD 类型 | 处理方式 |
|---------|---------|
| **普通文件** | 记录文件路径和当前偏移量（lseek 位置） |
| **Pipe/FIFO** | 把 pipe 缓冲区内尚未读取的数据写入 `pipes.img` |
| **Unix Socket** | 记录 socket 类型（DGRAM/STREAM）、对端信息、缓冲区数据 |
| **TCP Socket** | 记录连接状态、序列号，已建立连接不能跨机器迁移（即使在同一网络 namespace 下也极难无侵入迁移） |
| **Epoll** | 记录 epoll 监听的 FD 集合和事件类型 |
| **Eventfd / signalfd / timerfd** | 记录当前值和状态 |

对于 TCP 已建立连接，CRIU 的做法是：在 checkpoint 时关闭连接并记录连接参数，restore 后**重新建立连接**（TCP repair 模式），这需要应用层支持重连逻辑。这就是为什么长连接应用很难做到透明 checkpoint。

#### 5. Namespace 保存

CRIU 逐类 namespace 保存：

```text
PID namespace:    记录进程在 namespace 内的 PID（在宿主机上可能是 12345，在容器内是 1）
Mount namespace:  记录挂载点、挂载选项、根文件系统
Network namespace:记录网卡、路由表、iptables 规则、socket 状态
IPC namespace:    记录 System V IPC（共享内存、信号量、消息队列）状态
UTS namespace:    记录 hostname 和 domainname
Cgroup namespace: 记录 cgroup 路径和层级
User namespace:   记录 UID/GID 映射
Time namespace:   记录 CLOCK_MONOTONIC 和 CLOCK_BOOTTIME 的偏移值
```

#### 6. Parasite Code 注入（关键技巧）

这是 CRIU 最精妙的设计之一。为了在目标进程的上下文中执行某些操作（如收集文件锁状态、恢复文件锁），CRIU 使用 **parasite code injection**：

```text
1. 用 ptrace 暂停目标进程
2. 在目标进程的地址空间中分配一小段内存
3. 把一段寄生代码（parasite blob）注入到该内存区
4. 修改进程指令寄存器，让进程执行寄生代码
5. 寄生代码执行完后触发 int3 / 断点，交还控制权给 CRIU
6. CRIU 恢复原来的寄存器状态和代码
```

寄生代码负责的操作包括：
- dump/restore 文件锁（`flock`, `fcntl` 锁）
- dump/restore POSIX 健壮互斥锁
- 获取 tty 信息
- dump fanotify / inotify 状态

#### 7. Restore 的内存恢复

Restore 时，CRIU 重建进程的关键是**不对应用代码产生可感知的副作用**：

```text
1. fork() 出子进程（将成为恢复后的进程）
2. 用 clone() 重建 namespace
3. 通过 /proc/<pid>/mem 将保存的内存页写回到对应虚拟地址
4. 通过 PTRACE_SETREGS 恢复 CPU 寄存器
5. 恢复 FPU/SSE/AVX 等扩展寄存器状态
6. 恢复信号处理表
7. 恢复文件描述符（SCM_RIGHTS 传递或重新打开）
8. 恢复定时器
9. 通过 prctl 恢复 seccomp 和 capabilities
10. PTRACE_DETACH 或 PTRACE_CONT 让进程继续执行
```

关键点：恢复后进程的指令指针（RIP）指向 checkpoint 时的位置。对进程来说，除了"暂停了一段时间"，感知不到其他变化。

放到 Kubernetes 里，典型链路如下：

```text
用户 / 控制器
  -> kubelet checkpoint API
  -> CRI Runtime，例如 CRI-O / containerd
  -> OCI Runtime，例如 runc / crun
  -> CRIU
  -> checkpoint archive
```

Kubernetes kubelet 暴露的接口是：

```text
POST /checkpoint/{namespace}/{pod}/{container}?timeout=<seconds>
```

成功后，checkpoint 文件默认会落到：

```text
/var/lib/kubelet/checkpoints/
```

文件名通常类似：

```text
checkpoint-<podFullName>-<containerName>-<timestamp>.tar
```

这里有一个容易忽略的点：**Kubernetes API 面向的是 Pod，但当前 kubelet checkpoint API 操作的是 Pod 里的某个 container**。如果一个 Pod 里有业务容器、sidecar、日志采集容器、服务网格代理，那么要做到完整 Pod 级别恢复，就必须处理多容器之间的一致性问题。

### Kubelet Checkpoint API 内部实现

了解 kubelet 内部是怎么处理一个 checkpoint 请求的，有助于理解它的能力边界和限制。

#### 请求处理流程

当 kubelet 收到 `POST /checkpoint/{namespace}/{pod}/{container}` 请求时，内部处理链路如下：

```text
HTTP Handler（kubelet server 10250 端口）
  │
  ├── 1. 认证 & 授权
  │     kubelet 使用 Bearer Token 或客户端证书认证
  │     Webhook 模式的 SubjectAccessReview 做授权
  │     需要 "nodes/proxy" 或类似权限
  │
  ├── 2. 参数解析
  │     从 URL path 提取 namespace, pod, container
  │     从 query string 提取 timeout
  │
  ├── 3. Pod 查找
  │     从 kubelet 的 Pod Manager（内存缓存）查找 Pod
  │     确认 Pod 存在于本节点且容器在其中
  │
  ├── 4. 调用 CRI（Container Runtime Interface）
  │     kubelet 调用 CRI gRPC 接口：
  │     runtimeService.CheckpointContainer(
  │       containerId,
  │       checkpointDir,    // /var/lib/kubelet/checkpoints
  │       timeout,
  │     )
  │
  ├── 5. 等待 CRI Runtime 完成
  │     CRI Runtime（CRI-O / containerd）具体执行：
  │     - 调用 OCI Runtime（runc/crun）的 checkpoint 能力
  │     - OCI Runtime 调用 CRIU 创建 checkpoint 文件
  │     - CRI Runtime 将 checkpoint 文件打包为 tar
  │
  └── 6. 返回结果
       成功：200，返回 tar 文件路径
       超时：408，kubelet 按 timeout 参数取消
       失败：500，返回错误信息
```

#### CRI gRPC 接口定义

kubelet 和 CRI Runtime 之间的协议是基于 protobuf 定义的。checkpoint 相关的核心消息结构（简化表示）：

```protobuf
// kubelet 向 CRI Runtime 发起的请求
message CheckpointContainerRequest {
  string container_id = 1;       // 目标容器的 CRI ID
  string location = 2;           // checkpoint 文件输出目录
  int64 timeout = 3;             // 超时时间（秒）
}

// CRI Runtime 的响应
message CheckpointContainerResponse {
  // checkpoint tar 文件的完整路径
  string archive_path = 1;
}
```

注意：**这个 CRI 接口只定义了 Checkpoint，没有定义 Restore**。Restore 在 CRI 层面没有一个对应的 `RestoreContainer` gRPC 方法。这也是为什么在 Kubernetes 内恢复需要曲线救国——把 checkpoint tar 转成带特殊 annotation 的 OCI 镜像，再用创建新 Pod 的方式触发恢复。

#### Containerd 如何实现 Checkpoint

以 containerd 为例，当它收到 kubelet 发来的 `CheckpointContainer` gRPC 请求后：

```text
containerd
  ├── 1. 找到容器对应的 shim 进程（containerd-shim-runc-v2）
  │     shim 是 containerd 和 runc 之间的桥梁进程
  │
  ├── 2. 通过 shim 的 ttrpc 接口发送 CheckpointTask 请求
  │
  ├── 3. shim 调用 runc checkpoint 子命令
  │     runc checkpoint --image-path /tmp/checkpoint <container-id>
  │
  ├── 4. runc 执行：
  │     a. 通过 runc init 进程向容器内进程发送 SIGSTOP（或使用 cgroup freezer）
  │     b. 调用 CRIU dump，传入所有 namespace fd、cgroup 路径等
  │     c. CRIU 创建所有 .img 文件到 --image-path 目录
  │
  ├── 5. containerd 将 image-path 目录打包为 tar.gz
  │
  └── 6. 将 tar.gz 移动到 kubelet 指定的 checkpointDir
```

#### 为什么 CRI-O 在 checkpoint 场景更常见

CRI-O 对 CRIU 的集成路径比 containerd 更直接：

1. CRI-O 和 runc 更紧密耦合，一些配置和路径优化绕过了 shim 层
2. CRI-O 的 checkpoint tar 格式直接兼容 `checkpointctl` 和 `buildah` 工具链
3. K8s checkpoint 的官方博客和文档大多以 CRI-O 作为示例 runtime

但 containerd 的 checkpoint 能力也在持续迭代，两者的差距在缩小。

### Checkpoint Image 格式详解

把 checkpoint tar 转成 OCI 容器镜像，是目前最主流的"在 Kubernetes 内恢复"的方式。理解这个镜像的格式很重要。

#### 普通镜像 vs Checkpoint 镜像

```text
普通 OCI 镜像：
  ├── manifest.json          # 镜像 manifest
  ├── config.json            # 容器配置（CMD, ENV, etc.）
  └── layers/
      ├── <sha256>/layer.tar # 根文件系统层
      └── ...

Checkpoint 镜像：
  ├── manifest.json          # 镜像 manifest，包含特殊 annotation
  ├── config.json            # 容器配置
  └── layers/
      ├── <sha256>/layer.tar # 根文件系统层（同普通镜像）
      └── <sha256>/layer.tar # checkpoint 数据层（新增的）
```

关键区别是 Checkpoint 镜像包含一层额外的**checkpoint 数据层**，并且 manifest 中带有特殊 annotation。

#### Manifest Annotation

```json
{
  "schemaVersion": 2,
  "mediaType": "application/vnd.oci.image.manifest.v1+json",
  "config": {
    "mediaType": "application/vnd.oci.image.config.v1+json",
    "digest": "sha256:...",
    "size": 1234
  },
  "layers": [
    {
      "mediaType": "application/vnd.oci.image.layer.v1.tar",
      "digest": "sha256:abc...",
      "size": 50000000
    },
    {
      "mediaType": "application/vnd.oci.image.layer.v1.tar",
      "digest": "sha256:def...",
      "size": 200000000,
      "annotations": {
        "io.kubernetes.cri-o.checkpoint": "true",
        "io.kubernetes.cri-o.checkpoint.name": "counter",
        "io.kubernetes.cri-o.checkpoint.pod": "counters",
        "io.kubernetes.cri-o.checkpoint.namespace": "default"
      }
    }
  ],
  "annotations": {
    "io.kubernetes.cri-o.checkpoint-type": "Full"
  }
}
```

CRI-O 的 containerd 插件通过识别这些 annotation 来判断：这是一个 checkpoint 恢复请求，不应该走普通的 `runc create` + `runc start` 路径，而应该走 `runc restore`。

#### checkpointctl 和 buildah 工具链

```bash
# 1. 查看 checkpoint archive 信息
checkpointctl show checkpoint.tar

# 2. 构建 checkpoint 镜像
checkpointctl build checkpoint.tar \
  --image registry.example.com/checkpoints/counter:v1 \
  --container counter

# 3. 推送到 registry
buildah push registry.example.com/checkpoints/counter:v1

# 4. 在 K8s 中使用
# 创建一个 image 指向 checkpoint 镜像的 Pod，
# CRI-O 检测到 annotation 后会自动执行 runc restore
```

#### 镜像大小和存储

Checkpoint 镜像通常很大，因为 checkpoint 数据层包含了进程的全部内存 dump。一个 2GB 内存的容器，checkpoint 镜像可能在 500MB~2GB（取决于压缩率和脏页比例）。这带来几个实际问题：

1. **推送到 registry 可能很慢**
2. **拉取恢复时，下载 checkpoint 数据层的时间可能比冷启动还长**
3. **存储成本高**：一个 checkpoint 镜像 = 基础镜像层 + 内存 dump 层
4. **需要独立的 GC 策略**：大量 checkpoint 镜像会快速消耗 registry 存储

## 实现前提

要在 Kubernetes 中实现 checkpoint / restore，需要同时满足几层条件。

### 1. Kubernetes 版本和 feature gate

`ContainerCheckpoint` feature gate 在 Kubernetes v1.25 引入，v1.30 起进入 Beta 并默认开启。当前 v1.36 文档中仍列为 Beta。

如果使用较老版本，需要确认 kubelet 是否开启：

```bash
kubelet --feature-gates=ContainerCheckpoint=true
```

新版本即使默认开启，也仍然要确认 kubelet 的认证、授权和证书配置。这个接口在 kubelet 上，不是普通的 apiserver 资源接口。

### 2. 容器运行时支持

kubelet 只是把 checkpoint 请求转给 CRI Runtime。真正干活的是 CRI Runtime 和底层 OCI Runtime。

常见组合：

| 层级 | 组件 |
| :--- | :--- |
| Kubernetes 节点代理 | kubelet |
| CRI Runtime | CRI-O、containerd |
| OCI Runtime | runc、crun |
| C/R 工具 | CRIU |

如果 CRI Runtime 没有实现 checkpoint 相关接口，kubelet 会返回 500。CRI-O 是 Kubernetes checkpoint 示例中最常被使用的 runtime，通常还需要启用 CRIU 支持。containerd 也有底层 checkpoint / restore 能力，但在 Kubernetes 集成路径上要看具体版本、发行版和配置。

### 3. 宿主机和内核兼容

Restore 对环境一致性要求很高，最好满足：

1. 源节点和目标节点 CPU 架构一致。
2. Linux 内核版本、cgroup 版本、namespace 行为尽量一致。
3. CRIU、runc / crun、CRI Runtime 版本兼容。
4. 容器镜像、rootfs、挂载路径、依赖文件存在。
5. 安全策略、SELinux / AppArmor / seccomp / capabilities 不阻断 restore。

这也是为什么 checkpoint / restore 在实验环境看起来容易，在生产集群里很难做到通用。

### 4. workload 自身适配

越“纯计算、少外部连接、少设备依赖”的 workload 越容易恢复。下面这些情况会增加难度：

1. 有大量长连接，尤其是跨节点 TCP 连接。
2. 打开了宿主机设备、GPU、RDMA、FUSE、特殊字符设备。
3. 使用了复杂的 IPC、文件锁、共享内存。
4. 进程正在被 gdb、strace 等调试器跟踪。
5. 强依赖本地临时文件、`emptyDir`、本地缓存。
6. 依赖固定 Pod IP、固定 hostname、固定 Node 本地状态。

CRIU 可以处理很多 Linux 进程状态，但并不意味着所有应用都能透明迁移。

## 方案一：应用层 checkpoint

这是最传统、也是生产中最稳的方案。应用自己把业务状态写到可靠存储中，Pod 崩溃或重建后从业务 checkpoint 恢复。

典型例子：

1. Flink / Spark Streaming 的状态快照。
2. PyTorch / TensorFlow 训练任务保存模型参数和 optimizer 状态。
3. 数据库通过 WAL、binlog、redo log 恢复。
4. 批处理任务把进度、offset、临时结果写到数据库或对象存储。
5. 业务服务把 session、任务队列、幂等状态放到 Redis、DB、MQ 中。

示意链路：

```text
应用运行
  -> 定期保存业务 checkpoint 到持久化存储
  -> Pod 异常退出或被重建
  -> 新 Pod 从 checkpoint 读取业务状态
  -> 继续执行
```

### 优点

1. **可靠性最高**：状态语义由应用自己定义，不依赖内核和 runtime 细节。
2. **跨版本、跨节点、跨集群能力强**：只要新版本能读取 checkpoint，就可以恢复。
3. **适合生产容灾**：和 Kubernetes Deployment、Job、StatefulSet、HPA、调度器都能自然配合。
4. **一致性可控**：可以和事务、offset、幂等逻辑结合，避免“进程恢复了但业务状态不一致”。

### 缺点

1. **需要改造应用**：无法完全透明。
2. **不能保存进程现场**：内存对象、调用栈、TCP 连接、打开的文件描述符不会自动恢复。
3. **恢复速度不一定快**：应用仍然需要重新启动、加载依赖和重建缓存。
4. **每类应用都要单独设计**：通用性差，但正确性最好。

### 适用场景

生产故障恢复、长任务容错、AI 训练、大数据任务、数据库、中间件等，优先考虑应用层 checkpoint。

## 方案二：kubelet Checkpoint API + CRIU

这是 Kubernetes 当前最接近原生的容器 checkpoint 路径。它可以不改应用，通过 kubelet 请求 runtime 对指定容器创建 checkpoint。

### 创建 checkpoint

先找到 Pod 所在节点：

```bash
kubectl get pod counters -n default -o wide
```

登录到该节点后，调用 kubelet checkpoint API：

```bash
curl -X POST \
  --insecure \
  --cert /var/run/kubernetes/client-admin.crt \
  --key /var/run/kubernetes/client-admin.key \
  "https://127.0.0.1:10250/checkpoint/default/counters/counter?timeout=60"
```

完成后查看 checkpoint 文件：

```bash
ls -lh /var/lib/kubelet/checkpoints/
```

### 在 Kubernetes 外恢复

一种方式是在 Kubernetes 外用 `crictl` 创建 sandbox，再把 checkpoint archive 当作镜像来源交给 CRI-O 等 runtime 恢复：

```bash
crictl runp pod-config.json
crictl create <POD_ID> container-config.json pod-config.json
crictl start <CONTAINER_ID>
```

`container-config.json` 里的 image 可以指向 checkpoint archive：

```json
{
  "metadata": {
    "name": "counter"
  },
  "image": {
    "image": "/var/lib/kubelet/checkpoints/checkpoint-counters_default-counter-<timestamp>.tar"
  }
}
```

这种方式适合调试和取证，不适合直接作为 Kubernetes 工作负载恢复方案，因为 kubelet 和 apiserver 不会把它当成一个正常受控的 Pod。

### 在 Kubernetes 内恢复

另一种方式是把 checkpoint archive 转成带特殊 annotation 的 OCI image，推到镜像仓库，然后创建一个新的 Pod 使用这个 checkpoint image。

示意流程：

```bash
checkpointctl build checkpoint.tar registry.example.com/demo/counter-checkpoint:latest
buildah push registry.example.com/demo/counter-checkpoint:latest
```

然后创建 Pod：

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: counters-restore
spec:
  containers:
  - name: counter
    image: registry.example.com/demo/counter-checkpoint:latest
  nodeName: node-b
```

支持该格式的 runtime 会识别镜像中的 checkpoint annotation，不走普通的容器启动路径，而是从 checkpoint 数据恢复进程。

### 优点

1. **对应用透明**：理论上无需业务代码支持。
2. **能保存运行现场**：内存、进程树、文件描述符等可以一起保存。
3. **适合取证分析**：可以在不进入容器内部的情况下保存现场。
4. **可以作为 Pod 迁移的基础能力**：上层控制器可以基于它做调度、抢占、维护迁移。

### 缺点

1. **不是完整 Pod 级 API**：kubelet API 针对 container，多容器 Pod 需要额外协调。
2. **restore 路径不统一**：Kubernetes 没有稳定的 `PodRestore` 原生资源，通常依赖 runtime 特定能力。
3. **runtime 兼容性要求高**：CRI-O、containerd、runc、crun、CRIU 的版本和配置都会影响结果。
4. **安全风险高**：checkpoint 里可能包含内存中的 token、密码、私钥、业务数据。
5. **外部状态不自动一致**：数据库事务、消息队列 offset、远端连接状态不会因为进程恢复就自动正确。
6. **性能开销不可忽略**：checkpoint 时间和容器内存使用量强相关，大内存进程会产生明显 IO 和暂停成本。

### 适用场景

故障取证、实验性 Pod 迁移、节点维护前保存低优先级任务、冷启动优化探索。

### 端到端 Restore 流程详解

下面以一个完整案例演示从 checkpoint 到 restore 的全流程，帮助理解各组件如何协作。

**场景**：一个计数器 Pod `counters` 在 `node-a` 上运行，需要迁移到 `node-b`。

**Step 1 — 准备阶段**

```bash
# 在控制平面确认 Pod 状态
kubectl get pod counters -n default -o wide
# NAME       READY   STATUS    NODE     IP
# counters   1/1     Running   node-a   10.244.1.5

# 记录关键信息：Pod IP、容器 ID、所在的 cgroup 路径等
kubectl get pod counters -n default -o yaml > /tmp/counters-backup.yaml
```

**Step 2 — Checkpoint**

```bash
# SSH 到 node-a
ssh node-a

# 调用 kubelet checkpoint API
curl -sk \
  --cert /etc/kubernetes/pki/apiserver-kubelet-client.crt \
  --key /etc/kubernetes/pki/apiserver-kubelet-client.key \
  "https://127.0.0.1:10250/checkpoint/default/counters/counter?timeout=120" \
  | jq .

# 响应示例：
# {
#   "items": [
#     "/var/lib/kubelet/checkpoints/checkpoint-counters_default-counter-2026-05-28T15:30:00Z.tar"
#   ]
# }

# 查看 checkpoint 大小
ls -lh /var/lib/kubelet/checkpoints/
# -rw------- 1 root root 850M May 28 15:30 checkpoint-counters_default-counter-2026-05-28T15:30:00Z.tar
```

**Step 3 — 转换为 Checkpoint 镜像**

```bash
# 使用 checkpointctl 检查 checkpoint 内容
checkpointctl show /var/lib/kubelet/checkpoints/checkpoint-counters_default-counter-*.tar

# 输出示例：
# +-------------------+--------------------------------------------------+
# | Checkpoint name   | counter                                          |
# | Pod               | counters                                         |
# | Namespace         | default                                          |
# | Checkpointed at   | 2026-05-28T15:30:00Z                             |
# | Processes in dump | counter (PID: 1), bash (PID: 15)                  |
# | Memory size       | 2.1 GB                                           |
# | Root FS diff size | 12 MB                                            |
# +-------------------+--------------------------------------------------+

# 构建 checkpoint 镜像
checkpointctl build \
  /var/lib/kubelet/checkpoints/checkpoint-counters_default-counter-*.tar \
  --image registry.example.com/checkpoints/counter:cp-20260528 \
  --container counter

# Step 4 — 推送到 Registry

buildah push registry.example.com/checkpoints/counter:cp-20260528

# 验证镜像已推送
skopeo inspect docker://registry.example.com/checkpoints/counter:cp-20260528
```

**Step 5 — 在目标节点 Restore**

```bash
# 方式 A：创建新 Pod 使用 checkpoint image
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: counters-restored
  namespace: default
  labels:
    app: counters
    restore-from-checkpoint: "true"
spec:
  containers:
  - name: counter
    image: registry.example.com/checkpoints/counter:cp-20260528
  nodeName: node-b
EOF
```

当 `node-b` 上的 kubelet 收到创建 Pod 请求后，CRI-O 从 registry 拉取镜像时检测到 `io.kubernetes.cri-o.checkpoint` annotation，然后**不走正常的容器启动路径，而是调用 `runc restore`**：

```text
kubelet -> CRI-O -> containerd CRI plugin -> runc restore
                                                    │
                                                    ├── 1. 解压 checkpoint 数据层
                                                    ├── 2. 读取 .img 文件
                                                    ├── 3. 调用 CRIU restore
                                                    ├── 4. 重建 namespace/cgroup
                                                    ├── 5. 恢复进程内存/寄存器
                                                    └── 6. 进程从 checkpoint 点继续执行
```

**Step 6 — 验证恢复**

```bash
# 检查恢复后的 Pod
kubectl get pod counters-restored -n default
kubectl logs counters-restored -n default
# 日志应该从 checkpoint 时的 count 值继续，而非从 0 开始

# 验证进程状态
kubectl exec counters-restored -n default -- cat /proc/1/status
kubectl exec counters-restored -n default -- ls -la /proc/1/fd/
```

**Step 7 — 切流和清理**

```bash
# 如果原 Pod 仍在运行（checkpoint 时没有 kill），现在删除它
kubectl delete pod counters -n default

# 更新 Service selector 指向新 Pod（如果需要）
# 或者在创建 restore Pod 时就用同样的 label
```

### 不同 Restore 方式的对比

| 恢复方式 | 原理 | 优点 | 缺点 |
|---------|------|------|------|
| **crictl 直接恢复** | 绕过 kubelet，用 crictl 创建 sandbox + 指向 checkpoint tar 恢复 | 快速验证，不需要 registry | Pod 不受 kubelet 管理，无 Service/Endpoint |
| **Checkpoint 镜像 + 新建 Pod** | checkpoint tar -> OCI 镜像 -> K8s Pod | Pod 受管理，有完整 K8s 语义 | 需要镜像仓库，冷启动可能比镜像拉取快 |
| **checkpointctl 本地恢复** | 直接在节点上 restore | 最快，无网络开销 | 绑死节点，不适合跨节点迁移 |
| **checkpoint image + restore operator** | 控制器自动完成上述所有步骤 | 声明式，可重复 | 工程复杂度高 |

### 性能数据参考

以下数据来自公开的 CRIU benchmark 和 Kubernetes checkpoint 博客（容器运行简单计数器 / HTTP 服务，在相同内核和 CPU 的节点上测试）：

| 容器内存 | Checkpoint 耗时 | Checkpoint 文件大小 | Restore 耗时 | 暂停时间（downtime） |
|---------|----------------|--------------------|-------------|-------------------|
| 100 MiB | 0.2 ~ 0.5 秒 | 50 ~ 100 MB | 0.3 ~ 0.8 秒 | < 0.5 秒 |
| 500 MiB | 1 ~ 2 秒 | 250 ~ 500 MB | 1 ~ 3 秒 | 1 ~ 2 秒 |
| 2 GiB | 3 ~ 8 秒 | 0.8 ~ 2 GB | 4 ~ 12 秒 | 3 ~ 8 秒 |
| 8 GiB | 15 ~ 40 秒 | 4 ~ 8 GB | 20 ~ 60 秒 | 15 ~ 40 秒 |

关键影响因素：
1. **进程内存中的脏页比例**：脏页越多，checkpoint 越慢（更多数据需要写入）
2. **打开的文件描述符数量**：每个 FD 都需要额外处理
3. **进程数量**：多个进程的进程树比单个进程更复杂
4. **磁盘 IO 性能**：checkpoint 文件直接写到本地盘
5. **压缩算法选择**：snappy 更快但体积大，zlib 更慢但体积小

一个重要结论：**如果 restore 总耗时（镜像拉取 + CRIU restore）大于应用冷启动耗时，那么 checkpoint/restore 就失去了"快速恢复"的意义**。这就是为什么 checkpoint image 更适合冷启动慢的 workload（Java 服务、模型加载、大数据引擎初始化等）。

## 方案三：自研 Operator / Node Agent

如果希望把 checkpoint / restore 做成平台能力，通常需要在 kubelet API 上再包一层声明式控制面。例如定义 `PodCheckpoint`、`PodRestore` 或 `CheckpointPolicy` 之类的 CRD，再由控制器和节点 Agent 执行。

典型架构：

```text
用户创建 PodCheckpoint CRD
  -> 控制器校验策略和权限
  -> 找到 Pod 所在 Node
  -> 通知该 Node 上的 Agent
  -> Agent 调用 kubelet checkpoint API
  -> 上传 checkpoint 到对象存储或镜像仓库
  -> 更新 CRD status

用户创建 PodRestore CRD
  -> 控制器选择目标 Node
  -> 准备 PVC / Secret / ConfigMap / ServiceAccount
  -> 创建使用 checkpoint image 的 Pod
  -> 等待 readiness
  -> 切流或清理旧 Pod
```

一个简化的 CRD 可能长这样：

```yaml
apiVersion: checkpoint.example.io/v1alpha1
kind: PodCheckpoint
metadata:
  name: demo-checkpoint
spec:
  podRef:
    namespace: default
    name: counters
  containers:
  - counter
  storage:
    type: Registry
    image: registry.example.com/demo/counter-checkpoint:latest
  timeoutSeconds: 60
```

Node Agent 通常需要特权权限，因为它要访问 kubelet、runtime socket、checkpoint 文件目录，甚至要调用 buildah / checkpointctl 之类的工具构建 checkpoint image。

### 需要重点处理的问题

1. **一致性屏障**：多容器 Pod 要在同一逻辑时间点 checkpoint，sidecar 和业务容器不能各自随意保存。
2. **流量摘除**：checkpoint 前应先让 Pod NotReady，等待 Service、Ingress、mesh 完成摘流。
3. **存储一致性**：PVC 需要单独 snapshot 或保证目标节点可挂载，`emptyDir` 和本地盘尤其麻烦。
4. **调度约束**：restore 目标节点必须满足 runtime、kernel、CPU、设备、镜像、存储等要求。
5. **权限隔离**：不是所有用户都应该能读取包含内存数据的 checkpoint。
6. **失败回滚**：checkpoint 成功但上传失败、restore 成功但 readiness 失败、旧 Pod 已删除但新 Pod 不可用，都要有状态机兜底。
7. **垃圾回收**：checkpoint archive 和 checkpoint image 很大，需要保留策略和清理机制。

### 优点

1. **可以声明式使用**：用户不需要登录节点手工 curl kubelet。
2. **能和调度、发布、抢占、节点维护打通**：适合做平台能力。
3. **可以沉淀策略**：白名单 workload、资源限制、存储位置、保留时间、安全扫描都能统一管理。
4. **能封装 runtime 差异**：对用户暴露统一 API，底层适配 CRI-O / containerd。

### 缺点

1. **工程复杂度高**：这不是一个简单 controller，节点侧权限、状态机和兼容性都很重。
2. **正确性难证明**：进程恢复成功不等于业务恢复正确。
3. **维护成本高**：runtime、CRIU、Kubernetes 版本变化都可能影响行为。
4. **安全审计要求高**：checkpoint 等价于把进程内存落盘，必须按敏感数据处理。

### 适用场景

平台团队做实验性能力、低优先级批任务抢占恢复、Notebook / 开发环境休眠恢复、特定白名单服务的冷启动优化。

## 方案四：Runtime 原生命令

也可以绕过 Kubernetes，直接使用容器运行时的 checkpoint / restore 命令。

### Podman

Podman 对 CRIU 集成比较直接：

```bash
sudo podman run -d --name demo docker.io/library/httpd
sudo podman container checkpoint demo -e /tmp/demo-checkpoint.tar.zst
sudo podman container restore -i /tmp/demo-checkpoint.tar.zst
```

### containerd

containerd 的 `ctr` 也有低层命令：

```bash
ctr image pull docker.io/library/redis:alpine
ctr run -d docker.io/library/redis:alpine redis
ctr c checkpoint --rw --task redis checkpoint/redis:cr-1
ctr c restore --rw --live redis-debug checkpoint/redis:cr-1
```

这里要注意，`ctr` 是调试和管理工具，不是稳定的用户接口。

### 优点

1. **验证成本低**：适合在单机上快速理解 CRIU 行为。
2. **绕开 Kubernetes 控制面复杂度**：能快速定位是应用问题、CRIU 问题还是 Kubernetes 集成问题。
3. **适合本地迁移和实验**：例如开发环境休眠、单机容器恢复。

### 缺点

1. **不适合直接操作 Kubernetes 管理的容器**：kubelet 不知道你做了什么，容易和控制循环冲突。
2. **缺少 Pod 语义**：Service、Endpoint、PVC、Secret、ConfigMap、ServiceAccount 都不在这个层面处理。
3. **不可声明式管理**：不适合多租户生产平台。

### 适用场景

本地实验、runtime 能力验证、CRIU 问题排查、Kubernetes 外的容器迁移。

## 方案五：VM / MicroVM 快照

如果 Pod 运行在 Kata Containers、Firecracker、Cloud Hypervisor 等虚拟化 sandbox 中，还可以考虑 VM / MicroVM 级别的 snapshot / restore。

它保存的是更完整的虚拟机状态，而不是单个 Linux 进程树。

### 优点

1. **隔离边界更清晰**：以 VM 为单位保存状态，和宿主机进程细节耦合较少。
2. **对进程透明度更高**：理论上可以保存 guest 内更多状态。
3. **适合强隔离场景**：多租户、安全沙箱、serverless sandbox。

### 缺点

1. **资源开销更大**：内存、磁盘、启动和恢复成本通常高于普通容器。
2. **和 Kubernetes Pod 语义仍需集成**：Service、PVC、调度、身份、网络切换仍然要处理。
3. **生态路径不如普通容器成熟**：具体能力强依赖 runtime 和云厂商实现。

### 适用场景

强隔离 serverless、沙箱平台、边缘计算、特定厂商运行时能力。

## 各方案对比

| 方案 | 透明度 | 可靠性 | 工程复杂度 | 生产成熟度 | 适合场景 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 应用层 checkpoint | 低 | 高 | 中 | 高 | 生产容灾、长任务、训练任务 |
| kubelet API + CRIU | 高 | 中 | 中 | 中低 | 取证、实验性迁移、冷启动探索 |
| Operator / Node Agent | 中高 | 中 | 高 | 取决于实现 | 平台化、抢占恢复、Notebook 休眠 |
| Runtime 原生命令 | 高 | 中 | 低 | 低 | 单机实验、runtime 验证 |
| VM / MicroVM 快照 | 高 | 中高 | 高 | 中 | 强隔离沙箱、serverless |

如果目标是“业务可靠恢复”，首选应用层 checkpoint。如果目标是“保存进程现场”，才考虑 CRIU。如果目标是“平台统一能力”，需要 Operator / Agent 把 kubelet API、runtime、存储和调度串起来。

## Pod 级 restore 的关键难点

### 1. 多容器一致性

Kubernetes 的基本调度单位是 Pod，但 kubelet checkpoint API 的操作对象是 container。一个 Pod 中多个容器共享网络 namespace、volume、生命周期和业务语义。

例如：

```text
app container + envoy sidecar + log sidecar
```

如果只 checkpoint app container，restore 后 sidecar 是新启动的，app 进程却从旧内存状态继续跑，两者之间的连接、iptables、证书、共享文件都可能不一致。

因此多容器 Pod 通常需要：

1. 先摘流。
2. 暂停业务写入。
3. 按顺序或并发 checkpoint 多个容器。
4. 记录同一个逻辑 checkpoint 版本。
5. restore 时一起恢复，或明确哪些 sidecar 可以重新启动。

### 2. 网络连接不是天然无损迁移

在 Kubernetes 中，Pod restore 到新节点后通常会获得新的 Pod IP。即使 Service 可以把新请求转过来，已有 TCP 连接也很难无损迁移。

要接近无损迁移，需要额外条件：

1. CNI 支持保留或迁移 IP。
2. 连接对端没有超时或重置。
3. 网络路径、conntrack、iptables / eBPF 状态一致。
4. 应用协议能容忍短暂停顿。

所以在生产系统里，更现实的做法是把 checkpoint / restore 当作“减少重启成本”的能力，而不是承诺所有长连接零中断。

### 3. 存储状态需要单独处理

CRIU 主要保存进程状态，不等于完整备份文件系统。

常见存储处理方式：

1. **PVC**：目标节点重新挂载同一个 PVC，或先做 VolumeSnapshot 再恢复。
2. **emptyDir**：需要把目录内容随 checkpoint 一起打包，或者禁止依赖其中状态。
3. **hostPath / local PV**：强绑定节点，跨节点 restore 很麻烦。
4. **对象存储 / 数据库**：更适合放业务状态，restore 后重新连接。

如果进程内存恢复到了某个时间点，但磁盘文件是另一个时间点，就可能出现严重一致性问题。

### 4. 安全风险

Checkpoint 文件通常包含进程内存。内存里可能有：

1. Kubernetes ServiceAccount token。
2. TLS 私钥、JWT、数据库密码。
3. 用户请求数据。
4. 明文业务缓存。
5. 进程环境变量和配置。

因此 checkpoint archive 应该按敏感数据处理：

1. 只允许节点 root 或受控 Agent 访问。
2. 上传前加密。
3. 镜像仓库或对象存储设置严格权限。
4. 设置保留时间和自动清理。
5. 审计所有 checkpoint / restore 操作。

### 5. 性能开销

Checkpoint 的耗时大体和进程内存大小、脏页数量、打开文件数量、IO 性能有关。

一个 100MiB 内存的简单容器可能很快完成；一个 80GiB 内存、打开大量文件、还有 GPU 状态的训练进程，checkpoint 可能很慢，甚至失败。

生产落地前至少要压测：

1. checkpoint 耗时。
2. restore 耗时。
3. checkpoint archive 大小。
4. 过程中 Pod 暂停时间。
5. 节点 CPU / IO 峰值。
6. 对同节点其他 Pod 的影响。

## 推荐落地路径

### 1. 先明确目标

不要一开始就把 checkpoint / restore 当成“Pod 热迁移”。应该先区分目标：

| 目标 | 推荐方案 |
| :--- | :--- |
| 业务故障恢复 | 应用层 checkpoint |
| 安全取证 | kubelet Checkpoint API |
| 长任务抢占恢复 | 应用层 checkpoint 优先，CRIU 作为补充 |
| Notebook / 开发环境休眠 | Operator + CRIU 可以尝试 |
| Java / 模型服务冷启动优化 | checkpoint image 可以实验 |
| 跨节点无损迁移 | 谨慎评估，通常需要网络和存储深度配合 |

### 2. 先从白名单 workload 做

适合第一批试点的 workload：

1. 单容器 Pod。
2. 无 GPU、无 RDMA、无特殊设备。
3. 连接少，或连接可重建。
4. 状态主要在内存和持久化存储中。
5. 可以接受秒级中断。
6. 有完善 readinessProbe 和业务健康检查。

不适合第一批试点的 workload：

1. 强依赖长连接的网关。
2. 多 sidecar service mesh 注入的 Pod。
3. 数据库主节点。
4. GPU 训练大任务。
5. 使用大量本地临时文件的任务。

### 3. 平台化时使用控制器状态机

一个可控的 restore 状态机至少应该包含：

```text
Pending
  -> Draining
  -> Checkpointing
  -> Uploading
  -> ImageBuilding
  -> Restoring
  -> Verifying
  -> Ready
  -> Cleaning
```

失败状态需要记录明确原因：

```text
CheckpointFailed
UploadFailed
ImageBuildFailed
ScheduleFailed
RestoreFailed
ReadinessFailed
CleanupFailed
```

这比在脚本里串几条命令更重要。因为 checkpoint / restore 的失败点非常多，没有状态机就很难排障。

### 4. 和 Kubernetes 原生机制配合

建议结合：

1. `readinessProbe`：checkpoint 前摘流，restore 后确认可服务。
2. `PodDisruptionBudget`：控制主动维护时的可用性。
3. `PriorityClass`：低优先级任务可被 checkpoint 后释放资源。
4. `VolumeSnapshot`：对 PVC 做存储层一致性保护。
5. `NodeAffinity` / `RuntimeClass`：约束 restore 到兼容节点。
6. `NetworkPolicy`：限制 checkpoint Agent 访问面。
7. 审计日志：记录谁在何时对哪个 Pod 做了 checkpoint / restore。

## 常见误区

### 误区 1：Checkpoint = 备份

**Checkpoint 不等于备份。** 备份保存的是数据（文件、数据库记录等），checkpoint 保存的是进程运行状态（内存、寄存器、FD 等）。两者的目标不同：

| 备份 | Checkpoint |
|------|-----------|
| 目标是灾难恢复 | 目标是进程恢复 |
| 恢复后需要从持久化状态重建 | 恢复后从断点继续执行 |
| 文件系统级别 | 进程级别 |
| 可跨大版本、跨架构恢复 | 强绑定内核版本和 CPU 架构 |

一个进程 checkpoint 可能因为内核版本不一致而无法 restore，但备份数据（如 mysqldump）可以跨版本恢复。

### 误区 2：Checkpoint 保存了"一切"

**CRIU checkpoint 不保存以下内容：**

- Docker/Kubernetes 的 volume 挂载数据（除非显式配置 `--manage-cgroups` 或手动打包）
- GPU 显存状态（CUDA context、显存中的 tensor 等）
- 已建立的外部 TCP 连接（CRIU 会关闭然后尝试 TCP repair 重建，但不保证成功）
- 硬件状态（RDMA 连接、DPDK 设备等）
- 进程被 gdb/strace 等 ptrace 时的内部调试状态
- fanotify/inotify 的完整 watch 状态（部分支持）

如果你的 workload 重度依赖上述任何一项，CRIU checkpoint 大概率会失败或恢复后行为异常。

### 误区 3：Docker Commit = Docker Checkpoint

在 [[docker-commit]] 一文中已经详细说明了，这里再强调一遍：

```text
docker commit  → 保存文件系统变更（容器层 CoW snapshot）→ 产物是普通 Docker 镜像
docker checkpoint → 保存进程运行状态（CRIU）→ 产物是 checkpoint 文件
```

commit 出来的镜像启动后从 ENTRYPOINT 重新执行；checkpoint 恢复后从保存点继续执行。

### 误区 4：开启 Feature Gate 就能生产使用

`ContainerCheckpoint` feature gate 开启只意味着 kubelet **暴露了** checkpoint API，不代表：

- CRI Runtime 正确实现了 checkpoint（可能返回 500）
- CRIU 已正确安装和配置
- 内核版本兼容
- Checkpoint 文件能成功 restore
- Restore 后的业务行为正确

在生产环境使用前，至少需要：
1. 在所有目标节点上验证 `criu check --all` 通过
2. 在测试集群完成端到端 checkpoint -> push -> pull -> restore 流程
3. 对目标 workload 做至少 10 次以上的 checkpoint/restore 循环
4. 压测 checkpoint 期间的 downtime 和节点资源影响

### 误区 5：Checkpoint 能实现"零中断热迁移"

这是一个常见但危险的假设。现实是：

1. **Checkpoint 期间容器暂停**：根据内存大小，暂停时间从 0.5 秒到数十秒不等
2. **Restore 期间容器未就绪**：镜像拉取 + CRIU restore 可能需要数秒到数分钟
3. **已有的 TCP 连接大概率会断**：TCP repair 只在极其受限的条件下能工作
4. **新的 Pod IP 会影响依赖方**：除非 CNI 支持 IP 保留

所以更现实的定位是：**减少重启成本（避免冷启动），而非实现零中断迁移**。

## 总结

Pod checkpoint / restore 不是单一功能，而是一组跨层能力：

```text
应用状态
  + Linux 进程状态
  + 容器运行时状态
  + Kubernetes Pod 语义
  + 网络状态
  + 存储状态
  + 安全权限
```

Kubernetes 目前已经提供 kubelet checkpoint API，可以让 runtime 对单个容器创建 checkpoint；但 restore 仍然需要依赖 CRI-O / containerd、CRIU、checkpoint image、节点 Agent 或自研控制器来完成。

生产中最稳的仍然是应用层 checkpoint。CRIU 路线的价值在于保存进程现场，适合取证、冷启动优化、低优先级任务恢复和特定场景的迁移探索。真正要做成平台能力时，重点不是能不能跑通一次 demo，而是要解决多容器一致性、网络连接、存储一致性、权限审计、失败回滚和大规模兼容性问题。

## 参考资料

1. [Kubernetes Kubelet Checkpoint API](https://kubernetes.io/docs/reference/node/kubelet-checkpoint-api/)
2. [Kubernetes Feature Gates](https://kubernetes.io/docs/reference/command-line-tools-reference/feature-gates/)
3. [Kubernetes Blog: Forensic container checkpointing in Kubernetes](https://kubernetes.io/blog/2022/12/05/forensic-container-checkpointing-alpha/)
4. [Kubernetes Blog: Announcing the Checkpoint/Restore Working Group](https://kubernetes.io/blog/2026/01/21/introducing-checkpoint-restore-wg/)
5. [CRIU: Checkpoint/Restore](https://criu.org/Checkpoint/Restore)
6. [CRIU: Kubernetes](https://criu.org/Kubernetes)
7. [CRIU: What cannot be checkpointed](https://www.criu.org/index.php?title=What_cannot_be_checkpointed)
8. [Podman Checkpointing](https://podman.io/docs/checkpoint)
9. [CRIU: Containerd](https://criu.org/Containerd)
