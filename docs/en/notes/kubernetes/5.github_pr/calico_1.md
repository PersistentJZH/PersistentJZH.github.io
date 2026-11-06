---
sourceHash: ac7125c5258aa371f8da875ebc5730128b5785f9eb5222f154bf201a0c1756f5
title: calico_1
createTime: 2025/08/22 16:06:25
permalink: /en/notes/kubernetes/kz69s4r4/
---

# Reproducing the Conflict Between Calico IP Pool NodeSelector and Namespace Annotations

## Problem

When namespace annotations specify IP pools, Calico ignores the pools' nodeSelector settings, causing IP addresses to be allocated in the wrong region.

## Prepare the Reproduction Environment

### 1. Create a Test Cluster

```bash
# Create a multi-node cluster with kind
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

### 2. Install Calico

```bash
# Install Calico
kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.30.3/manifests/tigera-operator.yaml

kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.30.3/manifests/custom-resources.yaml

# Wait for Calico to start
kubectl get tigerastatus
```

## Reproduction Steps

### Step 1: Create IP Pools with nodeSelector

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

### Step 2: Create a Namespace with IP Pool Annotations

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

### Step 3: Deploy Pods on AMER-EAST Nodes

```yaml
# pod-east.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: test-pod-east-deployment
  namespace: test-namespace
spec:
  replicas: 10  # Set the instance count
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

### Step 4: Deploy Pods on AMER-WEST Nodes

```yaml
# pod-west.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: test-pod-west-deployment
  namespace: test-namespace
spec:
  replicas: 10  # Set the instance count
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

### Step 5: Verify the Problem

```bash
# Check Pod IP allocation
kubectl get pods -n test-namespace -o wide

# Inspect Pod IP addresses
kubectl get pods test-pod-east -n test-namespace -o jsonpath='{.status.podIP}'
kubectl get pods test-pod-west -n test-namespace -o jsonpath='{.status.podIP}'

# Inspect allocation details
kubectl describe pod test-pod-east -n test-namespace
kubectl describe pod test-pod-west -n test-namespace
```

## Expected and Actual Results

### Expected Behavior
- `test-pod-east` should receive an IP in `10.10.0.0/24`
- `test-pod-west` should receive an IP in `10.20.0.0/24`

### Actual Behavior (the Problem)
- Both Pods may receive IPs in `10.10.0.0/24`, the first pool listed in the namespace annotation
- Alternatively, both Pods may receive IPs in `10.20.0.0/24`

## Debugging Commands

### Inspect IP Pool Status
```bash
# List IP pools
kubectl get ippools -o yaml

# Inspect node labels
kubectl get nodes --show-labels

# Inspect Calico node status
kubectl get pods -n kube-system -l k8s-app=calico-node
```

### Inspect Calico Logs
```bash
# View Calico node logs
kubectl logs -n kube-system -l k8s-app=calico-node --tail=100

# View CNI plugin logs
kubectl logs -n kube-system -l k8s-app=calico-node -c calico-node --tail=100
```

### Inspect IP Allocation Details
```bash
# Inspect IP allocation with calicoctl
calicoctl ipam show --ip=10.10.0.0/24
calicoctl ipam show --ip=10.20.0.0/24

# View all IP allocations
calicoctl ipam show
```

## Verification Script

Create a script to automate verification:

```bash
#!/bin/bash
# verify-ippool-issue.sh

echo "=== Verify the Calico IP Pool NodeSelector Issue ==="

# Retrieve Pod IPs
POD_EAST_IP=$(kubectl get pod test-pod-east -n test-namespace -o jsonpath='{.status.podIP}')
POD_WEST_IP=$(kubectl get pod test-pod-west -n test-namespace -o jsonpath='{.status.podIP}')

echo "AMER-EAST Pod IP: $POD_EAST_IP"
echo "AMER-WEST Pod IP: $POD_WEST_IP"

# Check whether IPs belong to the correct ranges
if [[ $POD_EAST_IP == 10.10.* ]]; then
    echo "✓ AMER-EAST Pod received an IP in the correct range (10.10.x.x)"
else
    echo "✗ AMER-EAST Pod received an IP in the wrong range: $POD_EAST_IP"
fi

if [[ $POD_WEST_IP == 10.20.* ]]; then
    echo "✓ AMER-WEST Pod received an IP in the correct range (10.20.x.x)"
else
    echo "✗ AMER-WEST Pod received an IP in the wrong range: $POD_WEST_IP"
fi

# Check whether both Pods received IPs in the same range
if [[ $POD_EAST_IP == 10.10.* && $POD_WEST_IP == 10.10.* ]]; then
    echo "✗ Issue reproduced: both Pods received IPs in the AMER-EAST range"
elif [[ $POD_EAST_IP == 10.20.* && $POD_WEST_IP == 10.20.* ]]; then
    echo "✗ Issue reproduced: both Pods received IPs in the AMER-WEST range"
else
    echo "✓ Correct allocation: Pods in different regions received IPs in different ranges"
fi
```

## Clean Up Resources

```bash
# Delete test resources
kubectl delete namespace test-namespace
kubectl delete ippool pool-amer-east pool-amer-west

# Delete the test cluster
kind delete cluster --name calico-test
```

## Confirming the Issue

If reproduction succeeds, you should observe:
1. Pods from two different regions receive IP addresses in the same range
2. This violates the intended behavior of the IP pool nodeSelector
3. It demonstrates that namespace annotations bypass nodeSelector checks
4. With multiple pools, selection follows their order in the namespace declaration

This example clearly demonstrates the conflict between namespace annotations and nodeSelector in Calico IPAM.
