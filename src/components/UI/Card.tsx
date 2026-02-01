'use client'

import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export default function Card({ children, className = '', hover = true, glow = false }: CardProps) {
  return (
    <div className={`
      bg-white/80 backdrop-blur-lg rounded-3xl p-8 border border-white/20
      ${hover ? 'hover:bg-white/90 hover:scale-105 hover:shadow-2xl' : ''}
      ${glow ? 'hover:shadow-blue-500/25' : 'hover:shadow-gray-500/10'}
      transition-all duration-300 transform
      ${className}
    `}>
      {children}
    </div>
  )
}