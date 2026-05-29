---
title: 'Kubernetes 原生 Checkpoint 的局限性：为什么它不是通用 Pod 热迁移'
createTime: 2026/05/29 12:00:00
permalink: /k8s/k8s-checkpoint-limitations/
---

# Kubernetes 原生 Checkpoint 的局限性：为什么它不是通用 Pod 热迁移

## 一句话理解

Kubernetes 原生 checkpoint 解决的是“把某个正在运行的容器运行现场保存下来”的问题，而不是完整解决“Pod 可靠恢复”“业务容灾”或“零中断迁移”的问题。

它的底层依赖 CRIU，因此能力边界也继承了 CRIU 的边界：CRIU 能保存很多 Linux 进程状态，比如内存页、寄存器、文件描述符、进程树、namespace 等；但它不能自动理解 Kubernetes Pod 语义、业务事务语义、远端连接语义、存储一致性和调度约束。

可以把它理解成：

```text
kubelet checkpoint API：
  负责触发某个容器的 checkpoint

CRI Runtime + OCI Runtime + CRIU：
  负责把进程运行状态 dump 成 checkpoint archive

Kubernetes 控制面：
  当前并没有提供一个稳定统一的 PodRestore API
```

所以它很适合做故障取证、冷启动优化实验、特定单容器 workload 的状态保存；但如果把它直接当成“Pod 热迁移”或“通用容灾恢复”，就会遇到很多边界问题。

## 原生能力到底到哪一层

截至 2026-05-29，Kubernetes `ContainerCheckpoint` feature gate 在 v1.30 起是 Beta 且默认开启。它暴露的是 kubelet 上的节点本地接口：

```text
POST /checkpoint/{namespace}/{pod}/{container}
```

这个接口有几个关键特征：

1. **它是 kubelet API，不是 apiserver 上的普通 Kubernetes 资源 API**。
2. **它的对象是 container，不是 Pod**。
3. **它只负责 checkpoint，不提供稳定统一的 restore API**。
4. **checkpoint archive 的具体内容依赖底层 CRI Runtime 实现**。
5. **如果 CRI Runtime 没有实现 checkpoint，kubelet 会返回 500**。

一次请求的大致链路是：

```text
用户 / 工具
  -> kubelet checkpoint API
  -> CRI Runtime
  -> OCI Runtime
  -> CRIU
  -> /var/lib/kubelet/checkpoints/checkpoint-*.tar
```

恢复时通常不是再调用 kubelet 的某个 `restore` 接口，而是把 checkpoint archive 转成带 annotation 的 OCI image，再创建一个使用该 image 的 Pod，让 runtime 在创建容器时识别它是 checkpoint image，然后走 `runc restore` / `crun restore` / CRIU restore 路径。

这意味着 Kubernetes 原生 checkpoint 更像是一个“节点级容器状态导出能力”，而不是完整的声明式“Pod 状态生命周期管理能力”。

## 局限一：它是容器级，不是 Pod 级

Kubernetes 的调度单位是 Pod，但 kubelet checkpoint API 的操作对象是 Pod 里的某个 container。

单容器 Pod 里，这个问题不明显；多容器 Pod 里，这个限制会迅速放大。例如：

```text
Pod
├── app container
├── envoy / istio-proxy sidecar
├── log sidecar
└── metrics sidecar
```

如果只 checkpoint `app container`，restore 后可能出现：

1. app 的内存状态来自旧时间点。
2. sidecar 是重新启动的新进程。
3. app 和 sidecar 之间的 Unix socket、localhost TCP 连接、iptables 状态不一致。
4. mTLS 证书、短期 token、连接池状态已经变化。
5. 共享 volume 中的文件状态和 app 内存中的状态不匹配。

这不是 CRIU 单独能解决的问题。CRIU 可以保存一个进程树，但它不知道 Kubernetes 里哪些容器共同构成一个业务一致性边界。

如果要做 Pod 级 restore，需要额外实现：

1. 多容器一致性屏障。
2. checkpoint 前摘流和冻结顺序。
3. 多个 container checkpoint 的版本绑定。
4. sidecar 是恢复还是重启的策略。
5. restore 后 readiness、流量切换和失败回滚。

因此 Kubernetes 原生 checkpoint 只能作为 Pod 级能力的底层积木，不能直接等同于 Pod checkpoint。

## 局限二：它没有统一的 Kubernetes Restore 语义

