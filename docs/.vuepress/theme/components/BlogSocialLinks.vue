<script setup lang="ts">
import type { SocialLink } from 'vuepress-theme-plume/shared'
import VPIcon from '@theme/VPIcon.vue'
import VPSocialLink from '@theme/VPSocialLink.vue'

/**
 * 替换主题的 VPSocialLinks：
 * 主题遇到空链接会渲染出 href="" 的 <a>，点一下会重新打开当前页面。
 * 这里把“链接待补充”的项渲染成不可点击的图标，填上链接后自动变回链接。
 */
const { links } = defineProps<{ links: SocialLink[] }>()

function iconLabel(icon: SocialLink['icon']): string {
  const name = typeof icon === 'string'
    ? (icon.includes(':') ? icon.split(':')[1] : icon)
    : icon.name ?? 'link'
  const labels: Record<string, string> = { github: 'GitHub', x: 'X', twitter: 'X', instagram: 'Instagram' }
  return labels[name] ?? name
}

function iconName(icon: SocialLink['icon']): string | { svg: string } {
  if (typeof icon !== 'string')
    return icon
  // twitter 现在统一用 X 的图标
  const name = icon === 'twitter' ? 'x' : icon
  return name.includes(':') ? name : `simple-icons:${name}`
}
</script>

<template>
  <div class="vp-social-links">
    <template v-for="item in links" :key="iconLabel(item.icon)">
      <span
        v-if="!item.link"
        class="vp-social-link is-placeholder"
        role="img"
        :aria-label="item.ariaLabel || iconLabel(item.icon)"
        :title="`${iconLabel(item.icon)}（链接待补充）`"
      >
        <VPIcon :name="iconName(item.icon)" />
      </span>
      <VPSocialLink
        v-else
        :icon="item.icon"
        :link="item.link"
        :aria-label="item.ariaLabel || iconLabel(item.icon)"
        :title="item.ariaLabel || iconLabel(item.icon)"
      />
    </template>
  </div>
</template>

<style>
/* 与主题 VPSocialLinks 的内联样式保持一致，保证导航栏里的社交图标不变 */
.vp-social-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.vp-social-link.is-placeholder {
  cursor: default;
  opacity: 0.45;
}

.vp-social-link.is-placeholder:hover {
  color: var(--vp-c-text-2);
}
</style>
