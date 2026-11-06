---
sourceHash: 08fc678b633bf7957bed30e1a5796a7602ce1f959d0704a4592a47b558717c67
title: 🥅cni
createTime: 2025/07/19 21:03:02
permalink: /en/notes/kubernetes/34fs59t4/
---


# **Starting with Linux veth Pairs**

## **What Is a veth Pair?**

A veth pair (Virtual Ethernet Pair) is a virtual network device provided by the Linux kernel. Its interfaces always come in pairs and connect different network namespaces, making it a fundamental building block of container networking.

## **Basic Properties**

1. **Paired interfaces**: Creation always produces two interconnected virtual interfaces
2. **Bidirectional communication**: Data sent at one end is immediately received at the other
3. **Cross-namespace connectivity**: The two ends can be assigned to different network namespaces
4. **Full duplex**: Data can travel in both directions simultaneously

## **How It Works**

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
                   Virtual link
```

## Usage Examples

### Example 1: Creating a veth Pair and Communicating Across Namespaces

```bash
#!/bin/bash

# Clean up any existing configuration (safe operation)
ip netns delete ns1 2>/dev/null
ip netns delete ns2 2>/dev/null
ip link delete veth0 2>/dev/null

# -------------------------- Step 1: Create network namespaces --------------------------
# Create two independent network namespaces to simulate isolated network environments
echo "Creating network namespaces ns1 and ns2..."
ip netns add ns1  # Create ns1 (representing container 1's network namespace)
ip netns add ns2  # Create ns2 (representing container 2's network namespace)

# -------------------------- Step 2: Create a veth pair --------------------------
# Create a pair of virtual Ethernet devices; veth0 and veth1 are connected automatically
echo "Creating veth pair: veth0 <--> veth1..."
ip link add veth0 type veth peer name veth1

# -------------------------- Step 3: Assign veth devices to namespaces --------------------------
# Place veth0 in ns1 and veth1 in ns2 to connect the namespaces
echo "Assigning veth devices to namespaces..."
ip link set veth0 netns ns1  # Move veth0 to ns1
ip link set veth1 netns ns2  # Move veth1 to ns2

# -------------------------- Step 4: Configure IPs and enable interfaces --------------------------
# Configure IP addresses and enable devices in their respective namespaces
echo "Configuring IP addresses and enabling devices..."

# Configure ns1
ip netns exec ns1 ip addr add 192.168.1.1/24 dev veth0  # Assign an IP to veth0
ip netns exec ns1 ip link set veth0 up                   # Enable veth0
ip netns exec ns1 ip link set lo up                     # Enable loopback

# Configure ns2
ip netns exec ns2 ip addr add 192.168.1.2/24 dev veth1  # Assign an IP to veth1
ip netns exec ns2 ip link set veth1 up                   # Enable veth1
ip netns exec ns2 ip link set lo up                     # Enable loopback

# -------------------------- Step 5: Test connectivity --------------------------
echo "Testing connectivity between ns1 and ns2..."
# Ping ns2 from ns1
ip netns exec ns1 ping -c 3 192.168.1.2

# Ping ns1 from ns2
ip netns exec ns2 ping -c 3 192.168.1.1

# -------------------------- Step 6: Inspect device details --------------------------
echo "Displaying device details..."
echo -e "\\nNetwork devices in ns1:"
ip netns exec ns1 ip -d link show  # -d shows detailed information

echo -e "\\nNetwork devices in ns2:"
ip netns exec ns2 ip -d link show

echo -e "\\nPeer information for veth0:"
ip netns exec ns1 ethtool -S veth0  # Display the peer interface index

```

### Example 2: Connecting a Container to the Host with veth and a Bridge

```bash
#!/bin/bash

# Clean up the environment
ip netns delete container-ns 2>/dev/null
ip link delete veth-host 2>/dev/null
ip link delete br0 2>/dev/null

# -------------------------- Step 1: Create a container namespace --------------------------
echo "Creating the container network namespace..."
ip netns add container-ns  # Simulate a container network namespace

# -------------------------- Step 2: Create a bridge --------------------------
echo "Creating bridge br0..."
ip link add br0 type bridge          # Create a Linux bridge
ip addr add 10.1.1.1/24 dev br0     # Assign an IP to the bridge
ip link set br0 up                  # Enable the bridge

# -------------------------- Step 3: Create a veth pair --------------------------
echo "Creating veth pair: veth-cont <--> veth-host..."
ip link add veth-cont type veth peer name veth-host

# -------------------------- Step 4: Assign veth devices --------------------------
echo "Assigning veth devices..."
ip link set veth-cont netns container-ns  # Place one end in the container
ip link set veth-host master br0         # Connect the other end to the bridge
ip link set veth-host up                 # Enable the host-side veth

