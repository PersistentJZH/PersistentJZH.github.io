import type { PostsCategory } from 'vuepress-theme-plume/composables'
import { computed } from 'vue'
import { useData, useLocalePostList, usePostsCategory } from 'vuepress-theme-plume/client'

const messages = {
  zh: {
    articles: '文章', categories: '分类', tags: '标签', archives: '归档',
    all: '全部', allArticles: '全部文章', allTopics: '浏览所有主题',
    browseCategories: '按分类浏览文章', browseTags: '按标签浏览文章',
    categoryHeading: '文章分类', tagHeading: '常用标签',
    allCategories: '查看全部文章分类', allTags: '查看全部标签',
    clear: '清除筛选',
    searchTags: '查找标签…', tagOrder: '按使用频次排列',
    noTags: '没有匹配的标签', noArticles: '暂时没有相关文章',
    emptyHint: '试试其他主题，或返回全部文章。',
    uncategorized: '未分类', unknownDate: '日期未设置', allYears: '全部年份',
    count: (n: number) => `${n} 篇文章`,
    reading: (n: number) => `${n} 分钟`,
  },
  en: {
    articles: 'Articles', categories: 'Categories', tags: 'Tags', archives: 'Archives',
    all: 'All', allArticles: 'All articles', allTopics: 'Explore every topic',
    browseCategories: 'Browse articles by category', browseTags: 'Browse articles by tag',
    categoryHeading: 'Categories', tagHeading: 'Common tags',
    allCategories: 'View all categories', allTags: 'View all tags',
    clear: 'Clear filter',
    searchTags: 'Find a tag…', tagOrder: 'Sorted by frequency',
    noTags: 'No matching tags', noArticles: 'No matching articles',
    emptyHint: 'Try another topic, or return to all articles.',
    uncategorized: 'Uncategorized', unknownDate: 'Undated', allYears: 'All years',
    count: (n: number) => `${n} ${n === 1 ? 'article' : 'articles'}`,
    reading: (n: number) => `${n} min read`,
  },
}

export function postDate(value: string): string {
  const match = value?.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/)
  return match ? `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}` : ''
}

export function useBlogData() {
  const { lang, collection } = useData<'page', 'post'>()
  const locale = computed(() => lang.value.startsWith('zh') ? 'zh-CN' : 'en-US')
  const copy = computed(() => locale.value === 'zh-CN' ? messages.zh : messages.en)
  const isBlog = computed(() => collection.value?.type === 'post' && collection.value.dir === 'blog')
  const sourcePosts = useLocalePostList()
  const posts = computed(() => [...sourcePosts.value].sort((a, b) => postDate(b.createTime).localeCompare(postDate(a.createTime))))
  const { categories: categoryTree } = usePostsCategory()

  const categories = computed(() => {
    const result: { id: string, title: string, depth: number, count: number, parent: string }[] = []
    const countPosts = (items: PostsCategory): number => items.reduce((total, item) => total + (item.type === 'post' ? 1 : countPosts(item.items)), 0)
    function collect(items: PostsCategory, parents: string[] = []) {
      for (const item of items) {
        if (item.type !== 'category')
          continue
        const count = countPosts(item.items)
        if (count)
          result.push({ id: item.id, title: item.title, depth: parents.length, parent: parents.join(' / '), count })
        collect(item.items, [...parents, item.title])
      }
    }
    collect(categoryTree.value)
    return result
  })

  const tags = computed(() => {
    const counts = new Map<string, number>()
    for (const post of posts.value) {
      for (const tag of new Set(post.tags ?? []))
        counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
    return [...counts].map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, locale.value))
  })

  return { copy, locale, isBlog, posts, categories, tags }
}
