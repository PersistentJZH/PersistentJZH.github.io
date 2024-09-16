---
title: lab2分析
mathjax: true
thumbnail: false
cover: false
categories:
  - 后端
  - 分布式
  - mit-6.824
  - lab2-raft
date: 2024-06-27 17:19:15
updated: 2024-06-27 17:19:15
tags:
---
# raft概述
raft 官网：https://raft.github.io/
论文翻译：https://github.com/maemual/raft-zh_cn/blob/master/raft-zh_cn.md#52-%E9%A2%86%E5%AF%BC%E4%BA%BA%E9%80%89%E4%B8%BE
raft的leader会将客户端的操作以log的形式记录下来，同时将记录下来的log复制给follower，当超过半数follower完成复制之后，leader会将log应用到状态机（实际执行指令）并返回给客户端。leader端通过**nextIndex[]** 和 **matchIndex[]** 来记录log复制进度。**nextIndex[]** 记录了下一次应该发送给follower日志的index，**matchIndex[]**  记录了当前已经被follower复制的日志的最大index。有人可能会问：“这里只记录**matchIndex[]** 可以吗？这里的目标是为了记录follower复制到了哪里，理论上follower复制成功之后，leader修改对应的matchIndex[]即可，为什么还需要nextIndex[]？ nextIndex[]的值不应该永远是matchIndex[]+1吗？“
# leader选举

##  raft结构

```go
type Raft struct {  
   mu        sync.RWMutex        // Lock to protect shared access to this peer's state  
   peers     []*labrpc.ClientEnd // RPC end points of all peers  
   persister *Persister          // Object to hold this peer's persisted state  
   me        int                 // this peer's index into peers[]  
   dead      int32               // set by Kill()  
  
   applyCh        chan ApplyMsg  
   applyCond      *sync.Cond   // used to wakeup applier goroutine after committing new entries   
   replicatorCond []*sync.Cond // used to signal replicator goroutine to batch replicating entries   
   state          NodeState  //指记录当前节点处于什么状态（leader/follower/candidate）
  
   currentTerm int  
   votedFor    int  
   logs        []Entry // the first entry is a dummy entry which contains LastSnapshotTerm, LastSnapshotIndex and nil Command  
  
   commitIndex int  // leader提交到哪里了，绝对下标
   lastApplied int  // 已经应用到状态机的log的index
   nextIndex   []int // 应该发给flower的log的起始index ，绝对下标
   matchIndex  []int // flower 已经复制了的  ，绝对下标
  
   electionTimer  *time.Timer  
   heartbeatTimer *time.Timer  
}
```

| 参数           | 范围              | 持久化 | 解释                                               |     |
| ------------ | --------------- | --- | ------------------------------------------------ | --- |
| currentTerm  | leader/follower | T   | 服务器已知最新的任期（在服务器首次启动时初始化为0，单调递增）                  |     |
| votedFor     | leader/follower | T   | 当前任期内收到选票的 candidateId，如果没有投给任何候选人 则为空           |     |
| log[]        | leader/follower | T   | 日志条目；每个条目包含了用于状态机的命令，以及领导人接收到该条目时的任期（初始索引为1）     |     |
| commitIndex  | leader/follower | F   | 已知已提交的最高的日志条目的索引（初始值为0，单调递增）                     |     |
| lastApplied  | leader/follower | F   | 已经被应用到状态机的最高的日志条目的索引（初始值为0，单调递增）                 |     |
| nextIndex[]  | leader          | F   | 对于每一台服务器，发送到该服务器的下一个日志条目的索引（初始值为领导人最后的日志条目的索引+1） |     |
| matchIndex[] | leader          | F   | 对于每一台服务器，已知的已经复制到该服务器的最高日志条目的索引（初始值为0，单调递增）      |     |
|              |                 |     |                                                  |     |
##  程序启动阶段
在集群启动阶段，每个server都是follower，当electionTimer结束之后，因为follower在规定时间(这个时间是随机的)内没有收到leader的信息，follower会默认leader已经挂了，这时候follower会将state变为candidate，企图(向其他server发起投票)成为新的leader。但是不是谁都可以成为leader，成为leader需要获得超过半数server的投票才行。server在接受到投票请求之后，也不是百分百同意投票，需要满足一定的条件，需要判断leader的log是否足够新，试想如果最终投票出来的leader的log非常旧，最终会造成消息丢失。


