/**
 * 首页 tint-plate 动画兜底。
 *
 * VuePress Plume 从 rc.214 开始，会在“低端触屏设备”（粗指针且逻辑核心数 ≤ 4）、
 * 开启“减少动态效果”或开启省流模式时跳过首页的 tint-plate canvas。
 * 本站很多手机上 navigator.hardwareConcurrency 正好是 4，于是背景变成纯白。
 *
 * 这里用同一套算法自己渲染一份 32×32 的 canvas：
 * - 只在主题没有渲染 canvas 时挂载；
 * - 主题 canvas 稍后挂载时自动移除自己，避免桌面端重复渲染；
 * - 尊重 prefers-reduced-motion，只画一帧；
 * - 30fps 绘制，开销很小。
 */

export interface TintPalette {
  value: number
  offset: number
}

export interface HomeTintPlateHandle {
  destroy: () => void
}

const SIZE = 32
const START_TIME = 4
const SPEED = 1.2 // 与主题一致：60fps 下每帧 +0.02
const FRAME_INTERVAL = 1000 / 30

function isDark() {
  return document.documentElement.dataset.theme === 'dark'
}

function resolvePalette(palette: TintPalette): TintPalette {
  return isDark() ? { value: 32, offset: 36 } : palette
}

function drawFrame(ctx: CanvasRenderingContext2D, image: ImageData, t: number, palette: TintPalette) {
  const { value, offset } = resolvePalette(palette)
  const data = image.data

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const i = (y * SIZE + x) * 4
      const r = value + offset * Math.cos((x * x - y * y) / 300 + t)
      const g = value + offset * Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300)
      const b = value + offset * Math.sin(5 * Math.sin(t / 9) + ((x - 100) ** 2 + (y - 100) ** 2) / 1100)

      data[i] = r
      data[i + 1] = g
      data[i + 2] = b
      data[i + 3] = 255
    }
  }

  ctx.putImageData(image, 0, 0)
}

export function mountHomeTintPlate(hero: HTMLElement, palette: TintPalette): HomeTintPlateHandle {
  const layer = document.createElement('div')
  layer.className = 'home-tint-plate'
  layer.setAttribute('aria-hidden', 'true')

  const canvas = document.createElement('canvas')
  canvas.width = SIZE
  canvas.height = SIZE
  layer.append(canvas)

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return { destroy() {} }
  }

  const image = ctx.createImageData(SIZE, SIZE)
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

  let t = START_TIME
  let raf = 0
  let last = 0
  let disposed = false
  let animating = false

  function draw() {
    drawFrame(ctx!, image, motionQuery.matches ? START_TIME : t, palette)
  }

  function loop(now: number) {
    if (disposed || !animating) return
    raf = window.requestAnimationFrame(loop)

    if (!last) last = now
    const delta = now - last
    if (delta < FRAME_INTERVAL) return

    last = now
    t += (delta / 1000) * SPEED
    draw()
  }

  function stop() {
    animating = false
    window.cancelAnimationFrame(raf)
    raf = 0
  }

  function start() {
    if (disposed || animating || motionQuery.matches) return
    animating = true
    last = 0
    raf = window.requestAnimationFrame(loop)
  }

  function syncMotion() {
    if (motionQuery.matches) {
      stop()
      draw()
    }
    else {
      draw()
      start()
    }
  }

  function onVisibilityChange() {
    if (document.hidden) stop()
    else syncMotion()
  }

  // 深浅色切换时立刻换用对应色板。
  const themeObserver = new MutationObserver(draw)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  motionQuery.addEventListener('change', syncMotion)
  document.addEventListener('visibilitychange', onVisibilityChange)

  hero.prepend(layer)
  syncMotion()

  return {
    destroy() {
      disposed = true
      stop()
      themeObserver.disconnect()
      motionQuery.removeEventListener('change', syncMotion)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      layer.remove()
    },
  }
}
