---
sourceHash: 925e3ffea7a35415c5d4c8ae4dd1f70b0cb95a67b01f52fc9fdd57ea602eb952
title: 'Native Kubernetes Checkpoint Limitations: Why It Is Not General-Purpose Pod Live Migration'
createTime: 2026/05/29 12:00:00
permalink: /en/notes/kubernetes/k8s-checkpoint-limitations/
---

# Native Kubernetes Checkpoint Limitations: Why It Is Not General-Purpose Pod Live Migration

## In One Sentence

Native Kubernetes checkpointing saves the execution state of an individual running container. It does not fully solve reliable Pod recovery, business disaster recovery, or uninterrupted migration.

It relies on CRIU and inherits CRIU's boundaries. CRIU can save many Linux process properties, including memory pages, registers, file descriptors, process trees, and namespaces. It cannot automatically understand Kubernetes Pod semantics, application transactions, remote connections, storage consistency, or scheduling constraints.

Think of the layers as follows:

```text
kubelet checkpoint API：
  Triggers a checkpoint of a specific container

CRI Runtime + OCI Runtime + CRIU：
  Dumps process state into a checkpoint archive

Kubernetes control plane:
  Currently provides no stable, unified PodRestore API
```

This suits forensics, cold-start optimization experiments, and state preservation for particular single-container workloads. Treating it directly as Pod live migration or general disaster recovery encounters many limitations.

## What Layer Does Native Support Reach?

As of 2026-05-29, the `ContainerCheckpoint` feature gate has been beta and enabled by default since Kubernetes v1.30. It exposes a node-local kubelet endpoint:

```text
POST /checkpoint/{namespace}/{pod}/{container}
```

The endpoint has several important properties:

1. **It is a kubelet API, not a normal Kubernetes resource API on the apiserver.**
2. **It operates on a container, not a Pod.**
3. **It creates checkpoints but provides no stable, unified restore API.**
4. **Archive contents depend on the CRI runtime implementation.**
5. **If the CRI runtime does not implement checkpointing, kubelet returns 500.**

A request approximately follows:

```text
User / tool
  -> kubelet checkpoint API
  -> CRI Runtime
  -> OCI Runtime
  -> CRIU
  -> /var/lib/kubelet/checkpoints/checkpoint-*.tar
```

Restoration usually does not call a kubelet restore endpoint. Instead, the archive is converted into an annotated OCI image and used by a new Pod. The runtime recognizes the checkpoint image during container creation and follows a `runc restore`, `crun restore`, or CRIU restore path.

Native Kubernetes checkpointing is therefore closer to "node-level container-state export" than complete declarative "Pod state lifecycle management".

## Limitation 1: Container-Level, Not Pod-Level

Kubernetes schedules Pods, but the kubelet checkpoint API targets an individual container within a Pod.

This matters little for single-container Pods but becomes significant with multiple containers. For example:

```text
Pod
├── app container
├── envoy / istio-proxy sidecar
├── log sidecar
└── metrics sidecar
```

Checkpointing only the application container may produce these problems after restore:

1. Application memory reflects an earlier point in time.
2. Sidecars are newly started processes.
3. Unix sockets, localhost TCP connections, and iptables state between application and sidecars are inconsistent.
4. mTLS certificates, short-lived tokens, and connection pools have changed.
5. Shared-volume files do not match the application's memory state.

CRIU alone cannot solve this. It can save a process tree but does not know which Kubernetes containers form one application consistency boundary.

Pod-level restoration additionally requires:

1. A consistency barrier across containers.
2. Traffic draining and a defined freeze order before checkpointing.
3. Version binding across container checkpoints.
4. Policies for restoring versus restarting sidecars.
5. Post-restore readiness, traffic switching, and rollback.

Native checkpointing is thus a building block for Pod-level capabilities, not equivalent to a Pod checkpoint.

## Limitation 2: No Unified Kubernetes Restore Semantics

Checkpoint and restore are complementary actions, but Kubernetes currently exposes only checkpoint creation through its native kubelet API.

Direct consequences include:

1. No built-in resource such as `PodRestore`.
2. No standard status fields for restore progress.
3. No unified failure reasons, retry semantics, or rollback semantics.
4. No native scheduler understanding that a Pod must restore on a compatible node.
5. No uniform archive storage, encryption, retention, or garbage-collection policy.

A common in-cluster restore workflow is:

```text
checkpoint archive
  -> checkpointctl / buildah
  -> checkpoint OCI image
  -> push registry
  -> create Pod with checkpoint image
  -> runtime detects annotation
  -> CRIU restore
```

This can work, but it is not a built-in declarative Kubernetes lifecycle. It depends on runtime recognition of image annotations, image-building tools, registries, and node runtime versions.

