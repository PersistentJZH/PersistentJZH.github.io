---
title: mount 命令原理：把文件系统"嫁接"到目录树上
createTime: 2026/06/26
permalink: /linux/mount/
---

# mount 命令原理：把文件系统"嫁接"到目录树上

## 一句话理解

**`mount` 不是"创建一个快捷方式"，而是把一整个文件系统"嫁接"到目录树的某个节点上。** 嫁接完成后，用户访问那个目录时，内核**截获**这次访问，转而交给被挂载的文件系统去处理。原来的目录内容暂时被"遮蔽"，但数据不会丢失——卸载（`umount`）后就恢复了。

> `mount` 和 `ln -s` 本质不同：软链接是"文件级别的别名"，mount 是"文件系统级别的嫁接"。

## 最简单的例子：挂载一个 U 盘

```bash
# 插入 U 盘后，内核检测到设备 /dev/sdb1（假设是 ext4 格式）

# 第一步：创建一个空目录作为"嫁接点"（mount point）
mkdir /mnt/usb

# 第二步：把 U 盘的文件系统挂载到这个目录上
mount -t ext4 /dev/sdb1 /mnt/usb

# 此后，你访问 /mnt/usb 看到的不再是原来的空目录，
# 而是 U 盘里的文件了——内核已经把读写的目标从本地磁盘切换到了 U 盘
ls /mnt/usb
# 输出: 照片/  文档/  ...（U 盘上的内容）
```

这个最传统的 `mount` 用法，内核做的事可以理解为：

```
用户调用:  open("/mnt/usb/照片/beach.jpg")
           │
           ▼
        VFS 层（虚拟文件系统）
           │  查到 /mnt/usb 被挂载了一个 ext4 文件系统
           │  请求转交给 ext4 驱动
           ▼
        ext4 驱动
           │  在 /dev/sdb1 设备上解析 inode、目录项、数据块
           ▼
        返回 beach.jpg 的字节内容
```

两条关键规则：
1. **挂载点（mount point）必须是已存在的目录**，挂载后原目录内容被"盖住"
2. **一个目录可以被多次挂载**（后挂的盖住先挂的），每个挂载独立，`umount` 按相反顺序揭开

## `mount` 命令的基本语法

```bash
mount -t <文件系统类型> <设备/源> <挂载点>
#                 ↑                  ↑
#          -t 指定内核用哪个文件系统驱动来处理
#          -t 也可以是 proc, sysfs, tmpfs, overlay 等虚拟文件系统
```

## 几种不同"口味"的 mount 实例

### 例 1：tmpfs——把内存当磁盘用

```bash
# tmpfs 没有物理设备，数据存在内存里，断电就消失
mount -t tmpfs -o size=512M tmpfs /tmp/ramdisk

echo "hello" > /tmp/ramdisk/test.txt
cat /tmp/ramdisk/test.txt   # hello
# 重启后 /tmp/ramdisk 还在（空目录），但 test.txt 已经消失了
```

**内核的动作**：访问 `/tmp/ramdisk` 时，VFS 把读写请求交给 tmpfs 驱动，tmpfs 驱动直接从内核内存池中分配页面来存数据。全程不碰磁盘。

### 例 2：bind mount——给目录"开个后门"

```bash
# bind mount：把一个目录镜像到另一个路径，同一个内容，两个入口
mkdir -p /opt/data /mnt/data-mirror
echo "secret" > /opt/data/config.yml

mount --bind /opt/data /mnt/data-mirror

cat /mnt/data-mirror/config.yml   # secret——和 /opt/data/config.yml 是同一个文件！

# 验证：修改其中一边，另一边同步变化
echo "updated" >> /opt/data/config.yml
cat /mnt/data-mirror/config.yml   # secret\nupdated
```

#### bind mount 不是软链接，也不是硬链接

很多人第一次看到 bind mount，会直觉认为"这不就是个 `ln -s` 吗？"——**完全不是**。我们用实验来证明：

```bash
# 先创建一个软链接做对比
ln -s /opt/data /tmp/soft-link

# 再创建一个 bind mount
mount --bind /opt/data /mnt/data-mirror

# 实验 1：stat 查看类型
stat /tmp/soft-link
#   File: /tmp/soft-link -> /opt/data
#   Size: 9          Blocks: 0     IO Block: 4096   symbolic link
#                                                       ↑ 类型是"符号链接"
stat /mnt/data-mirror
#   File: /mnt/data-mirror
#   Size: 4096       Blocks: 8     IO Block: 4096   directory
#                                                       ↑ 类型是"目录"，没有任何"链接"标记

# 实验 2：inode 号对比
ls -li /opt/data/config.yml
# 123456 -rw-r--r-- 1 root root ... /opt/data/config.yml

ls -li /mnt/data-mirror/config.yml
# 123456 -rw-r--r-- 1 root root ... /mnt/data-mirror/config.yml
#  ↑ 同一个 inode 号！它们在内核里就是同一个文件对象

# 实验 3：创建 bind mount 不需要目标路径事先存在文件
#         软链接只是一个"路径字符串"，如果目标不存在，软链接就指向一个不存在的路径
#         bind mount 必须源目录存在，挂载后整个目录树原样出现
```

