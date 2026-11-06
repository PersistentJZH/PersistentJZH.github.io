---
sourceHash: e072bd960709d3971aa231a437d19425f8e77768f8c1ecb0580664a2c7feac8e
title: 🧀 Service Route Advertisement
createTime: 2025/08/18 16:48:36
permalink: /en/notes/kubernetes/yg88mc7r/
---
# Configuring Calico Service Route Advertisement

Calico can advertise Kubernetes Service ClusterIPs and ExternalIPs to external networks through BGP (Border Gateway Protocol). The following steps and examples show how to configure it:

## Basic Steps

### 1. Enable Service Route Advertisement

1. **Modify Calico's BGPConfiguration**:

```bash
kubectl edit bgpconfiguration default
```

Add or modify the following:

```yaml
apiVersion: projectcalico.org/v3
kind: BGPConfiguration
metadata:
  name: default
spec:
  logSeverityScreen: Info
  nodeToNodeMeshEnabled: true
  serviceClusterIPs:
  - cidr: 10.96.0.0/12  # Replace with your ClusterIP CIDR
  serviceExternalIPs:
  - cidr: 192.168.1.0/24  # Replace with your ExternalIP range
  asNumber: 64512  # Your AS number
```

### 2. Configure a BGP Peer If External Router Communication Is Needed

```bash
kubectl apply -f - <<EOF
apiVersion: projectcalico.org/v3
kind: BGPPeer
metadata:
  name: my-external-router
spec:
  peerIP: 192.168.1.1  # External router IP
  asNumber: 64513  # External router AS number
EOF
```

### 3. Verify the Configuration

```bash
# Check BGP peer status
calicoctl get bgppeer

# Check node BGP status
calicoctl node status
```

## Complete Example

### Scenario: Advertise a Particular Service's ExternalIP to an External Network

1. **Create a test Service**:

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

2. **Configure Calico to advertise the ExternalIP**:

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

3. **Verify on the external router**:

```
show ip route 192.168.1.100
```

You should see BGP routes from the Calico nodes.

## Advanced Configuration

### Fine-Grained Control Through Annotations

Add annotations to particular Services to control route advertisement:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
  annotations:
    projectcalico.org/exportBgpServiceRoutes: "true"  # Explicitly enable
    # projectcalico.org/exportBgpServiceRoutes: "false"  # Explicitly disable
spec:
  # ...
```

### Using Calico's ServiceAdvertisement Resource (Calico v3.22+)

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

## Things to Keep in Mind

1. Ensure your network devices have the correct BGP peers configured
2. Advertising many Services in a large cluster may affect network performance
3. Use route aggregation in production to reduce routing-table size
4. For LoadBalancer Services, Calico can also integrate with MetalLB

## Troubleshooting

1. **Check BGP session status**:
   ```bash
   calicoctl node status
   ```

2. **Inspect advertised routes**:
   ```bash
   calicoctl get serviceadvertisement
   ```

3. **Inspect BIRD configuration on the Calico node**:
   ```bash
   birdc show protocols
   birdc show route
   ```

This configuration advertises Kubernetes Service IP addresses to external networks over BGP for more flexible network integration.