Checkpoint 和 restore 是一对动作，但 Kubernetes 当前原生接口只把 checkpoint 暴露成 kubelet API。

这会带来几个直接问题：

1. 没有 `PodRestore` 这类内置资源。
2. 没有标准 status 字段描述 restore 进度。
3. 没有统一的失败原因、重试语义和回滚语义。
4. 没有调度器原生理解“这个 Pod 必须恢复到兼容节点”的约束。
5. 没有统一的 checkpoint archive 存储、加密、保留和 GC 策略。

常见的 Kubernetes 内 restore 方式是：

```text
checkpoint archive
  -> checkpointctl / buildah
  -> checkpoint OCI image
  -> push registry
  -> create Pod with checkpoint image
  -> runtime detects annotation
  -> CRIU restore
```

这个流程可以跑通，但它不是 Kubernetes 内置的声明式生命周期。它依赖 runtime 是否识别 checkpoint image annotation，也依赖 checkpoint image 的构建工具、镜像仓库和节点 runtime 版本。

结果就是：checkpoint 创建是“原生的”，restore 落地通常是“运行时特定 + 工具链拼装 + 平台自研控制器”。

## 局限三：CRIU 不能保存所有 Linux 资源

CRIU 很强，但它不是魔法。它只能保存内核暴露出来、并且 CRIU 已经支持建模的状态。

下面这些资源经常会成为 checkpoint 失败或 restore 异常的原因：

| 类型 | 典型问题 |
| :--- | :--- |
| 特殊设备 | GPU、RDMA、DPDK、FUSE、某些字符设备或块设备状态无法通用保存 |
| 调试状态 | 进程正在被 gdb、strace 等 ptrace 工具跟踪时，CRIU 很可能无法 dump |
| 非常规 socket | CRIU 对 TCP、UDP、Unix、packet、netlink 等有支持边界，其他 socket 类型可能失败 |
| 文件锁 | `flock` / `fcntl` 锁需要特殊处理，而且只有在锁相关进程都被纳入 dump 时才更安全 |
| 外部 Unix socket | 如果对端进程不在 checkpoint 范围内，需要特殊选项或应用能容忍重连 |
| 被删除或不可见文件 | 进程打开了已经 unlink 或路径不可达的文件时，restore 可能找不到对应对象 |
| IPC 对象 | SysV IPC、共享内存等如果没有完整 namespace 视角，可能无法一致恢复 |
| 图形 / 桌面程序 | 状态可能存在外部 X server、Wayland compositor 或设备中 |

在 Kubernetes 里，这些问题会被进一步放大。因为很多资源不是容器自己独占的，而是由 kubelet、CNI、CSI、device plugin、service mesh 或宿主机共同管理。

例如 GPU workload 里，进程状态在 CPU 内存中只是一部分，CUDA context、GPU 显存、驱动内部状态也很关键。普通 CRIU checkpoint 不会自动把这些状态完整保存下来。即使有专门的 GPU checkpoint 研究或厂商能力，也不能直接推导为 Kubernetes 原生 checkpoint 已经通用支持 GPU restore。

## 局限四：网络连接很难透明迁移

CRIU 支持一定程度的 TCP connection restore，但这不等于 Kubernetes 里可以透明迁移所有连接。

TCP 连接的恢复至少涉及：

1. 原本的本地 IP 和端口是否还能在目标节点使用。
2. 对端是否还认为连接有效。
3. TCP sequence number、window、timestamp 等状态是否能正确恢复。
4. 迁移期间包是否被丢弃、缓存或阻断。
5. iptables、conntrack、eBPF、CNI 路由是否保持一致。

CRIU 的 live migration 文档也强调，restore TCP socket 时会尝试使用原来的地址信息；如果目标侧没有对应 IP，相关系统调用会失败。

放到 Kubernetes 中，问题更复杂：

```text
源 Pod：
  IP = 10.244.1.20
  Node = node-a

目标 Pod：
  IP = 10.244.2.31
  Node = node-b
```

如果 restore 后 Pod IP 变了，原有连接的四元组也变了：

```text
源 IP:源端口 -> 目标 IP:目标端口
```

对端不会因为 Kubernetes 创建了一个新 Pod，就自动把旧连接迁移到新四元组上。

Service 只能影响新连接的负载均衡，通常不能拯救已经建立的连接。Ingress、Gateway、service mesh 也一样，它们可以帮助摘流和重建连接，但不能把任意 TCP 连接无损搬走。

