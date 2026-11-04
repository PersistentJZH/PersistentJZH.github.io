<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useId, useTemplateRef } from 'vue'
import { useRoute } from 'vuepress/client'
import { VPLink, useData, useInternalLink, useTagColors } from 'vuepress-theme-plume/client'
import { postDate, useBlogData } from '../blog-data'

const route = useRoute()
const headingId = useId()
const { tags, posts, copy } = useBlogData()
const { tags: tagsLink } = useInternalLink()
const { collection } = useData<'page', 'post'>()
const tagColors = useTagColors()

const MIN_RECENT_POSTS = 5
const recentLimit = ref(MIN_RECENT_POSTS)
const browseRoot = useTemplateRef<HTMLElement>('browseRoot')
const recentLinks = useTemplateRef<HTMLElement>('recentLinks')
const commonTags = computed(() => tags.value.slice(0, 8))
const recentPosts = computed(() => posts.value.slice(0, recentLimit.value))
const postsLink = computed(() => collection.value?.link ?? '/blog/')

let resizeObserver: ResizeObserver | undefined
let resizeFrame = 0

onMounted(() => {
  // 只有桌面侧栏有固定高度；手机弹层保持简短的 5 篇列表。
  const aside = browseRoot.value?.closest<HTMLElement>('.vp-posts-aside')
  if (!aside)
    return

  const scheduleRecentSizing = () => {
    if (resizeFrame)
      return

    resizeFrame = requestAnimationFrame(() => {
      resizeFrame = 0
      const list = recentLinks.value
      const firstLink = list?.querySelector<HTMLElement>('.recent-link')
      if (!list || !firstLink || !aside.clientHeight || !firstLink.offsetHeight)
        return

      // 加回侧栏内部滚动量，使篇数只取决于布局，不随滚动位置变化。
      const listTop = list.getBoundingClientRect().top - aside.getBoundingClientRect().top
        - aside.clientTop + aside.scrollTop
      const bottomPadding = Number.parseFloat(getComputedStyle(aside).paddingBottom) || 0
      const gap = Number.parseFloat(getComputedStyle(list).rowGap) || 0
      const availableHeight = aside.clientHeight - bottomPadding - listTop
      const fittingRows = Math.floor((availableHeight + gap) / (firstLink.offsetHeight + gap))
      recentLimit.value = Math.min(posts.value.length, Math.max(MIN_RECENT_POSTS, fittingRows))
    })
  }

  resizeObserver = new ResizeObserver(scheduleRecentSizing)
  resizeObserver.observe(aside)
  // 资料、导航、标签或字体尺寸变化时，也重新计算剩余空间。
  for (const child of aside.children)
    resizeObserver.observe(child)
  scheduleRecentSizing()
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  cancelAnimationFrame(resizeFrame)
})

function isTagActive(name: string) {
  return route.path === tagsLink.value?.link && route.query.tag === name
}
</script>

<template>
  <div ref="browseRoot" class="blog-sidebar-browse">
    <section v-if="tagsLink && commonTags.length" :aria-labelledby="`${headingId}-tags`">
      <div class="section-heading">
        <h3 :id="`${headingId}-tags`">{{ copy.tagHeading }}</h3>
        <VPLink :href="tagsLink.link" class="browse-all" :aria-label="copy.allTags">
          {{ copy.all }} <span class="vpi-chevron-right" aria-hidden="true" />
        </VPLink>
      </div>
      <nav class="tag-links" :aria-label="copy.browseTags">
        <VPLink
          v-for="tag in commonTags"
          :key="tag.name"
          class="browse-tag"
          :class="[tagColors[tag.name] ? `vp-tag-${tagColors[tag.name]}` : '', { active: isTagActive(tag.name) }]"
          :href="`${tagsLink.link}?tag=${encodeURIComponent(tag.name)}`"
          :aria-current="isTagActive(tag.name) ? 'page' : undefined"
        >
          <span>{{ tag.name }}</span>
          <span class="tag-count" :aria-label="copy.count(tag.count)">{{ tag.count }}</span>
        </VPLink>
      </nav>
    </section>

    <section v-if="recentPosts.length" class="recent-section" :aria-labelledby="`${headingId}-recent`">
      <div class="section-heading">
        <h3 :id="`${headingId}-recent`">{{ copy.recentHeading }}</h3>
        <VPLink :href="postsLink" class="browse-all" :aria-label="copy.allArticles">
          {{ copy.all }} <span class="vpi-chevron-right" aria-hidden="true" />
        </VPLink>
      </div>
      <nav ref="recentLinks" class="recent-links" :aria-label="copy.browseRecent">
        <VPLink
          v-for="post in recentPosts"
          :key="post.path"
          class="recent-link"
          :href="post.path"
        >
          <span class="recent-title">{{ post.title }}</span>
          <time
            v-if="postDate(post.createTime)"
            class="recent-date"
            :datetime="postDate(post.createTime)"
          >{{ postDate(post.createTime).slice(5) }}</time>
        </VPLink>
      </nav>
    </section>
  </div>
</template>

<style scoped>
.blog-sidebar-browse {
  text-align: left;
}

section {
  padding-top: 14px;
  margin-top: 14px;
  border-top: 1px solid var(--vp-c-divider);
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
}

.section-heading h3 {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}

.browse-all {
  display: inline-flex;
  gap: 2px;
  align-items: center;
  font-size: 10.5px;
  color: var(--vp-c-text-2);
}

.tag-links {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 5px;
}

.browse-tag {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  max-width: 100%;
  padding: 3px 7px;
  font-size: 11.5px;
  line-height: 1.5;
  color: color-mix(in srgb, var(--vp-tag-color, var(--vp-c-brand-1)) 35%, var(--vp-c-text-1));
  overflow-wrap: anywhere;
  background-color: var(--vp-tag-bg, var(--vp-c-brand-soft));
  border-radius: 6px;
}

.tag-count {
  flex-shrink: 0;
  font-size: 9.5px;
  color: inherit;
  font-variant-numeric: tabular-nums;
}

.browse-tag {
  transition: color var(--vp-t-color), background-color var(--vp-t-color), box-shadow var(--vp-t-color);
}

.browse-tag:hover,
.browse-tag.active {
  box-shadow: inset 0 0 0 1px currentcolor;
}

.browse-tag.active {
  box-shadow: inset 0 0 0 2px currentcolor;
}

.recent-links {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 2px;
}

.recent-link {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  min-height: 30px;
  padding: 4px 6px;
  font-size: 12.5px;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  border-radius: 6px;
}

.recent-title {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recent-date {
  flex-shrink: 0;
  font-size: 10.5px;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}

.recent-link:hover,
.recent-link.active {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
}

.recent-link:hover .recent-date,
.recent-link.active .recent-date {
  color: inherit;
}

.browse-all:hover {
  color: var(--vp-c-brand-1);
}

@media (max-width: 767px) {
  section {
    padding-top: 8px;
    margin-top: 16px;
  }

  .section-heading {
    margin-bottom: 4px;
  }

  .section-heading h3 {
    font-size: 14px;
  }

  .browse-all {
    min-height: 44px;
    padding: 0 4px 0 12px;
    font-size: 12px;
  }

  .tag-links {
    gap: 8px;
  }

  .browse-tag {
    min-height: 44px;
    padding: 8px 12px;
    font-size: 13px;
    border-radius: 8px;
  }

  .tag-count,
  .recent-date {
    font-size: 11px;
  }

  .recent-link {
    min-height: 44px;
    padding: 10px 4px;
    font-size: 14px;
  }

  .recent-title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    white-space: normal;
    overflow-wrap: anywhere;
  }
}
</style>
