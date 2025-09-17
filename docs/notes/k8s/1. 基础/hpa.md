---
title: 🏄‍♂️ HPA
createTime: 2025/09/17 20:26:55
permalink: /k8s/1ygxqk6d/
---

### 前提条件

在运行任何 HPA 例子前，请确保你的 Kubernetes 集群已经安装了 **Metrics Server**，它用于提供核心的资源指标（CPU/内存）。

```bash
# 如果你使用 minikube，可以这样启用
minikube addons enable metrics-server

# 对于其他集群，通常可以用以下方式安装
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# 验证安装是否成功，等待一两分钟后运行：
kubectl top nodes
# 如果能看到节点的 CPU 和内存使用情况，说明 Metrics Server 正在工作。
```

---

### 示例 1：基于 CPU 使用率的自动扩缩（最经典）

这是最常见和简单的 HPA 使用场景。

1.  **部署一个测试应用**
    我们部署一个简单的 Nginx Deployment 和一个 Service。为了更容易地产生 CPU 负载，我们使用一个专门的压力测试镜像。

    ```yaml
    # nginx-deployment.yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: nginx-for-hpa
    spec:
      replicas: 1
      selector:
        matchLabels:
          app: nginx
      template:
        metadata:
          labels:
            app: nginx
        spec:
          containers:
          - name: nginx
            image: nginx:alpine
            resources:
              requests: # HPA 需要根据 requests 值计算使用率，必须设置！
                cpu: "100m"  # 0.1 个 CPU 核心
                memory: "64Mi"
            ports:
            - containerPort: 80
    ---
    apiVersion: v1
    kind: Service
    metadata:
      name: nginx-service
    spec:
      selector:
        app: nginx
      ports:
        - protocol: TCP
          port: 80
          targetPort: 80
    ```
    应用它：`kubectl apply -f nginx-deployment.yaml`

2.  **创建 HPA**
    创建一个 HPA，目标是保持 CPU 平均使用率为 **50%**。副本数介于 1 到 5 之间。

    ```bash
    kubectl autoscale deployment nginx-for-hpa --cpu-percent=50 --min=1 --max=5
    ```
    或者使用 YAML 文件 (`hpa-cpu.yaml`)：
    ```yaml
    apiVersion: autoscaling/v2
    kind: HorizontalPodAutoscaler
    metadata:
      name: nginx-cpu-hpa
    spec:
      scaleTargetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: nginx-for-hpa
      minReplicas: 1
      maxReplicas: 5
      metrics:
      - type: Resource
        resource:
          name: cpu
          target:
            type: Utilization
            averageUtilization: 50
    ```
    应用它：`kubectl apply -f hpa-cpu.yaml`

3.  **查看 HPA 状态**
    ```bash
    kubectl get hpa nginx-cpu-hpa
    ```
    初始输出，因为暂无流量，CPU 使用率很低：
    ```
    NAME            REFERENCE                  TARGETS   MINPODS   MAXPODS   REPLICAS   AGE
    nginx-cpu-hpa   Deployment/nginx-for-hpa   0%/50%    1         5         1          2m
    ```

4.  **产生负载来触发扩缩容**
    我们启动一个临时的 Pod 来向 Nginx 服务发送大量请求，模拟流量高峰。

    ```bash
    kubectl run -it --rm load-generator --image=busybox -- /bin/sh
    # 进入容器后，运行一个循环命令不断访问服务
    while true; do wget -q -O- http://nginx-service > /dev/null; done
    ```

5.  **观察 HPA 变化**
    保持上面的负载运行，在另一个终端窗口再次查看 HPA：

    ```bash
    kubectl get hpa nginx-cpu-hpa -w
    ```
    你会看到 `TARGETS` 列的 CPU 使用率飙升，很快 `REPLICAS` 列的数字就会从 1 开始增加，可能到 2、3，甚至达到最大值 5。
    ```
    NAME            REFERENCE                  TARGETS    MINPODS   MAXPODS   REPLICAS   AGE
    nginx-cpu-hpa   Deployment/nginx-for-hpa   187%/50%   1         5         1          10m
    nginx-cpu-hpa   Deployment/nginx-for-hpa   187%/50%   1         5         4          10m
    nginx-cpu-hpa   Deployment/nginx-for-hpa   75%/50%    1         5         4          11m
    ```

6.  **停止负载**
    在 `load-generator` 容器中按下 `Ctrl+C` 停止循环。等待几分钟后再次查看 HPA，你会发现 CPU 使用率下降，并且 HPA 会自动将副本数减少到 1。

---

### 示例 2：基于内存使用率的自动扩缩

除了 CPU，HPA 也可以基于内存。配置方式非常相似。

```yaml
# hpa-memory.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: nginx-memory-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx-for-hpa # 可以指向同一个或不同的 Deployment
  minReplicas: 1
  maxReplicas: 5
  metrics:
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 60 # 目标内存使用率为 60%
```
**注意**：基于内存的扩缩要谨慎使用，因为与应用特性强相关。一个 Pod 的内存使用可能不会像 CPU 那样随着请求增加而立即下降，扩容后新 Pod 启动也需要时间加载数据到内存。

---

### 示例 3：基于自定义指标（Prometheus + QPS）

这是一个更高级的例子，需要安装 **Prometheus** 和 **Prometheus Adapter**。它根据应用的**每秒请求数（QPS）** 来扩缩，这比 CPU 更能直接反映 web 应用的负载。

假设你已经部署了 Prometheus 栈和适配器。

1.  **HPA 配置示例**：

    ```yaml
    # hpa-qps.yaml
    apiVersion: autoscaling/v2
    kind: HorizontalPodAutoscaler
    metadata:
      name: my-app-qps-hpa
    spec:
      scaleTargetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: my-web-app
      minReplicas: 2
      maxReplicas: 10
      metrics:
      - type: Object
        object:
          metric:
            name: http_requests_per_second # 自定义指标名称，由适配器定义
          describedObject:
            apiVersion: v1
            kind: Service
            name: my-web-app-service
          target:
            type: Value
            value: "100" # 目标值是每个 Pod 平均 100 QPS
    ```

2.  **工作原理**：
    *   Prometheus 持续从你的应用 (`my-web-app`) 抓取 QPS 指标。
    *   Prometheus Adapter 将 Prometheus 中的 `http_requests_total` 等指标转换为 Kubernetes Metrics API 能理解的 `http_requests_per_second`。
    *   HPA 控制器查询 Metrics API，获取当前的总 QPS，然后除以当前的 Pod 数量，得到每个 Pod 的平均 QPS。
    *   如果平均 QPS 高于 100，就扩容；低于 100，就缩容。
