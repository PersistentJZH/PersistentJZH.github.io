import { createHash } from 'node:crypto'
import { readdir, readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { englishTags } from './locale-labels.mjs'

const defaultDocsDirectory = fileURLToPath(new URL('../docs/', import.meta.url))
const articleRoots = ['blog/', 'notes/', 'travel/guides/']

// Travel prose also lives in shared Vue components and city/photo data.
export const travelTranslationSources = {
  'en/travel/README.md': ['travel/README.md', 'travel/data', '.vuepress/theme/components/travel/TravelMap.vue'],
  'en/travel/guides/yangshuo.md': ['.vuepress/theme/components/travel/YangshuoGuide.vue'],
}

export async function translationDependencyHash(docsDirectory, sources) {
  const hash = createHash('sha256')
  async function include(relative) {
    const filename = path.join(docsDirectory, relative)
    if ((await stat(filename)).isDirectory()) {
      for (const name of (await readdir(filename)).sort()) await include(`${relative}/${name}`)
    }
    else {
      hash.update(`${relative}\0`)
      hash.update((await readFile(filename, 'utf8')).replace(/\r\n?/g, '\n'))
      hash.update('\0')
    }
  }
  for (const source of [...sources].sort()) await include(source)
  return hash.digest('hex')
}

async function markdownFiles(directory) {
  const files = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    const filename = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await markdownFiles(filename))
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(filename)
  }
  return files.sort()
}

// Only read the top-level scalar fields used by this check. Article bodies and
// nested YAML remain untouched; this command never writes source files.
function scalar(frontmatter, key) {
  const value = frontmatter.match(new RegExp(`^${key}:[ \\t]*(.*?)[ \\t]*$`, 'm'))?.[1]
  if (value === undefined) return undefined
  if (value.startsWith('"')) {
    const quoted = value.match(/^"(?:[^"\\]|\\.)*"/)?.[0]
    if (quoted) return JSON.parse(quoted)
  }
  if (value.startsWith("'")) {
    const quoted = value.match(/^'(?:[^']|'')*'/)?.[0]
    if (quoted) return quoted.slice(1, -1).replaceAll("''", "'")
  }
  return value.replace(/\s+#.*$/, '').trim()
}

function normalizeRoute(route) {
  if (!route) return undefined
  try {
    return decodeURI(route).replace(/\/{2,}/g, '/').replace(/\/$/, '') || '/'
  }
  catch {
    return route
  }
}

