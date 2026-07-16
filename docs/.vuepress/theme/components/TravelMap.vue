<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'

interface TravelPhoto {
  url: string
  caption?: string
}

interface TravelLocation {
  id: string
  name: string
  lat: number
  lng: number
  zoom?: number
  photos: TravelPhoto[]
  description?: string
  permalink?: string
  color?: string
  emoji?: string
}

const props = withDefaults(defineProps<{
  locations?: TravelLocation[]
}>(), {
  locations: () => [],
})

const defaultLocations: TravelLocation[] = [
  {
    id: 'shenzhen',
    name: '深圳',
    emoji: '🌆',
    lat: 22.5431,
    lng: 114.0579,
    zoom: 11,
    color: '#f97316',
    description: '科技与活力的南方都市',
    permalink: '/travel/oxyu2vjh/',
    photos: [
      { url: 'https://jzh-mall.oss-cn-beijing.aliyuncs.com/blog/IMG_6172.jpeg', caption: '深圳湾日出' },
      { url: 'https://jzh-mall.oss-cn-beijing.aliyuncs.com/blog/IMG_6226.jpeg', caption: '南山市景' },
    ],
  },
  {
    id: 'thailand',
    name: '泰国',
    emoji: '🏝️',
    lat: 13.7563,
    lng: 100.5018,
    zoom: 6,
    color: '#06b6d4',
    description: '热带海岛的悠闲时光',
    permalink: '/travel/ipze39x1/',
    photos: [
      { url: 'https://jzh-mall.oss-cn-beijing.aliyuncs.com/blog/IMG_6172.jpeg', caption: '海岛日落' },
      { url: 'https://jzh-mall.oss-cn-beijing.aliyuncs.com/blog/IMG_6226.jpeg', caption: '当地美食' },
      { url: 'https://jzh-mall.oss-cn-beijing.aliyuncs.com/blog/9cafa28d-bb5e-49f2-8740-7130c4706628.png', caption: '古老寺庙' },
      { url: 'https://jzh-mall.oss-cn-beijing.aliyuncs.com/blog/IMG_5523.jpeg', caption: '街头巷尾' },
      { url: 'https://jzh-mall.oss-cn-beijing.aliyuncs.com/blog/IMG_6203.jpeg', caption: '海岸风光' },
    ],
  },
]

const allLocations = computed(() =>
  props.locations.length > 0 ? props.locations : defaultLocations
)

const globeContainer = ref<HTMLElement | null>(null)
const selectedLocation = ref<TravelLocation | null>(null)
const activePhotoIdx = ref(0)
const galleryOpen = ref(false)
const isClient = ref(false)
const sidebarCollapsed = ref(false)
const webglError = ref(false)

// 检测是否为移动端（触摸设备）
const isMobile = ref(false)
if (typeof window !== 'undefined') {
  isMobile.value = /Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent) || ('ontouchstart' in window)
}

let chart: any = null

