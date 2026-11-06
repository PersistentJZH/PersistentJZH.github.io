---
sourceHash: 8b98a3870732cfe0f0333a48c4f53a861ee04730c1eea71aa919bdde428d598c
title: 'Kubernetes Checkpoint/Restore in Depth: Principles, Practice, and Approach Comparison'
createTime: 2026/05/28 12:00:00
permalink: /en/notes/kubernetes/k8s-checkpoint-restore/
---

# Kubernetes Checkpoint/Restore in Depth: Principles, Practice, and Approach Comparison

## The Idea in One Sentence

Pod checkpoint / restore aims to save the state of a running container and later resume execution from that state. It saves more than an image or an ordinary disk backup: it captures runtime state, including the process tree, memory pages, registers, file descriptors, some socket state, and namespace / cgroup information.

Think of it this way:

```text
Normal restart: execute the entrypoint again and start the application from scratch
Checkpoint / Restore: save the running process state and later resume execution from that saved point
```

Common use cases include:

1. **Forensics**: save the runtime state of a suspicious container for later offline analysis of memory, file descriptors, and process state.
2. **Fault tolerance for long-running tasks**: save the state of long-running batch, simulation, or training jobs before node maintenance or preemption.
3. **Cold-start optimization**: Java applications, model services, and Notebooks can take a long time to start and warm up; start them to a particular state, then use restore to bring them up quickly.
4. **Pod migration**: move a running workload from one Node to another, theoretically reducing service disruption.
5. **Resource scheduling**: when a low-priority task is preempted, checkpoint it before releasing its resources, then restore it later instead of simply killing it.

One boundary must be clear first: **as of 2026-05, Kubernetes natively provides a container checkpoint API at the kubelet level; restore is not yet a stable, unified Kubernetes Pod API**. Real deployments therefore usually require cooperation among CRIU, the container runtime, a node Agent, object storage or an image registry, and a higher-level controller.

## Basic Principles

A Linux container is fundamentally a group of host processes isolated using namespaces, cgroups, rootfs, seccomp, capabilities, and related mechanisms. The underlying engine for checkpoint / restore is usually CRIU: Checkpoint/Restore In Userspace.

During checkpointing, CRIU broadly performs these steps:

1. Find the target process tree.
2. Freeze or pause these processes so their state stops changing.
3. Read process, thread, memory mapping, file descriptor, socket, signal, credential, and related information from `/proc`.
4. Write memory pages, registers, open files, IPC, namespaces, and other state into a set of checkpoint files.
5. Unfreeze the original processes so they continue running, or stop the original container according to runtime parameters.

Restore reverses this process:

1. Read the checkpoint files.
2. Recreate namespaces, cgroups, the process tree, and associated resources.
3. Restore memory, registers, file descriptors, sockets, and other state.
4. Resume the process from its checkpointed execution position.

### How CRIU Works Internally

The preceding overview describes what CRIU does. The following sections explain how it works at the kernel level.

#### 1. Freezing Processes

CRIU freezes target processes using `ptrace` or the cgroup freezer:

```text
Method 1: ptrace
  CRIU attaches to each target thread
  -> PTRACE_SEIZE takes control of the thread
  -> PTRACE_INTERRUPT stops the thread in kernel mode

Method 2: cgroup freezer (more efficient)
  echo FROZEN > /sys/fs/cgroup/<cgroup>/cgroup.freeze
  -> The kernel scheduler removes all processes in the cgroup from the run queue
  -> Processes enter uninterruptible sleep (TASK_UNINTERRUPTIBLE), transparently to the application
```

Modern CRIU uses the cgroup freezer by default because it is transparent to processes and performs better. Once freezing succeeds, CRIU can safely read process state from `/proc` without worrying about changing data.

#### 2. Discovering the Process Tree

CRIU recursively discovers all threads and child processes through `/proc/<pid>/task/` and `/proc/<pid>/children`:

```text
PID 1 (container init)
├── PID 10 (child process A)
│   ├── Thread 10 (main thread)
│   └── Thread 11 (worker thread)
└── PID 20 (child process B)
    └── Thread 20 (main thread)
```

CRIU records relationships such as PID, PPID, TGID, SID, and PGID for every process/thread so that restore can reconstruct the process tree precisely.

#### 3. Collecting Memory (the Core Operation)

This is the most expensive part of checkpointing. CRIU collects process memory through the following steps:

**Step 1 — Read Memory Mappings (VMAs)**

```bash
cat /proc/<pid>/maps
```

Example output:

```text
00400000-00401000 r-xp ... /usr/bin/app        # Code segment
00600000-00601000 r--p ... /usr/bin/app        # Read-only data
7f1234000000-7f1234021000 rwxp ... [heap]      # Heap
7ffe00000000-7ffe00021000 rw-p ... [stack]     # Stack
7f1230000000-7f1230020000 rwxp ... libc.so     # Shared library
```

For each VMA segment, CRIU records its starting and ending addresses, permissions, mapped file path, and offset.

**Step 2 — Determine the Memory Source**

CRIU divides VMAs into two categories and applies different strategies:

| Type | Identification | Dump strategy |
|------|---------|----------|
| **File-backed mapping** | The VMA is associated with a file (for example, a code segment or a shared library .so segment) | Save only the file reference and offset, not the file contents |
| **Anonymous mapping** | No associated file (for example, heap, stack, or anonymous mmap regions) | Save the complete contents of the memory pages |

**Step 3 — Page Collection**

CRIU reads each memory page through `/proc/<pid>/mem` or the `process_vm_readv` system call.

```text
Using /proc/<pid>/mem:
  For each VMA [start, end):
    lseek to offset start in /proc/<pid>/mem
    read (end - start) bytes
```

CRIU introduces **soft-dirty page tracking** to support incremental checkpoints. Once enabled, the kernel marks pages that have been written to, so subsequent checkpoints need to save only dirty pages:

