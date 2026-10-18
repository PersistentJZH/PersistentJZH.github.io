<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, shallowRef, watch } from 'vue'
import { withBase } from 'vuepress/client'
import {
  distanceKm,
  photoUrl,
  travelMeta,
  travelStops,
  type TravelStop,
} from '../../data/travel'

const BASE_W = 1200
const BASE_H = 750
const DESKTOP_ZOOM = 3.6
const MOBILE_ZOOM = 4.4
const MIN_ZOOM = 1
const MAX_ZOOM = 12
const ANTARCTICA = 'Antarctica'

interface Camera {
  k: number
  x: number
  y: number
}

interface MapPoint {
  x: number
  y: number
}

interface RouteArc {
  id: string
  d: string
  length: number
  x1: number
  y1: number
  x2: number
  y2: number
}

interface MapCluster {
  id: string
  ids: string[]
  x: number
  y: number
  count: number
}

const rootEl = ref<HTMLElement | null>(null)
const mapEl = ref<HTMLElement | null>(null)
const galleryEl = ref<HTMLElement | null>(null)
const closeButtonEl = ref<HTMLButtonElement | null>(null)

const geoReady = ref(false)
const geoError = ref(false)
const isMobile = ref(false)
const isDragging = ref(false)
const isInteracting = ref(false)

const camera = reactive<Camera>({ k: DESKTOP_ZOOM, x: 0, y: 0 })
const mapSize = reactive({ w: 1600, h: 1000 })
const pointerLL = ref<[number, number] | null>(null)
const hoveredId = ref<string | null>(null)
const selectedId = ref<string | null>(null)
const lightboxIndex = ref(-1)

const projectionRef = shallowRef<any>(null)
const countries = ref<Array<{ name: string; d: string; visited: boolean }>>([])
const graticulePath = ref('')
const spherePath = ref('')
const routes = ref<RouteArc[]>([])
const routeHub = ref<MapPoint | null>(null)
const geoLabels = ref<Array<{ text: string; x: number; y: number; size: number; opacity: number; italic?: boolean }>>([])

let projection: any = null
let pathGen: any = null
let raf = 0
let cameraAnimToken = 0
let cameraGuard = 0
let wheelRaf = 0
let wheelFactor = 1
let panRaf = 0
let pointerTimer = 0
let pointerLast = 0
let pendingPointerLL: [number, number] | null = null
let atlasLockScrollY = 0
let pendingPan: { x: number; y: number } | null = null
let resizeObserver: ResizeObserver | null = null
let lastFocus: HTMLElement | null = null
let alive = true
let drag: { id: number; x: number; y: number; camX: number; camY: number; moved: boolean } | null = null
let interactTimer = 0

function markInteracting(duration = 220): void {
  isInteracting.value = true
  clearTimeout(interactTimer)
  interactTimer = window.setTimeout(() => {
    isInteracting.value = false
  }, duration)
}

const stops = travelStops
const homeStop = computed(() => stops.find((s) => s.id === travelMeta.homeId) ?? stops[0])
const selectedStop = computed(() => stops.find((s) => s.id === selectedId.value) ?? null)
const hoveredStop = computed(() => stops.find((s) => s.id === hoveredId.value) ?? null)
const activeStop = computed(() => selectedStop.value ?? hoveredStop.value ?? null)

const mappedStops = computed(() =>
  stops.map((stop) => {
    const currentProjection = projectionRef.value
    const p = currentProjection ? currentProjection([stop.lng, stop.lat]) : null
    return { ...stop, px: p?.[0] ?? 0, py: p?.[1] ?? 0 }
  }),
)


const routesPath = computed(() => routes.value.map((route) => route.d).join(' '))

/**
 * 屏幕距离过近的地点合并成一个聚合点。
 * 珠三角几个城市在初始视野里会重叠，点聚合可以放大后再选。
 */
const clusterGroups = computed<MapCluster[]>(() => {
  if (!geoReady.value) return []
  const points = mappedStops.value
  if (points.length < 2) return []
  const scale = sliceScale()
  const threshold = 30
  const remaining = [...points]
  const groups: MapCluster[] = []

  while (remaining.length) {
    const seed = remaining.shift()
    if (!seed) break
    const members = [seed]
    for (let index = remaining.length - 1; index >= 0; index--) {
      const other = remaining[index]
      const dx = (other.px - seed.px) * camera.k * scale
      const dy = (other.py - seed.py) * camera.k * scale
      if (Math.hypot(dx, dy) < threshold) {
        members.push(other)
        remaining.splice(index, 1)
      }
    }
    if (members.length > 2) {
      groups.push({
        id: members.map((member) => member.id).join('|'),
        ids: members.map((member) => member.id),
        x: members.reduce((sum, member) => sum + member.px, 0) / members.length,
        y: members.reduce((sum, member) => sum + member.py, 0) / members.length,
        count: members.length,
      })
    }
  }
  return groups
})

const clusterMenu = ref<MapCluster | null>(null)

const clusterStops = computed(() => {
  const menu = clusterMenu.value
  if (!menu) return []
  return menu.ids
    .map((id) => mappedStops.value.find((stop) => stop.id === id))
    .filter(Boolean) as Array<(typeof mappedStops.value)[number]>
})

function openCluster(cluster: MapCluster): void {
  clusterMenu.value = cluster
}

function closeCluster(): void {
  clusterMenu.value = null
}

function chooseClusterStop(stop: (typeof mappedStops.value)[number]): void {
  clusterMenu.value = null
  selectStop(stop)
}

function zoomIntoCluster(): void {
  const menu = clusterMenu.value
  if (!menu) return
  clusterMenu.value = null
  zoomCluster(menu)
}

const hiddenMarkerIds = computed(() => {
  const hidden = new Set<string>()
  const activeId = activeStop.value?.id
  for (const cluster of clusterGroups.value) {
    for (const id of cluster.ids) {
      if (id !== activeId) hidden.add(id)
    }
  }
  return hidden
})

const visibleClusters = computed(() => {
  const activeId = activeStop.value?.id
  return clusterGroups.value.filter((cluster) => !activeId || !cluster.ids.includes(activeId))
})

/**
 * 标签避让：按“当前选中 > hover > 常驻地 > 数据顺序”贪心排布，
 * 屏幕距离太近的标签先隐藏，放大后自然出现。
 */
const visibleLabelIds = computed(() => {
  const ids = new Set<string>()
  const points = mappedStops.value
  if (!points.length) return ids
  const scale = sliceScale()
  const threshold = isMobile.value ? 96 : 118
  const priority = (stop: (typeof points)[number]) => {
    if (stop.id === selectedId.value) return 0
    if (stop.id === hoveredId.value) return 1
    if (stop.id === travelMeta.homeId) return 2
    return 3
  }
  const visiblePoints = points.filter((stop) => !hiddenMarkerIds.value.has(stop.id))
  const ordered = [...visiblePoints].sort((a, b) => priority(a) - priority(b))
  const placed: Array<{ x: number; y: number }> = []

  for (const stop of ordered) {
    const tooClose = placed.some((point) => {
      const dx = (point.x - stop.px) * camera.k
      const dy = (point.y - stop.py) * camera.k
      return Math.hypot(dx, dy) * scale < threshold
    })
    if (!tooClose) {
      ids.add(stop.id)
      placed.push({ x: stop.px, y: stop.py })
    }
  }
  return ids
})

const cameraTransform = computed(
  () => `translate(${camera.x.toFixed(3)}px, ${camera.y.toFixed(3)}px) scale(${camera.k.toFixed(4)})`,
)


const stats = computed(() => {
  const home = homeStop.value
  const photos = stops.reduce((total, stop) => total + stop.photos.length, 0)
  const countriesCount = new Set(stops.map((stop) => stop.country)).size
  const kilometers = stops
    .filter((stop) => stop.id !== home.id)
    .reduce((total, stop) => total + distanceKm(home, stop), 0)

  return [
    { value: String(stops.length).padStart(2, '0'), label: '个地点' },
    { value: String(countriesCount).padStart(2, '0'), label: '个国家' },
    { value: String(photos).padStart(2, '0'), label: '张照片' },
    { value: Math.round(kilometers).toLocaleString('en-US'), label: '公里' },
  ]
})

const selectedIndex = computed(() => stops.findIndex((stop) => stop.id === selectedId.value))

const lightboxPhotos = computed(() => selectedStop.value?.photos ?? [])
const currentPhoto = computed(() =>
  lightboxIndex.value >= 0 ? lightboxPhotos.value[lightboxIndex.value] ?? null : null,
)

const lightboxOpen = computed(() => lightboxIndex.value >= 0 && !!selectedStop.value)

function onLightboxImageLoad(event: Event): void {
  const image = event.currentTarget as HTMLImageElement
  image.classList.add('is-loaded')
}

function preloadLightboxPhotos(): void {
  if (typeof window === 'undefined' || !lightboxOpen.value)
    return
  const photos = lightboxPhotos.value
  if (!photos.length)
    return
  const offsets = isMobile.value ? [0, 1] : [0, 1, -1]
  for (const offset of offsets) {
    const photo = photos[(lightboxIndex.value + offset + photos.length) % photos.length]
    if (!photo)
      continue
    const image = new Image()
    image.src = photoUrl(photo.file, 1800)
  }
}

watch([lightboxOpen, lightboxIndex], preloadLightboxPhotos, { immediate: true })

type LightboxPhoto = TravelStop['photos'][number]

const activeLightboxLayer = ref(0)
const lightboxLayers = ref([
  { key: '', photo: null as LightboxPhoto | null },
  { key: '', photo: null as LightboxPhoto | null },
])

function syncLightboxLayer(): void {
  const photo = currentPhoto.value
  if (!photo)
    return
  const key = `${photo.file}-${lightboxIndex.value}`
  const active = lightboxLayers.value[activeLightboxLayer.value]
  if (active?.key === key)
    return
  if (!active?.photo) {
    lightboxLayers.value[activeLightboxLayer.value] = { key, photo }
    return
  }
  const next = activeLightboxLayer.value === 0 ? 1 : 0
  lightboxLayers.value[next] = { key, photo }
  activeLightboxLayer.value = next
}

watch(lightboxOpen, (open) => {
  if (!open)
    return
  lightboxLayers.value = [
    { key: '', photo: null },
    { key: '', photo: null },
  ]
  activeLightboxLayer.value = 0
  syncLightboxLayer()
}, { immediate: true })

watch(lightboxIndex, () => {
  if (lightboxOpen.value)
    syncLightboxLayer()
})

const readout = computed(() => {
  const stop = activeStop.value
  if (stop) {
    return {
      place: `${stop.en.toUpperCase()} · ${stop.countryEn.toUpperCase()}`,
      coords: `${Math.abs(stop.lat).toFixed(4)}° ${stop.lat >= 0 ? 'N' : 'S'}  /  ${Math.abs(stop.lng).toFixed(4)}° ${stop.lng >= 0 ? 'E' : 'W'}`,
    }
  }
  const ll = pointerLL.value
  if (ll) {
    return {
      place: 'CURSOR',
      coords: `${Math.abs(ll[1]).toFixed(4)}° ${ll[1] >= 0 ? 'N' : 'S'}  /  ${Math.abs(ll[0]).toFixed(4)}° ${ll[0] >= 0 ? 'E' : 'W'}`,
    }
  }
  return {
    place: `${homeStop.value.en.toUpperCase()} · ${stops.length} PLACES`,
    coords: `${Math.abs(homeStop.value.lat).toFixed(4)}° N  /  ${Math.abs(homeStop.value.lng).toFixed(4)}° E`,
  }
})

const scaleBar = computed(() => {
  const currentProjection = projectionRef.value
  if (!currentProjection || !mapSize.w) return null
  const pxPerBase = Math.max(mapSize.w / BASE_W, mapSize.h / BASE_H)
  const p1 = currentProjection([104, 20])
  const p2 = currentProjection([105, 20])
  if (!p1 || !p2) return null
  const pxPerDegree = Math.abs(p2[0] - p1[0]) * camera.k * pxPerBase
  const options = [50, 100, 200, 500, 1000, 2000, 5000]
  let distance = options[0]
  for (const option of options) {
    if ((option / 111) * pxPerDegree <= 132) distance = option
  }
  return {
    width: Math.max(26, (distance / 111) * pxPerDegree),
    label: distance >= 1000 ? `${distance / 1000}k KM` : `${distance} KM`,
  }
})

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function sliceScale(): number {
  return Math.max(mapSize.w / BASE_W, mapSize.h / BASE_H)
}

