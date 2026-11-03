<script setup lang="ts">
import { Layout as ThemeLayout } from 'vuepress-theme-plume/client'
import { useBlogData } from '../blog-data'
import BlogSidebarBrowse from './BlogSidebarBrowse.vue'

const { isBlog } = useBlogData()
</script>

<template>
  <ThemeLayout>
    <template #posts-aside-bottom>
      <BlogSidebarBrowse v-if="isBlog" />
    </template>
  </ThemeLayout>
</template>