```bash
# Enable soft-dirty tracking
echo 4 > /proc/<pid>/clear_refs

# Check which pages have been modified
cat /proc/<pid>/pagemap  # Bit 55 marks soft-dirty
```

**Step 4 — Compress and Write**

CRIU compresses memory pages using Google's snappy or zlib and writes them to `.img` files. A typical checkpoint output directory looks like this:

```text
checkpoint-dir/
├── inventory.img          # Inventory of all image files
├── pagemap-<pid>.img      # Page mappings (which pages are in page.img)
├── pages-<id>.img         # Actual memory page data (compressed)
├── mm-<pid>.img           # Memory mapping / VMA information
├── core-<pid>.img         # Core process information (registers, signals, etc.)
├── ids-<pid>.img          # Credentials such as UID/GID
├── fdinfo-<pid>.img       # File descriptor information
├── fs-<pid>.img           # Filesystem information (cwd, root)
├── files.img              # Registry of open files
├── pipes.img              # Pipe and FIFO data (unread contents)
├── unixsk.img             # Unix domain socket information
├── inetsk.img             # INET socket information
├── netns-<id>.img         # Network namespace
├── ns-files.img           # Namespace file descriptors
└── tcp-stream-<id>.img    # Unread data in TCP streams (if any)
```

#### 4. Handling File Descriptors

CRIU handles different FD types differently:

| FD type | Handling |
|---------|---------|
| **Regular file** | Record the file path and current offset (lseek position) |
| **Pipe/FIFO** | Write unread data in the pipe buffer to `pipes.img` |
| **Unix socket** | Record the socket type (DGRAM/STREAM), peer information, and buffered data |
| **TCP socket** | Record connection state and sequence numbers; established connections cannot migrate across machines (transparent migration is extremely difficult even within the same network namespace) |
| **Epoll** | Record the set of monitored FDs and event types |
| **Eventfd / signalfd / timerfd** | Record the current value and state |

For established TCP connections, CRIU closes the connection during checkpointing and records its parameters, then **reestablishes it** after restore using TCP repair mode. This requires application-level reconnection support, which is why transparent checkpointing is difficult for applications with long-lived connections.

#### 5. Saving Namespaces

CRIU saves each namespace type separately:

```text
PID namespace:    Record process PIDs inside the namespace (for example, 12345 on the host and 1 in the container)
Mount namespace:  Record mount points, mount options, and the root filesystem
Network namespace:Record interfaces, routing tables, iptables rules, and socket state
IPC namespace:    Record System V IPC state (shared memory, semaphores, and message queues)
UTS namespace:    Record hostname and domainname
Cgroup namespace: Record cgroup paths and hierarchy
User namespace:   Record UID/GID mappings
Time namespace:   Record CLOCK_MONOTONIC and CLOCK_BOOTTIME offsets
```

#### 6. Parasite Code Injection (a Key Technique)

This is one of CRIU's most subtle designs. To perform certain operations in the target process's context, such as collecting and restoring file locks, CRIU uses **parasite code injection**:

```text
1. Pause the target process with ptrace
2. Allocate a small memory region in the target process's address space
3. Inject a parasite code blob into that region
4. Modify the process instruction register so it executes the parasite code
5. The parasite code triggers int3 / a breakpoint when done, returning control to CRIU
6. CRIU restores the original register state and code
```

The parasite code performs operations including:
- Dumping/restoring file locks (`flock` and `fcntl` locks)
- Dumping/restoring POSIX robust mutexes
- Obtaining tty information
- Dumping fanotify / inotify state

#### 7. Restoring Memory

The key to reconstructing a process during restore is **avoiding side effects visible to the application code**:

```text
1. fork() a child process (which will become the restored process)
2. Recreate namespaces with clone()
3. Write saved memory pages back to their corresponding virtual addresses through /proc/<pid>/mem
4. Restore CPU registers through PTRACE_SETREGS
5. Restore extended register state such as FPU/SSE/AVX
6. Restore the signal handler table
7. Restore file descriptors (pass them using SCM_RIGHTS or reopen them)
8. Restore timers
9. Restore seccomp and capabilities through prctl
10. Resume process execution using PTRACE_DETACH or PTRACE_CONT
```

The key point: the restored instruction pointer (RIP) points to the position at checkpoint time. From the process's perspective, nothing has changed except that it was paused for a while.

In Kubernetes, the typical call chain is:

```text
User / controller
  -> kubelet checkpoint API
  -> CRI Runtime, such as CRI-O / containerd
  -> OCI Runtime, such as runc / crun
  -> CRIU
  -> checkpoint archive
```

Kubernetes kubelet exposes the following endpoint:

```text
POST /checkpoint/{namespace}/{pod}/{container}?timeout=<seconds>
```

After success, checkpoint files are written by default to:

```text
/var/lib/kubelet/checkpoints/
```

Filenames typically look like:

```text
checkpoint-<podFullName>-<containerName>-<timestamp>.tar
```

One easily overlooked point: **the Kubernetes API is Pod-oriented, but the current kubelet checkpoint API operates on an individual container within a Pod**. If a Pod contains an application container, sidecars, a log collector, and a service mesh proxy, complete Pod-level recovery must address consistency across these containers.

### Inside the Kubelet Checkpoint API

Understanding how kubelet handles a checkpoint request internally helps explain its capabilities and limitations.

#### Request Processing Flow

When kubelet receives a `POST /checkpoint/{namespace}/{pod}/{container}` request, it processes it as follows:

