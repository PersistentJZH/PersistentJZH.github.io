/**
 * 博客列表（/blog/）的瀑布流布局。
 *
 * 原来用 CSS 多列（column-count）做瀑布流，但浏览器分栏时并不总能按高度
 * 均衡：卡片高度不一致时，Chrome 会退化成“按张数平分”（14 张分 4 列得到
 * 4/3/3/4），中间两列比两侧短 400px 以上，宽屏下右下角会空出一大块。
 * 列数写死还会让 16 寸这类宽屏停在 3 列，卡片被拉得很宽。
 *
 * 这里改成脚本计算位置（绝对定位，不改动 DOM 结构，Vue 仍然管理卡片本身）：
 * - 列数按列表宽度自适应，每列保持 285px 以上的宽度（14 寸 3 列，16 寸 4 列）；
 * - 每张卡片放进当前最矮的一列，各列高度差不会超过一张卡片；
 * - 尺寸变化、分页换页、字体加载后重新排版。
 *
 * 脚本接管前由 custom.css 里的多列样式兜底，脚本异常时页面也不会散架。
 */

const LIST_SELECTOR = 'html.collection-post-article.layout-posts .vp-post-list'
const ITEM_CLASS = 'vp-post-item'
const MIN_COLUMNS = 2
/** 与 custom.css 的 --masonry-min-col / --masonry-gap 对应，读取失败时兜底 */
const FALLBACK_MIN_COLUMN_WIDTH = 285
const FALLBACK_GAP = 20
/** 收尾阶段参与微调的卡片数量（穷举列组合，列数 ^ 4 次计算） */
const TAIL_SIZE = 4

/**
 * 列数上限。
 *
 * 卡片数量除不尽列数时，最后那一列必然短一截（14 张分 5 列就是 3/3/3/3/2）。
 * 列数越多、每列越矮，这一截在视觉上就越明显。所以宽屏上宁可让卡片宽一点，
 * 也不要一味堆列数：列表宽度要到 1760px 才允许 5 列，2340px 才允许 6 列。
 */
function resolveMaxColumns(listWidth: number): number {
  if (listWidth < 1760)
    return 4
  if (listWidth < 2340)
    return 5
  return 6
}

