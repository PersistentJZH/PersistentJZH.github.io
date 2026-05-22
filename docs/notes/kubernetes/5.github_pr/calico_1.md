---
title: calico_1
createTime: 2025/08/22 16:06:25
permalink: /k8s/kz69s4r4/
---

# Calico IP Pool NodeSelector 与 Namespace Annotation 冲突问题复现

## 问题描述

当使用namespace annotation指定IP pools时，Calico会忽略IP pool的nodeSelector设置，导致在错误的区域分配IP地址。

## 复现环境准备

### 1. 创建测试集群

```bash
# 使用kind创建多节点集群
cat <<EOF | kind create cluster --name calico-test --config -
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  labels:
    region: amer-east
    zone: east-1
- role: worker
  labels:
    region: amer-west
    zone: west-1
- role: worker
  labels:
    region: amer-east
    zone: east-2
- role: worker
  labels:
    region: amer-west
    zone: west-2
networking:
  disableDefaultCNI: true
  podSubnet: 192.168.0.0/16
EOF
```

### 2. 安装Calico

```bash
# 安装Calico
kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.30.3/manifests/tigera-operator.yaml

kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.30.3/manifests/custom-resources.yaml

# 等待Calico启动完成
kubectl get tigerastatus
```

## 复现步骤

### 步骤1: 创建带有nodeSelector的IP Pools

```yaml
# ippools.yaml
apiVersion: projectcalico.org/v3
kind: IPPool
metadata:
  name: pool-amer-east
spec:
  cidr: 10.10.0.0/24
  nodeSelector: region == "amer-east"
  natOutgoing: true
  ipipMode: Never
---
apiVersion: projectcalico.org/v3
kind: IPPool
metadata:
  name: pool-amer-west
spec:
  cidr: 10.20.0.0/24
  nodeSelector: region == "amer-west"
  natOutgoing: true
  ipipMode: Never
```

```bash
kubectl apply -f ippools.yaml
```

### 步骤2: 创建带有IP Pool注解的Namespace

```yaml
# namespace-with-pools.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: test-namespace
  annotations:
    cni.projectcalico.org/ipv4pools: '["pool-amer-east", "pool-amer-west"]'
```

```bash
kubectl apply -f namespace-with-pools.yaml
```

### 步骤3: 在AMER-EAST节点上部署Pod

```yaml
# pod-east.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: test-pod-east-deployment
  namespace: test-namespace
spec:
  replicas: 10  # 指定实例数量
  selector:
    matchLabels:
      app: nginx-east
  template:
    metadata:
      labels:
        app: nginx-east
    spec:
      nodeSelector:
        region: amer-east
      containers:
      - name: nginx
        image: nginx:alpine
        ports:
        - containerPort: 80
```

```bash
kubectl apply -f pod-east.yaml
```

### 步骤4: 在AMER-WEST节点上部署Pod

```yaml
# pod-west.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: test-pod-west-deployment
  namespace: test-namespace
spec:
  replicas: 10  # 指定实例数量
  selector:
    matchLabels:
      app: nginx-west
  template:
    metadata:
      labels:
        app: nginx-west
    spec:
      nodeSelector:
        region: amer-west
      containers:
      - name: nginx
        image: nginx:alpine
        ports:
        - containerPort: 80
```

```bash
kubectl apply -f pod-west.yaml
```

### 步骤5: 验证问题

```bash
# 检查Pod的IP分配
kubectl get pods -n test-namespace -o wide

# 检查Pod的IP地址
kubectl get pods test-pod-east -n test-namespace -o jsonpath='{.status.podIP}'
kubectl get pods test-pod-west -n test-namespace -o jsonpath='{.status.podIP}'

# 检查IP分配详情
kubectl describe pod test-pod-east -n test-namespace
kubectl describe pod test-pod-west -n test-namespace
```

## 预期结果 vs 实际结果

### 预期行为
- `test-pod-east` 应该获得 `10.10.0.0/24` 网段的IP
- `test-pod-west` 应该获得 `10.20.0.0/24` 网段的IP

### 实际行为（问题）
- 两个Pod都可能获得 `10.10.0.0/24` 网段的IP（第一个在namespace annotation中列出的pool）
- 或者两个Pod都可能获得 `10.20.0.0/24` 网段的IP

## 调试命令

### 检查IP Pool状态
```bash
# 查看IP Pools
kubectl get ippools -o yaml

# 查看节点标签
kubectl get nodes --show-labels

# 查看Calico节点状态
kubectl get pods -n kube-system -l k8s-app=calico-node
```

### 检查Calico日志
```bash
# 查看Calico节点日志
kubectl logs -n kube-system -l k8s-app=calico-node --tail=100

# 查看CNI插件日志
kubectl logs -n kube-system -l k8s-app=calico-node -c calico-node --tail=100
```

### 检查IP分配详情
```bash
# 使用calicoctl查看IP分配
calicoctl ipam show --ip=10.10.0.0/24
calicoctl ipam show --ip=10.20.0.0/24

# 查看所有IP分配
calicoctl ipam show
```

## 验证脚本

创建一个验证脚本来自动化测试：

```bash
#!/bin/bash
# verify-ippool-issue.sh

echo "=== 验证Calico IP Pool NodeSelector问题 ==="

# 获取Pod IP
POD_EAST_IP=$(kubectl get pod test-pod-east -n test-namespace -o jsonpath='{.status.podIP}')
POD_WEST_IP=$(kubectl get pod test-pod-west -n test-namespace -o jsonpath='{.status.podIP}')

echo "AMER-EAST Pod IP: $POD_EAST_IP"
echo "AMER-WEST Pod IP: $POD_WEST_IP"

# 检查IP是否在正确的网段
if [[ $POD_EAST_IP == 10.10.* ]]; then
    echo "✓ AMER-EAST Pod 获得了正确的IP段 (10.10.x.x)"
else
    echo "✗ AMER-EAST Pod 获得了错误的IP段: $POD_EAST_IP"
fi

if [[ $POD_WEST_IP == 10.20.* ]]; then
    echo "✓ AMER-WEST Pod 获得了正确的IP段 (10.20.x.x)"
else
    echo "✗ AMER-WEST Pod 获得了错误的IP段: $POD_WEST_IP"
fi

# 检查是否两个Pod都获得了相同网段的IP
if [[ $POD_EAST_IP == 10.10.* && $POD_WEST_IP == 10.10.* ]]; then
    echo "✗ 问题复现成功：两个Pod都获得了AMER-EAST网段的IP"
elif [[ $POD_EAST_IP == 10.20.* && $POD_WEST_IP == 10.20.* ]]; then
    echo "✗ 问题复现成功：两个Pod都获得了AMER-WEST网段的IP"
else
    echo "✓ IP分配正常：不同区域的Pod获得了不同网段的IP"
fi
```

## 清理资源

```bash
# 删除测试资源
kubectl delete namespace test-namespace
kubectl delete ippool pool-amer-east pool-amer-west

# 删除测试集群
kind delete cluster --name calico-test
```

## 问题确认

如果复现成功，您应该看到：
1. 两个不同区域的Pod都获得了相同网段的IP地址
2. 这违反了IP Pool nodeSelector的设计意图
3. 证明了namespace annotation会绕过nodeSelector检查
4. 有多个pool时，按在namespace声明的顺序选择pool

这个复现示例清楚地展示了Calico IPAM系统中namespace annotation和nodeSelector之间的冲突问题。