```text
HTTP Handler (kubelet server, port 10250)
  │
  ├── 1. Authentication & authorization
  │     kubelet authenticates with a Bearer Token or client certificate
  │     SubjectAccessReview in Webhook mode handles authorization
  │     Requires "nodes/proxy" or similar permissions
  │
  ├── 2. Parse parameters
  │     Extract namespace, pod, and container from the URL path
  │     Extract timeout from the query string
  │
  ├── 3. Find the Pod
  │     Look up the Pod in kubelet's Pod Manager (in-memory cache)
  │     Confirm that the Pod is on this node and contains the container
  │
  ├── 4. Call CRI (Container Runtime Interface)
  │     kubelet calls the CRI gRPC interface:
  │     runtimeService.CheckpointContainer(
  │       containerId,
  │       checkpointDir,    // /var/lib/kubelet/checkpoints
  │       timeout,
  │     )
  │
  ├── 5. Wait for the CRI Runtime to complete
  │     The CRI Runtime (CRI-O / containerd) performs these operations:
  │     - Invoke the OCI Runtime's (runc/crun) checkpoint capability
  │     - The OCI Runtime calls CRIU to create checkpoint files
  │     - The CRI Runtime packages the checkpoint files as a tar archive
  │
  └── 6. Return the result
       Success: 200, return the tar file path
       Timeout: 408, kubelet cancels according to the timeout parameter
       Failure: 500, return error details
```

#### CRI gRPC Interface Definition

The protocol between kubelet and the CRI Runtime is defined using protobuf. The core checkpoint messages are shown here in simplified form:

```protobuf
// Request from kubelet to the CRI Runtime
message CheckpointContainerRequest {
  string container_id = 1;       // CRI ID of the target container
  string location = 2;           // Output directory for checkpoint files
  int64 timeout = 3;             // Timeout in seconds
}

// Response from the CRI Runtime
message CheckpointContainerResponse {
  // Full path to the checkpoint tar file
  string archive_path = 1;
}
```

Note: **this CRI interface defines Checkpoint only, not Restore**. CRI has no corresponding `RestoreContainer` gRPC method. This is why recovery inside Kubernetes requires an indirect approach: convert the checkpoint tar into an OCI image with special annotations, then trigger restore by creating a new Pod.

#### How Containerd Implements Checkpointing

Using containerd as an example, after it receives kubelet's `CheckpointContainer` gRPC request:

```text
containerd
  ├── 1. Find the container's shim process (containerd-shim-runc-v2)
  │     The shim bridges containerd and runc
  │
  ├── 2. Send a CheckpointTask request through the shim's ttrpc interface
  │
  ├── 3. The shim invokes the runc checkpoint subcommand
  │     runc checkpoint --image-path /tmp/checkpoint <container-id>
  │
  ├── 4. runc performs:
  │     a. Send SIGSTOP to container processes through runc init (or use the cgroup freezer)
  │     b. Call CRIU dump, passing all namespace FDs, cgroup paths, and so on
  │     c. CRIU creates all .img files in the --image-path directory
  │
  ├── 5. containerd packages the image-path directory as tar.gz
  │
  └── 6. Move tar.gz to the checkpointDir specified by kubelet
```

#### Why CRI-O Is More Common for Checkpointing

CRI-O's integration with CRIU is more direct than containerd's:

1. CRI-O and runc are more tightly coupled, and some configuration and path optimizations bypass the shim layer
2. CRI-O's checkpoint tar format directly supports the `checkpointctl` and `buildah` toolchain
3. Most official Kubernetes checkpoint blogs and documentation use CRI-O as the example runtime

However, containerd's checkpoint capabilities continue to evolve, narrowing the gap.

### The Checkpoint Image Format in Detail

Converting a checkpoint tar into an OCI container image is currently the most common way to restore inside Kubernetes. Understanding this image format is important.

#### Regular Images vs. Checkpoint Images

```text
Regular OCI image:
  ├── manifest.json          # Image manifest
  ├── config.json            # Container configuration (CMD, ENV, etc.)
  └── layers/
      ├── <sha256>/layer.tar # Root filesystem layer
      └── ...

Checkpoint image:
  ├── manifest.json          # Image manifest with special annotations
  ├── config.json            # Container configuration
  └── layers/
      ├── <sha256>/layer.tar # Root filesystem layer (same as a regular image)
      └── <sha256>/layer.tar # Checkpoint data layer (additional)
```

The key difference is that a checkpoint image contains an additional **checkpoint data layer** and special annotations in its manifest.

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

CRI-O's containerd plugin recognizes these annotations to determine that this is a checkpoint restore request and should use `runc restore` instead of the normal `runc create` + `runc start` path.

#### The checkpointctl and buildah Toolchain

```bash
# 1. Inspect checkpoint archive information
checkpointctl show checkpoint.tar

# 2. Build a checkpoint image
checkpointctl build checkpoint.tar \
  --image registry.example.com/checkpoints/counter:v1 \
  --container counter

# 3. Push to the registry
buildah push registry.example.com/checkpoints/counter:v1

# 4. Use in Kubernetes
# Create a Pod whose image references the checkpoint image;
# CRI-O automatically runs runc restore after detecting the annotations
```

#### Image Size and Storage

Checkpoint images are usually large because their checkpoint data layer contains the complete process memory dump. For a container using 2 GB of memory, the checkpoint image may be 500 MB–2 GB, depending on compression and the dirty-page ratio. This introduces several practical problems:

1. **Pushing to a registry can be slow**
2. **Downloading the checkpoint data layer during restore may take longer than a cold start**
3. **High storage costs**: one checkpoint image = base image layers + memory dump layer
4. **A separate GC policy is required**: large numbers of checkpoint images quickly consume registry storage

## Prerequisites

Checkpoint / restore in Kubernetes requires several layers of prerequisites to be satisfied simultaneously.

### 1. Kubernetes Version and Feature Gate

The `ContainerCheckpoint` feature gate was introduced in Kubernetes v1.25, became Beta and enabled by default in v1.30, and remains listed as Beta in the current v1.36 documentation.

For older versions, confirm that kubelet enables it:

```bash
kubelet --feature-gates=ContainerCheckpoint=true
```

Even when enabled by default in newer versions, verify kubelet's authentication, authorization, and certificate configuration. This endpoint belongs to kubelet; it is not an ordinary apiserver resource endpoint.

### 2. Container Runtime Support

