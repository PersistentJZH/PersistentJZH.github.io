---
title: spire基础
createTime: 2025/10/28 22:07:55
permalink: /k8s/k90axrjc/
---
好的，我们来详细拆解一下 SPIRE 在 Kubernetes 中是如何工作的，并配上一个具体的例子。

### 首先，理解 SPIRE 的核心目标

SPIRE (**SPIFFE Runtime Environment**) 是一个工具，它实现了 **SPIFFE** 标准。SPIFFE 的核心目标是：**在动态和异构的计算环境中，为每一个工作负载（Workload）提供安全的、可验证的身份。**

在 Kubernetes 的语境下，“工作负载”就是一个 Pod（或者更精确地说，是 Pod 里的一个进程）。

简单来说，SPIRE 解决了这个问题：
*   “我是谁？” - 我是一个名为 `payment-service` 的微服务，运行在 `prod` 命名空间的一个 Pod 里。
*   “我如何向别人证明我是谁？” - 通过 SPIRE 给我颁发的、密码学签名的身份文件（SVID）。
*   “我如何相信对方是谁？” - 通过验证对方 SPIRE 颁发的 SVID。

---

### SPIRE 在 Kubernetes 中的关键组件

SPIRE 系统主要由两个部分组成：

1.  **SPIRE Server**：
    *   **作用**：身份的“发行机构”或“根 CA”。它负责：
        *   管理所有工作负载的身份策略。
        *   验证工作负载的“身份”，并为其签发 SVID。
        *   维护一个可插拔的数据库（如 SQLite，PostgreSQL）来存储节点和工作负载的注册信息。
    *   **部署**：通常以 `StatefulSet` 或 `Deployment` 的形式部署在集群中。

2.  **SPIRE Agent**：
    *   **作用**：在每个 Kubernetes 节点上运行的“本地代表”。它负责：
        *   与 SPIRE Server 通信。
        *   证明该节点上运行的 Pod 的身份。
        *   将 SVID 安全地分发到该节点上 Pod 的文件系统中。
    *   **部署**：必须以 `DaemonSet` 的形式部署，确保每个节点上一个 Agent。
    *   **关键权限**：需要挂载宿主机的某些目录（如 `/var/run/secrets/kubernetes.io/serviceaccount` 和 Pod 的 `proc` 文件系统），以便读取 Pod 的 Service Account Token 等信息来验证其身份。

---

### 工作流程详解：举一个具体的例子

让我们设想一个场景：
*   **服务 A**: `payment-service` (部署在 `prod` 命名空间)
*   **服务 B**: `user-service` (部署在 `prod` 命名空间)
*   **目标**：`payment-service` 需要调用 `user-service` 的 API，并且 `user-service` 需要确认调用者确实是合法的 `payment-service`。

**步骤 0：配置 SPIRE Server（准备工作）**

在 SPIRE Server 启动前，管理员需要通过**注册条目（Registration Entries）**来定义身份策略。这告诉 SPIRE Server：“满足以下条件的实体，可以获得这个身份”。

我们需要创建两个注册条目：

1.  **为 `user-service` 创建身份**：
    *   **选择器**：`pod-label: app=user-service` 和 `namespace: prod`
    *   **SPIFFE ID**：`spiffe://mycompany.com/ns/prod/sa/user-service`

2.  **为 `payment-service` 创建身份**：
    *   **选择器**：`pod-label: app=payment-service` 和 `namespace: prod`
    *   **SPIFFE ID**：`spiffe://mycompany.com/ns/prod/sa/payment-service`

这些注册条目可以手动创建，也可以通过 Kubernetes 的 CRD (SPIRE Controller Manager) 自动创建。

**步骤 1：工作负载启动并请求身份**

1.  Kubernetes 调度器将 `payment-service` 的 Pod 调度到某个节点上。
2.  Pod 内的 **SPIRE Workload API** 客户端（这可以是一个 Sidecar 容器，如 `spire-agent` 的特定模式，或者是直接集成到应用中的库）会向本机的 UNIX Domain Socket（例如 `/run/spire/sockets/agent.sock`）发起请求。
3.  请求本质上是在问：“嘿，Agent，我是这个新启动的 Pod，我的身份证明文件（SVID）在哪里？”

**步骤 2：SPIRE Agent 验证工作负载身份**

1.  节点上的 **SPIRE Agent** 接收到这个请求。
2.  Agent 会执行一套**验证流程**来确认这个 Pod 的身份。在 K8s 中，这通常包括：
    *   检查请求进程的 PID，找到它所属的 Pod。
    *   读取该 Pod 的 **Kubernetes Service Account Token**。
    *   查询 Kubernetes API Server，验证这个 Token 和 Pod 信息是否合法，并获取该 Pod 的元数据（如 Labels, Namespace）。
3.  Agent 将收集到的 Pod 信息（如 `app=payment-service`, `namespace=prod`）发送给 **SPIRE Server**。

