---
sourceHash: fa3c6c75e4a439bb959ceb690177266a178c47cec8aa00e7dcd94e76f8f6e551
title: cloneSet
createTime: 2025/07/19 00:30:29
permalink: /en/notes/kubernetes/7gptvl9g/
---
Here is a practical, representative CloneSet example: **a video transcoding service needing independent workspaces and in-place upgrades**.

### Scenario

Suppose the video transcoding service has these characteristics:
- Each transcoding task runs in an independent Pod.
- Every Pod needs a separate 50GB workspace for temporary transcoding files.
- Task failure after a Pod restart is acceptable, but recovery should be fast.
- Frequent transcoder version updates should avoid affecting active tasks.
- Clients access the service through Service load balancing and do not care which Pod handles a request.

---

### Complete CloneSet Deployment Example

#### 1. Create a StorageClass if Needed

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: kubernetes.io/aws-ebs  # Or another storage driver
parameters:
  type: gp3
  fsType: ext4
  iops: "3000"
allowVolumeExpansion: true
```

#### 2. Create the Transcoding CloneSet

```yaml
apiVersion: apps.kruise.io/v1alpha1
kind: CloneSet
metadata:
  name: video-transcoder
  labels:
    app: video-transcoder
spec:
  replicas: 3
  # Key update strategy: support in-place upgrades
  updateStrategy:
    type: InPlaceIfPossible
    maxUnavailable: 1
    partition: 0  # Can support canary releases
  # Scaling strategy
  scaleStrategy:
    pvcRetentionPolicy: Retain  # Keep PVCs after scale-in for debugging
  # Pod template
  template:
    metadata:
      labels:
        app: video-transcoder
        version: v1.2.0
    spec:
      containers:
      - name: transcoder
        image: my-registry/video-transcoder:v1.2.0
        env:
        - name: POD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: WORKSPACE_PATH
          value: /workspace
        # Resource requests
        resources:
          requests:
            cpu: 1000m
            memory: 2Gi
          limits:
            cpu: 2000m
            memory: 4Gi
        # Health checks
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
        # Mount the workspace
        volumeMounts:
        - name: workspace
          mountPath: /workspace
        - name: config
          mountPath: /etc/transcoder
      # Init container: prepare the workspace
      initContainers:
      - name: init-workspace
        image: busybox:latest
        command: ['sh', '-c']
        args:
          - |
            echo "Initializing transcoding workspace..."
            mkdir -p /workspace/input
            mkdir -p /workspace/output
            mkdir -p /workspace/temp
            chmod -R 755 /workspace
            echo "Workspace ready"
        volumeMounts:
        - name: workspace
          mountPath: /workspace
      # Configuration volume
      volumes:
      - name: config
        configMap:
          name: transcoder-config
  # Core feature: automatically create separate storage for every Pod
  volumeClaimTemplates:
  - metadata:
      name: workspace
    spec:
      accessModes: [ "ReadWriteOnce" ]
      storageClassName: "fast-ssd"
      resources:
        requests:
          storage: 50Gi
```

#### 3. Create the ConfigMap

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: transcoder-config
data:
  config.yaml: |
    log_level: info
    max_concurrent_jobs: 2
    output_formats:
      - mp4
      - webm
      - hls
    quality_presets:
      low: "480p"
      medium: "720p"
      high: "1080p"
  nginx.conf: |
    server {
        listen 8080;
        location /health {
            return 200 'healthy';
        }
        location /ready {
            return 200 'ready';
        }
    }
```

#### 4. Create the Load-Balancing Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: video-transcoder-service
spec:
  selector:
    app: video-transcoder
  ports:
  - name: http
    port: 80
    targetPort: 8080
  type: ClusterIP
  # Alternatively, expose externally with LoadBalancer
  # type: LoadBalancer
```

---

### Deployment and Verification

#### 1. Apply the Configuration
```bash
kubectl apply -f storageclass.yaml
kubectl apply -f configmap.yaml
kubectl apply -f service.yaml
kubectl apply -f cloneset.yaml
```

#### 2. Inspect Deployment Status
```bash
# Inspect CloneSet status
kubectl get cloneset video-transcoder

# Inspect Pods; note their random names
kubectl get pods -l app=video-transcoder

