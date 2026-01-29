'use client'

import { ReactNode } from 'react'
import Navigation from './Navigation'

interface LayoutProps {
  children: ReactNode
  className?: string
}

export default function Layout({ children, className = '' }: LayoutProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 ${className}`}>
      <Navigation />
      <main className="pt-16"> {/* 为固定导航栏留出空间 */}
        {children}
      </main>
    </div>
  )
}