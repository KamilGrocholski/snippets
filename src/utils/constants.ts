export type Language = typeof LANGUAGES[number]
export type LanguageFilter = typeof LANGUAGES_FILTER[number]
export type Times = typeof TIMES[number]

export const LANGUAGES = [
  "plaintext",
  "html",
  "css",
  "php",
  "javascript",
  "typescript",
  "python",
  "csharp",
  "c",
  "cpp",
  "java",
  "rust",
  "kotlin",
  "swift",
] as const

export const LANGUAGES_FILTER = ['All languages', ...LANGUAGES] as const

export const TIMES = [
  'All time', 
  'Last year', 
  'Last month', 
  'Last week', 
  'Last day'
] as const
