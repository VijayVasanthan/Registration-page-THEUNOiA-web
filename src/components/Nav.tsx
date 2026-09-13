'use client'

import { useState } from 'react'
import Link from 'next/link'
import LogoAnimated from '@/components/ui/LogoAnimated'
import { NAV_LINKS } from '@/lib/constants'

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <nav 
        className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between py-[22px] px-12 backdrop-blur-[10px]"
        style={{ background: 'linear-gradient(to bottom, rgba(10,27,55,0.75), rgba(10,27,55,0))' }}
      >
        <LogoAnimated variant="secondary" />

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-[14px] font-medium opacity-85">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="text-ivory no-underline hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-ivory transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-ivory transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-ivory transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed top-[76px] left-0 right-0 bg-navy/95 backdrop-blur z-10 flex flex-col items-center py-6 gap-4 md:hidden border-b border-white/10">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="text-ivory text-[16px] font-medium no-underline hover:text-gold transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
