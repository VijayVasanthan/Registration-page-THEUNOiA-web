import Nav from '@/components/Nav'
import Footer from '@/components/sections/Footer'
import ScrollReveal from '@/components/animation/ScrollReveal'
import Button from '@/components/ui/Button'
import Eyebrow from '@/components/ui/Eyebrow'

export default function MentorshipPage() {
  return (
    <main className="min-h-screen bg-navy text-ivory selection:bg-terracotta/30 selection:text-ivory">
      <Nav />
      
      {/* Hero Section */}
      <section className="relative pt-[180px] pb-[120px] px-[8vw] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C06B3E_0%,transparent_60%)] opacity-10 pointer-events-none mix-blend-screen" />
        
        <div className="max-w-[1100px] mx-auto text-center relative z-10">
          <ScrollReveal>
            <Eyebrow className="mb-6 justify-center text-terracotta">Mentorship</Eyebrow>
            <h1 className="font-head text-[clamp(50px,7vw,100px)] leading-[1.1] tracking-tight font-bold mb-6 text-ivory max-w-[900px] mx-auto">
              Not lectures — <span className="italic font-light opacity-90">guidance.</span>
            </h1>
            <p className="font-body text-xl text-beige mb-10 max-w-2xl mx-auto leading-relaxed">
              Mentors who've walked the path, helping students build direction, confidence, and their first real opportunities.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* What Makes It Different */}
      <section className="py-[120px] px-[8vw] bg-navy-deep">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <h2 className="font-head text-4xl md:text-5xl font-bold mb-16 text-center text-ivory">The Difference</h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1}>
              <div className="p-8 border-t border-terracotta/30">
                <h3 className="font-head text-2xl font-bold mb-4 text-ivory">Real Experience</h3>
                <p className="font-body text-beige leading-relaxed">Mentors are working professionals, founders, and industry leaders — not textbook instructors. They teach what's relevant today.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="p-8 border-t border-terracotta/30 mt-8 md:mt-0 md:translate-y-8">
                <h3 className="font-head text-2xl font-bold mb-4 text-ivory">1-on-1 Guidance</h3>
                <p className="font-body text-beige leading-relaxed">Personalized sessions focused on your specific goals, challenges, and growth areas. No generic advice.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="p-8 border-t border-terracotta/30 mt-8 md:mt-0 md:translate-y-16">
                <h3 className="font-head text-2xl font-bold mb-4 text-ivory">Career Navigation</h3>
                <p className="font-body text-beige leading-relaxed">From portfolio reviews to interview prep, mentors help you find your direction and take actionable steps.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mentor Types */}
      <section className="py-[120px] px-[8vw]">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <h2 className="font-head text-4xl md:text-5xl font-bold mb-16 text-center text-ivory">Who Will Guide You?</h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal delay={0.1}>
              <div className="bg-ivory/[0.04] rounded-[24px] p-8 h-full hover:bg-ivory/[0.06] transition-colors border border-transparent hover:border-ivory/10">
                <div className="w-12 h-12 bg-terracotta/20 rounded-full mb-6 flex items-center justify-center">
                  <div className="w-4 h-4 bg-terracotta rounded-full"></div>
                </div>
                <h3 className="font-head text-2xl font-bold mb-4 text-ivory">Industry Mentors</h3>
                <p className="font-body text-beige">Professionals from tech, design, marketing, and business offering real-world insights and career strategy.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="bg-ivory/[0.04] rounded-[24px] p-8 h-full hover:bg-ivory/[0.06] transition-colors border border-transparent hover:border-ivory/10">
                <div className="w-12 h-12 bg-gold/20 rounded-full mb-6 flex items-center justify-center">
                  <div className="w-4 h-4 bg-gold rounded-full"></div>
                </div>
                <h3 className="font-head text-2xl font-bold mb-4 text-ivory">Peer Mentors</h3>
                <p className="font-body text-beige">Senior students and recent graduates who have just successfully navigated the journey you're on.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="bg-ivory/[0.04] rounded-[24px] p-8 h-full hover:bg-ivory/[0.06] transition-colors border border-transparent hover:border-ivory/10">
                <div className="w-12 h-12 bg-beige/20 rounded-full mb-6 flex items-center justify-center">
                  <div className="w-4 h-4 bg-beige rounded-full"></div>
                </div>
                <h3 className="font-head text-2xl font-bold mb-4 text-ivory">Community Mentors</h3>
                <p className="font-body text-beige">Alumni who give back through our CONNECT events, building a sustainable ecosystem of growth.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[120px] px-[8vw] bg-navy-deep">
        <div className="max-w-[800px] mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-head text-[clamp(40px,5vw,72px)] leading-[1.1] tracking-tight font-bold mb-6 text-ivory">
              Find your guide.
            </h2>
            <p className="font-body text-xl text-beige mb-10">
              Stop guessing. Start growing with the right mentorship.
            </p>
            <Button href="#" variant="primary" className="bg-terracotta hover:bg-terracotta/90 text-ivory border-transparent">
              Meet the mentors &rarr;
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