The result is native checkpoint creation paired with runtime-specific restoration assembled from tooling and custom platform controllers.

## Limitation 3: CRIU Cannot Save Every Linux Resource

CRIU is powerful but can preserve only state exposed by the kernel and modeled by CRIU.

These resources commonly cause checkpoint failures or restore problems:

| Resource type | Typical problem |
| :--- | :--- |
| Special devices | GPU, RDMA, DPDK, FUSE, and certain character/block device states cannot be saved generically. |
| Debugging state | Processes traced by ptrace tools such as gdb or strace may fail to dump. |
| Unusual sockets | Support for TCP, UDP, Unix, packet, and netlink sockets has boundaries; other types may fail. |
| File locks | `flock` / `fcntl` require special handling and are safer when all related processes are included. |
| External Unix sockets | Peers outside the checkpoint require special options or applications tolerant of reconnection. |
| Deleted or inaccessible files | Open files that were unlinked or have unreachable paths may not be found during restore. |
| IPC objects | SysV IPC and shared memory may not restore consistently without a complete namespace view. |
| Graphical/desktop applications | State may reside in an external X server, Wayland compositor, or device. |

Kubernetes amplifies these issues because containers do not own many resources exclusively: kubelet, CNI, CSI, device plugins, service meshes, and the host manage them together.

For GPU workloads, CPU memory is only part of the state; CUDA contexts, GPU memory, and driver state also matter. Ordinary CRIU checkpoints do not automatically preserve all of them. Specialized research or vendor GPU checkpoint capabilities do not imply generic native Kubernetes GPU restoration support.

## Limitation 4: Transparent Network Migration Is Difficult

CRIU supports some TCP connection restoration, but that does not make every Kubernetes connection transparently migratable.

Restoring TCP connections requires at least:

1. Availability of the original local IP and port on the target node.
2. A peer that still considers the connection valid.
3. Correct restoration of sequence numbers, windows, timestamps, and other TCP state.
4. Defined handling of packets during migration: dropped, buffered, or blocked.
5. Consistent iptables, conntrack, eBPF, and CNI routing state.

CRIU's live migration documentation emphasizes that TCP socket restoration attempts to reuse the original addresses; without the corresponding target-side IP, relevant system calls fail.

Kubernetes makes this more complex:

```text
Source Pod:
  IP = 10.244.1.20
  Node = node-a

Target Pod:
  IP = 10.244.2.31
  Node = node-b
```

If restoration changes the Pod IP, it also changes the connection's four-tuple:

```text
Source IP:source port → Destination IP:destination port
```

A peer does not automatically move an old connection to a new four-tuple simply because Kubernetes created a new Pod.

Services affect load balancing for new connections and generally cannot save established connections. Ingress, gateways, and service meshes can help drain traffic and reconnect but cannot move arbitrary TCP connections without loss.

A realistic interpretation is:

1. Checkpoint/restore can reduce application reinitialization costs.
2. It cannot guarantee uninterrupted long-lived connections.
3. Cross-node migration needs either CNI support for IP preservation/migration or application reconnection.
4. User-facing services need readiness checks, draining, retries, and idempotency as safeguards.

## Limitation 5: Filesystems and Volumes Are Not Automatically Consistent

CRIU saves some file descriptors and filesystem-related process state. It does not create a consistent snapshot of the entire Pod filesystem.

Common Kubernetes storage types:

| Storage type | Checkpoint/restore risk |
| :--- | :--- |
| Container writable layer | Archives may contain some rootfs diff, but format and behavior are runtime-dependent. |
| `emptyDir` | Node-local temporary directories do not automatically exist elsewhere; copy them or avoid depending on them. |
| PVC | The target must remount it; preferably coordinate with VolumeSnapshot for point-in-time consistency. |
| hostPath / local PV | Node-bound; cross-node restoration can fail or read different data. |
| ConfigMap / Secret | Contents may have changed since checkpoint creation and conflict with restored memory. |
| Object storage / databases | Outside CRIU's scope; applications must provide transactions and idempotency. |

The most dangerous case is memory reverting to an old time while disk or remote state remains at a newer time.

For example, a task continues after checkpointing and writes result files. Restoring the older checkpoint makes it believe those writes never happened, although the new files already exist. Outcomes range from duplicate computation to data corruption.

CRIU explicitly warns about options such as `--leave-running`: if the original process continues and external files or connections change, later restoration may fail or become inconsistent due to mismatched external state.

Production must therefore treat process checkpointing and storage snapshots as one consistency problem, rather than checking only whether processes restore.

## Limitation 6: Strict Environment Compatibility

A checkpoint archive is not a universal image. It depends strongly on the environment where it was created.

The destination should satisfy:

