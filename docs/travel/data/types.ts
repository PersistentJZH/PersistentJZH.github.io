export interface TravelPhoto {
  /** OSS 文件名，例如 IMG_6203.jpeg */
  file: string
  caption: string
  alt: string
  /** 图片主体位置，用于裁切，默认居中 */
  position?: string
}

export interface TravelStop {
  id: string
  name: string
  en: string
  country: string
  countryEn: string
  lat: number
  lng: number
  /** 常驻 / 行旅 / 途经 */
  role: string
  /** 什么时候去的，例如 2024.05、2025.07；只知道年份就写 2025 */
  visitedAt: string
  season: string
  description: string
  photos: TravelPhoto[]
  /** 列表缩略图，缺省使用 photos[0] */
  thumb?: string
  /** 地图标签相对坐标点的偏移与方向 */
  labelDx: number
  labelDy: number
  labelSide: 'left' | 'right'
}
