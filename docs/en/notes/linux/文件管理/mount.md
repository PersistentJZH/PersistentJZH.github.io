---
sourceHash: 3d4bcd9f36769f5820b33add9f41ac217b22a432d8117ae2fe3bdccc24d068fd
title: 'How mount Works: Grafting a Filesystem onto the Directory Tree'
createTime: 2026/06/26
permalink: /en/notes/linux/mount/
---

# How mount Works: Grafting a Filesystem onto the Directory Tree

## Understanding It in One Sentence

**`mount` does not create a shortcut: it grafts an entire filesystem onto a node in the directory tree.** After mounting, when a user accesses that directory, the kernel **intercepts** the access and hands it to the mounted filesystem. The directory's original contents are temporarily hidden, but no data is lost; unmounting with `umount` reveals them again.

> `mount` and `ln -s` differ fundamentally: a symbolic link is a file-level alias, while a mount is a filesystem-level graft.

## The Simplest Example: Mount a USB Drive

```bash
# After inserting a USB drive, the kernel detects /dev/sdb1 (assume ext4 format)

# Step 1: Create an empty directory as the "graft point" (mount point)
mkdir /mnt/usb

# Step 2: Mount the USB drive's filesystem on this directory
mount -t ext4 /dev/sdb1 /mnt/usb

# Accessing /mnt/usb now shows the USB drive's files instead of the original empty directory.
# The kernel has switched reads and writes from the local disk to the USB drive.
ls /mnt/usb
# Output: photos/  documents/  ... (contents of the USB drive)
```

For this traditional use of `mount`, the kernel's work can be understood as follows:

```
User calls: open("/mnt/usb/photos/beach.jpg")
            │
            ▼
         VFS layer (Virtual Filesystem)
            │ Finds an ext4 filesystem mounted on /mnt/usb
            │ Hands the request to the ext4 driver
            ▼
         ext4 driver
            │ Resolves inodes, directory entries, and data blocks on /dev/sdb1
            ▼
         Returns the bytes of beach.jpg
```

Two key rules:
1. **A mount point must be an existing directory**; mounting covers its original contents.
2. **One directory can receive multiple mounts**: later mounts cover earlier ones, each mount remains independent, and `umount` uncovers them in reverse order.

## Basic `mount` Syntax

```bash
mount -t <filesystem-type> <device/source> <mount-point>
#                 ↑                            ↑
#          -t chooses the kernel filesystem driver
#          -t can also select a virtual filesystem such as proc, sysfs, tmpfs, or overlay
```

## Examples of Different Kinds of Mounts

### Example 1: tmpfs—Use Memory as a Disk

```bash
# tmpfs has no physical device; its data lives in memory and disappears after power loss
mount -t tmpfs -o size=512M tmpfs /tmp/ramdisk

echo "hello" > /tmp/ramdisk/test.txt
cat /tmp/ramdisk/test.txt   # hello
# After reboot, /tmp/ramdisk still exists as an empty directory, but test.txt is gone
```

**What the kernel does**: when `/tmp/ramdisk` is accessed, VFS sends read/write requests to the tmpfs driver, which allocates pages directly from the kernel memory pool to store data. The disk is never touched.

### Example 2: Bind Mount—Give a Directory Another Entrance

```bash
# Bind mount: mirror a directory at another path; same contents, two entrances
mkdir -p /opt/data /mnt/data-mirror
echo "secret" > /opt/data/config.yml

mount --bind /opt/data /mnt/data-mirror

cat /mnt/data-mirror/config.yml   # secret — the same file as /opt/data/config.yml!

# Verify: change one side and the other changes too
echo "updated" >> /opt/data/config.yml
cat /mnt/data-mirror/config.yml   # secret\nupdated
```

#### A Bind Mount Is Neither a Symbolic Link nor a Hard Link

Many people's first reaction to a bind mount is, "Isn't that just `ln -s`?" **It is not.** Let's demonstrate the difference:

```bash
# Create a symbolic link for comparison
ln -s /opt/data /tmp/soft-link

# Also create a bind mount
mount --bind /opt/data /mnt/data-mirror

# Experiment 1: inspect types with stat
stat /tmp/soft-link
#   File: /tmp/soft-link -> /opt/data
#   Size: 9          Blocks: 0     IO Block: 4096   symbolic link
#                                                       ↑ Type is "symbolic link"
stat /mnt/data-mirror
#   File: /mnt/data-mirror
#   Size: 4096       Blocks: 8     IO Block: 4096   directory
#                                                       ↑ Type is "directory", with no link marker

# Experiment 2: compare inode numbers
ls -li /opt/data/config.yml
# 123456 -rw-r--r-- 1 root root ... /opt/data/config.yml

ls -li /mnt/data-mirror/config.yml
# 123456 -rw-r--r-- 1 root root ... /mnt/data-mirror/config.yml
#  ↑ Same inode number! They are the same file object in the kernel

# Experiment 3: creating a bind mount does not require files to exist at the destination first
#         A symbolic link is only a path string; a missing target leaves it pointing nowhere
#         A bind mount requires the source directory to exist, and exposes its entire tree unchanged
```