kubelet merely forwards checkpoint requests to the CRI Runtime. The actual work is done by the CRI Runtime and the underlying OCI Runtime.

Common combinations:

| Layer | Component |
| :--- | :--- |
| Kubernetes node agent | kubelet |
| CRI Runtime | CRI-O、containerd |
| OCI Runtime | runc、crun |
| C/R tool | CRIU |

If the CRI Runtime does not implement the checkpoint interface, kubelet returns 500. CRI-O is the runtime most commonly used in Kubernetes checkpoint examples, and CRIU support usually needs to be enabled. containerd also has underlying checkpoint / restore capabilities, but its Kubernetes integration depends on the specific version, distribution, and configuration.

### 3. Host and Kernel Compatibility

Restore requires a highly consistent environment. Ideally:

1. Source and destination nodes use the same CPU architecture.
2. Linux kernel versions, cgroup versions, and namespace behavior are as consistent as possible.
3. CRIU, runc / crun, and CRI Runtime versions are compatible.
4. Container images, rootfs, mount paths, and required files exist.
5. Security policies, SELinux / AppArmor / seccomp / capabilities do not block restore.

This explains why checkpoint / restore can look easy in a lab yet be difficult to generalize across a production cluster.

### 4. Workload Suitability

Workloads focused on computation, with few external connections and device dependencies, are easier to restore. The following make recovery harder:

1. Many long-lived connections, especially cross-node TCP connections.
2. Open host devices, GPUs, RDMA, FUSE, or special character devices.
3. Complex IPC, file locks, or shared memory.
4. Processes being traced by debuggers such as gdb or strace.
5. Strong dependencies on local temporary files, `emptyDir`, or local caches.
6. Dependencies on a fixed Pod IP, fixed hostname, or specific Node-local state.

CRIU can handle many kinds of Linux process state, but that does not mean every application can migrate transparently.

## Approach 1: Application-Level Checkpointing

This is the traditional approach and the most reliable in production. The application writes its own business state to durable storage and restores it from an application checkpoint after the Pod crashes or is recreated.

Typical examples:

1. State snapshots in Flink / Spark Streaming.
2. PyTorch / TensorFlow training jobs saving model parameters and optimizer state.
3. Databases recovering through WAL, binlog, or redo logs.
4. Batch jobs writing progress, offsets, and intermediate results to a database or object storage.
5. Application services storing sessions, task queues, and idempotency state in Redis, a DB, or an MQ.

Example workflow:

```text
Application runs
  -> Periodically save an application checkpoint to persistent storage
  -> Pod exits unexpectedly or is recreated
  -> New Pod reads application state from the checkpoint
  -> Continue execution
```

### Advantages

1. **Highest reliability**: the application defines its state semantics without depending on kernel or runtime internals.
2. **Strong support across versions, nodes, and clusters**: recovery works as long as the new version can read the checkpoint.
3. **Suitable for production disaster recovery**: integrates naturally with Kubernetes Deployments, Jobs, StatefulSets, HPA, and schedulers.
4. **Controllable consistency**: combine with transactions, offsets, and idempotency to prevent a restored process from having inconsistent application state.

### Disadvantages

1. **Application changes are required**: the process cannot be completely transparent.
2. **Runtime state is not saved**: memory objects, call stacks, TCP connections, and open file descriptors do not recover automatically.
3. **Recovery is not necessarily fast**: the application still needs to restart, load dependencies, and rebuild caches.
4. **Each application type needs its own design**: limited generality, but the strongest correctness.

### Suitable Scenarios

Prefer application-level checkpointing for production failure recovery, fault tolerance for long-running jobs, AI training, big data jobs, databases, middleware, and similar systems.

## Approach 2: Kubelet Checkpoint API + CRIU

This is currently the closest Kubernetes has to a native container checkpoint path. Without changing the application, kubelet can ask the runtime to checkpoint a specified container.

### Creating a Checkpoint

First, find the node running the Pod:

```bash
kubectl get pod counters -n default -o wide
```

After logging in to that node, call the kubelet checkpoint API:

```bash
curl -X POST \
  --insecure \
  --cert /var/run/kubernetes/client-admin.crt \
  --key /var/run/kubernetes/client-admin.key \
  "https://127.0.0.1:10250/checkpoint/default/counters/counter?timeout=60"
```

After completion, inspect the checkpoint files:

```bash
ls -lh /var/lib/kubelet/checkpoints/
```

### Restoring Outside Kubernetes

One option is to create a sandbox outside Kubernetes using `crictl`, then pass the checkpoint archive as the image source to a runtime such as CRI-O for restoration:

```bash
crictl runp pod-config.json
crictl create <POD_ID> container-config.json pod-config.json
crictl start <CONTAINER_ID>
```

The image field in `container-config.json` can point to a checkpoint archive:

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

This is useful for debugging and forensics, but unsuitable as a direct Kubernetes workload recovery solution because kubelet and apiserver do not treat it as a normally managed Pod.

### Restoring Inside Kubernetes

Another approach converts the checkpoint archive into an OCI image with special annotations, pushes it to an image registry, and creates a new Pod using that checkpoint image.

Example workflow:

```bash
checkpointctl build checkpoint.tar registry.example.com/demo/counter-checkpoint:latest
buildah push registry.example.com/demo/counter-checkpoint:latest
```

Then create the Pod:

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

A runtime that supports this format recognizes the checkpoint annotations in the image and restores the process from checkpoint data instead of using the normal container startup path.

### Advantages

1. **Transparent to the application**: theoretically requires no application-code support.
2. **Preserves runtime state**: memory, process trees, file descriptors, and related state can be saved together.
3. **Useful for forensic analysis**: capture runtime state without entering the container.
4. **A foundation for Pod migration**: higher-level controllers can build scheduling, preemption, and maintenance migration on top of it.

### Disadvantages

