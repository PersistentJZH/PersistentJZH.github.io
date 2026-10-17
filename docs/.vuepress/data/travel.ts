/**
 * 旅行足迹数据
 *
 * 想新增一个地方，只需要在 `travelStops` 里加一条记录：
 * 经纬度决定地图上的位置，photos 决定点开后的相册。
 * 照片文件放在 OSS 的 blog/ 目录下即可。
 *
 * 每个城市的 photos 都是一列独立对象，方便直接手动增删。
 * 目前每个城市放了 20 张占位照片，替换真实照片时改这一列即可。
 * visitedAt 表示什么时候去的，season 可填 '—' 表示不显示。
 */

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

export const OSS_BASE = 'https://jzh-mall.oss-cn-beijing.aliyuncs.com/blog/'

/**
 * 阿里云 OSS 图片处理：按宽度压缩并转 webp。
 * 原图单张 4–5MB，直接加载会让地图页非常慢。
 */
export function photoUrl(file: string, width = 1200): string {
  return `${OSS_BASE}${file}?x-oss-process=image/resize,w_${width}/format,webp/quality,q_82`
}

const DEFAULT_LABEL = {
  labelDx: 26,
  labelDy: -8,
  labelSide: 'right' as const,
}

export const travelStops: TravelStop[] = [
  {
    id: 'shenzhen',
    name: '深圳',
    en: 'Shenzhen',
    country: '中国',
    countryEn: 'China',
    lat: 22.5431,
    lng: 114.0579,
    role: '常驻',
    visitedAt: '2025.07',
    season: '盛夏',
    description:
      '我生活的城市。海岸线、晚霞和永远在生长的天际线，构成了日常里最熟悉的背景。',
    photos: [
      // 占位照片 · 20 张；替换真实照片时直接增删下面的对象
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
    ],
    ...DEFAULT_LABEL,
    labelDy: -12,
  },
  {
    id: 'huizhou',
    name: '惠州',
    en: 'Huizhou',
    country: '中国',
    countryEn: 'China',
    lat: 23.1115,
    lng: 114.4152,
    role: '行旅',
    visitedAt: '2025',
    season: '—',
    description:
      '双月湾的海风、绵长的海岸线，还有一段什么都不想的周末。',
    photos: [
      // 占位照片 · 20 张；替换真实照片时直接增删下面的对象
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
    ],
    ...DEFAULT_LABEL,
  },
  {
    id: 'guangzhou',
    name: '广州',
    en: 'Guangzhou',
    country: '中国',
    countryEn: 'China',
    lat: 23.1291,
    lng: 113.2644,
    role: '行旅',
    visitedAt: '2025',
    season: '—',
    description:
      '早茶、骑楼，和珠江边慢慢暗下来的天。',
    photos: [
      // 占位照片 · 20 张；替换真实照片时直接增删下面的对象
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
    ],
    ...DEFAULT_LABEL,
  },
  {
    id: 'zhuhai',
    name: '珠海',
    en: 'Zhuhai',
    country: '中国',
    countryEn: 'China',
    lat: 22.2707,
    lng: 113.5767,
    role: '行旅',
    visitedAt: '2025',
    season: '—',
    description:
      '情侣路、海风，一座节奏很慢的海滨城市。',
    photos: [
      // 占位照片 · 20 张；替换真实照片时直接增删下面的对象
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
    ],
    ...DEFAULT_LABEL,
  },
  {
    id: 'hongkong',
    name: '香港',
    en: 'Hong Kong',
    country: '中国',
    countryEn: 'China',
    lat: 22.3193,
    lng: 114.1694,
    role: '行旅',
    visitedAt: '2025',
    season: '—',
    description:
      '山海之间的密度，霓虹和远足径只隔一站地铁。',
    photos: [
      // 占位照片 · 20 张；替换真实照片时直接增删下面的对象
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
    ],
    ...DEFAULT_LABEL,
  },
  {
    id: 'chaoshan',
    name: '潮汕',
    en: 'Chaoshan',
    country: '中国',
    countryEn: 'China',
    lat: 23.3541,
    lng: 116.6819,
    role: '行旅',
    visitedAt: '2025',
    season: '—',
    description:
      '牛肉火锅、工夫茶，和骑楼下一段不赶时间的午后。',
    photos: [
      // 占位照片 · 20 张；替换真实照片时直接增删下面的对象
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
    ],
    ...DEFAULT_LABEL,
  },
  {
    id: 'xiamen',
    name: '厦门',
    en: 'Xiamen',
    country: '中国',
    countryEn: 'China',
    lat: 24.4798,
    lng: 118.0894,
    role: '行旅',
    visitedAt: '2025',
    season: '—',
    description:
      '鼓浪屿的老别墅，和环岛路怎么也看不厌的海。',
    photos: [
      // 占位照片 · 20 张；替换真实照片时直接增删下面的对象
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
    ],
    ...DEFAULT_LABEL,
  },
  {
    id: 'changsha',
    name: '长沙',
    en: 'Changsha',
    country: '中国',
    countryEn: 'China',
    lat: 28.2282,
    lng: 112.9388,
    role: '行旅',
    visitedAt: '2025',
    season: '—',
    description:
      '夜里十点仍然热闹的街头，和一碗热气腾腾的米粉。',
    photos: [
      // 占位照片 · 20 张；替换真实照片时直接增删下面的对象
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
    ],
    ...DEFAULT_LABEL,
  },
  {
    id: 'chongqing',
    name: '重庆',
    en: 'Chongqing',
    country: '中国',
    countryEn: 'China',
    lat: 29.563,
    lng: 106.5516,
    role: '行旅',
    visitedAt: '2025',
    season: '—',
    description:
      '山城、雾、轻轨穿楼，和一顿吃到深夜的火锅。',
    photos: [
      // 占位照片 · 20 张；替换真实照片时直接增删下面的对象
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
    ],
    ...DEFAULT_LABEL,
  },
  {
    id: 'chengdu',
    name: '成都',
    en: 'Chengdu',
    country: '中国',
    countryEn: 'China',
    lat: 30.5728,
    lng: 104.0668,
    role: '行旅',
    visitedAt: '2025',
    season: '—',
    description:
      '茶馆、火锅，以及不着急的下午。',
    photos: [
      // 占位照片 · 20 张；替换真实照片时直接增删下面的对象
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
    ],
    ...DEFAULT_LABEL,
  },
  {
    id: 'yunnan',
    name: '云南',
    en: 'Yunnan',
    country: '中国',
    countryEn: 'China',
    lat: 25.0389,
    lng: 102.7183,
    role: '行旅',
    visitedAt: '2025',
    season: '—',
    description:
      '从昆明到大理、丽江，风花雪月和高原的阳光。',
    photos: [
      // 占位照片 · 20 张；替换真实照片时直接增删下面的对象
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
    ],
    ...DEFAULT_LABEL,
  },
  {
    id: 'beijing',
    name: '北京',
    en: 'Beijing',
    country: '中国',
    countryEn: 'China',
    lat: 39.9042,
    lng: 116.4074,
    role: '行旅',
    visitedAt: '2025',
    season: '—',
    description:
      '胡同、红墙，还有秋天最好的光。',
    photos: [
      // 占位照片 · 20 张；替换真实照片时直接增删下面的对象
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
    ],
    ...DEFAULT_LABEL,
  },
  {
    id: 'singapore',
    name: '新加坡',
    en: 'Singapore',
    country: '新加坡',
    countryEn: 'Singapore',
    lat: 1.3521,
    lng: 103.8198,
    role: '行旅',
    visitedAt: '2025',
    season: '—',
    description:
      '热带的秩序感，骑楼、雨树和永远在生长的天际线。',
    photos: [
      // 占位照片 · 20 张；替换真实照片时直接增删下面的对象
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
    ],
    ...DEFAULT_LABEL,
  },
  {
    id: 'bangkok',
    name: '曼谷',
    en: 'Bangkok',
    country: '泰国',
    countryEn: 'Thailand',
    lat: 13.7563,
    lng: 100.5018,
    role: '行旅',
    visitedAt: '2025.07',
    season: '雨季',
    description:
      '寺庙、街边摊，和永远拥堵又鲜活的街道。',
    photos: [
      // 占位照片 · 20 张；替换真实照片时直接增删下面的对象
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
    ],
    ...DEFAULT_LABEL,
    labelDx: -30,
    labelDy: 10,
    labelSide: 'left',
  },
  {
    id: 'phuket',
    name: '普吉岛',
    en: 'Phuket',
    country: '泰国',
    countryEn: 'Thailand',
    lat: 7.8804,
    lng: 98.3923,
    role: '行旅',
    visitedAt: '2025.07',
    season: '雨季',
    description:
      '安达曼海的颜色，从清晨到日落都不一样。',
    photos: [
      // 占位照片 · 20 张；替换真实照片时直接增删下面的对象
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
    ],
    ...DEFAULT_LABEL,
  },
  {
    id: 'phuquoc',
    name: '富国岛',
    en: 'Phu Quoc',
    country: '越南',
    countryEn: 'Vietnam',
    lat: 10.2899,
    lng: 103.984,
    role: '行旅',
    visitedAt: '2025.07',
    season: '雨季',
    description:
      '越南南部的慢岛，海水很浅，时间也很慢。',
    photos: [
      // 占位照片 · 20 张；替换真实照片时直接增删下面的对象
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
      { file: 'IMG_6172.jpeg', caption: '沿海公路，一边是山，一边是海', alt: '沿海公路上行驶的视角', position: 'center 60%' },
      { file: 'IMG_6203.jpeg', caption: '落日把天际线染成橘色', alt: '城市日落', position: 'center 55%' },
      { file: 'IMG_6226.jpeg', caption: '在咖啡馆里，消磨掉一个下午', alt: '木桌上的咖啡与电脑', position: 'center 50%' },
    ],
    ...DEFAULT_LABEL,
  },
]

export const travelMeta = {
  title: '旅行足迹',
  subtitle: 'A PERSONAL ATLAS',
  intro: '把走过的城市，钉在一张有温度的地图上。',
  blurb:
    '这里收录我去过的地方、路上的光和偶然停下的瞬间。拖动地图，或者点开一枚坐标。',
  homeId: 'shenzhen',
}

/** 计算两点间球面距离（公里） */
export function distanceKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6371
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(s))
}
