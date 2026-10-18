/**
 * 集合配置，在 `plume.config.ts` 中被导入。
 *
 * - `post` 集合：博客、专栏等文章列表类内容
 * - `doc` 集合：笔记、文档等带侧边栏的结构化内容
 *
 * @see https://theme-plume.vuejs.press/config/collections/
 */
import { defineCollections } from 'vuepress-theme-plume'

/* =================== locale: zh-CN ======================= */

export const zhCollections = defineCollections([
  {
    type: 'post',
    dir: 'blog',
    title: '博客',
    link: '/blog/',
    linkPrefix: '/article/',
    tagsLink: '/blog/tags/',
    archivesLink: '/blog/archives/',
    categoriesLink: '/blog/categories/',
    pagination: 15,
  },

  {
    type: 'doc',
    dir: 'kubernetes',
    title: 'Kubernetes',
    linkPrefix: '/k8s/',
    sidebar: 'auto',
  },
  {
    type: 'doc',
    dir: 'ai-infra',
    title: 'AI Infra',
    linkPrefix: '/ai-infra/',
    sidebar: 'auto',
  },
  {
    type: 'doc',
    dir: 'program-language',
    title: 'Languages',
    linkPrefix: '/program-language/',
    sidebar: 'auto',
  },
  {
    type: 'doc',
    dir: 'linux',
    title: 'Linux',
    linkPrefix: '/linux/',
    sidebar: 'auto',
  },
  {
    type: 'doc',
    dir: 'basic-knowledge',
    title: '基础知识',
    linkPrefix: '/basic-knowledge/',
    sidebar: 'auto',
  },
  {
    type: 'doc',
    dir: 'travel',
    title: '旅行',
    linkPrefix: '/travel/',
    // 旅行页使用全屏地图，不需要侧边栏
  },
])

/* =================== locale: en-US ======================= */

export const enCollections = defineCollections([
  {
    type: 'post',
    dir: 'blog',
    title: 'Blog',
    link: '/blog/',
    linkPrefix: '/article/',
    tagsLink: '/blog/tags/',
    archivesLink: '/blog/archives/',
    categoriesLink: '/blog/categories/',
    pagination: 15,
  },

  {
    type: 'doc',
    dir: 'demo',
    title: 'Demo',
    linkPrefix: '/demo/',
    sidebar: ['', 'foo', 'bar'],
  },
  // 英文笔记的源目录已提升到 docs/en/*，为保持既有 URL，
  // 页面链接前缀仍保留 /en/notes/*。
  {
    type: 'doc',
    dir: 'k8s',
    title: 'K8s',
    linkPrefix: '/notes/k8s/',
    sidebar: 'auto',
  },
  {
    type: 'doc',
    dir: 'ai',
    title: 'AI',
    linkPrefix: '/notes/ai/',
    sidebar: 'auto',
  },
  {
    type: 'doc',
    dir: 'travel',
    title: 'Travel',
    linkPrefix: '/notes/travel/',
    // 英文旅行页同样使用全屏地图，不需要侧边栏
  },
])
