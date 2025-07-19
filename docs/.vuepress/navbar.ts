/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

export const zhNavbar = defineNavbarConfig([
  { text: '🏠首页', link: '/' },
  { text: '🏖️博客', link: '/blog/' },
  { text: '⛳️标签', link: '/blog/tags/' },
  { text: '🏆归档', link: '/blog/archives/' },
  { text: '🛶分类', link: '/blog/categories/' },
  {
    text: '🏆笔记',
    link: '/notes/README.md'
  },
  { text: '🏝️旅行', link: '/notes/travel/README.md' },
])

export const enNavbar = defineNavbarConfig([
  { text: 'Home', link: '/en/' },
  { text: 'Blog', link: '/en/blog/' },
  { text: 'Tags', link: '/en/blog/tags/' },
  { text: 'Archives', link: '/en/blog/archives/' },
  {
    text: 'Notes',
    items: [{ text: 'Demo', link: '/en/notes/demo/README.md' }]
  },
  { text: 'Travel', link: '/en/notes/travel/README.md' },
])