![](phrase1_副本.gif)
在server的electionTimer到期之后，server为了成为新的leader，会有以下动作：
1. 重置electionTimer定时器（在改状态之后重置也可以？）
2. 改变自己的状态为candidate
3. currentTerm ++
4. 为自己投票
5. 发送RequestVote RPC给其他server请求获得投票
6. 统计票数，如果有半数的server同意，则改变自己的state为leader，重置heartbeatTimer

``` go
func (rf *Raft) ticker() {  
   for rf.killed() == false {  
      select {  
      case <-rf.electionTimer.C:  
         rf.mu.Lock()  
         rf.ChangeState(StateCandidate)  
         rf.currentTerm += 1  
         rf.StartElection()  
         rf.electionTimer.Reset(RandomizedElectionTimeout())  
         rf.mu.Unlock()  
      case <-rf.heartbeatTimer.C:  
         rf.mu.Lock()  
         if rf.state == StateLeader {  
            rf.BroadcastHeartbeat(true)  
            rf.heartbeatTimer.Reset(StableHeartbeatTimeout())  
         }  
         rf.mu.Unlock()  
      }  
   }  
}

func (rf *Raft) StartElection() {  
   request := rf.genRequestVoteRequest()  
   DPrintf("{Node %v} starts election with RequestVoteRequest %v", rf.me, request)  
   // use Closure  
   grantedVotes := 1  
   rf.votedFor = rf.me  
   rf.persist()  
   for peer := range rf.peers {  
      if peer == rf.me {  
         continue  
      }  
      go func(peer int) {  
         response := new(RequestVoteResponse)  
         if rf.sendRequestVote(peer, request, response) {  
            rf.mu.Lock()  
            defer rf.mu.Unlock()  
            DPrintf("{Node %v} receives RequestVoteResponse %v from {Node %v} after sending RequestVoteRequest %v in term %v", rf.me, response, peer, request, rf.currentTerm)  
            if rf.currentTerm == request.Term && rf.state == StateCandidate {  
               if response.VoteGranted {  
                  grantedVotes += 1  
                  if grantedVotes > len(rf.peers)/2 {  
                     DPrintf("{Node %v} receives majority votes in term %v", rf.me, rf.currentTerm)  
                     rf.ChangeState(StateLeader)  
                     rf.BroadcastHeartbeat(true)  
                  }  
  
               } else if response.Term > rf.currentTerm {  
                  // todo 这里的判断逻辑貌似有问题  
                  DPrintf("{Node %v} finds a new leader {Node %v} with term %v and steps down in term %v", rf.me, peer, response.Term, rf.currentTerm)  
                  rf.ChangeState(StateFollower)  
                  rf.currentTerm, rf.votedFor = response.Term, -1  
                  rf.persist()  
               }  
            }  
         }  
      }(peer)  
   }  
}
```


在收到投票请求之后，server会根据以下规则进行投票：
1. 如果`term < currentTerm`返回 false (有其他人赢得了选举)
2. 如果 votedFor 为空或者为 candidateId，并且候选人的日志至少和自己一样新（要么term比自己大，如果term相同，那log要比自己长），那么就投票给他
``` go
func (rf *Raft) RequestVote(request *RequestVoteRequest, response *RequestVoteResponse) {  
   rf.mu.Lock()  
   defer rf.mu.Unlock()  
   defer rf.persist()  
   defer DPrintf("{Node %v}'s state is {state %v,term %v,commitIndex %v,lastApplied %v,firstLog %v,lastLog %v} before processing requestVoteRequest %v and reply requestVoteResponse %v", rf.me, rf.state, rf.currentTerm, rf.commitIndex, rf.lastApplied, rf.getFirstLog(), rf.getLastLog(), request, response)  
  
   if request.Term < rf.currentTerm || (request.Term == rf.currentTerm && rf.votedFor != -1 && rf.votedFor != request.CandidateId) {  
      response.Term, response.VoteGranted = rf.currentTerm, false  
      return   }  
   if request.Term > rf.currentTerm {  
      rf.ChangeState(StateFollower)  
      rf.currentTerm, rf.votedFor = request.Term, -1  
   }  
   if !rf.isLogUpToDate(request.LastLogTerm, request.LastLogIndex) {  
      response.Term, response.VoteGranted = rf.currentTerm, false  
      return   }  
   rf.votedFor = request.CandidateId  
   rf.electionTimer.Reset(RandomizedElectionTimeout())  
   response.Term, response.VoteGranted = rf.currentTerm, true 
}

// 判断log是否足够新
func (rf *Raft) isLogUpToDate(term, index int) bool {  
   lastLog := rf.getLastLog()  
   return term > lastLog.Term || (term == lastLog.Term && index >= lastLog.Index)  
}

```