1. Matching CPU architecture, such as both `amd64` or both `arm64`.
2. Compatible CPU features, including required AVX, SSE, or other instructions.
3. Compatible Linux kernel versions and namespace/cgroup behavior.
4. Matching cgroup v1/v2 configuration, or correct runtime adaptation.
5. Compatible CRIU, runc/crun, and CRI-O/containerd versions.
6. SELinux, AppArmor, seccomp, and capability policies that permit restoration.
7. Available container images, rootfs, mount paths, and dependencies.
8. Consistent CNI, CSI, and device plugin behavior.

Ordinary image startup failures can often be resolved by repulling images, changing arguments, or recreating Pods. Restore failures may hide in kernel objects, registers, file descriptors, sockets, namespaces, or runtime internals, making troubleshooting harder.

This explains why a single-machine demo can work while generalizing to heterogeneous production clusters is difficult.

## Limitation 7: Performance Depends Heavily on Memory Usage

The kubelet documentation explicitly states that checkpoint creation time depends directly on container memory usage: process memory pages must be written to disk.

Performance factors include:

1. Actual process memory usage.
2. Dirty-page ratio.
3. Process and thread counts.
4. Open file descriptor count.
5. Numbers of sockets, pipes, IPC, epoll, and other kernel objects.
6. Local disk I/O performance.
7. Compression algorithm and ratio.
8. Whether archives must upload to object storage or a registry.
9. Whether a large checkpoint image must be pulled before restoration.

A tiny busybox counter might finish in hundreds of milliseconds. A JVM, Notebook, or model service using tens of GiB can produce a large archive, with substantial costs for writing, compression, uploading, pulling, and restoration.

A useful rule is:

```text
If checkpoint image pull time + CRIU restore time
  >= Normal application cold-start time
then checkpoint/restore provides limited cold-start optimization value.
```

It is not always faster. It fits workloads with expensive initialization, manageable runtime memory, and controllable external state.

## Limitation 8: Significant Security Risks

Checkpoint archives usually contain process memory, which may include:

1. Kubernetes ServiceAccount token。
2. TLS private keys.
3. Database passwords.
4. JWT、OAuth token、session cookie。
5. User request contents.
6. Plaintext application caches.
7. Environment variables and configuration.

Their sensitivity is therefore usually higher than that of ordinary container images.

Ordinary images contain binaries, dependencies, and configuration templates. Checkpoints may contain live application secrets and user data. Converting one to an OCI image and pushing it effectively uploads a memory dump to the registry.

Production considerations include:

1. Who may call the kubelet checkpoint API.
2. Who may log into nodes and read `/var/lib/kubelet/checkpoints`.
3. Archive encryption.
4. Strict access control for registries and object storage.
5. Automatic expiration and garbage collection.
6. Audit logging.
7. Whether highly sensitive Pods must prohibit checkpointing.

Being a debugging tool or platform capability does not justify treating checkpoints as ordinary logs or images.

## Limitation 9: No Operational State Machine

Real checkpoint/restore operations are usually a state machine rather than one command:

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

Every stage can fail:

| Stage | Possible failures |
| :--- | :--- |
| Draining | Service/mesh drain timeout; requests still arrive. |
| Checkpointing | Unsupported CRIU resource or runtime error. |
| Uploading | Large archive, network failure, or object-store failure. |
| ImageBuilding | Archive format incompatible with tooling. |
| Scheduling | No node meets kernel/runtime/CPU/storage requirements. |
| Pulling | Slow registry, permission failure, or oversized layers. |
| Restoring | Missing IPs, mounts, devices, or seccomp/SELinux blocks. |
| Verifying | Processes start, but business health checks fail. |
| Cleaning | Old Pods, checkpoint images, or temporary files remain. |

The native checkpoint API does not manage these states. A reliable platform requires custom Operator, Node Agent, or controller state machines.

Without one, a demo may succeed once, but a later failure leaves the system's phase and resource retention, retry, or cleanup requirements unclear.

## Common Failure Symptoms

| Symptom | Common cause | Investigation |
| :--- | :--- | :--- |
| kubelet returns 404 | Feature gate disabled or namespace/Pod/container absent | Check kubelet settings and whether the target Pod runs locally. |
| kubelet returns 500 | CRI checkpointing unsupported or CRIU dump failed | Inspect kubelet, runtime, and CRIU logs. |
| Huge archive | High memory usage, many dirty pages, poor compression | Inspect checkpointctl output, memory, and disk I/O. |
| Restored Pod fails to start | Unrecognized image annotation or incompatible runtime | Inspect image manifests and containerd/CRI-O versions. |
| CRIU socket errors during restore | TCP/Unix peers or network state incompatible | Inspect connections, IPs, CNI, iptables/eBPF. |
| Processes exist but application misbehaves | External state, filesystem, database, or queue offsets disagree | Review idempotency, transactions, and storage snapshots. |
| Multi-container Pod restore fails | Only the application was restored; sidecars mismatch | Redesign multi-container consistency. |
| Checkpoint file leakage | Missing retention and garbage collection | Add encryption, expiry, auditing, and cleanup. |

