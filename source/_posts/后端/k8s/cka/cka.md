---
title: cka
mathjax: true
thumbnail: false
cover: false
categories:
  - 后端
  - k8s
  - cka
date: 2024-08-09 17:46:22
updated: 2024-08-09 17:46:22
tags:
---
https://blog.csdn.net/weixin_53851491/article/details/137040823
# 查看 pod 的 CPU
通过 pod label name=cpu-loader，找到运行时占用大量 CPU 的 pod，  
并将占用 CPU 最高的 pod 名称写入文件 /opt/KUTR000401/KUTR00401.txt（已存在）。

```
# 切换答题环境（考试环境有多个，每道题要在对应的环境中作答）
kubectl config use-context k8s
 
# 查找CPU使用率最高的Pod。
kubectl top pod -l name=cpu-loader --sort-by=cpu -A
 
# 将查到Pod名称输出到指定文件
echo "podename" > /opt/KUTR000401/KUTR00401.txt
```

# 配置网络策略 NetworkPolicy
在现有的 namespace my-app 中创建一个名为 allow-port-from-namespace 的新 NetworkPolicy。
确保新的 NetworkPolicy 允许 namespace echo 中的 Pods 连接到 namespace my-app 中的 Pods 的 9000 端口。
进一步确保新的 NetworkPolicy：
不允许对没有在监听 端口 9000 的 Pods 的访问
不允许非来自 namespace echo 中的 Pods 的访问


```
# 切换答题环境（考试环境有多个，每道题要在对应的环境中作答）
kubectl config use-context k8s
 
 
# 查看所有 ns 的标签 label
kubectl get ns --show-labels
 
# 给my-app命名空间打一个标签
kubectl label ns my-app project=echo
 
# 编写一个 yaml 文件
vim networkpolicy.yaml
 
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
 name: allow-port-from-namespace         #题目的名字
 namespace: my-app                       #被访问者的命名空间
spec:
 podSelector: {}
 policyTypes:
 - Ingress          #策略影响入栈流量
 ingress:
 - from:            #允许流量的来源
 - namespaceSelector:
 matchLabels:
 project: echo      #访问者的命名空间的标签 label
 ports:
 - protocol: TCP
 port: 9000         #被访问者公开的端口
 
# 创建
kubectl apply -f networkpolicy.yaml
 
# 检查
kubectl describe networkpolicy -n my-app
```

# 暴露服务 service
请重新配置现有的 deployment front-end 以及添加名为 http 的端口规范来公开现有容器 nginx 的端口 80/tcp。
创建一个名为 front-end-svc 的新 service，以公开容器端口 http。
配置此 service，以通过各个 Pod 所在的节点上的 NodePort 来公开他们。

```
# 切换答题环境（考试环境有多个，每道题要在对应的环境中作答）
kubectl config use-context k8s
 
# 检查 deployment 信息，并记录 SELECTOR 的 Lable 标签，这里是 app=front-end
kubectl get deployment front-end -o wide
 
# 配置deployment暴露端口，添加如下图配置
kubectl edit deployment front-end
 
```
