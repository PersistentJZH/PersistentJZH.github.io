<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

type DayId = 1 | 2 | 3
type DayFilter = 'all' | DayId
type SpotKind = 'station' | 'stay' | 'sight' | 'raft' | 'view'
type RouteMode = 'car' | 'ebike' | 'raft' | 'shuttle'

interface Spot {
  id: string
  no: string
  name: string
  en: string
  x: number
  y: number
  days: DayId[]
  kind: SpotKind
  side: 'left' | 'right'
  dist: string
  ebike: string
  car: string
  ticket: string
  desc: string
  tip: string
}

interface RouteLine {
  id: string
  day: DayId
  mode: RouteMode
  d: string
  label: { x: number; y: number; text: string; w: number }
}

interface DayItem {
  time: string
  title: string
  text: string
  tag?: string
  meta?: string[]
  key?: boolean
}

interface DayPlan {
  id: DayId
  date: string
  title: string
  summary: string
  keys: string[]
  distance: string
  weather: string
  items: DayItem[]
  tip: string
  callout?: {
    kicker: string
    title: string
    body: string
    options: Array<{ best?: boolean; title: string; meta: string; text: string }>
  }
}

const tabs: Array<{ id: DayFilter; label: string }> = [
  { id: 'all', label: '全部' },
  { id: 1, label: 'D1 抵达' },
  { id: 2, label: 'D2 骑行' },
  { id: 3, label: 'D3 返程' },
]

const activeDay = ref<DayFilter>('all')
const selectedId = ref('hotel')
const mapScrollEl = ref<HTMLElement | null>(null)

onMounted(() => {
  // 手机上地图比屏幕宽，默认把视野放在酒店/十里画廊这一段，而不是最西边。
  const el = mapScrollEl.value
  if (!el || window.innerWidth > 820)
    return
  requestAnimationFrame(() => {
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2
  })
})

const spots: Spot[] = [
  {
    id: 'hotel',
    no: '00',
    name: '桔子酒店',
    en: 'YOUR BASE · FENGMING',
    x: 590,
    y: 440,
    days: [1, 2, 3],
    kind: 'stay',
    side: 'left',
    dist: '大本营',
    ebike: '—',
    car: '—',
    ticket: '—',
    desc: '凤鸣，十里画廊北入口。距西街 1.9km，距高铁专线客运站 620m，位置正好卡在县城和十里画廊之间。',
    tip: '前台可以帮忙叫车、借雨伞；入住时问一句「租电瓶车能不能送到酒店」，通常能省掉押金和来回取车。',
  },
  {
    id: 'station',
    no: '01',
    name: '阳朔站',
    en: 'YANGSHUO RAILWAY STATION',
    x: 1040,
    y: 220,
    days: [1, 3],
    kind: 'station',
    side: 'left',
    dist: '29 km',
    ebike: '—',
    car: '45 min',
    ticket: '—',
    desc: '高铁站，行程的起点和终点。它在兴坪镇，不在阳朔县城——这是第一次来阳朔最容易踩的坑。',
    tip: '出站打车到凤鸣约 45 分钟、¥100–120；想省钱坐高铁专线到县城（约 ¥20、50 分钟），再打车 5 分钟。',
  },
  {
    id: 'xingping',
    no: '02',
    name: '兴坪古镇',
    en: 'XINGPING · ¥20 VIEW',
    x: 980,
    y: 110,
    days: [3],
    kind: 'sight',
    side: 'left',
    dist: '27 km',
    ebike: '约 90 min',
    car: '40 min',
    ticket: '免费',
    desc: '漓江边的千年古镇，20 元人民币背景的取景地。青石板老街、古戏台，走到江边只要十几分钟。',
    tip: '周日返程前来这里最顺路：古镇到阳朔站只有 8km、15 分钟。带一张 20 元纸币，去观景台同角度合影。',
  },
  {
    id: 'west',
    no: '03',
    name: '西街',
    en: 'WEST STREET',
    x: 650,
    y: 355,
    days: [1, 2],
    kind: 'sight',
    side: 'left',
    dist: '1.9 km',
    ebike: '8 min',
    car: '6 min',
    ticket: '免费',
    desc: '阳朔最热闹的老街。白天是店铺和咖啡馆，晚上是酒吧、夜市和啤酒鱼。',
    tip: '晚上 19:00 后最挤；酒吧拉客多，先看价目表。喜欢安静就沿漓江边走到双月桥，风比西街里舒服。',
  },
  {
    id: 'impression',
    no: '04',
    name: '印象刘三姐',
    en: 'IMPRESSION LIU SANJIE',
    x: 725,
    y: 372,
    days: [2],
    kind: 'sight',
    side: 'right',
    dist: '2.3 km',
    ebike: '10 min',
    car: '8 min',
    ticket: '¥198 起',
    desc: '漓江上的山水实景演出，20:00 开演，约 70 分钟。舞台就是真实的江面和峰林。',
    tip: '如果周六晚看演出，就把千里江山图挪到周日清晨；两件事同一天做，时间会打架。',
  },
  {
    id: 'gallery',
    no: '05',
    name: '十里画廊',
    en: 'SHILI GALLERY',
    x: 600,
    y: 525,
    days: [2],
    kind: 'sight',
    side: 'left',
    dist: '0.8 km',
    ebike: '3 min',
    car: '2 min',
    ticket: '免费（骑行）',
    desc: '从凤鸣一路向南到月亮山的喀斯特景观公路，免费。骑车穿过稻田和峰林，是阳朔最舒服的一段路。',
    tip: '沿途蝴蝶泉、聚龙潭、图腾古道都单独收费，建议只骑不进去，把时间留给遇龙河和日落。',
  },
  {
    id: 'moon',
    no: '06',
    name: '月亮山',
    en: 'MOON HILL',
    x: 650,
    y: 645,
    days: [2],
    kind: 'sight',
    side: 'right',
    dist: '7.5 km',
    ebike: '25 min',
    car: '15 min',
    ticket: '约 ¥15',
    desc: '山顶有一个天然月洞，是十里画廊的终点地标。车停在路边就能看到，不用买票也能拍照。',
    tip: '登山往返约 40 分钟，时间紧就在路边看；山脚的大榕树景区可去可不去。',
  },
  {
    id: 'gongnong',
    no: '07',
    name: '工农桥',
    en: 'GONGNONG BRIDGE',
    x: 500,
    y: 565,
    days: [2],
    kind: 'raft',
    side: 'left',
    dist: '6.5 km',
    ebike: '22 min',
    car: '14 min',
    ticket: '免费',
    desc: '遇龙河下游、十里画廊西侧，绿道骑行的南端。桥上是看竹筏排队的好位置。',
    tip: '下午 15:30–17:00 的光线最好，竹筏从桥下穿过，背景是一排峰林。',
  },
  {
    id: 'jiuxian',
    no: '08',
    name: '旧县码头',
    en: 'JIUXIAN VILLAGE',
    x: 390,
    y: 435,
    days: [2],
    kind: 'raft',
    side: 'left',
    dist: '10 km',
    ebike: '35 min',
    car: '18 min',
    ticket: '免费',
    desc: '遇龙河中游的古村，明清老屋和归义古城墙都还在。竹筏在这里上岸。',
    tip: '把电瓶车停在旧县码头（¥5–10），坐景区接驳车去金龙桥，竹筏漂回来正好取车。',
  },
  {
    id: 'jinlong',
    no: '09',
    name: '金龙桥码头',
    en: 'JINLONG BRIDGE',
    x: 300,
    y: 325,
    days: [2],
    kind: 'raft',
    side: 'left',
    dist: '13 km',
    ebike: '45 min',
    car: '22 min',
    ticket: '¥320/筏',
    desc: '遇龙河上游最经典的竹筏起点。金龙桥—旧县段 6km，约 90 分钟，双人筏。',
    tip: '提前在「遇龙河」公众号实名预约，带身份证；穿凉鞋或速干裤，过坝一定会湿脚。',
  },
  {
    id: 'qianli',
    no: '10',
    name: '千里江山图',
    en: 'QIANLI JIANG SHAN',
    x: 125,
    y: 275,
    days: [2],
    kind: 'view',
    side: 'right',
    dist: '29 km',
    ebike: '90–110 min',
    car: '45 min',
    ticket: '免费',
    desc: '葡萄镇石寨底的野生观景台，现实版《千里江山图》。免费，8:00–19:00，日落是它最好的时刻。',
    tip: '秋季 17:00–18:00 是黄金光线，18:04 日落。最后几公里盘山路，建议包车/拼车，不要骑电瓶车。',
  },
  {
    id: 'xianggong',
    no: '11',
    name: '相公山',
    en: 'XIANGGONG HILL',
    x: 900,
    y: 155,
    days: [3],
    kind: 'view',
    side: 'left',
    dist: '28 km',
    ebike: '—',
    car: '45 min',
    ticket: '约 ¥60',
    desc: '兴坪境内的漓江第一湾观景台，15–20 分钟登顶；04:30–19:00，最出名的是日出，白天也能看全景。',
    tip: '和千里江山图一东一西，同一下午串会撞晚高峰；要加就放周日早上，放弃兴坪。',
  },
]

