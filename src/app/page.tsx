
import { Button } from '@/components/ui/button';
import { LuminaInteractiveList } from '@/components/ui/lumina-interactive-list';
import { SiteShowcaseSection } from '@/components/SiteShowcaseSection';
import { ProcessSection } from '@/components/ProcessSection';
import Link from 'next/link';
import ShaderShowcase from "@/components/ui/hero";
import { ArrowRight } from 'lucide-react';

const comparisonData = [
  {
    criterion: "Niche expertise",
    me: "I work only with plumbing and home service businesses in the US. I know your seasonality, typical offers, and what owners actually care about.",
    freelancer: "Takes on any niche — from cafés to online courses — missing the critical nuances of the plumbing trade."
  },
  {
    criterion: "12 years in marketing",
    me: "12 years in digital marketing: I understand lead generation, ads, SEO, and analytics, building them directly into your site's DNA.",
    freelancer: "Builds the site as a “pretty business card”, ignoring how the owner will actually generate or track new revenue."
  },
  {
    criterion: "Proven battle‑tested templates",
    me: "I use my own battle‑tested structures already used in real plumbing projects: high-intent blocks for local trust triggers.",
    freelancer: "Builds from scratch every time, often failing to implement the specific psychological triggers that convert calls."
  },
  {
    criterion: "Focus on leads, not pixels",
    me: "Design serves one goal: increasing calls and form submissions. I place CTAs and FAQ blocks strategically to grow conversion.",
    freelancer: "Talks mostly about colors and fonts; speaks about “conversion” in vague terms with no clear logic or data."
  },
  {
    criterion: "Fast launch and clear process",
    me: "Launch in just 10 days: I replace texts, set up forms, connect analytics, and hand over a revenue-ready machine.",
    freelancer: "Timeline stretches for weeks: long briefs, unclear stages, and shifting deadlines that stall your business growth."
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <ShaderShowcase />

      {/* Why Section */}
      <section className="bg-primary overflow-hidden" id="why">
        <LuminaInteractiveList />
      </section>

      {/* Showcase Section */}
      <SiteShowcaseSection />

      {/* Process Section */}
      <section id="process">
        <ProcessSection />
      </section>

      {/* Comparison Section (About Block) */}
      <section className="min-h-screen py-[15vh] bg-[#fcfbf7] border-y border-primary/5" id="about">
        <div className="w-full px-[6vw]">
          <div className="mb-[12vh]">
            <h2 className="heading-lg text-primary tracking-tighter reveal-text max-w-[80vw]">
              Fully integrated. <br />
              <em className="accent-italic">Best in class.</em>
            </h2>
          </div>

          <div className="relative overflow-x-auto lg:overflow-visible">
            <div className="min-w-[1200px] lg:min-w-full">
              {/* Table Header */}
              <div className="grid grid-cols-[1fr_1.5fr_1fr] items-end border-b border-primary/10 pb-[5vh]">
                <div className="px-[2vw]">
                  <span className="label text-muted-foreground opacity-40">Criteria</span>
                </div>
                <div className="px-[3vw] text-center">
                  <div className="inline-block px-[4vw] py-[1.5vh] bg-primary text-white heading-md rounded-t-3xl mb-[-5vh] relative z-10 reveal-text">
                    ANTON KOLESNIKOV
                  </div>
                </div>
                <div className="px-[2vw] text-center">
                  <span className="label text-muted-foreground opacity-40">Typical Freelancer</span>
                </div>
              </div>

              {/* Table Body */}
              <div className="relative">
                {/* Visual highlight for central column */}
                <div className="absolute top-0 bottom-0 left-[25%] right-[25%] bg-primary/[0.03] rounded-b-[4vw] pointer-events-none z-0" />
                
                {comparisonData.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-[1fr_1.5fr_1fr] items-center border-b border-primary/5 last:border-0 relative z-10 group hover:bg-primary/[0.01] transition-colors">
                    <div className="py-[7vh] px-[2vw]">
                      <h3 className="heading-md text-primary opacity-90 reveal-text">{row.criterion}</h3>
                    </div>
                    <div className="py-[7vh] px-[5vw] text-center">
                      <p className="body-text text-primary font-medium reveal-text reveal-delay-1 max-w-[40vw] mx-auto leading-relaxed">
                        {row.me}
                      </p>
                    </div>
                    <div className="py-[7vh] px-[2vw] text-center">
                      <p className="body-text text-muted-foreground opacity-60 reveal-text reveal-delay-2 max-w-[25vw] mx-auto">
                        {row.freelancer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-[15vh] bg-white" id="packages">
        <div className="w-full px-[8vw]">
          <header className="mb-[15vh] reveal-text">
            <div className="heading-xl text-primary mb-[5vh]">
              PRICING<br />PLANS
            </div>
            <p className="body-text text-muted-foreground max-w-[45vw]">
              Choose a capacity level that fits your business stage. 
              Built for performance, scalability, and predictable lead flow.
            </p>
          </header>

          <div className="border-t border-primary/10">
            {/* Table Header Labels */}
            <div className="hidden md:grid grid-cols-[80px_2fr_1.5fr_1fr] py-[3vh] border-b border-primary/10 text-muted-foreground label opacity-40">
              <span>Level</span>
              <span>Tier Specifications</span>
              <span>Included Resources</span>
              <span>Investment</span>
            </div>

            {/* Pricing Rows */}
            <div className="grid grid-cols-1 md:grid-cols-[80px_2fr_1.5fr_1fr] py-[8vh] border-b border-primary/10 items-start hover:bg-primary/[0.02] transition-colors reveal-text">
              <div className="mb-[2vh] md:mb-0">
                <div className="w-[3.5vw] h-[3.5vw] rounded-full bg-primary text-white flex items-center justify-center font-bold heading-md text-[1.5vw]">1</div>
              </div>
              <div className="pr-[6vw] mb-[4vh] md:mb-0">
                <span className="heading-md text-primary block mb-[2vh]">Fast Launch Starter</span>
                <span className="body-text text-muted-foreground block mb-[4vh]">A focused launch for small service businesses needing immediate results.</span>
                <div className="flex flex-wrap gap-[1vw]">
                  <span className="tag border border-primary/10 px-[1vw] py-[0.5vh] rounded-md">Landing Page</span>
                  <span className="tag border border-primary/10 px-[1vw] py-[0.5vh] rounded-md">Essential SEO</span>
                </div>
              </div>
              <div className="pr-[6vw] mb-[4vh] md:mb-0 space-y-[1.5vh]">
                <span className="label text-muted-foreground opacity-30">RESOURCES</span>
                {["One high-converting landing page", "Mobile-optimized design", "Lead form setup", "On-page SEO fundamentals"].map((item, i) => (
                  <div key={i} className="body-text flex items-center gap-[1vw]">
                    <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-primary" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-start gap-[4vh]">
                <div className="flex flex-col">
                  <span className="label line-through opacity-30">$900</span>
                  <div className="flex items-baseline gap-[0.5vw]">
                    <span className="heading-md text-[3vw] text-primary">$697</span>
                    <span className="label opacity-40">one-time</span>
                  </div>
                </div>
                <Button className="rounded-full btn bg-primary text-white h-[4.5vw] px-[3vw] hover:scale-[1.05] transition-transform">Get Started</Button>
              </div>
            </div>

            {/* Recommended Row */}
            <div className="grid grid-cols-1 md:grid-cols-[80px_2fr_1.5fr_1fr] py-[8vh] border-b border-primary/10 items-start bg-primary/[0.03] reveal-text reveal-delay-1">
              <div className="mb-[2vh] md:mb-0">
                <div className="w-[3.5vw] h-[3.5vw] rounded-full bg-accent text-white flex items-center justify-center font-bold heading-md text-[1.5vw]">2</div>
              </div>
              <div className="pr-[6vw] mb-[4vh] md:mb-0">
                <div className="flex items-center gap-[1.5vw] mb-[2vh]">
                  <span className="heading-md text-primary">Local Leads Pro</span>
                  <span className="tag bg-primary text-white px-[1vw] py-[0.5vh] rounded-full">Recommended</span>
                </div>
                <span className="body-text text-muted-foreground block mb-[4vh]">Our flagship multi-page solution built for dominant local SEO presence.</span>
              </div>
              <div className="pr-[6vw] mb-[4vh] md:mb-0 space-y-[1.5vh]">
                <span className="label text-muted-foreground opacity-30">RESOURCES</span>
                {["5-7 High-intent pages", "Service Area pages", "Reviews integration", "Advanced CRM Sync", "Local SEO optimization"].map((item, i) => (
                  <div key={i} className="body-text flex items-center gap-[1vw]">
                    <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-accent" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-start gap-[4vh]">
                <div className="flex flex-col">
                  <span className="label line-through opacity-30">$1500</span>
                  <div className="flex items-baseline gap-[0.5vw]">
                    <span className="heading-md text-[3vw] text-primary">$1197</span>
                    <span className="label opacity-40">one-time</span>
                  </div>
                </div>
                <Button className="rounded-full btn bg-accent text-white h-[4.5vw] px-[3vw] hover:scale-[1.05] transition-transform shadow-xl shadow-accent/20">Select Plan</Button>
              </div>
            </div>

            {/* Subscription Row */}
            <div className="grid grid-cols-1 md:grid-cols-[80px_2fr_1.5fr_1fr] py-[8vh] border-b border-primary/10 items-start hover:bg-primary/[0.02] transition-colors reveal-text reveal-delay-2">
              <div className="mb-[2vh] md:mb-0">
                <div className="w-[3.5vw] h-[3.5vw] rounded-full bg-primary text-white flex items-center justify-center font-bold heading-md text-[1.5vw]">3</div>
              </div>
              <div className="pr-[6vw] mb-[4vh] md:mb-0">
                <span className="heading-md text-primary block mb-[2vh]">Growth Sync</span>
                <span className="body-text text-muted-foreground block mb-[4vh]">Ongoing maintenance and conversion optimization for scaling businesses.</span>
              </div>
              <div className="pr-[6vw] mb-[4vh] md:mb-0 space-y-[1.5vh]">
                <span className="label text-muted-foreground opacity-30">RESOURCES</span>
                {["Hosting & Maintenance", "Monthly content tweaks", "UX performance audit", "Priority tech support"].map((item, i) => (
                  <div key={i} className="body-text flex items-center gap-[1vw]">
                    <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-primary" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-start gap-[4vh]">
                <div className="flex flex-col">
                  <span className="label opacity-40">Setup from $700</span>
                  <div className="flex items-baseline gap-[0.5vw]">
                    <span className="heading-md text-[2.5vw] text-primary">+$129</span>
                    <span className="label opacity-40">/mo.</span>
                  </div>
                </div>
                <Button className="rounded-full btn bg-primary text-white h-[4.5vw] px-[3vw] hover:scale-[1.05] transition-transform">Contact Sales</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-[20vh] bg-background border-t border-primary/5" id="contact">
        <div className="w-full px-[6vw]">
          <div className="bg-primary text-white p-[10vw] text-center max-w-[85vw] mx-auto rounded-[4vw] shadow-[0_4vw_10vw_-2vw_rgba(29,38,37,0.3)] relative overflow-hidden reveal-text">
            <div className="relative z-10 space-y-[6vh]">
              <h2 className="heading-lg text-white leading-[0.9] tracking-tighter">Ready to Double Your <br />Plumbing Leads?</h2>
              <Button asChild className="bg-accent text-white hover:bg-white hover:text-primary transition-all rounded-full btn h-[7vw] px-[5vw] shadow-2xl group">
                <Link href="https://calendly.com" target="_blank" className="flex items-center gap-[1.5vw]">
                  Book My Strategy Call
                  <ArrowRight className="w-[1.8vw] h-[1.8vw] group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <p className="tag opacity-50">Limited availability for monthly intakes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-[10vh] border-t border-primary/5 bg-white">
        <div className="w-full px-[6vw]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-[6vh]">
            <div className="flex items-center gap-[1.5vw]">
              <div className="w-[3.5vw] h-[3.5vw] rounded-xl bg-primary flex items-center justify-center text-white heading-md">J</div>
              <span className="heading-md text-primary">JobFlow Landing Pages</span>
            </div>
            <div className="tag text-muted-foreground opacity-60">
              &copy; {new Date().getFullYear()} Anton Kolesnikov. Precision Engineered for Results.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