function tags(frontmatter) {
  const value = scalar(frontmatter, 'tags')
  if (value === undefined) return []
  const unquote = value => value.trim().replace(/^(['"])(.*)\1$/, '$2')
  if (value.startsWith('[')) return value.slice(1, -1).split(',').filter(Boolean).map(unquote)
  const list = frontmatter.match(/^tags:[ \t]*\n((?:[ \t]+- .*(?:\n|$))*)/m)?.[1] || ''
  return [...list.matchAll(/^[ \t]+- (.*)$/gm)].map(match => unquote(match[1]))
}

function normalizeDate(value) {
  if (!value) return ''
  const date = value.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/)
  if (!date) return value
  return date.slice(1).map((part, index) => (part || '0').padStart(index === 0 ? 4 : 2, '0')).join('-')
}

function bodyStats(body) {
  let openFence
  let fences = 0
  const prose = []
  for (const line of body.replace(/<!--[\s\S]*?-->/g, '').split('\n')) {
    const marker = line.replace(/^\s*(?:>\s*)*/, '').match(/^(`{3,}|~{3,})(.*)$/)
    if (marker) {
      if (!openFence) {
        openFence = marker[1]
        fences++
      }
      else if (marker[1][0] === openFence[0] && marker[1].length >= openFence.length && !marker[2].trim()) {
        openFence = undefined
      }
    }
    else if (!openFence) prose.push(line)
  }
  const content = prose.join('\n')
  const languageContent = content.replace(/`[^`]*`/g, '').replace(/https?:\/\/\S+/g, '')
  const hanCharacters = (languageContent.match(/\p{Script=Han}/gu) || []).length
  const letters = (languageContent.match(/\p{Letter}/gu) || []).length
  // A few quoted UI labels or proper names are valid in an English article.
  // Catch both untranslated paragraphs and Chinese spread across the body.
  const chineseParagraph = languageContent.split('\n').some((line) => {
    const han = (line.match(/\p{Script=Han}/gu) || []).length
    return han >= 30 && han / Math.max(1, (line.match(/\p{Letter}/gu) || []).length) >= 0.25
  })
  return {
    headings: (content.match(/^\s{0,3}#{1,6}\s+/gm) || []).length,
    fences,
    images: (content.match(/!\[[^\]]*\](?:\(|\[)|<img\b/gi) || []).length,
    hasBody: Boolean(body.replace(/<!--[\s\S]*?-->/g, '').replace(/^\s*#{1,6}\s+.*$/gm, '').trim()),
    hanCharacters,
    significantChineseProse: chineseParagraph || (hanCharacters >= 60 && hanCharacters / Math.max(1, letters) >= 0.02),
    unclosedFence: Boolean(openFence),
  }
}

export async function checkLocales(docsDirectory = defaultDocsDirectory) {
  const errors = []
  const warnings = []
  const pages = []
  for (const filename of await markdownFiles(docsDirectory)) {
    const source = (await readFile(filename, 'utf8')).replace(/\r\n?/g, '\n')
    const match = source.match(/^\uFEFF?---\n([\s\S]*?)\n---(?:\n|$)/)
    const frontmatter = match?.[1] || ''
    const file = path.relative(docsDirectory, filename).split(path.sep).join('/')
    try {
      pages.push({
        file,
        source,
        title: scalar(frontmatter, 'title') || '',
        tags: tags(frontmatter),
        route: normalizeRoute(scalar(frontmatter, 'permalink')),
        date: normalizeDate(scalar(frontmatter, 'createTime') || scalar(frontmatter, 'date')),
        cover: scalar(frontmatter, 'cover') || '',
        sourceHash: scalar(frontmatter, 'sourceHash') || scalar(frontmatter, 'translationSourceHash') || scalar(frontmatter, 'source_hash'),
        sourceDependenciesHash: scalar(frontmatter, 'sourceDependenciesHash'),
        stats: bodyStats(source.slice(match?.[0].length || 0)),
      })
    }
    catch (error) {
      errors.push(`${file}: cannot read frontmatter scalars (${error.message})`)
    }
  }

  const byRoute = new Map()
  for (const page of pages) {
    if (!page.route) continue
    const previous = byRoute.get(page.route)
    if (previous) errors.push(`Duplicate permalink ${page.route}: ${previous.file}, ${page.file}`)
    else byRoute.set(page.route, page)
  }

  for (const [file, sources] of Object.entries(travelTranslationSources)) {
    const page = pages.find(page => page.file === file)
    if (page && page.sourceDependenciesHash !== await translationDependencyHash(docsDirectory, sources)) {
      errors.push(`${file}: shared travel content changed; synchronize its English copy and sourceDependenciesHash`)
    }
  }

  const originals = pages.filter(page => articleRoots.some(root => page.file.startsWith(root)) && !/(?:^|\/)(?:README|index)\.md$/i.test(page.file))
  const counts = Object.fromEntries(articleRoots.map(root => [root, { source: 0, translated: 0 }]))
  const chineseBodyFiles = []
  let translated = 0
  let hashed = 0
  for (const original of originals) {
    const group = counts[articleRoots.find(root => original.file.startsWith(root))]
    group.source++
    if (!original.route || !original.route.startsWith('/')) {
      errors.push(`${original.file}: missing or invalid source permalink`)
      continue
    }
    const expectedRoute = `/en${original.route}`
    const english = byRoute.get(expectedRoute)
    if (!english || !english.file.startsWith('en/')) {
      errors.push(`Missing English article ${expectedRoute} (source: ${original.file})`)
      continue
    }
    translated++
    group.translated++
    if (english.date !== original.date) errors.push(`${english.file}: date differs from ${original.file}`)
    if (english.cover !== original.cover) errors.push(`${english.file}: cover differs from ${original.file}`)
    if (!english.title.trim()) errors.push(`${english.file}: missing English title`)
    else if (/\p{Script=Han}/u.test(english.title)) errors.push(`${english.file}: title has not been translated into English`)
    const expectedTags = original.tags.map(tag => englishTags[tag] ?? tag)
    if (JSON.stringify(english.tags) !== JSON.stringify(expectedTags)) {
      errors.push(`${english.file}: tags differ from the translated source tags (${expectedTags.join(', ')})`)
    }
    if (!english.stats.hasBody) errors.push(`${english.file}: English article has no body`)
    if (english.stats.significantChineseProse) errors.push(`${english.file}: substantial Chinese prose remains outside code blocks; finish the English translation`)
    if (english.stats.unclosedFence && !original.stats.unclosedFence) errors.push(`${english.file}: unclosed code fence`)

    if (english.sourceHash) {
      hashed++
      const expectedHash = createHash('sha256').update(original.source).digest('hex')
      const actualHash = english.sourceHash.replace(/^sha256:/, '').toLowerCase()
      if (!/^[a-f\d]{64}$/.test(actualHash)) errors.push(`${english.file}: sourceHash must be a SHA-256 hex digest`)
      else if (actualHash !== expectedHash) errors.push(`Stale English article ${english.file}: sourceHash no longer matches ${original.file}`)
    }
    else errors.push(`${english.file}: missing sourceHash for translation freshness checks`)

    // These are complete translations of the same article structure, including
    // examples and illustrations, rather than shorter English summaries.
    for (const field of ['headings', 'fences', 'images']) {
      const sourceCount = original.stats[field]
      const translatedCount = english.stats[field]
      if (sourceCount !== translatedCount) {
        errors.push(`${english.file}: ${field} count differs (${translatedCount}; source ${sourceCount}); review completeness`)
      }
    }
    if (english.stats.hanCharacters) chineseBodyFiles.push({ file: english.file, characters: english.stats.hanCharacters })
  }

  return { sourceArticles: originals.length, englishArticles: translated, counts, hashedArticles: hashed, chineseBodyFiles, errors, warnings }
}

async function main() {
  const result = await checkLocales()
  for (const [root, count] of Object.entries(result.counts)) console.log(`${root}: ${count.translated}/${count.source} English articles`)
  console.log(`Coverage: ${result.englishArticles}/${result.sourceArticles}; source hashes checked: ${result.hashedArticles}`)
  if (result.chineseBodyFiles.length) {
    console.log(`INFO: ${result.chineseBodyFiles.length} English articles contain Chinese text outside code blocks; this is not a translation-quality check.`)
    if (process.argv.includes('--verbose')) {
      for (const { file, characters } of result.chineseBodyFiles) console.log(`  ${file}: ${characters} Han characters`)
    }
  }
  for (const warning of result.warnings) console.warn(`WARN: ${warning}`)
  for (const error of result.errors) console.error(`ERROR: ${error}`)
  console.log(`${result.errors.length ? 'FAILED' : 'PASSED'}: ${result.errors.length} error(s), ${result.warnings.length} warning(s)`)
  if (result.errors.length) process.exitCode = 1
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
}