The fundamental differences:

| | Symbolic link `ln -s` | Hard link `ln` | Bind mount |
|---|---|---|---|
| **What it is in the kernel** | A special file containing a target path string | A directory entry pointing directly to the target inode | A VFS mount-tree record redirecting an entire subtree |
| **Can cross filesystems?** | ✅ Yes, it is only a string | ❌ No, inodes cannot cross filesystems | ✅ Yes, it operates at the VFS level |
| **Can target a file?** | ✅ | ✅ | ✅ (file bind mounts are uncommon; directories are more common) |
| **Visible in `findmnt`?** | ❌ | ❌ | ✅ Appears as a mount record |
| **Can independently be read-only?** | ❌ | ❌ | ✅ `mount -o remount,ro,bind` |
| **Subdirectories/submounts** | Followed through path concatenation | N/A | **Submounts are not followed**: a bind mount binds only that level and does not automatically include child mounts |

#### What Does a Bind Mount Actually Do in the Kernel?

The key diagram:

```
After mount --bind /opt/data /mnt/data-mirror:

        VFS directory tree                      VFS mount tree
  ┌─────────────────┐                  ┌────────────────────────────┐
  │  /              │                  │  /                         │
  │  ├── opt/       │                  │  ├── /mnt/data-mirror       │
  │  │   └── data/  │←── same record ─→│  │     └── binds to:        │
  │  │       ├── a  │       link       │  │          /opt/data       │
  │  │       └── b  │                  │  │                          │
  │  ├── mnt/       │                  │  └── /proc                  │
  │  │   └── data-  │                  │      └── mounts on: proc    │
  │  │       mirror/│←── access here ─→│                             │
  │  │       ├── a  │  kernel checks   │                             │
  │  │       └── b  │  the mount tree  │                             │
  └─────────────────┘  and redirects  └────────────────────────────┘
                       to the source
```

**Kernel execution flow**, for `open("/mnt/data-mirror/config.yml")`:

```
1. VFS resolves the path component by component: "/" → "mnt" → "data-mirror" → "config.yml"
2. At "data-mirror", VFS detects a mount point
3. It checks the mount tree: /mnt/data-mirror is bound to /opt/data
4. Remaining path resolution ("config.yml") continues directly in /opt/data's directory tree
5. The resulting dentry/inode is that of /opt/data/config.yml
6. The returned file descriptor is identical to one obtained by open("/opt/data/config.yml")
```

**In one sentence**: a symbolic link stores a path in a file, visible to userspace; a bind mount redirects a directory tree at the kernel VFS level, transparently to userspace—even `stat` shows no difference. Bind mounts operate at a lower level and are more transparent than symbolic links.

#### A Counterintuitive Bind-Mount Behavior: Submounts Do Not Follow

```bash
# Prepare the environment
mkdir -p /opt/data/sub
mount -t tmpfs -o size=10M tmpfs /opt/data/sub   # sub is a separate tmpfs mount point

# Create a bind mount
mount --bind /opt/data /mnt/data-mirror

# Can /mnt/data-mirror/sub see the tmpfs contents?
ls /mnt/data-mirror/sub/
# Output: (empty) ← No! The bind mount did not include the submount

# Solution: use --rbind (recursive bind)
mount --rbind /opt/data /mnt/data-mirror-r
ls /mnt/data-mirror-r/sub/
# Now the contents are visible
```

> This is why Docker `-v` makes all subdirectory contents visible inside a container: Docker uses recursive bind mounts internally.

#### Comparing Bind Mounts and Hard Links

```bash
# Hard link: one file with two names
ln /opt/data/config.yml /opt/data/config-hardlink.yml

ls -li /opt/data/config.yml /opt/data/config-hardlink.yml
# 123456 ... config.yml
# 123456 ... config-hardlink.yml
#  ↑ Same inode, link count = 2

# Hard links can target files, not directories (Linux prohibits it), and cannot cross filesystems
# Bind mounts can bind directories, cross filesystems, and recurse at the VFS level
```

> Docker uses bind mounts extensively: `docker run -v /host/path:/container/path` grafts a host directory into the container filesystem tree.

