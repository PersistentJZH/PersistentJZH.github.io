---
title: bond
mathjax: true
thumbnail: false
cover: false
categories:
  - 后端
  - linux
  - bond
date: 2024-09-02 11:49:37
updated: 2024-09-02 11:49:37
tags:
---
https://www.cnblogs.com/eddie1127/p/11385604.html
https://www.linuxprobe.com/actual-combat-nic-bond.html
vlan:https://www.cnblogs.com/weq0805/p/14801129.html

# 什么是bond
所谓bond，就是把多个物理网卡绑定成一个逻辑上的网卡，使用同一个IP工作，在增加带宽的同时也可以提高冗余性，一般使用较多的就是来提高冗余，分别和不同交换机相连，提高可靠性，但有时服务器带宽不够了也可以用作增加带宽。