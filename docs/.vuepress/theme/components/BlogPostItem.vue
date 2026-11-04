<script setup lang="ts">
import type { ThemePostsItem } from 'vuepress-theme-plume/shared'
import { computed } from 'vue'
import { useData } from 'vuepress-theme-plume/client'
import ThemePostItem from 'vuepress-theme-plume/components/Posts/VPPostItem.vue'

const { post, index } = defineProps<{
  post: ThemePostsItem
  index: number
}>()

const { collection } = useData<'page', 'post'>()

// 默认封面也交给主题渲染为图片链接，保留与自定义封面一致的点击和键盘操作。
const displayPost = computed(() => {
  if (post.cover || collection.value?.type !== 'post' || collection.value.dir !== 'blog')
    return post

  return { ...post, cover: '/blog-covers/default.jpg' }
})
</script>

<template>
  <ThemePostItem :post="displayPost" :index="index" />
</template>