### Example 3: procfs—Files as Kernel Data

```bash
# /proc is a pseudo-filesystem; contents are generated dynamically by the kernel, not stored on disk
mount -t proc proc /proc   # Performed automatically during boot

cat /proc/cpuinfo           # Not a disk read; the kernel generates the result on demand
cat /proc/12345/status      # Process 12345 status, queried live from the kernel
```

**What the kernel does**: VFS recognizes procfs mounted on `/proc` and sends `read()` to its driver. The procfs driver interprets the path to determine what you want—CPU information, process status, and so on—then generates text from live kernel data structures. No disk I/O occurs.

### Example 4: OverlayFS—A Union Filesystem

```bash
# ============================================================
# OverlayFS experiment: stack directories into a merged view
# ============================================================

# Step 1: Create four directories with distinct roles
mkdir -p /tmp/overlay-demo/{lower,upper,work,merged}
#   lower  → Read-only lower layer (like a Docker image's read-only layer)
#   upper  → Writable upper layer (like a container writable layer; changes go here)
#   work   → Internal OverlayFS workspace (must share a filesystem with upper; do not modify manually)
#   merged → Combined view (the directory you access, appearing as a complete filesystem)

# Step 2: Put files with the same name in lower and upper to demonstrate shadowing
echo "from lower" > /tmp/overlay-demo/lower/file.txt
echo "from upper" > /tmp/overlay-demo/upper/file.txt
# Expected: merged shows the upper version because upper takes priority

# Add a file that exists only in lower to demonstrate visibility through the upper layer
echo "only in lower, should still visible" > /tmp/overlay-demo/lower/only-lower.txt
# Expected: this is also visible in merged, showing through from lower

# Check file types: all regular files (-), no symbolic links
ls -la /tmp/overlay-demo/lower/
# -rw-r--r-- ... file.txt
# -rw-r--r-- ... only-lower.txt
ls -la /tmp/overlay-demo/upper/
# -rw-r--r-- ... file.txt     ← Same name as in lower, different contents

# Step 3: Mount (requires root)
mount -t overlay overlay \
  -o lowerdir=/tmp/overlay-demo/lower,upperdir=/tmp/overlay-demo/upper,workdir=/tmp/overlay-demo/work \
  /tmp/overlay-demo/merged
#   │        │       │                                                                              │
#   │        │       └── -o specifies the three key OverlayFS directories (lower/upper/work)          │
#   │        └── Device name (no actual device; any identifier works, conventionally "overlay")     │
#   └── -t overlay: tells the kernel to use the OverlayFS driver                                    │
#                                                                   Mount point: entrance to the merged view

# Step 4: Verify the merged result
cat /tmp/overlay-demo/merged/file.txt
# Output: from upper
#        ↑ The upper file covers the same-named lower file: the meaning of "overlay"

cat /tmp/overlay-demo/merged/only-lower.txt
# Output: only in lower, should still visible
#        ↑ No upper file exists, so the lower file shows through: the "union" behavior

# File types in the merged view: regular files, not symbolic links
# OverlayFS merges transparently in the kernel; userspace sees no difference
ls -la /tmp/overlay-demo/merged/
# -rw-r--r-- ... file.txt
# -rw-r--r-- ... only-lower.txt

# Step 5: Verify that writes go only to upper
echo "created at runtime" > /tmp/overlay-demo/merged/new-file.txt
# Where is this new file actually stored?

cat /tmp/overlay-demo/upper/new-file.txt
# Output: created at runtime ← In upper!
# /tmp/overlay-demo/lower/ has no new-file.txt; lower is unchanged

# File types: the new upper file is regular, and merged shows that same regular file
ls -la /tmp/overlay-demo/upper/new-file.txt /tmp/overlay-demo/merged/new-file.txt
# -rw-r--r-- ... upper/new-file.txt
# -rw-r--r-- ... merged/new-file.txt   ← Same file, different paths

# Step 6: Verify that modifying an existing lower file triggers copy-up
echo "appended in upper" >> /tmp/overlay-demo/merged/only-lower.txt
# Append one line

cat /tmp/overlay-demo/upper/only-lower.txt
# Output: only in lower, should still visible
#       appended in upper
#       ↑ The entire file is copied from lower to upper, then the upper copy is modified

cat /tmp/overlay-demo/lower/only-lower.txt
# Output: only in lower, should still visible
#       ↑ The original lower file is unchanged! This is Copy-on-Write

# Compare types: after copy-up, the upper file is still regular (-), just like the lower original
ls -la /tmp/overlay-demo/lower/only-lower.txt /tmp/overlay-demo/upper/only-lower.txt
# -rw-r--r-- ... lower/only-lower.txt   ← Original (unchanged)
# -rw-r--r-- ... upper/only-lower.txt   ← Copy-up copy (modified), still a regular file

# Step 7: Verify that deletion creates a whiteout marker
rm /tmp/overlay-demo/merged/only-lower.txt
# "Delete" this file

ls /tmp/overlay-demo/merged/only-lower.txt
# ls: cannot access ...: No such file or directory ← It is indeed absent from merged

# Key observation: check how the file type changes in upper
ls -la /tmp/overlay-demo/upper/only-lower.txt
# c--------- 1 root root 0, 0 ... /tmp/overlay-demo/upper/only-lower.txt
# ↑ Type changed from - (regular file) to c (character device)! Major/minor number 0:0
# This is a whiteout file: OverlayFS uses it to cover the same-named file in lower

# Confirm the type with stat:
stat /tmp/overlay-demo/upper/only-lower.txt
#   File: /tmp/overlay-demo/upper/only-lower.txt
#   Size: 0          Blocks: 0     IO Block: 4096   character special file
# Device: 0,0   Inode: ...   Links: 1   Device type: 0,0
#                                                       ↑ Character device 0:0 = whiteout

# Whiteout mechanism recap:
# - Lower is read-only, so OverlayFS simulates deletion by hiding files rather than deleting them
# - A whiteout is a character device file (c 0:0) in upper
# - When building merged: whiteout in upper → skip same-named lower file → user sees a deleted file
# - ls in merged does not show the whiteout itself because OverlayFS filters it from the directory list
#   Reading upper directly reveals it, bypassing OverlayFS filtering

# Step 8: Clean up
# Note: umount before rm! Running rm -rf overlay-demo directly reports:
#   rm: cannot remove 'overlay-demo/merged': Device or resource busy
# merged is an active mount point, so the kernel holds a reference to that directory.
# It cannot be deleted before umount: the same idea as a file that cannot be deleted while open
umount /tmp/overlay-demo/merged
rm -rf /tmp/overlay-demo
```

