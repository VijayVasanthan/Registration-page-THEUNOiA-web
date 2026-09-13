'use client'

import ScrollReveal from '@/components/animation/ScrollReveal'
import AnimationSlot from '@/components/animation/AnimationSlot'
import LunaAnimation from '@/components/animation/LunaAnimation'
import Button from '@/components/ui/Button'
import Eyebrow from '@/components/ui/Eyebrow'

export default function CTA() {
  return (
    <section 
      id="cta" 
      className="py-[120px] px-[8vw]"
      style={{ background: 'linear-gradient(to bottom, #0A1B37 0%, rgba(192,107,62,0.3) 50%, #B7AA9A 100%)' }}
    >
      <div className="max-w-[1100px] mx-auto text-center flex flex-col items-center">
        <ScrollReveal>
          <Eyebrow>Build today. Lead tomorrow.</Eyebrow>
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <h2 className="font-head text-[clamp(32px,5vw,58px)] max-w-[700px] mb-5 mt-4">
            Ready to reach the shore?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="opacity-85 max-w-[520px] mb-9 text-[16px] mx-auto">
            Join the waitlist and be first to know when hunr opens for students and clients.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <form 
            onSubmit={(e) => e.preventDefault()} 
            className="flex gap-2.5 max-w-[420px] w-full flex-wrap justify-center mx-auto"
          >
            <input 
              type="email" 
              placeholder="you@example.com" 
              className="flex-1 min-w-[220px] py-3.5 px-[18px] rounded-full border border-ivory/40 bg-white/[0.06] text-ivory font-body text-[14px] placeholder:text-ivory/55 focus:outline-none focus:border-gold transition-colors"
              required
            />
            <Button variant="primary">Notify me</Button>
          </form>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <AnimationSlot id="cta-luna" className="mt-12 flex justify-center">
            <LunaAnimation variant="excited" className="max-w-[200px]" />
          </AnimationSlot>
        </ScrollReveal>
      </div>
    </section>
  )
}
