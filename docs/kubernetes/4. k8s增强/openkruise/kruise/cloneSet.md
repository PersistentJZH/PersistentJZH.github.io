---
title: cloneSet
createTime: 2025/07/19 00:30:29
permalink: /k8s/7gptvl9g/
---
好的，这里举一个非常实用且典型的 CloneSet 使用例子：**一个需要独立工作空间和原地升级的视频转码服务**。

### 场景描述

假设我们有一个视频转码服务，它具有以下特点：
- 每个转码任务在一个独立的 Pod 中运行
- 每个 Pod 需要 50GB 的独立工作空间来存储临时转码文件
- 转码过程中如果 Pod 重启，可以接受任务失败，但希望快速恢复
- 需要频繁更新转码器版本，希望升级时不影响正在运行的任务
- 客户端通过 Service 负载均衡访问，不关心具体是哪个 Pod 处理请求

---

### 完整的 CloneSet 部署示例

#### 1. 创建 StorageClass（如果不存在）

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: kubernetes.io/aws-ebs  # 或其他存储驱动
parameters:
  type: gp3
  fsType: ext4
  iops: "3000"
allowVolumeExpansion: true
```

#### 2. 创建视频转码服务的 CloneSet

```yaml
apiVersion: apps.kruise.io/v1alpha1
kind: CloneSet
metadata:
  name: video-transcoder
  labels:
    app: video-transcoder
spec:
  replicas: 3
  # 关键的更新策略：支持原地升级
  updateStrategy:
    type: InPlaceIfPossible
    maxUnavailable: 1
    partition: 0  # 可以用于金丝雀发布
  # 扩缩容策略
  scaleStrategy:
    pvcRetentionPolicy: Retain  # 缩容时保留PVC，便于调试
  # Pod 模板
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
        # 资源请求
        resources:
          requests:
            cpu: 1000m
            memory: 2Gi
          limits:
            cpu: 2000m
            memory: 4Gi
        # 健康检查
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
        # 挂载工作空间
        volumeMounts:
        - name: workspace
          mountPath: /workspace
        - name: config
          mountPath: /etc/transcoder
      # 初始化容器：准备workspace
      initContainers:
      - name: init-workspace
        image: busybox:latest
        command: ['sh', '-c']
        args:
          - |
            echo "初始化转码工作空间..."
            mkdir -p /workspace/input
            mkdir -p /workspace/output
            mkdir -p /workspace/temp
            chmod -R 755 /workspace
            echo "工作空间准备完成"
        volumeMounts:
        - name: workspace
          mountPath: /workspace
      # 配置卷
      volumes:
      - name: config
        configMap:
          name: transcoder-config
  # 【核心】PVC模板：为每个Pod自动创建独立存储
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

#### 3. 创建 ConfigMap（配置文件）

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

#### 4. 创建 Service（负载均衡）

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
  # 或者使用 LoadBalancer 对外暴露
  # type: LoadBalancer
```

---

### 部署和验证

#### 1. 应用配置
```bash
kubectl apply -f storageclass.yaml
kubectl apply -f configmap.yaml
kubectl apply -f service.yaml
kubectl apply -f cloneset.yaml
```

#### 2. 查看部署状态
```bash
# 查看 CloneSet 状态
kubectl get cloneset video-transcoder

# 查看 Pods（注意名称是随机的）
kubectl get pods -l app=video-transcoder

# 查看自动创建的 PVCs
kubectl get pvc -l app.kruise.io/instance=video-transcoder
```

**输出示例：**
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

### CloneSet 优势在这个例子中的体现

#### 1. **原地升级（核心优势）**
当需要更新转码器版本时：

```bash
# 更新镜像版本 - 触发原地升级
kubectl patch cloneset video-transcoder --type='merge' -p='{"spec":{"template":{"spec":{"containers":[{"name":"transcoder","image":"my-registry/video-transcoder:v1.2.1"}]}}}}'
```

**原地升级的效果：**
- ✅ Pod 名称不变（仍然是 `video-transcoder-7x8k9` 等）
- ✅ PVC 保持挂载，工作空间数据不丢失
- ✅ Pod IP 不变，正在进行的转码任务网络连接不中断
- ✅ 只重启容器，不重建整个 Pod，升级速度极快

#### 2. **灵活的扩缩容**
```bash
# 扩容到 5 个实例
kubectl patch cloneset video-transcoder --type='merge' -p='{"spec":{"replicas":5}}'

# 缩容到 2 个实例（保留PVC便于调试）
kubectl patch cloneset video-transcoder --type='merge' -p='{"spec":{"replicas":2}}'
```

#### 3. **每个 Pod 的独立工作空间**
- 每个转码任务在独立的空间中运行，不会相互干扰
- 临时文件、中间结果不会冲突
- 可以基于 Pod 名称在工作空间中创建子目录：
  ```bash
  # 在 Pod 内，可以这样组织工作空间
  /workspace/input/${POD_NAME}/
  /workspace/output/${POD_NAME}/
  /workspace/temp/${POD_NAME}/
  ```

#### 4. **高级发布策略**
```yaml
# 可以配置金丝雀发布
updateStrategy:
  type: InPlaceIfPossible
  maxUnavailable: 1
  partition: 2  # 只更新 1 个 Pod（3-2=1），另外 2 个保持旧版本
```

---

### 实际运维操作示例

#### 查看转码任务状态
```bash
# 进入某个 Pod 查看工作空间
kubectl exec -it video-transcoder-7x8k9 -- ls -la /workspace

# 查看转码日志
kubectl logs video-transcoder-7x8k1 -f
```

#### 处理故障 Pod
```bash
# 如果某个 Pod 故障，删除它（会自动重建）
kubectl delete pod video-transcoder-7x8k9

# 查看新 Pod 和 PVC 的创建
kubectl get pods -l app=video-transcoder -w
kubectl get pvc -l app.kruise.io/instance=video-transcoder
```

#### 监控资源使用
```bash
# 查看各 Pod 的资源使用
kubectl top pods -l app=video-transcoder

# 查看 PVC 使用情况
kubectl exec -it video-transcoder-7x8k9 -- df -h /workspace
```

---

### 总结

这个视频转码服务的例子完美展示了 CloneSet + PVC 模板的适用场景：

**为什么不用 Deployment？**
- Deployment 无法为每个 Pod 自动创建独立存储
- 所有 Pod 会共享存储，导致转码文件冲突

**为什么不用 StatefulSet？**
- 不需要稳定的网络身份（客户端通过 Service 随机访问）
- 需要原地升级的灵活性（不中断正在进行的转码任务）
- 需要更灵活的扩缩容策略

**CloneSet 的优势体现：**
- ✅ **独立存储**：每个 Pod 有 50GB 专属工作空间
- ✅ **原地升级**：更新转码器版本不中断任务
- ✅ **灵活伸缩**：快速响应任务队列变化
- ✅ **运维友好**：PVC 保留策略便于调试
- ✅ **资源高效**：精确控制资源分配

这种模式同样适用于：日志收集器、AI 模型推理服务、数据处理任务、缓存服务等需要"实例级别隔离"但不需要"稳定网络身份"的场景。