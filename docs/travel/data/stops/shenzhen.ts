import type { TravelStop } from '../types'
import { DEFAULT_LABEL } from '../defaults'

const shenzhen: TravelStop = {
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
}

export default shenzhen