三种方式的本质区别：

| | 软链接 `ln -s` | 硬链接 `ln` | bind mount |
|---|---|---|---|
| **在内核层面是什么** | 一个特殊文件，内容是"目标路径字符串" | 一个目录项，直接指向目标 inode | VFS 挂载树中的一条记录，将整个子树重定向 |
| **能否跨文件系统** | ✅ 可以（只是字符串） | ❌ 不行（inode 跨不了文件系统） | ✅ 可以（VFS 层面操作） |
| **目标可以是文件** | ✅ | ✅ | ✅（但 bind mount 文件不常用，目录更常见） |
| **`findmnt` 能看到** | ❌ | ❌ | ✅ 作为一条 mount 记录出现 |
| **能单独设置只读** | ❌ | ❌ | ✅ `mount -o remount,ro,bind` |
| **子目录/子挂载点** | 跟着走（路径拼接） | N/A | **不跟随**（bind mount 只绑定那一层，子挂载点不会自动带过去） |

#### bind mount 在内核里到底做了什么？

最关键的一张图：

```
执行 mount --bind /opt/data /mnt/data-mirror 后：

        VFS 目录树                              VFS 挂载树 (mount tree)
  ┌─────────────────┐                  ┌────────────────────────────┐
  │  /              │                  │  /                         │
  │  ├── opt/       │                  │  ├── /mnt/data-mirror      │
  │  │   └── data/  │←──── 同一条 ────→│  │     └── binds to:      │
  │  │       ├── a  │    记录链接      │  │          /opt/data      │
  │  │       └── b  │                  │  │                         │
  │  ├── mnt/       │                  │  └── /proc                 │
  │  │   └── data-  │                  │      └── mounts on: proc   │
  │  │       mirror/│←── 访问这里时 ──→│                             │
  │  │       ├── a  │    内核查挂载树   │                             │
  │  │       └── b  │    重定向到源目录 │                             │
  └─────────────────┘                  └────────────────────────────┘
```

**内核执行流程**（以 `open("/mnt/data-mirror/config.yml")` 为例）：

```
1. VFS 逐级解析路径 "/" → "mnt" → "data-mirror" → "config.yml"
2. 解析到 "data-mirror" 时，VFS 发现这是一个 mount point
3. 查 mount tree：/mnt/data-mirror 绑定到了 /opt/data
4. 后续的路径解析（"config.yml"）直接在 /opt/data 的目录树下继续
5. 最终拿到的 dentry/inode 就是 /opt/data/config.yml 的 dentry/inode
6. 返回给用户的文件描述符，和直接 open("/opt/data/config.yml") 拿到的一模一样
```

**一句话总结**：软链接是"文件内容里写了个路径"（用户态可见），bind mount 是"内核 VFS 层的目录树重定向"（用户态完全无感知，`stat` 都看不出区别）。bind mount 比软链接更"底层"、更"透明"。

#### bind mount 的一个反直觉行为：子挂载点不跟随

```bash
# 先准备好环境
mkdir -p /opt/data/sub
mount -t tmpfs -o size=10M tmpfs /opt/data/sub   # sub 是一个独立的 tmpfs 挂载点

# 做 bind mount
mount --bind /opt/data /mnt/data-mirror

# 问题：/mnt/data-mirror/sub 里面能看到 tmpfs 的内容吗？
ls /mnt/data-mirror/sub/
# 输出: （空）  ← 看不到！bind mount 没有把子挂载点带过来

# 解决方法：用 --rbind（recursive bind）
mount --rbind /opt/data /mnt/data-mirror-r
ls /mnt/data-mirror-r/sub/
# 现在能看到了
```

> 这就是为什么 Docker 的 `-v` 在容器里能看到所有子目录内容——Docker 内部用的是递归 bind mount。

#### bind mount 与硬链接的对比实验

```bash
# 硬链接：同一个文件有两个名字
ln /opt/data/config.yml /opt/data/config-hardlink.yml

ls -li /opt/data/config.yml /opt/data/config-hardlink.yml
# 123456 ... config.yml
# 123456 ... config-hardlink.yml
#  ↑ 同一个 inode，链接计数 = 2

# 硬链接只能链接文件，不能链接目录（Linux 不允许），不能跨文件系统
# bind mount 可以绑定目录，可以跨文件系统，可以在 VFS 层面递归
```

> Docker 大量使用 bind mount：`docker run -v /host/path:/container/path` 就是一个 bind mount，把宿主机目录"嫁接"进容器的文件系统树。

### 例 3：procfs——文件即内核数据

```bash
# /proc 是一个伪文件系统，文件内容由内核动态生成，磁盘上不存在
mount -t proc proc /proc   # 系统启动时自动执行

cat /proc/cpuinfo           # 不是读磁盘，而是内核当场计算返回
cat /proc/12345/status      # 进程 12345 的状态，内核实时查询
```

