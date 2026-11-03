<script setup lang="ts">
import type { ThemePostsItem } from 'vuepress-theme-plume/shared'
import { withBase } from 'vuepress/client'
import { VPLink } from 'vuepress-theme-plume/client'
import { postDate, useBlogData } from '../blog-data'

defineProps<{ posts: ThemePostsItem[], compact?: boolean }>()
const { copy } = useBlogData()
</script>

<template>
  <ul class="blog-article-rows" :class="{ compact }">
    <li v-for="post in posts" :key="post.path">
      <VPLink :href="post.path" class="blog-article-row">
        <img :src="withBase(post.cover || '/blog-covers/default.jpg')" alt="" loading="lazy">
        <div class="article-details">
          <h3>{{ post.title }}</h3>
          <div class="article-meta">
            <time v-if="postDate(post.createTime)" :datetime="postDate(post.createTime)">{{ postDate(post.createTime) }}</time>
            <span v-if="post.readingTime">{{ copy.reading(Math.max(1, Math.round(post.readingTime.minutes))) }}</span>
          </div>
        </div>
        <span class="vpi-chevron-right article-arrow" aria-hidden="true" />
      </VPLink>
    </li>
  </ul>
</template>

<style scoped>
.blog-article-rows {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.blog-article-rows li {
  min-width: 0;
}


.blog-article-row {
  display: flex;
  gap: 14px;
  align-items: center;
  height: 100%;
  min-height: 120px;
  padding: 14px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  transition: border-color var(--vp-t-color), background-color var(--vp-t-color);
}

.blog-article-row:hover {
  border-color: var(--vp-c-brand-2);
}

.blog-article-row:hover h3 {
  color: var(--vp-c-brand-1);
}


.blog-article-row img {
  flex: 0 0 88px;
  width: 88px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.article-details {
  flex: 1;
  min-width: 0;
}


.article-details h3 {
  display: -webkit-box;
  margin: 0;
  overflow: hidden;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.55;
  overflow-wrap: anywhere;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 12px;
  margin-top: 10px;
  font-size: 11px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}

.article-arrow {
  flex-shrink: 0;
  color: var(--vp-c-text-3);
}

.compact {
  grid-template-columns: minmax(0, 1fr);
  gap: 0;
}

.compact li + li {
  border-top: 1px solid var(--vp-c-divider);
}

.compact .blog-article-row {
  min-height: 84px;
  padding: 14px 0;
  border: 0;
  border-radius: 0;
  background: transparent;
}

.compact img {
  flex-basis: 56px;
  width: 56px;
  height: 48px;
  border-radius: 6px;
}

.compact .article-meta {
  margin-top: 4px;
}


@media (max-width: 1199px) {
  .blog-article-rows {
    grid-template-columns: minmax(0, 1fr);
  }

}

@media (max-width: 479px) {
  .blog-article-row {
    min-height: 104px;
    gap: 12px;
    padding: 12px;
  }

  .blog-article-row img {
    flex-basis: 64px;
    width: 64px;
    height: 64px;
  }

  .article-details h3 {
    font-size: 14px;
    -webkit-line-clamp: 3;
    line-clamp: 3;
  }

  .article-arrow {
    display: none;
  }

  .compact img {
    flex-basis: 48px;
    width: 48px;
    height: 48px;
  }

}
</style>
