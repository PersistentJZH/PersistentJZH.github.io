<script setup lang="ts">
import { computed } from 'vue'
import { VPLink, useData } from 'vuepress-theme-plume/client'
import { notesIndex } from '@temp/notes-index'
import { topicIcons } from '../../icons/topic-icons'

const { lang } = useData()
const isEnglish = computed(() => lang.value.startsWith('en'))
const index = computed(() => notesIndex[isEnglish.value ? 'en' : 'zh'])
const recent = computed(() => index.value.articles.slice(0, 5))
const copy = computed(() => isEnglish.value ? {
  title: 'Technical notes',
  intro: 'Most notes here are AI-assisted drafts for organizing ideas and references. They may contain gaps or mistakes, so verify important details against official documentation or a real environment.',
  topics: 'Topics',
  recent: 'Recently added',
  empty: 'New notes will appear here as they are added.',
  count: (count: number) => `${count} ${count === 1 ? 'note' : 'notes'}`,
} : {
  title: '技术笔记',
  intro: '大部分笔记由 AI 辅助生成，主要用于整理思路、沉淀资料和后续检索，内容可能存在疏漏，使用前建议结合官方文档或实际环境再核对一遍。',
  topics: '专题',
  recent: '最近新增',
  empty: '新的笔记会陆续收录在这里。',
  count: (count: number) => `${count} 篇`,
})
</script>

<template>
  <div class="notes-home">
    <header class="notes-header">
      <h1 class="notes-title">{{ copy.title }}</h1>
      <p class="notes-intro">{{ copy.intro }}</p>
    </header>

    <section aria-labelledby="notes-topics-title">
      <h2 id="notes-topics-title" class="notes-section-title">{{ copy.topics }}</h2>
      <ul class="notes-topics">
        <li v-for="topic in index.topics" :key="topic.id">
          <VPLink :href="topic.link" class="notes-topic-link">
            <span class="notes-topic-name">
              <span class="notes-topic-icon" aria-hidden="true" v-html="(topicIcons[topic.id] ?? topicIcons['basic-knowledge']).svg" />
              <span>{{ topic.title }}</span>
            </span>
            <span class="notes-topic-description">{{ topic.description }}</span>
            <span class="notes-topic-count">{{ copy.count(topic.count) }}</span>
          </VPLink>
        </li>
      </ul>
    </section>

    <section class="notes-recent" aria-labelledby="notes-recent-title">
      <h2 id="notes-recent-title" class="notes-section-title">{{ copy.recent }}</h2>
      <ol v-if="recent.length" class="notes-recent-list">
        <li v-for="article in recent" :key="article.path">
          <VPLink :href="article.path" class="notes-recent-link">
            <time v-if="article.date" :datetime="article.date">{{ article.date }}</time>
            <span v-else class="notes-date-empty" aria-hidden="true">—</span>
            <span class="notes-recent-title">{{ article.title }}</span>
          </VPLink>
        </li>
      </ol>
      <p v-else class="notes-empty">{{ copy.empty }}</p>
    </section>
  </div>
</template>

<style scoped>
.notes-home {
  box-sizing: border-box;
  width: 100%;
  max-width: 944px;
  padding: 44px 32px 32px;
  margin: 0 auto;
  color: var(--vp-c-text-1);
}

.notes-home h1,
.notes-home h2,
.notes-home p,
.notes-home ul,
.notes-home ol,
.notes-home li {
  padding: 0;
  margin: 0;
  border: 0;
}

.notes-home ul,
.notes-home ol {
  list-style: none;
}

.notes-home a {
  color: inherit;
  text-decoration: none;
}

.notes-home a:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

.notes-header {
  margin-bottom: 30px;
}

.notes-home .notes-title {
  font-size: 28px;
  font-weight: 600;
  line-height: 1.4;
}

.notes-home .notes-intro {
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.notes-home .notes-section-title {
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;
}

.notes-topics li + li {
  border-top: 1px solid var(--vp-c-divider);
}

.notes-home .notes-topic-link {
  display: grid;
  grid-template-columns: 140px minmax(0, 1fr) auto;
  gap: 16px;
  align-items: center;
  padding: 16px 0;
  line-height: 1.7;
}

.notes-topic-name {
  display: inline-flex;
  gap: 10px;
  align-items: center;
  min-width: 0;
  font-size: 15px;
  font-weight: 500;
}

.notes-topic-icon {
  display: inline-flex;
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  font-size: 20px;
  line-height: 1;
  color: var(--vp-c-text-2);
}

.notes-topic-link:hover .notes-topic-icon {
  color: var(--vp-c-brand-1);
}

.notes-topic-description {
  min-width: 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
  overflow-wrap: anywhere;
}

.notes-topic-count {
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}

.notes-topic-link:hover .notes-topic-name,
.notes-recent-link:hover .notes-recent-title {
  color: var(--vp-c-brand-1);
}

.notes-recent {
  margin-top: 32px;
}

.notes-home .notes-recent-link {
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr);
  gap: 16px;
  align-items: baseline;
  padding: 10px 0;
  line-height: 1.7;
}

.notes-recent-link time,
.notes-date-empty {
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}

.notes-recent-title {
  min-width: 0;
  font-size: 14px;
  overflow-wrap: anywhere;
}

.notes-home .notes-empty {
  padding: 10px 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
  .notes-home {
    padding: 28px 8px;
  }

  .notes-home .notes-title {
    font-size: 25px;
  }

  .notes-home .notes-topic-link {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 3px 12px;
    padding: 13px 0;
  }

  .notes-topic-description {
    grid-column: 1 / -1;
    grid-row: 2;
  }

  .notes-topic-count {
    grid-column: 2;
    grid-row: 1;
  }

  .notes-home .notes-recent-link {
    gap: 12px;
  }
}
</style>
