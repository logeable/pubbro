import Image from 'next/image'
import Link from 'next/link'
import './globals.css'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
          Welcome to PubBro! 🎉
        </h1>
        
        <p className="text-2xl text-gray-700 mb-12">
          Next.js + TypeScript + Tailwind CSS + pnpm
        </p>

        {/* 新增故事入口 */}
        <div className="mb-12">
          <Link 
            href="/story"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl mr-4 mb-4"
          >
            🎭 阅读我们的史诗故事
          </Link>
          <Link 
            href="/news"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xl font-semibold rounded-full hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl mr-4 mb-4"
          >
            📰 AI 新闻中心
          </Link>
          <Link 
            href="/music"
            className="inline-block px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xl font-semibold rounded-full hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl mb-4"
          >
            🎵 欢乐音乐播放器
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="group rounded-lg border border-blue-200 px-5 py-4 transition-colors hover:border-blue-300 hover:bg-blue-50">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              Next.js 14
            </h2>
            <p className="text-sm text-gray-600">
              App Router powered by React Server Components
            </p>
          </div>

          <div className="group rounded-lg border border-green-200 px-5 py-4 transition-colors hover:border-green-300 hover:bg-green-50">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              TypeScript
            </h2>
            <p className="text-sm text-gray-600">
              Type-safe development experience
            </p>
          </div>

          <div className="group rounded-lg border border-purple-200 px-5 py-4 transition-colors hover:border-purple-300 hover:bg-purple-50">
            <h2 className="text-xl font-semibold text-purple-600 mb-2">
              Tailwind CSS
            </h2>
            <p className="text-sm text-gray-600">
              Utility-first CSS framework
            </p>
          </div>

          <div className="group rounded-lg border border-orange-200 px-5 py-4 transition-colors hover:border-orange-300 hover:bg-orange-50">
            <h2 className="text-xl font-semibold text-orange-600 mb-2">
              pnpm
            </h2>
            <p className="text-sm text-gray-600">
              Fast, disk space efficient package manager
            </p>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <a
            href="https://nextjs.org/docs"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Examples
          </a>
        </div>
      </div>
    </main>
  )
}