在考虑分布式问题时，我们应该怀有任何环节都有可能出问题的思想，如果不做一些安全性的保证，那最终得到的只是系统崩溃。下面列出leader选举可能出现的问题：
1. RequestVote RPC丢失/失败
2. 其他server down掉
3. 自己down掉
4. 其他server在发送完RequestVote  Response  RPC之后down掉/RequestVote  Response  RPC丢失




# 日志复制
## 日志复制的问题
在raft leader接受到请求之后，会先将command写入到自己的log，然后再将command广播到所有follower，等待超过半数follower写入成功之后，leader才会commit command然后响应客户端。这里面会有两个问题：
1. leader的状态怎么持久化？或者说leader挂了状态怎么恢复？
2. log太长怎么办？
### leader的状态怎么持久化？
提到备份与恢复，无非就是将系统当前的某些状态储存到可靠的介质中而不是储存在内存中，raft论文指出只需要部署如下数据，即可在raft崩溃之后实现状态保存。**所以理论上这些值发生变化的时候，都应当触发一次备份。**
1. currentTerm（当前任期）
2. votedFor（当前任期内的投票）
3. logs（日志）

### log太长怎么办？
常用的方法是保存快照，log无限增长会导致内存爆炸，如果持久化到硬盘，最终会消耗磁盘的大量空间，如果一个服务器重启了，它需要通过重新从头开始执行这数百万条Log来重建自己的状态。当故障重启之后，遍历并执行整个Log的内容可能要花费几个小时来完成。这在某种程度上来说是浪费，因为在重启之前，服务器已经有了一定的应用程序状态。为了应对这种场景，Raft有了快照（Snapshots）的概念。快照背后的思想是，要求应用程序将其状态的拷贝作为一种**特殊的Log条目**存储下来。这里有个有趣的事实，那就是：对于大多数的应用程序来说，应用程序的状态远小于Log的大小。某种程度上我们知道，在某些时间点，Log和应用程序的状态是可以互换的，它们是用来表示应用程序状态的不同事物。但是Log可能包含大量的重复的记录（例如对于X的重复赋值），这些记录使用了Log中的大量的空间，但是同时却压缩到了key-value表单中的一条记录。这在多副本系统中很常见。在这里，如果存储Log，可能尺寸会非常大，相应的，如果存储key-value表单，这可能比Log尺寸小得多。这就是快照的背后原理。

所以，当Raft认为它的Log将会过于庞大，例如大于1MB，10MB或者任意的限制，Raft会要求应用程序在Log的特定位置，对其状态做一个快照。所以，如果Raft要求应用程序做一个快照，Raft会从Log中选取一个与快照对应的点，**然后要求应用程序**在那个点的位置做一个快照。这里极其重要，因为我们接下来将会丢弃所有那个点之前的Log记录。如果我们有一个点的快照，那么我们可以安全的将那个点之前的Log丢弃。（在key-value数据库的例子中）快照本质上就是key-value表单。
不幸的是，这里丢弃了快照之前的Log，引入了大量的复杂性。如果有的Follower的Log较短，在Leader的快照之前就结束，那么除非有一种新的机制，否则那个Follower永远也不可能恢复完整的Log。因为，如果一个Follower只有前两个槽位的Log，Leader不再有槽位3的Log可以通过AppendEntries RPC发给Follower，Follower的Log也就不可能补齐至Leader的Log。
我们可以通过这种方式来避免这个问题：如果Leader发现有任何一个Follower的Log落后于Leader要做快照的点，那么Leader就不丢弃快照之前的Log。Leader原则上是可以知道Follower的Log位置，然后Leader可以不丢弃所有Follower中最短Log之后的本地Log。

