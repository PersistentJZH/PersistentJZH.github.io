---
title: binlog
tags:
  - mysql
  - binlog
mathjax: true
thumbnail: false
cover: binlog-20240603173730442.webp
categories:
  - 后端
  - mysql
date: 2024-06-03 11:38:19
updated: 2024-06-03 11:38:19
---
# binlog的三种格式
binlog只记录改变数据的sql，不改变数据的sql不会写入(即使update没有造成数据变化，也会被写入binlog)，binlog主要有三种格式：**row、statement、mixed** 
## 查看binlog配置
```bash
MariaDB [(none)]> show variables like '%binlog%';
+-----------------------------------------+----------------------+
| Variable_name                           | Value                |
+-----------------------------------------+----------------------+
| binlog_annotate_row_events              | OFF                  |
| binlog_cache_size                       | 32768                |
| binlog_checksum                         | NONE                 |
| binlog_direct_non_transactional_updates | OFF                  |
| binlog_format                           | ROW                  |
| binlog_optimize_thread_scheduling       | ON                   |
| binlog_stmt_cache_size                  | 32768                |
| innodb_locks_unsafe_for_binlog          | OFF                  |
| max_binlog_cache_size                   | 18446744073709547520 |
| max_binlog_size                         | 1073741824           |
| max_binlog_stmt_cache_size              | 18446744073709547520 |
| sync_binlog                             | 0                    |
+-----------------------------------------+----------------------+
12 rows in set (0.00 sec)
```

## binlog文件的查看
binlog通常放在/var/lib/mysql，binlog日志有2种查看方式，具体如下：
1. **mysql查看binlog**
```bash
mysql> show binlog events;   #只查看第一个binlog文件的内容

mysql> show binlog events in 'mysql-bin.000002'; #查看指定binlog文件的内容

mysql> show binary logs;  #获取binlog文件列表

mysql> show master status； #查看当前正在写入的binlog文件



MariaDB [(none)]> show binlog events;
+------------------+------+-------------+-----------+-------------+------------------------------------------------------------------------------------------------+
| Log_name         | Pos  | Event_type  | Server_id | End_log_pos | Info                                                                                           |
+------------------+------+-------------+-----------+-------------+------------------------------------------------------------------------------------------------+
| mysql-bin.000001 |    4 | Format_desc |         2 |         245 | Server ver: 5.5.68-MariaDB, Binlog ver: 4                                                      |
| mysql-bin.000001 |  245 | Query       |         2 |         320 | BEGIN                                                                                          |
| mysql-bin.000001 |  320 | Table_map   |         2 |         392 | table_id: 35 (evidence_db.grudge_record_tab)                                                   |
| mysql-bin.000001 |  392 | Update_rows |         2 |         553 | table_id: 35 flags: STMT_END_F                                                                 |
| mysql-bin.000001 |  553 | Xid         |         2 |         580 | COMMIT /* xid=1778 */                                                                          |
| mysql-bin.000001 |  580 | Query       |         2 |         644 | BEGIN                                                                                          |
| mysql-bin.000001 |  644 | Query       |         2 |         797 | UPDATE `evidence_db`.`grudge_record_tab` SET `notes` = '地铁?？我也1' WHERE (`id` = '29')      |
| mysql-bin.000001 |  797 | Xid         |         2 |         824 | COMMIT /* xid=7071 */                                                                          |
| mysql-bin.000001 |  824 | Query       |         2 |         899 | BEGIN                                                                                          |
| mysql-bin.000001 |  899 | Table_map   |         2 |         971 | table_id: 35 (evidence_db.grudge_record_tab)                                                   |
| mysql-bin.000001 |  971 | Update_rows |         2 |        1134 | table_id: 35 flags: STMT_END_F                                                                 |
| mysql-bin.000001 | 1134 | Xid         |         2 |        1161 | COMMIT /* xid=176183 */                                                                        |
| mysql-bin.000001 | 1161 | Query       |         2 |        1236 | BEGIN                                                                                          |
| mysql-bin.000001 | 1236 | Table_map   |         2 |        1308 | table_id: 35 (evidence_db.grudge_record_tab)                                                   |
| mysql-bin.000001 | 1308 | Update_rows |         2 |        1453 | table_id: 35 flags: STMT_END_F                                                                 |
| mysql-bin.000001 | 1453 | Xid         |         2 |        1480 | COMMIT /* xid=333846 */                                                                        |
+------------------+------+-------------+-----------+-------------+------------------------------------------------------------------------------------------------+
16 rows in set (0.00 sec)
```

2. **使用mysqlbinlog工具**
```bash
1.导出的方式查看
/usr/local/mysql/bin/mysqlbinlog --start-datetime="2013-03-01 00:00:00" --stop-datetime="2014-03-21 23:59:59" /usr/local/mysql/var/mysql-bin.000007 -r test2.sql

2.一般的statement格式的二进制文件，用下面命令就可以
mysqlbinlog mysql-bin.000001

3.如果是row格式，加上-v或者-vv参数就行，如
mysqlbinlog -vv mysql-bin.000001
```

## row
row格式文件比较大，保存的是一行一行的数据,可通过binlog_row_image=FULL | MINIMAL | NOBLOB 设置日志记录的方式。
FULL: 记录行中所有列修改前后的数据。
MINIMAL: 记录行中所有列修改前的数据+被修改列修改后的数据。
NOBLOB: 记录行中所有列修改前的数据+(未对行中TEXT和BLOB类型列修改时, 记录TEXT和BLOB类型以外的列的数据.)


## statement
statement格式文件比较小，statement保存的是sql语句，statement容易丢数据，有时候，SQL语句里面会用到一些函数，比如说取当前日期的函数sysdate，你要是用statement，binlog里同步过去的就是这个带有函数的SQL语句，而主库的当前日期，和binlog同步到slave上的当前日期，肯定是有差异的，这样两条数据就不一致了，所以这样同步的数据，就会有问题。

## mixed
mixed格式介于row和statement二者之间，混合STATEMENT和ROW两种格式, MySQL会根据执行的SQL语句自动选择。

## 优缺点对比
row:
	优点: 
		1. 可以避免MySQL复制中出现主从不一致的问题（不会丢数据）
		2. 对每一行数据的修改比STATEMENT模式高效（why）
		3. 可在误删改数据后, 同时无备份可以恢复时, 通过分析binlog日志进行反向处理达到恢复数据目的
	缺点:
		1. 文件格式大
区别：

4. statement容易丢数据原因是，有时候，SQL语句里面会用到一些函数，比如说取当前日期的函数sysdate，你要是用statement，binlog里同步过去的就是这个带有函数的SQL语句，而主库的当前日期，和binlog同步到slave上的当前日期，肯定是有差异的，这样两条数据就不一致了，所以这样同步的数据，就会有问题
5. row是直接把表插入到备份库中，statement是导出主库语句后，导入到备份库中，存在时间差。




## 如何优雅的删除MYSQL的binlog

1. 手动方式删除
```bash
purge binary logs to 'mysql-bin.000068';
purge binary logs before '2021-08-22 18:00:00';
```

2. 自动清除

```bash
SHOW VARIABLES LIKE 'expire_logs_days';
SET GLOBAL expire_logs_days = 30;
```
设置之后不会立即清除，触发条件是：
1. **binlog大小超过max_binlog_size**
2. **手动执行flush logs**(flush logs;)
3. **重新启动时(MySQL将会new一个新文件用于记录binlog)**




# 主从同步

![](binlog-20240604102040219.webp)

