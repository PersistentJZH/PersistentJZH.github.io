/**
 * 集合配置，在 `plume.config.ts` 中被导入。
 *
 * - `post` 集合：博客、专栏等文章列表类内容
 * - `doc` 集合：笔记、文档等带侧边栏的结构化内容
 *
 * @see https://theme-plume.vuejs.press/config/collections/
 */
import { defineCollections } from 'vuepress-theme-plume'
import { englishCategories } from '../../scripts/locale-labels.mjs'
import { englishSidebar } from './english-sidebar'

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
    // 博客列表使用瀑布流卡片，封面图统一放在卡片顶部
    postCover: {
      layout: 'top',
      ratio: '4:3',
    },
  },

  {
    type: 'post',
    dir: 'travel/guides',
    title: '旅行攻略',
    link: '/travel/guides/',
    linkPrefix: '/travel/guides/',
    tagsLink: '/travel/guides/tags/',
    archivesLink: '/travel/guides/archives/',
    categoriesLink: '/travel/guides/categories/',
    pagination: 12,
    meta: {
      readingTime: false,
      wordCount: false,
    },
  },

  {
    type: 'doc',
    dir: 'notes/kubernetes',
    title: 'Kubernetes',
    linkPrefix: '/notes/kubernetes/',
    sidebar: 'auto',
  },
  {
    type: 'doc',
    dir: 'notes/ai-infra',
    title: 'AI Infra',
    linkPrefix: '/notes/ai-infra/',
    sidebar: 'auto',
  },
  {
    type: 'doc',
    dir: 'notes/program-language',
    title: '编程语言',
    linkPrefix: '/notes/program-language/',
    sidebar: 'auto',
  },
  {
    type: 'doc',
    dir: 'notes/linux',
    title: 'Linux',
    linkPrefix: '/notes/linux/',
    sidebar: 'auto',
  },
  {
    type: 'doc',
    dir: 'notes/basic-knowledge',
    title: '基础知识',
    linkPrefix: '/notes/basic-knowledge/',
    sidebar: 'auto',
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
    categoriesTransform: categories => categories.map(category => ({
      ...category, name: englishCategories[category.name] ?? category.name,
    })),
    // 博客列表使用瀑布流卡片，封面图统一放在卡片顶部
    postCover: {
      layout: 'top',
      ratio: '4:3',
    },
  },

  {
    type: 'post',
    dir: 'travel/guides',
    title: 'Travel Guides',
    link: '/travel/guides/',
    linkPrefix: '/travel/guides/',
    tagsLink: '/travel/guides/tags/',
    archivesLink: '/travel/guides/archives/',
    categoriesLink: '/travel/guides/categories/',
    pagination: 12,
    meta: {
      readingTime: false,
      wordCount: false,
    },
  },

  {
    type: 'doc',
    dir: 'notes/kubernetes',
    title: 'Kubernetes',
    linkPrefix: '/notes/kubernetes/',
    sidebar: englishSidebar('kubernetes'),
  },
  {
    type: 'doc',
    dir: 'notes/ai-infra',
    title: 'AI Infra',
    linkPrefix: '/notes/ai-infra/',
    sidebar: englishSidebar('ai-infra'),
  },
  {
    type: 'doc',
    dir: 'notes/program-language',
    title: 'Programming Languages',
    linkPrefix: '/notes/program-language/',
    sidebar: englishSidebar('program-language'),
  },
  {
    type: 'doc',
    dir: 'notes/linux',
    title: 'Linux',
    linkPrefix: '/notes/linux/',
    sidebar: englishSidebar('linux'),
  },
  {
    type: 'doc',
    dir: 'notes/basic-knowledge',
    title: 'Fundamentals',
    linkPrefix: '/notes/basic-knowledge/',
    sidebar: englishSidebar('basic-knowledge'),
  },
])
