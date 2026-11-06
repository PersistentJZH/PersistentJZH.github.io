---
sourceHash: d54073dbc922597de65a8850878d8cc2e76c3ec4bf1a3a2d3c7425cc2644bb83
title: Docker Commit Explained
createTime: 2026/05/28 11:00:00
permalink: /en/notes/kubernetes/docker-commit/
---

# Docker Commit Explained

## In One Sentence

`docker commit` saves the **current state of a running or stopped container** as a new image. It captures the filesystem "as it is now", rather than Dockerfile instructions, including manually installed software, edited configuration, and generated files.

```text
Dockerfile / docker build: describe a blueprint of the desired result, producing consistent builds
docker commit: snapshot the current result, depending on the container's present state
```

## Fundamentals: Copy-on-Write and the Container Layer

Understanding `docker commit` starts with Docker's storage model.

Docker images consist of stacked **read-only layers**, each corresponding to a Dockerfile instruction such as RUN, COPY, or ADD. Starting a container adds a **writable container layer** above this stack:

```text
┌─────────────────────────┐
│   Container Layer (R/W) │  ← All changes after container startup go here
├─────────────────────────┤
│   Layer 3: RUN apt ...  │  ← Read-only
├─────────────────────────┤
│   Layer 2: COPY app.jar  │  ← Read-only
├─────────────────────────┤
│   Layer 1: FROM ubuntu   │  ← Read-only
└─────────────────────────┘
```

The core mechanism is **copy-on-write, or CoW**:

- When **reading** a file absent from the container layer, Docker searches downward and returns the nearest version.
- When **modifying** a file, the storage driver first copies it from a read-only layer into the container layer and modifies that copy. The original lower-layer file remains unchanged.

`docker commit` effectively freezes the container layer into a new read-only layer and combines it with the underlying layers to form a new image:

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
    Running container                       New image
```

Key points:

1. **Commit pauses the container by default**, preventing filesystem changes during snapshot creation. `--pause=false` skips this, but may produce an inconsistent snapshot.
2. **Only container-layer changes are saved**. Existing read-only layers are not stored again; the old and new images share layers, deduplicated by layer ID.
3. **Runtime state is not saved**. Commit preserves filesystems, not processes, memory, or CPU registers. This is the fundamental distinction from CRIU checkpointing.

## Does Docker Commit Support Checkpointing?

**No. `docker commit` and checkpointing are entirely different operations.**

Commit snapshots only the filesystem. It does not save a running process's PID, memory pages, registers, open file descriptors, or socket state. Starting the committed image runs ENTRYPOINT/CMD from scratch, rather than continuing execution at the point of commit.

Docker provides checkpointing through **separate commands**, an experimental feature:

```bash
docker checkpoint create <container> <checkpoint-name>
docker checkpoint ls    <container>
docker checkpoint rm    <container> <checkpoint-name>
```

These commands use **CRIU, Checkpoint/Restore In Userspace**, a mechanism entirely different from commit's storage-driver operations.

### How Checkpointing Works

CRIU approximately follows this process:

```text
1. Locate the process tree: container PID 1 and all its descendants
2. Freeze processes so execution, memory, and registers stop changing
3. Collect process metadata from /proc/<pid>/:
   - /proc/<pid>/maps        → Memory mappings
   - /proc/<pid>/fd/         → Open file descriptors
   - /proc/<pid>/mem         → Process memory pages
   - /proc/<pid>/status      → Process state/registers
4. Collect namespaces, cgroups, seccomp, and other resource information
5. Write all information into checkpoint image files
6. Unfreeze processes, or terminate the container according to configuration
```

Restore reverses this: read checkpoint files, rebuild namespaces, cgroups, and the process tree, restore memory and registers, then continue execution. To a process, it has merely been "frozen for a few seconds".

### Commit vs. Checkpoint

| Dimension | `docker commit` | `docker checkpoint` (CRIU) |
|------|-----------------|---------------------------|
| **Saved content** | Filesystem changes in the container layer | Process tree, memory, registers, file descriptors, sockets, and more |
| **After recovery** | Restart from ENTRYPOINT/CMD | Continue from the checkpoint |
| **Mechanism** | Storage driver, such as overlay2/aufs, plus CoW | CRIU plus /proc |
| **Artifact** | Docker image, pushable to a registry | Local checkpoint files |
| **Use cases** | Debugging, forensics, filesystem archiving | Disaster recovery, live migration, long-task resumption |
| **Production readiness** | Stable | Experimental as of 2026; kernel- and runtime-dependent |

### Enabling Docker Checkpoint

Checkpointing is disabled by default and requires:

**1. Kernel support**: Linux kernel 4.x or newer with relevant configuration enabled:

```bash
# Check required CRIU kernel features
cat /boot/config-$(uname -r) | grep -E 'CONFIG_CHECKPOINT_RESTORE|CONFIG_NAMESPACES|CONFIG_CGROUP_FREEZER'
```

**2. Install CRIU**:

```bash
# Ubuntu / Debian
apt install criu