# Inspect automatically created PVCs
kubectl get pvc -l app.kruise.io/instance=video-transcoder
```

**Example output:**
```
NAME                          READY   STATUS    RESTARTS   AGE
video-transcoder-7x8k9        1/1     Running   0          2m
video-transcoder-2p5q1        1/1     Running   0          1m
video-transcoder-9m3n4        1/1     Running   0          30s

NAME                                  STATUS   VOLUME                                     CAPACITY   AGE
workspace-video-transcoder-7x8k9     Bound    pvc-aaaa-bbbb-cccc                         50Gi       2m
workspace-video-transcoder-2p5q1     Bound    pvc-dddd-eeee-ffff                         50Gi       1m
workspace-video-transcoder-9m3n4     Bound    pvc-gggg-hhhh-iiii                         50Gi       30s
```

---

### CloneSet Benefits Demonstrated

#### 1. **In-Place Upgrades: The Main Advantage**
When updating the transcoder version:

```bash
# Updating the image triggers an in-place upgrade
kubectl patch cloneset video-transcoder --type='merge' -p='{"spec":{"template":{"spec":{"containers":[{"name":"transcoder","image":"my-registry/video-transcoder:v1.2.1"}]}}}}'
```

**Effects of an in-place upgrade:**
- ✅ Pod names stay unchanged, such as `video-transcoder-7x8k9`.
- ✅ PVCs remain mounted and workspace data is preserved.
- ✅ Pod IPs remain unchanged, so network connections for ongoing tasks are uninterrupted.
- ✅ Only the container restarts; the Pod is not recreated, making upgrades very fast.

#### 2. **Flexible Scaling**
```bash
# Scale out to 5 instances
kubectl patch cloneset video-transcoder --type='merge' -p='{"spec":{"replicas":5}}'

# Scale in to 2 instances, retaining PVCs for debugging
kubectl patch cloneset video-transcoder --type='merge' -p='{"spec":{"replicas":2}}'
```

#### 3. **Independent Workspace for Each Pod**
- Each transcoding task runs in a separate workspace without interference.
- Temporary files and intermediate results do not collide.
- Pod names can identify workspace subdirectories:
  ```bash
  # Organize the workspace inside the Pod as follows
  /workspace/input/${POD_NAME}/
  /workspace/output/${POD_NAME}/
  /workspace/temp/${POD_NAME}/
  ```

#### 4. **Advanced Rollout Strategies**
```yaml
# Configure a canary release
updateStrategy:
  type: InPlaceIfPossible
  maxUnavailable: 1
  partition: 2  # Update only 1 Pod (3-2=1); keep 2 on the old version
```

---

### Operational Examples

#### Inspect Transcoding Tasks
```bash
# Inspect the workspace in a Pod
kubectl exec -it video-transcoder-7x8k9 -- ls -la /workspace

# View transcoding logs
kubectl logs video-transcoder-7x8k1 -f
```

#### Handle a Failed Pod
```bash
# Delete a failed Pod; it will be recreated automatically
kubectl delete pod video-transcoder-7x8k9

# Observe new Pod and PVC creation
kubectl get pods -l app=video-transcoder -w
kubectl get pvc -l app.kruise.io/instance=video-transcoder
```

#### Monitor Resource Usage
```bash
# Inspect resource usage by Pod
kubectl top pods -l app=video-transcoder

# Inspect PVC usage
kubectl exec -it video-transcoder-7x8k9 -- df -h /workspace
```

---

### Summary

This transcoding example illustrates the use case for CloneSet with PVC templates:

**Why not Deployment?**
- Deployments cannot automatically create independent storage for every Pod.
- All Pods would share storage, causing transcoding file conflicts.

**Why not StatefulSet?**
- Stable network identity is unnecessary because clients access arbitrary Pods through a Service.
- In-place upgrade flexibility is needed to avoid interrupting active transcoding tasks.
- More flexible scaling strategies are needed.

**CloneSet advantages:**
- ✅ **Independent storage**: A dedicated 50GB workspace per Pod.
- ✅ **In-place upgrades**: Update the transcoder without interrupting tasks.
- ✅ **Flexible scaling**: Respond quickly to changes in the task queue.
- ✅ **Operational convenience**: PVC retention aids debugging.
- ✅ **Resource efficiency**: Precise control of allocations.

The same pattern suits log collectors, AI inference services, data-processing tasks, caches, and other workloads needing "instance-level isolation" without a "stable network identity".
