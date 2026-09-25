import Nav from '@/components/Nav'
import DepthRail from '@/components/DepthRail'
import OceanCanvas from '@/components/animation/OceanCanvas'
import Hero from '@/components/sections/Hero'
import BehindName from '@/components/sections/BehindName'
import OceanTheory from '@/components/sections/OceanTheory'
import Pillars from '@/components/sections/Pillars'
import Stats from '@/components/sections/Stats'
import TeamTeaser from '@/components/sections/TeamTeaser'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/sections/Footer'

export default function AboutPage() {
  return (
    <>
      <OceanCanvas />
      <Nav />
      <DepthRail />
      <main className="relative z-[1]">
        <Hero />
        <BehindName />
        <OceanTheory />
        <Pillars />
        <Stats />
        <TeamTeaser />
        <CTA />
        <Footer />
      </main>
    </>
  )
}
