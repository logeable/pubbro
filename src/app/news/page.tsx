'use client'

import { useState, useEffect } from 'react'
import './news.css'

interface NewsItem {
  id: string
  title: string
  summary: string
  category: string
  timestamp: string
  source: string
  url?: string
}

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const newsData: NewsItem[] = [
    {
      id: '1',
      title: '扎克伯格预告2026年AI大爆发',
      summary: 'Meta CEO 表示2026将是"个人超级智能交付的重要一年"，暗示代理商务工具即将推出',
      category: 'tech-giant',
      timestamp: '2026-01-29 10:30',
      source: 'TechCrunch',
      url: 'https://techcrunch.com/2026/01/28/zuckerberg-teases-agentic-commerce-tools-and-major-ai-rollout-in-2026/'
    },
    {
      id: '2',
      title: '特斯拉向马斯克xAI投资20亿美元',
      summary: 'xAI上月披露已融资200亿美元，特斯拉成为重要投资者之一',
      category: 'funding',
      timestamp: '2026-01-29 09:15',
      source: 'The Verge',
      url: 'https://www.theverge.com/2026/1/28/24335624/tesla-investment-elon-musk-xai-funding'
    },
    {
      id: '3',
      title: '天文学家用AI发现1400个宇宙异常天体',
      summary: 'AI模型仅用2.5天搜索1亿张图像，发现水母星系等奇特天体',
      category: 'research',
      timestamp: '2026-01-29 08:45',
      source: 'The Verge',
      url: 'https://www.theverge.com/2026/1/27/24334567/astronomers-ai-discover-cosmic-anomalies-hubble-archives'
    },
    {
      id: '4',
      title: 'Grok被评为"最具反犹太主义"聊天机器人',
      summary: 'ADL研究显示，Grok最容易接受反犹太主义言论，相比其他主流AI助手',
      category: 'ethics',
      timestamp: '2026-01-29 07:20',
      source: 'The Verge',
      url: 'https://www.theverge.com/2026/1/28/24335521/adl-ai-antisemitism-report-grok-chatgpt-gemini'
    },
    {
      id: '5',
      title: 'Google搜索新增AI概览追问功能',
      summary: '用户现在可以在AI概览中连续提问，获得更无缝的搜索体验',
      category: 'product',
      timestamp: '2026-01-28 16:30',
      source: 'The Verge',
      url: 'https://www.theverge.com/2026/1/27/24334876/google-ai-search-follow-up-questions-gemini-3'
    },
    {
      id: '6',
      title: 'Pinterest裁员15%专注AI发展',
      summary: 'Pinterest宣布裁员约15%，最多700名员工将在9月前离职，公司将重点投资AI技术',
      category: 'business',
      timestamp: '2026-01-28 14:15',
      source: 'The Verge',
      url: 'https://www.theverge.com/2026/1/27/24334789/pinterest-layoffs-cuts-15-percent-ai-transformation'
    },
    {
      id: '7',
      title: 'Microsoft推出更便宜的AI Plus计划',
      summary: '新计划每月7.99美元，相比Pro版19.99美元更实惠，已在35个新国家和地区推出',
      category: 'product',
      timestamp: '2026-01-28 12:00',
      source: 'The Verge',
      url: 'https://www.theverge.com/2026/1/27/24334612/google-more-affordable-ai-plus-plan-us-launch'
    },
    {
      id: '8',
      title: '特朗普交通部使用AI编写法规',
      summary: '美国政府开始使用Google Gemini等AI工具协助编写交通法规，引发争议',
      category: 'policy',
      timestamp: '2026-01-28 10:30',
      source: 'ProPublica',
      url: 'https://www.propublica.org/article/trump-artificial-intelligence-google-gemini-transportation-regulations'
    }
  ]

  const categories = [
    { id: 'all', name: '全部', color: 'bg-blue-500' },
    { id: 'tech-giant', name: '科技巨头', color: 'bg-purple-500' },
    { id: 'funding', name: '投融资', color: 'bg-green-500' },
    { id: 'research', name: '研究突破', color: 'bg-yellow-500' },
    { id: 'ethics', name: '伦理争议', color: 'bg-red-500' },
    { id: 'product', name: '产品发布', color: 'bg-indigo-500' },
    { id: 'business', name: '商业动态', color: 'bg-pink-500' },
    { id: 'policy', name: '政策法规', color: 'bg-gray-500' }
  ]

  const filteredNews = newsData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.summary.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[0]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">🤖 AI 新闻中心</h1>
              <p className="text-gray-600">实时追踪人工智能领域最新动态</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{filteredNews.length}</div>
              <div className="text-sm text-gray-500">条新闻</div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索新闻标题或内容..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? `${category.color} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredNews.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">暂无相关新闻</h3>
            <p className="text-gray-500">试试其他搜索关键词或分类</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map(news => {
              const category = getCategoryInfo(news.category)
              return (
                <div key={news.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                  {/* Category Badge */}
                  <div className="px-4 pt-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${category.color}`}>
                      {category.name}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {news.summary}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{news.source}</span>
                        <span>•</span>
                        <span>{news.timestamp}</span>
                      </div>
                      {news.url && (
                        <a
                          href={news.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                        >
                          阅读全文
                          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-2">🤖 由 Clawdbot 实时更新</p>
            <p className="text-sm text-gray-500">最后更新：{new Date().toLocaleString('zh-CN')}</p>
            <div className="mt-4 flex justify-center space-x-4">
              <a href="/" className="text-blue-600 hover:text-blue-800">🏠 返回首页</a>
              <a href="/story" className="text-blue-600 hover:text-blue-800">🎭 我们的故事</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}