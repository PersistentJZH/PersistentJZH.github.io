---
title: iptables
mathjax: true
thumbnail: false
cover: false
categories:
  - 后端
  - linux
  - 网络
  - iptables
date: 2024-07-30 15:17:35
updated: 2024-07-30 15:17:35
tags:
---
linux路由表
https://linuxgeeks.github.io/2017/03/10/094107-%E5%AD%A6%E4%B9%A0%E4%BD%BF%E7%94%A8iptables/
https://wangchujiang.com/linux-command/c/iptables.html
https://www.yoyoask.com/?p=7052
https://thiscute.world/posts/iptables-and-container-networks/#%E4%BA%8C%E5%AE%B9%E5%99%A8%E7%BD%91%E7%BB%9C%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86---iptables--bridge--veth

重点：https://morven.life/posts/iptables-wiki/


https://www.liuvv.com/p/a8480986.html
https://www.ioiox.com/archives/95.html

![](iptables-20240914190044117.webp)





![](iptables-20240826191952297.webp)

- PREROUTING 数据包刚进入网络层 , 路由之前
- INPUT 路由判断，流入用户空间
- OUTPUT 用户空间发出，后接路由判断出口的网络接口
- FORWARD 路由判断不进入用户空间，只进行转发
- POSTROUTING 数据包通过网络接口出去

##### 1.1.1 举例:

到本机某进程的报文：PREROUTING –> INPUT

由本机转发的报文：PREROUTING –> FORWARD –> POSTROUTING

由本机的某进程发出报文（通常为响应报文）：OUTPUT –> POSTROUTING


当你安装Docker时，它会自动创建三个网络。你可以使用以下docker network ls命令列出这些网络：

```shell
[root@iZ2vcfvp9613lxljhuxu45Z ~]# docker network ls
NETWORK ID     NAME                   DRIVER    SCOPE
27fc148d7b46   bridge                 bridge    local
e15b91b3196a   docker-apisix_apisix   bridge    local
d1094c6a6aa2   host                   host      local
f39e6e2fb083   none                   null      local
```


**MASQUERADE**: https://blog.csdn.net/jk110333/article/details/8229828


iptables加规则默认filter表




iptables -t raw -I PREROUTING -p tcp -m tcp --dport 8080 -j TRACE 
iptables -t raw -I PREROUTING -p tcp -m tcp --sport 8080 -j TRACE
目标端口为8080的，表示客户端发出来的；源端口为8080的，表示server2回复的。都加上trace


iptables -t nat -I PREROUTING 1 -p tcp -m tcp --dport 8888 -j DNAT --to-destination 192.168.64.5
iptables -t nat -I POSTROUTING 1 -p tcp -m tcp --dport 8080 -j SNAT --to-source  192.168.64.8

iptables -t filter -I FORWARD 1 -p tcp -m tcp --dport 8080 -j ACCEPT 
iptables -t filter -I FORWARD 1 -p tcp -m tcp --sport 8080 -j ACCEPT 
正向的和反向的，各加一个，免得一会还要再加





– `iptables -F`：该命令用于将默认表(filter表)中的所有规则清空。  
– `iptables -X`：该命令用于删除自定义的用户链。  
– `iptables -Z`：该命令用于将计数器归零，即清空统计规则的数据。  
– `iptables -t nat -F`：该命令用于将nat表中的规则清空。  
– `iptables -t nat -X`：该命令用于删除自定义的用户链。  
– `iptables -t nat -Z`：该命令用于将计数器归零，即清空统计规则的数据。  
– `iptables -t mangle -F`：该命令用于将mangle表中的规则清空。  
– `iptables -t mangle -X`：该命令用于删除自定义的用户链。  
– `iptables -t mangle -Z`：该命令用于将计数器归零，即清空统计规则的数据。

iptables -L -n --line-number