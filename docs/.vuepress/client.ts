import { nextTick, onMounted, onUnmounted, watch } from 'vue'
import { defineClientConfig, useRoute } from 'vuepress/client'
// import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
// import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
// import NpmBadgeGroup from 'vuepress-theme-plume/features/NpmBadgeGroup.vue'
//import Swiper from 'vuepress-theme-plume/features/Swiper.vue'

import TravelMap from './theme/components/TravelMap.vue'
import { mountHomeTintPlate, type HomeTintPlateHandle, type TintPalette } from './theme/home-tint-plate'

import './theme/styles/custom.css'

/**
 * iOS Safari（尤其是 26 的悬浮工具栏）里 100vh / 100svh 与真实可见区域
 * 可能不一致，首页会多出一截本不该有的滚动距离。
 * 这里把 visualViewport 的真实高度写进 CSS 变量，供首页 Hero 使用。
 */
function syncHomeViewportHeight() {
  const height = Math.round(window.visualViewport?.height ?? window.innerHeight)
  document.documentElement.style.setProperty('--vp-home-visible-height', `${height}px`)
}

if (typeof window !== 'undefined') {
  syncHomeViewportHeight()
  window.visualViewport?.addEventListener('resize', syncHomeViewportHeight)
  window.addEventListener('resize', syncHomeViewportHeight)
  window.addEventListener('orientationchange', syncHomeViewportHeight)
}

function resolveTintPalette(): TintPalette {
  return document.documentElement.lang.toLowerCase().startsWith('en')
    ? { value: 200, offset: 36 }
    : { value: 190, offset: 64 }
}

let tintHandle: HomeTintPlateHandle | null = null
let tintHero: HTMLElement | null = null
let tintObserver: MutationObserver | null = null

function disposeHomeTintPlate() {
  tintObserver?.disconnect()
  tintObserver = null
  tintHandle?.destroy()
  tintHandle = null
}

/**
 * 主题 rc.214 会在低端触屏 / 减少动效时跳过 tint-plate canvas。
 * 这里在主题 canvas 缺席时补一份动画；主题 canvas 出现后再移除自己。
 */
function syncHomeTintPlate() {
  const hero = document.querySelector<HTMLElement>('.vp-home-hero')
  if (hero === tintHero)
    return

  disposeHomeTintPlate()
  tintHero = hero
  if (!hero)
    return

  // 主题 canvas 已存在，直接使用。
  if (hero.querySelector('.bg-filter'))
    return

  tintHandle = mountHomeTintPlate(hero, resolveTintPalette())

  // 主题的 effect 是异步组件，可能在首屏之后才挂载；
  // 一旦出现就移除兜底 canvas，避免桌面端重复动画。
  tintObserver = new MutationObserver(() => {
    if (hero.querySelector('.bg-filter'))
      disposeHomeTintPlate()
  })
  tintObserver.observe(hero, { childList: true, subtree: true })
}

function scheduleHomeTintPlateSync() {
  nextTick(() => {
    syncHomeTintPlate()
    // 页面切换过渡期间旧 Hero 可能还没移除，延迟再对齐一次。
    window.setTimeout(syncHomeTintPlate, 500)
  })
}

export default defineClientConfig({
  enhance({ app }) {
    // built-in components
    // app.component('RepoCard', RepoCard)
    // app.component('NpmBadge', NpmBadge)
    // app.component('NpmBadgeGroup', NpmBadgeGroup)
    // app.component('Swiper', Swiper) // you should install `swiper`

    // your custom components
    app.component('TravelMap', TravelMap)
  },
  setup() {
    const route = useRoute()

    onMounted(() => {
      syncHomeViewportHeight()
      scheduleHomeTintPlateSync()
    })
    watch(() => route.path, scheduleHomeTintPlateSync, { flush: 'post' })
    onUnmounted(disposeHomeTintPlate)
  },
})
