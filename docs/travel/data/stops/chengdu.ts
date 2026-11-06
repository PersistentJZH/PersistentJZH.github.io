import type { TravelStop } from '../types'
import { DEFAULT_LABEL } from '../defaults'

const chengdu: TravelStop = {
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
}

export default chengdu
