/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'

const lineIcon = (body: string) => ({
  svg: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`,
})

const icons = {
  home: lineIcon('<path d="m3 10 9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>'),
  blog: lineIcon('<path d="M4 19.5V5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-1.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/><path d="M8 15h5"/>'),
  notes: lineIcon('<path d="M12 7v14"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H12V5H6.5A2.5 2.5 0 0 0 4 7.5v12Z"/><path d="M20 19.5A2.5 2.5 0 0 0 17.5 17H12V5h5.5A2.5 2.5 0 0 1 20 7.5v12Z"/>'),
  allNotes: lineIcon('<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>'),
  kubernetes: lineIcon('<path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z"/><path d="M12 8v8"/><path d="m8 10 8 4"/><path d="m16 10-8 4"/>'),
  ai: lineIcon('<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4"/><path d="M15 2v4"/><path d="M9 18v4"/><path d="M15 18v4"/><path d="M2 9h4"/><path d="M2 15h4"/><path d="M18 9h4"/><path d="M18 15h4"/><path d="M10 12h4"/>'),
  languages: lineIcon('<path d="m8 9-4 3 4 3"/><path d="m16 9 4 3-4 3"/><path d="m14 5-4 14"/>'),
  travel: lineIcon('<path d="M9 18 3 21V6l6-3 6 3 6-3v15l-6 3-6-3Z"/><path d="M9 3v15"/><path d="M15 6v15"/>'),
}

export const zhNavbar = defineNavbarConfig([
  { text: '首页', link: '/', icon: icons.home },
  { text: '随心博客', link: '/blog/', icon: icons.blog },
  // { text: '🔖标签', link: '/blog/tags/' },
  // { text: '🗃️归档', link: '/blog/archives/' },
  // { text: '🕹️分类', link: '/blog/categories/' },
  {
    text: '技术笔记',
    icon: icons.notes,
    items: [
      { text: '全部笔记', link: '/notes/', icon: icons.allNotes },
      { text: 'Kubernetes', link: '/k8s/', icon: icons.kubernetes },
      { text: 'AI Infra', link: '/ai-infra/', icon: icons.ai },
      { text: 'Languages', link: '/program-language/', icon: icons.languages },
    ]
  },
  { text: '旅行时光', link: '/travel/', icon: icons.travel },
])

export const enNavbar = defineNavbarConfig([
  { text: 'Home', link: '/en/' },
  { text: 'Blog', link: '/en/blog/' },
  {
    text: 'Notes',
    items: [
      { text: 'All Notes', link: '/en/notes/' },
      { text: 'Kubernetes', link: '/en/notes/k8s/' },
      { text: 'AI', link: '/en/notes/ai/' },
    ]
  },
  { text: 'Travel', link: '/en/notes/travel/' },
])