const routes: RouteLine[] = [
  {
    id: 'd1',
    day: 1,
    mode: 'car',
    d: 'M1040 220 C 950 245 860 300 770 335 C 705 360 640 398 590 440',
    label: { x: 842, y: 286, text: '29 km · 车 45 min', w: 128 },
  },
  {
    id: 'd2-out',
    day: 2,
    mode: 'ebike',
    d: 'M590 440 C 548 455 512 472 472 470 C 440 468 410 452 390 435',
    label: { x: 468, y: 496, text: '10 km · 电瓶车 35 min', w: 158 },
  },
  {
    id: 'd2-shuttle',
    day: 2,
    mode: 'shuttle',
    d: 'M390 435 C 362 400 332 362 300 325',
    label: { x: 330, y: 394, text: '接驳 15 min', w: 88 },
  },
  {
    id: 'd2-raft',
    day: 2,
    mode: 'raft',
    d: 'M286 332 C 316 368 350 405 378 442',
    label: { x: 206, y: 420, text: '竹筏 6 km · 90 min', w: 132 },
  },
  {
    id: 'd2-green',
    day: 2,
    mode: 'ebike',
    d: 'M390 435 C 420 478 458 522 500 565',
    label: { x: 438, y: 544, text: '8 km · 30 min', w: 102 },
  },
  {
    id: 'd2-moon',
    day: 2,
    mode: 'ebike',
    d: 'M500 565 C 548 590 600 618 650 645',
    label: { x: 578, y: 622, text: '3 km · 12 min', w: 98 },
  },
  {
    id: 'd2-back',
    day: 2,
    mode: 'ebike',
    d: 'M650 645 C 632 600 612 558 600 525 C 594 495 590 465 590 440',
    label: { x: 666, y: 566, text: '7.5 km · 25 min', w: 114 },
  },
  {
    id: 'd2-sunset',
    day: 2,
    mode: 'car',
    d: 'M590 440 C 530 420 480 395 420 372 C 350 345 260 312 180 292 C 160 287 140 280 125 275',
    label: { x: 438, y: 350, text: '29 km · 车 45 min', w: 128 },
  },
  {
    id: 'd3-xing',
    day: 3,
    mode: 'car',
    d: 'M590 440 C 660 400 740 350 820 300 C 890 255 940 170 980 110',
    label: { x: 832, y: 248, text: '27 km · 车 40 min', w: 128 },
  },
  {
    id: 'd3-station',
    day: 3,
    mode: 'car',
    d: 'M980 110 C 1012 145 1028 182 1040 220',
    label: { x: 1010, y: 168, text: '8 km · 15 min', w: 102 },
  },
  {
    id: 'd3-xianggong',
    day: 3,
    mode: 'car',
    d: 'M980 110 C 952 124 926 140 900 155',
    label: { x: 860, y: 190, text: '可选 15 km', w: 96 },
  },
]

const peaks = [
  { x: 72, y: 342, s: 1.15, o: 0.5 },
  { x: 132, y: 365, s: 0.85, o: 0.42 },
  { x: 192, y: 330, s: 1.2, o: 0.48 },
  { x: 238, y: 392, s: 0.78, o: 0.38 },
  { x: 58, y: 414, s: 0.72, o: 0.34 },
  { x: 158, y: 430, s: 0.62, o: 0.3 },
  { x: 420, y: 252, s: 0.9, o: 0.4 },
  { x: 482, y: 236, s: 1.1, o: 0.46 },
  { x: 542, y: 266, s: 0.8, o: 0.36 },
  { x: 378, y: 286, s: 0.7, o: 0.32 },
  { x: 878, y: 152, s: 0.9, o: 0.4 },
  { x: 932, y: 190, s: 1.12, o: 0.46 },
  { x: 982, y: 150, s: 0.78, o: 0.34 },
  { x: 1024, y: 176, s: 0.7, o: 0.3 },
  { x: 720, y: 700, s: 0.9, o: 0.42 },
  { x: 780, y: 716, s: 1.1, o: 0.48 },
  { x: 840, y: 690, s: 0.8, o: 0.36 },
  { x: 650, y: 712, s: 0.7, o: 0.3 },
  { x: 330, y: 482, s: 0.7, o: 0.3 },
  { x: 280, y: 516, s: 0.9, o: 0.36 },
  { x: 422, y: 542, s: 0.8, o: 0.32 },
  { x: 360, y: 582, s: 0.6, o: 0.26 },
  { x: 520, y: 642, s: 0.9, o: 0.36 },
  { x: 560, y: 692, s: 0.7, o: 0.28 },
  { x: 692, y: 612, s: 0.8, o: 0.3 },
]