function stopsCenter(): MapPoint {
  if (!mappedStops.value.length) return { x: 600, y: 375 }
  const points = mappedStops.value
  return {
    x: points.reduce((sum, s) => sum + s.px, 0) / points.length,
    y: points.reduce((sum, s) => sum + s.py, 0) / points.length,
  }
}

function defaultCamera(): Camera {
  const points = mappedStops.value
  const center = stopsCenter()
  const maxZoom = isMobile.value ? MOBILE_ZOOM : DESKTOP_ZOOM
  const minZoom = 1

  if (points.length <= 1) {
    return { k: maxZoom, x: BASE_W / 2 - center.x * maxZoom, y: BASE_H / 2 - center.y * maxZoom }
  }

  const xs = points.map((point) => point.px)
  const ys = points.map((point) => point.py)
  const spanX = Math.max(...xs) - Math.min(...xs)
  const spanY = Math.max(...ys) - Math.min(...ys)
  const fitZoom = Math.min(
    (BASE_W * 0.55) / Math.max(spanX, 1),
    (BASE_H * 0.62) / Math.max(spanY, 1),
  )
  const k = clamp(fitZoom, minZoom, maxZoom)
  return { k, x: BASE_W / 2 - center.x * k, y: BASE_H / 2 - center.y * k }
}

function setCamera(target: Camera): void {
  camera.k = target.k
  camera.x = target.x
  camera.y = target.y
}

function animateCamera(target: Camera, duration = 780): void {
  cancelAnimationFrame(raf)
  if (typeof window === 'undefined') {
    setCamera(target)
    return
  }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    setCamera(target)
    return
  }

  isInteracting.value = true
  const token = ++cameraAnimToken
  if (cameraGuard) clearTimeout(cameraGuard)
  const from = { ...camera }
  const started = performance.now()
  const ease = (t: number) => 1 - (1 - t) ** 3

  // 兜底：如果 rAF 被浏览器节流/暂停，超时后直接把目标应用上，避免按钮“点了没反应”
  cameraGuard = window.setTimeout(() => {
    if (token !== cameraAnimToken) return
    cameraAnimToken++
    setCamera(target)
    isInteracting.value = false
  }, duration + 220)

  const step = (now: number) => {
    if (token !== cameraAnimToken) return
    const t = clamp((now - started) / duration, 0, 1)
    const e = ease(t)
    camera.k = from.k + (target.k - from.k) * e
    camera.x = from.x + (target.x - from.x) * e
    camera.y = from.y + (target.y - from.y) * e
    if (t < 1) {
      raf = requestAnimationFrame(step)
    } else {
      clearTimeout(cameraGuard)
      cameraGuard = 0
      window.setTimeout(() => {
        isInteracting.value = false
      }, 120)
    }
  }
  raf = requestAnimationFrame(step)
}

function resetView(): void {
  clusterMenu.value = null
  selectedId.value = null
  lightboxIndex.value = -1
  animateCamera(defaultCamera(), 780)
}

function zoomAround(px: number, py: number, factor: number): void {
  cancelAnimationFrame(raf)
  const nextK = clamp(camera.k * factor, MIN_ZOOM, MAX_ZOOM)
  const ratio = nextK / camera.k
  camera.x = px - (px - camera.x) * ratio
  camera.y = py - (py - camera.y) * ratio
  camera.k = nextK
  clampCamera()
}

function animateZoom(factor: number, duration = 280): void {
  cancelAnimationFrame(raf)
  const nextK = clamp(camera.k * factor, MIN_ZOOM, MAX_ZOOM)
  const ratio = nextK / camera.k
  if (Math.abs(ratio - 1) < 0.0001) return
  const target = {
    k: nextK,
    x: BASE_W / 2 - (BASE_W / 2 - camera.x) * ratio,
    y: BASE_H / 2 - (BASE_H / 2 - camera.y) * ratio,
  }
  target.x = clamp(target.x, 150 - 1176 * nextK, BASE_W - 150 - 24 * nextK)
  target.y = clamp(target.y, 150 - 672 * nextK, BASE_H - 150 - 78 * nextK)
  animateCamera(target, duration)
}

function zoomIn(): void {
  animateZoom(1.35)
}

function zoomOut(): void {
  animateZoom(1 / 1.35)
}

function clampCamera(): void {
  const minX = 150 - 1176 * camera.k
  const maxX = BASE_W - 150 - 24 * camera.k
  const minY = 150 - 672 * camera.k
  const maxY = BASE_H - 150 - 78 * camera.k
  camera.x = clamp(camera.x, minX, maxX)
  camera.y = clamp(camera.y, minY, maxY)
}

function zoomCluster(cluster: MapCluster): void {
  const targetK = Math.min(camera.k * 2.1, MAX_ZOOM)
  animateCamera(
    {
      k: targetK,
      x: BASE_W / 2 - cluster.x * targetK,
      y: BASE_H / 2 - cluster.y * targetK,
    },
    650,
  )
}

function focusStop(stop: TravelStop & MapPoint): void {
  const targetK = isMobile.value ? 8.4 : Math.max(camera.k, 4.6)
  const anchorX = isMobile.value ? BASE_W / 2 : BASE_W * 0.42
  const anchorY = isMobile.value ? BASE_H / 2 : BASE_H * 0.49
  animateCamera(
    {
      k: targetK,
      x: anchorX - stop.px * targetK,
      y: anchorY - stop.py * targetK,
    },
    820,
  )
}

