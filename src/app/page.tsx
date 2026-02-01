'use client'

import Link from 'next/link'
import { Layout, Button, Card } from '@/components'

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section - 现代渐变背景 */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 动态背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          {/* 动态光效 */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        {/* 内容区域 */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* 主标题 - 现代字体层级 */}
          <div className="mb-8">
            <div className="text-8xl mb-6 animate-bounce bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              🚀
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                PubBro
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl text-blue-100/90 mb-4 font-light leading-relaxed">
                探索AI技术的无限可能
              </p>
              <p className="text-lg text-blue-200/80 mb-8 font-light">
                多媒体体验平台 · 语音合成 · 音乐播放 · 智能新闻 · 互动游戏
              </p>
            </div>
          </div>

          {/* CTA按钮组 - 现代按钮设计 */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Link href="/news">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                <span className="mr-3 text-2xl">📰</span>
                AI新闻中心
              </Button>
            </Link>
            <Link href="/snake">
              <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105">
                <span className="mr-3 text-2xl">🚄</span>
                高铁贪吃蛇
              </Button>
            </Link>
            <Link href="/music">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                <span className="mr-3 text-2xl">🎵</span>
                音乐播放器
              </Button>
            </Link>
            <Link href="/tts">
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105">
                <span className="mr-3 text-2xl">🎙️</span>
                TTS语音合成
              </Button>
            </Link>
            <Link href="/story">
              <Button size="lg" variant="ghost" className="border-2 border-white/20 text-white/90 hover:text-white hover:bg-white/10 px-8 py-4 rounded-2xl font-semibold text-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-105">
                <span className="mr-3 text-2xl">🎭</span>
                我们的故事
              </Button>
            </Link>
          </div>

          {/* 特性展示 - 现代卡片设计 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">🤖</div>
              <h3 className="text-xl font-bold text-white mb-3">AI驱动</h3>
              <p className="text-blue-200/80 text-sm leading-relaxed">最新AI技术，智能交互体验</p>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">🎨</div>
              <h3 className="text-xl font-bold text-white mb-3">精美设计</h3>
              <p className="text-blue-200/80 text-sm leading-relaxed">现代化界面，流畅用户体验</p>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">📱</div>
              <h3 className="text-xl font-bold text-white mb-3">移动优先</h3>
              <p className="text-blue-200/80 text-sm leading-relaxed">完美适配，随时随地体验</p>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">⚡</div>
              <h3 className="text-xl font-bold text-white mb-3">极速响应</h3>
              <p className="text-blue-200/80 text-sm leading-relaxed">毫秒级响应，丝滑流畅</p>
            </div>
          </div>
        </div>

        {/* 滚动指示器 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* 技术栈展示 - 现代展示设计 */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              技术栈展示
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              基于最新的Web技术栈，提供卓越的用户体验
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              { name: 'Next.js', icon: '⚡', color: 'from-black to-gray-600' },
              { name: 'React', icon: '⚛️', color: 'from-cyan-400 to-blue-500' },
              { name: 'TypeScript', icon: '📘', color: 'from-blue-500 to-blue-700' },
              { name: 'Tailwind', icon: '🎨', color: 'from-cyan-400 to-teal-500' },
              { name: 'Web Audio', icon: '🎵', color: 'from-purple-500 to-pink-500' },
              { name: 'TTS API', icon: '🗣️', color: 'from-green-500 to-emerald-600' }
            ].map((tech) => (
              <div key={tech.name} className="group text-center">
                <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${tech.color} rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                  {tech.icon}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{tech.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 统计数据 - 现代数据展示 */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">5</div>
              <div className="text-blue-100 font-medium">核心功能</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">∞</div>
              <div className="text-blue-100 font-medium">创意可能</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">100%</div>
              <div className="text-blue-100 font-medium">响应式</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">24/7</div>
              <div className="text-blue-100 font-medium">在线服务</div>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 - 现代页脚设计 */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-6xl mb-6">🚀</div>
            <h3 className="text-3xl font-bold mb-4">准备好开始了吗？</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              探索AI技术的无限可能，体验多媒体交互的魅力
            </p>
            <Link href="/news">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                立即开始探索
              </Button>
            </Link>
          </div>
          
          <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 PubBro. 用❤️和AI技术构建</p>
          </div>
        </div>
      </footer>
    </Layout>
  )
}