'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SiteShowcaseSection } from '@/components/SiteShowcaseSection';
import { ProcessSection } from '@/components/ProcessSection';
import Link from 'next/link';
import ShaderShowcase from "@/components/ui/hero";
import { ArrowRight, Zap } from 'lucide-react';

const comparisonData = [
  {
    criterion: "Niche expertise",
    whoTheyServe: "Industry Specialization",
    me: "I work only with plumbing and home service businesses in the US. I know their pains, seasonality, and what owners actually care about.",
    freelancer: "Takes on any niche — from cafés to online courses — so they do not understand plumbing specifics and copy generic templates."
  },
  {
    criterion: "12 years in marketing",
    whoTheyServe: "Strategic Background",
    me: "Over a decade in digital marketing: I understand lead generation, ads, SEO, and analytics, and I build all of that directly into the site structure.",
    freelancer: "Builds the site as a “pretty business card”, without thinking how the owner will actually get and track leads."
  },
  {
    criterion: "Battle‑tested templates",
    whoTheyServe: "Structural Integrity",
    me: "I use my own conversion-optimized templates used in real plumbing projects: thoughtful structure, offers, and local trust triggers.",
    freelancer: "Every time builds the site from scratch or edits a random theme, often without checking if the structure converts."
  },
  {
    criterion: "Focus on leads",
    whoTheyServe: "Growth Metric",
    me: "Design serves one goal — to increase calls and form submissions. I place CTAs and guarantees to grow conversion.",
    freelancer: "Talks mostly about colors and fonts; speaks about “conversion” in vague terms with no clear logic."
  },
  {
    criterion: "Fast launch",
    whoTheyServe: "Time to Revenue",
    me: "The template lets you launch in a few days: I replace texts, set up forms/calls, connect analytics, and hand over a ready engine.",
    freelancer: "Timeline stretches out: long brief first, then weeks of messages, revisions, and shifting deadlines."
  },
  {
    criterion: "Transparent pricing",
    whoTheyServe: "Investment Safety",
    me: "I work with a fixed price for a ready‑to‑use site based on the template, with no hidden hours or extra fees.",
    freelancer: "Often charges by the hour or gives a wide budget range; extra payments appear along the way."
  },
  {
    criterion: "Copywriting for owners",
    whoTheyServe: "Psychological Edge",
    me: "I write copy from the owner’s point of view: focus on revenue, predictable flow, and contractor-specific benefits.",
    freelancer: "Asks the client to “write the text themselves”, or uses generic boilerplate that ignores what really matters."
  },
  {
    criterion: "Ready for ads & scaling",
    whoTheyServe: "Ad Readiness",
    me: "The site structure is ready for traffic from day one: service/city pages and reviews blocks are optimized for scaling local campaigns.",
    freelancer: "Delivers generic pages that are hard to use later for local SEO, ads, or scaling your lead generation."
  }
];