**内核的动作**：VFS 识别到 `/proc` 挂载的是 procfs，把 `read()` 调用交给 procfs 驱动。procfs 驱动根据路径解析出"你想查什么"（CPU 信息、某个进程的状态…），然后从内核数据结构中实时生成文本返回。全程没有任何磁盘 IO。

### 例 4：OverlayFS——联合文件系统

```bash
# ============================================================
# OverlayFS 实验：把多个目录"叠"成一个合并视图
# ============================================================

# 第 1 步：创建四个目录，它们各司其职
mkdir -p /tmp/overlay-demo/{lower,upper,work,merged}
#   lower  → 只读底层（相当于 Docker 镜像的只读层）
#   upper  → 可写顶层（相当于容器的可写层，修改都在这里）
#   work   → OverlayFS 内部工作目录（必须和 upper 在同一文件系统，不能手动操作它）
#   merged → 合并后的视图（你最终访问的目录，看起来像是一个完整的文件系统）

# 第 2 步：在 lower 和 upper 层各放一个同名文件，模拟"覆盖"效果
echo "from lower" > /tmp/overlay-demo/lower/file.txt
echo "from upper" > /tmp/overlay-demo/upper/file.txt
# 预期：merged 里会看到 upper 的版本，因为 upper 优先级更高

# 再放一个只在 lower 层的文件，验证"透传"效果
echo "only in lower, should still visible" > /tmp/overlay-demo/lower/only-lower.txt
# 预期：merged 里也能看到这个文件，因为 lower 层的文件会"透"上来

# 确认文件类型：都是普通文件（-），没有符号链接
ls -la /tmp/overlay-demo/lower/
# -rw-r--r-- ... file.txt
# -rw-r--r-- ... only-lower.txt
ls -la /tmp/overlay-demo/upper/
# -rw-r--r-- ... file.txt     ← 与 lower 层同名但内容不同

# 第 3 步：执行 mount（需要 root 权限）
mount -t overlay overlay \
  -o lowerdir=/tmp/overlay-demo/lower,upperdir=/tmp/overlay-demo/upper,workdir=/tmp/overlay-demo/work \
  /tmp/overlay-demo/merged
#   │        │       │                                                                              │
#   │        │       └── -o 指定 OverlayFS 的三个关键目录（lower/upper/work）                        │
#   │        └── 设备名（OverlayFS 没有实际设备，这里随便填一个标识符，习惯填 "overlay"）              │
#   └── -t overlay：告诉内核用 OverlayFS 驱动处理这个挂载                                          │
#                                                                              挂载点：合并视图的入口

# 第 4 步：验证合并效果
cat /tmp/overlay-demo/merged/file.txt
# 输出: from upper
#        ↑ upper 层的同名文件"盖住"了 lower 层的 —— 这就是"覆盖"（名字里 overlay 的含义）

cat /tmp/overlay-demo/merged/only-lower.txt
# 输出: only in lower, should still visible
#        ↑ upper 层没有这个文件，所以 lower 层的文件"透传"上来 — 这就是"联合"（Union）

# 合并视图中的文件类型：都是普通文件，不是符号链接
# OverlayFS 在内核层透明合并，用户态看不出任何区别
ls -la /tmp/overlay-demo/merged/
# -rw-r--r-- ... file.txt
# -rw-r--r-- ... only-lower.txt

# 第 5 步：验证"写入只会到 upper 层"
echo "created at runtime" > /tmp/overlay-demo/merged/new-file.txt
# 这个新文件实际存在哪里？

cat /tmp/overlay-demo/upper/new-file.txt
# 输出: created at runtime  ← 在 upper 层！
# /tmp/overlay-demo/lower/ 下没有 new-file.txt —— lower 层纹丝未动

# 文件类型：upper 层的新文件是普通文件，merged 中看到的也是同一个普通文件
ls -la /tmp/overlay-demo/upper/new-file.txt /tmp/overlay-demo/merged/new-file.txt
# -rw-r--r-- ... upper/new-file.txt
# -rw-r--r-- ... merged/new-file.txt   ← 同一个文件，不同路径

# 第 6 步：验证"修改 lower 层已有文件会触发 copy-up"
echo "appended in upper" >> /tmp/overlay-demo/merged/only-lower.txt
# 追加了一行文字

cat /tmp/overlay-demo/upper/only-lower.txt
# 输出: only in lower, should still visible
#       appended in upper
#       ↑ 整个文件被从 lower 复制到 upper，然后修改的是 upper 的副本

cat /tmp/overlay-demo/lower/only-lower.txt
# 输出: only in lower, should still visible
#       ↑ lower 层原文件完全没变！这就是 Copy-on-Write

# 文件类型对比：copy-up 后 upper 层的文件仍是普通文件（-），与 lower 层原文件类型一致
ls -la /tmp/overlay-demo/lower/only-lower.txt /tmp/overlay-demo/upper/only-lower.txt
# -rw-r--r-- ... lower/only-lower.txt   ← 原始（未变）
# -rw-r--r-- ... upper/only-lower.txt   ← copy-up 副本（已修改），仍是普通文件

# 第 7 步：验证"删除"的本质是创建一个 whiteout 标记
rm /tmp/overlay-demo/merged/only-lower.txt
# "删除"了这个文件

ls /tmp/overlay-demo/merged/only-lower.txt
# ls: cannot access ...: No such file or directory  ← merged 里确实看不到了

# 关键！查看 upper 层中该文件的类型变化：
ls -la /tmp/overlay-demo/upper/only-lower.txt
# c--------- 1 root root 0, 0 ... /tmp/overlay-demo/upper/only-lower.txt
# ↑ 文件类型从 -（普通文件）变成了 c（字符设备）！主次设备号 0:0
# 这就是 whiteout 文件——OverlayFS 用这个特殊文件来"盖住" lower 层的同名文件

# 再用 stat 确认文件类型：
stat /tmp/overlay-demo/upper/only-lower.txt
#   File: /tmp/overlay-demo/upper/only-lower.txt
#   Size: 0          Blocks: 0     IO Block: 4096   character special file
# Device: 0,0   Inode: ...   Links: 1   Device type: 0,0
#                                                       ↑ 字符设备 0:0 = whiteout

# whiteout 机制总结：
# - lower 层是只读的，无法真正删除文件，所以 OverlayFS 用"盖住"的方式模拟删除
# - whiteout 是一个字符设备文件（c 0:0），放在 upper 层
# - OverlayFS 构建 merged 视图时：看到 upper 中有 whiteout → 跳过 lower 同名文件 → 用户视角"文件被删了"
# - merged 中 ls 看不到 whiteout 本身，因为 OverlayFS 把它从目录列表中过滤掉了
#   但直接读 upper 层就能看到（绕过了 OverlayFS 的过滤）

# 第 8 步：清理实验
# 注意：必须先 umount 再 rm！如果直接 rm -rf overlay-demo 会报错：
#   rm: cannot remove 'overlay-demo/merged': Device or resource busy
# 因为 merged 是一个活跃的挂载点（mount point），内核持有对该目录的引用，
# 在 umount 之前无法删除——这和"文件正在被进程打开时无法删除"是同一个道理
umount /tmp/overlay-demo/merged
rm -rf /tmp/overlay-demo
```

