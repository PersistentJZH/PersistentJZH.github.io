export interface NoteTopicDefinition {
  id: string
  title: string
  description: string
}

export interface NoteArticle {
  title: string
  path: string
  date: string
  topicId: string
  topicTitle: string
}

export interface NoteTopic extends NoteTopicDefinition {
  link: string
  count: number
  articles: NoteArticle[]
}

export interface NotesCollection {
  topics: NoteTopic[]
  articles: NoteArticle[]
}

export type NotesIndex = Record<'zh' | 'en', NotesCollection>
