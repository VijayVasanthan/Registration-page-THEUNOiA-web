'use client'

import ScrollReveal from '@/components/animation/ScrollReveal'
import CountUp from '@/components/animation/CountUp'
import Eyebrow from '@/components/ui/Eyebrow'
import { STATS } from '@/lib/constants'

export default function Stats() {
  return (
    <section 
      id="stats" 
      className="py-[120px] px-[8vw]"
      style={{ background: 'linear-gradient(160deg, #0A1B37 0%, #12294f 60%, rgba(192,107,62,0.15) 100%)' }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center max-w-[600px] mx-auto mb-[60px]">
          <ScrollReveal>
            <Eyebrow>The numbers behind the need</Eyebrow>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="font-head text-[clamp(28px,4vw,42px)] mt-4">
              Graduates are ready.<br />Opportunities aren&apos;t — yet.
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-11 md:gap-5 text-center">
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={0.2 + (i * 0.1)}>
              <div>
                <h3 className="font-head text-[clamp(36px,5vw,56px)] text-gold">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </h3>
                <p className="text-[13.5px] opacity-75 mt-2">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.6}>
          <p className="text-center opacity-40 text-[11px] mt-10">
            *placeholder figure — swap with sourced statistic before launch
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
