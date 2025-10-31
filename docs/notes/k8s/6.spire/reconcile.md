---
title: reconcile
createTime: 2025/10/30 15:10:56
permalink: /k8s/7dl60axt/
---


### 初始状态

**SPIRE 服务器中已存在的 entries：**
```yaml
Entry-1:
  ID: "entry-123"
  SPIFFEID: spiffe://example.org/ns/production/sa/web-server
  ParentID: spiffe://example.org/k8s-node/node-1
  Selectors: 
    - k8s:ns:production
    - k8s:sa:web-server
  DNSNames: ["web.example.com"]

Entry-2:
  ID: "entry-456"
  SPIFFEID: spiffe://example.org/ns/staging/sa/old-app
  ParentID: spiffe://example.org/k8s-node/node-2
  Selectors:
    - k8s:ns:staging
    - k8s:sa:old-app
```

**Kubernetes 集群中的资源：**
```yaml
# ClusterSPIFFEID-1: 匹配 production namespace 的 web-server
apiVersion: spire.spiffe.io/v1alpha1
kind: ClusterSPIFFEID
metadata:
  name: web-server-identity
  creationTimestamp: "2024-01-01T10:00:00Z"
spec:
  spiffeIDTemplate: "spiffe://example.org/ns/{{ .PodMeta.Namespace }}/sa/{{ .PodSpec.ServiceAccountName }}"
  namespaceSelector:
    matchLabels:
      env: production
  podSelector:
    matchLabels:
      app: web-server
  dnsNameTemplates:
    - "web.example.com"
    - "web-new.example.com"  # 新增的 DNS 名称

# ClusterSPIFFEID-2: 匹配 development namespace 的新应用
apiVersion: spire.spiffe.io/v1alpha1
kind: ClusterSPIFFEID
metadata:
  name: api-server-identity
  creationTimestamp: "2024-01-02T10:00:00Z"
spec:
  spiffeIDTemplate: "spiffe://example.org/ns/{{ .PodMeta.Namespace }}/sa/{{ .PodSpec.ServiceAccountName }}"
  namespaceSelector:
    matchLabels:
      env: development
  podSelector:
    matchLabels:
      app: api-server
```

**实际运行的 Pods：**
```yaml
# Pod-1: 在 production namespace
apiVersion: v1
kind: Pod
metadata:
  name: web-server-pod-1
  namespace: production
  labels:
    app: web-server
    env: production
spec:
  serviceAccountName: web-server
  nodeName: node-1

# Pod-2: 在 development namespace
apiVersion: v1
kind: Pod
metadata:
  name: api-server-pod-1
  namespace: development
  labels:
    app: api-server
    env: development
spec:
  serviceAccountName: api-server
  nodeName: node-3
```

### Reconcile 执行过程

#### **步骤 1: 加载 SPIRE 服务器当前的 entries (line 119-123)**
```go
currentEntries = [Entry-1, Entry-2]
deleteOnlyEntries = []
```

#### **步骤 2: 初始化 state，添加当前 entries (line 126-129)**
```go
state = {
  "hash-web-server": {  // 基于 SPIFFEID + ParentID + Selectors 的哈希
    Current: [Entry-1],
    Declared: []
  },
  "hash-old-app": {
    Current: [Entry-2],
    Declared: []
  }
}
```

#### **步骤 3: 处理 ClusterSPIFFEID 资源 (line 142-151)**
```go
// 列出所有 ClusterSPIFFEID
clusterSPIFFEIDs = [ClusterSPIFFEID-1, ClusterSPIFFEID-2]

// 对每个 ClusterSPIFFEID，找到匹配的 Pods 并生成期望的 entries
// ClusterSPIFFEID-1 匹配 Pod-1
desiredEntry1 = {
  SPIFFEID: spiffe://example.org/ns/production/sa/web-server
  ParentID: spiffe://example.org/k8s-node/node-1
  Selectors: [k8s:ns:production, k8s:sa:web-server]
  DNSNames: ["web.example.com", "web-new.example.com"]  // 更新的
}
state.AddDeclared(desiredEntry1, ClusterSPIFFEID-1)

// ClusterSPIFFEID-2 匹配 Pod-2
desiredEntry2 = {
  SPIFFEID: spiffe://example.org/ns/development/sa/api-server
  ParentID: spiffe://example.org/k8s-node/node-3
  Selectors: [k8s:ns:development, k8s:sa:api-server]
  DNSNames: []
}
state.AddDeclared(desiredEntry2, ClusterSPIFFEID-2)
```

**此时 state 变为：**
```go
state = {
  "hash-web-server": {
    Current: [Entry-1],  // 旧的，DNSNames 只有一个
    Declared: [desiredEntry1]  // 新的，DNSNames 有两个
  },
  "hash-old-app": {
    Current: [Entry-2],  // staging/old-app，没有对应的 Pod 了
    Declared: []  // 没有 Kubernetes 资源声明它
  },
  "hash-api-server": {  // 新的 entry
    Current: [],
    Declared: [desiredEntry2]
  }
}
```

