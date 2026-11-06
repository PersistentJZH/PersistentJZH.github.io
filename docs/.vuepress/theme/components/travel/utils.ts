import { OSS_BASE } from '../../../../travel/data/meta'

/**
 * 阿里云 OSS 图片处理：按宽度压缩并转 webp。
 * 原图单张 4–5MB，直接加载会让地图页非常慢。
 */
export function photoUrl(file: string, width = 1200): string {
  return `${OSS_BASE}${file}?x-oss-process=image/resize,w_${width}/format,webp/quality,q_82`
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