**内核的动作**：VFS 把对 `/tmp/overlay-demo/merged` 下所有文件的操作交给 OverlayFS 驱动。OverlayFS 驱动按自己的规则处理：
- **读文件**：从 upper 层到 lower 层逐层查找，返回第一个匹配
- **写文件**：如果是新文件直接在 upper 层创建；如果 lower 层已有同名文件，先 copy-up 到 upper 再修改
- **删文件**：在 upper 层创建一个 whiteout 字符设备文件（`c 0:0`）来标记"此文件已删除"

> Docker 镜像的分层存储正是基于 OverlayFS 的 mount 机制。详见 [Docker 文件系统揭秘](/linux/docker-filesystem/)。

## 这些文件系统都是 Linux 自带的吗？

你可能注意到上面提到了 `ext4`、`tmpfs`、`overlay`、`proc`、`nfs`……它们从哪来的？需要安装吗？答案是：**除了少数商业/第三方文件系统（如 ZFS、vboxsf），绝大多数都直接内置于 Linux 内核主线中。**

### 文件系统的三种存在形式

| 形式 | 说明 | 例子 |
|------|------|------|
| **内核主线源码内置** | 代码在 Linus Torvalds 维护的 Linux 内核源码树中，随内核一起编译 | `ext4`, `xfs`, `tmpfs`, `proc`, `sysfs`, `overlay`, `btrfs`, `nfs` 等 |
| **内核主线，作为模块加载** | 同上，但编译为 `.ko` 模块，需要时才加载到内存 | `cifs`, `nfsd`, `vfat`, `ntfs3`, `squashfs` 等 |
| **树外（out-of-tree）模块** | 不在此内核主线中，需要单独安装，如 DKMS 模块 | ZFS（许可证不兼容，无法并入主线）、`vboxsf`（VirtualBox Guest Additions）、部分商业存储驱动 |

### 如何查看你的内核支持哪些文件系统？

```bash
# 方法 1：查看当前内核中已加载的文件系统模块
ls /proc/filesystems
# 输出示例：
# nodev   sysfs         ← nodev 表示这是伪文件系统（没有对应的块设备）
# nodev   tmpfs
# nodev   proc
# nodev   overlay
# nodev   cgroup
#         ext4          ← 没有 nodev 标记的是真正的磁盘文件系统
#         xfs
#         btrfs

# 方法 2：查看内核能加载但还没加载的模块
ls /lib/modules/$(uname -r)/kernel/fs/
# 输出示例：
# btrfs/  cifs/  ext4/  nfs/  overlayfs/  squashfs/  xfs/  ...
# 每个子目录下可能有一个或多个 .ko.xz 模块文件

# 方法 3：查看某个文件系统模块的详细信息
modinfo overlay
# filename:       /lib/modules/6.8.0/kernel/fs/overlayfs/overlay.ko.xz
# description:    Overlay filesystem
# license:        GPL
#  ↑ 说明 overlay 就是一个标准的内核模块，源码在 fs/overlayfs/ 目录下
```

