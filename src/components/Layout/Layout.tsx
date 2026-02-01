'use client'

import { ReactNode } from 'react'
import Navigation from './Navigation'

interface LayoutProps {
  children: ReactNode
  className?: string
}

export default function Layout({ children, className = '' }: LayoutProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ${className}`}>
      <Navigation />
      <main className="pt-0"> {/* 移除了顶部padding，让hero可以全屏 */}
        {children}
      </main>
    </div>
  )
}