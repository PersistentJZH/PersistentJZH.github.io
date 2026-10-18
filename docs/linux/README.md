---
title: Linux
createTime: 2026/06/08
permalink: /linux/
comment: false
readingTime: false
---

# Linux

Linux 内核机制、系统调优和底层原理相关笔记。

- [Linux 文件系统全景](/linux/filesystem/) — VFS四层架构、挂载原理、FHS目录结构、Journal/CoW、page cache
- [Linux inode 详解](/linux/inode/) — 索引节点、文件名与 inode 解耦、硬链接与软链接、磁盘空间排障
- [Linux Namespace 详解](/linux/namespace/) — 8 种隔离维度、clone/unshare/setns 系统调用、与容器的关系
- [cgroup v2 详解](/linux/cgroup/) — 统一层级、控制器、接口文件、与 systemd/容器/K8s 的关系
- [cgroup v1 详解](/linux/cgroup-v1/) — 多控制器独立树、cpu/memory/blkio 等子系统、与 v2 差异对照