function syncPlaceInUrl(id: string | null): void {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  if (id) url.searchParams.set('place', id)
  else url.searchParams.delete('place')
  window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`)
}

function selectStop(stop: TravelStop & MapPoint): void {
  const wasOpen = !!selectedId.value
  if (!wasOpen && typeof document !== 'undefined') {
    lastFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
  }
  clusterMenu.value = null
  hoveredId.value = stop.id
  selectedId.value = stop.id
  lightboxIndex.value = -1
  syncPlaceInUrl(stop.id)
  focusStop(stop)
  nextTick(() => {
    if (!wasOpen) closeButtonEl.value?.focus({ preventScroll: true })
    const scrollEl = galleryEl.value?.querySelector<HTMLElement>('.atlas-side-scroll')
    scrollEl?.scrollTo({ top: 0, behavior: wasOpen ? 'smooth' : 'auto' })
  })
}

function browseStop(step: number): void {
  if (selectedIndex.value < 0) return
  const nextIndex = (selectedIndex.value + step + stops.length) % stops.length
  const next = mappedStops.value.find((stop) => stop.id === stops[nextIndex].id)
  if (next) selectStop(next)
}

function closeDetail(): void {
  clusterMenu.value = null
  lightboxIndex.value = -1
  selectedId.value = null
  hoveredId.value = null
  syncPlaceInUrl(null)
  animateCamera(defaultCamera(), 720)
  nextTick(() => lastFocus?.focus({ preventScroll: true }))
}

function openLightbox(index: number): void {
  if (!selectedStop.value) return
  lightboxIndex.value = index
}

function closeLightbox(): void {
  lightboxIndex.value = -1
  nextTick(() => galleryEl.value?.focus({ preventScroll: true }))
}

let lightboxSwipeX = 0
let lightboxSwipeY = 0
let lightboxSwipeActive = false

function onLightboxTouchStart(event: TouchEvent): void {
  const target = event.target as Element | null
  if (!target || target.closest('.atlas-lb-thumbs, .atlas-lb-close, .atlas-lb-nav')) {
    lightboxSwipeActive = false
    return
  }
  if (event.touches.length !== 1) {
    lightboxSwipeActive = false
    return
  }
  lightboxSwipeActive = true
  lightboxSwipeX = event.touches[0].clientX
  lightboxSwipeY = event.touches[0].clientY
}

function onLightboxTouchEnd(event: TouchEvent): void {
  if (!lightboxSwipeActive)
    return
  lightboxSwipeActive = false
  const touch = event.changedTouches[0]
  if (!touch)
    return
  const dx = touch.clientX - lightboxSwipeX
  const dy = touch.clientY - lightboxSwipeY
  if (Math.abs(dx) < 42 || Math.abs(dx) < Math.abs(dy) * 1.2)
    return
  if (dx < 0)
    nextPhoto()
  else
    prevPhoto()
}

function prevPhoto(): void {
  if (!lightboxPhotos.value.length) return
  lightboxIndex.value =
    (lightboxIndex.value - 1 + lightboxPhotos.value.length) % lightboxPhotos.value.length
}

function nextPhoto(): void {
  if (!lightboxPhotos.value.length) return
  lightboxIndex.value = (lightboxIndex.value + 1) % lightboxPhotos.value.length
}

function onKeydown(event: KeyboardEvent): void {
  if (lightboxIndex.value >= 0) {
    if (event.key === 'Escape') {
      event.preventDefault()
      closeLightbox()
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      prevPhoto()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      nextPhoto()
    }
    return
  }
  if (clusterMenu.value && event.key === 'Escape') {
    event.preventDefault()
    closeCluster()
    return
  }
  if (selectedId.value && event.key === 'ArrowLeft') {
    event.preventDefault()
    browseStop(-1)
    return
  }
  if (selectedId.value && event.key === 'ArrowRight') {
    event.preventDefault()
    browseStop(1)
    return
  }
  if (selectedId.value && event.key === 'Escape') {
    event.preventDefault()
    closeDetail()
  }
}

function onWheel(event: WheelEvent): void {
  event.preventDefault()
  markInteracting(180)
  wheelFactor *= Math.exp(-event.deltaY * 0.0016)
  if (wheelRaf) return
  wheelRaf = requestAnimationFrame(() => {
    const factor = wheelFactor
    wheelFactor = 1
    wheelRaf = 0
    zoomAround(BASE_W / 2, BASE_H / 2, factor)
  })
}

function pointerToLngLat(event: PointerEvent): [number, number] | null {
  if (!projection || !mapEl.value) return null
  const rect = mapEl.value.getBoundingClientRect()
  const scale = 1 / sliceScale()
  const vbX = BASE_W / 2 + (event.clientX - rect.left - rect.width / 2) * scale
  const vbY = BASE_H / 2 + (event.clientY - rect.top - rect.height / 2) * scale
  const baseX = (vbX - camera.x) / camera.k
  const baseY = (vbY - camera.y) / camera.k
  const ll = projection.invert?.([baseX, baseY])
  if (!ll || !Number.isFinite(ll[0]) || !Number.isFinite(ll[1])) return null
  return [ll[0], ll[1]]
}

function onPointerDown(event: PointerEvent): void {
  if (event.button !== 0) return
  markInteracting(220)
  cancelAnimationFrame(raf)
  drag = {
    id: event.pointerId,
    x: event.clientX,
    y: event.clientY,
    camX: camera.x,
    camY: camera.y,
    moved: false,
  }
  mapEl.value?.setPointerCapture?.(event.pointerId)
}

function queuePointerReadout(ll: [number, number]): void {
  pendingPointerLL = ll
  if (pointerTimer)
    return
  const wait = Math.max(0, 90 - (performance.now() - pointerLast))
  pointerTimer = window.setTimeout(() => {
    pointerTimer = 0
    if (!pendingPointerLL)
      return
    pointerLL.value = pendingPointerLL
    pendingPointerLL = null
    pointerLast = performance.now()
  }, wait)
}

function onPointerMove(event: PointerEvent): void {
  // The bottom readout is the only consumer of cursor coordinates. Skip the
  // inverse projection + reactive render when a stop is hovered or the drawer
  // hides the readout, and throttle it to ~11fps otherwise.
  if (!selectedStop.value && !hoveredStop.value) {
    const ll = pointerToLngLat(event)
    if (ll)
      queuePointerReadout(ll)
  }

  if (!drag || drag.id !== event.pointerId) return
  const dx = event.clientX - drag.x
  const dy = event.clientY - drag.y
  if (!drag.moved && Math.hypot(dx, dy) > 3) {
    drag.moved = true
    isDragging.value = true
  }
  if (!drag.moved) return

  markInteracting(220)
  const scale = 1 / sliceScale()
  pendingPan = {
    x: drag.camX + dx * scale,
    y: drag.camY + dy * scale,
  }
  if (panRaf) return
  panRaf = requestAnimationFrame(() => {
    if (pendingPan) {
      camera.x = pendingPan.x
      camera.y = pendingPan.y
      pendingPan = null
      clampCamera()
    }
    panRaf = 0
  })
}

function onPointerUp(event: PointerEvent): void {
  if (drag && drag.id === event.pointerId) {
    mapEl.value?.releasePointerCapture?.(event.pointerId)
  }
  drag = null
  isDragging.value = false
}

function onPointerLeave(): void {
  if (pointerTimer) {
    clearTimeout(pointerTimer)
    pointerTimer = 0
  }
  pendingPointerLL = null
  pointerLL.value = null
}

function onDblClick(): void {
  zoomIn()
}

async function loadGeo(): Promise<void> {
  try {
    const response = await fetch(withBase('/world.json'))
    if (!response.ok) throw new Error(`world.json ${response.status}`)
    const world = await response.json()

    const d3 = await import('d3-geo')
    const features = (world.features as any[])
      .filter((feature) => feature?.properties?.name !== ANTARCTICA)
      .map((feature) => ({
        type: 'Feature',
        properties: feature.properties ?? {},
        geometry: feature.geometry,
      }))
    const collection = { type: 'FeatureCollection', features }

    projection = d3
      .geoNaturalEarth1()
      .fitExtent(
        [
          [24, 78],
          [BASE_W - 24, BASE_H - 78],
        ],
        collection as any,
      )
    pathGen = d3.geoPath(projection)
    projectionRef.value = projection

    countries.value = features.map((feature) => ({
      name: feature.properties?.name ?? '',
      d: pathGen(feature) ?? '',
      visited: stops.some((stop) => stop.countryEn === feature.properties?.name),
    }))

    graticulePath.value = pathGen(d3.geoGraticule().step([15, 15])()) ?? ''
    spherePath.value = pathGen({ type: 'Sphere' }) ?? ''

    const home = homeStop.value
    const homePoint = projection([home.lng, home.lat]) as [number, number]
    if (homePoint) {
      routeHub.value = { x: homePoint[0], y: homePoint[1] }
      routes.value = stops
        .filter((stop) => stop.id !== home.id)
        .map((stop) => {
          const point = projection([stop.lng, stop.lat]) as [number, number]
          const [x1, y1] = homePoint
          const [x2, y2] = point
          const dx = x2 - x1
          const dy = y2 - y1
          const cx = (x1 + x2) / 2 - dy * 0.24
          const cy = (y1 + y2) / 2 + dx * 0.24
          return {
            id: stop.id,
            d: `M ${x1.toFixed(2)} ${y1.toFixed(2)} Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${x2.toFixed(2)} ${y2.toFixed(2)}`,
            length: Math.hypot(dx, dy),
            x1,
            y1,
            x2,
            y2,
          }
        })
    }

    const labelSpec = [
      { text: 'CHINA', lon: 103, lat: 38, size: 11, opacity: 0.24 },
      { text: 'SOUTH CHINA SEA', lon: 114, lat: 9.8, size: 7, opacity: 0.2, italic: true },
      { text: 'BAY OF BENGAL', lon: 88.5, lat: 13.5, size: 6.5, opacity: 0.16, italic: true },
      { text: 'PHILIPPINE SEA', lon: 132, lat: 18, size: 7.5, opacity: 0.16, italic: true },
      { text: 'INDIAN OCEAN', lon: 86, lat: 2, size: 7.5, opacity: 0.14, italic: true },
    ]
    geoLabels.value = labelSpec
      .map((label) => {
        const point = projection([label.lon, label.lat])
        return point ? { ...label, x: point[0], y: point[1] } : null
      })
      .filter(Boolean) as typeof geoLabels.value

    setCamera(defaultCamera())
    geoReady.value = true
    await nextTick()

    const place = new URLSearchParams(window.location.search).get('place')
    const initialStop = place ? mappedStops.value.find((stop) => stop.id === place) : null
    if (initialStop) selectStop(initialStop)
  } catch (error) {
    console.error('[TravelMap] failed to load map geometry', error)
    geoError.value = true
  }
}

function onResize(): void {
  if (!mapEl.value) return
  const rect = mapEl.value.getBoundingClientRect()
  if (rect.width && rect.height) {
    mapSize.w = rect.width
    mapSize.h = rect.height
  }
  if (typeof window !== 'undefined' && window.innerWidth) {
    isMobile.value = window.innerWidth <= 900
  }
}

onMounted(async () => {
  alive = true
  isMobile.value = window.matchMedia('(max-width: 900px)').matches
  onResize()

  resizeObserver = new ResizeObserver(onResize)
  if (mapEl.value) resizeObserver.observe(mapEl.value)

  mapEl.value?.addEventListener('wheel', onWheel, { passive: false })
  window.addEventListener('keydown', onKeydown)

  await loadGeo()
  if (!alive) return
})

onBeforeUnmount(() => {
  alive = false
  cancelAnimationFrame(raf)
  clearTimeout(cameraGuard)
  cancelAnimationFrame(wheelRaf)
  cancelAnimationFrame(panRaf)
  clearTimeout(pointerTimer)
  clearTimeout(interactTimer)
  resizeObserver?.disconnect()
  mapEl.value?.removeEventListener('wheel', onWheel)
  window.removeEventListener('keydown', onKeydown)
  setAtlasLocked(false)
})

function setAtlasLocked(locked: boolean): void {
  if (typeof document === 'undefined')
    return
  const html = document.documentElement
  const isLocked = html.classList.contains('atlas-locked')
  if (locked === isLocked)
    return
  if (locked) {
    atlasLockScrollY = window.scrollY
    document.body.style.top = `-${atlasLockScrollY}px`
    html.classList.add('atlas-locked')
  } else {
    html.classList.remove('atlas-locked')
    document.body.style.top = ''
    window.scrollTo(0, atlasLockScrollY)
  }
}

watch([selectedId, lightboxIndex, clusterMenu], () => {
  setAtlasLocked(!!selectedId.value || lightboxIndex.value >= 0 || !!clusterMenu.value)
})

watch(isMobile, () => {
  if (geoReady.value) animateCamera(defaultCamera(), 500)
})

watch(lightboxIndex, async (index) => {
  if (index < 0 || typeof document === 'undefined') return
  await nextTick()
  document
    .querySelector('.atlas-lb-thumb.is-active')
    ?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
})
</script>

<template>
  <div ref="rootEl" class="atlas" :class="{ 'is-detail': !!selectedStop, 'is-ready': geoReady }">
    <div class="atlas-bg" aria-hidden="true"></div>
    <div class="atlas-vignette" aria-hidden="true"></div>
    <div class="atlas-grain" aria-hidden="true"></div>
    <div class="atlas-top-fade" aria-hidden="true"></div>

    <div
      ref="mapEl"
      class="atlas-map"
      :class="{ 'is-dragging': isDragging, 'is-loaded': geoReady, 'is-interacting': isInteracting }"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @pointerleave="onPointerLeave"
      @dblclick="onDblClick"
    >
      <div v-if="!geoReady && !geoError" class="atlas-map-loading">
        <span>LOADING ATLAS</span>
      </div>

      <div v-if="geoError" class="atlas-map-error">
        <span>地图数据加载失败</span>
        <p>请检查网络后刷新页面。</p>
      </div>

      <svg
        v-if="geoReady"
        class="atlas-svg"
        :viewBox="`0 0 ${BASE_W} ${BASE_H}`"
        preserveAspectRatio="xMidYMid slice"
        role="group"
        :aria-label="`旅行足迹地图，标注了 ${stops.length} 个地点`"
      >
        <defs>
          <radialGradient id="atlas-marker-glow">
            <stop offset="0%" style="stop-color: var(--atlas-glow)" stop-opacity="0.34" />
            <stop offset="45%" style="stop-color: var(--atlas-glow)" stop-opacity="0.1" />
            <stop offset="100%" style="stop-color: var(--atlas-glow)" stop-opacity="0" />
          </radialGradient>
          <linearGradient id="atlas-visited-land" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" style="stop-color: var(--atlas-visited-from)" />
            <stop offset="100%" style="stop-color: var(--atlas-visited-to)" />
          </linearGradient>
          <radialGradient id="atlas-route-aura">
            <stop offset="0%" style="stop-color: var(--atlas-glow)" stop-opacity="0.15" />
            <stop offset="55%" style="stop-color: var(--atlas-aura)" stop-opacity="0.05" />
            <stop offset="100%" style="stop-color: var(--atlas-aura)" stop-opacity="0" />
          </radialGradient>
        </defs>

        <g class="atlas-camera" :style="{ transform: cameraTransform }">
          <path class="atlas-sphere" :d="spherePath" />
          <path class="atlas-graticule" :d="graticulePath" />

          <g class="atlas-countries">
            <path
              v-for="country in countries"
              :key="country.name"
              class="atlas-country"
              :class="{ 'is-visited': country.visited }"
              :d="country.d"
            />
          </g>

          <g v-if="routes.length" class="atlas-route">
            <circle
              v-if="routeHub"
              class="atlas-route-aura"
              :cx="routeHub.x"
              :cy="routeHub.y"
              r="118"
            />
            <path class="atlas-route-halo" :d="routesPath" />
            <path class="atlas-route-line" :d="routesPath" pathLength="1" />
          </g>

          <g class="atlas-geo-labels" aria-hidden="true">
            <g
              v-for="label in geoLabels"
              :key="label.text"
              :transform="`translate(${label.x.toFixed(2)} ${label.y.toFixed(2)}) scale(${(1 / camera.k).toFixed(4)})`"
            >
              <text
                :font-size="label.size"
                :opacity="label.opacity"
                :class="{ 'is-italic': label.italic }"
                text-anchor="middle"
              >
                {{ label.text }}
              </text>
            </g>
          </g>

          <g class="atlas-markers">
            <template v-for="stop in mappedStops" :key="stop.id">
              <g
                v-if="!hiddenMarkerIds.has(stop.id)"
                class="atlas-marker"
                :class="{
                  'is-active': activeStop?.id === stop.id,
                  'is-selected': selectedId === stop.id,
                }"
                :transform="`translate(${stop.px.toFixed(2)} ${stop.py.toFixed(2)}) scale(${(1 / camera.k).toFixed(4)})`"
                role="button"
                tabindex="0"
                :aria-label="`查看${stop.name}的照片`"
                @click.stop="selectStop(stop)"
                @pointerdown.stop
                @keydown.enter.stop="selectStop(stop)"
                @keydown.space.prevent.stop="selectStop(stop)"
                @mouseenter="hoveredId = stop.id"
                @mouseleave="hoveredId = null"
                @focus="hoveredId = stop.id"
                @blur="hoveredId = null"
              >
                <circle class="atlas-marker-halo" r="34" />
                <circle class="atlas-marker-pulse" r="12" />
                <circle class="atlas-marker-ring" r="10.5" />
                <circle class="atlas-marker-core" r="3.1" />
                <g
                  class="atlas-marker-label"
                  :class="[`is-${stop.labelSide}`, { 'is-hidden': !visibleLabelIds.has(stop.id) }]"
                  :transform="`translate(${stop.labelDx} ${stop.labelDy})`"
                >
                  <text class="atlas-label-cn" y="0">{{ stop.name }}</text>
                  <text class="atlas-label-en" y="15">{{ stop.en.toUpperCase() }}</text>
                  <text class="atlas-label-meta" y="28">{{ stop.visitedAt }} · {{ stop.photos.length }} 张</text>
                </g>
              </g>
            </template>

            <g
              v-for="cluster in visibleClusters"
              :key="cluster.id"
              class="atlas-cluster"
              :transform="`translate(${cluster.x.toFixed(2)} ${cluster.y.toFixed(2)}) scale(${(1 / camera.k).toFixed(4)})`"
              role="button"
              tabindex="0"
              :aria-label="`${cluster.count} 个地点，打开地点列表`"
              @click.stop="openCluster(cluster)"
              @pointerdown.stop
              @keydown.enter.stop="openCluster(cluster)"
              @keydown.space.prevent.stop="openCluster(cluster)"
            >
              <circle class="atlas-cluster-halo" r="38" />
              <circle class="atlas-cluster-ring" r="17" />
              <text class="atlas-cluster-count" y="1">{{ cluster.count }}</text>
              <text class="atlas-cluster-label" y="31">PLACES</text>
            </g>
          </g>
        </g>
      </svg>

      <div v-if="geoReady" class="atlas-map-ui">
        <div class="atlas-compass" aria-hidden="true">
          <svg viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="16.5" fill="none" stroke="currentColor" stroke-opacity="0.18" />
            <path d="M22 6.5 24.7 22 22 20.2 19.3 22Z" fill="currentColor" />
            <path d="M22 37.5 19.3 22 22 23.8 24.7 22Z" fill="currentColor" opacity="0.45" />
            <circle cx="22" cy="22" r="1.2" fill="currentColor" />
          </svg>
          <span>N</span>
        </div>

        <div class="atlas-tools" @pointerdown.stop @dblclick.stop>
          <button type="button" aria-label="放大地图" @click="zoomIn">
            <svg viewBox="0 0 20 20"><path d="M10 4v12M4 10h12" /></svg>
          </button>
          <button type="button" aria-label="缩小地图" @click="zoomOut">
            <svg viewBox="0 0 20 20"><path d="M4 10h12" /></svg>
          </button>
          <button type="button" aria-label="重置地图视图" @click="resetView">
            <svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="6.5" /><circle cx="10" cy="10" r="1.5" fill="currentColor" stroke="none" /></svg>
          </button>
        </div>

        <div v-if="scaleBar" class="atlas-scale">
          <span class="atlas-scale-line" :style="{ width: `${scaleBar.width}px` }"></span>
          <em>{{ scaleBar.label }}</em>
        </div>

        <div class="atlas-readout">
          <span class="atlas-readout-place">{{ readout.place }}</span>
          <span class="atlas-readout-coords">{{ readout.coords }}</span>
          <span class="atlas-readout-hint">DRAG TO PAN · SCROLL TO ZOOM</span>
        </div>
      </div>
    </div>

    <section class="atlas-intro" :class="{ 'is-dimmed': !!selectedStop }" aria-label="旅行足迹简介">
      <p class="atlas-eyebrow">
        <span class="atlas-eyebrow-line"></span>
        {{ travelMeta.subtitle }}
      </p>

      <h1 class="atlas-title">
        <span>旅行</span>
        <span class="atlas-title-accent">足迹</span>
        <em>places i've been</em>
      </h1>

      <p class="atlas-lede">{{ travelMeta.intro }}</p>
      <p class="atlas-blurb">{{ travelMeta.blurb }}</p>

      <div class="atlas-stats">
        <div v-for="stat in stats" :key="stat.label" class="atlas-stat">
          <strong>{{ stat.value }}</strong>
          <span>{{ stat.label }}</span>
        </div>
      </div>

      <div class="atlas-list-head">
        <span>ALL PLACES</span>
        <span>{{ stops.length }}</span>
      </div>

      <div class="atlas-stop-list">
        <button
          v-for="(stop, index) in mappedStops"
          :key="stop.id"
          type="button"
          class="atlas-stop"
          :class="{ 'is-active': selectedId === stop.id, 'is-hovered': hoveredId === stop.id }"
          @click="selectStop(stop)"
          @mouseenter="hoveredId = stop.id"
          @mouseleave="hoveredId = null"
          @focus="hoveredId = stop.id"
          @blur="hoveredId = null"
        >
          <span class="atlas-stop-thumb">
            <img
              v-if="stop.photos.length"
              :src="photoUrl(stop.thumb ?? stop.photos[0].file, 220)"
              alt=""
              loading="lazy"
              decoding="async"
              no-view
            />
          </span>
          <span class="atlas-stop-copy">
            <span class="atlas-stop-name">{{ stop.name }}<em>{{ stop.en }}</em></span>
            <span class="atlas-stop-meta">{{ stop.role }} · {{ stop.country }} · {{ stop.visitedAt }}</span>
          </span>
          <span class="atlas-stop-index">{{ String(index + 1).padStart(2, '0') }}</span>
        </button>
      </div>

    </section>

    <Teleport to="body">
      <Transition name="atlas-fade">
        <div v-if="selectedStop" class="atlas-scrim" @click="closeDetail"></div>
      </Transition>

      <Transition name="atlas-side">
        <aside
          v-if="selectedStop"
          ref="galleryEl"
          class="atlas-side"
          role="dialog"
          aria-modal="true"
          :aria-label="`${selectedStop.name}摄影作品`"
          tabindex="-1"
        >
          <div class="atlas-side-scroll">
            <header class="atlas-side-bar">
              <span class="atlas-side-brand">TRAVEL ATLAS</span>

              <div class="atlas-gallery-nav">
                <button type="button" aria-label="上一个地点" @click="browseStop(-1)">
                  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M12 4 5 10l7 6" /></svg>
                </button>
                <span class="atlas-gallery-count">
                  {{ String(selectedIndex + 1).padStart(2, '0') }}
                  <em>/ {{ String(stops.length).padStart(2, '0') }}</em>
                </span>
                <button type="button" aria-label="下一个地点" @click="browseStop(1)">
                  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m8 4 7 6-7 6" /></svg>
                </button>
              </div>

              <button
                ref="closeButtonEl"
                type="button"
                class="atlas-side-close"
                aria-label="关闭作品集"
                @click="closeDetail"
              >
                <svg viewBox="0 0 20 20"><path d="M5 5l10 10M15 5 5 15" /></svg>
              </button>
            </header>

            <div :key="selectedStop.id" class="atlas-side-body">
              <p class="atlas-side-kicker">PHOTOGRAPHS · {{ selectedStop.photos.length }}</p>

              <h2 class="atlas-side-title">
                {{ selectedStop.name }}
                <em>{{ selectedStop.en }}</em>
              </h2>

              <p class="atlas-side-desc">{{ selectedStop.description }}</p>

              <div class="atlas-side-time">
                <span class="atlas-side-time-label">时间</span>
                <strong>{{ selectedStop.visitedAt }}</strong>
                <span v-if="selectedStop.season !== '—'" class="atlas-side-time-season">{{ selectedStop.season }}</span>
              </div>

              <div class="atlas-side-meta">
                <span><em>地点</em>{{ selectedStop.country }} · {{ selectedStop.countryEn }}</span>
                <span><em>坐标</em>{{ Math.abs(selectedStop.lat).toFixed(2) }}° {{ selectedStop.lat >= 0 ? 'N' : 'S' }} / {{ Math.abs(selectedStop.lng).toFixed(2) }}° {{ selectedStop.lng >= 0 ? 'E' : 'W' }}</span>
                <span><em>影像</em>{{ selectedStop.photos.length }} 张</span>
              </div>

              <div class="atlas-masonry">
                <figure
                  v-for="(photo, index) in selectedStop.photos"
                  :key="photo.file + index"
                  class="atlas-wall-item"
                >
                  <button
                    type="button"
                    class="atlas-wall-button"
                    :class="photo.file === 'IMG_6226.jpeg' ? 'is-portrait' : 'is-landscape'"
                    :aria-label="`查看照片：${photo.caption}`"
                    @click="openLightbox(index)"
                  >
                    <img
                      :src="photoUrl(photo.file, 900)"
                      :alt="photo.alt"
                      loading="lazy"
                      decoding="async"
                      no-view
                    />
                  </button>
                  <figcaption>
                    <span>{{ photo.caption }}</span>
                    <em>{{ String(index + 1).padStart(2, '0') }}</em>
                  </figcaption>
                </figure>
              </div>

              <p class="atlas-side-end">
                <span>END OF ROLL</span>
                <span>{{ selectedStop.photos.length }} PHOTOGRAPHS</span>
              </p>
            </div>
          </div>
        </aside>
      </Transition>

      <Transition name="atlas-fade">
        <div v-if="clusterMenu" class="atlas-picker-overlay" @click.self="closeCluster">
          <section
            class="atlas-picker-card"
            role="dialog"
            aria-modal="true"
            :aria-label="`${clusterMenu.count} 个地点`"
          >
            <header class="atlas-picker-head">
              <div>
                <p class="atlas-picker-kicker">CLUSTER · {{ clusterMenu.count }} PLACES</p>
                <h3>选择地点</h3>
              </div>
              <button type="button" class="atlas-picker-close" aria-label="关闭地点列表" @click="closeCluster">
                <svg viewBox="0 0 20 20"><path d="M5 5l10 10M15 5 5 15" /></svg>
              </button>
            </header>

            <div class="atlas-picker-list">
              <button
                v-for="stop in clusterStops"
                :key="stop.id"
                type="button"
                class="atlas-picker-row"
                @click="chooseClusterStop(stop)"
              >
                <img
                  :src="photoUrl(stop.photos[0]?.file ?? '', 160)"
                  :alt="stop.name"
                  no-view
                />
                <span class="atlas-picker-info">
                  <strong>{{ stop.name }}</strong>
                  <em>{{ stop.en }} · {{ stop.country }} · {{ stop.visitedAt }}</em>
                </span>
                <span class="atlas-picker-count">{{ stop.photos.length }}</span>
              </button>
            </div>

            <button type="button" class="atlas-picker-zoom" @click="zoomIntoCluster">
              <span>继续放大查看</span>
              <em>ZOOM IN</em>
            </button>
          </section>
        </div>
      </Transition>

      <Transition name="atlas-fade">
        <div
          v-if="lightboxOpen && currentPhoto"
          class="atlas-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="照片浏览"
          @click.self="closeLightbox"
          @touchstart.passive="onLightboxTouchStart"
          @touchend="onLightboxTouchEnd"
        >
          <Transition name="atlas-lb-ambient">
            <div
              :key="`${currentPhoto.file}-${lightboxIndex}`"
              class="atlas-lb-ambient"
              :style="{ backgroundImage: `url(${photoUrl(currentPhoto.file, 900)})` }"
              aria-hidden="true"
            ></div>
          </Transition>
          <div class="atlas-lb-veil" aria-hidden="true"></div>

          <button type="button" class="atlas-lb-close" aria-label="关闭照片" @click="closeLightbox">
            <svg viewBox="0 0 20 20"><path d="M5 5l10 10M15 5 5 15" /></svg>
          </button>
          <span class="atlas-lb-counter">{{ lightboxIndex + 1 }} / {{ lightboxPhotos.length }}</span>

          <button
            v-if="lightboxPhotos.length > 1"
            type="button"
            class="atlas-lb-nav is-prev"
            aria-label="上一张"
            @click="prevPhoto"
          >
            <svg viewBox="0 0 24 24"><path d="M15 5 8 12l7 7" /></svg>
          </button>

          <figure class="atlas-lb-figure">
            <div class="atlas-lb-stage">
              <div
                v-for="(layer, index) in lightboxLayers"
                :key="index"
                class="atlas-lb-layer"
                :class="{ 'is-active': index === activeLightboxLayer }"
              >
                <template v-if="layer.photo">
                  <img
                    :key="`preview-${layer.key}`"
                    class="atlas-lb-preview"
                    :src="photoUrl(layer.photo.file, 900)"
                    alt=""
                    no-view
                  />
                  <img
                    :key="`full-${layer.key}`"
                    class="atlas-lb-full"
                    :src="photoUrl(layer.photo.file, 1800)"
                    :alt="layer.photo.alt"
                    no-view
                    @load="onLightboxImageLoad"
                  />
                </template>
              </div>
            </div>
            <figcaption :key="`${currentPhoto.file}-${lightboxIndex}`">
              <span>{{ currentPhoto.caption }}</span>
              <em>{{ selectedStop?.name }} · {{ selectedStop?.visitedAt }}</em>
            </figcaption>
          </figure>

          <button
            v-if="lightboxPhotos.length > 1"
            type="button"
            class="atlas-lb-nav is-next"
            aria-label="下一张"
            @click="nextPhoto"
          >
            <svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7" /></svg>
          </button>

          <div v-if="lightboxPhotos.length > 1" class="atlas-lb-thumbs">
            <button
              v-for="(photo, index) in lightboxPhotos"
              :key="photo.file + index"
              type="button"
              class="atlas-lb-thumb"
              :class="{ 'is-active': index === lightboxIndex }"
              :aria-label="`第 ${index + 1} 张`"
              @click="lightboxIndex = index"
            >
              <img :src="photoUrl(photo.file, 180)" alt="" no-view />
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.atlas {
  /* 浅色主题（默认） */
  --atlas-fg: 28, 34, 37;
  --atlas-accent: 141, 101, 56;
  --atlas-route: 145, 103, 58;
  --atlas-line: 58, 72, 68;
  --atlas-sage: 85, 117, 107;
  --atlas-border-alpha: 0.46;
  --ink: #f6f6f2;
  --ink-soft: #efefea;
  --paper: rgb(var(--atlas-fg));
  --muted: rgba(var(--atlas-fg), 0.58);
  --faint: rgba(var(--atlas-fg), 0.38);
  --line: rgba(var(--atlas-fg), 0.12);
  --gold: rgb(var(--atlas-accent));
  --sage: rgb(var(--atlas-sage));
  --atlas-land: #d8d9d2;
  --atlas-marker-fill: rgba(255, 255, 255, 0.72);
  --atlas-marker-core: #1c2428;
  --atlas-cluster-fill: rgba(255, 255, 255, 0.82);
  --atlas-image-bg: #e8e8e3;
  --atlas-tool-bg: rgba(255, 255, 255, 0.72);
  --atlas-panel: rgba(247, 247, 243, 0.985);
  --atlas-panel-2: rgba(242, 242, 237, 0.995);
  --atlas-panel-line: rgba(28, 34, 37, 0.12);
  --atlas-elev: rgba(28, 34, 37, 0.18);
  --atlas-picker-scrim: rgba(28, 34, 37, 0.28);
  --atlas-canvas:
    radial-gradient(48% 54% at 64% 46%, rgba(82, 120, 114, 0.08) 0%, rgba(234, 242, 239, 0) 66%),
    radial-gradient(34% 38% at 82% 18%, rgba(168, 122, 70, 0.03) 0%, rgba(234, 242, 239, 0) 70%),
    linear-gradient(180deg, #eaf2ef 0%, #e7efec 52%, #e2eae6 100%);
  --atlas-vignette:
    linear-gradient(90deg, rgba(251, 250, 246, 0.94) 0%, rgba(251, 250, 246, 0.78) 14%, rgba(251, 250, 246, 0.34) 27%, rgba(251, 250, 246, 0.06) 39%, rgba(251, 250, 246, 0) 48%),
    linear-gradient(0deg, rgba(251, 250, 246, 0.62) 0%, rgba(251, 250, 246, 0) 26%);
  --atlas-grain-opacity: 0;
  --atlas-visited-from: #bcd5c6;
  --atlas-visited-to: #a7c1b2;
  --atlas-glow: #a9783f;
  --atlas-aura: #5f8377;
  --atlas-scrim: linear-gradient(90deg, rgba(247, 247, 243, 0) 0%, rgba(247, 247, 243, 0.14) 45%, rgba(247, 247, 243, 0.58) 100%);
  --serif: "Songti SC", "STSong", "Source Han Serif SC", "Noto Serif SC", "Noto Serif CJK SC", "Iowan Old Style", "Palatino Linotype", Georgia, serif;
  --sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;

  position: relative;
  margin-top: calc(-1 * var(--vp-nav-height));
  height: 100vh;
  height: 100svh;
  min-height: 640px;
  overflow: hidden;
  background: var(--ink);
  color: var(--paper);
  font-family: var(--sans);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

[data-theme="dark"] .atlas {
  --atlas-fg: 241, 236, 227;
  --atlas-accent: 217, 185, 142;
  --atlas-route: 225, 195, 154;
  --atlas-line: 157, 184, 192;
  --atlas-sage: 148, 181, 170;
  --atlas-border-alpha: 0.34;
  --ink: #06090c;
  --ink-soft: #0b1014;
  --atlas-land: #0f1c24;
  --atlas-marker-fill: var(--atlas-marker-fill);
  --atlas-marker-core: #f4ead9;
  --atlas-cluster-fill: var(--atlas-cluster-fill);
  --atlas-image-bg: #121a20;
  --atlas-tool-bg: rgba(8, 12, 16, 0.72);
  --atlas-panel: rgba(19, 25, 30, 0.985);
  --atlas-panel-2: rgba(9, 13, 17, 0.995);
  --atlas-panel-line: rgba(var(--atlas-fg), 0.1);
  --atlas-elev: rgba(0, 0, 0, 0.62);
  --atlas-picker-scrim: rgba(4, 7, 9, 0.52);
  --atlas-canvas:
    radial-gradient(52% 58% at 64% 46%, rgba(37, 57, 61, 0.5) 0%, rgba(8, 13, 17, 0) 68%),
    radial-gradient(38% 42% at 82% 18%, rgba(128, 95, 58, 0.13) 0%, rgba(8, 13, 17, 0) 70%),
    linear-gradient(155deg, #080c10 0%, #06090c 46%, #05080a 100%);
  --atlas-vignette:
    linear-gradient(90deg, rgba(6, 9, 12, 0.92) 0%, rgba(6, 9, 12, 0.82) 16%, rgba(6, 9, 12, 0.52) 30%, rgba(6, 9, 12, 0.14) 43%, rgba(6, 9, 12, 0) 52%),
    linear-gradient(180deg, rgba(6, 9, 12, 0.82) 0%, rgba(6, 9, 12, 0) 17%),
    linear-gradient(0deg, rgba(6, 9, 12, 0.72) 0%, rgba(6, 9, 12, 0) 28%);
  --atlas-grain-opacity: 0.04;
  --atlas-visited-from: #264552;
  --atlas-visited-to: #17303a;
  --atlas-glow: #e6c69d;
  --atlas-aura: #94b5aa;
  --atlas-scrim: linear-gradient(90deg, rgba(4, 7, 9, 0.08) 0%, rgba(4, 7, 9, 0.34) 48%, rgba(4, 7, 9, 0.66) 100%);
}

.atlas *,
.atlas *::before,
.atlas *::after {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

.atlas-map,
.atlas-marker,
.atlas-cluster {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

.atlas-side,
.atlas-side *,
.atlas-picker-overlay,
.atlas-picker-overlay *,
.atlas-lightbox,
.atlas-lightbox * {
  -webkit-tap-highlight-color: transparent;
}

.atlas-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: var(--atlas-canvas);
}

.atlas-grain {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  opacity: var(--atlas-grain-opacity);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.86' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.atlas-top-fade {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 2;
  height: 160px;
  pointer-events: none;
  /**
   * 渐隐必须在本层底部精确收尾（100%）。
   * 之前暗色主题最后一个色标写在 176px，而图层只有 160px 高，
   * 渐变被硬裁，160px 处还残留约 6% 的暗色，形成一条横向接缝，
   * 看起来就像地图上面又压了一层。这里统一改用百分比色标，避免被裁切。
   */
  background: linear-gradient(
    180deg,
    rgba(251, 250, 246, 0.92) 0%,
    rgba(251, 250, 246, 0.56) 40%,
    rgba(251, 250, 246, 0.16) 72.5%,
    rgba(251, 250, 246, 0) 100%
  );
}

[data-theme="dark"] .atlas-top-fade {
  background: linear-gradient(
    180deg,
    rgba(6, 9, 12, 0.94) 0%,
    rgba(6, 9, 12, 0.7) 40%,
    rgba(6, 9, 12, 0.22) 75%,
    rgba(6, 9, 12, 0) 100%
  );
}

.atlas-vignette {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: var(--atlas-vignette);
}

/* ---------- map ---------- */

.atlas-map {
  position: absolute;
  inset: 0;
  z-index: 1;
  cursor: grab;
  touch-action: none;
}

.atlas-map.is-dragging {
  cursor: grabbing;
}

.atlas-svg {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.atlas-map.is-loaded .atlas-svg {
  animation: atlas-map-in 1.5s 0.1s ease both;
}

.atlas-camera {
  transform-origin: 0 0;
  will-change: transform;
}

.atlas-sphere {
  fill: none;
  stroke: rgba(var(--atlas-fg), 0.05);
  stroke-width: 0.8;
  vector-effect: non-scaling-stroke;
  pointer-events: none;
}

.atlas-graticule {
  fill: none;
  stroke: rgba(var(--atlas-fg), 0.06);
  stroke-width: 0.55;
  vector-effect: non-scaling-stroke;
  pointer-events: none;
}

.atlas-map.is-interacting .atlas-country,
.atlas-map.is-interacting .atlas-country.is-visited,
.atlas-map.is-interacting .atlas-graticule {
  shape-rendering: optimizeSpeed;
}

.atlas-country {
  fill: var(--atlas-land);
  stroke: rgba(var(--atlas-line), var(--atlas-border-alpha));
  stroke-width: 0.8;
  vector-effect: non-scaling-stroke;
  pointer-events: none;
  transition: fill 0.45s ease, stroke 0.45s ease;
}

.atlas-country.is-visited {
  fill: url(#atlas-visited-land);
  stroke: rgba(var(--atlas-accent), 0.55);
}

.atlas-route {
  pointer-events: none;
}

.atlas-route-aura {
  fill: url(#atlas-route-aura);
  pointer-events: none;
}

.atlas-route-halo {
  fill: none;
  stroke: rgba(var(--atlas-route), 0.08);
  stroke-width: 5;
  stroke-linecap: round;
}

.atlas-route-line {
  fill: none;
  stroke: rgba(var(--atlas-route), 0.42);
  stroke-width: 0.9;
  stroke-linecap: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: atlas-draw 2.4s 0.55s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.atlas-geo-labels {
  pointer-events: none;
}

.atlas-geo-labels text {
  fill: var(--paper);
  opacity: 0.32;
  font-family: var(--sans);
  letter-spacing: 0.34em;
  text-transform: uppercase;
}

.atlas-geo-labels text.is-italic {
  font-family: var(--serif);
  font-style: italic;
  letter-spacing: 0.16em;
  text-transform: none;
}

.atlas-marker {
  cursor: pointer;
  outline: none;
}

.atlas-marker-halo {
  fill: url(#atlas-marker-glow);
  opacity: 0.42;
  transition: opacity 0.4s ease;
}

.atlas-marker-pulse {
  fill: none;
  stroke: rgba(var(--atlas-route), 0.55);
  stroke-width: 1;
  transform-box: fill-box;
  transform-origin: center;
  animation: atlas-pulse 3.6s cubic-bezier(0.2, 0.55, 0.3, 1) infinite;
  animation-play-state: paused;
}

.atlas-marker:hover .atlas-marker-pulse,
.atlas-marker.is-active .atlas-marker-pulse {
  animation-play-state: running;
}

.atlas-marker-ring {
  fill: var(--atlas-marker-fill);
  stroke: rgba(var(--atlas-fg), 0.78);
  stroke-width: 1.1;
  transition: stroke 0.3s ease, stroke-width 0.3s ease;
}

.atlas-marker-core {
  fill: var(--atlas-marker-core);
}

.atlas-marker.is-active .atlas-marker-halo,
.atlas-marker:hover .atlas-marker-halo {
  opacity: 0.95;
}

.atlas-marker.is-active .atlas-marker-ring,
.atlas-marker:hover .atlas-marker-ring {
  stroke: var(--gold);
  stroke-width: 1.5;
}

.atlas-marker.is-selected .atlas-marker-pulse {
  animation-duration: 2.2s;
}

.atlas-marker:focus-visible .atlas-marker-ring {
  stroke: var(--gold);
  stroke-width: 2;
}

.atlas-stop:focus-visible {
  outline: 1px solid rgba(var(--atlas-accent), 0.6);
  outline-offset: 4px;
}

.atlas-tools button:focus-visible,
.atlas-side-close:focus-visible,
.atlas-gallery-nav button:focus-visible,
.atlas-lb-close:focus-visible,
.atlas-lb-nav:focus-visible {
  outline: 1px solid var(--gold);
  outline-offset: 2px;
}

.atlas-marker-label {
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.atlas-marker-label text {
  font-family: var(--sans);
}

.atlas-label-cn {
  fill: var(--paper);
  font-family: var(--serif);
  font-size: 16px;
  letter-spacing: 0.16em;
}

.atlas-label-en {
  fill: rgba(var(--atlas-fg), 0.64);
  font-size: 6.5px;
  letter-spacing: 0.26em;
}

.atlas-label-meta {
  fill: rgba(var(--atlas-fg), 0.4);
  font-size: 6.5px;
  letter-spacing: 0.08em;
}

.atlas-marker-label.is-left text {
  text-anchor: end;
}

.atlas-marker-label.is-right text {
  text-anchor: start;
}

.atlas-marker-label.is-hidden {
  opacity: 0;
}

.atlas-cluster {
  cursor: zoom-in;
  outline: none;
}

.atlas-cluster-halo {
  fill: url(#atlas-marker-glow);
  opacity: 0.55;
}

.atlas-cluster-ring {
  fill: var(--atlas-cluster-fill);
  stroke: rgba(var(--atlas-accent), 0.72);
  stroke-width: 1.1;
  transition: stroke 0.3s ease, stroke-width 0.3s ease;
}

.atlas-cluster-count {
  fill: var(--paper);
  font-family: var(--serif);
  font-size: 14px;
  letter-spacing: 0.02em;
  text-anchor: middle;
}

.atlas-cluster-label {
  fill: rgba(var(--atlas-fg), 0.45);
  font-family: var(--sans);
  font-size: 5.5px;
  letter-spacing: 0.24em;
  text-anchor: middle;
}

.atlas-cluster:hover .atlas-cluster-ring,
.atlas-cluster:focus-visible .atlas-cluster-ring {
  stroke: var(--gold);
  stroke-width: 1.7;
}

/* ---------- map ui ---------- */

.atlas-map-ui {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  animation: atlas-fade-in 1.2s 0.8s ease both;
}

.atlas-compass {
  position: absolute;
  top: 106px;
  right: clamp(28px, 3.4vw, 52px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 44px;
  color: rgba(var(--atlas-fg), 0.58);
  transition: right 0.5s cubic-bezier(0.22, 0.8, 0.2, 1), opacity 0.3s ease;
}

.atlas-compass svg {
  width: 38px;
  height: 38px;
  fill: currentColor;
}

.atlas-compass span {
  font-size: 7px;
  letter-spacing: 0.3em;
  color: var(--faint);
}

.atlas-tools {
  position: absolute;
  right: clamp(28px, 3.4vw, 52px);
  bottom: 86px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  pointer-events: auto;
  transition: right 0.5s cubic-bezier(0.22, 0.8, 0.2, 1);
}

.atlas-tools button {
  touch-action: manipulation;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  padding: 0;
  border: 1px solid rgba(var(--atlas-fg), 0.13);
  border-radius: 50%;
  background: var(--atlas-tool-bg);
  color: rgba(var(--atlas-fg), 0.6);
  cursor: pointer;
  transition: color 0.25s ease, border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;
}

.atlas-tools button:hover {
  color: var(--paper);
  border-color: rgba(var(--atlas-accent), 0.45);
  background: rgba(var(--atlas-fg), 0.12);
  transform: translateY(-1px);
}

.atlas-tools button svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.2;
  stroke-linecap: round;
}

.atlas-scale {
  position: absolute;
  right: clamp(28px, 3.4vw, 52px);
  bottom: 232px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
  color: var(--faint);
  transition: right 0.5s cubic-bezier(0.22, 0.8, 0.2, 1), opacity 0.3s ease;
}

.atlas-scale-line {
  display: block;
  height: 5px;
  border-left: 1px solid rgba(var(--atlas-fg), 0.35);
  border-right: 1px solid rgba(var(--atlas-fg), 0.35);
  border-bottom: 1px solid rgba(var(--atlas-fg), 0.35);
}

.atlas-scale em {
  font-style: normal;
  font-size: 7.5px;
  letter-spacing: 0.2em;
}

.atlas-readout {
  position: absolute;
  left: 50%;
  bottom: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  color: var(--faint);
  text-align: center;
  transform: translateX(-50%);
  transition: opacity 0.3s ease;
}

.atlas-readout-hint {
  font-size: 7px;
  letter-spacing: 0.2em;
  color: rgba(var(--atlas-fg), 0.2);
}

.atlas-readout-place {
  font-size: 8px;
  letter-spacing: 0.26em;
  color: rgba(var(--atlas-accent), 0.8);
}

.atlas-readout-coords {
  font-size: 9.5px;
  letter-spacing: 0.14em;
  font-variant-numeric: tabular-nums;
}


.atlas-map-loading,
.atlas-map-error {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  gap: 8px;
  text-align: center;
  color: var(--faint);
  font-size: 9px;
  letter-spacing: 0.32em;
}

.atlas-map-loading span {
  animation: atlas-blink 2.2s ease-in-out infinite;
}

.atlas-map-error p {
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--faint);
}

/* ---------- intro ---------- */

.atlas-intro {
  position: absolute;
  z-index: 4;
  top: calc(var(--vp-nav-height) + clamp(24px, 4.2vh, 42px));
  left: clamp(24px, 4.6vw, 72px);
  width: min(376px, 30vw);
  transition: opacity 0.45s ease, filter 0.45s ease;
}

.atlas-intro.is-dimmed {
  opacity: 0.58;
  pointer-events: none;
}

.atlas-eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  color: rgba(var(--atlas-accent), 0.85);
  font-size: 8.5px;
  letter-spacing: 0.3em;
  animation: atlas-rise 0.9s 0.12s cubic-bezier(0.22, 0.8, 0.2, 1) both;
}

.atlas-eyebrow em {
  font-style: normal;
  color: var(--faint);
  letter-spacing: 0.16em;
}

.atlas-eyebrow-line {
  display: block;
  width: 24px;
  height: 1px;
  background: rgba(var(--atlas-accent), 0.55);
}

.atlas-title {
  margin: 22px 0 0;
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(56px, 5.4vw, 82px);
  line-height: 0.98;
  letter-spacing: 0.02em;
  animation: atlas-rise 0.95s 0.18s cubic-bezier(0.22, 0.8, 0.2, 1) both;
}

.atlas-title > span {
  display: block;
}

.atlas-title-accent {
  color: var(--gold);
}

.atlas-title > em {
  display: block;
  margin-top: 14px;
  font-size: clamp(16px, 1.45vw, 21px);
  font-weight: 400;
  font-style: italic;
  letter-spacing: 0.03em;
  color: var(--muted);
}

.atlas-lede {
  max-width: 320px;
  margin: 30px 0 0;
  font-family: var(--serif);
  font-size: 16px;
  line-height: 1.9;
  letter-spacing: 0.03em;
  color: rgba(var(--atlas-fg), 0.82);
  animation: atlas-rise 0.95s 0.24s cubic-bezier(0.22, 0.8, 0.2, 1) both;
}

.atlas-blurb {
  max-width: 316px;
  margin: 15px 0 0;
  font-size: 10.5px;
  line-height: 1.95;
  letter-spacing: 0.05em;
  color: rgba(var(--atlas-fg), 0.4);
  animation: atlas-rise 0.95s 0.3s cubic-bezier(0.22, 0.8, 0.2, 1) both;
}

.atlas-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 30px;
  padding: 15px 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  animation: atlas-rise 0.95s 0.36s cubic-bezier(0.22, 0.8, 0.2, 1) both;
}

.atlas-stat {
  padding: 0 12px;
  border-left: 1px solid var(--line);
}

.atlas-stat:first-child {
  padding-left: 0;
  border-left: 0;
}

.atlas-stat strong {
  display: block;
  overflow: hidden;
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(15px, 1.15vw, 20px);
  line-height: 1;
  letter-spacing: 0.01em;
  color: var(--paper);
  font-variant-numeric: tabular-nums;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.atlas-stat span {
  display: block;
  margin-top: 7px;
  font-size: 8.5px;
  letter-spacing: 0.14em;
  color: rgba(var(--atlas-fg), 0.4);
}

.atlas-stop-list {
  display: flex;
  flex-direction: column;
  max-height: clamp(150px, calc(100svh - 620px), 380px);
  margin-top: 0;
  padding-right: 6px;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--atlas-fg), 0.18) transparent;
  -webkit-mask-image: linear-gradient(180deg, #000 0%, #000 90%, transparent 100%);
  mask-image: linear-gradient(180deg, #000 0%, #000 90%, transparent 100%);
  animation: atlas-rise 0.95s 0.42s cubic-bezier(0.22, 0.8, 0.2, 1) both;
}

.atlas-stop-list::-webkit-scrollbar {
  width: 3px;
}

.atlas-stop-list::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: rgba(var(--atlas-fg), 0.16);
}

.atlas-stop {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 0;
  border: 0;
  border-bottom: 1px solid rgba(var(--atlas-fg), 0.07);
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
}

.atlas-stop:last-child {
  border-bottom: 0;
}

.atlas-stop-thumb {
  flex: none;
  width: 42px;
  height: 42px;
  overflow: hidden;
  border-radius: 7px;
  background: var(--atlas-image-bg);
}

.atlas-stop-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.72;
  filter: saturate(0.72) contrast(1.02);
  transition: opacity 0.35s ease, transform 0.55s cubic-bezier(0.22, 0.8, 0.2, 1), filter 0.35s ease;
}

@media (hover: hover) {
  .atlas-stop:hover .atlas-stop-thumb img,
  .atlas-stop.is-hovered .atlas-stop-thumb img {
    opacity: 1;
    filter: saturate(0.95) contrast(1.03);
    transform: scale(1.06);
  }
}

.atlas-stop-copy {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.atlas-stop-name {
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-family: var(--serif);
  font-size: 16px;
  letter-spacing: 0.05em;
  color: var(--paper);
  transition: color 0.28s ease;
}

.atlas-stop-name em {
  font-family: var(--sans);
  font-style: normal;
  font-size: 8px;
  letter-spacing: 0.2em;
  color: var(--faint);
}

.atlas-stop-meta {
  overflow: hidden;
  font-size: 8.5px;
  letter-spacing: 0.12em;
  color: rgba(var(--atlas-fg), 0.4);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.atlas-stop-index {
  flex: none;
  font-family: var(--serif);
  font-size: 12px;
  letter-spacing: 0.05em;
  color: rgba(var(--atlas-fg), 0.26);
  transition: color 0.28s ease;
}

.atlas-stop.is-active .atlas-stop-name {
  color: var(--gold);
}

.atlas-stop.is-active .atlas-stop-index {
  color: var(--gold);
}

@media (hover: hover) {
  .atlas-stop:hover .atlas-stop-name,
  .atlas-stop.is-hovered .atlas-stop-name {
    color: var(--gold);
  }

  .atlas-stop:hover .atlas-stop-index {
    color: var(--gold);
  }
}

.atlas-list-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 22px;
  padding-bottom: 9px;
  border-bottom: 1px solid var(--line);
  font-size: 7.5px;
  letter-spacing: 0.24em;
  color: var(--faint);
  animation: atlas-rise 0.95s 0.42s cubic-bezier(0.22, 0.8, 0.2, 1) both;
}

@media (min-width: 901px) {
  .atlas-list-head > span:last-child::after {
    content: " · SCROLL";
    color: rgba(var(--atlas-fg), 0.22);
  }
}

/* ---------- photo drawer ---------- */

.atlas-side,
.atlas-picker-overlay {
  --atlas-fg: 28, 34, 37;
  --atlas-accent: 149, 107, 54;
  --paper: rgb(var(--atlas-fg));
  --muted: rgba(var(--atlas-fg), 0.58);
  --faint: rgba(var(--atlas-fg), 0.38);
  --line: rgba(var(--atlas-fg), 0.12);
  --gold: rgb(var(--atlas-accent));
  --atlas-panel: rgba(247, 247, 243, 0.985);
  --atlas-panel-2: rgba(242, 242, 237, 0.995);
  --atlas-panel-line: rgba(28, 34, 37, 0.12);
  --atlas-elev: rgba(28, 34, 37, 0.2);
  --atlas-picker-scrim: rgba(247, 247, 243, 0.3);
  --atlas-picker-bg: rgba(247, 247, 243, 0.62);
  --atlas-picker-bg-2: rgba(242, 242, 237, 0.48);
  --atlas-image-bg: #e8e8e3;
  --atlas-tool-bg: rgba(255, 255, 255, 0.72);
  --serif: "Songti SC", "STSong", "Source Han Serif SC", "Noto Serif SC", "Noto Serif CJK SC", "Iowan Old Style", "Palatino Linotype", Georgia, serif;
  --sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}

[data-theme="dark"] .atlas-side,
[data-theme="dark"] .atlas-picker-overlay {
  --atlas-fg: 241, 236, 227;
  --atlas-accent: 217, 185, 142;
  --atlas-panel: rgba(19, 25, 30, 0.985);
  --atlas-panel-2: rgba(9, 13, 17, 0.995);
  --atlas-panel-line: rgba(241, 236, 227, 0.1);
  --atlas-elev: rgba(0, 0, 0, 0.62);
  --atlas-picker-scrim: rgba(4, 7, 9, 0.42);
  --atlas-picker-bg: rgba(19, 25, 30, 0.76);
  --atlas-picker-bg-2: rgba(9, 13, 17, 0.66);
  --atlas-image-bg: #121a20;
  --atlas-tool-bg: rgba(8, 12, 16, 0.72);
}

.atlas-lightbox {
  --atlas-fg: 241, 236, 227;
  --atlas-accent: 217, 185, 142;
  --paper: #f1ece3;
  --muted: rgba(241, 236, 227, 0.56);
  --faint: rgba(241, 236, 227, 0.34);
  --line: rgba(241, 236, 227, 0.12);
  --gold: #d9b98e;
  --serif: "Songti SC", "STSong", "Source Han Serif SC", "Noto Serif SC", "Noto Serif CJK SC", "Iowan Old Style", "Palatino Linotype", Georgia, serif;
  --sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}

.atlas-scrim {
  position: fixed;
  top: var(--vp-nav-height);
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 40;
  background: var(--atlas-scrim);
}

.atlas-side {
  position: fixed;
  z-index: 50;
  top: var(--vp-nav-height);
  right: 0;
  bottom: 0;
  width: min(620px, 50vw);
  overflow: visible;
  border: 0;
  border-radius: 0;
  background: linear-gradient(180deg, var(--atlas-panel) 0%, var(--atlas-panel-2) 100%);
  box-shadow: none;
  color: var(--paper);
  font-family: var(--sans);
  outline: none;
}

.atlas-side::before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -96px;
  width: 97px;
  pointer-events: none;
  background: linear-gradient(180deg, var(--atlas-panel) 0%, var(--atlas-panel-2) 100%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 100%);
  mask-image: linear-gradient(90deg, transparent 0%, #000 100%);
  content: "";
}

.atlas-side-scroll {
  height: 100%;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--atlas-fg), 0.18) transparent;
}

.atlas-side-scroll::-webkit-scrollbar {
  width: 5px;
}

.atlas-side-scroll::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(var(--atlas-fg), 0.16);
}

.atlas-side-bar {
  position: sticky;
  top: 0;
  z-index: 8;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 20px;
  background: linear-gradient(180deg, var(--atlas-panel) 0%, rgba(var(--atlas-fg), 0) 100%);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.atlas-side-brand {
  font-size: 8px;
  letter-spacing: 0.27em;
  color: var(--faint);
  white-space: nowrap;
}

.atlas-gallery-nav {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
}

.atlas-gallery-nav button {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border: 1px solid rgba(var(--atlas-fg), 0.13);
  border-radius: 50%;
  background: transparent;
  color: var(--faint);
  cursor: pointer;
  transition: color 0.25s ease, border-color 0.25s ease, background 0.25s ease;
}

.atlas-gallery-nav button:hover {
  color: var(--paper);
  border-color: rgba(var(--atlas-accent), 0.45);
  background: rgba(var(--atlas-fg), 0.05);
}

.atlas-gallery-nav button svg {
  width: 12px;
  height: 12px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.atlas-gallery-count {
  padding: 0 4px;
  font-size: 9px;
  letter-spacing: 0.2em;
  color: rgba(var(--atlas-fg), 0.6);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.atlas-gallery-count em {
  font-style: normal;
  color: var(--faint);
}

.atlas-side-close {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 1px solid rgba(var(--atlas-fg), 0.16);
  border-radius: 50%;
  background: var(--atlas-tool-bg);
  color: rgba(var(--atlas-fg), 0.82);
  cursor: pointer;
  transition: background 0.25s ease, transform 0.3s ease;
}

.atlas-side-close:hover {
  background: rgba(var(--atlas-fg), 0.12);
  transform: rotate(90deg);
}

.atlas-side-close svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.4;
  stroke-linecap: round;
}

.atlas-side-body {
  padding: 18px 22px 30px;
}

.atlas-side-kicker {
  margin: 0;
  font-size: 8px;
  letter-spacing: 0.28em;
  color: rgba(var(--atlas-accent), 0.82);
}

.atlas-side-title {
  margin: 12px 0 0;
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(38px, 3.6vw, 56px);
  line-height: 1;
  letter-spacing: 0.03em;
}

.atlas-side-title em {
  display: block;
  margin-top: 10px;
  font-family: var(--sans);
  font-style: normal;
  font-size: 8px;
  letter-spacing: 0.3em;
  color: var(--faint);
  text-transform: uppercase;
}

.atlas-side-desc {
  max-width: 560px;
  margin: 14px 0 0;
  font-size: 11.5px;
  line-height: 1.9;
  letter-spacing: 0.03em;
  color: rgba(var(--atlas-fg), 0.6);
}

.atlas-side-time {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid var(--line);
}

.atlas-side-time-label {
  font-size: 7px;
  letter-spacing: 0.2em;
  color: var(--faint);
}

.atlas-side-time strong {
  font-family: var(--serif);
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: var(--gold);
}

.atlas-side-time-season {
  font-size: 8px;
  letter-spacing: 0.14em;
  color: var(--faint);
}

.atlas-side-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 7px 16px;
  margin-top: 10px;
  font-size: 7.5px;
  letter-spacing: 0.14em;
  color: var(--faint);
  font-variant-numeric: tabular-nums;
}

.atlas-side-meta span {
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
}

.atlas-side-meta em {
  font-style: normal;
  font-size: 6.5px;
  letter-spacing: 0.16em;
  color: rgba(var(--atlas-fg), 0.24);
}

.atlas-masonry {
  column-count: 3;
  column-width: auto;
  column-gap: 10px;
  padding-top: 20px;
}

.atlas-wall-item {
  display: block;
  width: 100%;
  margin: 0 0 16px;
  break-inside: avoid;
}

.atlas-wall-button {
  display: block;
  width: 100%;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: 5px;
  background: var(--atlas-image-bg);
  cursor: zoom-in;
  aspect-ratio: 4 / 3;
  touch-action: manipulation;
}

.atlas-wall-button.is-portrait {
  aspect-ratio: 3 / 4;
}

.atlas-wall-button img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.22, 0.8, 0.2, 1), filter 0.4s ease;
}

@media (hover: hover) {
  .atlas-wall-button:hover img {
    transform: scale(1.025);
    filter: brightness(1.05);
  }
}

.atlas-wall-item figcaption {
  display: flex;
  transition: color 0.28s ease, transform 0.28s ease;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  margin-top: 6px;
  font-size: 8.5px;
  line-height: 1.5;
  letter-spacing: 0.03em;
  color: rgba(var(--atlas-fg), 0.46);
}

@media (hover: hover) {
  .atlas-wall-item:hover figcaption {
    color: rgba(var(--atlas-fg), 0.68);
    transform: translateY(-1px);
  }
}

.atlas-wall-item figcaption em {
  flex: none;
  font-style: normal;
  font-size: 7.5px;
  letter-spacing: 0.1em;
  color: rgba(var(--atlas-fg), 0.26);
  font-variant-numeric: tabular-nums;
}

.atlas-side-end {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 18px 0 0;
  padding-top: 14px;
  border-top: 1px solid var(--line);
  font-size: 7.5px;
  letter-spacing: 0.22em;
  color: var(--faint);
}


/* ---------- cluster picker ---------- */

.atlas-picker-overlay {
  position: fixed;
  top: var(--vp-nav-height);
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 45;
  display: grid;
  place-items: center;
  padding: 24px;
  background: var(--atlas-picker-scrim);
}

.atlas-picker-card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(380px, 90vw);
  max-height: 76vh;
  overflow: hidden;
  border: 0;
  border-radius: 22px;
  background: linear-gradient(180deg, var(--atlas-picker-bg) 0%, var(--atlas-picker-bg-2) 100%);
  box-shadow: 0 24px 60px rgba(28, 34, 37, 0.1);
  color: var(--paper);
  font-family: var(--sans);
  backdrop-filter: blur(20px) saturate(1.1);
  -webkit-backdrop-filter: blur(20px) saturate(1.1);
  --atlas-picker-edge: 9px;
  animation: atlas-picker-in 0.34s cubic-bezier(0.22, 0.8, 0.2, 1) both;
  -webkit-mask-image:
    linear-gradient(to right, transparent 0, #000 var(--atlas-picker-edge), #000 calc(100% - var(--atlas-picker-edge)), transparent 100%),
    linear-gradient(to bottom, transparent 0, #000 var(--atlas-picker-edge), #000 calc(100% - var(--atlas-picker-edge)), transparent 100%);
  -webkit-mask-composite: source-in;
  mask-image:
    linear-gradient(to right, transparent 0, #000 var(--atlas-picker-edge), #000 calc(100% - var(--atlas-picker-edge)), transparent 100%),
    linear-gradient(to bottom, transparent 0, #000 var(--atlas-picker-edge), #000 calc(100% - var(--atlas-picker-edge)), transparent 100%);
  mask-composite: intersect;
}

.atlas-picker-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  padding: 20px 20px 12px;
}

.atlas-picker-kicker {
  margin: 0;
  font-size: 7.5px;
  letter-spacing: 0.24em;
  color: rgba(var(--atlas-accent), 0.82);
}

.atlas-picker-head h3 {
  margin: 9px 0 0;
  font-family: var(--serif);
  font-size: 26px;
  font-weight: 400;
  letter-spacing: 0.04em;
}

.atlas-picker-close {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 1px solid rgba(var(--atlas-fg), 0.14);
  border-radius: 50%;
  background: transparent;
  color: rgba(var(--atlas-fg), 0.72);
  cursor: pointer;
  transition: background 0.25s ease, transform 0.3s ease;
}

.atlas-picker-close:hover {
  background: rgba(var(--atlas-fg), 0.1);
  transform: rotate(90deg);
}

.atlas-picker-close svg {
  width: 13px;
  height: 13px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.4;
  stroke-linecap: round;
}

.atlas-picker-list {
  overflow-y: auto;
  padding: 0 10px 10px;
}

.atlas-picker-row {
  touch-action: manipulation;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 9px 10px;
  border: 0;
  border-bottom: 1px solid rgba(var(--atlas-fg), 0.07);
  border-radius: 7px;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease;
}

.atlas-picker-row:last-child {
  border-bottom: 0;
}

.atlas-picker-row:hover {
  background: rgba(var(--atlas-fg), 0.06);
}

.atlas-picker-row img {
  flex: none;
  width: 38px;
  height: 38px;
  border-radius: 4px;
  object-fit: cover;
  opacity: 0.82;
}

.atlas-picker-info {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.atlas-picker-info strong {
  font-family: var(--serif);
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0.05em;
  color: var(--paper);
}

.atlas-picker-info em {
  overflow: hidden;
  font-style: normal;
  font-size: 8px;
  letter-spacing: 0.14em;
  color: var(--faint);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.atlas-picker-count {
  flex: none;
  font-family: var(--serif);
  font-size: 11px;
  color: var(--faint);
}

.atlas-picker-zoom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2px 12px 14px;
  padding: 11px 12px;
  border: 1px solid rgba(var(--atlas-accent), 0.28);
  border-radius: 9px;
  background: transparent;
  color: var(--gold);
  font-family: var(--sans);
  font-size: 9px;
  letter-spacing: 0.14em;
  cursor: pointer;
  transition: background 0.25s ease, border-color 0.25s ease;
}

.atlas-picker-zoom:hover {
  border-color: rgba(var(--atlas-accent), 0.55);
  background: rgba(var(--atlas-accent), 0.06);
}

.atlas-picker-zoom em {
  font-style: normal;
  font-size: 7px;
  letter-spacing: 0.2em;
  color: var(--faint);
}

/* ---------- lightbox ---------- */

.atlas-lightbox {
  position: fixed;
  inset: 0;
  z-index: 80;
  touch-action: pan-y;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  overflow: clip;
  background: #04070a;
  color: var(--paper);
  font-family: var(--sans);
}

.atlas-lb-ambient {
  position: absolute;
  inset: -8%;
  z-index: 0;
  pointer-events: none;
  background-position: center;
  background-size: cover;
  filter: blur(26px) saturate(1.18) brightness(0.82);
  opacity: 0.86;
  transform: scale(1.12);
}

.atlas-lb-ambient-enter-active,
.atlas-lb-ambient-leave-active {
  transition: opacity 0.46s ease;
}

.atlas-lb-ambient-enter-from,
.atlas-lb-ambient-leave-to {
  opacity: 0;
}

.atlas-lb-veil {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(58% 58% at 50% 46%, rgba(4, 7, 9, 0.06) 0%, rgba(4, 7, 9, 0.38) 62%, rgba(4, 7, 9, 0.78) 100%),
    linear-gradient(180deg, rgba(4, 7, 9, 0.3) 0%, rgba(4, 7, 9, 0) 40%, rgba(4, 7, 9, 0.72) 100%);
}

.atlas-lb-close,
.atlas-lb-counter,
.atlas-lb-nav,
.atlas-lb-figure,
.atlas-lb-thumbs {
  z-index: 2;
}

.atlas-lb-close {
  position: absolute;
  top: 26px;
  right: 30px;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(var(--atlas-fg), 0.18);
  border-radius: 50%;
  background: transparent;
  color: rgba(var(--atlas-fg), 0.8);
  cursor: pointer;
  transition: background 0.25s ease, transform 0.25s ease;
}

.atlas-lb-close:hover {
  background: rgba(var(--atlas-fg), 0.08);
  transform: rotate(90deg);
}

.atlas-lb-close svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.3;
  stroke-linecap: round;
}

.atlas-lb-counter {
  position: absolute;
  top: 36px;
  left: 36px;
  font-size: 9px;
  letter-spacing: 0.24em;
  color: var(--faint);
  font-variant-numeric: tabular-nums;
}

.atlas-lb-figure {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(1120px, 84vw);
  max-width: 100%;
  margin: 0;
}

.atlas-lb-stage {
  position: relative;
  width: 100%;
  height: min(72vh, 760px);
  animation: atlas-lb-stage-in 0.4s cubic-bezier(0.22, 0.8, 0.2, 1) both;
}

.atlas-lb-layer {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.42s ease;
  pointer-events: none;
}

.atlas-lb-layer.is-active {
  opacity: 1;
}

.atlas-lb-preview,
.atlas-lb-full {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  object-fit: contain;
}

.atlas-lb-full {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.atlas-lb-full.is-loaded {
  opacity: 1;
}

@keyframes atlas-lb-stage-in {
  from {
    opacity: 0;
    transform: scale(0.99);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes atlas-lb-caption-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.atlas-lb-figure figcaption {
  display: flex;
  align-items: baseline;
  gap: 20px;
  margin-top: 18px;
  animation: atlas-lb-caption-in 0.3s cubic-bezier(0.22, 0.8, 0.2, 1) both;
  font-size: 11px;
  letter-spacing: 0.06em;
  color: rgba(var(--atlas-fg), 0.72);
}

.atlas-lb-figure figcaption em {
  font-style: normal;
  font-size: 8.5px;
  letter-spacing: 0.22em;
  color: var(--faint);
}

.atlas-lb-nav {
  position: absolute;
  z-index: 3;
  top: 50%;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin-top: -24px;
  border: 1px solid rgba(var(--atlas-fg), 0.14);
  border-radius: 50%;
  background: rgba(var(--atlas-fg), 0.04);
  color: rgba(var(--atlas-fg), 0.8);
  cursor: pointer;
  transition: background 0.25s ease;
}

.atlas-lb-nav:hover {
  background: rgba(var(--atlas-fg), 0.1);
}

.atlas-lb-nav.is-prev {
  left: 4vw;
}

.atlas-lb-nav.is-next {
  right: 4vw;
}

.atlas-lb-nav svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.atlas-lb-thumbs {
  touch-action: pan-x;
  position: absolute;
  bottom: 24px;
  left: 50%;
  display: flex;
  gap: 8px;
  max-width: min(90vw, 1000px);
  padding: 4px 6px;
  overflow-x: auto;
  scrollbar-width: none;
  transform: translateX(-50%);
}

.atlas-lb-thumbs::-webkit-scrollbar {
  display: none;
}

.atlas-lb-thumb {
  touch-action: manipulation;
  flex: 0 0 auto;
  width: 46px;
  height: 34px;
  padding: 0;
  overflow: hidden;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  opacity: 0.48;
  transition: opacity 0.25s ease, border-color 0.25s ease;
}

.atlas-lb-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.atlas-lb-thumb.is-active {
  border-color: var(--gold);
  opacity: 1;
}

@keyframes atlas-picker-in {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.986);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ---------- transitions ---------- */

.atlas-fade-enter-active,
.atlas-fade-leave-active {
  transition: opacity 0.3s ease;
}

.atlas-fade-enter-from,
.atlas-fade-leave-to {
  opacity: 0;
}

.atlas-side-enter-active {
  transition: transform 0.56s cubic-bezier(0.22, 0.8, 0.2, 1), opacity 0.36s ease;
}

.atlas-side-leave-active {
  transition: transform 0.32s ease, opacity 0.26s ease;
}

.atlas-side-enter-from,
.atlas-side-leave-to {
  opacity: 0;
  transform: translateX(48px);
}

.atlas-side-body {
  animation: atlas-side-body-in 0.46s cubic-bezier(0.22, 0.8, 0.2, 1) both;
}

@keyframes atlas-side-body-in {
  from {
    opacity: 0;
    transform: translateY(9px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ---------- keyframes ---------- */

@keyframes atlas-rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes atlas-map-in {
  from {
    opacity: 0;
    transform: scale(1.012);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes atlas-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes atlas-draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes atlas-pulse {
  0% {
    transform: scale(0.55);
    opacity: 0;
  }
  14% {
    opacity: 0.7;
  }
  72% {
    transform: scale(2.8);
    opacity: 0;
  }
  100% {
    transform: scale(2.8);
    opacity: 0;
  }
}

@keyframes atlas-blink {
  0%,
  100% {
    opacity: 0.35;
  }
  50% {
    opacity: 1;
  }
}

/* detail open shifts map chrome to the left of the panel */
.atlas.is-detail .atlas-compass,
.atlas.is-detail .atlas-tools,
.atlas.is-detail .atlas-scale {
  right: calc(min(620px, 50vw) + 40px);
}

.atlas.is-detail .atlas-readout {
  opacity: 0;
}

/* ---------- mobile ---------- */

@media (max-width: 1200px) {
  .atlas.is-detail .atlas-tools,
  .atlas.is-detail .atlas-compass,
  .atlas.is-detail .atlas-scale {
    opacity: 0;
    pointer-events: none;
  }
}

@media (max-width: 1100px) {
  .atlas-intro {
    width: min(340px, 32vw);
  }
}

@media (min-width: 901px) and (max-height: 860px) {
  .atlas-intro {
    top: calc(var(--vp-nav-height) + 22px);
  }

  .atlas-title {
    margin-top: 14px;
    font-size: clamp(48px, 4.5vw, 66px);
  }

  .atlas-title > em {
    margin-top: 10px;
  }

  .atlas-lede {
    margin-top: 18px;
  }

  .atlas-blurb {
    margin-top: 10px;
  }

  .atlas-stats {
    margin-top: 18px;
    padding: 10px 0;
  }

  .atlas-list-head {
    margin-top: 14px;
  }

  .atlas-stop-list {
    max-height: calc(100svh - 535px);
  }
}

@media (max-width: 900px) {
  .atlas {
    height: auto;
    min-height: calc(100vh - var(--vp-nav-height));
    min-height: calc(100svh - var(--vp-nav-height));
    overflow: visible;
  }

  .atlas-bg,
  .atlas-grain {
    position: absolute;
    inset: 0 0 auto 0;
    height: 56svh;
  }

  .atlas-top-fade {
    height: 104px;
    background: linear-gradient(
      180deg,
      rgba(251, 250, 246, 0.8) 0%,
      rgba(251, 250, 246, 0.38) 54%,
      rgba(251, 250, 246, 0) 100%
    );
  }

  .atlas-vignette {
    position: absolute;
    inset: 0 0 auto 0;
    height: 56svh;
    background: none;
  }

  .atlas-map {
    position: relative;
    inset: auto;
    height: 56svh;
    min-height: 360px;
    margin-top: 2px;
    touch-action: pan-y;
  }

  .atlas-svg {
    -webkit-mask-image: none;
    mask-image: none;
  }

  .atlas-map::after {
    display: none;
  }

  .atlas-lb-nav {
    display: none;
  }

  .atlas-lb-figure {
    width: 100vw;
    max-width: 100vw;
  }

  .atlas-lb-stage {
    height: 72vh;
  }

  .atlas-lb-preview,
  .atlas-lb-full {
    border-radius: 0;
  }

  .atlas-compass,
  .atlas-scale,
  .atlas-readout {
    display: none;
  }

  .atlas-tools button {
    color: rgba(var(--atlas-fg), 0.86);
    border-color: rgba(var(--atlas-fg), 0.22);
    background: var(--vp-c-bg);
    box-shadow: 0 2px 10px rgba(var(--atlas-fg), 0.08);
  }

  .atlas-tools {
    right: 18px;
    bottom: 18px;
    flex-direction: row;
  }

  .atlas.is-detail .atlas-tools {
    right: 18px;
  }

  .atlas-intro {
    position: relative;
    top: auto;
    left: auto;
    width: auto;
    padding: 4px 22px 48px;
    transform: none;
  }

  .atlas-stop-list {
    max-height: none;
    padding-right: 0;
    overflow: visible;
    -webkit-mask-image: none;
    mask-image: none;
  }

  .atlas-title {
    font-size: clamp(58px, 16vw, 74px);
  }

  .atlas-stat strong {
    font-size: 18px;
  }

  .atlas-lede {
    margin-top: 24px;
    font-size: 15px;
  }

  .atlas-blurb {
    font-size: 10px;
  }

  .atlas-scrim {
    top: 0;
  }

  .atlas-side {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    border: 0;
    border-radius: 0;
  }

  .atlas-side::before {
    display: none;
  }

  .atlas-side-bar {
    gap: 10px;
    padding: 12px 16px;
  }

  .atlas-side-brand {
    font-size: 7px;
    letter-spacing: 0.2em;
  }

  .atlas-gallery-nav {
    gap: 4px;
  }

  .atlas-gallery-nav button {
    width: 24px;
    height: 24px;
  }

  .atlas-gallery-count {
    font-size: 8px;
  }

  .atlas-side-close {
    width: 32px;
    height: 32px;
  }

  .atlas-side-body {
    padding: 14px 16px 30px;
  }

  .atlas-side-kicker {
    font-size: 7.5px;
  }

  .atlas-side-title {
    font-size: clamp(38px, 11vw, 48px);
  }

  .atlas-side-title em {
    margin-top: 8px;
    font-size: 7.5px;
  }

  .atlas-side-desc {
    font-size: 11px;
    line-height: 1.85;
  }

  .atlas-side-meta {
    margin-top: 12px;
    padding-top: 10px;
    font-size: 7px;
  }

  .atlas-masonry {
    column-count: 2;
    column-width: auto;
    column-gap: 8px;
    padding-top: 16px;
  }

  .atlas-wall-item {
    margin-bottom: 12px;
  }

  .atlas-wall-item figcaption {
    font-size: 8px;
    line-height: 1.45;
  }

  .atlas-wall-item figcaption em {
    font-size: 7px;
  }

  .atlas-side-end {
    margin-top: 20px;
    padding-top: 12px;
    font-size: 7px;
  }

  .atlas-lb-nav {
    width: 40px;
    height: 40px;
    margin-top: -20px;
    background: rgba(7, 10, 13, 0.58);
    border-color: rgba(var(--atlas-fg), 0.24);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }

  .atlas-lb-nav.is-prev {
    left: 10px;
  }

  .atlas-lb-nav.is-next {
    right: 10px;
  }

  .atlas-lb-figure {
    max-width: 100vw;
  }

  .atlas-lb-thumbs {
    bottom: 16px;
  }
}

@media (max-width: 420px) {
  .atlas-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px 0;
  }

  .atlas-stat:nth-child(3) {
    padding-left: 0;
    border-left: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .atlas *,
  .atlas *::before,
  .atlas *::after,
  .atlas-side,
  .atlas-side *,
  .atlas-side *::before,
  .atlas-side *::after,
  .atlas-picker-overlay,
  .atlas-picker-overlay *,
  .atlas-lightbox,
  .atlas-lightbox * {
    animation-duration: 0.01ms !important;
    animation-delay: 0s !important;
    transition-duration: 0.01ms !important;
  }
}
</style>

<style>
html.atlas-locked,
html.atlas-locked body {
  overflow: hidden;
}

html.atlas-locked body {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
}

html:has(.atlas) {
  background: var(--vp-c-bg);
}

/* 旅行页：navbar 与地图之间用顶部渐变衔接，隐藏导航底部的硬分割线 */
html:has(.atlas) .vp-navbar .divider-line {
  background: transparent;
}

body:has(.atlas) {
  margin: 0;
  background: var(--vp-c-bg);
}
</style>
