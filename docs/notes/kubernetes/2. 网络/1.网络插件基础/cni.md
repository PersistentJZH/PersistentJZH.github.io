---
title: 🥅cni
createTime: 2025/07/19 21:03:02
permalink: /notes/kubernetes/34fs59t4/
---


# **从Linux veth-pair 说起**

## **veth-pair是什么**

veth-pair（Virtual Ethernet Pair）是 Linux 内核提供的一种虚拟网络设备，它总是成对出现，用于连接不同的网络命名空间（network namespace），是容器网络的基础构建块。

## **基本特性**

1. **成对出现**：创建时总是生成两个互联的虚拟接口
2. **双向通信**：一端发送的数据会立即被另一端接收
3. **跨命名空间**：可以将两端分配到不同的网络命名空间
4. **全双工通信**：支持同时双向数据传输

## **工作原理**

```
+---------------------+       +---------------------+
|  Network Namespace A |       |  Network Namespace B |
|                     |       |                     |
|   +-------------+   |       |   +-------------+   |
|   |   veth0     |   |       |   |   veth1     |   |
|   | (e.g. eth0) |   |       |   | (e.g. eth0) |   |
|   +------|------+   |       |   +------|------+   |
|          |          |       |          |          |
+----------|----------+       +----------|----------+
           |_____________________________|
                   虚拟链路
```

## 使用例子

### 示例1：基础veth-pair创建与跨命名空间通信

```bash
#!/bin/bash

# 清理可能存在的旧配置（安全操作）
ip netns delete ns1 2>/dev/null
ip netns delete ns2 2>/dev/null
ip link delete veth0 2>/dev/null

# -------------------------- 步骤1：创建网络命名空间 --------------------------
# 创建两个独立的网络命名空间，模拟两个隔离的网络环境
echo "创建网络命名空间ns1和ns2..."
ip netns add ns1  # 创建命名空间ns1（可视为容器1的网络空间）
ip netns add ns2  # 创建命名空间ns2（可视为容器2的网络空间）

# -------------------------- 步骤2：创建veth-pair --------------------------
# 创建一对虚拟以太网设备，veth0和veth1会自动连接
echo "创建veth pair: veth0 <--> veth1..."
ip link add veth0 type veth peer name veth1

# -------------------------- 步骤3：将veth分配到命名空间 --------------------------
# 将veth0放入ns1，veth1放入ns2，实现跨命名空间连接
echo "分配veth设备到命名空间..."
ip link set veth0 netns ns1  # veth0移动到ns1
ip link set veth1 netns ns2  # veth1移动到ns2

# -------------------------- 步骤4：配置IP地址和启用接口 --------------------------
# 在各自的命名空间中配置IP并启用设备
echo "配置IP地址并启用设备..."

# 在ns1中配置
ip netns exec ns1 ip addr add 192.168.1.1/24 dev veth0  # 给veth0分配IP
ip netns exec ns1 ip link set veth0 up                   # 启用veth0
ip netns exec ns1 ip link set lo up                     # 启用环回接口

# 在ns2中配置
ip netns exec ns2 ip addr add 192.168.1.2/24 dev veth1  # 给veth1分配IP
ip netns exec ns2 ip link set veth1 up                   # 启用veth1
ip netns exec ns2 ip link set lo up                     # 启用环回接口

# -------------------------- 步骤5：测试连通性 --------------------------
echo "测试ns1和ns2之间的连通性..."
# 从ns1 ping ns2
ip netns exec ns1 ping -c 3 192.168.1.2

# 从ns2 ping ns1
ip netns exec ns2 ping -c 3 192.168.1.1

# -------------------------- 步骤6：查看设备详细信息 --------------------------
echo "显示设备详细信息..."
echo -e "\\nns1中的网络设备:"
ip netns exec ns1 ip -d link show  # -d显示详细信息

echo -e "\\nns2中的网络设备:"
ip netns exec ns2 ip -d link show

echo -e "\\nveth0的对端信息:"
ip netns exec ns1 ethtool -S veth0  # 显示对端接口索引

```

### 示例2：通过veth连接容器与主机（带网桥）