### 常见文件系统的"出身"

| 文件系统 | 出身 | 备注 |
|----------|------|------|
| `ext4` | 内核主线，默认编译进内核 | 2008 年合入，Linux 最常用的本地文件系统 |
| `xfs` | 内核主线 | SGI 贡献，2001 年合入，CentOS/RHEL 默认 |
| `btrfs` | 内核主线 | Oracle 贡献，2009 年合入，支持快照和压缩 |
| `tmpfs` | 内核主线，**永远内置** | 基于内核的页面缓存，不能作为模块（太基础了） |
| `proc` / `sysfs` | 内核主线，**永远内置** | 同样是内核基础设施，无法卸载 |
| `overlay` | 内核主线，2014 年合入（3.18） | Docker 的默认存储驱动。之前有一个 `overlayfs`（单数）在 3.18 被废弃，现用 `overlay`（复数） |
| `devtmpfs` | 内核主线 | 管理 `/dev` 下的设备文件，启动早期自动挂载 |
| `cgroup` / `cgroup2` | 内核主线 | cgroup v1 和 v2，容器资源隔离的基础 |
| `nfs` | 内核主线 | 客户端（`nfs`）和服务器端（`nfsd`）都是主线 |
| `cifs` | 内核主线，通常编译为模块 | SMB/CIFS 客户端，连接 Windows 共享 |
| `vfat` / `exfat` | 内核主线，模块 | U 盘常用文件系统。exFAT 曾因专利问题长期缺失，2019 年由微软贡献合入 |
| `ntfs3` | 内核主线（5.15+） | Paragon 贡献的 NTFS 读写驱动 |
| `squashfs` | 内核主线，模块 | 只读压缩文件系统，Snap/AppImage 的基础 |
| **ZFS** | **树外**（OpenZFS） | 许可证 CDDL 与 GPL 不兼容，无法合入内核主线，需通过 DKMS 单独安装 |
| **vboxsf** | **树外** | VirtualBox 共享文件夹驱动，安装 Guest Additions 时额外编译 |

### 实验：手动加载一个文件系统模块

```bash
# 假设你的内核把 cifs 编译成了模块，默认没加载
lsmod | grep cifs
# （无输出 —— 没加载）

mount -t cifs //192.168.1.1/share /mnt/smb -o user=admin
# 内核会自动加载 cifs.ko 模块！你不需要手动 modprobe

lsmod | grep cifs
# cifs                 123456  0
#  ↑ 模块已被自动加载

# 对于 tmpfs、proc、overlay 这类伪文件系统，它们可能根本没有对应模块
# ——代码直接编译进了内核镜像（vmlinuz），永远可用，无需加载
modprobe tmpfs
# modprobe: FATAL: Module tmpfs not found in directory /lib/modules/...
#  ↑ 不是模块，是内核内置的，不需要 modprobe
```

### 一句话总结

**你日常用到的所有文件系统——`ext4`、`tmpfs`、`overlay`、`proc`、`nfs`——全都来自 Linux 内核主线源码树。** 你不需要安装任何东西，`mount -t xxx` 就是纯粹的内核功能调用。唯一的例外是 ZFS 这类许可证冲突的树外模块，以及 VirtualBox 等虚拟化平台的特殊驱动。

你每次执行 `mount`，内核都在一个内部数据结构（mount tree）中记录一条挂载关系。你可以通过以下方式查看：

```bash
# 方法 1：读 /proc/mounts——内核视角，最权威
cat /proc/mounts
# 输出示例：
# /dev/sda1 / ext4 rw,relatime 0 0
# overlay /var/lib/docker/overlay2/abc.../merged overlay rw,relatime,lowerdir=...,upperdir=...,workdir=... 0 0
# tmpfs /tmp/ramdisk tmpfs rw,size=524288k 0 0

# 方法 2：mount 命令——人类可读版
mount | grep overlay
# 能看到所有 Docker 容器的 overlay 挂载

# 方法 3：findmnt——树状展示挂载层级（推荐！）
findmnt -t overlay
# 以树形结构展示所有 overlay 类型挂载点的父子关系
```

## 每种文件系统的典型应用场景

上面介绍了四种 mount 的"口味"，但更重要的是知道**什么时候该用哪一种**。

### tmpfs 的实战场景

tmpfs 的核心价值是**速度**（内存级 IO）和**挥发性**（重启自动清空），适合存放不需要持久化的临时数据。

#### 场景 1：系统默认的 `/tmp` 目录

很多现代 Linux 发行版（如 CentOS 7+、Ubuntu）默认把 `/tmp` 挂载为 tmpfs：

