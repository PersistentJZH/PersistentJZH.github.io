<script setup lang="ts">
import type { ThemePostsItem } from 'vuepress-theme-plume/shared'
import { computed } from 'vue'
import { useRoute } from 'vuepress/client'
import { VPLink } from 'vuepress-theme-plume/client'
import { postDate, useBlogData } from '../blog-data'

interface ArchiveMonth {
  month: string
  posts: ThemePostsItem[]
}

interface ArchiveYear {
  year: string
  count: number
  months: ArchiveMonth[]
}

const route = useRoute()
const { copy, locale, posts } = useBlogData()
const selectedYear = computed(() => typeof route.query.year === 'string' ? route.query.year : '')
const years = computed(() => {
  const groups = new Map<string, ArchiveYear>()
  for (const post of posts.value) {
    const date = postDate(post.createTime)
    const year = date.slice(0, 4) || 'undated'
    const month = date.slice(5, 7)
    if (!groups.has(year))
      groups.set(year, { year, count: 0, months: [] })
    const group = groups.get(year)!
    group.count++
    let monthGroup = group.months.find(item => item.month === month)
    if (!monthGroup) {
      monthGroup = { month, posts: [] }
      group.months.push(monthGroup)
    }
    monthGroup.posts.push(post)
  }
  return [...groups.values()]
})
const visibleYears = computed(() => years.value.filter(group => !selectedYear.value || group.year === selectedYear.value))

function filterLink(year = '') {
  return year ? `${route.path}?year=${encodeURIComponent(year)}` : route.path
}

function yearLabel(year: string) {
  return year === 'undated' ? copy.value.unknownDate : year
}

function monthLabel(month: string) {
  return month
    ? new Intl.DateTimeFormat(locale.value, { month: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(2000, Number(month) - 1, 1)))
    : copy.value.unknownDate
}
</script>

<template>
  <div class="blog-archives">
    <h1 class="archive-title">{{ copy.archiveTitle }}</h1>
    <nav class="archive-filters" :aria-label="copy.allYears">
      <VPLink :href="filterLink()" :class="{ active: !selectedYear }" :aria-current="!selectedYear ? 'page' : undefined">
        {{ copy.allYears }} <span>{{ posts.length }}</span>
      </VPLink>
      <VPLink v-for="group in years" :key="group.year" :href="filterLink(group.year)" :class="{ active: selectedYear === group.year }" :aria-current="selectedYear === group.year ? 'page' : undefined">
        {{ yearLabel(group.year) }} <span>{{ group.count }}</span>
      </VPLink>
    </nav>

    <div v-if="visibleYears.length" class="archive-timeline">
      <section v-for="(group, index) in visibleYears" :key="group.year" class="archive-year" :aria-labelledby="`archive-year-${group.year}`">
        <header class="year-heading">
          <h2 :id="`archive-year-${group.year}`">{{ yearLabel(group.year) }}</h2>
          <span class="year-count">{{ copy.count(group.count) }}</span>
          <span v-if="index === 0" class="archive-order">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 4v16m-4-4 4 4 4-4M14 5h7m-7 5h5m-5 5h3" /></svg>
            {{ copy.archiveOrder }}
          </span>
        </header>
        <div class="year-months">
          <section v-for="month in group.months" :key="month.month" class="archive-month" :aria-labelledby="`archive-month-${group.year}-${month.month}`">
            <header class="month-heading">
              <h3 :id="`archive-month-${group.year}-${month.month}`">{{ monthLabel(month.month) }}</h3>
              <span>{{ copy.count(month.posts.length) }}</span>
            </header>
            <ul class="archive-posts">
              <li v-for="post in month.posts" :key="post.path">
                <VPLink :href="post.path" class="archive-post">
                  <time v-if="postDate(post.createTime)" class="post-day" :datetime="postDate(post.createTime)" :aria-label="postDate(post.createTime)">{{ postDate(post.createTime).slice(8, 10) }}</time>
                  <span v-else class="post-day" :aria-label="copy.unknownDate">—</span>
                  <span class="post-title">{{ post.title }}</span>
                  <span v-if="post.tags?.length" class="post-tag">{{ post.tags[0] }}</span>
                  <span class="post-reading"><template v-if="post.readingTime">{{ copy.reading(Math.max(1, Math.round(post.readingTime.minutes))) }}</template></span>
                  <span class="vpi-chevron-right post-arrow" aria-hidden="true" />
                </VPLink>
              </li>
            </ul>
          </section>
        </div>
      </section>
    </div>

    <section v-else class="archive-empty" role="status">
      <h2>{{ copy.noArticles }}</h2>
      <p>{{ copy.archiveEmpty }}</p>
      <VPLink :href="filterLink()">{{ copy.allYears }} →</VPLink>
    </section>
  </div>
</template>

<style scoped>
.blog-archives {
  display: flex;
  flex: 1 2;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
}

