import { computed } from 'vue'
import { useData } from 'vuepress-theme-plume/client'

/** Translate presentation text while sharing routes, geometry, photos, and itinerary data. */
export function useTravelLocale(english: Record<string, string>) {
  const { lang } = useData()
  const isEnglish = computed(() => lang.value.startsWith('en'))

  function t<T>(value: T): T {
    if (!isEnglish.value || typeof value !== 'string') return value
    const translated = english[value.trim().replace(/\s+/g, ' ')]
    if (!translated) return value
    const leading = value.match(/^\s*/)?.[0] ?? ''
    const trailing = value.match(/\s*$/)?.[0] ?? ''
    return `${leading}${translated}${trailing}` as T
  }

  function link(path: string): string {
    return isEnglish.value ? `/en${path}` : path
  }

  return { isEnglish, t, link }
}