```bash
findmnt /tmp
# 输出示例：
# TARGET  SOURCE FSTYPE OPTIONS
# /tmp    tmpfs  tmpfs  rw,nosuid,nodev,noexec,relatime
```

为什么这样做？两个好处：
- 重启后 `/tmp` 里的临时文件自动清零，不会越积越多
- `/tmp` 的读写走内存，不磨损 SSD

> 注意：`/tmp` 作为 tmpfs 时，大文件（如几百 MB 的临时压缩包）会直接消耗内存。某些发行版因此仍用磁盘上的 `/tmp`，或用 `systemd-tmpfiles` 定期清理。

#### 场景 2：`/dev/shm` — POSIX 共享内存

```bash
# /dev/shm 是系统自带的 tmpfs，程序间共享内存的默认位置
ls -ld /dev/shm
# drwxrwxrwt 2 root root 40 Jun 26 10:00 /dev/shm

# 默认大小是物理内存的一半
df -h /dev/shm
# Filesystem      Size  Used Avail Use% Mounted on
# tmpfs           7.8G     0  7.8G   0% /dev/shm
```

Python 的 `multiprocessing.shared_memory`、PostgreSQL 的共享缓冲区、Nginx 的 `proxy_cache` 都可以指向 `/dev/shm` 来加速。

#### 场景 3：Docker 的 `--tmpfs` — 容器里"不落盘"的目录

```bash
# 容器的 /app/tmp 目录写在内存里，容器删除后数据自动消失
docker run --tmpfs /app/tmp:rw,size=256M,noexec alpine sh -c \
  "dd if=/dev/zero of=/app/tmp/test bs=1M count=100 && ls -lh /app/tmp/"
# 100MB 写入瞬间完成，没有任何磁盘 IO
```

K8s 中对应的写法是 `emptyDir.medium: "Memory"`：

```yaml
volumes:
- name: cache-volume
  emptyDir:
    medium: "Memory"   # 底层就是 mount -t tmpfs
    sizeLimit: 256Mi
```

#### 场景 4：构建/编译缓存

```bash
# 把编译中间产物放在 tmpfs 上，大幅加速 C/C++ 增量编译
mount -t tmpfs -o size=4G tmpfs /tmp/build

# 然后在这个目录里 make
cd /path/to/project
mkdir -p /tmp/build/output
make O=/tmp/build/output -j$(nproc)
# 中间 .o 文件全在内存里，比磁盘编译快 2-5 倍
```

#### ⚠️ tmpfs 陷阱：它会 swap！

很多人误以为 tmpfs 的数据"只在内存里"。实际上，内存紧张时内核**会把 tmpfs 页面 swap 到磁盘**，你的"内存文件系统"最终还是落盘了。想避免 swap 可以配合 cgroup 限制，或者用 `ramfs`（但 ramfs 不会 swap 也不会限制大小，用满了直接 OOM，**不推荐**）。

```bash
# 查看当前 tmpfs 有多少被 swap 出去了
grep -E '^Shmem:|^SwapCached:' /proc/meminfo
# Shmem:     524288 kB   ← tmpfs 占用的总内存（含被 swap 的）
# SwapCached: 131072 kB   ← 其中被换出的部分
```

### bind mount 的实战场景

bind mount 的核心价值是**让一个目录出现在两个路径下**——不是复制，是同一份数据。

#### 场景 1：Docker / K8s 卷挂载

这是最常见的 bind mount 使用场景，前面已经提过。一个完整的例子：

```bash
# 宿主机的 /opt/nginx/html 直接出现在容器里的 /usr/share/nginx/html
docker run -v /opt/nginx/html:/usr/share/nginx/html:ro nginx

# 容器内 ls /usr/share/nginx/html 看到的就是宿主机上的文件
# 加上 :ro 让容器只能读不能写，更安全
```

K8s 中的 `hostPath` 卷底层同样是 bind mount：

```yaml
volumes:
- name: host-data
  hostPath:
    path: /data
    type: Directory
```

#### 场景 2：构建 chroot 环境

```bash
# chroot 需要 /proc、/dev、/sys 才能正常运作
CHROOT=/tmp/my-chroot
mkdir -p $CHROOT/{proc,dev,sys}

mount --bind /proc $CHROOT/proc
mount --bind /dev  $CHROOT/dev
mount --bind /sys  $CHROOT/sys

chroot $CHROOT /bin/bash
# 现在 chroot 环境内 ps、top 等都能正常工作
```

#### 场景 3：NFS 再导出（NFS re-export）

```bash
# NFS 挂载的目录不能直接再通过 NFS 分享出去
# 但可以通过 bind mount "换个路径"后再配合其他工具分享
mount -t nfs 192.168.1.100:/exports/data /mnt/nfs-data
mount --bind /mnt/nfs-data /srv/share
```

#### 场景 4：只读 bind mount — 安全加固