**What the kernel does**: VFS hands every file operation under `/tmp/overlay-demo/merged` to the OverlayFS driver, which applies its own rules:
- **Read a file**: search from upper down through lower layers and return the first match.
- **Write a file**: create new files directly in upper; if a matching file exists in lower, copy it up before modifying it.
- **Delete a file**: create a whiteout character device (`c 0:0`) in upper to mark the file as deleted.

> Docker's layered image storage uses precisely this OverlayFS mount mechanism. See [Docker Filesystems Explained](/en/notes/linux/docker-filesystem/).

## Are All These Filesystems Included with Linux?

We have mentioned `ext4`, `tmpfs`, `overlay`, `proc`, `nfs`, and others. Where do they come from? Do they require installation? **Except for a few commercial or third-party filesystems such as ZFS and vboxsf, most are included directly in the mainline Linux kernel.**

### Three Ways Filesystems Are Provided

| Form | Description | Examples |
|------|------|------|
| **Built into mainline kernel source** | Code lives in the Linux source tree maintained by Linus Torvalds and is compiled with the kernel | `ext4`, `xfs`, `tmpfs`, `proc`, `sysfs`, `overlay`, `btrfs`, `nfs`, etc. |
| **Mainline kernel, loaded as a module** | Same source tree, but compiled as a `.ko` module loaded into memory only when needed | `cifs`, `nfsd`, `vfat`, `ntfs3`, `squashfs`, etc. |
| **Out-of-tree module** | Outside mainline, requiring separate installation, such as DKMS modules | ZFS (incompatible licensing prevents mainline inclusion), `vboxsf` (VirtualBox Guest Additions), some commercial storage drivers |

### How Can You Check Which Filesystems Your Kernel Supports?

```bash
# Method 1: view filesystem modules currently loaded in the kernel
ls /proc/filesystems
# Example output:
# nodev   sysfs         ← nodev indicates a pseudo-filesystem with no associated block device
# nodev   tmpfs
# nodev   proc
# nodev   overlay
# nodev   cgroup
#         ext4          ← Entries without nodev are actual disk filesystems
#         xfs
#         btrfs

# Method 2: view modules available to load but not yet loaded
ls /lib/modules/$(uname -r)/kernel/fs/
# Example output:
# btrfs/  cifs/  ext4/  nfs/  overlayfs/  squashfs/  xfs/  ...
# Each subdirectory may contain one or more .ko.xz module files

# Method 3: inspect a filesystem module
modinfo overlay
# filename:       /lib/modules/6.8.0/kernel/fs/overlayfs/overlay.ko.xz
# description:    Overlay filesystem
# license:        GPL
#  ↑ overlay is a standard kernel module, with source under fs/overlayfs/
```