const legs = [
  { from: '阳朔站', to: '桔子酒店', km: '29 km', ebike: '—', car: '45 min', note: '打车约 ¥100–120；高铁专线 ¥20 到县城再打车' },
  { from: '酒店', to: '西街', km: '1.9 km', ebike: '8 min', car: '6 min', note: '步行约 25 分钟' },
  { from: '酒店', to: '十里画廊入口', km: '0.8 km', ebike: '3 min', car: '2 min', note: '出门就是' },
  { from: '酒店', to: '旧县码头', km: '10 km', ebike: '35 min', car: '18 min', note: '竹筏停车的起点' },
  { from: '旧县', to: '金龙桥', km: '7 km', ebike: '25 min', car: '15 min', note: '建议坐景区接驳，不骑车' },
  { from: '金龙桥', to: '旧县', km: '6 km 水路', ebike: '—', car: '竹筏 90 min', note: '¥320/筏，双人筏；单人可拼筏' },
  { from: '旧县', to: '工农桥', km: '8 km', ebike: '30 min', car: '18 min', note: '遇龙河绿道，精华段' },
  { from: '工农桥', to: '月亮山', km: '3 km', ebike: '12 min', car: '8 min', note: '沿十里画廊南行' },
  { from: '月亮山', to: '酒店', km: '7.5 km', ebike: '25 min', car: '15 min', note: '穿过十里画廊北行' },
  { from: '酒店', to: '千里江山图', km: '29 km', ebike: '90–110 min', car: '45 min', note: '山路弯多，建议拼车/包车' },
  { from: '酒店', to: '兴坪古镇', km: '27 km', ebike: '约 90 min', car: '40 min', note: '不建议骑电瓶车' },
  { from: '兴坪古镇', to: '阳朔站', km: '8 km', ebike: '—', car: '15 min', note: '返程顺路' },
  { from: '酒店', to: '印象刘三姐', km: '2.3 km', ebike: '10 min', car: '8 min', note: '演出 20:00 开始' },
  { from: '酒店', to: '相公山', km: '28 km', ebike: '—', car: '45 min', note: '可选；日出最出名，10 点起只能白天看' },
  { from: '相公山', to: '兴坪', km: '15 km', ebike: '—', car: '25 min', note: '周日顺路' },
  { from: '相公山', to: '千里江山图', km: '50 km', ebike: '—', car: '1h15', note: '一东一西，同天串会撞晚高峰' },
]