async function initGlobe() {
  if (!isClient.value || !globeContainer.value) return

  try {
    const earthFlyLine = (await import('earth-flyline')).default

    // Register world map
    const resp = await fetch('/world.json')
    const geoJson = await resp.json()
    earthFlyLine.registerMap('world', geoJson)

    chart = earthFlyLine.init({
      dom: globeContainer.value,
      map: 'world',
      mode: '3d',
      autoRotate: !isMobile.value,
      rotateSpeed: 0.3,
      controls: isMobile.value ? 'builtIn' : 'custom',
      config: {
        R: 150,
        earth: { color: '#0f1923' },
        mapStyle: {
          areaColor: '#1a2940',
          lineColor: '#3a5a80',
        },
        spriteStyle: { color: '#3a5a80', show: true },
        scatterStyle: {
          color: '#ff6b6b',
          size: 6,
          animate: {
            from: { size: 4, opacity: 0.3 },
            to: { size: [12, 4], opacity: [1, 0] },
          },
        },
        bgStyle: { color: '#040a10', opacity: 1 },
      },
    })

    // Add location markers
    chart.addData('point',
      allLocations.value.map((loc, i) => ({
        id: loc.id,
        lon: loc.lng,
        lat: loc.lat,
        name: loc.name,
        emoji: loc.emoji,
        color: loc.color,
        style: {
          color: loc.color || '#ff6b6b',
          size: 7,
          animate: {
            from: { size: 3, opacity: 0.2 },
            to: { size: [14, 3], opacity: [1, 0] },
          },
        },
      }))
    )

    // Add country/region text labels
    chart.addData('textMark', [
      { text: '中国', position: { lon: 104, lat: 35 }, style: { fontSize: 18, color: '#8899cc' } },
      { text: '泰国', position: { lon: 101, lat: 15.5 }, style: { fontSize: 15, color: '#8899cc' } },
      { text: '印度', position: { lon: 78, lat: 23 }, style: { fontSize: 14, color: '#667a99' } },
      { text: '日本', position: { lon: 138, lat: 37 }, style: { fontSize: 13, color: '#667a99' } },
      { text: '越南', position: { lon: 106, lat: 15 }, style: { fontSize: 10, color: '#556888' } },
      { text: '马来西亚', position: { lon: 102, lat: 4 }, style: { fontSize: 10, color: '#556888' } },
      { text: '印度尼西亚', position: { lon: 115, lat: -2 }, style: { fontSize: 10, color: '#556888' } },
      { text: '澳大利亚', position: { lon: 133, lat: -26 }, style: { fontSize: 13, color: '#667a99' } },
    ])

    // Click handler for markers — GlobeStream3D passes (event, mesh)
    chart.on('click', (_event: any, mesh: any) => {
      const data = mesh?.userData
      if (data?.id) {
        const loc = allLocations.value.find((l) => l.id === data.id)
        if (loc) openLocation(loc)
      }
    })

    // 仅在桌面端启用 hover 暂停旋转（移动端无 hover 且已禁用自动旋转）
    if (!isMobile.value) {
      chart.on('mouseover', () => {
        if (chart?.options) chart.options.autoRotate = false
      })
      chart.on('mouseout', () => {
        if (chart?.options) chart.options.autoRotate = true
      })
    }

  } catch (e: any) {
    console.error('GlobeStream3D init failed:', e.message)
    webglError.value = true
  }
}

function openLocation(loc: TravelLocation) {
  selectedLocation.value = loc
  activePhotoIdx.value = 0
  if (loc.photos.length > 0) {
    galleryOpen.value = true
  } else if (loc.permalink) {
    window.location.href = loc.permalink
  }
  sidebarCollapsed.value = false
}

function closeGallery() {
  galleryOpen.value = false
  selectedLocation.value = null
}

function prevPhoto() {
  const s = selectedLocation.value
  if (!s) return
  activePhotoIdx.value = (activePhotoIdx.value - 1 + s.photos.length) % s.photos.length
}

function nextPhoto() {
  const s = selectedLocation.value
  if (!s) return
  activePhotoIdx.value = (activePhotoIdx.value + 1) % s.photos.length
}

function onKey(e: KeyboardEvent) {
  if (!galleryOpen.value) return
  if (e.key === 'Escape') closeGallery()
  if (e.key === 'ArrowLeft') prevPhoto()
  if (e.key === 'ArrowRight') nextPhoto()
}

onMounted(() => {
  isClient.value = true
  nextTick(() => initGlobe())
  document.addEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
  chart?.dispose?.()
})
</script>