这或许是一个短暂的好方法，之所以这个方法不完美的原因在于，如果一个Follower关机了一周，它也就不能确认Log条目，同时也意味着Leader不能通过快照来减少自己的内存消耗（因为那个Follower的Log长度一直没有更新）。

所以，Raft选择的方法是，Leader可以丢弃Follower需要的Log。所以，我们需要某种机制让AppendEntries能处理某些Follower Log的结尾到Leader Log开始之间丢失的这一段Log。解决方法是（一个新的消息类型）InstallSnapshot RPC。
当Follower刚刚恢复，如果它的Log短于Leader通过 AppendEntries RPC发给它的内容，那么它首先会强制Leader回退自己的Log。在某个点，Leader将不能再回退，因为它已经到了自己Log的起点。这时，Leader会将自己的快照发给Follower，之后立即通过AppendEntries将后面的Log发给Follower。






# 日志复制流程分析
在raft leader接受到请求之后，会做两个操作：
## 1. 先将command写入到自己的log。

```go
// leader将请求写入自己的日志
func (rf *Raft) appendNewEntry(command interface{}) Entry {  
   lastLog := rf.getLastLog()  
   newLog := Entry{lastLog.Index + 1, rf.currentTerm, command}  
   rf.logs = append(rf.logs, newLog)  
   rf.matchIndex[rf.me], rf.nextIndex[rf.me] = newLog.Index, newLog.Index+1  
   rf.persist()  
   return newLog  
}

// 然后发送AppendEntries RPC要求followers也将command写入自己的log。
func (rf *Raft) BroadcastHeartbeat(isHeartBeat bool) {  
   for peer := range rf.peers {  
      if peer == rf.me {  
         continue  
      }  
      if isHeartBeat {  
         // need sending at once to maintain leadership  
         go rf.replicateOneRound(peer)  
      } else {  
         // just signal replicator goroutine to send entries in batch  
         rf.replicatorCond[peer].Signal()  
      }  
   }  
}

```
## 2. 然后发送AppendEntries RPC要求followers也将command写入自己的log。
### leader发送log
这里不可能将全部的log都发给followers，所以这里面会有一个问题：从哪里开始发？
leader的nextIndex[]记录了每个follower下次应该发送的log的index。所以应该发送的是： rf.logs[rf.nextIndex[peer]-firstIndex:]
```go

// 产生AppendEntries Request
func (rf *Raft) genAppendEntriesRequest(prevLogIndex int) *AppendEntriesRequest {  
   firstIndex := rf.getFirstLog().Index  
   entries := make([]Entry, len(rf.logs[prevLogIndex+1-firstIndex:]))  
   copy(entries, rf.logs[prevLogIndex+1-firstIndex:]) // todo 为什么是这样？  
   return &AppendEntriesRequest{  
      Term:         rf.currentTerm,  
      LeaderId:     rf.me,  
      PrevLogIndex: prevLogIndex,  
      PrevLogTerm:  rf.logs[prevLogIndex-firstIndex].Term,  
      Entries:      entries,  
      LeaderCommit: rf.commitIndex,  
   }  
}

// 处理rpc结果
func (rf *Raft) handleAppendEntriesResponse(peer int, request *AppendEntriesRequest, response *AppendEntriesResponse) {  
   if rf.state == StateLeader && rf.currentTerm == request.Term {  
      if response.Success {  
         rf.matchIndex[peer] = request.PrevLogIndex + len(request.Entries)  
         rf.nextIndex[peer] = rf.matchIndex[peer] + 1  
         rf.advanceCommitIndexForLeader()  
      } else {  
         if response.Term > rf.currentTerm {  
            rf.ChangeState(StateFollower)  
            rf.currentTerm, rf.votedFor = response.Term, -1  
            rf.persist()  
         } else if response.Term == rf.currentTerm {  
            rf.nextIndex[peer] = response.ConflictIndex  
            if response.ConflictTerm != -1 {  
               firstIndex := rf.getFirstLog().Index  
               for i := request.PrevLogIndex; i >= firstIndex; i-- {  
                  if rf.logs[i-firstIndex].Term == response.ConflictTerm {  
                     rf.nextIndex[peer] = i + 1  
                     break  
                  }  
               }  
            }  
         }  
      }  
   }  
   DPrintf("{Node %v}'s state is {state %v,term %v,commitIndex %v,lastApplied %v,firstLog %v,lastLog %v} after handling AppendEntriesResponse %v for AppendEntriesRequest %v", rf.me, rf.state, rf.currentTerm, rf.commitIndex, rf.lastApplied, rf.getFirstLog(), rf.getLastLog(), response, request)  
}


// used to compute and advance commitIndex by matchIndex[]  
func (rf *Raft) advanceCommitIndexForLeader() {  
   n := len(rf.matchIndex)  
   srt := make([]int, n)  
   copy(srt, rf.matchIndex)  
   insertionSort(srt)  
   newCommitIndex := srt[n-(n/2+1)]  
   if newCommitIndex > rf.commitIndex {  
      // only advance commitIndex for current term's log  
      // 只允许提交当前term的log，为了防止什么？
      if rf.matchLog(rf.currentTerm, newCommitIndex) {  
         DPrintf("{Node %d} advance commitIndex from %d to %d with matchIndex %v in term %d", rf.me, rf.commitIndex, newCommitIndex, rf.matchIndex, rf.currentTerm)  
         rf.commitIndex = newCommitIndex  
         rf.applyCond.Signal()  
      } else {  
         DPrintf("{Node %d} can not advance commitIndex from %d because the term of newCommitIndex %d is not equal to currentTerm %d", rf.me, rf.commitIndex, newCommitIndex, rf.currentTerm)  
      }  
   }  
}
```