const days: DayPlan[] = [
  {
    id: 1,
    date: '10.23 周五',
    title: '抵达，先钻进西街的夜',
    summary:
      '18:00 阳朔站落地，跨过 29 公里山水到凤鸣。放下行李，去西街吃一条啤酒鱼，为明天的骑行留点体力。',
    keys: ['阳朔站 → 酒店 29km', '西街夜逛', '早睡，明天骑一天'],
    distance: '29 km',
    weather: '晴 · 17–29℃',
    items: [
      {
        time: '18:00',
        title: '阳朔站落地',
        tag: '高铁',
        text:
          '出站后别按「阳朔县城」找酒店——阳朔站在兴坪镇，到凤鸣还有 29 公里。行李多直接打车/滴滴，约 45 分钟、¥100–120；想省钱坐高铁专线到县城（约 ¥20、50 分钟），再打车 5 分钟。',
        meta: ['打车 45min', '高铁专线 ¥20'],
        key: true,
      },
      {
        time: '19:00',
        title: '入住桔子酒店',
        tag: '住',
        text:
          '酒店在凤鸣，十里画廊北入口，距西街 1.9km。前台可以帮忙叫车、借雨伞；顺便问一句明天租电瓶车能不能送到酒店。',
        meta: ['凤鸣', '近十里画廊', '近高铁专线站'],
      },
      {
        time: '19:30',
        title: '第一口桂林米粉，或者啤酒鱼',
        text:
          '累了就在酒店附近吃；还有力气就去西街。米粉先来一碗卤菜粉+锅烧，¥6–10；啤酒鱼按斤称，点之前先确认鱼重和单价。',
        meta: ['人均 ¥30–80'],
      },
      {
        time: '20:30',
        title: '西街夜逛',
        tag: '免费',
        text:
          '从酒店走过去 25 分钟，打车 5 分钟。西街晚上 19:00 后最热闹，酒吧街吵；喜欢安静就沿漓江边走到双月桥，看对岸的灯。',
        meta: ['步行 25min', '打车 6min'],
        key: true,
      },
      {
        time: '22:00',
        title: '回酒店，给明天留体力',
        text:
          '今晚把三件事确认掉：竹筏时段、千里江山拼车、明天租车。都定好，明天只管骑。',
      },
    ],
    tip: '阳朔站前的高铁专线末班大约 21:00，别在站前磨蹭太久；打车记得走平台，不要跟站前拉客走。',
  },
  {
    id: 2,
    date: '10.24 周六',
    title: '竹筏、绿道，和一场千里江山日落',
    summary:
      '10 点起床，12:15 的竹筏，14:45 穿十里画廊回酒店，15:40 出发去千里江山图，避开 17:00 晚高峰。',
    keys: ['10:00 起床', '12:15 竹筏', '15:40 出发'],
    distance: '约 30 km 骑行',
    weather: '晴 · 17–30℃',
    items: [
      {
        time: '10:00',
        title: '睡到自然醒',
        tag: '10:00',
        text: '不设闹钟。10 点起床，10:20 出门吃早餐；今天所有安排都往后推，先把竹筏约在 12:15 左右。',
        meta: ['10:00 起床', '早餐 20min'],
        key: true,
      },
      {
        time: '10:45',
        title: '租电瓶车，直接去旧县',
        tag: '10 km',
        text: '检查电量、刹车、灯、头盔，拍车身视频。凤鸣 → 县城 → 白沙方向 → 旧县，10km，约 35 分钟。',
        meta: ['¥50–80/天', '电瓶车 35min'],
      },
      {
        time: '11:20',
        title: '旧县停车，接驳去金龙桥',
        tag: '接驳 15min',
        text: '车停旧县码头（¥5–10），坐景区接驳车去金龙桥，约 15 分钟、¥10–20/人。12:15 的竹筏，提前 20 分钟到。',
        meta: ['停车 ¥5–10', '接驳 ¥10–20'],
      },
      {
        time: '12:15',
        title: '金龙桥—旧县竹筏',
        tag: '90 min',
        text:
          '遇龙河最经典的一段，6km，约 90 分钟，¥320/筏（双人筏）。一个人可现场拼筏或买整筏独享；提前在「遇龙河」公众号约 12:15–12:30 的时段。',
        meta: ['¥320/筏', '单人可拼筏', '过坝会湿脚'],
        key: true,
      },
      {
        time: '13:45',
        title: '旧县上岸，取车',
        text: '上岸后取车，逛 15 分钟旧县古村；不逛就直接去午饭。',
        meta: ['免费', '15min'],
      },
      {
        time: '14:10',
        title: '工农桥午餐',
        text: '旧县 → 工农桥 8km/30 分钟。农家菜：柴火鸡、啤酒鱼、田螺酿；一个人点两个菜，控制在 30 分钟内。',
        meta: ['人均 ¥50–70', '午餐 30min'],
      },
      {
        time: '14:45',
        title: '十里画廊 → 月亮山 → 酒店',
        tag: '10.5 km',
        text: '工农桥 → 月亮山 3km/12 分钟；月亮山不登山，路边看月洞；再沿十里画廊北行回酒店，7.5km/25 分钟。只骑不停，40 分钟回酒店。',
        meta: ['电瓶车 40min', '不登山'],
      },
      {
        time: '15:25',
        title: '回酒店，还车换车',
        text: '还电瓶车、拿外套和水；15:40 必须上车，再晚就撞 17:00 的晚高峰。',
        meta: ['15:40 上车'],
        key: true,
      },
      {
        time: '15:40',
        title: '出发千里江山图',
        tag: '拼车',
        text:
          '拼车/包车，29km，45 分钟。16:25 到观景台，18:04 日落；15:40 出发是为了避开 17:00 晚高峰，再晚就只剩日落尾巴。',
        meta: ['29km', '16:25 到', '免费'],
        key: true,
      },
      {
        time: '18:35',
        title: '下山回程',
        text: '日落后等天空变成蓝调再下山，19:20 左右回到酒店。',
      },
      {
        time: '19:40',
        title: '西街晚餐，啤酒鱼收尾',
        text: '去西街边缘的小店，避开正街拉客；一个人点 1–1.5 斤的剑骨鱼就够。',
        meta: ['人均 ¥80–120'],
      },
    ],
    tip: '10 点起床的代价是下午很满：竹筏 12:15，午餐 30 分钟，十里画廊只骑不停，15:40 必须上车；再晚就撞 17:00 晚高峰。想加相公山，就放周日，别和千里江山同一天。',
    callout: {
      kicker: '关键决策',
      title: '千里江山图：电瓶车真的到不了吗？',
      body:
        '能到，但不值得冒险。观景台在葡萄镇石寨底，距酒店 29km，最后几公里是盘山路；日落后下山没有路灯，电瓶车灯弱、刹车距离长。把这段交给拼车/包车，白天的电瓶车才骑得从容。',
      options: [
        {
          best: true,
          title: '推荐 · 拼车（一个人首选）',
          meta: '约 ¥60/人（西街拼车点）',
          text: '15:40 酒店接，16:25 到观景台，18:35 下山，19:20 回酒店。15:40 出发是为了避开 17:00 晚高峰；一个人别包车，让酒店前台或西街拼车点帮忙凑人；不想等再包车，¥220–300/车。',
        },
        {
          title: '不推荐 · 电瓶车',
          meta: '单程 29km · 约 1.5h',
          text: '往返 58km，加上白天骑行接近 90km；续航、夜路、山路弯道三重风险。除非你的车实测续航 100km 以上。',
        },
      ],
    },
  },
  {
    id: 3,
    date: '10.25 周日',
    title: '兴坪，20 元背景，然后回家',
    summary:
      '10 点起床，退房打车去兴坪，行李寄在古镇；逛完 20 元背景直接去阳朔站，14:30 上车。',
    keys: ['10:00 起床', '兴坪 20 元背景', '14:30 返程'],
    distance: '35 km',
    weather: '多云 · 18–28℃',
    items: [
      {
        time: '10:00',
        title: '睡到自然醒',
        tag: '10:00',
        text: '10 点起床，10:20 早餐，10:30 退房。今天只有兴坪和返程，时间够，但别赖到 10:30 以后。',
        meta: ['10:00 起床', '10:30 退房'],
        key: true,
      },
      {
        time: '10:40',
        title: '打车去兴坪，行李随车',
        tag: '27 km',
        text: '酒店 → 兴坪 27km，40 分钟，约 ¥80–100。行李放后备箱，到古镇找小店寄存（¥10–20），别先绕去阳朔站。',
        meta: ['车 40min', '行李寄存 ¥10–20'],
      },
      {
        time: '11:25',
        title: '兴坪古镇 + 20 元背景',
        tag: '免费',
        text: '青石板老街、古戏台，走到漓江边的 20 元人民币背景观景台约 15–20 分钟。带一张 20 元纸币，同角度合影。',
        meta: ['免费', '步行 20min'],
        key: true,
      },
      {
        time: '12:20',
        title: '兴坪午餐 / 打包',
        text: '桂林米粉、松花糖，或者买点小吃带走。老寨山往返 1.5 小时，今天时间不够，放弃。',
        meta: ['简餐 20min'],
      },
      {
        time: '12:50',
        title: '打车去阳朔站',
        tag: '8 km',
        text: '8km，15 分钟，¥25–30。13:05 到站，取行李、安检，14:30 上车。',
        meta: ['13:05 到站', '14:30 发车'],
        key: true,
      },
      {
        time: '14:30',
        title: '返程深圳北',
        text: '约 3 小时，17:40 左右到深圳北。周日下午站前可能堵，留足 45 分钟。',
        meta: ['约 3h', '以购票信息为准'],
      },
    ],
    tip: '行李别先寄到阳朔站，会多绕 30 公里；直接寄在兴坪古镇（¥10–20），逛完打车去站。14:30 的车，13:15 前到站最稳。',
  },
]

const tickets = [
  { name: '西街', price: '免费' },
  { name: '十里画廊骑行', price: '免费' },
  { name: '兴坪古镇', price: '免费' },
  { name: '千里江山图', price: '免费' },
  { name: '遇龙河竹筏', price: '¥320/筏' },
  { name: '印象刘三姐', price: '¥198 起' },
  { name: '月亮山', price: '约 ¥15' },
  { name: '相公山', price: '约 ¥60' },
  { name: '大榕树', price: '约 ¥20' },
  { name: '旧县古村', price: '免费' },
  { name: '工农桥', price: '免费' },
]