# -------------------------- Step 5: Configure container networking --------------------------
echo "Configuring container networking..."
ip netns exec container-ns ip addr add 10.1.1.2/24 dev veth-cont
ip netns exec container-ns ip link set veth-cont up
ip netns exec container-ns ip link set lo up
ip netns exec container-ns ip route add default via 10.1.1.1

# -------------------------- Step 6: Configure NAT for external access --------------------------
echo "Configuring NAT..."
# Enable IP forwarding
sysctl -w net.ipv4.ip_forward=1

# Set iptables rules
iptables -t nat -A POSTROUTING -s 10.1.1.0/24 -j MASQUERADE
iptables -A FORWARD -i br0 -o eth0 -j ACCEPT
iptables -A FORWARD -i eth0 -o br0 -m state --state RELATED,ESTABLISHED -j ACCEPT

# -------------------------- Step 7: Verify connectivity --------------------------
echo "Testing the container-to-host connection..."
ip netns exec container-ns ping -c 3 10.1.1.1

echo "Testing external connectivity from the container (requires Internet access on the host)..."
ip netns exec container-ns ping -c 3 8.8.8.8

# -------------------------- Step 8: Display the final configuration --------------------------
echo -e "\\nCurrent network topology:"
echo "+
| Host (br0:10.1.1.1)
|   |
|   veth-host
|     (veth pair)
|   veth-cont
|   |
| Container network namespace (veth-cont:10.1.1.2)
"

echo "Host bridge information:"
brctl show br0

echo "Container network configuration:"
ip netns exec container-ns ip addr show
ip netns exec container-ns route -n

```

### Example 3: A Complex Topology with Multiple veth Pairs

```bash
#!/bin/bash

# Clean up the environment
ip netns delete router 2>/dev/null
ip netns delete client1 2>/dev/null
ip netns delete client2 2>/dev/null
ip link delete veth-r1 2>/dev/null
ip link delete veth-r2 2>/dev/null

# -------------------------- Step 1: Create namespaces --------------------------
echo "Creating network namespaces..."
ip netns add router    # Simulated router
ip netns add client1   # Client 1
ip netns add client2   # Client 2

# -------------------------- Step 2: Create a veth pair --------------------------
echo "Creating veth pairs..."
# Connection between the router and client1
ip link add veth-r1 type veth peer name veth-c1
# Connection between the router and client2
ip link add veth-r2 type veth peer name veth-c2

# -------------------------- Step 3: Assign veth devices --------------------------
echo "Assigning veth devices..."
# client1 connection
ip link set veth-r1 netns router
ip link set veth-c1 netns client1

# client2 connection
ip link set veth-r2 netns router
ip link set veth-c2 netns client2

# -------------------------- Step 4: Configure IP addresses --------------------------
echo "Configuring IP addresses..."
# Router configuration
ip netns exec router ip addr add 10.0.1.1/24 dev veth-r1
ip netns exec router ip addr add 10.0.2.1/24 dev veth-r2
ip netns exec router ip link set veth-r1 up
ip netns exec router ip link set veth-r2 up

# client1 configuration
ip netns exec client1 ip addr add 10.0.1.100/24 dev veth-c1
ip netns exec client1 ip link set veth-c1 up
ip netns exec client1 ip link set lo up
ip netns exec client1 ip route add default via 10.0.1.1

# client2 configuration
ip netns exec client2 ip addr add 10.0.2.100/24 dev veth-c2
ip netns exec client2 ip link set veth-c2 up
ip netns exec client2 ip link set lo up
ip netns exec client2 ip route add default via 10.0.2.1

# -------------------------- Step 5: Enable forwarding on the router --------------------------
echo "Configuring router forwarding..."
ip netns exec router sysctl -w net.ipv4.ip_forward=1

# -------------------------- Step 6: Test the network --------------------------
echo "Testing connectivity from client1 to client2..."
ip netns exec client1 ping -c 3 10.0.2.100

echo "Testing connectivity from client2 to client1..."
ip netns exec client2 ping -c 3 10.0.1.100

# -------------------------- Step 7: Display the network topology --------------------------
echo -e "\\nFinal network topology:"
echo "+
client1 (10.0.1.100) <--[veth]--> router (10.0.1.1)
                           |
client2 (10.0.2.100) <--[veth]--> router (10.0.2.1)
"

echo "Router routing table:"
ip netns exec router ip route show

echo "client1 ARP table:"
ip netns exec client1 ip neigh show

```

# Why Do We Need CNI?

# How Do You Write a CNI Plugin?