### Origins of Common Filesystems

| Filesystem | Origin | Notes |
|----------|------|------|
| `ext4` | Mainline kernel, built in by default | Merged in 2008; Linux's most common local filesystem |
| `xfs` | Mainline kernel | Contributed by SGI, merged in 2001; default on CentOS/RHEL |
| `btrfs` | Mainline kernel | Contributed by Oracle, merged in 2009; supports snapshots and compression |
| `tmpfs` | Mainline kernel, **always built in** | Based on the kernel page cache; too fundamental to be a module |
| `proc` / `sysfs` | Mainline kernel, **always built in** | Fundamental kernel infrastructure that cannot be unloaded |
| `overlay` | Mainline kernel, merged in 2014 (3.18) | Docker's default storage driver. An earlier `overlayfs` (singular) was deprecated in 3.18; the current version is `overlay` (plural) |
| `devtmpfs` | Mainline kernel | Manages device files under `/dev`, mounted automatically early in boot |
| `cgroup` / `cgroup2` | Mainline kernel | cgroup v1 and v2, the basis for container resource isolation |
| `nfs` | Mainline kernel | Both client (`nfs`) and server (`nfsd`) are mainline |
| `cifs` | Mainline kernel, usually a module | SMB/CIFS client for Windows shares |
| `vfat` / `exfat` | Mainline kernel, modules | Common on USB drives. Patent concerns kept exFAT out for years; Microsoft contributed it for inclusion in 2019 |
| `ntfs3` | Mainline kernel (5.15+) | NTFS read/write driver contributed by Paragon |
| `squashfs` | Mainline kernel, module | Compressed read-only filesystem underlying Snap/AppImage |
| **ZFS** | **Out-of-tree** (OpenZFS) | CDDL conflicts with GPL, preventing mainline inclusion; installed separately through DKMS |
| **vboxsf** | **Out-of-tree** | VirtualBox shared-folder driver, compiled separately when installing Guest Additions |

### Experiment: Load a Filesystem Module Manually

```bash
# Assume cifs was compiled as a module and is not loaded by default
lsmod | grep cifs
# (No output: not loaded)

mount -t cifs //192.168.1.1/share /mnt/smb -o user=admin
# The kernel automatically loads cifs.ko! No manual modprobe is needed

lsmod | grep cifs
# cifs                 123456  0
#  ↑ The module was loaded automatically

# Pseudo-filesystems such as tmpfs, proc, and overlay may have no corresponding module.
# Their code may be built directly into the kernel image (vmlinuz), always available without loading
modprobe tmpfs
# modprobe: FATAL: Module tmpfs not found in directory /lib/modules/...
#  ↑ It is built into the kernel, not a module; modprobe is unnecessary
```

### One-Sentence Summary

**All the filesystems you use daily—`ext4`, `tmpfs`, `overlay`, `proc`, and `nfs`—come from the mainline Linux source tree.** You need not install anything: `mount -t xxx` invokes kernel functionality directly. Exceptions are out-of-tree modules with licensing conflicts, such as ZFS, and special drivers for virtualization platforms such as VirtualBox.

Every `mount` records a relationship in an internal kernel structure, the mount tree. Inspect it in these ways:

```bash
# Method 1: /proc/mounts, the authoritative kernel view
cat /proc/mounts
# Example output:
# /dev/sda1 / ext4 rw,relatime 0 0
# overlay /var/lib/docker/overlay2/abc.../merged overlay rw,relatime,lowerdir=...,upperdir=...,workdir=... 0 0
# tmpfs /tmp/ramdisk tmpfs rw,size=524288k 0 0

# Method 2: mount, a human-readable version
mount | grep overlay
# Shows all Docker container overlay mounts

# Method 3: findmnt, a tree view of mount hierarchy (recommended!)
findmnt -t overlay
# Displays parent/child relationships of all overlay mount points as a tree
```

## Typical Uses for Each Filesystem

We introduced four kinds of mounts above, but understanding **when to use each one** matters more.

### Practical tmpfs Scenarios

The main benefits of tmpfs are **speed** (memory-speed I/O) and **volatility** (cleared automatically at reboot), making it suitable for temporary data that does not need persistence.

#### Scenario 1: The System's Default `/tmp`

Many modern Linux distributions, such as CentOS 7+ and Ubuntu, mount `/tmp` as tmpfs by default:

```bash
findmnt /tmp
# Example output:
# TARGET  SOURCE FSTYPE OPTIONS
# /tmp    tmpfs  tmpfs  rw,nosuid,nodev,noexec,relatime
```

There are two benefits:
- Temporary files in `/tmp` disappear after reboot instead of accumulating.
- Reads and writes use memory, avoiding SSD wear.

> Note: when `/tmp` uses tmpfs, large files such as temporary archives of hundreds of MB directly consume memory. Some distributions therefore retain disk-backed `/tmp` or clean it periodically with `systemd-tmpfiles`.

#### Scenario 2: `/dev/shm`—POSIX Shared Memory

```bash
# /dev/shm is a system-provided tmpfs, the default location for shared memory between programs
ls -ld /dev/shm
# drwxrwxrwt 2 root root 40 Jun 26 10:00 /dev/shm

# Its default size is half of physical memory
df -h /dev/shm
# Filesystem      Size  Used Avail Use% Mounted on
# tmpfs           7.8G     0  7.8G   0% /dev/shm
```

Python's `multiprocessing.shared_memory`, PostgreSQL shared buffers, and Nginx `proxy_cache` can all use `/dev/shm` for acceleration.

#### Scenario 3: Docker `--tmpfs`—A Container Directory That Does Not Touch Disk

```bash
# /app/tmp is stored in memory; removing the container automatically discards the data
docker run --tmpfs /app/tmp:rw,size=256M,noexec alpine sh -c \
  "dd if=/dev/zero of=/app/tmp/test bs=1M count=100 && ls -lh /app/tmp/"
# The 100MB write completes almost instantly, without disk I/O
```

The Kubernetes equivalent is `emptyDir.medium: "Memory"`:

```yaml
volumes:
- name: cache-volume
  emptyDir:
    medium: "Memory"   # Underneath, this is mount -t tmpfs
    sizeLimit: 256Mi
```

#### Scenario 4: Build/Compilation Cache

```bash
# Put intermediate build output on tmpfs to accelerate incremental C/C++ builds
mount -t tmpfs -o size=4G tmpfs /tmp/build

# Run make with output in this directory
cd /path/to/project
mkdir -p /tmp/build/output
make O=/tmp/build/output -j$(nproc)
# Intermediate .o files stay in memory, making builds 2–5 times faster than on disk
```

#### ⚠️ tmpfs Pitfall: It Can Swap!

Many people assume tmpfs data exists only in memory. Under memory pressure, the kernel **can swap tmpfs pages to disk**, so the memory filesystem eventually reaches storage. To prevent swap, use cgroup limits or `ramfs`; however, ramfs neither swaps nor limits its size, leading directly to OOM when memory fills, so it is **not recommended**.

```bash
# Check how much tmpfs data has been swapped out
grep -E '^Shmem:|^SwapCached:' /proc/meminfo
# Shmem:     524288 kB   ← Total memory occupied by tmpfs, including swapped pages
# SwapCached: 131072 kB   ← The portion swapped out
```

### Practical Bind-Mount Scenarios

A bind mount's main value is **making one directory appear at two paths**. It is the same data, not a copy.

#### Scenario 1: Docker / Kubernetes Volume Mounts

This is the most common bind-mount use, already mentioned above. A complete example:

```bash
# Host /opt/nginx/html appears directly as /usr/share/nginx/html inside the container
docker run -v /opt/nginx/html:/usr/share/nginx/html:ro nginx

# ls /usr/share/nginx/html inside the container shows host files
# :ro makes the mount read-only for greater safety
```

Kubernetes `hostPath` volumes also use bind mounts underneath:

```yaml
volumes:
- name: host-data
  hostPath:
    path: /data
    type: Directory
```

#### Scenario 2: Build a chroot Environment

```bash
# chroot needs /proc, /dev, and /sys to operate normally
CHROOT=/tmp/my-chroot
mkdir -p $CHROOT/{proc,dev,sys}

mount --bind /proc $CHROOT/proc
mount --bind /dev  $CHROOT/dev
mount --bind /sys  $CHROOT/sys

chroot $CHROOT /bin/bash
# ps, top, and similar tools now work inside the chroot
```

#### Scenario 3: NFS Re-Export

```bash
# An NFS-mounted directory cannot be shared directly over NFS again
# A bind mount can give it another path for sharing with other tools
mount -t nfs 192.168.1.100:/exports/data /mnt/nfs-data
mount --bind /mnt/nfs-data /srv/share
```

#### Scenario 4: Read-Only Bind Mounts for Security Hardening