const bookings = [
  {
    tag: '必须提前订',
    title: '遇龙河竹筏',
    body:
      '金龙桥—旧县段最经典，双人筏，约 90 分钟。一个人可现场拼筏，也可以买整筏独享；周末中午的班次也紧张，建议今晚就约 12:00–12:30。',
    price: '¥320/筏（可拼筏）',
    how: '微信公众号「遇龙河」→ 选码头/日期/时段 → 实名认证 → 现场取票',
    note: '1.2m 以下儿童、60 岁以上老人、孕妇、心脏病/高血压不能乘坐。一个人：现场拼筏（等 10–30 分钟，旺季更久）或买整筏独享；¥320/筏。',
  },
  {
    tag: '建议提前订',
    title: '千里江山图拼车 / 包车',
    body:
      '观景台在葡萄镇石寨底，公共交通不方便，回程很难叫车。一个人拼车最省心，2 人以上包车更自由。',
    price: '拼车约 ¥60/人 · 包车 ¥220–300/车',
    how: '酒店前台 / 西街拼车点 / 滴滴包车；拼车约 ¥60/人',
    note: '导航「阳朔千里江山图大型水墨画打卡地」；免费，8:00–19:00；山上没有吃的，带水。',
  },
  {
    tag: '可选',
    title: '《印象刘三姐》',
    body:
      '漓江上的山水实景演出，20:00 开演，约 70 分钟。如果周六晚看演出，就把千里江山挪到周日清晨。',
    price: '¥198 起',
    how: '官方公众号 / 携程 / 酒店前台，提前 1 天',
    note: '露天演出，雨天备雨衣；散场后打车排队，建议提前叫车。',
  },
]

const foods = [
  {
    name: '啤酒鱼',
    en: 'BEER FISH',
    desc: '阳朔头牌，剑骨鱼/毛骨鱼现杀，番茄和啤酒焖煮，酸辣鲜。',
    where: '西街边缘、兴坪古镇',
    price: '¥80–120/人',
  },
  {
    name: '桂林米粉',
    en: 'RICE NOODLES',
    desc: '卤菜粉 + 锅烧 + 酸笋，先干拌后加汤，早餐的灵魂。',
    where: '街边老店',
    price: '¥6–10/碗',
  },
  {
    name: '田螺酿',
    en: 'STUFFED SNAILS',
    desc: '螺肉剁碎混猪肉再塞回螺壳，紫苏去腥，很下酒。',
    where: '农家菜馆',
    price: '¥40–60/份',
  },
  {
    name: '荔浦芋扣肉',
    en: 'TARO PORK',
    desc: '芋头粉糯、五花肉油润，广西宴席的硬菜。',
    where: '遇龙河农家菜',
    price: '¥50–70/份',
  },
]

const packList = [
  '身份证（竹筏实名）',
  '防晒霜 / 帽子',
  '薄外套（早晚 17℃）',
  '凉鞋 / 速干裤',
  '手机防水袋',
  '驱蚊水',
  '充电宝',
  '20 元纸币',
  '晕车药',
]

const todoList = [
  '预约遇龙河竹筏',
  '订千里江山拼车 / 包车',
  '确认高铁专线末班',
  '下载离线地图',
  '给电瓶车拍车身视频',
  '买一份旅行意外险',
]

const avoidList = [
  '把「阳朔站」当阳朔县城',
  '骑电瓶车夜上千里江山',
  '在正街拉客店点啤酒鱼',
  '把遇龙河竹筏买成漓江竹筏',
]

const selectedSpot = computed(() => spots.find((spot) => spot.id === selectedId.value) ?? spots[0])

function isDimSpot(spot: Spot): boolean {
  const day = activeDay.value
  if (day === 'all')
    return false
  return !spot.days.includes(day)
}

function isDimRoute(route: RouteLine): boolean {
  const day = activeDay.value
  if (day === 'all')
    return false
  return route.day !== day
}

function selectSpot(id: string): void {
  selectedId.value = id
}
</script>

