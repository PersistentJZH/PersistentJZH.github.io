import type { TravelStop } from '../types'
import { DEFAULT_LABEL } from '../defaults'

const xiamen: TravelStop = {
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
}

export default xiamen
