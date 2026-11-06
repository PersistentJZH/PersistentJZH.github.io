import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { englishDirectories, englishTitles } from '../../scripts/locale-labels.mjs'

interface SidebarItem {
  text: string
  link?: string
  items?: SidebarItem[]
  collapsed?: boolean
}

const notesRoot = fileURLToPath(new URL('../notes/', import.meta.url))
const englishNotesRoot = fileURLToPath(new URL('../en/notes/', import.meta.url))

function scalar(source: string, field: string): string {
  const value = source.split('\n---')[0].match(new RegExp(`^${field}: (.+)$`, 'm'))?.[1] ?? ''
  if (value.startsWith('"')) return JSON.parse(value)
  return value.replace(/^'(.*)'$/, '$1').replaceAll("''", "'")
}

/** Follow the source directory order while giving English sidebar groups English labels. */
export function englishSidebar(topic: string): SidebarItem[] {
  function walk(directory: string): SidebarItem[] {
    return readdirSync(directory, { withFileTypes: true })
      .filter(entry => !entry.name.startsWith('.') && (entry.isDirectory() || entry.name.endsWith('.md')))
      .sort((a, b) => {
        const order = (name: string) => Number(name.match(/^(\d+)\./)?.[1] ?? Number.MAX_SAFE_INTEGER)
        return order(a.name) - order(b.name) || a.name.localeCompare(b.name, 'en', { numeric: true })
      })
      .flatMap((entry): SidebarItem[] => {
        const filename = join(directory, entry.name)
        if (entry.isDirectory()) {
          const items = walk(filename)
          const text = (englishDirectories[entry.name] ?? entry.name).replace(/^\d+\.\s*/, '')
          return items.length ? [{ text, items, collapsed: false }] : []
        }
        if (/^(README|index)\.md$/i.test(entry.name)) return []
        const source = readFileSync(filename, 'utf8')
        const title = scalar(source, 'title')
        const permalink = scalar(source, 'permalink')
        const translation = join(englishNotesRoot, relative(notesRoot, filename))
        const englishTitle = existsSync(translation) ? scalar(readFileSync(translation, 'utf8'), 'title') : ''
        return permalink ? [{ text: englishTitle || englishTitles[title] || title, link: `/en${permalink}` }] : []
      })
  }
  return walk(join(notesRoot, topic))
}
