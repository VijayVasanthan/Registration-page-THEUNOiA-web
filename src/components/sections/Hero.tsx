'use client'

import React from 'react'
import ScrollReveal from '@/components/animation/ScrollReveal'
import AnimationSlot from '@/components/animation/AnimationSlot'
import LunaAnimation from '@/components/animation/LunaAnimation'
import Button from '@/components/ui/Button'
import Eyebrow from '@/components/ui/Eyebrow'

export default function Hero() {
  return (
    <section id="hero" className="relative flex flex-col justify-center items-start w-full min-h-screen px-[8vw] py-[140px] text-ivory">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(192,107,62,0.08) 0%, transparent 70%)' }} />
      <ScrollReveal delay={0} duration={0.8}>
        <Eyebrow>Bharat's student-first freelance ecosystem</Eyebrow>
      </ScrollReveal>
      
      <ScrollReveal delay={0.1} duration={0.8}>
        <h1 className="font-head text-[clamp(42px,7vw,92px)] max-w-[900px] font-semibold leading-[1.05] mt-6 mb-6">
          Independence<br />starts here.
        </h1>
      </ScrollReveal>
      
      <ScrollReveal delay={0.2} duration={0.8}>
        <p className="text-[19px] max-w-[520px] opacity-85 leading-[1.6] mb-10">
          Every masterpiece was once just a thought. THEUNOiA is where student talent meets real opportunity — before graduation, not after.
        </p>
      </ScrollReveal>
      
      <ScrollReveal delay={0.3} duration={0.8}>
        <div className="flex gap-4">
          <Button variant="primary">Join the waitlist</Button>
          <Button variant="ghost">See how it works</Button>
        </div>
      </ScrollReveal>
      
      <AnimationSlot id="hero-luna" className="hidden lg:block absolute right-[5%] bottom-[15%]">
        <LunaAnimation variant="working" className="max-w-[320px]" />
      </AnimationSlot>
      
      <div className="absolute bottom-[5%] left-[8vw] flex flex-col items-center gap-2">
        <span className="text-[12px] uppercase tracking-widest opacity-60">Dive in</span>
        <div className="w-px h-9 bg-ivory animate-pulse-line"></div>
      </div>
    </section>
  )
}