export default function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeRow, setActiveRow] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Column Alignment Motion:
  // t=0: Criteria (0), Anton (180), Typical (90)
  // t=1: All at (0)
  const criteriaY = useTransform(smoothProgress, [0.1, 0.4], [0, 0]);
  const meY = useTransform(smoothProgress, [0.1, 0.4], [180, 0]);
  const freelancerY = useTransform(smoothProgress, [0.1, 0.4], [90, 0]);

  // Subtle Parallax (Secondary)
  const criteriaParallax = useTransform(smoothProgress, [0, 1], [0, 10]);
  const meParallax = useTransform(smoothProgress, [0, 1], [0, 5]);
  const freelancerParallax = useTransform(smoothProgress, [0, 1], [0, 15]);

  // Track active row based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      
      const rows = document.querySelectorAll('.compare-row-trigger');
      let currentActive = null;
      
      rows.forEach((row, idx) => {
        const rowRect = row.getBoundingClientRect();
        if (rowRect.top < viewportCenter && rowRect.bottom > viewportCenter) {
          currentActive = idx;
        }
      });
      
      setActiveRow(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <ShaderShowcase />

      {/* Showcase Section */}
      <SiteShowcaseSection />

      {/* Process Section */}
      <ProcessSection />

      {/* Comparison Section (About Block) */}
      <section 
        ref={sectionRef} 
        className="relative py-[20vh] px-[4vw] z-10 bg-background" 
        id="about"
      >
        <div className="max-w-[1400px] mx-auto">
          
          {/* Section Header */}
          <div className="mb-[12vh]">
            <h2 className="heading-lg text-primary tracking-tighter reveal-text">
              Fully integrated. <br />
              <em className="accent-italic">Best in class.</em>
            </h2>
          </div>

          {/* Sticky Table Header */}
          {/* Proportion: 1fr (25%) / 1.5fr (37.5%) / 1.5fr (37.5%) */}
          <div className="sticky top-[100px] z-30 grid grid-cols-[1fr_1.5fr_1.5fr] gap-[4vw] mb-[8vh]">
            {[
              { label: "CRITERIA", color: "text-muted-foreground" },
              { label: "ANTON KOLESNIKOV", color: "text-white", bg: "bg-primary" },
              { label: "TYPICAL FREELANCER", color: "text-muted-foreground" }
            ].map((header, i) => (
              <div 
                key={i} 
                className={`relative overflow-hidden border border-primary/5 rounded-2xl p-[1.5vw] h-[10vh] flex items-center shadow-sm ${header.bg || 'bg-white/80 backdrop-blur-xl'}`}
              >
                <span className={`label font-bold uppercase ${header.color}`}>
                  {header.label}
                  {i === 1 && <Zap className="inline-block ml-2 w-[1vw] h-[1vw] text-accent fill-accent" />}
                </span>
                {/* Active Underline Bar */}
                <AnimatePresence>
                  {activeRow !== null && (
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-accent origin-left"
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Grid with Vertical Rails Layout */}
          {/* Fixed row heights on desktop to ensure perfect horizontal alignment */}
          <div className="grid grid-cols-[1fr_1.5fr_1.5fr] gap-[4vw] relative">
            
            {/* Column 1: Criteria */}
            <motion.div style={{ y: criteriaY, translateY: criteriaParallax }} className="flex flex-col gap-[6vh]">
              {comparisonData.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`compare-row-trigger transition-all duration-300 bg-white border border-primary/5 rounded-2xl px-[2vw] py-[2.5vh] min-h-[260px] h-[28vh] flex flex-col justify-center overflow-hidden
                    ${activeRow === idx ? 'ring-1 ring-primary/10 shadow-lg scale-[1.01] brightness-[1.03]' : 'shadow-sm opacity-90'}`}
                >
                  <h3 className="heading-md text-primary text-[1.2vw] mb-[0.5vh] line-clamp-2">{item.criterion}</h3>
                  <div className="overflow-y-auto pr-2 scrollbar-hide">
                    <p className="body-text text-muted-foreground text-[0.8vw] opacity-70">
                      {item.whoTheyServe}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Column 2: Anton Kolesnikov (The Hero Column) */}
            <motion.div style={{ y: meY, translateY: meParallax }} className="flex flex-col gap-[6vh]">
              {comparisonData.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`transition-all duration-300 bg-white border-2 rounded-2xl px-[2vw] py-[2.5vh] min-h-[260px] h-[28vh] flex flex-col justify-center relative group shadow-primary/5 overflow-hidden
                    ${activeRow === idx 
                      ? 'border-accent bg-accent/5 shadow-2xl scale-[1.02] z-10' 
                      : 'border-primary/10 shadow-xl opacity-90'}
                    hover:scale-[1.04] hover:-translate-y-1 hover:border-accent hover:shadow-accent/10`}
                >
                  <div className="overflow-y-auto pr-2 scrollbar-hide">
                    <p className="body-text text-primary font-medium text-[0.9vw] leading-relaxed">
                      {item.me}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Column 3: Typical Freelancer */}
            <motion.div style={{ y: freelancerY, translateY: freelancerParallax }} className="flex flex-col gap-[6vh]">
              {comparisonData.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`transition-all duration-300 bg-white/40 border border-primary/5 rounded-2xl px-[2vw] py-[2.5vh] min-h-[260px] h-[28vh] flex flex-col justify-center grayscale-50 overflow-hidden
                    ${activeRow === idx 
                      ? 'opacity-100 scale-[1.01] brightness-[1.03]' 
                      : 'opacity-50'}
                    hover:bg-red-50/10 hover:grayscale-0 hover:border-red-200`}
                >
                  <div className="overflow-y-auto pr-2 scrollbar-hide">
                    <p className="body-text text-muted-foreground text-[0.9vw] leading-relaxed italic">
                      {item.freelancer}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-[15vh] bg-background relative z-10" id="packages">
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
      <section className="py-[20vh] border-t border-primary/5 bg-background relative z-10" id="contact">
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
      <footer className="py-[10vh] border-t border-primary/5 bg-background relative z-10">
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
