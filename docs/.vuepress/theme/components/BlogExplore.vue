<script setup lang="ts">
import type { ThemePostsItem } from 'vuepress-theme-plume/shared'
import { computed, ref } from 'vue'
import { useRoute } from 'vuepress/client'
import { VPLink, useData, usePostsCategory, useTagColors } from 'vuepress-theme-plume/client'
import VPCategories from 'vuepress-theme-plume/components/Posts/VPCategories.vue'
import ThemeCategories from 'vuepress-theme-plume/components/Posts/VPPostsCategories.vue'
import ThemeTags from 'vuepress-theme-plume/components/Posts/VPPostsTags.vue'
import ThemeArchives from 'vuepress-theme-plume/components/Posts/VPPostsArchives.vue'
import { postDate, useBlogData } from '../blog-data'
import BlogArticleRows from './BlogArticleRows.vue'

const { page } = useData()
const route = useRoute()
const { copy, locale, isBlog, posts, tags } = useBlogData()
const { categories: categoryTree } = usePostsCategory()
const tagColors = useTagColors()
const view = computed(() => page.value.type === 'posts-tags' ? 'tags' : page.value.type === 'posts-archives' ? 'archives' : 'categories')
const legacyView = computed(() => ({ categories: ThemeCategories, tags: ThemeTags, archives: ThemeArchives })[view.value])
const filterKey = computed(() => ({ categories: 'id', tags: 'tag', archives: 'year' })[view.value])
const selected = computed(() => {
  const value = route.query[filterKey.value]
  return typeof value === 'string' ? value : ''
})

function filterLink(value = '') {
  return value ? `${route.path}?${filterKey.value}=${encodeURIComponent(value)}` : route.path
}

const tagSearch = ref('')
const visibleTags = computed(() => tags.value.filter(tag => tag.name.toLocaleLowerCase(locale.value).includes(tagSearch.value.trim().toLocaleLowerCase(locale.value))))
const filteredPosts = computed(() => posts.value.filter((post) => {
  if (view.value === 'categories' || !selected.value)
    return true
  if (view.value === 'tags')
    return post.tags?.includes(selected.value)
  return (postDate(post.createTime).slice(0, 4) || 'undated') === selected.value
}))
const resultTitle = computed(() => selected.value || copy.value.allArticles)

const years = computed(() => {
  const counts = new Map<string, number>()
  for (const post of posts.value) {
    const year = postDate(post.createTime).slice(0, 4) || 'undated'
    counts.set(year, (counts.get(year) ?? 0) + 1)
  }
  return [...counts].map(([year, count]) => ({ year, count }))
})
const archiveGroups = computed(() => {
  const groups: { year: string, count: number, months: { month: string, posts: ThemePostsItem[] }[] }[] = []
  for (const post of filteredPosts.value) {
    const date = postDate(post.createTime)
    const year = date.slice(0, 4) || 'undated'
    const month = date.slice(5, 7)
    let yearGroup = groups.find(group => group.year === year)
    if (!yearGroup) {
      yearGroup = { year, count: 0, months: [] }
      groups.push(yearGroup)
    }
    yearGroup.count++
    let monthGroup = yearGroup.months.find(group => group.month === month)
    if (!monthGroup) {
      monthGroup = { month, posts: [] }
      yearGroup.months.push(monthGroup)
    }
    monthGroup.posts.push(post)
  }
  return groups
})

function monthLabel(month: string) {
  return month ? new Intl.DateTimeFormat(locale.value, { month: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(2000, Number(month) - 1, 1))) : copy.value.unknownDate
}
</script>