1. **Not a complete Pod-level API**: kubelet operates on containers; multi-container Pods need additional coordination.
2. **No unified restore path**: Kubernetes has no stable native `PodRestore` resource, so restoration usually depends on runtime-specific capabilities.
3. **Strict runtime compatibility requirements**: versions and configuration of CRI-O, containerd, runc, crun, and CRIU all affect the result.
4. **High security risk**: checkpoints may contain in-memory tokens, passwords, private keys, and business data.
5. **External state does not become consistent automatically**: restoring a process does not automatically fix database transactions, message-queue offsets, or remote connection state.
6. **Significant performance overhead**: checkpoint duration is closely tied to container memory usage, and large processes incur noticeable IO costs and pauses.

### Suitable Scenarios

Forensics, experimental Pod migration, saving low-priority tasks before node maintenance, and exploring cold-start optimization.

### The End-to-End Restore Workflow in Detail

The following complete example demonstrates checkpoint through restore and explains how the components work together.

**Scenario**: a counter Pod named `counters` runs on `node-a` and must migrate to `node-b`.

**Step 1 — Preparation**

```bash
# Confirm the Pod status from the control plane
kubectl get pod counters -n default -o wide
# NAME       READY   STATUS    NODE     IP
# counters   1/1     Running   node-a   10.244.1.5

# Record key information: Pod IP, container ID, cgroup path, and so on
kubectl get pod counters -n default -o yaml > /tmp/counters-backup.yaml
```

**Step 2 — Checkpoint**

```bash
# SSH to node-a
ssh node-a

# Call the kubelet checkpoint API
curl -sk \
  --cert /etc/kubernetes/pki/apiserver-kubelet-client.crt \
  --key /etc/kubernetes/pki/apiserver-kubelet-client.key \
  "https://127.0.0.1:10250/checkpoint/default/counters/counter?timeout=120" \
  | jq .

# Example response:
# {
#   "items": [
#     "/var/lib/kubelet/checkpoints/checkpoint-counters_default-counter-2026-05-28T15:30:00Z.tar"
#   ]
# }

# Check the checkpoint size
ls -lh /var/lib/kubelet/checkpoints/
# -rw------- 1 root root 850M May 28 15:30 checkpoint-counters_default-counter-2026-05-28T15:30:00Z.tar
```

**Step 3 — Convert to a Checkpoint Image**

```bash
# Inspect checkpoint contents using checkpointctl
checkpointctl show /var/lib/kubelet/checkpoints/checkpoint-counters_default-counter-*.tar

# Example output:
# +-------------------+--------------------------------------------------+
# | Checkpoint name   | counter                                          |
# | Pod               | counters                                         |
# | Namespace         | default                                          |
# | Checkpointed at   | 2026-05-28T15:30:00Z                             |
# | Processes in dump | counter (PID: 1), bash (PID: 15)                  |
# | Memory size       | 2.1 GB                                           |
# | Root FS diff size | 12 MB                                            |
# +-------------------+--------------------------------------------------+

# Build the checkpoint image
checkpointctl build \
  /var/lib/kubelet/checkpoints/checkpoint-counters_default-counter-*.tar \
  --image registry.example.com/checkpoints/counter:cp-20260528 \
  --container counter

# Step 4 — Push to the Registry

buildah push registry.example.com/checkpoints/counter:cp-20260528

# Verify that the image was pushed
skopeo inspect docker://registry.example.com/checkpoints/counter:cp-20260528
```

**Step 5 — Restore on the Destination Node**

```bash
# Method A: create a new Pod using the checkpoint image
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

When kubelet on `node-b` receives the Pod creation request, CRI-O detects the `io.kubernetes.cri-o.checkpoint` annotation while pulling the image from the registry, then **calls `runc restore` instead of following the normal container startup path**:

```text
kubelet -> CRI-O -> containerd CRI plugin -> runc restore
                                                    │
                                                    ├── 1. Extract the checkpoint data layer
                                                    ├── 2. Read the .img files
                                                    ├── 3. Call CRIU restore
                                                    ├── 4. Recreate namespaces/cgroups
                                                    ├── 5. Restore process memory/registers
                                                    └── 6. Resume execution from the checkpoint
```

**Step 6 — Verify Recovery**

```bash
# Check the restored Pod
kubectl get pod counters-restored -n default
kubectl logs counters-restored -n default
# Logs should continue from the checkpointed count instead of starting at 0

# Verify process state
kubectl exec counters-restored -n default -- cat /proc/1/status
kubectl exec counters-restored -n default -- ls -la /proc/1/fd/
```

**Step 7 — Switch Traffic and Clean Up**

```bash
# If the original Pod is still running (checkpoint did not kill it), delete it now
kubectl delete pod counters -n default