<template>
  <div class="app-shell">
    <!-- 3D Globe -->
    <div ref="globeContainer" class="globe-layer"></div>

    <!-- WebGL error fallback -->
    <div v-if="webglError" class="webgl-error">
      <div class="error-card">
        <span class="error-icon">⚠️</span>
        <h2>WebGL 不可用</h2>
        <p>3D 地球需要 WebGL 支持。请尝试：</p>
        <ul>
          <li>Chrome：开启「硬件加速模式」</li>
          <li>使用独立浏览器打开（非 IDE 内嵌预览）</li>
        </ul>
      </div>
    </div>

    <!-- Floating sidebar -->
    <Transition name="sidebar-slide">
      <aside v-if="!galleryOpen" class="floating-sidebar" :class="{ collapsed: sidebarCollapsed }">
        <button
          class="collapse-btn"
          @click="sidebarCollapsed = !sidebarCollapsed"
          :title="sidebarCollapsed ? '展开' : '收起'"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <polyline v-if="!sidebarCollapsed" points="15 18 9 12 15 6" />
            <polyline v-else points="9 18 15 12 9 6" />
          </svg>
        </button>

        <div v-show="!sidebarCollapsed" class="sidebar-inner">
          <div class="sidebar-brand">
            <span class="brand-icon">🌍</span>
            <span class="brand-text">旅行足迹</span>
          </div>
          <p class="brand-sub">拖拽旋转地球 · 滚轮缩放 · 点击标记查看照片</p>

          <div class="location-cards">
            <div
              v-for="loc in allLocations"
              :key="loc.id"
              class="loc-card"
              :class="{ active: selectedLocation?.id === loc.id }"
              :style="{ '--accent': loc.color || '#6366f1' }"
              @click="openLocation(loc)"
            >
              <div class="loc-card-header">
                <span class="loc-emoji">{{ loc.emoji || '📍' }}</span>
                <span class="loc-name">{{ loc.name }}</span>
              </div>
              <p class="loc-desc">{{ loc.description }}</p>
              <div class="loc-footer">
                <span class="loc-photos">{{ loc.photos.length }} 张照片</span>
                <a v-if="loc.permalink" :href="loc.permalink" class="loc-link" @click.stop>游记 →</a>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </Transition>

    <!-- Gallery -->
    <Teleport to="body">
      <Transition name="gallery">
        <div v-if="galleryOpen && selectedLocation" class="gallery-overlay" @click.self="closeGallery">
          <div class="gallery-topbar">
            <button class="gallery-back" @click="closeGallery">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
              <span>返回地球</span>
            </button>
            <span class="gallery-counter">{{ activePhotoIdx + 1 }} / {{ selectedLocation.photos.length }}</span>
          </div>

          <div class="gallery-stage">
            <button v-if="selectedLocation.photos.length > 1" class="gallery-arrow" @click="prevPhoto">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div class="gallery-image-box">
              <img :src="selectedLocation.photos[activePhotoIdx].url" :alt="selectedLocation.photos[activePhotoIdx].caption" class="gallery-img" />
              <p v-if="selectedLocation.photos[activePhotoIdx].caption" class="gallery-caption">{{ selectedLocation.photos[activePhotoIdx].caption }}</p>
            </div>
            <button v-if="selectedLocation.photos.length > 1" class="gallery-arrow" @click="nextPhoto">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>

          <div class="gallery-infobar">
            <div class="gallery-location-info">
              <span class="gl-emoji">{{ selectedLocation.emoji }}</span>
              <span class="gl-name">{{ selectedLocation.name }}</span>
            </div>
            <div class="gallery-actions">
              <div class="gallery-dots">
                <button v-for="(_, i) in selectedLocation.photos" :key="i" class="dot" :class="{ on: i === activePhotoIdx }" @click="activePhotoIdx = i" />
              </div>
              <a v-if="selectedLocation.permalink" :href="selectedLocation.permalink" class="gallery-detail-link">查看完整游记 →</a>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style>
html, body, #app { margin: 0; padding: 0; overflow: hidden; height: 100%; }
</style>

<style scoped>
.app-shell {
  position: fixed;
  inset: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  background: #040a10;
}

.globe-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

