import { Navigation } from '@/components/Navigation';
import { AiMockupGenerator } from '@/components/AiMockupGenerator';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { 
  CheckCircle2, 
  ArrowRight, 
  Target, 
  Zap, 
  ShieldCheck, 
  TrendingUp,
  Settings,
  User,
  Phone,
  Layout,
  MousePointerClick
} from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-bg');
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="section-padding overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent-foreground font-semibold text-sm">
                <Zap className="w-4 h-4 fill-accent" />
                Landing Pages for Home Services
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary leading-tight">
                Get More Leads with High-Converting <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-foreground">Plumbing Landing Pages</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                I help plumbing and home service businesses in the US double their conversion rates with high-performance, purpose-built landing pages.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg rounded-full font-bold h-14 px-8 shadow-lg">
                  <Link href="https://calendly.com" target="_blank">Book a Free 15-Minute Strategy Call</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg rounded-full h-14 px-8 border-2 border-primary/10 hover:bg-primary/5 font-semibold">
                  <Link href="#work">See Example Layouts</Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent" /> Optimized for Google Ads</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-accent" /> Lightning Fast Loading</div>
              </div>
            </div>
            <div className="relative group animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="absolute -inset-4 bg-accent/20 blur-3xl rounded-full opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative rounded-[20px] overflow-hidden shadow-2xl border-8 border-white">
                <Image 
                  src={heroImage?.imageUrl || 'https://picsum.photos/seed/jobflow/1200/800'} 
                  alt={heroImage?.description || 'JobFlow hero'} 
                  width={1200}
                  height={800}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  data-ai-hint={heroImage?.imageHint || 'plumber professional'}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Me Section */}
      <section className="section-padding bg-white" id="why">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Why Specialized Landing Pages?</h2>
            <p className="text-lg text-muted-foreground">
              Most websites are digital brochures. My landing pages are conversion machines designed specifically for the plumbing business logic.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bento-card bg-[#F8FAFC]">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Laser Focused Intent</h3>
              <p className="text-muted-foreground">Every element is engineered to move the visitor toward a single goal: booking a call or requesting a quote.</p>
            </div>
            <div className="bento-card bg-[#F8FAFC]">
              <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent-foreground mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Ad Spend Efficiency</h3>
              <p className="text-muted-foreground">Stop wasting money on Google Ads that send traffic to your homepage. Increase your Quality Score and lower CPL.</p>
            </div>
            <div className="bento-card bg-[#F8FAFC]">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Trust & Authority</h3>
              <p className="text-muted-foreground">Deeply understand your customer's pain points. Clean design that reflects the professionalism of your crew.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies / Mockups Section */}
      <section className="section-padding bg-background" id="work">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Case Study Mockups</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Explore these abstract visual representations of our high-converting layouts.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {PlaceHolderImages.filter(img => img.id.startsWith('case-study')).map((study) => (
              <div key={study.id} className="bento-card group p-0 overflow-hidden">
                <div className="relative h-60 w-full">
                  <Image 
                    src={study.imageUrl} 
                    alt={study.description} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    data-ai-hint={study.imageHint}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">Emergency Service Layout</h3>
                  <p className="text-sm text-muted-foreground">Designed for quick conversions on mobile for urgent repair requests.</p>
                </div>
              </div>
            ))}
          </div>

          {/* AI Generator Integration */}
          <div className="max-w-4xl mx-auto">
            <AiMockupGenerator />
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="section-padding bg-white" id="packages">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Straightforward Packages</h2>
            <p className="text-lg text-muted-foreground">
              No hidden fees. Just results-oriented design for your home service business.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="bento-card border-2 border-muted relative">
              <h3 className="text-2xl font-bold mb-2">The Starter Flow</h3>
              <p className="text-primary font-bold text-3xl mb-6">$1,495</p>
              <ul className="space-y-4 mb-10 text-muted-foreground">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent" /> Single Optimized Landing Page</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent" /> Conversion-Ready Copywriting</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent" /> Responsive Mobile Design</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent" /> Form & CRM Integration</li>
              </ul>
              <Button className="w-full rounded-full h-12 bg-primary text-white font-bold text-lg">Choose Starter</Button>
            </div>
            <div className="bento-card border-2 border-accent bg-accent/5 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">Recommended</div>
              <h3 className="text-2xl font-bold mb-2">The Growth Engine</h3>
              <p className="text-primary font-bold text-3xl mb-6">$2,995</p>
              <ul className="space-y-4 mb-10 text-muted-foreground">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent" /> 3 Specialized Landing Pages</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent" /> A/B Testing Strategy</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent" /> Custom Icons & Visuals</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent" /> Google Ads Tracking Setup</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent" /> 30-Day Performance Review</li>
              </ul>
              <Button className="w-full rounded-full h-12 bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-lg shadow-md">Choose Growth</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-primary text-primary-foreground" id="process">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">My Simple 4-Step Process</h2>
            <p className="text-lg opacity-80">
              From initial call to live page in as little as 10 business days.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Phone, title: "1. Discovery", text: "Free 15-min strategy call to understand your business goals and service areas." },
              { icon: Layout, title: "2. Wireframing", text: "I map out the conversion flow and write copy that speaks directly to your customers." },
              { icon: Settings, title: "3. Build & Design", text: "High-performance coding with a focus on speed, accessibility, and clean aesthetics." },
              { icon: MousePointerClick, title: "4. Launch & Optimize", text: "Integrate with your CRM and launch. We monitor initial traffic for performance." }
            ].map((step, idx) => (
              <div key={idx} className="space-y-6">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-accent">
                  <step.icon className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-sm opacity-70 leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-white" id="about">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-10 bg-accent/10 rounded-full blur-3xl opacity-60"></div>
              <div className="relative aspect-square max-w-md mx-auto rounded-[40px] overflow-hidden shadow-2xl">
                <Image 
                  src="https://picsum.photos/seed/anton/800/800" 
                  alt="Anton Kolesnikov" 
                  fill 
                  className="object-cover"
                  data-ai-hint="professional headshot"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 bg-primary/5 rounded-lg text-primary text-xs font-bold uppercase tracking-widest">About Anton Kolesnikov</div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary">The Guy Behind the Pages</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With over 5 years of experience in lead generation for local service businesses, I've seen firsthand how a single, well-crafted page can transform a business from struggling for leads to booking calls 24/7.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I don't just "make websites." I build business tools that make money. I specialize in plumbing because I understand the emergency nature of the industry and how to build immediate trust with a visitor in under 3 seconds.
              </p>
              <div className="flex items-center gap-6 pt-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">50+</p>
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-tighter">Pages Built</p>
                </div>
                <div className="w-px h-10 bg-muted"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">2.5x</p>
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-tighter">Avg Lead Lift</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-background border-t" id="contact">
        <div className="container-custom">
          <div className="bento-card bg-gradient-to-br from-primary to-primary/90 text-primary-foreground p-12 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">Ready to Double Your <br />Plumbing Leads?</h2>
              <p className="text-xl opacity-80 max-w-2xl mx-auto">
                Stop losing customers to competitors with better landing pages. Book your free 15-minute audit and strategy session today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-xl rounded-full font-bold h-16 px-10 shadow-xl group">
                  <Link href="https://calendly.com" target="_blank" className="flex items-center gap-2">
                    Book My Free Call
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
              <p className="text-sm opacity-60">Limited spots available for monthly intake.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold">J</div>
              <span className="font-bold text-lg text-primary">JobFlow Landing Pages</span>
            </div>
            
            <div className="flex gap-10 text-sm font-medium text-muted-foreground">
              <Link href="#work" className="hover:text-primary transition-colors">Work</Link>
              <Link href="#packages" className="hover:text-primary transition-colors">Pricing</Link>
              <Link href="#about" className="hover:text-primary transition-colors">About</Link>
            </div>

            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Anton Kolesnikov. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}