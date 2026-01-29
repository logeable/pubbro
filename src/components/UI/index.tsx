'use client'

import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  gradient?: boolean
}

export function Card({ children, className = '', hover = true, gradient = false }: CardProps) {
  const baseClasses = 'bg-white rounded-2xl shadow-md overflow-hidden'
  const hoverClasses = hover ? 'hover:shadow-lg transition-shadow duration-300' : ''
  const gradientClasses = gradient ? 'bg-gradient-to-br from-white to-gray-50' : ''

  return (
    <div className={`${baseClasses} ${hoverClasses} ${gradientClasses} ${className}`}>
      {children}
    </div>
  )
}

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
}

export function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  disabled = false
}: ButtonProps) {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500'
  }
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  )
}

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
    </div>
  )
}