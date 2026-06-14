---
title: bpftrace
createTime: 2025/09/24 23:33:40
permalink: /article/q315xvoz/
---

# bpftrace 工具介绍

## 什么是 bpftrace

bpftrace 是一个基于 eBPF 的高级跟踪工具，它提供了一个简洁的 DSL（领域特定语言）来编写 eBPF 程序，用于 Linux 系统的动态跟踪和性能分析。

## 主要特性

- **简单易用**：提供类似 awk 的语法，易于学习和使用
- **高性能**：基于 eBPF 技术，对系统性能影响极小
- **功能强大**：可以跟踪内核和用户空间程序
- **实时性**：支持实时数据收集和分析

## 安装方法

### Ubuntu/Debian
```bash
sudo apt install bpftrace
```

### CentOS/RHEL
```bash
sudo yum install bpftrace
# 或者
sudo dnf install bpftrace
```

### 从源码编译
```bash
git clone https://github.com/iovisor/bpftrace.git
cd bpftrace
mkdir build && cd build
cmake ..
make -j8
sudo make install
```

## 基本语法

bpftrace 程序的基本结构：
```
probe /filter/ { action }
```

- **probe**：探针，指定要跟踪的事件
- **filter**：过滤器，可选的条件
- **action**：动作，当事件触发时执行的操作

## 常用探针类型

### 1. 系统调用跟踪
```bash
# 跟踪所有系统调用
sudo bpftrace -e 'tracepoint:syscalls:sys_enter_* { @[probe] = count(); }'

# 跟踪特定系统调用
sudo bpftrace -e 'tracepoint:syscalls:sys_enter_openat { printf("openat: %s\n", str(args->filename)); }'
```

### 2. 函数跟踪
```bash
# 跟踪内核函数
sudo bpftrace -e 'kprobe:vfs_read { @[comm] = count(); }'

# 跟踪用户空间函数
sudo bpftrace -e 'uprobe:/bin/bash:readline { printf("bash readline: %s\n", str(arg0)); }'
```

### 3. 定时器
```bash
# 每秒打印一次
sudo bpftrace -e 'interval:s:1 { printf("Hello from bpftrace!\n"); }'
```

## 实用示例

### 1. 系统调用统计
```bash
sudo bpftrace -e '
tracepoint:syscalls:sys_enter_* {
    @[probe] = count();
}
END {
    print(@);
}'
```

### 2. 文件访问监控
```bash
sudo bpftrace -e '
tracepoint:syscalls:sys_enter_openat {
    @[comm, str(args->filename)] = count();
}
END {
    print(@);
}'
```

### 3. 网络连接监控
```bash
sudo bpftrace -e '
tracepoint:syscalls:sys_enter_connect {
    @[comm, args->uservaddr] = count();
}
END {
    print(@);
}'
```

### 4. 进程创建监控
```bash
sudo bpftrace -e '
tracepoint:syscalls:sys_enter_execve {
    printf("execve: %s\n", str(args->filename));
}'
```

### 5. 内存分配监控
```bash
sudo bpftrace -e '
kprobe:kmalloc {
    @[comm] = count();
}
END {
    print(@);
}'
```

## 高级功能

### 1. 条件过滤
```bash
sudo bpftrace -e '
tracepoint:syscalls:sys_enter_openat /str(args->filename) == "/etc/passwd"/ {
    printf("Access to /etc/passwd by %s\n", comm);
}'
```

### 2. 聚合统计
```bash
sudo bpftrace -e '
tracepoint:syscalls:sys_enter_read {
    @bytes[comm] = sum(args->count);
}
END {
    print(@bytes);
}'
```

### 3. 直方图
```bash
sudo bpftrace -e '
tracepoint:syscalls:sys_enter_read {
    @bytes = hist(args->count);
}
END {
    print(@bytes);
}'
```

## 常用内置变量

- `comm`：进程名
- `pid`：进程ID
- `tid`：线程ID
- `cpu`：CPU核心号
- `args`：函数参数
- `retval`：返回值

## 常用内置函数

- `printf()`：格式化输出
- `str()`：将指针转换为字符串
- `count()`：计数
- `sum()`：求和
- `avg()`：平均值
- `min()`：最小值
- `max()`：最大值
- `hist()`：直方图
- `lhist()`：线性直方图

## 性能分析示例

### CPU 使用率分析
```bash
sudo bpftrace -e '
profile:hz:99 {
    @[comm] = count();
}
END {
    print(@);
}'
```

### 系统调用延迟分析
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

## 注意事项

1. **权限要求**：大多数 bpftrace 程序需要 root 权限
2. **内核版本**：需要 Linux 4.9+ 内核，推荐 4.18+
3. **性能影响**：虽然 eBPF 性能开销很小，但复杂程序仍可能影响系统性能
4. **调试信息**：某些功能需要内核调试符号

## 学习资源

- [bpftrace 官方文档](https://github.com/iovisor/bpftrace)
- [bpftrace 参考指南](https://github.com/iovisor/bpftrace/blob/master/docs/reference_guide.md)
- [eBPF 和 XDP 参考指南](https://cilium.readthedocs.io/en/stable/bpf/)

## 总结

bpftrace 是一个功能强大的系统跟踪工具，它简化了 eBPF 程序开发，使得系统性能分析和调试变得更加容易。通过其简洁的语法和丰富的功能，可以帮助开发者快速定位系统性能瓶颈和安全问题。
