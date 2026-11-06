---
sourceHash: 78ddb6bf88d48ddb2442ef31ad347ddd0a119fc623e9ac84abfca13a189a5962
title: bpftrace
cover: /blog-covers/server.jpg
createTime: 2025/09/24 23:33:40
permalink: /en/article/q315xvoz/
---

# Introducing bpftrace

## What Is bpftrace?

bpftrace is a high-level tracing tool based on eBPF. It provides a concise DSL (domain-specific language) for writing eBPF programs to perform dynamic tracing and performance analysis on Linux systems.

## Key Features

- **Easy to use**: An awk-like syntax that is easy to learn and use
- **High performance**: Built on eBPF, with very little impact on system performance
- **Powerful**: Traces both kernel and user-space programs
- **Real time**: Supports real-time data collection and analysis

## Installation

### Ubuntu/Debian
```bash
sudo apt install bpftrace
```

### CentOS/RHEL
```bash
sudo yum install bpftrace
# Or
sudo dnf install bpftrace
```

### Building from Source
```bash
git clone https://github.com/iovisor/bpftrace.git
cd bpftrace
mkdir build && cd build
cmake ..
make -j8
sudo make install
```

## Basic Syntax

The basic structure of a bpftrace program:
```
probe /filter/ { action }
```

- **probe**: Specifies the event to trace
- **filter**: An optional condition
- **action**: The operation to execute when the event fires

## Common Probe Types

### 1. System Call Tracing
```bash
# Trace all system calls
sudo bpftrace -e 'tracepoint:syscalls:sys_enter_* { @[probe] = count(); }'

# Trace a specific system call
sudo bpftrace -e 'tracepoint:syscalls:sys_enter_openat { printf("openat: %s\n", str(args->filename)); }'
```

### 2. Function Tracing
```bash
# Trace a kernel function
sudo bpftrace -e 'kprobe:vfs_read { @[comm] = count(); }'

# Trace a user-space function
sudo bpftrace -e 'uprobe:/bin/bash:readline { printf("bash readline: %s\n", str(arg0)); }'
```

### 3. Timers
```bash
# Print once per second
sudo bpftrace -e 'interval:s:1 { printf("Hello from bpftrace!\n"); }'
```

## Practical Examples

### 1. System Call Statistics
```bash
sudo bpftrace -e '
tracepoint:syscalls:sys_enter_* {
    @[probe] = count();
}
END {
    print(@);
}'
```

### 2. Monitoring File Access
```bash
sudo bpftrace -e '
tracepoint:syscalls:sys_enter_openat {
    @[comm, str(args->filename)] = count();
}
END {
    print(@);
}'
```

### 3. Monitoring Network Connections
```bash
sudo bpftrace -e '
tracepoint:syscalls:sys_enter_connect {
    @[comm, args->uservaddr] = count();
}
END {
    print(@);
}'
```

### 4. Monitoring Process Creation
```bash
sudo bpftrace -e '
tracepoint:syscalls:sys_enter_execve {
    printf("execve: %s\n", str(args->filename));
}'
```

### 5. Monitoring Memory Allocation
```bash
sudo bpftrace -e '
kprobe:kmalloc {
    @[comm] = count();
}
END {
    print(@);
}'
```

## Advanced Features

### 1. Conditional Filtering
```bash
sudo bpftrace -e '
tracepoint:syscalls:sys_enter_openat /str(args->filename) == "/etc/passwd"/ {
    printf("Access to /etc/passwd by %s\n", comm);
}'
```

### 2. Aggregation
```bash
sudo bpftrace -e '
tracepoint:syscalls:sys_enter_read {
    @bytes[comm] = sum(args->count);
}
END {
    print(@bytes);
}'
```

### 3. Histograms
```bash
sudo bpftrace -e '
tracepoint:syscalls:sys_enter_read {
    @bytes = hist(args->count);
}
END {
    print(@bytes);
}'
```

## Common Built-in Variables

- `comm`: Process name
- `pid`: Process ID
- `tid`: Thread ID
- `cpu`: CPU core number
- `args`: Function arguments
- `retval`: Return value

## Common Built-in Functions

- `printf()`: Formatted output
- `str()`: Convert a pointer to a string
- `count()`: Count events
- `sum()`: Sum values
- `avg()`: Average value
- `min()`: Minimum value
- `max()`: Maximum value
- `hist()`: Histogram
- `lhist()`: Linear histogram

## Performance Analysis Examples

### CPU Usage Analysis
```bash
sudo bpftrace -e '
profile:hz:99 {
    @[comm] = count();
}
END {
    print(@);
}'
```

### System Call Latency Analysis
```bash
sudo bpftrace -e '
tracepoint:syscalls:sys_enter_read {
    @start[pid] = nsecs;
}
tracepoint:syscalls:sys_exit_read /@start[pid]/ {
    @latency = hist(nsecs - @start[pid]);
    delete(@start[pid]);
}
END {
    print(@latency);
}'
```

## Things to Keep in Mind

1. **Permissions**: Most bpftrace programs require root privileges
2. **Kernel version**: Linux 4.9+ is required; 4.18+ is recommended
3. **Performance impact**: Although eBPF has low overhead, complex programs can still affect system performance
4. **Debug information**: Some features require kernel debugging symbols

## Learning Resources

- [Official bpftrace documentation](https://github.com/iovisor/bpftrace)
- [bpftrace reference guide](https://github.com/iovisor/bpftrace/blob/master/docs/reference_guide.md)
- [eBPF and XDP reference guide](https://cilium.readthedocs.io/en/stable/bpf/)

## Summary

bpftrace is a powerful system tracing tool that simplifies eBPF development and makes system performance analysis and debugging easier. Its concise syntax and rich features help developers quickly locate performance bottlenecks and security issues.