/* WebGL error */
.webgl-error {
  position: absolute;
  inset: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(4, 10, 16, 0.9);
}
.error-card {
  text-align: center;
  color: #fff;
  padding: 40px;
  max-width: 400px;
}
.error-icon { font-size: 3rem; }
.error-card h2 { margin: 16px 0 8px; font-size: 1.4rem; }
.error-card p { color: #999; margin: 8px 0; }
.error-card ul { text-align: left; color: #aaa; font-size: 0.9rem; line-height: 1.8; }

/* Sidebar */
.floating-sidebar {
  position: absolute;
  top: 24px; right: 24px; bottom: 24px;
  width: 280px;
  background: rgba(15, 25, 45, 0.85);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  border: 1px solid rgba(255,255,255,0.08);
  display: flex; flex-direction: column;
  transition: width 0.3s ease, border-radius 0.3s ease;
  overflow: hidden; z-index: 10;
  color: #e0e0e0;
}
.floating-sidebar.collapsed { width: 48px; border-radius: 26px; }

.collapse-btn {
  position: absolute; top: 12px; left: 12px;
  width: 28px; height: 28px;
  border: none;
  background: rgba(255,255,255,0.06);
  border-radius: 8px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: #aaa; z-index: 5;
}
.collapse-btn:hover { background: rgba(255,255,255,0.12); }

.sidebar-inner { padding: 48px 18px 18px; overflow-y: auto; flex: 1; }
.sidebar-brand { display: flex; align-items: center; gap: 10px; margin-bottom: 4px; }
.brand-icon { font-size: 1.5rem; }
.brand-text { font-size: 1.15rem; font-weight: 700; color: #e8e8f0; }
.brand-sub { font-size: 0.74rem; color: #6a7a90; margin: 0 0 16px; line-height: 1.5; }

.location-cards { display: flex; flex-direction: column; gap: 8px; }
.loc-card {
  padding: 12px 14px; border-radius: 12px; cursor: pointer;
  transition: all 0.2s ease;
  border: 1.5px solid rgba(255,255,255,0.05);
  background: rgba(255,255,255,0.04);
}
.loc-card:hover {
  background: rgba(255,255,255,0.08);
  border-color: var(--accent, #6366f1);
  transform: translateY(-1px);
}
.loc-card.active {
  background: rgba(255,255,255,0.08);
  border-color: var(--accent, #6366f1);
}

.loc-card-header { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
.loc-emoji { font-size: 1.1rem; }
.loc-name { font-size: 0.9rem; font-weight: 650; color: #e0e0e8; }
.loc-desc { font-size: 0.76rem; color: #6a7a90; margin: 0 0 6px; line-height: 1.4; }
.loc-footer { display: flex; justify-content: space-between; align-items: center; font-size: 0.7rem; }
.loc-photos { color: #5a6a80; }
.loc-link { color: var(--accent, #818cf8); text-decoration: none; font-weight: 600; }
.loc-link:hover { opacity: 0.7; }

/* Gallery */
.gallery-overlay {
  position: fixed; inset: 0;
  background: rgba(4, 8, 16, 0.96);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 9999; display: flex; flex-direction: column; color: #fff;
}
.gallery-topbar { display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; }
.gallery-back {
  display: flex; align-items: center; gap: 8px;
  background: rgba(255,255,255,0.06); border: none; color: #fff;
  padding: 8px 16px; border-radius: 10px; cursor: pointer; font-size: 0.9rem;
}
.gallery-back:hover { background: rgba(255,255,255,0.12); }
.gallery-counter { font-size: 0.85rem; color: rgba(255,255,255,0.4); }
.gallery-stage { flex: 1; display: flex; align-items: center; justify-content: center; padding: 0 20px; min-height: 0; }
.gallery-arrow {
  background: rgba(255,255,255,0.05); border: none; color: #fff;
  width: 48px; height: 48px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0;
}
.gallery-arrow:hover { background: rgba(255,255,255,0.12); }
.gallery-image-box { display: flex; flex-direction: column; align-items: center; max-width: 75vw; max-height: 72vh; }
.gallery-img { max-width: 100%; max-height: 72vh; object-fit: contain; border-radius: 12px; }
.gallery-caption { color: rgba(255,255,255,0.5); font-size: 0.9rem; margin-top: 12px; }
.gallery-infobar { display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; border-top: 1px solid rgba(255,255,255,0.05); }
.gallery-location-info { display: flex; align-items: center; gap: 8px; }
.gl-emoji { font-size: 1.2rem; }
.gl-name { font-size: 1rem; font-weight: 600; }
.gallery-actions { display: flex; align-items: center; gap: 16px; }
.gallery-dots { display: flex; gap: 6px; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.2); border: none; cursor: pointer; padding: 0; }
.dot.on { background: #fff; transform: scale(1.3); }
.gallery-detail-link { color: rgba(255,255,255,0.6); text-decoration: none; font-size: 0.85rem; }
.gallery-detail-link:hover { color: #fff; }

/* Transitions */
.sidebar-slide-enter-active, .sidebar-slide-leave-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.sidebar-slide-enter-from, .sidebar-slide-leave-to { opacity: 0; transform: translateX(20px); }
.gallery-enter-active { transition: opacity 0.2s ease; }
.gallery-leave-active { transition: opacity 0.15s ease; }
.gallery-enter-from, .gallery-leave-to { opacity: 0; }

@media (max-width: 640px) {
  .floating-sidebar {
    top: auto; right: 0; bottom: 0; left: 0;
    width: 100%; height: auto; max-height: 40vh;
    border-radius: 20px 20px 0 0; border: none;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  .floating-sidebar.collapsed { width: 100%; height: 48px; border-radius: 20px 20px 0 0; }
  .sidebar-inner { padding: 48px 14px 16px; }
  .gallery-arrow { width: 36px; height: 36px; }
  .gallery-image-box { max-width: 90vw; max-height: 60vh; }
  .gallery-topbar, .gallery-infobar { padding: 12px 14px; }
}
</style>
