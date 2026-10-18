---
title: Docker Commit 命令详解
createTime: 2026/05/28 11:00:00
permalink: /k8s/docker-commit/
---

# Docker Commit 命令详解

## 一句话理解

`docker commit` 把一个**运行中或已停止容器的当前状态**保存为一个新的镜像。它捕捉的不是 Dockerfile 里的指令，而是容器文件系统的"此时此刻"——包括你在容器里手动安装的软件、修改的配置、生成的文件等等。

```text
Dockerfile / docker build：描述一个"应该长什么样"的蓝图，每次构建结果一致
docker commit：拍一张"现在长什么样"的快照，结果取决于容器当前状态
```

## 基本原理：写时复制与容器层

要理解 `docker commit`，首先要理解 Docker 的存储模型。

Docker 镜像由多个**只读层（read-only layers）**叠加而成，每一层对应 Dockerfile 中的一条指令（RUN、COPY、ADD 等）。当你基于镜像启动一个容器时，Docker 在这个只读层栈的顶部添加一个**可写的容器层（container layer）**：

```text
┌─────────────────────────┐
│   Container Layer (R/W) │  ← 容器启动后所有修改都写在这里
├─────────────────────────┤
│   Layer 3: RUN apt ...  │  ← 只读
├─────────────────────────┤
│   Layer 2: COPY app.jar  │  ← 只读
├─────────────────────────┤
│   Layer 1: FROM ubuntu   │  ← 只读
└─────────────────────────┘
```

这里的核心机制是**写时复制（Copy-on-Write, CoW）**：

- 当你**读取**一个文件时，如果容器层没有，就向下查找，返回最近一层的版本。
- 当你**修改**一个文件时，存储驱动先把原始文件从只读层复制到容器层，然后在容器层里修改。下层原文件保持不变。

反过来说，`docker commit` 做的事情，就是把容器层"凝固"成一个新的只读层，和底下的所有层一起打包成一个新镜像：

```text
                         docker commit
                              │
┌─────────────────────────┐    │    ┌─────────────────────────┐
│   Container Layer (R/W) │    └──> │   New Layer (R/O)       │
├─────────────────────────┤         ├─────────────────────────┤
│   Layer 3               │         │   Layer 3               │
├─────────────────────────┤         ├─────────────────────────┤
│   Layer 2               │         │   Layer 2               │
├─────────────────────────┤         ├─────────────────────────┤
│   Layer 1               │         │   Layer 1               │
└─────────────────────────┘         └─────────────────────────┘
    运行中的容器                          新镜像
```

有几个关键点：

1. **commit 默认会暂停容器**。在 commit 期间，容器会被 pause，防止文件系统在快照过程中被修改。可以通过 `--pause=false` 跳过，但这样拍出来的快照可能不一致。
2. **只有容器层的变更会被保存**。底下的只读层不会重复存储，新镜像和原镜像之间仍然是共享层的（通过层 ID 去重）。
3. **容器内的运行状态不会保存**。commit 保存的是文件系统，不保存进程状态、内存、CPU 寄存器等。这一点是和 CRIU checkpoint 最根本的区别。

## Docker Commit 支持 Checkpoint 吗？

**简短回答：不支持。`docker commit` 和 checkpoint 是两个完全不同的东西。**

`docker commit` 只拍文件系统的快照。如果容器里正在运行一个进程，commit 不会保存进程的 PID、内存页、寄存器、打开的文件描述符或 socket 连接状态。commit 出来的镜像启动后，进程从零开始执行 ENTRYPOINT/CMD，而不是从 commit 那一刻的程序执行位置继续运行。

Docker 的 checkpoint 能力由一套**独立的命令**提供（实验性功能）：

```bash
docker checkpoint create <container> <checkpoint-name>
docker checkpoint ls    <container>
docker checkpoint rm    <container> <checkpoint-name>
```

这套命令的底层是 **CRIU（Checkpoint/Restore In Userspace）**，和 `docker commit` 的存储驱动层机制完全不同。

### Checkpoint 的工作原理

CRIU 做 checkpoint 时的大致流程：