```bash
# 把一个目录以只读方式 bind mount，即使是 root 也改不了
mount --bind /opt/config /etc/app/config
mount -o remount,ro,bind /etc/app/config

touch /etc/app/config/test  # Permission denied —— 即使你是 root！
```

这在容器安全和不可变基础设施中非常有用。

### procfs 和 sysfs 的实战场景

#### `/proc` 不是只能看，还能写！

```bash
# 很多 /proc/sys/ 下的文件是可写的，用来在线调整内核参数

# 开启 IP 转发（路由器必备）
echo 1 > /proc/sys/net/ipv4/ip_forward

# 调整最大文件打开数
echo 65535 > /proc/sys/fs/file-max

# 禁止 ping 响应
echo 1 > /proc/sys/net/ipv4/icmp_echo_ignore_all

# 等价命令（更可读）
sysctl -w net.ipv4.ip_forward=1
```

#### 容器里为什么必须有 `/proc`？

如果你 `docker run` 时不小心覆盖了 `/proc`，容器基本变废人：

```bash
# ❌ 这样做会让容器里的 ps、top、free 等全部失效
docker run -v /some/empty/dir:/proc alpine ps aux
# 报错: /proc must be mounted

# 正确做法：不要覆盖 /proc，让 Docker 自动挂载
```

这也是为什么 K8s Pod 的 Pause 容器要负责挂载 `/proc`——它是所有容器共享的进程信息窗口。

#### sysfs（`/sys`）：硬件和设备的信息窗口

```bash
# /sys 是 sysfs，2.6 内核引入，比 /proc 更结构化

# 查看块设备大小
cat /sys/block/sda/size    # 扇区数

# 查看网卡速率
cat /sys/class/net/eth0/speed   # 1000（Mbps）

# 在线断开/连接 PCI 设备（热插拔模拟）
echo 0 > /sys/bus/pci/devices/0000:00:1f.2/remove
echo 1 > /sys/bus/pci/rescan
```

### 其他常见文件系统类型速览

| 类型 | 挂载示例 | 用途 |
|------|---------|------|
| `devtmpfs` | `mount -t devtmpfs devtmpfs /dev` | 设备文件（`/dev/sda`, `/dev/tty` 等），内核自动管理 |
| `cgroup2` | `mount -t cgroup2 cgroup2 /sys/fs/cgroup` | cgroup v2 统一层级，容器资源限制的底层 |
| `cgroup` | `mount -t cgroup cgroup /sys/fs/cgroup/cpu` | cgroup v1（已逐步淘汰） |
| `sysfs` | `mount -t sysfs sysfs /sys` | 内核对象模型，硬件/驱动/总线信息 |
| `securityfs` | `mount -t securityfs securityfs /sys/kernel/security` | Linux 安全模块（SELinux/AppArmor）接口 |
| `debugfs` | `mount -t debugfs debugfs /sys/kernel/debug` | 内核调试接口（ftrace、kprobes 等） |
| `nfs` | `mount -t nfs 192.168.1.1:/data /mnt/nfs` | 网络文件系统，跨机器共享存储 |
| `cifs` | `mount -t cifs //server/share /mnt/smb -o user=admin` | SMB/CIFS（Windows 共享文件夹） |

> 你平时运行 `ls /` 看到的 `/proc`、`/sys`、`/dev`、`/run`、`/tmp`（可能是 tmpfs），它们全是 mount 出来的。一个现代 Linux 系统，启动后有几十个活跃的 mount 点，大部分不是磁盘分区，而是这些**基于内存的内核伪文件系统**。

## 常用 mount 选项

`-o` 参数后面可以跟多个逗号分隔的选项，以下是生产环境最常用的：

### 读写与安全

| 选项 | 效果 |
|------|------|
| `rw` | 读写（默认） |
| `ro` | 只读，即使 root 也不能写 |
| `noexec` | 禁止执行该文件系统中的任何二进制文件。**安全必备** |
| `nosuid` | 忽略 suid/sgid 位，防止提权攻击 |
| `nodev` | 忽略设备文件，防止通过 mknod 创建设备来绕过权限 |

这三件套 `nosuid,nodev,noexec` 经常一起出现，是系统加固的标准操作：

```bash
# /tmp 的标准挂载选项——你不能在 /tmp 里执行程序，也不能创建设备
mount -t tmpfs -o nosuid,nodev,noexec tmpfs /tmp

# 验证：下载一个可执行文件到 /tmp，尝试运行
cp /bin/ls /tmp/
/tmp/ls              # Permission denied —— noexec 起了作用
```

### 性能相关

| 选项 | 效果 |
|------|------|
| `noatime` | 读取文件时不更新访问时间（atime）。**数据库/高 IO 场景强烈推荐** |
| `relatime` | 折中方案：只在 atime 早于 mtime/ctime 时更新。现代内核默认选项 |
| `sync` | 所有写操作立即同步到磁盘，慢但安全（数据库有时需要） |
| `async` | 写操作异步批量刷盘（默认） |