<template>
  <div v-if="isBlog" class="blog-explore" :class="`explore-${view}`">
    <h1 class="explore-title">{{ copy[view] }}</h1>

    <section v-if="view === 'categories'" class="category-tree-panel" :aria-label="copy.browseCategories">
      <VPCategories :items="categoryTree" :depth="0" />
    </section>

    <section v-else-if="view === 'tags'" class="tag-filter-panel" :aria-label="copy.browseTags">
      <div class="tag-toolbar">
        <span>{{ copy.tagOrder }}</span>
        <label class="tag-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>
          <input v-model="tagSearch" type="search" :placeholder="copy.searchTags" :aria-label="copy.searchTags">
        </label>
      </div>
      <nav class="explore-chips" :aria-label="copy.browseTags">
        <VPLink :href="filterLink()" :class="{ active: !selected }" :aria-current="!selected ? 'page' : undefined" @click="tagSearch = ''">{{ copy.all }} <span>{{ posts.length }}</span></VPLink>
        <VPLink v-for="tag in visibleTags" :key="tag.name" :href="filterLink(tag.name)" class="colored-tag" :class="[tagColors[tag.name] ? `vp-tag-${tagColors[tag.name]}` : '', { active: selected === tag.name }]" :aria-current="selected === tag.name ? 'page' : undefined">{{ tag.name }} <span>{{ tag.count }}</span></VPLink>
      </nav>
      <p v-if="!visibleTags.length" class="filter-empty" role="status">{{ copy.noTags }}</p>
    </section>

    <nav v-else class="explore-chips archive-filters" :aria-label="copy.archives">
      <VPLink :href="filterLink()" :class="{ active: !selected }" :aria-current="!selected ? 'page' : undefined">{{ copy.allYears }} <span>{{ posts.length }}</span></VPLink>
      <VPLink v-for="item in years" :key="item.year" :href="filterLink(item.year)" :class="{ active: selected === item.year }" :aria-current="selected === item.year ? 'page' : undefined">{{ item.year === 'undated' ? copy.unknownDate : item.year }} <span>{{ item.count }}</span></VPLink>
    </nav>

    <section v-if="view === 'tags' && selected" class="explore-results">
      <div class="results-heading">
        <h2>{{ resultTitle }} <span aria-live="polite">{{ copy.count(filteredPosts.length) }}</span></h2>
        <VPLink v-if="selected" :href="filterLink()" class="clear-filter">{{ copy.clear }}</VPLink>
      </div>
      <BlogArticleRows :posts="filteredPosts" />
    </section>

    <section v-for="group in view === 'archives' ? archiveGroups : []" :key="group.year" class="archive-year">
      <div class="year-heading"><h2>{{ group.year === 'undated' ? copy.unknownDate : group.year }}</h2><span>{{ copy.count(group.count) }}</span></div>
      <div v-for="month in group.months" :key="month.month" class="archive-month">
        <h3 class="month-label">{{ monthLabel(month.month) }}<span>{{ copy.count(month.posts.length) }}</span></h3>
        <BlogArticleRows :posts="month.posts" compact />
      </div>
    </section>

    <div v-if="!filteredPosts.length" class="explore-empty" role="status">
      <h2>{{ copy.noArticles }}</h2><p>{{ copy.emptyHint }}</p>
      <VPLink :href="filterLink()">{{ copy.allArticles }} →</VPLink>
    </div>
  </div>
  <component :is="legacyView" v-else />
</template>

<style scoped>
.blog-explore {
  display: flex;
  flex: 1 2;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
}

.category-tree-panel, .tag-filter-panel, .archive-year, .explore-empty {
  padding: 24px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
}

.explore-title {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  white-space: nowrap;
  clip-path: inset(50%);
}

.explore-chips a {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  min-height: 36px;
  padding: 7px 12px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border: 1px solid transparent;
  border-radius: 7px;
  overflow-wrap: anywhere;
  transition: color var(--vp-t-color), background-color var(--vp-t-color), border-color var(--vp-t-color);
}

.explore-chips a span {
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  opacity: 0.8;
}

.explore-chips a.active {
  font-weight: 600;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-2);
}

.explore-chips a:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-2);
}

.category-tree-panel > :deep(.vp-categories) {
  padding: 0;
  margin: 0;
}

.category-tree-panel :deep(.vp-categories-item) {
  margin: 2px 0;
  font-size: 14px;
}

.category-tree-panel :deep(.vp-category-group .folder) {
  min-height: 30px;
  padding: 3px 8px;
  margin: 2px 0;
  font-size: 16px;
  color: var(--vp-c-text-1);
  border-radius: 6px;
}

.category-tree-panel :deep(.vp-category-group .folder .icon) {
  flex-shrink: 0;
  color: var(--vp-c-brand-1);
}

.category-tree-panel :deep(.vp-category-group::after) {
  top: 32px;
  left: 16px;
}

.category-tree-panel :deep(.vp-category-group > .group) {
  margin-left: 28px;
}

.category-tree-panel :deep(.vp-categories-item .post) {
  gap: 10px;
  align-items: flex-start;
  width: 100%;
  min-height: 28px;
  padding: 3px 8px;
  line-height: 1.5;
  border-radius: 6px;
}

