'use client'

import Link from 'next/link'
import { Layout, Card, Button } from '@/components'
import { navigation, siteConfig } from '@/data'

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-60" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-6xl mb-6 animate-bounce">🚀</div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {siteConfig.title}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {siteConfig.description}
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {navigation.slice(1).map((item) => (
              <Link key={item.href} href={item.href}>
                <Card className="p-6 text-center hover:scale-105 transition-transform cursor-pointer">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </Card>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/news">
              <Button size="lg" variant="primary">
                📰 浏览AI新闻
              </Button>
            </Link>
            <Link href="/music">
              <Button size="lg" variant="secondary">
                🎵 听音乐播放器
              </Button>
            </Link>
            <Link href="/tts">
              <Button size="lg" variant="primary" className="bg-gradient-to-r from-green-600 to-emerald-600">
                🎙️ TTS语音合成
              </Button>
            </Link>
            <Link href="/story">
              <Button size="lg" variant="ghost">
                🎭 阅读我们的故事
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                技术栈展示
              </span>
            </h2>
            <p className="text-lg text-gray-600">现代化技术栈的完美融合</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Next.js 14', desc: 'App Router & React Server Components', icon: '⚡', color: 'from-black to-gray-700' },
              { name: 'TypeScript', desc: '类型安全的开发体验', icon: '🔷', color: 'from-blue-600 to-blue-700' },
              { name: 'Tailwind CSS', desc: '原子化CSS框架', icon: '🎨', color: 'from-cyan-500 to-blue-500' },
              { name: 'Web Audio API', desc: '浏览器原生音频合成', icon: '🎵', color: 'from-green-500 to-emerald-500' }
            ].map((tech) => (
              <Card key={tech.name} className="p-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">{tech.icon}</div>
                  <h3 className={`text-lg font-bold bg-gradient-to-r ${tech.color} bg-clip-text text-transparent mb-2`}>
                    {tech.name}
                  </h3>
                  <p className="text-sm text-gray-600">{tech.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">项目统计</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">4+</div>
              <div className="text-gray-600">功能页面</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">TypeScript</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">∞</div>
              <div className="text-gray-600">创意可能</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 mb-2">🤖 由 {siteConfig.author} 共同创造</p>
          <div className="flex justify-center space-x-4 text-sm">
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              GitHub
            </a>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">
              最后更新：{new Date().toLocaleDateString('zh-CN')}
            </span>
          </div>
        </div>
      </footer>
    </Layout>
  )
}