## Suitable and Unsuitable Scenarios

Good initial pilot candidates:

1. Single-container Pods.
2. No GPU, RDMA, DPDK, FUSE, or other special devices.
3. Few external connections, or automatic application reconnection.
4. State mainly in process memory, with controlled disk state.
5. Tolerance for pauses lasting seconds or longer.
6. Comprehensive readinessProbe and business health checks.
7. Forensics, experiments, cold-start optimization, or low-priority task recovery.

Poor initial pilot candidates:

1. Business Pods with many sidecars and strong service-mesh dependencies.
2. Gateways, long-lived connection services, and real-time communications.
3. Database primaries or strongly consistent storage systems.
4. GPU training or workloads deeply dependent on RDMA, DPDK, or eBPF.
5. Strong hostPath, local PV, or node-local cache dependencies.
6. Highly sensitive tokens, keys, or user data without checkpoint encryption.
7. Workloads intolerant of duplicate execution, disconnected sessions, or brief outages.

## Pre-Deployment Checklist

Before adopting native checkpointing in a platform, answer:

1. Is the goal forensics, cold-start optimization, recovery from preemption, or migration?
2. Is the target a single-container or multi-container Pod?
3. Must restoration cross nodes?
4. How will destination kernel, runtime, CPU, cgroups, and security policy compatibility be guaranteed?
5. Can the application reconnect after TCP connections break?
6. How will PVCs, emptyDir, hostPath, and local caches stay consistent?
7. Where are archives stored, and are they encrypted?
8. Who may create, download, and restore checkpoints?
9. What are the image and archive garbage-collection policies?
10. Does success mean a process exists, or that business readiness passes?
11. Does the old Pod remain after restore failure, and how does rollback work?
12. Has the workload passed repeated checkpoint/restore load tests?

Without answers, this should not be treated as production live migration.

## Recommended Role

A more appropriate division of responsibility is:

```text
Application-level checkpoints:
  Reliable business recovery

Native Kubernetes checkpointing + CRIU:
  Preserve process execution state and restore in selected scenarios

Operator / Node Agent：
  Declarative orchestration, state machines, storage, security, and scheduling

Application reconnection, idempotency, and transactions:
  External-state consistency
```

CRIU complements application-level fault tolerance rather than replacing it.

For production disaster recovery, prioritize application checkpoints, transactions, idempotency, and persistent-state recovery. For forensics, cold starts, Notebook hibernation, or low-priority preempted tasks, native Kubernetes checkpointing can serve as a foundation for further pilots.

## Summary

The greatest value of native checkpointing is integrating CRIU process-state capture with kubelet, so platforms can preserve execution state without entering containers.

Its boundaries are equally clear:

1. A node-level kubelet API, not a declarative Pod API.
2. A container target, not an entire Pod.
3. Native checkpoint creation without unified restore semantics.
4. CRIU cannot save every device, socket, lock, external resource, or hardware state.
5. Network connections, storage, and business transactions are not automatically consistent.
6. Restoration depends on compatible kernels, runtimes, CPUs, cgroups, and security policies.
7. Archives may be large; performance benefits need measurement.
8. Memory contents create significant security risks.
9. Platform integration requires an additional Operator/Agent state machine.

Enabling a feature gate does not provide Pod live migration; it provides a low-level capability. Used appropriately, it supports forensics, experimental recovery, and selected workload optimization. Misused, it confuses process recovery with business recovery, checkpoint files with backups, and short pauses with uninterrupted migration.

## References

1. [Kubernetes Kubelet Checkpoint API](https://kubernetes.io/docs/reference/node/kubelet-checkpoint-api/)
2. [Kubernetes Feature Gates](https://kubernetes.io/docs/reference/command-line-tools-reference/feature-gates/)
3. [Kubernetes Blog: Forensic container checkpointing in Kubernetes](https://kubernetes.io/blog/2022/12/05/forensic-container-checkpointing-alpha/)
4. [Kubernetes Blog: Announcing the Checkpoint/Restore Working Group](https://kubernetes.io/blog/2026/01/21/introducing-checkpoint-restore-wg/)
5. [CRIU: Kubernetes](https://criu.org/Kubernetes)
6. [CRIU: What cannot be checkpointed](https://www.criu.org/index.php?title=What_cannot_be_checkpointed)
7. [CRIU: Advanced usage](https://criu.org/Advanced_usage)
8. [CRIU: Live migration](https://www.criu.org/Live_migration)