### follower接收log

```go
func (rf *Raft) AppendEntries(request *AppendEntriesRequest, response *AppendEntriesResponse) {  
   rf.mu.Lock()  
   defer rf.mu.Unlock()  
   defer rf.persist()  
   defer DPrintf("{Node %v}'s state is {state %v,term %v,commitIndex %v,lastApplied %v,firstLog %v,lastLog %v} before processing AppendEntriesRequest %v and reply AppendEntriesResponse %v", rf.me, rf.state, rf.currentTerm, rf.commitIndex, rf.lastApplied, rf.getFirstLog(), rf.getLastLog(), request, response)  
  
   if request.Term < rf.currentTerm {  
      response.Term, response.Success = rf.currentTerm, false  
      return   }  
  
   if request.Term > rf.currentTerm {  
      rf.currentTerm, rf.votedFor = request.Term, -1  
   }  
  
   rf.ChangeState(StateFollower)  
   rf.electionTimer.Reset(RandomizedElectionTimeout())  
  
   if request.PrevLogIndex < rf.getFirstLog().Index {  
      response.Term, response.Success = 0, false  
      DPrintf("{Node %v} receives unexpected AppendEntriesRequest %v from {Node %v} because prevLogIndex %v < firstLogIndex %v", rf.me, request, request.LeaderId, request.PrevLogIndex, rf.getFirstLog().Index)  
      return  
   }  
  
   if !rf.matchLog(request.PrevLogTerm, request.PrevLogIndex) {  
      response.Term, response.Success = rf.currentTerm, false  
      lastIndex := rf.getLastLog().Index  
      if lastIndex < request.PrevLogIndex {  
         response.ConflictTerm, response.ConflictIndex = -1, lastIndex+1  
      } else {  
         firstIndex := rf.getFirstLog().Index  
         response.ConflictTerm = rf.logs[request.PrevLogIndex-firstIndex].Term  
         index := request.PrevLogIndex - 1  
         for index >= firstIndex && rf.logs[index-firstIndex].Term == response.ConflictTerm {  
            index--  
         }  
         response.ConflictIndex = index  
      }  
      return  
   }  
  
   firstIndex := rf.getFirstLog().Index  
   for index, entry := range request.Entries {  
      if entry.Index-firstIndex >= len(rf.logs) || rf.logs[entry.Index-firstIndex].Term != entry.Term {  
         rf.logs = shrinkEntriesArray(append(rf.logs[:entry.Index-firstIndex], request.Entries[index:]...))  
         break  
      }  
   }  
  
   rf.advanceCommitIndexForFollower(request.LeaderCommit)  
  
   response.Term, response.Success = rf.currentTerm, true  
}
```