```text
1. 找到目标进程树（容器内的 PID 1 及其所有子进程）
2. 冻结进程 → 进程不再执行，内存/寄存器不再变化
3. 从 /proc/<pid>/ 收集进程元信息：
   - /proc/<pid>/maps        → 内存映射
   - /proc/<pid>/fd/         → 打开的文件描述符
   - /proc/<pid>/mem         → 进程内存页
   - /proc/<pid>/status      → 进程状态/寄存器
4. 收集 namespace、cgroup、seccomp 等资源信息
5. 将所有信息写入一组 checkpoint 镜像文件
6. 解冻进程（或根据配置杀掉容器）
```

Restore 时反向操作：读取 checkpoint 文件，重建 namespace/cgroup/进程树，恢复内存和寄存器，进程从检查点继续执行。对进程来说，它只是"冻结了几秒"。

### Commit vs Checkpoint：一张表说清楚

| 维度 | `docker commit` | `docker checkpoint` (CRIU) |
|------|-----------------|---------------------------|
| **保存内容** | 文件系统变更（容器层） | 进程树、内存、寄存器、FD、socket 等 |
| **恢复后行为** | 从 ENTRYPOINT/CMD 重新启动 | 从 checkpoint 点继续执行 |
| **底层机制** | 存储驱动（overlay2/aufs）+ CoW | CRIU + /proc 接口 |
| **产物** | Docker 镜像（可 push 到 registry） | 一组 checkpoint 文件（仅本地） |
| **适用场景** | 调试、取证、文件系统存档 | 容灾、热迁移、长任务中断恢复 |
| **生产就绪** | 稳定 | 实验性（截至 2026），依赖内核和 runtime |

### 开启 Docker Checkpoint

Docker 的 checkpoint 默认不启用，需要满足以下条件：

**1. 内核支持**：需要 Linux 内核 >= 4.x 并开启相关 config：

```bash
# 检查内核是否支持 CRIU 所需特性
cat /boot/config-$(uname -r) | grep -E 'CONFIG_CHECKPOINT_RESTORE|CONFIG_NAMESPACES|CONFIG_CGROUP_FREEZER'
```

**2. 安装 criu**：

```bash
# Ubuntu / Debian
apt install criu

# 验证安装
criu check --all
```

**3. Dockerd 启用实验性功能并指定 criu 路径**：

```bash
# 方式一：dockerd 启动参数
dockerd --experimental --default-criu-path /usr/sbin/criu

# 方式二：/etc/docker/daemon.json
{
  "experimental": true,
  "default-criu-path": "/usr/sbin/criu"
}
```

**4. 创建 checkpoint**：

```bash
# 启动一个简单的计数器容器
docker run -d --name counter --security-opt seccomp:unconfined ubuntu:22.04 \
  bash -c 'i=0; while true; do echo "count=$i"; i=$((i+1)); sleep 1; done'

# 等几秒后创建 checkpoint
docker checkpoint create counter cp1

# checkpoint 文件默认保存在 /var/lib/docker/containers/<container-id>/checkpoints/
ls /var/lib/docker/containers/$(docker inspect -f '{{.Id}}' counter)/checkpoints/cp1/

# 从 checkpoint 恢复——进程从检查点继续计数
docker start --checkpoint cp1 counter
docker logs -f counter
# 输出继续从 cp1 时的计数值递增，不是从 0 开始
```

### 一个直观的对比实验

```text
场景：一个计数器容器，计数到 50 时分别做 commit 和 checkpoint

              docker commit                           docker checkpoint
              ──────────────                          ──────────────────
操作前         容器正在计数: count=50                    容器正在计数: count=50

执行操作       docker commit counter img:v2            docker checkpoint create counter cp1

恢复操作       docker run img:v2                       docker start --checkpoint cp1 counter

日志输出       count=1  ← 从 1 重新开始！               count=51 ← 从 51 继续！

原因           commit 只保存了文件系统，                  CRIU 保存了进程的完整运行现场
              不保存进程计数器的内存值                    （内存、寄存器等），计数变量被精确还原
```

这就是两者最本质的区别：**commit 保存的是"容器长什么样"，checkpoint 保存的是"容器正在做什么"**。

### Checkpoint 的局限

