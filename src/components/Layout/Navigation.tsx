'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { navigation } from '@/data'

export default function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // 滚动效果
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-white/20' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo - 现代设计 */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className={`text-3xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${
                scrolled ? 'text-blue-600' : 'text-white'
              }`}>
                🚀
              </div>
              <div className="relative">
                <span className={`text-2xl font-black transition-all duration-300 ${
                  scrolled 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent' 
                    : 'text-white'
                }`}>
                  PubBro
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
              </div>
            </Link>

            {/* Desktop Navigation - 现代导航 */}
            <div className="hidden md:flex items-center space-x-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? scrolled
                          ? 'bg-blue-100 text-blue-700 shadow-lg'
                          : 'bg-white/20 text-white shadow-lg'
                        : scrolled
                          ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                    title={item.description}
                  >
                    <span className="mr-2 text-lg">{item.icon}</span>
                    {item.name}
                    {!isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Mobile Menu Button - 现代设计 */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  scrolled 
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Toggle menu"
              >
                <div className="w-6 h-6 relative">
                  <span className={`absolute inset-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? 'rotate-45 translate-y-2.5' : 'translate-y-1'
                  }`} />
                  <span className={`absolute inset-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0' : 'translate-y-2.5'
                  }`} />
                  <span className={`absolute inset-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isMenuOpen ? '-rotate-45 translate-y-2.5' : 'translate-y-4'
                  }`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - 现代移动端菜单 */}
        <div className={`md:hidden absolute top-full left-0 right-0 transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <div className={`mx-4 mt-2 p-2 rounded-2xl shadow-2xl border backdrop-blur-xl ${
            scrolled 
              ? 'bg-white/95 border-white/20' 
              : 'bg-black/20 border-white/10'
          }`}>
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 mb-1 last:mb-0 ${
                    isActive
                      ? scrolled
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-white/20 text-white'
                      : scrolled
                        ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="mr-4 text-xl">{item.icon}</span>
                  {item.name}
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* 导航占位符 */}
      <div className="h-20" />
    </>
  )
}