```bash
# Bind-mount a directory read-only so even root cannot modify it
mount --bind /opt/config /etc/app/config
mount -o remount,ro,bind /etc/app/config

touch /etc/app/config/test  # Permission denied, even for root!
```

This is useful for container security and immutable infrastructure.

### Practical procfs and sysfs Scenarios

#### `/proc` Can Be Written as Well as Read!

```bash
# Many files under /proc/sys/ are writable for changing kernel parameters live

# Enable IP forwarding (essential for routers)
echo 1 > /proc/sys/net/ipv4/ip_forward

# Change the maximum open-file count
echo 65535 > /proc/sys/fs/file-max

# Disable ping replies
echo 1 > /proc/sys/net/ipv4/icmp_echo_ignore_all

# Equivalent, more readable command
sysctl -w net.ipv4.ip_forward=1
```

#### Why Must a Container Have `/proc`?

Accidentally covering `/proc` with `docker run` leaves a container largely unusable:

```bash
# ❌ This breaks ps, top, free, and similar tools inside the container
docker run -v /some/empty/dir:/proc alpine ps aux
# Error: /proc must be mounted

# Correct approach: leave /proc alone and let Docker mount it automatically
```

This also explains why the Pause container in a Kubernetes Pod mounts `/proc`: it provides the process-information window shared by all containers.

#### sysfs (`/sys`): A Window into Hardware and Devices

```bash
# /sys is sysfs, introduced in kernel 2.6 and more structured than /proc

# View block device size
cat /sys/block/sda/size    # Number of sectors

# View network interface speed
cat /sys/class/net/eth0/speed   # 1000 (Mbps)

# Disconnect/reconnect a PCI device live (simulate hot-plugging)
echo 0 > /sys/bus/pci/devices/0000:00:1f.2/remove
echo 1 > /sys/bus/pci/rescan
```

### Other Common Filesystem Types at a Glance

| Type | Mount example | Purpose |
|------|---------|------|
| `devtmpfs` | `mount -t devtmpfs devtmpfs /dev` | Device files (`/dev/sda`, `/dev/tty`, etc.), managed automatically by the kernel |
| `cgroup2` | `mount -t cgroup2 cgroup2 /sys/fs/cgroup` | Unified cgroup v2 hierarchy underlying container resource limits |
| `cgroup` | `mount -t cgroup cgroup /sys/fs/cgroup/cpu` | cgroup v1 (being phased out) |
| `sysfs` | `mount -t sysfs sysfs /sys` | Kernel object model: hardware, driver, and bus information |
| `securityfs` | `mount -t securityfs securityfs /sys/kernel/security` | Linux security module interfaces (SELinux/AppArmor) |
| `debugfs` | `mount -t debugfs debugfs /sys/kernel/debug` | Kernel debugging interfaces (ftrace, kprobes, etc.) |
| `nfs` | `mount -t nfs 192.168.1.1:/data /mnt/nfs` | Network filesystem for sharing storage across machines |
| `cifs` | `mount -t cifs //server/share /mnt/smb -o user=admin` | SMB/CIFS (Windows shared folders) |

> The `/proc`, `/sys`, `/dev`, `/run`, and `/tmp` (possibly tmpfs) directories seen with `ls /` are all mounted. A modern Linux system has dozens of active mounts after boot. Most are these **memory-based kernel pseudo-filesystems**, not disk partitions.

## Common mount Options

`-o` accepts multiple comma-separated options. These are the most common in production:

### Read/Write and Security

| Option | Effect |
|------|------|
| `rw` | Read/write (default) |
| `ro` | Read-only, even for root |
| `noexec` | Prevent execution of binaries on the filesystem. **Essential for security** |
| `nosuid` | Ignore suid/sgid bits to prevent privilege-escalation attacks |
| `nodev` | Ignore device files, preventing permission bypass through devices created with mknod |

The trio `nosuid,nodev,noexec` frequently appears together as a standard hardening measure:

```bash
# Standard /tmp mount options: no program execution or device creation in /tmp
mount -t tmpfs -o nosuid,nodev,noexec tmpfs /tmp

# Verify: place an executable in /tmp and try to run it
cp /bin/ls /tmp/
/tmp/ls              # Permission denied: noexec is working
```

### Performance

| Option | Effect |
|------|------|
| `noatime` | Do not update access time (atime) when reading files. **Strongly recommended for databases/high I/O** |
| `relatime` | Compromise: update atime only when older than mtime/ctime. Default on modern kernels |
| `sync` | Synchronize all writes to disk immediately; slower but safer, sometimes needed for databases |
| `async` | Flush writes asynchronously in batches (default) |