1. **不能跨内核版本恢复**：checkpoint 文件与内核版本强绑定，3.10 上创建的可能无法在 5.15 上恢复。
2. **不支持某些资源**：GPU、某些类型的 socket（如 TCP 已建立连接）、System V IPC 等检查点困难。
3. **镜像不可移植**：checkpoint 产出的是宿主机上的文件，不像 commit 产出的是可以 push 到 registry 的 Docker 镜像。
4. **仅 Linux**：CRIU 依赖 Linux 内核特性，macOS/Windows 不支持。
5. **实验性状态**：截至 2026 年，Docker 的 `checkpoint` 子命令仍标记为实验性，生产使用需谨慎。

## 基本语法

```bash
docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
```

常用选项：

| 选项 | 说明 |
|------|------|
| `-a, --author` | 作者信息，如 `"John <john@example.com>"` |
| `-c, --change` | 在 commit 时附加 Dockerfile 指令，如 `CMD`、`ENV`、`EXPOSE` 等 |
| `-m, --message` | 提交信息，类似 git commit message |
| `-p, --pause` | commit 前是否暂停容器（默认 `true`） |

## 基础使用示例

### 场景一：手动调试后保存状态

```bash
# 1. 启动一个基础容器
docker run -it --name debug-container ubuntu:22.04 bash

# 2. 在容器里做一些手动操作
apt update && apt install -y curl vim net-tools
echo "custom config" > /etc/myapp/config.yaml

# 3. 退出容器后，commit 为新镜像
docker commit -m "install curl/vim, add custom config" debug-container my-debug-image:v1

# 4. 基于新镜像运行
docker run -it my-debug-image:v1 bash
# curl、vim、config.yaml 都还在
```

### 场景二：附加 Dockerfile 指令

```bash
# commit 时直接修改 CMD、ENV 等元数据
docker commit \
  -a "zhihao <zhihao@example.com>" \
  -m "add debug tools, set default cmd" \
  -c 'CMD ["/usr/local/bin/myapp"]' \
  -c 'ENV APP_ENV=debug' \
  -c 'EXPOSE 8080' \
  debug-container \
  my-debug-image:v2
```

`-c` 可以重复多次，支持的指令包括：`CMD`、`ENTRYPOINT`、`ENV`、`EXPOSE`、`LABEL`、`ONBUILD`、`USER`、`VOLUME`、`WORKDIR`、`STOPSIGNAL`、`HEALTHCHECK`、`SHELL`。

### 场景三：不暂停容器 commit

```bash
# 容器正在处理请求，不想暂停
docker commit --pause=false running-container my-backup:latest
```

注意：不暂停的情况下，如果容器在 commit 过程中持续写入文件，可能导致快照不一致（部分文件是旧版本、部分是新版本）。

## 实际应用场景

### 1. 故障现场保留

生产环境容器出现异常，但还没有挂掉。快速 commit 保存现场，然后离线分析文件系统。

```bash
docker commit suspicious-container debug/snapshot:$(date +%Y%m%d%H%M%S)
docker save debug/snapshot:20260528143000 -o snapshot.tar
# 把 tar 拉到本地，docker load 后分析
```

这是 `docker commit` 最实用的场景之一：比 `docker cp` 更完整，比 `docker export` 保留了层级信息。

### 2. 快速原型和调试

开发过程中在容器里反复试错，一旦调通，直接 commit 固定下来：

```bash
docker run -it --name proto python:3.11 bash
pip install some-obscure-package
# ... 各种手动调参 ...
# 搞定了，保存
docker commit proto my-prototype:v1
```

省去写 Dockerfile、排依赖顺序的时间，适合探索性工作。

### 3. 为容器打 checkpoint（非 CRIU）

某些长任务不能中断，在关键节点 commit 一份作为"存档"：

```bash
# 模拟一个数据处理管道
docker run --name data-pipeline my-pipeline:v1

# 处理完第一阶段后，打个快照
docker commit data-pipeline pipeline:stage1-done

# 如果后续阶段搞砸了，可以从 stage1 重新开始
docker run --name data-pipeline-v2 pipeline:stage1-done
```

### 4. 动态构建

