'use client'

import { useState, useMemo } from 'react'
import { Layout, Card, Button } from '@/components'
import { newsData, categories } from '@/data'
import './news.css'

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // 过滤和搜索逻辑
  const filteredNews = useMemo(() => {
    return newsData.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
      const matchesSearch = searchTerm === '' || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchTerm])

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || categories[0]
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🤖</div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                AI 新闻中心
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                实时追踪人工智能领域最新动态，为您精选最有价值的AI资讯
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-6 max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索新闻标题或内容..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
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

            {/* Results Count */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                找到 {filteredNews.length} 条新闻
                {selectedCategory !== 'all' && ` • ${categories.find(c => c.id === selectedCategory)?.name}`}
                {searchTerm && ` • 搜索: "${searchTerm}"`}
              </p>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 empty-state">📰</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">暂无相关新闻</h3>
              <p className="text-gray-500">试试其他搜索关键词或分类</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((news) => {
                const category = getCategoryInfo(news.category)
                return (
                  <Card key={news.id} className="overflow-hidden hover:scale-105 transition-transform news-card">
                    {/* Category Badge */}
                    <div className="p-4 pb-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${category.color}`}>
                        {category.name}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4 pt-2">
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
                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center news-link"
                          >
                            阅读全文
                            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 py-8 text-center">
            <p className="text-gray-600 mb-2">🤖 由 Clawdbot 实时更新</p>
            <p className="text-sm text-gray-500">
              最后更新：{new Date().toLocaleString('zh-CN')}
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <a href="/" className="text-blue-600 hover:text-blue-800">🏠 返回首页</a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}