```bash
# noatime is recommended for database disks, preventing a write I/O for every SELECT
mount -t ext4 -o noatime /dev/sdb1 /data/postgresql

# Verify atime behavior
cat /data/postgresql/test.sql   # Read the file
stat /data/postgresql/test.sql | grep Access
# Access: 2026-06-26 10:00:00 ← With noatime, this timestamp does not change
```

### tmpfs-Specific Options

| Option | Effect |
|------|------|
| `size=512M` | Maximum size, defaulting to 50% of physical memory. Writes beyond the limit fail with "No space left on device" |
| `nr_inodes=10000` | Maximum inode count, limiting the number of files |
| `mode=1777` | Permissions: `1777` means sticky bit + read/write for everyone, like `/tmp` |

```bash
# Create a small 10MB tmpfs; exceeding the limit produces an immediate write error
mount -t tmpfs -o size=10M tmpfs /tmp/small-ram

dd if=/dev/zero of=/tmp/small-ram/big bs=1M count=20
# dd: error writing '/tmp/small-ram/big': No space left on device
```

## Common Problems and Troubleshooting

### "target is busy"—What If Unmounting Fails?

```bash
umount /mnt/data
# umount: /mnt/data: target is busy

# Cause: a process has a working directory or open file inside this filesystem
```

Three troubleshooting steps:

```bash
# Step 1: find who is using the mount point
lsof /mnt/data
# COMMAND   PID  USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
# bash     1234  root  cwd    DIR   8,17     4096    2 /mnt/data

# Step 2: use fuser for a more direct view
fuser -v /mnt/data
#                      USER        PID ACCESS COMMAND
# /mnt/data:           root       1234 ..c.. bash

# Step 3: kill the processes and retry, or force the unmount
fuser -km /mnt/data        # Kill all processes using the mount
umount /mnt/data           # Success!

# Alternatively, lazy unmount: detach from the directory tree now and finish when no longer used
umount -l /mnt/data
```

### Mount Namespaces: Why Do Containers Have Separate Mount Tables?

This explains why `mount` inside a container cannot see the host mounts:

```bash
# View mounts on the host
mount | wc -l
# 42 ← The host has 42 mount points

# View mounts inside a container
docker run alpine mount | wc -l
# 7 ← The container has only 7, in an entirely different mount table!
```

Each container runs in an independent **mount namespace** with its own list of mounts. This explains why:
- `df -h` inside the container shows completely different disks from the host.
- A tmpfs mounted inside the container is invisible on the host.
- `docker run -v` essentially adds a bind-mount record inside the container's mount namespace.

### `/etc/fstab`: Keep Mounts Across Reboots

Manual mounts disappear after reboot. To persist them, add them to `/etc/fstab`:

```bash
# /etc/fstab format:
# <device>     <mount>   <type>  <options>         <dump> <fsck-order>
/dev/sdb1      /data     ext4    defaults,noatime  0      2
tmpfs          /tmp/ram  tmpfs   size=512M,mode=1777 0    0

# Test after editing fstab, without rebooting
mount -a
# No error indicates correct fstab syntax

# systemd also provides .mount units, a more modern approach:
# /etc/systemd/system/data.mount
systemctl daemon-reload
systemctl start data.mount
```

## How mount Relates to Common Tools

| Scenario | Underlying mount operation |
|------|------------------|
| Automatic USB mounting (udev) | `mount -t vfat/exfat/ext4 /dev/sdX /media/user/xxx` |
| Docker container startup | `mount -t overlay lowerdir=... /var/lib/docker/overlay2/xxx/merged` |
| `docker run -v /host:/container` | `mount --bind /host /var/lib/docker/.../merged/container` |
| `docker run --tmpfs /app/tmp` | `mount -t tmpfs tmpfs /var/lib/docker/.../merged/app/tmp` |
| Kubernetes `hostPath` volume | `mount --bind /host/path /container/path` |
| Kubernetes `emptyDir.medium: Memory` | `mount -t tmpfs tmpfs /container/cache` |
| Kubernetes Pod sharing `/proc` | `mount -t proc proc /proc` inside the mount namespace, handled by the pause container |
| `systemd-tmpfiles` cleaning `/tmp` | tmpfs clears at reboot; non-tmpfs directories are traversed and cleaned periodically |
| Each line in `df -h` | Iterates through mount records in `/proc/mounts` |
| `/dev` in chroot / containers | `mount --bind /dev /chroot/dev` or `mount -t devtmpfs devtmpfs /chroot/dev` |

> In one sentence: **grafting is one of the central abstractions of Linux filesystems. Docker containers, Kubernetes volumes, system directories, and even automatic USB mounting all rely on mount.**