因此更现实的定位是：

1. checkpoint / restore 可以减少应用重新初始化的成本。
2. 它不能保证长连接零中断。
3. 跨节点迁移要么需要 CNI 支持 IP 保留和迁移，要么需要应用层重连。
4. 对外服务要通过 readiness、drain、重试和幂等来兜底。

## 局限五：文件系统和卷状态不自动一致

CRIU 保存的是进程视角下的一部分文件描述符和文件系统相关状态，不等于给整个 Pod 文件系统做了一次一致性快照。

Kubernetes 里常见几类存储：

| 存储类型 | checkpoint / restore 风险 |
| :--- | :--- |
| 容器可写层 | checkpoint archive 可能包含部分 rootfs diff，但格式和行为依赖 runtime |
| `emptyDir` | 本地临时目录不会天然跨节点存在，需要额外复制或禁止依赖 |
| PVC | 需要目标节点能重新挂载，最好配合 VolumeSnapshot 做时间点一致性 |
| hostPath / local PV | 强绑定节点，跨节点 restore 很容易失败或读到不同数据 |
| ConfigMap / Secret | restore 时内容可能已经更新，和 checkpoint 时的内存状态不一致 |
| 对象存储 / 数据库 | 不在 CRIU 管理范围内，需要应用自己保证事务和幂等 |

最危险的情况是“内存回到了旧时间点，磁盘或远端状态却停在新时间点”。

例如一个任务在 checkpoint 后继续运行，并写入了一批结果文件。后来你拿旧 checkpoint restore，进程会以为那些写入还没发生，但文件系统里可能已经存在新结果。轻则重复计算，重则数据损坏。

CRIU 对 `--leave-running` 一类用法也有明确警告：如果 dump 后原进程继续运行，外部文件和连接继续变化，后续 restore 可能因为外部资源状态不匹配而失败或不一致。

所以生产里必须把 checkpoint 和存储快照作为一个一致性问题处理，而不能只看进程是否恢复成功。

## 局限六：环境兼容性要求很高

一个 checkpoint archive 不是通用镜像。它强依赖创建时的运行环境。

restore 目标节点最好满足：

1. CPU 架构一致，例如都为 `amd64` 或都为 `arm64`。
2. CPU 特性兼容，例如 AVX、SSE、特定指令集不能缺失。
3. Linux kernel 版本和 namespace / cgroup 行为兼容。
4. cgroup v1 / v2 配置一致或被 runtime 正确适配。
5. CRIU、runc / crun、CRI-O / containerd 版本兼容。
6. SELinux、AppArmor、seccomp、capabilities 策略不会阻断 restore。
7. 容器镜像、rootfs、挂载路径和外部依赖存在。
8. CNI、CSI、device plugin 行为一致。

普通镜像启动失败时，通常还可以通过重新拉镜像、调整启动参数、重建 Pod 来恢复。checkpoint restore 失败时，失败点可能藏在内核对象、寄存器状态、FD、socket、namespace 或 runtime 内部，排障难度更高。

这也是为什么 checkpoint restore 在单机 demo 里容易成功，在异构生产集群中很难泛化。

## 局限七：性能开销与内存大小强相关

kubelet 官方文档明确提到，checkpoint 创建时间和容器已使用内存直接相关。原因很简单：checkpoint 需要把进程内存页写到磁盘。

影响 checkpoint 和 restore 性能的因素包括：

1. 进程实际使用的内存大小。
2. 脏页比例。
3. 进程数量和线程数量。
4. 打开的文件描述符数量。
5. socket、pipe、IPC、epoll 等内核对象数量。
6. 本地磁盘 IO 性能。
7. 压缩算法和压缩率。
8. checkpoint archive 是否要上传到对象存储或 registry。
9. restore 前是否需要重新拉取大 checkpoint image。

一个小型 busybox 计数器可能几百毫秒就能完成；一个几十 GiB 内存的 JVM、Notebook 或模型服务，checkpoint archive 可能非常大，写盘、压缩、上传、拉取和恢复都会成为明显成本。

这里有一个判断原则：

```text
如果 checkpoint image 拉取时间 + CRIU restore 时间
  >= 应用普通冷启动时间
那么 checkpoint / restore 对冷启动优化的价值就很有限。
```

它并不是总能更快。它只适合那些“初始化很贵，但运行态内存可接受，且外部状态可控”的 workload。

## 局限八：安全风险很高

