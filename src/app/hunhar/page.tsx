import Nav from '@/components/Nav'
import Footer from '@/components/sections/Footer'
import ScrollReveal from '@/components/animation/ScrollReveal'
import AnimationSlot from '@/components/animation/AnimationSlot'
import LunaAnimation from '@/components/animation/LunaAnimation'
import Button from '@/components/ui/Button'
import Eyebrow from '@/components/ui/Eyebrow'

export default function HunharPage() {
  return (
    <main className="min-h-screen bg-navy text-ivory selection:bg-terracotta/30 selection:text-ivory">
      <Nav />
      
      {/* Hero Section */}
      <section className="relative pt-[180px] pb-[120px] px-[8vw] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#C06B3E_0%,transparent_50%)] opacity-20 pointer-events-none" />
        
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <ScrollReveal>
            <Eyebrow className="text-terracotta">THEUNOiA presents</Eyebrow>
            <h1 className="font-head text-[clamp(60px,8vw,120px)] leading-[1.1] tracking-tight font-bold mb-6 text-ivory">
              Hunhar
            </h1>
            <h2 className="font-head text-[clamp(24px,3vw,32px)] leading-tight mb-6 text-ivory/90">
              Bharat&apos;s student-first freelancing platform.
            </h2>
            <p className="font-body text-lg text-beige mb-10 max-w-xl leading-relaxed">
              Talent judged on capability, not certificates alone. Hunhar (formerly SkillBridge) connects verified student talent with real-world projects — powered by AI matching, skill verification, and community trust.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary">
                Join the hunt
              </Button>
              <Button variant="ghost">
                How it works
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="relative h-[400px] lg:h-[600px] flex items-center justify-center">
            <AnimationSlot id="hunhar-luna">
              <LunaAnimation variant="working" />
            </AnimationSlot>
          </ScrollReveal>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-[120px] px-[8vw]">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <h2 className="font-head text-4xl md:text-5xl font-bold mb-16 text-center text-ivory">Engineered for Excellence</h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal delay={0.1}>
              <div className="bg-ivory/[0.06] border border-ivory/[0.12] backdrop-blur-[14px] rounded-[18px] p-8 h-full">
                <h3 className="font-head text-2xl font-bold mb-4 text-terracotta">AI Skill Verification</h3>
                <p className="font-body text-beige">Go beyond degrees. Our AI evaluates real ability through practical assessments, giving clients confidence in your capabilities.</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="bg-ivory/[0.06] border border-ivory/[0.12] backdrop-blur-[14px] rounded-[18px] p-8 h-full">
                <h3 className="font-head text-2xl font-bold mb-4 text-terracotta">Flexible Bidding</h3>
                <p className="font-body text-beige">Students set their own rates. Clients find talent that fits their budget. A transparent marketplace that works for everyone.</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <div className="bg-ivory/[0.06] border border-ivory/[0.12] backdrop-blur-[14px] rounded-[18px] p-8 h-full">
                <h3 className="font-head text-2xl font-bold mb-4 text-terracotta">Student-First Design</h3>
                <p className="font-body text-beige">Built around academic schedules, skill development, and mentorship integration to support your holistic growth.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How it Works Flow */}
      <section id="how-it-works" className="py-[120px] px-[8vw] bg-navy-deep">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal>
            <h2 className="font-head text-4xl md:text-5xl font-bold mb-16 text-center text-ivory">The Hunhar Journey</h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 bg-ivory/[0.03] border border-ivory/[0.08] rounded-[32px] p-10 overflow-x-auto hide-scrollbar">
              <div className="flex flex-col items-center text-center min-w-[140px]">
                <div className="w-16 h-16 rounded-full bg-navy-deep border border-terracotta flex items-center justify-center font-head text-2xl font-bold text-terracotta mb-4">1</div>
                <span className="font-body font-medium">Register</span>
              </div>
              <div className="hidden md:block h-[2px] flex-1 bg-gradient-to-r from-terracotta/50 to-terracotta/10"></div>
              <div className="md:hidden w-[2px] h-8 bg-terracotta/30"></div>
              
              <div className="flex flex-col items-center text-center min-w-[140px]">
                <div className="w-16 h-16 rounded-full bg-navy-deep border border-terracotta flex items-center justify-center font-head text-2xl font-bold text-terracotta mb-4">2</div>
                <span className="font-body font-medium">Get Verified</span>
              </div>
              <div className="hidden md:block h-[2px] flex-1 bg-gradient-to-r from-terracotta/50 to-terracotta/10"></div>
              <div className="md:hidden w-[2px] h-8 bg-terracotta/30"></div>
              
              <div className="flex flex-col items-center text-center min-w-[140px]">
                <div className="w-16 h-16 rounded-full bg-navy-deep border border-terracotta flex items-center justify-center font-head text-2xl font-bold text-terracotta mb-4">3</div>
                <span className="font-body font-medium">Browse Projects</span>
              </div>
              <div className="hidden md:block h-[2px] flex-1 bg-gradient-to-r from-terracotta/50 to-terracotta/10"></div>
              <div className="md:hidden w-[2px] h-8 bg-terracotta/30"></div>
              
              <div className="flex flex-col items-center text-center min-w-[140px]">
                <div className="w-16 h-16 rounded-full bg-navy-deep border border-terracotta flex items-center justify-center font-head text-2xl font-bold text-terracotta mb-4">4</div>
                <span className="font-body font-medium">Deliver</span>
              </div>
              <div className="hidden md:block h-[2px] flex-1 bg-gradient-to-r from-terracotta/50 to-terracotta/10"></div>
              <div className="md:hidden w-[2px] h-8 bg-terracotta/30"></div>
              
              <div className="flex flex-col items-center text-center min-w-[140px]">
                <div className="w-16 h-16 rounded-full bg-navy-deep border border-terracotta flex items-center justify-center font-head text-2xl font-bold text-terracotta mb-4">5</div>
                <span className="font-body font-medium">Earn</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-[120px] px-[8vw]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <ScrollReveal delay={0.1}>
            <div className="font-head text-5xl md:text-6xl font-bold text-terracotta mb-4">72%</div>
            <div className="font-body text-lg text-beige">Freelance economy growth in India</div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="font-head text-5xl md:text-6xl font-bold text-terracotta mb-4">18-25</div>
            <div className="font-body text-lg text-beige">Target age range for our platform</div>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="font-head text-5xl md:text-6xl font-bold text-terracotta mb-4">100%</div>
            <div className="font-body text-lg text-beige">AI-verified skill badges</div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[120px] px-[8vw] bg-navy-deep">
        <div className="max-w-[800px] mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-head text-[clamp(40px,5vw,72px)] leading-[1.1] tracking-tight font-bold mb-6 text-ivory">
              Ready to start hunting?
            </h2>
            <p className="font-body text-xl text-beige mb-10">
              Bridge the gap between learning and earning. Join the waitlist to be among the first to access the Hunhar platform.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full sm:w-auto flex-1 bg-ivory/[0.06] border border-ivory/[0.12] rounded-full px-6 py-4 font-body text-ivory focus:outline-none focus:border-terracotta transition-colors"
                required
              />
              <button 
                type="submit" 
                className="w-full sm:w-auto bg-terracotta text-ivory px-8 py-4 rounded-full font-body font-medium hover:bg-terracotta/90 transition-colors"
              >
                Join Waitlist
              </button>
            </form>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
