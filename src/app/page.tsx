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
    me: "I work only with plumbing and similar home service businesses in the US, I know their pains, seasonality, typical offers, and what owners actually care about.",
    freelancer: "Takes on any niche — from cafés to online courses — so they do not understand plumbing specifics and just copy generic templates."
  },
  {
    criterion: "12 years in marketing",
    me: "12 years in digital marketing: I understand lead generation, ads, SEO, and analytics, and I build all of that directly into the site structure.",
    freelancer: "Builds the site as a “pretty business card”, without thinking how the owner will actually get and track leads."
  },
  {
    criterion: "Proven battle‑tested templates",
    me: "I use my own battle‑tested templates already used in real plumbing projects: thoughtful structure, blocks for offers, social proof, and local trust triggers.",
    freelancer: "Every time builds the site from scratch or edits a random theme, often without checking if this structure converts into calls."
  },
  {
    criterion: "Focus on leads, not pixels",
    me: "Design serves one goal — to increase calls, form submissions, and quote requests; I place CTAs, before/after, guarantees, and FAQ blocks to grow conversion.",
    freelancer: "Talks mostly about colors, fonts, and animations; speaks about “conversion” in vague terms with no numbers or clear logic."
  },
  {
    criterion: "Fast launch and clear process",
    me: "The template lets you launch in a few days: I replace texts and photos, set up forms and calls, connect basic analytics, and hand over a ready‑to‑use site with a simple step‑by‑step process.",
    freelancer: "Timeline stretches out: long brief first, then weeks of messages and revisions, unclear stages, and shifting deadlines."
  },
  {
    criterion: "Transparent fixed pricing",
    me: "I work with a fixed price for a ready‑to‑use site based on the template, with no hidden hours and “extra fees for every revision”.",
    freelancer: "Often charges by the hour or gives a very wide budget range; extra payments appear along the way."
  },
  {
    criterion: "Copy and offers written for owners",
    me: "I write and adapt copy from the plumbing business owner’s point of view: focus on revenue, predictable lead flow, and a simple way to work with a contractor.",
    freelancer: "Asks the client to “write the text themselves”, copies competitor phrases, or uses generic boilerplate that ignores what really matters to the owner."
  },
  {
    criterion: "Ready for ads and scaling",
    me: "The site structure is ready for traffic from day one: service and city pages, blocks for reviews, offers, and forms so a marketer can easily scale lead generation.",
    freelancer: "Delivers one or two generic pages that are hard to use later for ads, local SEO, and scaling campaigns."
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ShaderShowcase />

      {/* Why Section - Horizontal Scroll */}
      <div id="why">
        <LuminaInteractiveList />
      </div>

      {/* Showcase Section */}
      <SiteShowcaseSection />

      {/* Process Section */}
      <section id="process">
        <ProcessSection />
      </section>

      {/* Comparison Section (About Block) */}
      <section className="min-h-screen py-[15vh] border-y border-primary/5" id="about">
        <div className="w-full">
          <div className="mb-[12vh] px-[6vw]">
            <h2 className="heading-lg text-primary tracking-tighter reveal-text max-w-[80vw]">
              Fully integrated. <br />
              <em className="accent-italic">Best in class.</em>
            </h2>
          </div>

          <div className="relative overflow-x-auto lg:overflow-visible">
            <div className="min-w-[1200px] lg:min-w-full">
              {/* Table Header */}
              <div className="grid grid-cols-[1fr_1.5fr_1fr] items-end border-b border-primary/10 pb-[5vh] px-[4vw]">
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
                <div className="absolute top-0 bottom-0 left-[30%] right-[30%] bg-primary/[0.03] rounded-b-[4vw] pointer-events-none z-0" />
                
                {comparisonData.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-[1fr_1.5fr_1fr] items-center border-b border-primary/5 last:border-0 relative z-10 group hover:bg-primary/[0.01] transition-colors px-[4vw]">
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
      <section className="py-[15vh]" id="packages">
        <div className="w-full px-[8vw]">
          <header className="mb-[15vh] reveal-text">
            <div className="brand-mark heading-xl text-primary mb-[5vh]">
              PRICING<br />PLANS
            </div>
            <p className="body-text text-muted-foreground max-w-[45vw]">
              Choose a capacity level that fits your business stage. 
              Built for performance, scalability, and predictable lead flow.
            </p>
          </header>

          <div className="pricing-table border-t border-primary/10">
            <div className="hidden md:grid grid-cols-[80px_2fr_1.5fr_1fr] py-[3vh] border-b border-primary/10 text-muted-foreground label opacity-40">
              <span>Level</span>
              <span>Tier Specifications</span>
              <span>Included Resources</span>
              <span>Investment</span>
            </div>

            <div className="pricing-row grid grid-cols-1 md:grid-cols-[80px_2fr_1.5fr_1fr] py-[8vh] border-b border-primary/10 items-start hover:bg-primary/[0.02] transition-colors reveal-text">
              <div className="mb-[2vh] md:mb-0">
                <div className="tier-badge w-[3.5vw] h-[3.5vw] rounded-full bg-primary text-white flex items-center justify-center font-bold heading-md text-[1.5vw]">1</div>
              </div>
              <div className="tier-info pr-[6vw] mb-[4vh] md:mb-0">
                <span className="tier-name heading-md text-primary block mb-[2vh]">Fast Launch Starter</span>
                <span className="tier-desc body-text text-muted-foreground block mb-[4vh]">A focused launch for small service businesses needing immediate results.</span>
                <div className="feature-tags flex flex-wrap gap-[1vw]">
                  <span className="feature-tag tag border border-primary/10 px-[1vw] py-[0.5vh] rounded-md">Landing Page</span>
                  <span className="feature-tag tag border border-primary/10 px-[1vw] py-[0.5vh] rounded-md">Essential SEO</span>
                </div>
              </div>
              <div className="tier-details pr-[6vw] mb-[4vh] md:mb-0 space-y-[1.5vh]">
                <span className="detail-label label text-muted-foreground opacity-30">RESOURCES</span>
                {["One high-converting landing page", "Mobile-optimized design", "Lead form setup", "On-page SEO fundamentals"].map((item, i) => (
                  <div key={i} className="detail-item body-text flex items-center gap-[1vw]">
                    <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-primary" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="tier-action flex flex-col items-start gap-[4vh]">
                <div className="price-lockup flex flex-col">
                  <span className="label line-through opacity-30">$900</span>
                  <div className="flex items-baseline gap-[0.5vw]">
                    <span className="amount heading-md text-[3vw] text-primary">$697</span>
                    <span className="period label opacity-40">one-time</span>
                  </div>
                </div>
                <Button className="btn-select rounded-full btn border border-primary text-primary h-[4.5vw] px-[3vw] hover:bg-primary hover:text-white transition-all">Get Started</Button>
              </div>
            </div>

            <div className="pricing-row grid grid-cols-1 md:grid-cols-[80px_2fr_1.5fr_1fr] py-[8vh] border-b border-primary/10 items-start bg-primary/[0.03] reveal-text reveal-delay-1 relative">
              <div className="mb-[2vh] md:mb-0">
                <div className="tier-badge w-[3.5vw] h-[3.5vw] rounded-full bg-accent text-white flex items-center justify-center font-bold heading-md text-[1.5vw]">2</div>
              </div>
              <div className="tier-info pr-[6vw] mb-[4vh] md:mb-0">
                <div className="flex items-center gap-[1.5vw] mb-[2vh]">
                  <span className="tier-name heading-md text-primary">Local Leads Pro</span>
                  <span className="tag bg-primary text-white px-[1vw] py-[0.5vh] rounded-full">Recommended</span>
                </div>
                <span className="tier-desc body-text text-muted-foreground block mb-[4vh]">Our flagship multi-page solution built for dominant local SEO presence.</span>
              </div>
              <div className="tier-details pr-[6vw] mb-[4vh] md:mb-0 space-y-[1.5vh]">
                <span className="detail-label label text-muted-foreground opacity-30">RESOURCES</span>
                {["5-7 High-intent pages", "Service Area pages", "Reviews integration", "Advanced CRM Sync", "Local SEO optimization"].map((item, i) => (
                  <div key={i} className="detail-item body-text flex items-center gap-[1vw]">
                    <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-accent" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="tier-action flex flex-col items-start gap-[4vh]">
                <div className="price-lockup flex flex-col">
                  <span className="label line-through opacity-30">$1500</span>
                  <div className="flex items-baseline gap-[0.5vw]">
                    <span className="amount heading-md text-[3vw] text-primary">$1197</span>
                    <span className="period label opacity-40">one-time</span>
                  </div>
                </div>
                <Button className="btn-select rounded-full btn bg-accent text-white h-[4.5vw] px-[3vw] hover:scale-[1.05] transition-transform shadow-xl shadow-accent/20">Select Plan</Button>
              </div>
            </div>

            <div className="pricing-row grid grid-cols-1 md:grid-cols-[80px_2fr_1.5fr_1fr] py-[8vh] border-b border-primary/10 items-start hover:bg-primary/[0.02] transition-colors reveal-text reveal-delay-2">
              <div className="mb-[2vh] md:mb-0">
                <div className="tier-badge w-[3.5vw] h-[3.5vw] rounded-full bg-primary text-white flex items-center justify-center font-bold heading-md text-[1.5vw]">3</div>
              </div>
              <div className="tier-info pr-[6vw] mb-[4vh] md:mb-0">
                <span className="tier-name heading-md text-primary block mb-[2vh]">Growth Sync</span>
                <span className="tier-desc body-text text-muted-foreground block mb-[4vh]">Ongoing maintenance and conversion optimization for scaling businesses.</span>
              </div>
              <div className="tier-details pr-[6vw] mb-[4vh] md:mb-0 space-y-[1.5vh]">
                <span className="detail-label label text-muted-foreground opacity-30">RESOURCES</span>
                {["Hosting & Maintenance", "Monthly content tweaks", "UX performance audit", "Priority tech support"].map((item, i) => (
                  <div key={i} className="detail-item body-text flex items-center gap-[1vw]">
                    <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-primary" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="tier-action flex flex-col items-start gap-[4vh]">
                <div className="price-lockup flex flex-col">
                  <span className="label opacity-40">Setup from $700</span>
                  <div className="flex items-baseline gap-[0.5vw]">
                    <span className="amount heading-md text-[2.5vw] text-primary">+$129</span>
                    <span className="period label opacity-40">/mo.</span>
                  </div>
                </div>
                <Button className="btn-select rounded-full btn border border-primary text-primary h-[4.5vw] px-[3vw] hover:bg-primary hover:text-white transition-all">Contact Sales</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-[20vh] border-t border-primary/5" id="contact">
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
      <footer className="py-[10vh] border-t border-primary/5">
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