.category-tree-panel :deep(.vp-categories-item .post .vpi-post) {
  flex-shrink: 0;
  margin-top: 4px;
  margin-right: 0;
  color: var(--vp-c-text-3);
}

.category-tree-panel :deep(.vp-categories-item .post .vp-link) {
  display: block;
  overflow-wrap: anywhere;
}

.category-tree-panel :deep(.folder:hover), .category-tree-panel :deep(.post:hover) {
  background: var(--vp-c-bg-soft);
}


.tag-filter-panel .explore-chips a.colored-tag {
  color: var(--vp-tag-color, var(--vp-c-brand-1));
  color: color-mix(in srgb, var(--vp-tag-color, var(--vp-c-brand-1)) 75%, var(--vp-c-text-1));
  background: var(--vp-tag-bg, var(--vp-c-brand-soft));
  border-color: transparent;
}

.tag-filter-panel .explore-chips a.colored-tag:hover,
.tag-filter-panel .explore-chips a.colored-tag.active {
  border-color: currentcolor;
}

.tag-filter-panel .explore-chips a.colored-tag.active {
  box-shadow: inset 0 0 0 1px currentcolor;
}

.tag-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.tag-search {
  display: flex;
  gap: 8px;
  align-items: center;
  width: 210px;
  max-width: 100%;
  padding: 8px 10px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
}

.tag-search:focus-within {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.tag-search svg {
  flex-shrink: 0;
}

.tag-search input {
  width: 100%;
  min-width: 0;
  font: inherit;
  color: var(--vp-c-text-1);
  background: transparent;
  border: 0;
  outline: 0;
}

.explore-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.explore-chips a {
  max-width: 100%;
}

.filter-empty {
  margin: 16px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.results-heading {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.results-heading h2 {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  align-items: baseline;
  min-width: 0;
  margin: 0;
  font-size: 18px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}

.results-heading h2 span, .clear-filter {
  font-size: 12px;
  font-weight: 400;
  color: var(--vp-c-text-2);
}

.clear-filter {
  flex-shrink: 0;
  color: var(--vp-c-brand-1);
}

.archive-filters a {
  background: var(--vp-c-bg);
  border-color: var(--vp-c-divider);
}

.year-heading {
  display: flex;
  gap: 12px;
  align-items: baseline;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.year-heading h2 {
  margin: 0;
  font-size: 26px;
  font-weight: 650;
  line-height: 1.4;
  font-variant-numeric: tabular-nums;
}

.year-heading > span {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.archive-month {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 24px;
  margin-top: 20px;
}

.month-label {
  margin: 12px 0 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.month-label span {
  display: block;
  margin-top: 4px;
  font-size: 11px;
  font-weight: 400;
  color: var(--vp-c-text-2);
}

.archive-month :deep(.blog-article-rows) {
  padding-left: 20px;
  border-left: 1px solid var(--vp-c-divider);
}

.explore-empty {
  padding: 40px 20px;
  text-align: center;
}

.explore-empty h2 {
  margin: 0;
  font-size: 18px;
}

.explore-empty p {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.explore-empty a {
  display: inline-block;
  margin-top: 12px;
  font-size: 13px;
  color: var(--vp-c-brand-1);
}

.blog-explore :deep(a:focus-visible), .blog-explore :deep(button:focus-visible) {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}


@media (max-width: 1199px) {
  .archive-month {
    grid-template-columns: 72px minmax(0, 1fr);
    gap: 12px;
  }

}

@media (max-width: 767px) {
  .blog-explore {
    gap: 18px;
  }

  .category-tree-panel, .tag-filter-panel, .archive-year {
    padding: 18px 16px;
  }

  .category-tree-panel :deep(.vp-category-group > .group) {
    margin-left: 18px;
  }

  .category-tree-panel :deep(.vp-category-group .folder) {
    font-size: 15px;
  }


  .archive-month {
    grid-template-columns: minmax(0, 1fr);
    gap: 6px;
  }

  .month-label {
    display: flex;
    gap: 10px;
    align-items: baseline;
    margin: 0;
  }

  .month-label span {
    margin: 0;
  }

  .archive-month :deep(.blog-article-rows) {
    padding-left: 0;
    border-left: 0;
  }

  .tag-search {
    flex: 1 1 180px;
  }

}
</style>
