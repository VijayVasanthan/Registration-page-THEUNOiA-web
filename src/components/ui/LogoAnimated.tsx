'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

type LogoVariant = 'primary' | 'secondary' | 'monochrome-navy' | 'monochrome-ivory'

interface LogoAnimatedProps {
  variant?: LogoVariant
  className?: string
  animated?: boolean
}

export default function LogoAnimated({ 
  variant = 'secondary', 
  className = '', 
  animated = true 
}: LogoAnimatedProps) {
  const letters = ['t', 'h', 'e', 'u', 'n', 'o', 'i', 'a']
  
  // Base text color based on variant
  const getBaseColorClass = () => {
    switch (variant) {
      case 'primary':
      case 'monochrome-navy':
        return 'text-navy'
      case 'monochrome-ivory':
        return 'text-ivory'
      case 'secondary':
      default:
        return 'text-white'
    }
  }

  // Check if a letter should have the gradient effect
  const isGradientLetter = (index: number) => {
    // Indices 5, 6, 7 correspond to 'O', 'I', 'A'
    const isOIA = index >= 5 && index <= 7
    const hasGradientVariant = variant === 'primary' || variant === 'secondary'
    return isOIA && hasGradientVariant
  }

  return (
    <Link href="/" className={`inline-flex font-head text-[22px] font-semibold tracking-[0.5px] ${className} z-50`} aria-label="THEUNOiA Home">
      <div className={`flex ${getBaseColorClass()}`}>
        {letters.map((letter, index) => {
          const isGradient = isGradientLetter(index)
          
          return (
            <motion.span
              key={index}
              initial={animated ? { y: 20, opacity: 0, scale: 0.5 } : false}
              animate={animated ? { y: 0, opacity: 1, scale: 1 } : false}
              transition={
                animated 
                  ? { type: 'spring', stiffness: 400, damping: 15, delay: index * 0.06 }
                  : { duration: 0 }
              }
              whileHover={{ 
                y: -6, 
                scale: 1.15, 
                transition: { type: 'spring', stiffness: 500, damping: 10 } 
              }}
              className={`cursor-pointer inline-block ${
                isGradient 
                  ? 'bg-[linear-gradient(269.2deg,#C16C3E_2.69%,#F0D197_124.67%)] bg-clip-text text-transparent' 
                  : ''
              }`}
            >
              {letter}
            </motion.span>
          )
        })}
      </div>
    </Link>
  )
}
