/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export const zhNavbar = defineNavbarConfig([
  { text: '🏡首页', link: '/' },
  { text: '📝随心博客', link: '/blog/' },
  // { text: '🔖标签', link: '/blog/tags/' },
  // { text: '🗃️归档', link: '/blog/archives/' },
  // { text: '🕹️分类', link: '/blog/categories/' },
  {
    text: '📚技术笔记',
    items: [
      { text: '全部笔记', link: '/notes/README.md' },
      { text: 'K8s', link: '/notes/k8s/README.md' },
      { text: 'AI', link: '/notes/ai/README.md' },
    ]
  },
  { text: '🏖️旅行时光', link: '/notes/travel/README.md' },
])

export const enNavbar = defineNavbarConfig([
  { text: 'Home', link: '/en/' },
  { text: 'Blog', link: '/en/blog/' },
  {
    text: 'Notes',
    items: [
      { text: 'All Notes', link: '/en/notes/README.md' },
      { text: 'K8s', link: '/en/notes/k8s/README.md' },
      { text: 'AI', link: '/en/notes/ai/README.md' },
    ]
  },
  { text: 'Travel', link: '/en/notes/travel/README.md' },
])