```bash
#!/bin/bash

# 清理环境
ip netns delete container-ns 2>/dev/null
ip link delete veth-host 2>/dev/null
ip link delete br0 2>/dev/null

# -------------------------- 步骤1：创建容器命名空间 --------------------------
echo "创建容器网络命名空间..."
ip netns add container-ns  # 模拟容器网络空间

# -------------------------- 步骤2：创建网桥 --------------------------
echo "创建网桥br0..."
ip link add br0 type bridge          # 创建Linux网桥
ip addr add 10.1.1.1/24 dev br0     # 给网桥分配IP
ip link set br0 up                  # 启用网桥

# -------------------------- 步骤3：创建veth-pair --------------------------
echo "创建veth pair: veth-cont <--> veth-host..."
ip link add veth-cont type veth peer name veth-host

# -------------------------- 步骤4：分配veth设备 --------------------------
echo "分配veth设备..."
ip link set veth-cont netns container-ns  # 一端放入容器
ip link set veth-host master br0         # 另一端连接到网桥
ip link set veth-host up                 # 启用主机端veth

# -------------------------- 步骤5：配置容器网络 --------------------------
echo "配置容器网络..."
ip netns exec container-ns ip addr add 10.1.1.2/24 dev veth-cont
ip netns exec container-ns ip link set veth-cont up
ip netns exec container-ns ip link set lo up
ip netns exec container-ns ip route add default via 10.1.1.1

# -------------------------- 步骤6：配置NAT使容器访问外网 --------------------------
echo "配置NAT..."
# 启用IP转发
sysctl -w net.ipv4.ip_forward=1

# 设置iptables规则
iptables -t nat -A POSTROUTING -s 10.1.1.0/24 -j MASQUERADE
iptables -A FORWARD -i br0 -o eth0 -j ACCEPT
iptables -A FORWARD -i eth0 -o br0 -m state --state RELATED,ESTABLISHED -j ACCEPT

# -------------------------- 步骤7：验证连接 --------------------------
echo "测试容器到主机的连接..."
ip netns exec container-ns ping -c 3 10.1.1.1

echo "测试容器到外网的连接（需要主机有互联网连接）..."
ip netns exec container-ns ping -c 3 8.8.8.8

# -------------------------- 步骤8：显示最终配置 --------------------------
echo -e "\\n当前网络拓扑:"
echo "+
| 主机 (br0:10.1.1.1)
|   |
|   veth-host
|     (veth pair)
|   veth-cont
|   |
| 容器网络空间 (veth-cont:10.1.1.2)
"

echo "主机网桥信息:"
brctl show br0

echo "容器网络配置:"
ip netns exec container-ns ip addr show
ip netns exec container-ns route -n

```

### 示例3：多veth复杂网络拓扑

```bash
#!/bin/bash

# 清理环境
ip netns delete router 2>/dev/null
ip netns delete client1 2>/dev/null
ip netns delete client2 2>/dev/null
ip link delete veth-r1 2>/dev/null
ip link delete veth-r2 2>/dev/null

# -------------------------- 步骤1：创建命名空间 --------------------------
echo "创建网络命名空间..."
ip netns add router    # 模拟路由器
ip netns add client1   # 客户端1
ip netns add client2   # 客户端2

# -------------------------- 步骤2：创建veth-pair --------------------------
echo "创建veth pairs..."
# 路由器与client1之间的连接
ip link add veth-r1 type veth peer name veth-c1
# 路由器与client2之间的连接
ip link add veth-r2 type veth peer name veth-c2

# -------------------------- 步骤3：分配veth设备 --------------------------
echo "分配veth设备..."
# client1连接
ip link set veth-r1 netns router
ip link set veth-c1 netns client1

# client2连接
ip link set veth-r2 netns router
ip link set veth-c2 netns client2

# -------------------------- 步骤4：配置IP地址 --------------------------
echo "配置IP地址..."
# 路由器配置
ip netns exec router ip addr add 10.0.1.1/24 dev veth-r1
ip netns exec router ip addr add 10.0.2.1/24 dev veth-r2
ip netns exec router ip link set veth-r1 up
ip netns exec router ip link set veth-r2 up

# client1配置
ip netns exec client1 ip addr add 10.0.1.100/24 dev veth-c1
ip netns exec client1 ip link set veth-c1 up
ip netns exec client1 ip link set lo up
ip netns exec client1 ip route add default via 10.0.1.1

# client2配置
ip netns exec client2 ip addr add 10.0.2.100/24 dev veth-c2
ip netns exec client2 ip link set veth-c2 up
ip netns exec client2 ip link set lo up
ip netns exec client2 ip route add default via 10.0.2.1

# -------------------------- 步骤5：启用路由器转发 --------------------------
echo "配置路由器转发..."
ip netns exec router sysctl -w net.ipv4.ip_forward=1

# -------------------------- 步骤6：测试网络 --------------------------
echo "测试client1到client2的连通性..."
ip netns exec client1 ping -c 3 10.0.2.100

echo "测试client2到client1的连通性..."
ip netns exec client2 ping -c 3 10.0.1.100

# -------------------------- 步骤7：显示网络拓扑 --------------------------
echo -e "\\n最终网络拓扑:"
echo "+
client1 (10.0.1.100) <--[veth]--> router (10.0.1.1)
                           |
client2 (10.0.2.100) <--[veth]--> router (10.0.2.1)
"

echo "路由器路由表:"
ip netns exec router ip route show

echo "client1 ARP表:"
ip netns exec client1 ip neigh show

```

# 为什么需要CNI？

# 如何编写一个CNI？