```bash
# 数据库数据盘推荐 noatime，每次 SELECT 不会产生写 IO
mount -t ext4 -o noatime /dev/sdb1 /data/postgresql

# 验证 atime 的行为
cat /data/postgresql/test.sql   # 读取文件
stat /data/postgresql/test.sql | grep Access
# Access: 2026-06-26 10:00:00  ← 如果用了 noatime，这个时间不会变
```

### tmpfs 专属

| 选项 | 效果 |
|------|------|
| `size=512M` | 最大容量限制（默认物理内存的 50%）。超限后写入报 "No space left on device" |
| `nr_inodes=10000` | 最大 inode 数（文件数上限） |
| `mode=1777` | 权限，`1777` 就是 sticky bit + 所有人可读写（和 `/tmp` 一样） |

```bash
# 创建一个 10MB 的小型 tmpfs，写入超限直接报错
mount -t tmpfs -o size=10M tmpfs /tmp/small-ram

dd if=/dev/zero of=/tmp/small-ram/big bs=1M count=20
# dd: error writing '/tmp/small-ram/big': No space left on device
```

## 常见问题与排查

### "target is busy" —— 卸载不掉怎么办？

```bash
umount /mnt/data
# umount: /mnt/data: target is busy

# 原因：有进程的当前目录或打开文件在被挂载的文件系统里
```

排查三步走：

```bash
# 步骤 1：找到谁在用这个挂载点
lsof /mnt/data
# COMMAND   PID  USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
# bash     1234  root  cwd    DIR   8,17     4096    2 /mnt/data

# 步骤 2：更直接的方式——fuser
fuser -v /mnt/data
#                      USER        PID ACCESS COMMAND
# /mnt/data:           root       1234 ..c.. bash

# 步骤 3：杀进程后重试，或直接强制卸载
fuser -km /mnt/data        # 杀掉所有占用进程
umount /mnt/data           # 成功！

# 或者：懒卸载（lazy umount）——立即从目录树摘掉，等没人用了再真正卸载
umount -l /mnt/data
```

### mount namespace：容器为什么有独立的挂载表？

这是理解"容器里 `mount` 看不到宿主机挂载"的关键：

```bash
# 宿主机上查看挂载
mount | wc -l
# 42  ← 宿主机有 42 个挂载点

# 容器里查看挂载
docker run alpine mount | wc -l
# 7   ← 容器只有 7 个挂载点，完全是另一张"挂载表"！
```

每个容器运行在独立的 **mount namespace** 中，拥有自己的挂载点列表。这就是为什么：
- 容器里 `df -h` 看到的磁盘和宿主机完全不同
- 容器里 mount 一个 tmpfs，宿主机完全看不到
- `docker run -v` 本质上是在容器的 mount namespace 里添加一条 bind mount 记录

### `/etc/fstab`：让挂载在重启后不丢失

手动 `mount` 的挂载重启后就没了。要让挂载持久化，写入 `/etc/fstab`：

```bash
# /etc/fstab 格式：
# <设备>       <挂载点>  <类型>  <选项>            <dump> <fsck顺序>
/dev/sdb1      /data     ext4    defaults,noatime  0      2
tmpfs          /tmp/ram  tmpfs   size=512M,mode=1777 0    0

# 编辑完 fstab 后测试（不真正重启）
mount -a
# 如果没报错，说明 fstab 语法正确

# systemd 也有自己的 .mount 单元，更现代的做法：
# /etc/systemd/system/data.mount
systemctl daemon-reload
systemctl start data.mount
```

## mount 与常见工具的关系总览

| 场景 | 背后的 mount 动作 |
|------|------------------|
| 插入 U 盘自动挂载（udev） | `mount -t vfat/exfat/ext4 /dev/sdX /media/user/xxx` |
| Docker 启动容器 | `mount -t overlay lowerdir=... /var/lib/docker/overlay2/xxx/merged` |
| `docker run -v /host:/container` | `mount --bind /host /var/lib/docker/.../merged/container` |
| `docker run --tmpfs /app/tmp` | `mount -t tmpfs tmpfs /var/lib/docker/.../merged/app/tmp` |
| K8s `hostPath` 卷 | `mount --bind /host/path /container/path` |
| K8s `emptyDir.medium: Memory` | `mount -t tmpfs tmpfs /container/cache` |
| K8s Pod 共享 `/proc` | mount namespace 内 `mount -t proc proc /proc`（pause 容器负责） |
| `systemd-tmpfiles` 清理 `/tmp` | 前提是 `/tmp` 为 tmpfs（重启清零），非 tmpfs 则定期遍历删除 |
| `df -h` 的每一行 | 遍历 `/proc/mounts` 中的每一条挂载记录 |
| chroot / 容器内的 `/dev` | `mount --bind /dev /chroot/dev` 或 `mount -t devtmpfs devtmpfs /chroot/dev` |

> 一句话：**"嫁接"是 Linux 文件系统最核心的抽象之一。Docker 容器、K8s 卷、系统目录、甚至 U 盘自动挂载——本质上全是 mount。**