function parsePx(value: string, fallback: number): number {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

/**
 * 给每张卡片分配列号。
 *
 * 先按“放进当前最矮的一列”顺序摆放，再对最后几张卡片穷举所有列组合：
 * 只要顺序摆放，最后一张高卡片很容易把某一列顶高、同时让另一列空出一大截，
 * 收尾微调后各列底部基本齐平。卡片在各列内仍然保持原有先后顺序。
 */
function assignColumns(heights: number[], columns: number, gap: number): number[] {
  const count = heights.length
  const tail = Math.min(TAIL_SIZE, count)
  const headEnd = count - tail

  const columnHeights = new Array<number>(columns).fill(0)
  const assignment = new Array<number>(count).fill(0)

  for (let index = 0; index < headEnd; index++) {
    let target = 0
    for (let column = 1; column < columns; column++) {
      if (columnHeights[column] < columnHeights[target])
        target = column
    }
    assignment[index] = target
    columnHeights[target] += heights[index] + gap
  }

  let bestTail: number[] | null = null
  let bestSpread = Number.POSITIVE_INFINITY
  let bestMax = Number.POSITIVE_INFINITY
  const tailColumns = new Array<number>(tail).fill(0)
  const total = columns ** tail

  for (let code = 0; code < total; code++) {
    const used = columnHeights.slice()
    let rest = code
    for (let index = 0; index < tail; index++) {
      const column = rest % columns
      rest = Math.floor(rest / columns)
      tailColumns[index] = column
      used[column] += heights[headEnd + index] + gap
    }

    let max = used[0]
    let min = used[0]
    for (const height of used) {
      if (height > max)
        max = height
      if (height < min)
        min = height
    }

    const spread = max - min
    if (spread < bestSpread || (spread === bestSpread && max < bestMax)) {
      bestSpread = spread
      bestMax = max
      bestTail = tailColumns.slice()
    }
  }

  if (bestTail) {
    for (let index = 0; index < tail; index++)
      assignment[headEnd + index] = bestTail[index]
  }

  return assignment
}

class BlogMasonry {
  private list: HTMLElement | null = null
  private resizeObserver: ResizeObserver | null = null
  private mutationObserver: MutationObserver | null = null
  private frame = 0
  private signature = ''

  /** 页面切换 / 首次挂载后调用：找到列表并接管排版 */
  sync(): void {
    const list = document.querySelector<HTMLElement>(LIST_SELECTOR)
    if (list === this.list) {
      if (list)
        this.schedule()
      return
    }

    this.detach()
    if (list)
      this.attach(list)
  }

  private attach(list: HTMLElement): void {
    this.list = list
    this.signature = ''

    this.resizeObserver = new ResizeObserver(() => this.schedule())
    this.observeBoxes()

    this.mutationObserver = new MutationObserver(() => {
      this.signature = ''
      this.observeBoxes()
      this.schedule()
    })
    this.mutationObserver.observe(list, { childList: true })

    this.schedule()
  }

  private detach(): void {
    if (this.frame) {
      cancelAnimationFrame(this.frame)
      this.frame = 0
    }
    this.resizeObserver?.disconnect()
    this.mutationObserver?.disconnect()
    this.resizeObserver = null
    this.mutationObserver = null
    this.list = null
    this.signature = ''
  }

  /** 卡片自身尺寸也会变（列宽变化、图片 / 字体加载），一并观察 */
  private observeBoxes(): void {
    const { resizeObserver, list } = this
    if (!resizeObserver || !list)
      return

    resizeObserver.disconnect()
    resizeObserver.observe(list)
    for (const item of this.items())
      resizeObserver.observe(item)
  }

  private items(): HTMLElement[] {
    const list = this.list
    if (!list)
      return []

    return Array.from(list.children).filter(
      (child): child is HTMLElement =>
        child instanceof HTMLElement && child.classList.contains(ITEM_CLASS),
    )
  }

  private schedule(): void {
    if (this.frame)
      return

    this.frame = requestAnimationFrame(() => {
      this.frame = 0
      this.layout()
    })
  }

  private layout(): void {
    const list = this.list
    if (!list || !list.isConnected)
      return

    const items = this.items()
    if (items.length === 0) {
      list.classList.remove('is-masonry')
      list.style.height = ''
      return
    }

    const style = getComputedStyle(list)
    const gap = parsePx(style.getPropertyValue('--masonry-gap'), FALLBACK_GAP)
    const minColumnWidth = parsePx(
      style.getPropertyValue('--masonry-min-col'),
      FALLBACK_MIN_COLUMN_WIDTH,
    )
    const width = list.clientWidth
    if (width <= 0)
      return

    const columns = Math.min(
      resolveMaxColumns(width),
      Math.max(MIN_COLUMNS, Math.floor((width + gap) / (minColumnWidth + gap))),
    )
    const columnWidth = (width - (columns - 1) * gap) / columns

    // 先统一切到绝对定位，再按最终列宽测量卡片高度
    list.classList.add('is-masonry')
    for (const item of items)
      item.style.width = `${columnWidth}px`

    const heights = items.map(item => item.offsetHeight)
    const pagination = list.querySelector<HTMLElement>(':scope > .vp-pagination')
    const paginationHeight = pagination ? pagination.offsetHeight : 0

    // 尺寸没变化就不重复写样式，避免 ResizeObserver 反复触发
    const signature = `${width}|${gap}|${paginationHeight}|${heights.join(',')}`
    if (signature === this.signature)
      return
    this.signature = signature

    const columnHeights = new Array<number>(columns).fill(0)
    const assignment = assignColumns(heights, columns, gap)

    items.forEach((item, index) => {
      const target = assignment[index]
      const left = Math.round(target * (columnWidth + gap))
      const top = Math.round(columnHeights[target])
      item.style.left = `${left}px`
      item.style.top = `${top}px`
      columnHeights[target] = top + heights[index] + gap
    })

    const contentHeight = Math.max(...columnHeights) - gap
    const totalHeight = contentHeight + (paginationHeight ? paginationHeight + gap : 0)
    list.style.height = `${Math.round(totalHeight)}px`
  }
}

let masonry: BlogMasonry | null = null

/** 客户端启动时调用一次 */
export function setupBlogMasonry(): void {
  masonry ??= new BlogMasonry()
}

/** 路由切换后重新接管（列表可能已被替换掉） */
export function syncBlogMasonry(): void {
  masonry?.sync()
}
