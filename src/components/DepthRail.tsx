'use client'

import { useState, useEffect } from 'react'
import { useScroll, useTransform, motion, useMotionValueEvent } from 'framer-motion'
import { SECTIONS } from '@/lib/constants'

export default function DepthRail() {
  const { scrollYProgress } = useScroll()
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0]?.label || 'SURFACE')
  
  const markerTop = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const sectionIndex = Math.min(
      Math.floor(latest * SECTIONS.length), 
      SECTIONS.length - 1
    )
    if (SECTIONS[sectionIndex]) {
      setActiveSection(SECTIONS[sectionIndex].label)
    }
  })

  useEffect(() => {
    const handleScroll = () => {
      const sections = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean)
      let current = activeSection

      sections.forEach(section => {
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            const matched = SECTIONS.find(s => s.id === section.id)
            if (matched) current = matched.label
          }
        }
      })
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeSection])

  return (
    <div className="fixed right-7 top-1/2 -translate-y-1/2 z-[25] hidden md:flex items-center gap-3 h-[220px]">
      <div 
        className="text-[11px] tracking-[1.5px] uppercase text-gold whitespace-nowrap opacity-90 transition-all duration-300"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        {activeSection}
      </div>
      
      <div className="relative w-0.5 h-full rounded" style={{ background: 'linear-gradient(to bottom, rgba(243,239,230,0.15), rgba(243,239,230,0.4))' }}>
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 w-[9px] h-[9px] bg-gold rounded-full"
          style={{ 
            top: markerTop,
            boxShadow: '0 0 10px rgba(203, 169, 107, 0.8)' 
          }}
          transition={{ ease: "easeOut", duration: 0.25 }}
        />
      </div>
    </div>
  )
}