# Update the Service selector to target the new Pod if necessary
# Alternatively, use the same labels when creating the restored Pod
```

### Comparing Restore Methods

| Restore method | Mechanism | Advantages | Disadvantages |
|---------|------|------|------|
| **Direct restore with crictl** | Bypass kubelet, create a sandbox with crictl, and restore from the checkpoint tar | Quick validation; no registry needed | Pod is unmanaged by kubelet and has no Service/Endpoint |
| **Checkpoint image + new Pod** | checkpoint tar -> OCI image -> Kubernetes Pod | Managed Pod with full Kubernetes semantics | Requires a registry; a cold start may be faster than pulling the image |
| **Local restore with checkpointctl** | Restore directly on the node | Fastest; no network overhead | Bound to the node; unsuitable for cross-node migration |
| **Checkpoint image + restore operator** | A controller automates all the steps above | Declarative and repeatable | High engineering complexity |

### Reference Performance Data

The following figures come from public CRIU benchmarks and Kubernetes checkpoint blog posts, using simple counter / HTTP-service containers tested on nodes with matching kernels and CPUs:

| Container memory | Checkpoint duration | Checkpoint file size | Restore duration | Downtime |
|---------|----------------|--------------------|-------------|-------------------|
| 100 MiB | 0.2–0.5 seconds | 50–100 MB | 0.3–0.8 seconds | < 0.5 seconds |
| 500 MiB | 1–2 seconds | 250–500 MB | 1–3 seconds | 1–2 seconds |
| 2 GiB | 3–8 seconds | 0.8–2 GB | 4–12 seconds | 3–8 seconds |
| 8 GiB | 15–40 seconds | 4–8 GB | 20–60 seconds | 15–40 seconds |

Key factors:
1. **The dirty-page ratio in process memory**: more dirty pages mean slower checkpointing because more data must be written
2. **The number of open file descriptors**: every FD requires additional processing
3. **The number of processes**: a multi-process tree is more complex than a single process
4. **Disk IO performance**: checkpoint files are written directly to local disk
5. **Compression algorithm**: snappy is faster but produces larger output; zlib is slower but produces smaller output

An important conclusion: **if total restore time (image pull + CRIU restore) exceeds application cold-start time, checkpoint/restore loses its fast-recovery benefit**. This is why checkpoint images are better suited to workloads with slow cold starts, such as Java services, model loading, and big data engine initialization.

## Approach 3: A Custom Operator / Node Agent

To offer checkpoint / restore as a platform capability, a declarative control plane is usually added on top of the kubelet API. For example, define CRDs such as `PodCheckpoint`, `PodRestore`, or `CheckpointPolicy`, and let controllers and node Agents execute them.

Typical architecture:

```text
User creates a PodCheckpoint CRD
  -> Controller validates policy and permissions
  -> Locate the Node running the Pod
  -> Notify the Agent on that Node
  -> Agent calls the kubelet checkpoint API
  -> Upload the checkpoint to object storage or an image registry
  -> Update the CRD status

User creates a PodRestore CRD
  -> Controller selects the destination Node
  -> Prepare PVC / Secret / ConfigMap / ServiceAccount
  -> Create a Pod using the checkpoint image
  -> Wait for readiness
  -> Switch traffic or clean up the old Pod