**步骤 3：SPIRE Server 签发 SVID**

1.  **SPIRE Server** 收到 Agent 发来的信息。
2.  Server 在其注册条目数据库中查找，看是否有条目能匹配上这些选择器（`app=payment-service` 和 `namespace: prod`）。
3.  如果找到匹配的条目，Server 就知道这个工作负载有权获得 SPIFFE ID `spiffe://mycompany.com/ns/prod/sa/payment-service`。
4.  Server 为该 SPIFFE ID 创建一个 X.509 SVID（证书和私钥），并将其发回给请求的 Agent。

**步骤 4：SPIRE Agent 交付 SVID**

1.  **SPIRE Agent** 从 Server 收到 SVID。
2.  Agent 通过之前建立的 UNIX Domain Socket 连接，将 SVID 安全地写入到 `payment-service` Pod 内指定的文件路径中（例如 `/run/spire/credentials/svid.pem` 和 `/run/spire/credentials/key.pem`）。

**步骤 5：工作负载使用 SVID 进行相互 TLS（mTLS）通信**

现在，`payment-service` Pod 里有了自己的身份证书（SVID）。

1.  当 `payment-service` 需要调用 `user-service` 时，它会发起一个 HTTPS 请求。
2.  在 TLS 握手阶段：
    *   `payment-service`（客户端）向 `user-service`（服务端）出示自己的 SVID 证书。
    *   `user-service`（服务端）也向 `payment-service`（客户端）出示自己的 SVID 证书。
3.  双方都会验证对方证书：
    *   **证书链验证**：确认证书是由可信的 SPIRE Server CA 签发的。
    *   **SPIFFE ID 验证**：确认对方的 SPIFFE ID 是允许通信的。例如，`user-service` 可以配置为只接受来自 `spiffe://mycompany.com/ns/prod/sa/payment-service` 的请求。

至此，基于强身份的、自动化的 mTLS 通信就建立起来了。

### 总结与优势

通过这个例子，我们可以看到 SPIRE 在 Kubernetes 中的工作方式：

1.  **声明式身份**：通过注册条目预先定义“谁可以获得什么身份”。
2.  **基于节点的代理**：每个节点的 Agent 负责本地工作负载的身份验证和凭证分发。
3.  **自动化与动态**：整个流程，从 Pod 启动到获取身份凭证，完全是自动化的，无需人工干预。
4.  **强身份**：身份与 Pod 的 K8s 元数据（Service Account, Labels 等）紧密绑定，难以伪造。

**核心优势**：
*   **零信任安全**：实现了“从不信任，始终验证”的原则。
*   **自动化证书管理**：无需手动管理、轮换证书，解决了传统 PKI 的痛点。
*   **细粒度身份**：身份可以精确到单个服务，而不是整个节点或集群。
*   **通用性**：颁发的 SVID 不仅可以用于服务间 mTLS，还可以用于数据库认证、与外部系统集成等任何需要强身份的场景。


好的，这是一个非常关键的问题！我们来详细对比一下手动创建和自动创建 SPIRE 注册条目的两种方式。

---

### 方式一：手动创建注册条目

手动创建是通过使用 SPIRE Server 的命令行工具 `spire-server entry create` 来直接向 SPIRE Server 注册工作负载。这种方式要求运维人员直接与 SPIRE Server 交互。

#### 操作步骤与例子

假设我们有一个 Pod，标签为 `app: payment-service`，在 `prod` 命名空间下运行，使用 `payment-sa` 这个 Service Account。

1.  **登录到 SPIRE Server Pod**
    首先，你需要能够执行 `spire-server` 命令。

    ```bash
    kubectl exec -n spire -it <spire-server-pod-name> -- /bin/sh
    ```

2.  **创建注册条目**
    在 SPIRE Server 的 shell 中，执行创建命令。命令非常复杂，需要指定多个参数。

    ```bash
    spire-server entry create \
        -spiffeID spiffe://mycompany.com/ns/prod/sa/payment-service \
        -parentID spiffe://mycompany.com/ns/spire/sa/spire-agent \
        -selector k8s:ns:prod \
        -selector k8s:sa:payment-sa \
        -selector k8s:pod-label:app:payment-service \
        -ttl 3600
    ```

    **参数解释**：
    *   `-spiffeID`：要颁发给工作负载的唯一身份标识。
    *   `-parentID`：**这是固定的**。它表示能够证明此工作负载身份的实体。在 K8s 中，这个实体就是节点上的 SPIRE Agent。这里的 `spire-agent` 是 Agent 的 Service Account，通常在 `spire` 命名空间下。
    *   `-selector`：定义工作负载必须满足的条件。这是一个列表，**所有条件都必须满足**。
        *   `k8s:ns:prod`：Pod 必须在 `prod` 命名空间。
        *   `k8s:sa:payment-sa`：Pod 必须使用 `payment-sa` 这个 Service Account。
        *   `k8s:pod-label:app:payment-service`：Pod 必须带有 `app=payment-service` 的标签。
    *   `-ttl`：颁发的 SVID 的有效期（秒）。

