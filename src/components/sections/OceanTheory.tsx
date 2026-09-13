'use client'

import React from 'react'
import ScrollReveal from '@/components/animation/ScrollReveal'
import AnimationSlot from '@/components/animation/AnimationSlot'
import Eyebrow from '@/components/ui/Eyebrow'

export default function OceanTheory() {
  return (
    <section 
      id="ocean-theory" 
      className="text-center py-32 px-6 relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #060f22 0%, #030811 100%)' }}
    >
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(192,107,62,0.05) 0%, transparent 60%)' }} />
      <AnimationSlot id="ocean-ripple" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-0">
        <div className="absolute inset-0 m-auto w-[300px] h-[300px] rounded-full border border-gold opacity-10 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
        <div className="absolute inset-0 m-auto w-[500px] h-[500px] rounded-full border border-gold opacity-10 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_1s]"></div>
        <div className="absolute inset-0 m-auto w-[700px] h-[700px] rounded-full border border-gold opacity-10 animate-[ping_5s_cubic-bezier(0,0,0.2,1)_infinite_2s]"></div>
      </AnimationSlot>

      <div className="relative z-10">
        <ScrollReveal>
          <Eyebrow>The Ocean Theory</Eyebrow>
          <h2 className="font-head text-[clamp(32px,5vw,54px)] mb-7 mt-4 text-ivory">
            Every drop strengthens<br />the ocean.
          </h2>
          <p className="max-w-[560px] mx-auto opacity-75 text-[16px] text-ivory">
            Talent is the ocean. Opportunities are the tides. Clients are the sunlight. Collaboration creates the waves that reach every shore.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap gap-7 justify-center mt-14">
            <div className="max-w-[220px] text-left p-[22px] border-l-2 border-gold text-ivory bg-navy-deep/40 backdrop-blur-md rounded-r-lg">
              <h4 className="font-head text-[16px] mb-2 text-gold">Drops</h4>
              <p className="text-[14px] opacity-75 leading-[1.6]">
                Every individual student — their skill, their curiosity, their effort.
              </p>
            </div>
            
            <div className="max-w-[220px] text-left p-[22px] border-l-2 border-gold text-ivory bg-navy-deep/40 backdrop-blur-md rounded-r-lg">
              <h4 className="font-head text-[16px] mb-2 text-gold">Tides</h4>
              <p className="text-[14px] opacity-75 leading-[1.6]">
                The opportunities that carry talent toward the right people, naturally.
              </p>
            </div>
            
            <div className="max-w-[220px] text-left p-[22px] border-l-2 border-gold text-ivory bg-navy-deep/40 backdrop-blur-md rounded-r-lg">
              <h4 className="font-head text-[16px] mb-2 text-gold">Shores</h4>
              <p className="text-[14px] opacity-75 leading-[1.6]">
                Where hidden potential finally meets recognition — and grows.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