```

A simplified CRD might look like this:

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

A Node Agent usually needs elevated privileges because it must access kubelet, runtime sockets, and the checkpoint directory, and may invoke tools such as buildah / checkpointctl to build checkpoint images.

### Issues That Require Particular Attention

1. **Consistency barriers**: containers in a multi-container Pod must checkpoint at the same logical point; sidecars and application containers cannot save state independently at arbitrary times.
2. **Traffic draining**: make the Pod NotReady before checkpointing, then wait for the Service, Ingress, and mesh to finish draining traffic.
3. **Storage consistency**: PVCs need separate snapshots or must be mountable on the destination node; `emptyDir` and local disks are especially difficult.
4. **Scheduling constraints**: the restore destination must meet runtime, kernel, CPU, device, image, and storage requirements.
5. **Permission isolation**: not every user should be allowed to read checkpoints containing memory data.
6. **Failure rollback**: a state machine must handle successful checkpointing followed by failed upload, successful restore followed by failed readiness, or deletion of the old Pod while the new Pod remains unavailable.
7. **Garbage collection**: checkpoint archives and images are large and require retention policies and cleanup mechanisms.

### Advantages

1. **Declarative use**: users do not need to log in to nodes and manually curl kubelet.
2. **Integration with scheduling, releases, preemption, and node maintenance**: suitable as a platform capability.
3. **Centralized policy management**: workload allowlists, resource limits, storage locations, retention periods, and security scans can be managed together.
4. **Runtime differences can be hidden**: expose a unified API while adapting to CRI-O / containerd underneath.

### Disadvantages

1. **High engineering complexity**: this is more than a simple controller; node-side privileges, state machines, and compatibility require substantial work.
2. **Correctness is hard to establish**: successfully restoring a process does not mean the application recovered correctly.
3. **High maintenance cost**: changes to runtime, CRIU, and Kubernetes versions may affect behavior.
4. **Strict security auditing requirements**: checkpoints write process memory to disk and must be treated as sensitive data.

### Suitable Scenarios

Experimental platform features, preemption and recovery of low-priority batch jobs, hibernation and recovery of Notebooks / development environments, and cold-start optimization for specific allowlisted services.

## Approach 4: Native Runtime Commands

Kubernetes can also be bypassed by using the container runtime's checkpoint / restore commands directly.

### Podman

Podman integrates with CRIU relatively directly:

```bash
sudo podman run -d --name demo docker.io/library/httpd
sudo podman container checkpoint demo -e /tmp/demo-checkpoint.tar.zst
sudo podman container restore -i /tmp/demo-checkpoint.tar.zst
```

### containerd

containerd's `ctr` also provides low-level commands:

```bash
ctr image pull docker.io/library/redis:alpine
ctr run -d docker.io/library/redis:alpine redis
ctr c checkpoint --rw --task redis checkpoint/redis:cr-1
ctr c restore --rw --live redis-debug checkpoint/redis:cr-1
```

Remember that `ctr` is a debugging and administration tool, not a stable user interface.

### Advantages

1. **Low validation cost**: quickly understand CRIU behavior on a single machine.
2. **Bypass Kubernetes control-plane complexity**: quickly determine whether a problem lies in the application, CRIU, or Kubernetes integration.
3. **Useful for local migration and experiments**: for example, development-environment hibernation or single-machine container recovery.

### Disadvantages

1. **Unsuitable for directly manipulating Kubernetes-managed containers**: kubelet does not know what you did, creating potential conflicts with its control loop.
2. **No Pod semantics**: Services, Endpoints, PVCs, Secrets, ConfigMaps, and ServiceAccounts are not handled at this layer.
3. **No declarative management**: unsuitable for multi-tenant production platforms.

### Suitable Scenarios

Local experiments, runtime capability validation, CRIU troubleshooting, and container migration outside Kubernetes.

## Approach 5: VM / MicroVM Snapshots

If Pods run in virtualized sandboxes such as Kata Containers, Firecracker, or Cloud Hypervisor, VM / MicroVM-level snapshot / restore is another option.

It saves more complete virtual-machine state instead of a single Linux process tree.

### Advantages

1. **Clearer isolation boundaries**: state is saved per VM, with less coupling to host-process details.
2. **Greater process transparency**: theoretically preserves more guest state.
3. **Suitable for strong isolation**: multi-tenancy, security sandboxes, and serverless sandboxes.

### Disadvantages

1. **Higher resource overhead**: memory, disk, startup, and restore costs are usually higher than for ordinary containers.
2. **Kubernetes Pod semantics still require integration**: Services, PVCs, scheduling, identity, and network switching must still be handled.
3. **A less mature integration path than ordinary containers**: specific capabilities depend heavily on the runtime and cloud provider implementation.

### Suitable Scenarios

Strongly isolated serverless systems, sandbox platforms, edge computing, and specific vendor runtime capabilities.

## Comparing the Approaches

| Approach | Transparency | Reliability | Engineering complexity | Production maturity | Suitable scenarios |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Application-level checkpointing | Low | High | Medium | High | Production disaster recovery, long-running jobs, training jobs |
| kubelet API + CRIU | High | Medium | Medium | Medium-low | Forensics, experimental migration, cold-start exploration |
| Operator / Node Agent | Medium-high | Medium | High | Implementation-dependent | Platform integration, preemption recovery, Notebook hibernation |
| Native runtime commands | High | Medium | Low | Low | Single-machine experiments, runtime validation |
| VM / MicroVM snapshots | High | Medium-high | High | Medium | Strongly isolated sandboxes, serverless |

For reliable application recovery, prefer application-level checkpointing. Consider CRIU when the goal is preserving process runtime state. A unified platform capability requires an Operator / Agent to connect the kubelet API, runtime, storage, and scheduling.

## Key Difficulties in Pod-Level Restore

### 1. Multi-Container Consistency

The Pod is Kubernetes' basic scheduling unit, but kubelet's checkpoint API operates on containers. Containers within a Pod share a network namespace, volumes, lifecycle, and application semantics.

For example:

```text
app container + envoy sidecar + log sidecar
```

If only the application container is checkpointed, its sidecars start fresh after restore while the application resumes from old memory state. Connections, iptables, certificates, and shared files between them may become inconsistent.

Multi-container Pods therefore usually require:

1. Drain traffic first.
2. Pause application writes.
3. Checkpoint multiple containers sequentially or concurrently.
4. Record a shared logical checkpoint version.
5. Restore them together, or explicitly identify which sidecars may start fresh.

### 2. Network Connections Do Not Migrate Losslessly by Default

In Kubernetes, a Pod restored on a new node usually gets a new Pod IP. Even if the Service redirects new requests, existing TCP connections are difficult to migrate without loss.

Approaching lossless migration requires additional conditions:

1. The CNI supports preserving or migrating IPs.
2. Connection peers have not timed out or reset the connection.
3. Network paths, conntrack, and iptables / eBPF state remain consistent.
4. The application protocol tolerates brief pauses.

For production systems, it is more realistic to treat checkpoint / restore as a way to reduce restart costs than to promise zero disruption for all long-lived connections.

### 3. Storage State Requires Separate Handling

CRIU mainly saves process state; it is not a complete filesystem backup.

Common storage approaches:

1. **PVC**: remount the same PVC on the destination node, or create and restore a VolumeSnapshot first.
2. **emptyDir**: package directory contents with the checkpoint, or prohibit dependencies on state stored there.
3. **hostPath / local PV**: tightly bound to a node, making cross-node restore difficult.
4. **Object storage / databases**: better places for application state; reconnect after restore.

Serious consistency problems can arise if process memory is restored to one point in time while disk files represent another.

### 4. Security Risks

Checkpoint files usually contain process memory, which may include:

1. Kubernetes ServiceAccount token。
2. TLS private keys, JWTs, and database passwords.
3. User request data.
4. Plaintext application caches.
5. Process environment variables and configuration.

Checkpoint archives must therefore be treated as sensitive data:

1. Restrict access to node root or a controlled Agent.
2. Encrypt before uploading.
3. Apply strict permissions to the registry or object storage.
4. Configure retention periods and automatic cleanup.
5. Audit every checkpoint / restore operation.

### 5. Performance Overhead

Checkpoint duration broadly depends on process memory size, dirty-page count, open-file count, and IO performance.

A simple container with 100 MiB of memory may finish quickly. A training process using 80 GiB, many open files, and GPU state may checkpoint very slowly or fail altogether.

Before production deployment, load-test at least:

1. Checkpoint duration.
2. Restore duration.
3. Checkpoint archive size.
4. Pod downtime during the operation.
5. Peak node CPU / IO usage.
6. Impact on other Pods on the same node.

## Recommended Adoption Path

### 1. Clarify the Goal First

Do not initially equate checkpoint / restore with Pod live migration. Distinguish the goals first:

| Goal | Recommended approach |
| :--- | :--- |
| Application failure recovery | Application-level checkpointing |
| Security forensics | kubelet Checkpoint API |
| Preemption recovery for long-running jobs | Prefer application-level checkpointing; supplement with CRIU |
| Notebook / development-environment hibernation | Operator + CRIU is worth experimenting with |
| Cold-start optimization for Java / model services | Experiment with checkpoint images |
| Lossless cross-node migration | Assess carefully; usually requires close network and storage coordination |

### 2. Start with Allowlisted Workloads

Good initial pilot workloads have:

1. A single-container Pod.
2. No GPU, RDMA, or special devices.
3. Few connections, or connections that can be reestablished.
4. State mainly in memory and persistent storage.
5. Tolerance for interruptions measured in seconds.
6. Thorough readinessProbe and application health checks.

Poor initial pilot candidates include:

1. Gateways that rely heavily on long-lived connections.
2. Pods with multiple injected service-mesh sidecars.
3. Database primary nodes.
4. Large GPU training jobs.
5. Jobs using many local temporary files.

### 3. Use a Controller State Machine for Platform Integration

A manageable restore state machine should include at least:

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

Failure states must record clear reasons:

```text
CheckpointFailed
UploadFailed
ImageBuildFailed
ScheduleFailed
RestoreFailed
ReadinessFailed
CleanupFailed
```

This matters more than chaining a few commands in a script. Checkpoint / restore has many failure points, and troubleshooting becomes difficult without a state machine.

### 4. Combine with Native Kubernetes Mechanisms

Recommended integrations:

1. `readinessProbe`: drain traffic before checkpointing and confirm serviceability after restore.
2. `PodDisruptionBudget`: control availability during planned maintenance.
3. `PriorityClass`: checkpoint low-priority tasks before releasing their resources.
4. `VolumeSnapshot`: protect PVC consistency at the storage layer.
5. `NodeAffinity` / `RuntimeClass`: constrain restore to compatible nodes.
6. `NetworkPolicy`: limit access to the checkpoint Agent.
7. Audit logs: record who performed checkpoint / restore on which Pod and when.

## Common Misconceptions

### Misconception 1: Checkpoint = Backup

**A checkpoint is not a backup.** Backups save data such as files and database records; checkpoints save process execution state such as memory, registers, and FDs. Their goals differ:

| Backup | Checkpoint |
|------|-----------|
| Targets disaster recovery | Targets process recovery |
| Requires reconstruction from persistent state after recovery | Resumes execution from the saved point |
| Filesystem-level | Process-level |
| Can restore across major versions and architectures | Tightly coupled to kernel version and CPU architecture |

A process checkpoint may fail to restore because of a kernel-version mismatch, while backup data such as mysqldump can be restored across versions.

### Misconception 2: A Checkpoint Saves Everything

**CRIU checkpoints do not save the following:**

- Docker/Kubernetes volume-mounted data, unless `--manage-cgroups` is explicitly configured or the data is packaged manually
- GPU memory state, such as CUDA contexts and tensors in GPU memory
- Established external TCP connections: CRIU closes them and attempts reconstruction through TCP repair, without guaranteeing success
- Hardware state such as RDMA connections and DPDK devices
- Internal debugging state when a process is being ptraced by gdb/strace or similar tools
- Complete fanotify/inotify watch state (partially supported)

If a workload depends heavily on any of these, CRIU checkpointing is likely to fail or behave incorrectly after restore.

### Misconception 3: Docker Commit = Docker Checkpoint

The [[docker-commit]] article explains this in detail; to reiterate:

```text
docker commit  → save filesystem changes (container-layer CoW snapshot) → produce a regular Docker image
docker checkpoint → save process execution state (CRIU) → produce checkpoint files
```

A committed image starts again from ENTRYPOINT; a checkpointed process resumes from the saved execution point.

### Misconception 4: Enabling the Feature Gate Makes It Production-Ready

Enabling the `ContainerCheckpoint` feature gate only means kubelet **exposes** the checkpoint API. It does not establish that:

- The CRI Runtime implements checkpointing correctly (it may return 500)
- CRIU is installed and configured correctly
- Kernel versions are compatible
- The checkpoint files can be restored successfully
- Application behavior after restore is correct

Before production use, at least:
1. Verify that `criu check --all` passes on every target node
2. Complete the full checkpoint -> push -> pull -> restore workflow in a test cluster
3. Run at least 10 checkpoint/restore cycles for the target workload
4. Load-test downtime and node resource impact during checkpointing

### Misconception 5: Checkpointing Enables Zero-Downtime Live Migration

This common assumption is dangerous. In reality:

1. **The container pauses during checkpointing**: depending on memory size, pauses range from 0.5 seconds to tens of seconds
2. **The container is not ready during restore**: image pulls + CRIU restore can take seconds to minutes
3. **Existing TCP connections are likely to break**: TCP repair works only under extremely restricted conditions
4. **A new Pod IP affects dependents**: unless the CNI supports IP preservation

A more realistic goal is therefore **reducing restart costs by avoiding cold starts, rather than achieving zero-downtime migration**.

## Summary

Pod checkpoint / restore is a collection of capabilities across layers:

```text
Application state
  + Linux process state
  + Container runtime state
  + Kubernetes Pod semantics
  + Network state
  + Storage state
  + Security permissions