3.  **验证条目创建**
    你可以列出所有注册条目来确认。

    ```bash
    spire-server entry show
    ```

#### 手动创建的优缺点

*   **优点**：
    *   控制粒度极细，可以定义非常复杂的选择器逻辑。
    *   不依赖额外的 Kubernetes 组件。
*   **缺点**：
    *   **繁琐且容易出错**：需要为每个工作负载手动执行命令。
    *   **与部署生命周期脱节**：当应用被删除时，注册条目不会自动清理，可能导致“僵尸条目”。
    *   **不适合大规模动态环境**：在微服务架构中，服务众多且发布频繁，手动管理是不可持续的。

---

### 方式二：通过 Kubernetes CRD 自动创建（推荐）

这是现代、云原生范式的做法。它利用 SPIRE Controller Manager 来扩展 Kubernetes API，通过定义自定义资源（CRD）来管理注册条目。

#### 核心组件：SPIRE Controller Manager

它是一个独立的控制器，部署在你的集群中，会监视特定的 Kubernetes 资源（如 Pod 的变更），并自动调用 SPIRE Server 的 API 来创建/删除对应的注册条目。

#### 操作步骤与例子

同样以创建 `payment-service` 的身份为例。

1.  **定义 ClusterSPIFFEID 资源**
    你不需要登录到 Server Pod，只需要创建一个 YAML 文件并 `kubectl apply` 即可。

    ```yaml
    # payment-service-spiffe-id.yaml
    apiVersion: spire.spiffe.io/v1alpha1
    kind: ClusterSPIFFEID
    metadata:
      name: payment-service-identity
    spec:
      # 定义 SPIFFE ID 的模板。
      # 可以使用 Pod 的元数据作为变量进行动态填充。
      spiffeIDTemplate: "spiffe://mycompany.com/ns/{{ .Pod.Namespace }}/sa/{{ .Pod.ServiceAccount }}"
      # 定义哪些 Pod 有资格获得这个身份。
      podSelector:
        matchLabels:
          app: payment-service
      # 可选的，进一步限制命名空间
      namespaceSelector:
        matchNames:
        - prod
    ```

2.  **部署资源**
    ```bash
    kubectl apply -f payment-service-spiffe-id.yaml
    ```

3.  **自动化的魔法**
    *   当你部署一个带有标签 `app: payment-service` 到 `prod` 命名空间的 Pod 时，SPIRE Controller Manager 会监听到这个 Pod 的创建。
    *   控制器发现这个 Pod 匹配 `ClusterSPIFFEID` 资源中定义的 `podSelector` 和 `namespaceSelector`。
    *   控制器自动计算 SPIFFE ID（例如 `spiffe://mycompany.com/ns/prod/sa/payment-sa`），并向 SPIRE Server 创建对应的注册条目。
    *   当该 Pod 被删除时，控制器同样会监听到事件，并自动从 SPIRE Server 中删除对应的注册条目。

#### 自动创建的优缺点

*   **优点**：
    *   **声明式 & GitOps**：像管理其他 K8s 资源一样，用 YAML 文件管理身份策略，可以纳入版本控制和使用 CI/CD。
    *   **自动化生命周期管理**：注册条目与 Pod 的生命周期完全同步，无需手动清理。
    *   **简化运维**：开发者/运维人员无需理解复杂的 `spire-server` 命令行参数，只需定义简单的选择器。
    *   **非常适合动态和大规模环境**。
*   **缺点**：
    *   需要额外部署和维护 SPIRE Controller Manager。
    *   可能没有手动命令那样的极致灵活性（但对于 99% 的场景都已足够）。

---

### 对比总结

| 特性 | 手动创建 | 自动创建 (CRD) |
| :--- | :--- | :--- |
| **操作方式** | 命令式 (`spire-server entry create`) | 声明式 (`kubectl apply -f .yaml`) |
| **管理界面** | SPIRE Server CLI | Kubernetes API |
| **生命周期** | 与 Pod 脱节，需手动管理 | 与 Pod 绑定，自动管理 |
| **复杂度** | 高（需记住复杂命令和参数） | 低（使用熟悉的 K8s 选择器） |
| **适用场景** | 测试、 PoC、或极其特殊的边缘案例 | 生产环境、微服务架构、动态集群 |
| **推荐度** | ⭐⭐ | **⭐⭐⭐⭐⭐ (强烈推荐)** |

**结论**：对于任何严肃的 Kubernetes 生产环境，**使用 SPIRE Controller Manager 和 `ClusterSPIFFEID` CRD 进行自动创建是标准且推荐的做法**。它完美体现了云原生的“声明式”和“自动化”理念。