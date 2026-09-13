import React from 'react'
import ScrollReveal from '@/components/animation/ScrollReveal'
import AnimationSlot from '@/components/animation/AnimationSlot'
import Eyebrow from '@/components/ui/Eyebrow'

export default function BehindName() {
  return (
    <section id="behind-name" className="max-w-[760px] mx-auto text-left py-24 px-6 md:px-0 text-ivory">
      <ScrollReveal>
        <Eyebrow>Behind the name</Eyebrow>
        <p className="font-head text-gold text-[16px] mb-2.5 mt-4">the-yoo-NOY-uh</p>
        <p className="text-[19px] leading-[1.8] opacity-[0.88] mb-5">
          Our name is rooted in the Greek word <AnimationSlot id="behind-name-shimmer" className="inline"><span className="text-gold italic">Eunoia</span></AnimationSlot> — beautiful thinking. Eunoia is where beautiful thinking begins. THEUNOiA is where it finds its ocean.
        </p>
        <p className="text-[19px] leading-[1.8] opacity-[0.88] mb-5">
          The &quot;TH&quot; transforms a word into a destination — reflecting our vision of building Bharat&apos;s first student-first, AI-powered freelancing platform, where beautiful thinking finds opportunities, projects, and purpose.
        </p>
      </ScrollReveal>
    </section>
  )
}