#### **步骤 4: 计算差异 (line 153-191)**

```go
toDelete = []
toCreate = []
toUpdate = []

// 遍历 state 中的每个 entry
for _, s := range state {
  // 情况 1: "hash-web-server"
  // Current: [Entry-1], Declared: [desiredEntry1]
  if len(s.Declared) > 0 {
    preferredEntry = s.Declared[0]  // desiredEntry1
    if len(s.Current) > 0 {
      preferredEntry.Entry.ID = s.Current[0].ID  // 复用 "entry-123"
      // 比较字段: DNSNames 不同 ["web.example.com"] vs ["web.example.com", "web-new.example.com"]
      if outdatedFields = getOutdatedEntryFields(...) {
        toUpdate.append(preferredEntry)  // 需要更新
      }
      s.Current = []  // 移除已处理的
    }
  }
  // s.Current 现在为空，不会删除

  // 情况 2: "hash-old-app"
  // Current: [Entry-2], Declared: []
  // 没有 Declared entries，跳过 if 块
  // s.Current 仍然是 [Entry-2]
  toDelete.append(Entry-2)  // staging/old-app 需要删除

  // 情况 3: "hash-api-server"
  // Current: [], Declared: [desiredEntry2]
  if len(s.Declared) > 0 {
    preferredEntry = s.Declared[0]  // desiredEntry2
    if len(s.Current) == 0 {
      preferredEntry.Entry.ID = "scm-" + uuid.New()  // 生成新 ID
      toCreate.append(preferredEntry)  // 需要创建
    }
  }
}

// 结果：
toCreate = [desiredEntry2]  // development/api-server (新建)
toUpdate = [desiredEntry1]  // production/web-server (更新 DNSNames)
toDelete = [Entry-2]        // staging/old-app (删除)
```

#### **步骤 5: 执行操作 (line 193-202)**
```go
// 1. 删除不再需要的 entries
r.deleteEntries(ctx, toDelete)
// -> 调用 SPIRE API 删除 Entry-2 (staging/old-app)
// 日志: "Deleted entry" ID="entry-456"

// 2. 创建新 entries
r.createEntries(ctx, toCreate)
// -> 调用 SPIRE API 创建 desiredEntry2
// 日志: "Created entry" SPIFFEID="spiffe://example.org/ns/development/sa/api-server"

// 3. 更新已存在的 entries
r.updateEntries(ctx, toUpdate)
// -> 调用 SPIRE API 更新 Entry-1，添加新的 DNSNames
// 日志: "Updated entry" ID="entry-123" 
//       SPIFFEID="spiffe://example.org/ns/production/sa/web-server"
```

#### **步骤 6: 更新 Kubernetes 资源状态 (line 204-235)**
```go
// 更新 ClusterSPIFFEID-1 状态
ClusterSPIFFEID-1.Status = {
  Stats: {
    NamespacesSelected: 1,      // production namespace
    PodsSelected: 1,             // web-server-pod-1
    PodEntryRenderFailures: 0
  }
}

// 更新 ClusterSPIFFEID-2 状态
ClusterSPIFFEID-2.Status = {
  Stats: {
    NamespacesSelected: 1,      // development namespace
    PodsSelected: 1,             // api-server-pod-1
    PodEntryRenderFailures: 0
  }
}
```

### 最终结果

**SPIRE 服务器中的 entries（协调后）：**
```yaml
Entry-1 (更新):
  ID: "entry-123"  # ID 保持不变
  SPIFFEID: spiffe://example.org/ns/production/sa/web-server
  ParentID: spiffe://example.org/k8s-node/node-1
  Selectors: 
    - k8s:ns:production
    - k8s:sa:web-server
  DNSNames: ["web.example.com", "web-new.example.com"]  # ✅ 更新了

Entry-3 (新建):
  ID: "scm-abc-def-123"  # 新生成的 ID
  SPIFFEID: spiffe://example.org/ns/development/sa/api-server
  ParentID: spiffe://example.org/k8s-node/node-3
  Selectors:
    - k8s:ns:development
    - k8s:sa:api-server
  DNSNames: []

# Entry-2 已被删除 ✅
```

## 总结

Reconcile 的核心逻辑是**三路合并**：
1. **读取**：SPIRE 服务器的实际状态 (Current)
2. **计算**：Kubernetes 资源的期望状态 (Declared)
3. **协调**：计算差异并执行 Create/Update/Delete 操作

这确保了 SPIRE 服务器中的 entries 始终与 Kubernetes 集群中的实际工作负载保持同步！