// 全局类型定义

export interface NewsItem {
  id: string
  title: string
  summary: string
  category: string
  timestamp: string
  source: string
  url?: string
  imageUrl?: string
}

export interface StoryChapter {
  id: number
  title: string
  subtitle: string
  content: string
  mood: string
  icon: string
  color: string
}

export interface MusicTrack {
  id: number
  name: string
  notes: string[]
  rhythm: number[]
}

export interface SiteConfig {
  title: string
  description: string
  url: string
  author: string
  github: string
}

export interface NavItem {
  name: string
  href: string
  icon: string
  description: string
}

export type Category = {
  id: string
  name: string
  color: string
}

export type Theme = 'light' | 'dark'

export interface UIState {
  theme: Theme
  isLoading: boolean
  error: string | null
}