```

Kubernetes currently provides a kubelet checkpoint API that lets runtimes checkpoint individual containers. Restore still depends on CRI-O / containerd, CRIU, checkpoint images, node Agents, or custom controllers.

Application-level checkpointing remains the most reliable production approach. CRIU's value lies in preserving process runtime state for forensics, cold-start optimization, low-priority task recovery, and migration experiments in specific scenarios. Building a platform capability requires more than a successful demo: it requires solving multi-container consistency, network connections, storage consistency, permission auditing, rollback, and compatibility at scale.

## References

1. [Kubernetes Kubelet Checkpoint API](https://kubernetes.io/docs/reference/node/kubelet-checkpoint-api/)
2. [Kubernetes Feature Gates](https://kubernetes.io/docs/reference/command-line-tools-reference/feature-gates/)
3. [Kubernetes Blog: Forensic container checkpointing in Kubernetes](https://kubernetes.io/blog/2022/12/05/forensic-container-checkpointing-alpha/)
4. [Kubernetes Blog: Announcing the Checkpoint/Restore Working Group](https://kubernetes.io/blog/2026/01/21/introducing-checkpoint-restore-wg/)
5. [CRIU: Checkpoint/Restore](https://criu.org/Checkpoint/Restore)
6. [CRIU: Kubernetes](https://criu.org/Kubernetes)
7. [CRIU: What cannot be checkpointed](https://www.criu.org/index.php?title=What_cannot_be_checkpointed)
8. [Podman Checkpointing](https://podman.io/docs/checkpoint)
9. [CRIU: Containerd](https://criu.org/Containerd)
