---
title: kubelet会watch哪些外部变化?？
createTime: 2025/07/19 00:51:13
permalink: /article/9xyds5s1/
---
### **例子：Kubelet 监控 Pod 清单变化**  

Kubelet 主要通过 **静态 Pod 文件** 和 **API Server 下发的 Pod** 两种方式获取 Pod 配置，并监控其变化。下面分别举例说明：

---

## **1. 监控本地静态 Pod 文件变化（Static Pod）**
**场景**：  
- 管理员在节点上的 `/etc/kubernetes/manifests/` 目录（默认路径）手动放置或修改 Pod 的 YAML 文件。  
- Kubelet 会监控该目录，自动创建、更新或删除 Pod。

**示例步骤**：
1. **创建静态 Pod**  
   ```bash
   # 在 Master/Worker 节点的 /etc/kubernetes/manifests/ 目录下创建 nginx Pod
   cat <<EOF | sudo tee /etc/kubernetes/manifests/nginx-static-pod.yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: nginx-static-pod
   spec:
     containers:
     - name: nginx
       image: nginx:1.25
       ports:
       - containerPort: 80
   EOF
   ```

2. **Kubelet 自动检测并创建 Pod**  
   ```bash
   # 查看 Pod 是否运行（在 Master 节点上）
   kubectl get pods
   ```
   输出示例：
   ```
   NAME                  READY   STATUS    RESTARTS   AGE
   nginx-static-pod-node1   1/1     Running   0          10s
   ```
   > 注意：静态 Pod 的名称会附带节点名称（如 `-node1`）。

3. **修改静态 Pod（触发更新）**  
   修改 `/etc/kubernetes/manifests/nginx-static-pod.yaml`，比如更换镜像版本：
   ```yaml
   image: nginx:1.26  # 从 1.25 改为 1.26
   ```
   - Kubelet 检测到文件变化后，会**删除旧 Pod 并创建新 Pod**（滚动更新）。

4. **删除静态 Pod**  
   ```bash
   sudo rm /etc/kubernetes/manifests/nginx-static-pod.yaml
   ```
   - Kubelet 检测到文件删除后，会自动终止 Pod。

---

## **2. 监控 API Server 下发的 Pod 变化（动态 Pod）**
**场景**：  
- 用户通过 `kubectl` 或 Deployment 等控制器创建 Pod。  
- Kubelet 监听 API Server 的 Pod 变更事件，并管理对应 Pod。

**示例步骤**：
1. **通过 `kubectl` 创建 Pod**  
   ```bash
   kubectl apply -f - <<EOF
   apiVersion: v1
   kind: Pod
   metadata:
     name: nginx-api-pod
   spec:
     containers:
     - name: nginx
       image: nginx:1.25
       ports:
       - containerPort: 80
   EOF
   ```

2. **Kubelet 接收并启动 Pod**  
   - API Server 将 Pod 配置下发给对应节点的 Kubelet。  
   - Kubelet 调用容器运行时（如 Containerd）创建容器。  

3. **修改 Pod（触发更新）**  
   更新 Pod 的镜像版本：
   ```bash
   kubectl edit pod nginx-api-pod  # 修改 image: nginx:1.26
   ```
   - 由于 Pod 是**不可变对象**，Kubelet 会直接**删除旧 Pod 并创建新 Pod**（类似静态 Pod）。  
   - 如果是 Deployment，则会触发滚动更新（由 Controller 管理，Kubelet 只执行单 Pod 的生命周期操作）。

4. **删除 Pod**  
   ```bash
   kubectl delete pod nginx-api-pod
   ```
   - API Server 通知 Kubelet 终止 Pod。

---

## **3. 监控 HTTP Endpoint（实验性功能）**
**场景**：  
- Kubelet 通过 `--pod-manifest-url` 参数从 Web 服务器动态获取 Pod 配置（需启用 `DynamicKubeletConfig`）。  
- 当 URL 返回的 Pod 配置变化时，Kubelet 会更新 Pod。

**示例**（需特殊配置）：
```bash
# 启动 Kubelet 时指定远程 Manifest URL
kubelet --pod-manifest-url=http://your-webserver/pod-manifest.yaml
```

---

### **关键区别：静态 Pod vs API Server Pod**
| 特性                | 静态 Pod (Static Pod)       | API Server Pod (动态 Pod)       |
|---------------------|----------------------------|---------------------------------|
| 管理方式            | 节点本地文件               | 由 API Server 下发             |
| 适用场景            | 控制平面组件（如 kube-apiserver） | 普通业务 Pod                   |
| 修改方式            | 直接修改节点上的文件       | 通过 `kubectl` 或 Controller   |
| 是否受 Deployment 管理 | ❌ 否                      | ✅ 是（如 Deployment/StatefulSet） |
| 删除方式            | 删除文件                   | `kubectl delete pod`           |

---

### **总结**
- **静态 Pod**：适用于不受 API Server 直接管理的场景（如自举 Kubernetes 控制平面）。  
- **API Server Pod**：常规 Pod，由集群统一管理。  
- **HTTP Endpoint**：实验性功能，适用于动态配置分发。  

Kubelet 会持续监控这些来源的 Pod 变化，并确保实际状态与期望状态一致！