一些 CI/CD 系统或低代码平台，允许用户在浏览器里操作一个容器，然后 commit 成新版本：

```text
用户操作 -> Web Terminal -> 容器内操作 -> docker commit -> push to registry
```

## Docker Commit vs Dockerfile / Docker Build

| | `docker commit` | `Dockerfile + docker build` |
|---|---|---|
| **可复现性** | 差。手动的历史操作无法精确还原 | 好。Dockerfile 是声明式的，版本可控 |
| **透明度** | 差。别人不知道镜像里装了什么 | 好。每一条指令都有记录 |
| **层复用** | commit 把整个容器层打成一层，缓存粒度为整个变更 | 每条指令一层，未变化的层可复用缓存 |
| **版本管理** | 困难 | 容易。Dockerfile 可纳入 git 管理 |
| **上手速度** | 快。不需要学 Dockerfile 语法 | 需要写 Dockerfile |
| **镜像大小** | 容易膨胀。删除的文件其实还在下层 | 可控制。多阶段构建可以显著减小体积 |

一个重要的反直觉事实：**在容器里 `rm` 一个文件，commit 出来的镜像不会变小**。

原因还是写时复制。你在容器层"删除"一个大文件时，实际上只是在容器层加了一条白out标记（whiteout file），原始文件在下层仍然存在。commit 时白out标记和新文件一起被打包，但底层那个大文件仍然是镜像的一部分：

```bash
# 演示：rm 不会缩小镜像
docker run --name big ubuntu:22.04 bash -c "dd if=/dev/zero of=/bigfile bs=1M count=500"
docker commit big big-image:v1
# 镜像大小增加约 500MB

docker run --name big2 big-image:v1 bash -c "rm /bigfile"
docker commit big2 big-image:v2
# 镜像大小不会减少，因为 bigfile 还在底层
```

这就是为什么 Dockerfile + `docker build` + 多阶段构建是生产环境的首选。

## 注意事项和最佳实践

### 1. commit 不等于备份

容器的运行时状态（进程内存、网络连接、挂载的 volume 数据）不在 commit 范围里。commit 只管文件系统。

### 2. 敏感信息泄露风险

容器里可能有临时 token、私钥、密码等。commit 会把这些一起打进镜像。commit 前需要检查：

```bash
docker exec suspicious-container env
docker exec suspicious-container cat /root/.bash_history
docker exec suspicious-container find /tmp -type f
```

### 3. 镜像膨胀

建议 commit 后做一次 `docker image prune` 或审视是否有必要保留中间镜像。commit 产生的镜像往往比用 Dockerfile 构建的大。

### 4. 用 `--change` 补齐元数据

commit 默认继承原镜像的 CMD、ENTRYPOINT、ENV 等。如果容器内行为有变化，记得用 `-c` 更新对应指令。

### 5. 优先考虑替代方案

| 需求 | 更好的方案 |
|------|-----------|
| 保存容器内某个文件 | `docker cp` |
| 保存整个容器文件系统（不需要保留层） | `docker export` / `docker import` |
| 可复现的镜像构建 | `Dockerfile + docker build` |
| 保存运行时状态 | CRIU checkpoint |
| 日志和监控数据 | 集中式日志 / 监控系统 |

## 总结

`docker commit` 是一个"快速但不优雅"的工具。它最适合两个场景：

1. **故障取证**：把异常容器的文件系统冻结下来做离线分析。
2. **探索性调试**：在容器里试错，调通后快速保存中间结果。

生产环境的镜像构建，应该用 Dockerfile + `docker build`。如果你发现自己频繁使用 `docker commit`，大概率是缺少一个合适的 CI 构建流程。

最后一张图总结 commit 在整个 Docker 工作流里的位置：

```text
                    ┌──────────────┐
                    │  Dockerfile  │
                    └──────┬───────┘
                           │ docker build
                           ▼
┌──────────┐  docker run  ┌──────────┐  docker commit  ┌──────────┐
│  Image   │ ───────────> │ Container│ ──────────────> │ New Image│
└──────────┘              └──────────┘                 └──────────┘
                                │
                                │ docker cp
                                ▼
                           ┌──────────┐
                           │  Host FS │
                           └──────────┘
```
