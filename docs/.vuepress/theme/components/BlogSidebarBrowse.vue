<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vuepress/client'
import { VPLink, useInternalLink } from 'vuepress-theme-plume/client'
import { useBlogData } from '../blog-data'

const route = useRoute()
const { categories, tags, copy } = useBlogData()
const { categories: categoriesLink, tags: tagsLink } = useInternalLink()

const categoryItems = computed(() => categories.value.slice(0, 6))
const commonTags = computed(() => tags.value.slice(0, 8))

function isCategoryActive(id: string) {
  return route.path === categoriesLink.value?.link && route.query.id === id
}

function isTagActive(name: string) {
  return route.path === tagsLink.value?.link && route.query.tag === name
}
</script>

<template>
  <div class="blog-sidebar-browse">
    <section v-if="categoriesLink && categoryItems.length" aria-labelledby="blog-sidebar-categories">
      <div class="section-heading">
        <h3 id="blog-sidebar-categories">{{ copy.categoryHeading }}</h3>
        <VPLink :href="categoriesLink.link" class="browse-all" :aria-label="copy.allCategories">
          {{ copy.all }} <span class="vpi-chevron-right" aria-hidden="true" />
        </VPLink>
      </div>
      <nav class="category-links" :aria-label="copy.browseCategories">
        <VPLink
          v-for="category in categoryItems"
          :key="category.id"
          class="category-link"
          :class="{ nested: category.depth > 0, active: isCategoryActive(category.id) }"
          :style="{ '--category-depth': Math.min(category.depth, 2) }"
          :href="`${categoriesLink.link}?id=${encodeURIComponent(category.id)}`"
          :aria-current="isCategoryActive(category.id) ? 'page' : undefined"
        >
          <span class="category-name">{{ category.title }}</span>
          <span class="category-count" :aria-label="copy.count(category.count)">{{ category.count }}</span>
        </VPLink>
      </nav>
    </section>

    <section v-if="tagsLink && commonTags.length" aria-labelledby="blog-sidebar-tags">
      <div class="section-heading">
        <h3 id="blog-sidebar-tags">{{ copy.tagHeading }}</h3>
        <VPLink :href="tagsLink.link" class="browse-all" :aria-label="copy.allTags">
          {{ copy.all }} <span class="vpi-chevron-right" aria-hidden="true" />
        </VPLink>
      </div>
      <nav class="tag-links" :aria-label="copy.browseTags">
        <VPLink
          v-for="tag in commonTags"
          :key="tag.name"
          class="browse-tag"
          :class="{ active: isTagActive(tag.name) }"
          :href="`${tagsLink.link}?tag=${encodeURIComponent(tag.name)}`"
          :aria-current="isTagActive(tag.name) ? 'page' : undefined"
        >
          <span>{{ tag.name }}</span>
          <span class="tag-count" :aria-label="copy.count(tag.count)">{{ tag.count }}</span>
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
  padding-top: 20px;
  margin-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
}

.section-heading h3 {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}

.browse-all {
  display: inline-flex;
  gap: 2px;
  align-items: center;
  font-size: 11px;
  color: var(--vp-c-text-2);
}

.category-links {
  display: grid;
  gap: 2px;
}

.category-link {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  min-height: 32px;
  padding: 5px 8px 5px calc(8px + var(--category-depth) * 12px);
  font-size: 13px;
  font-weight: 500;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  border-radius: 6px;
}

.category-link.nested {
  font-size: 12px;
  font-weight: 400;
  color: var(--vp-c-text-2);
}

.category-name {
  min-width: 0;
  overflow-wrap: anywhere;
}

.category-count {
  flex-shrink: 0;
  min-width: 24px;
  padding: 1px 5px;
  font-size: 11px;
  text-align: center;
  background-color: var(--vp-c-bg-soft);
  border-radius: 4px;
}

.tag-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 6px;
}

.browse-tag {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  max-width: 100%;
  padding: 5px 8px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  overflow-wrap: anywhere;
  background-color: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.tag-count {
  flex-shrink: 0;
  font-size: 10px;
  font-variant-numeric: tabular-nums;
}

.category-link,
.browse-tag {
  transition: color var(--vp-t-color), background-color var(--vp-t-color);
}

.category-link:hover,
.category-link.active,
.browse-tag:hover,
.browse-tag.active {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
}

.browse-all:hover {
  color: var(--vp-c-brand-1);
}
</style>