<template>
  <div class="ys">
    <header class="ys-hero">
      <div class="ys-hero-sky" aria-hidden="true">
        <span class="ys-sun" />
        <svg class="ys-hero-mountains" viewBox="0 0 1440 300" preserveAspectRatio="none">
          <path
            class="ys-mtn-far"
            d="M0 300 V240 C 60 240 85 185 140 185 C 195 185 215 225 270 225 C 325 225 350 160 410 160 C 470 160 495 220 555 220 C 615 220 640 170 700 170 C 760 170 785 230 845 230 C 905 230 930 180 990 180 C 1050 180 1075 225 1135 225 C 1195 225 1220 195 1280 195 C 1340 195 1380 220 1440 215 V300 Z"
          />
          <path
            class="ys-mtn-mid"
            d="M0 300 V258 C 70 258 100 210 160 210 C 220 210 245 245 305 245 C 365 245 390 190 455 190 C 520 190 545 240 610 240 C 675 240 700 200 765 200 C 830 200 855 250 920 250 C 985 250 1010 210 1075 210 C 1140 210 1165 245 1230 245 C 1295 245 1320 220 1380 220 C 1410 220 1425 230 1440 228 V300 Z"
          />
          <path
            class="ys-mtn-near"
            d="M0 300 V276 C 80 276 110 238 175 238 C 240 238 265 264 330 264 C 395 264 425 218 490 218 C 555 218 580 260 645 260 C 710 260 740 228 805 228 C 870 228 895 266 960 266 C 1025 266 1055 236 1120 236 C 1185 236 1210 262 1275 262 C 1340 262 1370 244 1440 244 V300 Z"
          />
        </svg>
      </div>

      <div class="ys-wrap ys-hero-inner">
        <nav class="ys-crumb" aria-label="面包屑">
          <a href="/travel/">旅行足迹</a>
          <span>/</span>
          <a href="/travel/guides/">旅行攻略</a>
          <span>/</span>
          <em>阳朔</em>
        </nav>

        <p class="ys-eyebrow">YANGSHUO · GUANGXI · 2026 AUTUMN</p>
        <h1>
          骑一辆电瓶车，<br class="ys-hero-br" />去追<em>千里江山</em>
          <span>阳朔，三天两夜</span>
        </h1>
        <p class="ys-lede">
          周五 18:00 落地阳朔站，周日 14:30 返程深圳北。住十里画廊，每天睡到 10 点，
          租一辆电瓶车，把西街、遇龙河竹筏和一场 18:04 的日落串起来。
        </p>

        <div class="ys-hero-meta">
          <span class="ys-chip">10.23 — 10.25</span>
          <span class="ys-chip">2 晚 · 3 天</span>
          <span class="ys-chip">电瓶车 + 竹筏 + 拼车</span>
          <span class="ys-chip">solo trip · 1 人</span>
          <span class="ys-chip">每天 10:00 起床</span>
        </div>

        <div class="ys-hero-stats">
          <div class="ys-stat">
            <b>3</b>
            <span>天 · 2 晚</span>
          </div>
          <div class="ys-stat">
            <b>12</b>
            <span>个地点</span>
          </div>
          <div class="ys-stat">
            <b>29<small>km</small></b>
            <span>最远单程</span>
          </div>
          <div class="ys-stat">
            <b>18:04</b>
            <span>日落时分</span>
          </div>
        </div>
      </div>
    </header>

    <section class="ys-wrap ys-facts" aria-label="行程速览">
      <div class="ys-fact-grid">
        <div class="ys-fact">
          <small>Arrive</small>
          <b>10.23 周五 18:00</b>
          <span>阳朔站 · 兴坪镇</span>
        </div>
        <div class="ys-fact">
          <small>Stay</small>
          <b>桔子酒店 · 十里画廊</b>
          <span>凤鸣 · 距西街 1.9km</span>
        </div>
        <div class="ys-fact">
          <small>Depart</small>
          <b>10.25 周日 14:30</b>
          <span>阳朔站 → 深圳北</span>
        </div>
        <div class="ys-fact">
          <small>Weather</small>
          <b>晴 · 17–30℃</b>
          <span>日落 18:04 · 带薄外套</span>
        </div>
      </div>
    </section>

    <section class="ys-wrap ys-section" aria-labelledby="overview-title">
      <header class="ys-sec-head">
        <p class="ys-kicker">01 / THE SHAPE OF THREE DAYS</p>
        <h2 id="overview-title">三天，刚刚好</h2>
        <p>
          一天抵达，一天把遇龙河和十里画廊骑透，一天留给兴坪和返程。
          不赶景点，把时间花在骑行、竹筏和日落上。
        </p>
      </header>

      <div class="ys-day-grid">
        <article v-for="day in days" :key="day.id" class="ys-day-card">
          <div class="ys-day-top">
            <span>D{{ day.id }}</span>
            <time>{{ day.date }}</time>
          </div>
          <h3>{{ day.title }}</h3>
          <p>{{ day.summary }}</p>
          <ul>
            <li v-for="key in day.keys" :key="key">{{ key }}</li>
          </ul>
          <div class="ys-day-foot">
            <span>{{ day.distance }}</span>
            <span>{{ day.weather }}</span>
          </div>
        </article>
      </div>

      <div class="ys-solo">
        <div class="ys-solo-head">
          <p class="ys-solo-kicker">SOLO TRIP</p>
          <h3>一个人，也能玩得顺</h3>
        </div>
        <div class="ys-solo-grid">
          <div class="ys-solo-item">
            <b>竹筏</b>
            <p>金龙桥—旧县是双人筏，¥320/筏。一个人可以现场拼筏（等 10–30 分钟，旺季更久），也可以买整筏独享；提前约 12:15 的时段，拼到的概率最高。</p>
          </div>
          <div class="ys-solo-item">
            <b>千里江山</b>
            <p>别一个人包车。西街拼车点约 ¥60/人往返，酒店前台也能帮忙凑人；一个人包车 ¥220–300 不划算。</p>
          </div>
          <div class="ys-solo-item">
            <b>吃饭</b>
            <p>啤酒鱼按斤称，一个人选 1–1.5 斤的剑骨鱼就够；先确认鱼重和单价，别让店家挑 3 斤的。</p>
          </div>
        </div>
      </div>
    </section>

    <section class="ys-map-section" aria-labelledby="map-title">
      <div class="ys-wrap">
        <header class="ys-map-head">
          <div class="ys-sec-head">
            <p class="ys-kicker">02 / ROUTE MAP</p>
            <h2 id="map-title">把距离，画在一张图上</h2>
            <p>
              点地图上的编号看详情；切换 D1 / D2 / D3 只看当天的路线。
              里程是导航参考，电瓶车时间按 15–18km/h 估算，已含拍照和错车。
            </p>
          </div>
          <p class="ys-map-hint">示意图 · 非等比例<br />点击编号查看详情</p>
        </header>

        <div class="ys-map-layout">

          <div class="ys-map-card">
            <div class="ys-map-toolbar">
              <div class="ys-tabs" role="tablist" aria-label="按天筛选路线">
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  type="button"
                  class="ys-tab"
                  :class="{ 'is-active': activeDay === tab.id }"
                  role="tab"
                  :aria-selected="activeDay === tab.id"
                  @click="activeDay = tab.id"
                >
                  {{ tab.label }}
                </button>
              </div>
              <span class="ys-map-toolbar-note">电瓶车时间已标注在路线上</span>
            </div>

            <div ref="mapScrollEl" class="ys-map-scroll">
              <svg
                class="ys-map-svg"
                viewBox="0 0 1200 760"
                role="group"
                aria-label="阳朔三天路线示意图，标注了酒店、西街、遇龙河、十里画廊、千里江山图和阳朔站之间的距离与电瓶车时间"
              >
                <defs>
                  <pattern id="ys-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                    <path d="M48 0H0V48" fill="none" stroke="var(--ys-line)" stroke-width="0.6" />
                  </pattern>
                  <radialGradient id="ys-sun-glow">
                    <stop offset="0%" stop-color="#e6b36f" stop-opacity="0.55" />
                    <stop offset="100%" stop-color="#e6b36f" stop-opacity="0" />
                  </radialGradient>
                  <linearGradient id="ys-river" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#9cc4bc" />
                    <stop offset="100%" stop-color="#5f9a93" />
                  </linearGradient>
                </defs>

                <rect width="1200" height="760" fill="var(--ys-map-paper)" />
                <rect width="1200" height="760" fill="url(#ys-grid)" opacity="0.55" />

                <g class="ys-contours" aria-hidden="true">
                  <path d="M0 180 C 180 140 320 210 500 170 C 680 130 820 190 1000 150 C 1100 128 1160 140 1200 132" />
                  <path d="M0 620 C 180 580 320 650 500 610 C 680 570 820 630 1000 590 C 1100 568 1160 580 1200 572" />
                  <path d="M0 690 C 200 650 360 710 560 678 C 760 646 920 700 1200 650" />
                </g>

                <g class="ys-peaks" aria-hidden="true">
                  <g
                    v-for="(peak, index) in peaks"
                    :key="index"
                    :transform="`translate(${peak.x} ${peak.y}) scale(${peak.s})`"
                    :opacity="peak.o"
                  >
                    <path d="M-30 0 C -22 -18 -12 -38 -4 -52 C 0 -58 4 -58 8 -52 C 16 -38 24 -18 30 0 Z" />
                    <path
                      class="ys-peak-shade"
                      d="M4 -53 C 10 -40 20 -20 30 0 L10 0 C 7 -20 5 -38 4 -53 Z"
                    />
                  </g>
                </g>

                <circle cx="105" cy="145" r="92" fill="url(#ys-sun-glow)" aria-hidden="true" />
                <circle cx="105" cy="145" r="26" fill="#e4ad64" opacity="0.65" aria-hidden="true" />

                <g class="ys-rivers" aria-hidden="true">
                  <path
                    class="ys-river-wide"
                    d="M1100 30 C 1070 90 1035 145 995 185 C 950 230 905 270 855 305 C 795 348 725 372 675 405 C 625 438 592 480 590 530 C 588 592 618 655 660 725"
                  />
                  <path
                    class="ys-river-line"
                    d="M1100 30 C 1070 90 1035 145 995 185 C 950 230 905 270 855 305 C 795 348 725 372 675 405 C 625 438 592 480 590 530 C 588 592 618 655 660 725"
                  />
                  <path
                    class="ys-river-wide"
                    d="M250 235 C 280 295 318 352 358 405 C 398 458 440 505 480 548 C 510 580 545 600 575 612"
                  />
                  <path
                    class="ys-river-line"
                    d="M250 235 C 280 295 318 352 358 405 C 398 458 440 505 480 548 C 510 580 545 600 575 612"
                  />
                </g>

                <g class="ys-roads" aria-hidden="true">
                  <path d="M650 380 C 570 365 490 350 410 340 C 330 330 250 312 170 300" />
                  <path d="M650 350 C 730 318 810 282 890 245 C 950 218 1000 212 1040 220" />
                  <path d="M600 440 C 600 500 610 570 650 645" />
                </g>

                <text class="ys-map-title" x="64" y="72">阳朔 · 骑行路线图</text>
                <text class="ys-map-subtitle" x="64" y="92">YANGSHUO · THREE DAYS BY E-BIKE</text>

                <text class="ys-map-water" x="872" y="330" transform="rotate(-33 872 330)">漓 江</text>
                <text class="ys-map-water" x="402" y="492" transform="rotate(57 402 492)">遇 龙 河</text>
                <text class="ys-map-region" x="130" y="470">喀斯特峰林</text>
                <text class="ys-map-region" x="870" y="90">兴坪 · 漓江</text>

                <g class="ys-routes" aria-hidden="true">
                  <path
                    v-for="route in routes"
                    :key="route.id"
                    class="ys-route"
                    :class="[`is-${route.mode}`, { 'is-dim': isDimRoute(route) }]"
                    :d="route.d"
                  />
                </g>

                <g class="ys-route-labels" aria-hidden="true">
                  <g
                    v-for="route in routes"
                    :key="route.id"
                    class="ys-route-chip"
                    :class="{ 'is-dim': isDimRoute(route) }"
                  >
                    <rect
                      :x="route.label.x - route.label.w / 2"
                      :y="route.label.y - 13"
                      :width="route.label.w"
                      height="26"
                      rx="13"
                    />
                    <text :x="route.label.x" :y="route.label.y + 4" text-anchor="middle">
                      {{ route.label.text }}
                    </text>
                    <line
                      v-if="route.id === 'd2-raft'"
                      class="ys-chip-leader"
                      x1="272"
                      y1="420"
                      x2="336"
                      y2="404"
                    />
                  </g>
                </g>

                <g class="ys-markers">
                  <g
                    v-for="spot in spots"
                    :key="spot.id"
                    class="ys-marker"
                    :class="[
                      `is-${spot.kind}`,
                      { 'is-selected': selectedId === spot.id, 'is-dim': isDimSpot(spot) },
                    ]"
                    :transform="`translate(${spot.x} ${spot.y})`"
                    role="button"
                    tabindex="0"
                    :aria-label="`${spot.name}，距酒店 ${spot.dist}，电瓶车 ${spot.ebike}`"
                    @click="selectSpot(spot.id)"
                    @keydown.enter.prevent="selectSpot(spot.id)"
                    @keydown.space.prevent="selectSpot(spot.id)"
                  >
                    <g class="ys-marker-inner">
                      <circle class="ys-marker-halo" r="30" />
                      <circle v-if="selectedId === spot.id" class="ys-marker-pulse" r="20" />
                      <circle class="ys-marker-ring" :r="spot.id === 'hotel' ? 19 : 16" />
                      <text class="ys-marker-no" y="1" text-anchor="middle" dominant-baseline="middle">
                        {{ spot.id === 'hotel' ? '住' : spot.no }}
                      </text>
                      <g
                        class="ys-marker-label"
                        :transform="`translate(${spot.side === 'left' ? -27 : 27} 0)`"
                        :text-anchor="spot.side === 'left' ? 'end' : 'start'"
                      >
                        <text class="ys-marker-name" y="0">{{ spot.name }}</text>
                        <text class="ys-marker-en" y="14">{{ spot.en }}</text>
                      </g>
                    </g>
                  </g>
                </g>

                <g class="ys-compass" transform="translate(1128 72)" aria-hidden="true">
                  <circle r="22" />
                  <path d="M0 -17 L5 6 L0 2 L-5 6 Z" />
                  <path d="M0 17 L-5 -2 L0 2 L5 -2 Z" class="is-south" />
                  <text y="-28" text-anchor="middle">N</text>
                </g>

                <g class="ys-map-caption" transform="translate(64 716)" aria-hidden="true">
                  <text>示意图 · 非等比例</text>
                  <text y="17">里程为导航参考，骑行时间按 15–18km/h 估算</text>
                </g>
              </svg>
            </div>
            <p class="ys-map-swipe">← 左右滑动查看完整地图 →</p>
          </div>
          <aside class="ys-map-side" aria-label="地点详情">
            <div class="ys-spot-card">
              <div class="ys-spot-head">
                <span class="ys-spot-no">{{ selectedSpot.id === 'hotel' ? '住' : selectedSpot.no }}</span>
                <div>
                  <h3>{{ selectedSpot.name }}</h3>
                  <p class="ys-spot-en">{{ selectedSpot.en }}</p>
                </div>
              </div>
              <p class="ys-spot-desc">{{ selectedSpot.desc }}</p>
              <dl class="ys-spot-dl">
                <div>
                  <dt>距酒店</dt>
                  <dd>{{ selectedSpot.dist }}</dd>
                </div>
                <div>
                  <dt>电瓶车</dt>
                  <dd>{{ selectedSpot.ebike }}</dd>
                </div>
                <div>
                  <dt>汽车</dt>
                  <dd>{{ selectedSpot.car }}</dd>
                </div>
                <div>
                  <dt>门票</dt>
                  <dd>{{ selectedSpot.ticket }}</dd>
                </div>
              </dl>
              <p class="ys-spot-tip">{{ selectedSpot.tip }}</p>
            </div>

            <div class="ys-legend">
              <p class="ys-legend-title">图例</p>
              <div class="ys-legend-row">
                <span class="ys-legend-line is-ebike" />
                <span>电瓶车路线</span>
              </div>
              <div class="ys-legend-row">
                <span class="ys-legend-line is-raft" />
                <span>遇龙河竹筏</span>
              </div>
              <div class="ys-legend-row">
                <span class="ys-legend-line is-car" />
                <span>打车 / 包车</span>
              </div>
              <div class="ys-legend-row">
                <span class="ys-legend-line is-shuttle" />
                <span>景区接驳</span>
              </div>
            </div>
          </aside>
        </div>

        <div class="ys-table-wrap">
          <table class="ys-table">
            <caption class="ys-sr-only">各地点之间的距离、电瓶车时间和汽车时间</caption>
            <thead>
              <tr>
                <th scope="col">路段</th>
                <th scope="col">里程</th>
                <th scope="col">电瓶车</th>
                <th scope="col">汽车 / 竹筏</th>
                <th scope="col">备注</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="leg in legs" :key="`${leg.from}-${leg.to}`">
                <td>{{ leg.from }} → {{ leg.to }}</td>
                <td>{{ leg.km }}</td>
                <td>{{ leg.ebike }}</td>
                <td>{{ leg.car }}</td>
                <td>{{ leg.note }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="ys-table-swipe">← 左右滑动查看完整表格 →</p>
        <div class="ys-ticket-strip">
          <span class="ys-ticket-label">门票速查</span>
          <span v-for="t in tickets" :key="t.name" class="ys-ticket-item">
            <b>{{ t.name }}</b>
            <em>{{ t.price }}</em>
          </span>
        </div>
        <p class="ys-table-note">
          注：里程为高德/百度导航的参考值，实际会因码头、停车场和封路变化；电瓶车时间按 15–18km/h 估算，山区和会车路段会更慢。门票为 2026 年 10 月参考价，以景区当日公告为准。
        </p>
      </div>
    </section>

    <section class="ys-wrap ys-days" aria-labelledby="days-title">
      <header class="ys-sec-head">
        <p class="ys-kicker">03 / DAY BY DAY</p>
        <h2 id="days-title">按这个节奏走</h2>
        <p>时间可以前后浮动半小时，但这几个节点别错过：竹筏的预约时段、15:40 出发去观景台、14:30 的高铁。</p>
      </header>

      <article v-for="day in days" :key="day.id" class="ys-day-block">
        <div class="ys-day-head">
          <div class="ys-day-badge">
            D{{ day.id }}
            <small>{{ day.date }}</small>
          </div>
          <div>
            <h2>{{ day.title }}</h2>
            <p>{{ day.summary }}</p>
          </div>
        </div>

        <div class="ys-timeline">
          <div
            v-for="item in day.items"
            :key="`${day.id}-${item.time}`"
            class="ys-tl-item"
            :class="{ 'is-key': item.key }"
          >
            <time>{{ item.time }}</time>
            <span class="ys-tl-dot" aria-hidden="true" />
            <div class="ys-tl-body">
              <h4>
                {{ item.title }}
                <span v-if="item.tag">{{ item.tag }}</span>
              </h4>
              <p>{{ item.text }}</p>
              <div v-if="item.meta?.length" class="ys-tl-meta">
                <span v-for="m in item.meta" :key="m">{{ m }}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="day.id === 3" class="ys-route-note">
          <b>如果千里江山和兴坪都不想放弃</b>
          <p>相公山只能放周日：10:40 打车去相公山（28km/45min）→ 11:30 上山 → 12:10 下山去兴坪（15km/25min）→ 12:35 看 20 元背景 → 13:10 去站。没有午饭时间，兴坪只能看一眼；不推荐硬塞。</p>
        </div>

        <div v-if="day.callout" class="ys-callout">
          <p class="ys-callout-kicker">{{ day.callout.kicker }}</p>
          <h4>{{ day.callout.title }}</h4>
          <p class="ys-callout-body">{{ day.callout.body }}</p>
          <div class="ys-options">
            <div
              v-for="option in day.callout.options"
              :key="option.title"
              class="ys-option"
              :class="{ 'is-best': option.best }"
            >
              <b>{{ option.title }}</b>
              <span>{{ option.meta }}</span>
              <p>{{ option.text }}</p>
            </div>
          </div>
          <p class="ys-route-note">
            <b>相公山怎么加？</b>它在兴坪（东岸），千里江山在葡萄镇（西侧），两地车程 1h10–1h20。坐完船 14:00 出发，先相公山再千里江山，到观景台已经 17:20 以后，正好撞晚高峰。二选一：周六 15:40 直接去千里江山；或者周六去相公山、把千里江山让给下次，周日仍去兴坪。
          </p>
        </div>

        <p class="ys-day-tip">
          <b>当天提醒</b>
          {{ day.tip }}
        </p>
      </article>
    </section>

    <section class="ys-wrap ys-section" aria-labelledby="book-title">
      <header class="ys-sec-head">
        <p class="ys-kicker">04 / BOOK AHEAD</p>
        <h2 id="book-title">这三件事，提前订</h2>
        <p>竹筏和千里江山拼车是唯一需要卡时间的；其余都可以到了再说。</p>
      </header>

      <div class="ys-book-grid">
        <article v-for="book in bookings" :key="book.title" class="ys-book-card">
          <span class="ys-book-tag">{{ book.tag }}</span>
          <h3>{{ book.title }}</h3>
          <p>{{ book.body }}</p>
          <dl class="ys-book-dl">
            <div>
              <dt>价格</dt>
              <dd>{{ book.price }}</dd>
            </div>
            <div>
              <dt>怎么订</dt>
              <dd>{{ book.how }}</dd>
            </div>
          </dl>
          <p class="ys-book-note">{{ book.note }}</p>
        </article>
      </div>
    </section>

    <section class="ys-wrap ys-section" aria-labelledby="food-title">
      <header class="ys-sec-head">
        <p class="ys-kicker">05 / EAT LIKE A LOCAL</p>
        <h2 id="food-title">在阳朔，吃这四样</h2>
        <p>啤酒鱼是头牌，但别在正街拉客店吃。往巷子里走两步，价格和味道都会正常很多。一个人点 1–1.5 斤的剑骨鱼就够。</p>
      </header>

      <div class="ys-food-grid">
        <article v-for="food in foods" :key="food.name" class="ys-food-card">
          <p class="ys-food-en">{{ food.en }}</p>
          <h3>{{ food.name }}</h3>
          <p class="ys-food-desc">{{ food.desc }}</p>
          <div class="ys-food-meta">
            <span>{{ food.where }}</span>
            <span>{{ food.price }}</span>
          </div>
        </article>
      </div>
    </section>

    <section class="ys-wrap ys-section" aria-labelledby="check-title">
      <header class="ys-sec-head">
        <p class="ys-kicker">06 / BEFORE YOU GO</p>
        <h2 id="check-title">出发前，对一遍</h2>
        <p>都是小事，但少一样就会在路上添堵。</p>
      </header>

      <div class="ys-check-grid">
        <div class="ys-check-col">
          <h3>必带</h3>
          <ul>
            <li v-for="item in packList" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div class="ys-check-col">
          <h3>必做</h3>
          <ul>
            <li v-for="item in todoList" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div class="ys-check-col is-avoid">
          <h3>别做</h3>
          <ul>
            <li v-for="item in avoidList" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </section>

    <footer class="ys-wrap ys-foot">
      <div>
        <p class="ys-foot-title">阳朔 · 三天两夜</p>
        <p>写于 2026.10.22 · 门票为 2026 年 10 月参考价</p>
      </div>
      <p>竹筏班次、演出时间、景区开放情况以官方当日公告为准；天气为出发前预报，出发前再看一次。<br />祝你看到一场好日落。</p>
    </footer>
  </div>
</template>