# Verify installation
criu check --all
```

**3. Enable dockerd experimental features and set the CRIU path**:

```bash
# Option 1: dockerd startup arguments
dockerd --experimental --default-criu-path /usr/sbin/criu

# Option 2: /etc/docker/daemon.json
{
  "experimental": true,
  "default-criu-path": "/usr/sbin/criu"
}
```

**4. Create a checkpoint**:

```bash
# Start a simple counter container
docker run -d --name counter --security-opt seccomp:unconfined ubuntu:22.04 \
  bash -c 'i=0; while true; do echo "count=$i"; i=$((i+1)); sleep 1; done'

# Wait a few seconds, then checkpoint
docker checkpoint create counter cp1

# Checkpoints are stored under /var/lib/docker/containers/<container-id>/checkpoints/
ls /var/lib/docker/containers/$(docker inspect -f '{{.Id}}' counter)/checkpoints/cp1/

# Restore and continue counting from the checkpoint
docker start --checkpoint cp1 counter
docker logs -f counter
# Output resumes at the cp1 count instead of starting from zero
```

### A Direct Comparison Experiment

```text
Scenario: commit and checkpoint a counter container when its count reaches 50

              docker commit                           docker checkpoint
              ──────────────                          ──────────────────
Before         Container counting: count=50             Container counting: count=50

Operation      docker commit counter img:v2             docker checkpoint create counter cp1

Recovery       docker run img:v2                        docker start --checkpoint cp1 counter

Logs           count=1 ← Starts over at 1!               count=51 ← Continues at 51!

Reason         Commit saved only the filesystem,         CRIU saved complete process execution state,
               not the counter value in memory           including memory/registers, restoring the counter exactly
```

The fundamental difference: **commit saves "what the container looks like"; checkpoint saves "what the container is doing"**.

### Checkpoint Limitations

1. **Cannot restore across kernel versions reliably**: Checkpoints are tightly coupled to kernel versions; one created on 3.10 may not restore on 5.15.
2. **Some resources are unsupported**: GPUs, certain sockets such as established TCP connections, and System V IPC are difficult to checkpoint.
3. **Nonportable artifacts**: Checkpoints are host-local files, unlike registry-pushable Docker images produced by commit.
4. **Linux only**: CRIU depends on Linux kernel features and does not support macOS or Windows.
5. **Experimental**: Docker checkpoint commands remain experimental as of 2026; use cautiously in production.

## Basic Syntax

```bash
docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
```

Common options:

| Option | Description |
|------|------|
| `-a, --author` | Author information, such as `"John <john@example.com>"`. |
| `-c, --change` | Add Dockerfile instructions such as CMD, ENV, or EXPOSE during commit. |
| `-m, --message` | Commit message, similar to git commit. |
| `-p, --pause` | Whether to pause before committing; defaults to `true`. |

## Basic Examples

### Scenario 1: Save State After Manual Debugging

```bash
# 1. Start a base container
docker run -it --name debug-container ubuntu:22.04 bash

# 2. Perform manual operations inside it
apt update && apt install -y curl vim net-tools
echo "custom config" > /etc/myapp/config.yaml

# 3. Exit and commit to a new image
docker commit -m "install curl/vim, add custom config" debug-container my-debug-image:v1

# 4. Run the new image
docker run -it my-debug-image:v1 bash
# curl, vim, and config.yaml remain present
```

### Scenario 2: Add Dockerfile Instructions

```bash
# Change CMD, ENV, and other metadata during commit
docker commit \
  -a "zhihao <zhihao@example.com>" \
  -m "add debug tools, set default cmd" \
  -c 'CMD ["/usr/local/bin/myapp"]' \
  -c 'ENV APP_ENV=debug' \
  -c 'EXPOSE 8080' \
  debug-container \
  my-debug-image:v2
