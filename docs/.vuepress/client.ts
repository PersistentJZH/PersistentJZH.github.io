import { nextTick, onMounted, onUnmounted, watch } from 'vue'
import { defineClientConfig, useRoute } from 'vuepress/client'
// import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
// import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
// import NpmBadgeGroup from 'vuepress-theme-plume/features/NpmBadgeGroup.vue'
//import Swiper from 'vuepress-theme-plume/features/Swiper.vue'

import TravelMap from './theme/components/TravelMap.vue'
import YangshuoGuide from './theme/components/YangshuoGuide.vue'
import { mountHomeTintPlate, type HomeTintPlateHandle, type TintPalette } from './theme/home-tint-plate'

import './theme/styles/custom.css'
import './theme/styles/yangshuo.css'

/**
 * iOS Safari（尤其是 26/27 的悬浮工具栏）里 100vh / 100svh 与真实可见区域
 * 可能不一致，首页会多出一截本不该有的滚动距离。
 * 这里把 visualViewport 的真实高度写进 CSS 变量，供首页 Hero / footer 使用。
 */
function syncHomeViewportHeight() {
  const visible = Math.round(window.visualViewport?.height ?? window.innerHeight)
  document.documentElement.style.setProperty('--vp-home-visible-height', `${visible}px`)
}

if (typeof window !== 'undefined') {
  syncHomeViewportHeight()
  window.visualViewport?.addEventListener('resize', syncHomeViewportHeight)
  window.addEventListener('resize', syncHomeViewportHeight)
  window.addEventListener('orientationchange', syncHomeViewportHeight)
}

/**
 * 使用主题默认的 200 / 36 色板：比 190 / 64 更亮、更柔和，
 * 避免动画进入低亮度相位时在卡片下方出现深灰色横带。
 */
function resolveTintPalette(): TintPalette {
  return { value: 200, offset: 36 }
}

let tintHandle: HomeTintPlateHandle | null = null
let tintHero: HTMLElement | null = null

function disposeHomeTintPlate() {
  tintHandle?.destroy()
  tintHandle = null
}

/**
 * 首页 tint-plate 由本站自己无条件渲染，不再依赖主题的 effect 开关。
 * 这样即使主题在低端触屏 / 减少动效时跳过了它自带的 canvas，背景也不会消失。
 */
function syncHomeTintPlate() {
  const hero = document.querySelector<HTMLElement>('.vp-home-hero')
  if (hero === tintHero)
    return

  disposeHomeTintPlate()
  tintHero = hero
  if (hero)
    tintHandle = mountHomeTintPlate(hero, resolveTintPalette())
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
    app.component('YangshuoGuide', YangshuoGuide)
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
