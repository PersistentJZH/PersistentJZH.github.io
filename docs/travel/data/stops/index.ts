/**
 * 旅行地点索引：新增地点时，在本目录创建以 id 命名的文件，并在此导入、加入数组。
 * 数组顺序决定页面地点列表的顺序；每个地点文件维护坐标、简介和 photos 相册。
 * 照片文件放在 OSS 的 blog/ 目录；visitedAt 填到访时间，season 可填 '—' 隐藏。
 */
import type { TravelStop } from '../types'
import shenzhen from './shenzhen'
import huizhou from './huizhou'
import guangzhou from './guangzhou'
import zhuhai from './zhuhai'
import hongkong from './hongkong'
import chaoshan from './chaoshan'
import xiamen from './xiamen'
import changsha from './changsha'
import chongqing from './chongqing'
import chengdu from './chengdu'
import yunnan from './yunnan'
import beijing from './beijing'
import singapore from './singapore'
import bangkok from './bangkok'
import phuket from './phuket'
import phuquoc from './phuquoc'

export const travelStops: TravelStop[] = [
  shenzhen,
  huizhou,
  guangzhou,
  zhuhai,
  hongkong,
  chaoshan,
  xiamen,
  changsha,
  chongqing,
  chengdu,
  yunnan,
  beijing,
  singapore,
  bangkok,
  phuket,
  phuquoc,
]
