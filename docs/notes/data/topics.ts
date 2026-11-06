import type { NoteTopicDefinition } from './types'

// 只维护专题介绍；文章、数量和日期由构建时的笔记索引自动生成。
export const noteTopics: Record<'zh' | 'en', NoteTopicDefinition[]> = {
  zh: [
    {
      id: 'kubernetes',
      title: 'Kubernetes',
      description: '集群基础、网络、扩展与工作负载身份。',
    },
    {
      id: 'linux',
      title: 'Linux',
      description: '进程、文件系统与容器原理。',
    },
    {
      id: 'ai-infra',
      title: 'AI Infra',
      description: 'GPU 资源管理、设备分配与虚拟化。',
    },
    {
      id: 'program-language',
      title: '编程语言',
      description: 'Go、C、运行时与常用库。',
    },
    {
      id: 'basic-knowledge',
      title: '基础知识',
      description: '网络协议、HTTPS 与证书。',
    },
  ],
  en: [
    {
      id: 'kubernetes',
      title: 'Kubernetes',
      description: 'Cluster fundamentals, networking, extensions, and workload identity.',
    },
    {
      id: 'linux',
      title: 'Linux',
      description: 'Processes, filesystems, and container internals.',
    },
    {
      id: 'ai-infra',
      title: 'AI Infra',
      description: 'GPU resources, device allocation, and virtualization.',
    },
    {
      id: 'program-language',
      title: 'Programming Languages',
      description: 'Go, C, runtimes, and common libraries.',
    },
    {
      id: 'basic-knowledge',
      title: 'Fundamentals',
      description: 'Network protocols, HTTPS, and certificates.',
    },
  ],
}
