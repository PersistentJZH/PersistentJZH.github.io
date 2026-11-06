---
title: 🧀Service路由宣告
createTime: 2025/08/18 16:48:36
permalink: /notes/kubernetes/yg88mc7r/
---
# Calico 的 Service 路由宣告配置指南

Calico 可以通过 BGP (Border Gateway Protocol) 宣告 Kubernetes Service 的 ClusterIP 和 ExternalIP 到外部网络。以下是配置步骤和示例：

## 基本操作步骤

### 1. 启用 Service 路由宣告

1. **修改 Calico 的 BGPConfiguration**：

```bash
kubectl edit bgpconfiguration default
```

添加或修改以下内容：

```yaml
apiVersion: projectcalico.org/v3
kind: BGPConfiguration
metadata:
  name: default
spec:
  logSeverityScreen: Info
  nodeToNodeMeshEnabled: true
  serviceClusterIPs:
  - cidr: 10.96.0.0/12  # 替换为你的 ClusterIP CIDR
  serviceExternalIPs:
  - cidr: 192.168.1.0/24  # 替换为你的 ExternalIP 范围
  asNumber: 64512  # 你的 AS 号
```

### 2. 配置 BGP 对等体（如果需要与外部路由器通信）

```bash
kubectl apply -f - <<EOF
apiVersion: projectcalico.org/v3
kind: BGPPeer
metadata:
  name: my-external-router
spec:
  peerIP: 192.168.1.1  # 外部路由器 IP
  asNumber: 64513  # 外部路由器的 AS 号
EOF
```

### 3. 验证配置

```bash
# 检查 BGP 对等体状态
calicoctl get bgppeer

# 检查节点 BGP 状态
calicoctl node status
```

## 完整示例

### 场景：将特定 Service 的 ExternalIP 宣告到外部网络

1. **创建测试 Service**：

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: my-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
  externalIPs:
    - 192.168.1.100
```

2. **配置 Calico 宣告 ExternalIP**：

```bash
kubectl apply -f - <<EOF
apiVersion: projectcalico.org/v3
kind: BGPConfiguration
metadata:
  name: default
spec:
  serviceExternalIPs:
  - cidr: 192.168.1.0/24
EOF
```

3. **在外部路由器上验证**：

```
show ip route 192.168.1.100
```

应该能看到来自 Calico 节点的 BGP 路由。

## 高级配置

### 基于注解的精细控制

可以为特定 Service 添加注解来控制路由宣告：

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
  annotations:
    projectcalico.org/exportBgpServiceRoutes: "true"  # 显式启用
    # projectcalico.org/exportBgpServiceRoutes: "false"  # 显式禁用
spec:
  # ...
```

### 使用 Calico 的 ServiceAdvertisement 资源（Calico v3.22+）

```yaml
apiVersion: projectcalico.org/v3
kind: ServiceAdvertisement
metadata:
  name: advertise-my-service
spec:
  services: ["my-service"]
  aggregation: /32
  communities: ["64512:100"]
```

## 注意事项

1. 确保你的网络设备配置了正确的 BGP 对等体
2. 大型集群中宣告大量 Service 可能会影响网络性能
3. 在生产环境中建议使用路由聚合减少路由表大小
4. 对于 LoadBalancer 类型的 Service，Calico 也可以与 MetalLB 集成

## 故障排查

1. **检查 BGP 会话状态**：
   ```bash
   calicoctl node status
   ```

2. **检查宣告的路由**：
   ```bash
   calicoctl get serviceadvertisement
   ```

3. **查看 BIRD 配置**（在 Calico 节点上）：
   ```bash
   birdc show protocols
   birdc show route
   ```

以上配置可以帮助你将 Kubernetes Service 的 IP 地址通过 BGP 宣告到外部网络，实现更灵活的网络集成。