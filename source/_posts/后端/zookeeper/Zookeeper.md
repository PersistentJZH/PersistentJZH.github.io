---
title: Zookeeper
mathjax: true
thumbnail: false
cover: image-20240520181453453.png
categories:
  - 后端
  - zookeeper
date: 2024-05-20 18:14:44
updated: 2024-05-20 18:14:44
tags:
  - 你好
  - 云元素
  - devops
  - jsaij
  - sasa
---
![](image-20240520181453453.png)

https://www.w3cschool.cn/zookeeper/zookeeper_fundamentals.html
# Znode的类型

Znode被分为持久（persistent）节点，顺序（sequential）节点和临时（ephemeral）节点。

- **持久节点**  - 即使在创建该特定znode的客户端断开连接后，持久节点仍然存在。默认情况下，除非另有说明，否则所有znode都是持久的。
    
- **临时节点** - 客户端活跃时，临时节点就是有效的。当客户端与ZooKeeper集合断开连接时，临时节点会自动删除。因此，只有临时节点不允许有子节点。如果临时节点被删除，则下一个合适的节点将填充其位置。临时节点在leader选举中起着重要作用。
    
- **顺序节点** - 顺序节点可以是持久的或临时的。当一个新的znode被创建为一个顺序节点时，ZooKeeper通过将10位的序列号附加到原始名称来设置znode的路径。例如，如果将具有路径 **/myapp** 的znode创建为顺序节点，则ZooKeeper会将路径更改为 **/myapp0000000001** ，并将下一个序列号设置为0000000002。如果两个顺序节点是同时创建的，那么ZooKeeper不会对每个znode使用相同的数字。顺序节点在锁定和同步中起重要作用。
![](image-20240520184926955.png)