```

`-c` can be repeated. Supported instructions include `CMD`, `ENTRYPOINT`, `ENV`, `EXPOSE`, `LABEL`, `ONBUILD`, `USER`, `VOLUME`, `WORKDIR`, `STOPSIGNAL`, `HEALTHCHECK`, and `SHELL`.

### Scenario 3: Commit Without Pausing

```bash
# The container is serving requests and should not pause
docker commit --pause=false running-container my-backup:latest
```

Without pausing, ongoing file writes may produce an inconsistent snapshot containing a mixture of old and new file versions.

## Practical Use Cases

### 1. Preserve a Failure Scene

A production container is behaving abnormally but remains running. Commit it quickly, then analyze its filesystem offline.

```bash
docker commit suspicious-container debug/snapshot:$(date +%Y%m%d%H%M%S)
docker save debug/snapshot:20260528143000 -o snapshot.tar
# Copy the tar locally, docker load it, then investigate
```

This is among commit's most useful applications: more complete than `docker cp`, while retaining layer information that `docker export` loses.

### 2. Rapid Prototyping and Debugging

During development, experiment interactively in a container and commit once it works:

```bash
docker run -it --name proto python:3.11 bash
pip install some-obscure-package
# ...manual configuration experiments...
# Working now: save it
docker commit proto my-prototype:v1
```

This saves time writing Dockerfiles and arranging dependencies, making it useful for exploratory work.

### 3. Container Save Points, Not CRIU Checkpoints

For long-running tasks that cannot be interrupted, commit at milestones as an archive:

```bash
# Simulate a data-processing pipeline
docker run --name data-pipeline my-pipeline:v1

# Snapshot after stage one completes
docker commit data-pipeline pipeline:stage1-done

# If later stages fail, restart from stage one
docker run --name data-pipeline-v2 pipeline:stage1-done
```

### 4. Dynamic Builds

Some CI/CD systems or low-code platforms let users interact with a container through a browser and commit a new version:

```text
User actions → Web terminal → Container operations → docker commit → Push to registry
```

## Docker Commit vs Dockerfile / Docker Build

| | `docker commit` | `Dockerfile + docker build` |
|---|---|---|
| **Reproducibility** | Poor: manual history cannot be reproduced exactly | Good: declarative, version-controlled Dockerfile |
| **Transparency** | Poor: others cannot tell what was installed | Good: every instruction is recorded |
| **Layer reuse** | Entire container change set becomes one cache unit | One layer per instruction; unchanged layers reuse cache |
| **Version management** | Difficult | Easy: store the Dockerfile in Git |
| **Getting started** | Fast, no Dockerfile syntax to learn | Requires a Dockerfile |
| **Image size** | Easily grows; deleted files remain in lower layers | Controllable; multi-stage builds significantly reduce size |

A counterintuitive fact: **removing a file with `rm` inside a container does not make its committed image smaller**.

Copy-on-write explains this. Deleting a large lower-layer file creates only a whiteout marker in the container layer. The original remains below. Commit packages the marker and new files, but the large underlying file stays part of the image:

```bash
# Demonstration: rm does not shrink an image
docker run --name big ubuntu:22.04 bash -c "dd if=/dev/zero of=/bigfile bs=1M count=500"
docker commit big big-image:v1
# Image grows by approximately 500MB

docker run --name big2 big-image:v1 bash -c "rm /bigfile"
docker commit big2 big-image:v2
# Image size does not decrease: bigfile remains in a lower layer
```

This is why Dockerfiles, `docker build`, and multi-stage builds are preferred in production.

## Considerations and Best Practices

### 1. Commit Is Not a Full Backup

Runtime state, including process memory, network connections, and mounted volume data, lies outside commit's scope. It preserves only the filesystem.

### 2. Sensitive Information Exposure

Containers may contain temporary tokens, private keys, and passwords, which commit includes in the image. Inspect before committing:

```bash
docker exec suspicious-container env
docker exec suspicious-container cat /root/.bash_history
docker exec suspicious-container find /tmp -type f
```

### 3. Image Growth

After committing, consider `docker image prune` or review whether intermediate images should be retained. Committed images are often larger than Dockerfile-built images.

### 4. Complete Metadata with `--change`

Commit inherits CMD, ENTRYPOINT, ENV, and other metadata from the original image. If behavior changes, update the corresponding instructions with `-c`.

### 5. Prefer Alternatives Where Appropriate

| Requirement | Better option |
|------|-----------|
| Save an individual container file | `docker cp` |
| Save the whole filesystem without retaining layers | `docker export` / `docker import` |
| Reproducible image builds | `Dockerfile + docker build` |
| Save runtime state | CRIU checkpoint |
| Logs and monitoring data | Centralized logging / monitoring |

## Summary

`docker commit` is a "quick but inelegant" tool, best suited to:

1. **Failure forensics**: Freeze an abnormal container's filesystem for offline investigation.
2. **Exploratory debugging**: Experiment in a container and save intermediate results quickly once it works.

Production image builds should use Dockerfiles and `docker build`. Frequent dependence on commit usually indicates a missing CI build workflow.

The final diagram places commit within Docker's overall workflow:

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