checkpoint archive 通常包含进程内存。进程内存里可能有：

1. Kubernetes ServiceAccount token。
2. TLS 私钥。
3. 数据库密码。
4. JWT、OAuth token、session cookie。
5. 用户请求内容。
6. 明文业务缓存。
7. 环境变量和配置。

因此 checkpoint archive 的敏感级别通常高于普通容器镜像。

普通镜像一般包含二进制、依赖和配置模板；checkpoint archive 可能包含正在运行的业务秘密和用户数据。如果把 checkpoint archive 转成 OCI image 并推到 registry，本质上就是把内存 dump 推进了镜像仓库。

生产里至少要考虑：

1. 谁可以调用 kubelet checkpoint API。
2. 谁可以登录节点读取 `/var/lib/kubelet/checkpoints`。
3. checkpoint archive 是否加密。
4. registry / 对象存储是否做了严格访问控制。
5. 是否设置自动过期和 GC。
6. 是否记录审计日志。
7. 是否禁止对高敏 Pod 创建 checkpoint。

不能因为它是“调试工具”或“平台能力”，就把它按普通日志或普通镜像处理。

## 局限九：运维状态机缺失

一次真实的 checkpoint / restore 通常不是一个命令，而是一串状态机：

```text
Draining
  -> Checkpointing
  -> Uploading
  -> ImageBuilding
  -> Pushing
  -> Scheduling
  -> Pulling
  -> Restoring
  -> Verifying
  -> SwitchingTraffic
  -> Cleaning
```

每一步都可能失败：

| 阶段 | 可能失败原因 |
| :--- | :--- |
| Draining | Service / mesh 摘流超时，仍有请求进入 |
| Checkpointing | CRIU 不支持某类资源，runtime 返回错误 |
| Uploading | checkpoint archive 太大，网络或对象存储失败 |
| ImageBuilding | checkpoint archive 格式和工具链不兼容 |
| Scheduling | 没有满足 kernel / runtime / CPU / 存储要求的节点 |
| Pulling | registry 慢、权限失败、镜像层过大 |
| Restoring | 缺 IP、缺 mount、缺设备、seccomp/SELinux 阻断 |
| Verifying | 进程起来了，但业务健康检查失败 |
| Cleaning | 旧 Pod、旧 checkpoint image、临时文件没有清理 |

Kubernetes 原生 checkpoint API 不负责这些状态。平台如果要把它做成稳定能力，就需要自研 Operator / Node Agent / 控制器状态机。

没有状态机时，最常见的问题是：demo 能跑通一次，但失败后不知道系统处在哪个阶段，也不知道哪些资源应该保留、重试或清理。

## 常见失败现象

| 现象 | 常见原因 | 排查方向 |
| :--- | :--- | :--- |
| kubelet 返回 404 | feature gate 关闭，或 namespace / pod / container 不存在 | 查 kubelet 配置和目标 Pod 是否在本节点 |
| kubelet 返回 500 | CRI Runtime 没实现 checkpoint，或 CRIU dump 失败 | 查 kubelet、runtime、CRIU 日志 |
| checkpoint archive 很大 | 进程内存大、脏页多、压缩率低 | 看 checkpointctl、内存用量和磁盘 IO |
| restore Pod 启动失败 | checkpoint image annotation 不被 runtime 识别，或 runtime 版本不兼容 | 查镜像 manifest、containerd / CRI-O 版本 |
| restore 时 CRIU 报 socket 错误 | TCP / Unix socket 对端或网络状态不满足 | 检查连接、IP、CNI、iptables / eBPF |
| restore 后进程存在但业务异常 | 外部状态、文件系统、数据库、队列 offset 不一致 | 查业务幂等、事务、存储快照 |
| 多容器 Pod restore 异常 | 只恢复了业务容器，sidecar 状态不匹配 | 重新设计多容器一致性策略 |
| checkpoint 文件泄漏 | 没有保留策略和 GC | 加密、过期、审计和清理任务 |

## 哪些场景适合，哪些不适合

比较适合先试点：

1. 单容器 Pod。
2. 无 GPU、RDMA、DPDK、FUSE 等特殊设备。
3. 外部连接少，或应用可以自动重连。
4. 状态主要在进程内存中，且磁盘状态可控。
5. 可以接受秒级或更长暂停。
6. 有完善 readinessProbe 和业务健康检查。
7. 目标是取证、实验、冷启动优化或低优先级任务恢复。

