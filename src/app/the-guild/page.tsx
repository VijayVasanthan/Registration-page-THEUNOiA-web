import Nav from '@/components/Nav'
import Footer from '@/components/sections/Footer'
import ScrollReveal from '@/components/animation/ScrollReveal'
import Button from '@/components/ui/Button'
import Eyebrow from '@/components/ui/Eyebrow'

export default function TheGuildPage() {
  const cities = [
    { name: 'Nagpur', status: 'Active' },
    { name: 'Bengaluru', status: 'Coming soon' },
    { name: 'Mumbai', status: 'Coming soon' },
    { name: 'Raipur', status: 'Active' },
    { name: 'Coimbatore', status: 'Coming soon' },
    { name: 'Bhubaneswar', status: 'Coming soon' },
  ]

  return (
    <main className="min-h-screen bg-navy text-ivory selection:bg-gold/30 selection:text-ivory">
      <Nav />
      
      {/* Hero Section */}
      <section className="relative pt-[180px] pb-[120px] px-[8vw] overflow-hidden">
        <div className="max-w-[1100px] mx-auto text-center relative z-10">
          <ScrollReveal>
            <Eyebrow className="mb-6 justify-center">The Guild</Eyebrow>
            <h1 className="font-head text-[clamp(48px,6vw,84px)] leading-[1.1] tracking-tight font-bold mb-6 text-ivory max-w-[900px] mx-auto">
              Bridging talent, industry, and community.
            </h1>
            <p className="font-body text-xl text-beige mb-10 max-w-2xl mx-auto leading-relaxed">
              Our on-ground initiative bringing students, professionals, and opportunities together — city by city.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="py-[120px] px-[8vw] bg-navy-deep border-y border-ivory/[0.05]">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <h2 className="font-head text-4xl font-bold mb-12 text-center text-ivory">Our Cities</h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {cities.map((city, index) => (
              <ScrollReveal key={city.name} delay={index * 0.1}>
                <div className="bg-ivory/[0.06] border border-ivory/[0.12] backdrop-blur-[14px] rounded-[18px] p-6 text-center transition-transform hover:-translate-y-1">
                  <h3 className="font-head text-[20px] font-bold mb-2 text-ivory">{city.name}</h3>
                  <p className={`font-body text-sm ${city.status === 'Active' ? 'text-terracotta' : 'text-beige/60'}`}>
                    {city.status}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What Happens at The Guild */}
      <section className="py-[120px] px-[8vw]">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <h2 className="font-head text-4xl md:text-5xl font-bold mb-16 text-center text-ivory">What Happens at The Guild</h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1}>
              <div className="h-full border border-ivory/10 rounded-[24px] p-8 hover:bg-ivory/[0.02] transition-colors">
                <div className="w-12 h-12 bg-ivory/5 rounded-xl mb-6 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
                </div>
                <h3 className="font-head text-2xl font-bold mb-4 text-ivory">Workshops</h3>
                <p className="font-body text-beige leading-relaxed">Hands-on skill sessions led by industry professionals. Learn practical tools and frameworks you can apply immediately.</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="h-full border border-ivory/10 rounded-[24px] p-8 hover:bg-ivory/[0.02] transition-colors">
                <div className="w-12 h-12 bg-ivory/5 rounded-xl mb-6 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <h3 className="font-head text-2xl font-bold mb-4 text-ivory">Networking</h3>
                <p className="font-body text-beige leading-relaxed">Meet peers, mentors, and potential collaborators in your city. Build a support system of ambitious individuals.</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <div className="h-full border border-ivory/10 rounded-[24px] p-8 hover:bg-ivory/[0.02] transition-colors">
                <div className="w-12 h-12 bg-ivory/5 rounded-xl mb-6 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                </div>
                <h3 className="font-head text-2xl font-bold mb-4 text-ivory">Showcases</h3>
                <p className="font-body text-beige leading-relaxed">Present your projects to real audiences and potential clients. Get constructive feedback and visibility.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-[120px] px-[8vw] bg-navy-deep border-y border-ivory/[0.05]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <ScrollReveal delay={0.1}>
            <div className="font-head text-5xl font-bold text-gold mb-2">6 cities</div>
            <div className="font-body text-beige">Expanding footprint</div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="font-head text-5xl font-bold text-gold mb-2">1,000+</div>
            <div className="font-body text-beige">Individuals reached</div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="font-head text-5xl font-bold text-gold mb-2">&infin;</div>
            <div className="font-body text-beige">Growing community</div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[120px] px-[8vw]">
        <div className="max-w-[800px] mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-head text-[clamp(40px,5vw,72px)] leading-[1.1] tracking-tight font-bold mb-10 text-ivory">
              Find your city.
            </h2>
            <Button variant="primary" className="text-lg px-8 py-4">
              Join the Community
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
