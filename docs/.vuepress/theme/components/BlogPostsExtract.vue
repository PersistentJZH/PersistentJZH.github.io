<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vuepress/client'
import ThemePostsExtract from 'vuepress-theme-plume/components/Posts/VPPostsExtract.vue'
import VPPostsNav from 'vuepress-theme-plume/components/Posts/VPPostsNav.vue'
import VPPostsProfile from 'vuepress-theme-plume/components/Posts/VPPostsProfile.vue'
import { useBlogData } from '../blog-data'
import BlogSidebarBrowse from './BlogSidebarBrowse.vue'

const route = useRoute()
const { isBlog } = useBlogData()
const isMobile = ref(false)
const extractRoot = ref<HTMLElement | null>(null)
let media: MediaQueryList | undefined

function syncViewport() {
  isMobile.value = media?.matches ?? false
}

async function resetPanelScroll(event: MouseEvent) {
  if (!isBlog.value || !(event.target instanceof Element) || !event.target.closest('.vp-posts-extract'))
    return

  await nextTick()
  const panel = extractRoot.value?.querySelector<HTMLElement>('.posts-modal-container')
  if (panel)
    panel.scrollTop = 0
}

onMounted(() => {
  media = window.matchMedia('(max-width: 767px)')
  syncViewport()
  media.addEventListener('change', syncViewport)
})
onUnmounted(() => media?.removeEventListener('change', syncViewport))
</script>

<template>
  <div ref="extractRoot" class="blog-posts-extract" @click="resetPanelScroll">
    <!-- 切换标签查询或转为桌面布局时卸载弹层，释放主题的焦点与滚动锁。 -->
    <ThemePostsExtract v-if="!isBlog || isMobile" :key="route.fullPath">
      <template #posts-extract-before>
        <slot name="posts-extract-before" />
        <div v-if="isBlog" class="blog-mobile-card">
          <VPPostsProfile />
          <VPPostsNav />
          <BlogSidebarBrowse />
        </div>
      </template>
      <template #posts-extract-after>
        <slot name="posts-extract-after" />
      </template>
    </ThemePostsExtract>
  </div>
</template>

<style scoped>
.blog-posts-extract {
  display: contents;
}
</style>