不适合直接试点：

1. 多 sidecar、强依赖 service mesh 的业务 Pod。
2. 网关、长连接服务、实时通信服务。
3. 数据库主节点或强一致存储系统。
4. GPU 训练、RDMA、DPDK、eBPF 深度依赖 workload。
5. 强依赖 `hostPath`、local PV 或节点本地缓存的 workload。
6. 对 token、密钥、用户数据极其敏感且没有 checkpoint 加密方案的 workload。
7. 不能接受重复执行、连接中断或短时间不可用的业务。

## 落地前的检查清单

如果要在平台里尝试 Kubernetes 原生 checkpoint，建议先回答这些问题：

1. 目标是取证、冷启动优化、抢占恢复，还是迁移？
2. checkpoint 对象是单容器还是多容器 Pod？
3. restore 是否必须跨节点？
4. 目标节点如何保证 kernel、runtime、CPU、cgroup 和安全策略兼容？
5. TCP 连接断开后，应用能否自动重连？
6. PVC、emptyDir、hostPath、本地缓存如何保证一致？
7. checkpoint archive 存到哪里，是否加密？
8. 谁有权限创建、下载、restore checkpoint？
9. checkpoint image 和 archive 的 GC 策略是什么？
10. restore 成功的判定是进程存在，还是业务 readiness 通过？
11. restore 失败后旧 Pod 是否还在，如何回滚？
12. 是否对目标 workload 做过多轮 checkpoint / restore 压测？

如果这些问题没有答案，就不应该把它当成生产级热迁移能力。

## 推荐定位

更合理的定位是：

```text
应用层 checkpoint：
  解决业务可靠恢复

Kubernetes 原生 checkpoint + CRIU：
  解决进程现场保存和特定场景恢复

Operator / Node Agent：
  解决声明式编排、状态机、存储、安全和调度

应用重连、幂等和事务：
  解决外部状态一致性
```

也就是说，CRIU 路线不是应用层容错的替代品，而是补充能力。

如果目标是生产容灾，优先做应用层 checkpoint、事务、幂等和持久化状态恢复。如果目标是取证、冷启动优化、Notebook 休眠、低优先级任务抢占恢复，可以把 Kubernetes 原生 checkpoint 作为底层能力继续试点。

## 总结

Kubernetes 原生 checkpoint 的最大价值，是把 CRIU 的进程状态保存能力接入 kubelet，让平台可以在不进入容器内部的情况下保存运行现场。

但它的局限同样清晰：

1. API 是 kubelet 节点级接口，不是声明式 Pod API。
2. 操作对象是 container，不是完整 Pod。
3. 原生接口只覆盖 checkpoint，不提供统一 restore 语义。
4. CRIU 不能保存所有设备、socket、文件锁、外部资源和硬件状态。
5. 网络连接、存储状态、业务事务不自动一致。
6. restore 强依赖 kernel、runtime、CPU、cgroup 和安全策略兼容。
7. checkpoint archive 可能很大，性能收益需要实测。
8. checkpoint 文件包含内存数据，安全风险高。
9. 平台化需要额外 Operator / Agent 状态机。

所以它不是“开启 feature gate 就能拥有 Pod 热迁移”，而是一个底层能力。用得好，可以做取证、实验性恢复和特定 workload 优化；用错了，就会把进程恢复误认为业务恢复，把 checkpoint 文件误认为备份，把短暂停顿误认为零中断迁移。

## 参考资料

1. [Kubernetes Kubelet Checkpoint API](https://kubernetes.io/docs/reference/node/kubelet-checkpoint-api/)
2. [Kubernetes Feature Gates](https://kubernetes.io/docs/reference/command-line-tools-reference/feature-gates/)
3. [Kubernetes Blog: Forensic container checkpointing in Kubernetes](https://kubernetes.io/blog/2022/12/05/forensic-container-checkpointing-alpha/)
4. [Kubernetes Blog: Announcing the Checkpoint/Restore Working Group](https://kubernetes.io/blog/2026/01/21/introducing-checkpoint-restore-wg/)
5. [CRIU: Kubernetes](https://criu.org/Kubernetes)
6. [CRIU: What cannot be checkpointed](https://www.criu.org/index.php?title=What_cannot_be_checkpointed)
7. [CRIU: Advanced usage](https://criu.org/Advanced_usage)
8. [CRIU: Live migration](https://www.criu.org/Live_migration)
