/**
 * @see https://theme-plume.vuejs.press/config/navigation/ 查看文档了解配置详情
 *
 * Navbar 配置文件，它在 `.vuepress/plume.config.ts` 中被导入。
 */

import { defineNavbarConfig } from 'vuepress-theme-plume'
import { lineIcon, topicIcons } from './theme/icons/topic-icons'

const icons = {
  home: lineIcon('<path d="m3 10 9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>'),
  blog: lineIcon('<path d="M4 19.5V5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-1.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/><path d="M8 15h5"/>'),
  notes: lineIcon('<path d="M12 7v14"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H12V5H6.5A2.5 2.5 0 0 0 4 7.5v12Z"/><path d="M20 19.5A2.5 2.5 0 0 0 17.5 17H12V5h5.5A2.5 2.5 0 0 1 20 7.5v12Z"/>'),
  allNotes: lineIcon('<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>'),
  kubernetes: topicIcons['kubernetes'],
  ai: topicIcons['ai-infra'],
  languages: topicIcons['program-language'],
  fundamentals: topicIcons['basic-knowledge'],
  travel: lineIcon('<path d="M9 18 3 21V6l6-3 6 3 6-3v15l-6 3-6-3Z"/><path d="M9 3v15"/><path d="M15 6v15"/>'),
  guide: lineIcon('<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/>'),
  linux: topicIcons['linux'],
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
      { text: 'Kubernetes', link: '/notes/kubernetes/', icon: icons.kubernetes },
      { text: 'AI Infra', link: '/notes/ai-infra/', icon: icons.ai },
      { text: 'Linux', link: '/notes/linux/', icon: icons.linux },
      { text: '编程语言', link: '/notes/program-language/', icon: icons.languages },
      { text: '基础知识', link: '/notes/basic-knowledge/', icon: icons.fundamentals },
    ]
  },
  {
    text: '旅行时光',
    icon: icons.travel,
    items: [
      { text: '旅行足迹', link: '/travel/', icon: icons.travel },
      { text: '旅行攻略', link: '/travel/guides/', icon: icons.guide },
    ],
  },
])

export const enNavbar = defineNavbarConfig([
  { text: 'Home', link: '/en/', icon: icons.home },
  { text: 'Blog', link: '/en/blog/', icon: icons.blog },
  {
    text: 'Technical Notes',
    icon: icons.notes,
    items: [
      { text: 'All Notes', link: '/en/notes/', icon: icons.allNotes },
      { text: 'Kubernetes', link: '/en/notes/kubernetes/', icon: icons.kubernetes },
      { text: 'AI Infra', link: '/en/notes/ai-infra/', icon: icons.ai },
      { text: 'Linux', link: '/en/notes/linux/', icon: icons.linux },
      { text: 'Programming Languages', link: '/en/notes/program-language/', icon: icons.languages },
      { text: 'Fundamentals', link: '/en/notes/basic-knowledge/', icon: icons.fundamentals },
    ],
  },
  {
    text: 'Travel',
    icon: icons.travel,
    items: [
      { text: 'Travel Map', link: '/en/travel/', icon: icons.travel },
      { text: 'Travel Guides', link: '/en/travel/guides/', icon: icons.guide },
    ],
  },
])