.archive-timeline, .archive-empty {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
}

.archive-title {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  white-space: nowrap;
  clip-path: inset(50%);
}

.archive-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.archive-filters a {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  min-height: 44px;
  padding: 10px 0;
  margin-bottom: -1px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  border-bottom: 2px solid transparent;
  transition: color var(--vp-t-color), border-color var(--vp-t-color);
}

.archive-filters a span {
  padding: 0 6px;
  font-size: 10px;
  line-height: 18px;
  font-variant-numeric: tabular-nums;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.archive-filters a.active, .archive-filters a:hover {
  color: var(--vp-c-brand-1);
}

.archive-filters a.active {
  font-weight: 600;
  border-bottom-color: var(--vp-c-brand-1);
}

.archive-filters a.active span {
  background: var(--vp-c-brand-soft);
}

.archive-timeline {
  padding: 8px 32px 28px;
}

.archive-year + .archive-year {
  margin-top: 24px;
  border-top: 1px solid var(--vp-c-divider);
}

.year-heading {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  align-items: center;
  padding: 24px 0;
}

.year-heading h2 {
  margin: 0;
  font-size: 30px;
  font-weight: 650;
  line-height: 1.2;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
}

.year-count {
  padding: 3px 8px;
  font-size: 11px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border-radius: 5px;
}

.archive-order {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  margin-left: auto;
  font-size: 11px;
  color: var(--vp-c-text-2);
}

.year-months {
  margin-left: 5px;
  border-left: 1px solid var(--vp-c-divider);
}

.archive-month {
  position: relative;
  display: grid;
  grid-template-columns: 84px minmax(0, 1fr);
  gap: 16px;
  padding-left: 24px;
}

.archive-month + .archive-month {
  padding-top: 20px;
}

.month-heading {
  position: relative;
  padding-top: 16px;
}

.month-heading::before {
  position: absolute;
  top: 21px;
  left: -29px;
  width: 9px;
  height: 9px;
  content: '';
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-brand-2);
  border-radius: 50%;
}

.month-heading h3 {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--vp-c-brand-1);
}

.month-heading > span {
  display: block;
  margin-top: 5px;
  font-size: 10px;
  color: var(--vp-c-text-2);
}

.archive-posts {
  min-width: 0;
  padding: 0;
  margin: 0;
  list-style: none;
}

.archive-posts li + li {
  border-top: 1px solid var(--vp-c-divider);
}

.archive-post {
  display: flex;
  gap: 14px;
  align-items: center;
  min-height: 56px;
  padding: 14px 10px;
  border-radius: 6px;
  transition: background-color var(--vp-t-color), color var(--vp-t-color);
}

.archive-post:hover {
  background: var(--vp-c-bg-soft);
}

.post-day {
  flex: 0 0 22px;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}

.post-title {
  flex: 1;
  min-width: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.7;
  color: var(--vp-c-text-1);
  overflow-wrap: anywhere;
  transition: color var(--vp-t-color);
}

.archive-post:hover .post-title, .archive-post:hover .post-arrow {
  color: var(--vp-c-brand-1);
}

.post-tag {
  flex-shrink: 0;
  max-width: 100px;
  padding: 2px 7px;
  overflow: hidden;
  font-size: 10px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  text-overflow: ellipsis;
  white-space: nowrap;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.post-reading {
  flex: 0 0 65px;
  font-size: 11px;
  color: var(--vp-c-text-2);
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.post-arrow {
  flex-shrink: 0;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.blog-archives a:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

.archive-empty {
  padding: 48px 24px;
  text-align: center;
}

.archive-empty h2 {
  margin: 0;
  font-size: 18px;
}

.archive-empty p {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.archive-empty a {
  display: inline-block;
  margin-top: 12px;
  font-size: 13px;
  color: var(--vp-c-brand-1);
}

@media (max-width: 1199px) {
  .archive-timeline {
    padding-right: 24px;
    padding-left: 24px;
  }

  .post-tag {
    display: none;
  }
}

@media (max-width: 767px) {
  .archive-filters {
    column-gap: 20px;
  }

  .archive-timeline {
    padding: 0 20px 24px;
  }

  .year-heading {
    padding: 22px 0;
  }

  .year-heading h2 {
    font-size: 27px;
  }

  .archive-month {
    grid-template-columns: minmax(0, 1fr);
    gap: 4px;
    padding-left: 18px;
  }

  .month-heading {
    display: flex;
    gap: 10px;
    align-items: baseline;
    padding-top: 0;
  }

  .month-heading::before {
    top: 5px;
    left: -23px;
  }

  .month-heading > span {
    margin-top: 0;
  }

  .archive-post {
    gap: 10px;
    padding: 12px 0;
  }

  .post-title {
    font-size: 13px;
  }

  .post-day {
    flex-basis: 20px;
  }

  .post-reading {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .archive-filters a, .archive-post, .post-title {
    transition: none;
  }
}
</style>
