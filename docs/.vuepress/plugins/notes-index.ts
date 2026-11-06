import type { App, Page, Plugin } from 'vuepress/core'
import { noteTopics } from '../../notes/data/topics'
import type { NoteArticle, NotesIndex } from '../../notes/data/types'

function noteDate(value: unknown): string {
  if (typeof value !== 'string') return ''
  const match = /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})/.exec(value)
  if (!match) return ''
  return `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`
}

function hasBody(content: string): boolean {
  return Boolean(content
    .replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/^\s*#{1,6}\s+.*$/gm, '')
    .trim())
}

/** 使用 VuePress 实际生成的页面路径，避免重复维护文章清单或猜测 URL。 */
export function collectNotesIndex(pages: Page[]): NotesIndex {
  const index: NotesIndex = { zh: { topics: [], articles: [] }, en: { topics: [], articles: [] } }
  for (const locale of ['zh', 'en'] as const) {
    const root = locale === 'zh' ? 'notes/' : 'en/notes/'
    for (const definition of noteTopics[locale]) {
      const sourceDir = `${root}${definition.id}/`
      const articles: NoteArticle[] = pages
        .filter((page) => {
          const file = page.filePathRelative?.replaceAll('\\', '/')
          return file?.startsWith(sourceDir)
            && file.endsWith('.md')
            && !/(?:^|\/)(?:README|index)\.md$/i.test(file)
            && !page.frontmatter.draft
            && !page.frontmatter.home
            && hasBody(page.content)
        })
        .map((page) => ({
          title: String(page.frontmatter.title || page.title),
          path: page.path,
          date: noteDate(page.frontmatter.createTime),
          topicId: definition.id,
          topicTitle: definition.title,
        }))
        .sort((a, b) => b.date.localeCompare(a.date) || a.path.localeCompare(b.path))
      index[locale].topics.push({ ...definition, link: `/${sourceDir}`, count: articles.length, articles })
      index[locale].articles.push(...articles)
    }
    index[locale].articles.sort((a, b) => b.date.localeCompare(a.date) || a.path.localeCompare(b.path))
  }
  return index
}

export function notesIndexPlugin(): Plugin {
  let previousSource = ''
  async function prepare(app: App): Promise<void> {
    const source = `export const notesIndex = ${JSON.stringify(collectNotesIndex(app.pages))}\n`
    if (source === previousSource) return
    await app.writeTemp('notes-index.js', source)
    previousSource = source
  }
  return {
    name: 'notes-index',
    onPrepared: prepare,
    onPageUpdated: (app, ..._change) => prepare(app),
  }
}
