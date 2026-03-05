'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SiteShowcaseSection } from '@/components/SiteShowcaseSection';
import { ProcessSection } from '@/components/ProcessSection';
import Link from 'next/link';
import ShaderShowcase from "@/components/ui/hero";
import { ArrowRight, Zap, Building2, User } from 'lucide-react';

const comparisonData = [
  {
    criterion: "NICHE FOCUS",
    me: "Exclusive Plumbing & Home Services",
    freelancer: "Generic Templates for Any Niche",
    agency: "Fragmented Multi-Niche Focus"
  },
  {
    criterion: "STRATEGY",
    me: "12+ Years in Local Lead Gen",
    freelancer: "Pretty Sites with No Strategy",
    agency: "Siloed Teams, No Strategy Owner"
  },
  {
    criterion: "STRUCTURE",
    me: "Conversion-First Plumbing Layouts",
    freelancer: "Unproven Structural Patterns",
    agency: "Same Template for Every Client"
  },
  {
    criterion: "PRIMARY GOAL",
    me: "Calls & Form Submissions",
    freelancer: "Colors, Fonts & Visuals",
    agency: "Clicks, Traffic & Impressions"
  },
  {
    criterion: "SCALING",
    me: "City-Specific Ad Landing Pages",
    freelancer: "Hard to Scale for Paid Traffic",
    agency: "Rebuilds Required for Every Ad"
  }
];

export function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [activeRow, setActiveRow] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Staggered Column Motion (t=0 to t=1)
  const col1Y = useTransform(smoothProgress, [0.1, 0.4], [0, 0]);
  const col2Y = useTransform(smoothProgress, [0.1, 0.4], [180, 0]); // Anton (Lowest)
  const col3Y = useTransform(smoothProgress, [0.1, 0.4], [90, 0]);  // Freelancer
  const col4Y = useTransform(smoothProgress, [0.1, 0.4], [180, 0]); // Agency (Lowest)

  // Track active row based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const viewportCenter = window.innerHeight / 2;
      const rows = document.querySelectorAll('.compare-row-trigger');
      let currentActive = null;
      
      rows.forEach((row, idx) => {
        const rect = row.getBoundingClientRect();
        if (rect.top < viewportCenter && rect.bottom > viewportCenter) {
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
      <ShaderShowcase />
      <SiteShowcaseSection />
      <ProcessSection />

      {/* Editorial Comparison Table Section */}
      <section 
        ref={sectionRef} 
        className="relative py-[20vh] z-10 bg-background overflow-hidden" 
        id="about"
      >
        <div className="w-full px-[8vw]">
          
          <div className="mb-[12vh] reveal-text">
            <h2 className="heading-lg text-primary tracking-tighter">
              Integrated. <br />
              <em className="accent-italic">Editorial Precision.</em>
            </h2>
          </div>

          {/* Table Headers */}
          <div className="sticky top-[100px] z-30 grid grid-cols-[1.2fr_2fr_2fr_2fr] gap-0 mb-0 border-b border-primary/10">
            {[
              { label: "CRITERIA", icon: null, active: false },
              { label: "ANTON KOLESNIKOV", icon: <Zap className="w-3 h-3 text-accent fill-accent" />, active: true, dark: true },
              { label: "FREELANCER", icon: <User className="w-3 h-3 text-muted-foreground/40" />, active: false },
              { label: "AGENCY", icon: <Building2 className="w-3 h-3 text-muted-foreground/40" />, active: false }
            ].map((header, i) => (
              <div 
                key={i} 
                className={`relative px-[1.5vw] py-6 flex items-center h-[100px] ${header.dark ? 'bg-primary text-white' : 'bg-background/80 backdrop-blur-xl text-muted-foreground'}`}
              >
                <div className="flex items-center gap-2">
                  <span className="label font-bold tracking-[0.2em] text-[10px] xl:text-[11px] uppercase">
                    {header.label}
                  </span>
                  {header.icon}
                </div>
                {header.active && activeRow !== null && (
                  <motion.div 
                    layoutId="headerLine"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-accent"
                    transition={{ duration: 0.25 }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Table Body (Vertical Rails) */}
          <div className="grid grid-cols-[1.2fr_2fr_2fr_2fr] gap-0 relative">
            
            {/* Track 1: Criteria */}
            <motion.div style={{ y: col1Y }} className="flex flex-col">
              {comparisonData.map((item, idx) => (
                <div 
                  key={idx} 
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`compare-row-trigger flex flex-col justify-center px-[1.5vw] h-[160px] border-b border-primary/5 transition-colors duration-300
                    ${(activeRow === idx || hoveredRow === idx) ? 'bg-primary/[0.04]' : idx % 2 === 0 ? 'bg-primary/[0.01]' : 'bg-transparent'}`}
                >
                  <span className="label font-black text-primary text-[12px] tracking-[0.1em]">{item.criterion}</span>
                </div>
              ))}
            </motion.div>

            {/* Track 2: Anton (Hero) */}
            <motion.div style={{ y: col2Y }} className="flex flex-col relative z-10">
              {comparisonData.map((item, idx) => (
                <motion.div 
                  key={idx}
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`flex flex-col justify-center px-[1.5vw] h-[160px] border-b border-primary/10 transition-all duration-300
                    ${(activeRow === idx || hoveredRow === idx) 
                      ? 'bg-accent/5 border-l-2 border-r-2 border-accent/20 scale-[1.01] shadow-2xl z-20' 
                      : idx % 2 === 0 ? 'bg-primary/[0.03]' : 'bg-primary/[0.01]'}`}
                >
                  <p className="body-text text-primary font-bold leading-tight">
                    {item.me}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Track 3: Freelancer */}
            <motion.div style={{ y: col3Y }} className="flex flex-col">
              {comparisonData.map((item, idx) => (
                <div 
                  key={idx} 
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`flex flex-col justify-center px-[1.5vw] h-[160px] border-b border-primary/5 transition-colors duration-300 opacity-60
                    ${(activeRow === idx || hoveredRow === idx) ? 'bg-primary/[0.04] opacity-100' : idx % 2 === 0 ? 'bg-primary/[0.01]' : 'bg-transparent'}`}
                >
                  <p className="body-text text-muted-foreground italic leading-tight">
                    {item.freelancer}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Track 4: Agency */}
            <motion.div style={{ y: col4Y }} className="flex flex-col">
              {comparisonData.map((item, idx) => (
                <div 
                  key={idx} 
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`flex flex-col justify-center px-[1.5vw] h-[160px] border-b border-primary/5 transition-colors duration-300 opacity-60
                    ${(activeRow === idx || hoveredRow === idx) ? 'bg-primary/[0.04] opacity-100' : idx % 2 === 0 ? 'bg-primary/[0.01]' : 'bg-transparent'}`}
                >
                  <p className="body-text text-muted-foreground italic leading-tight">
                    {item.agency}
                  </p>
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
                <div className="tier-badge w-12 h-12 md:w-[3.5vw] md:h-[3.5vw] rounded-full bg-primary text-white flex items-center justify-center font-bold heading-md text-xl">1</div>
              </div>
              <div className="tier-info pr-[6vw] mb-[4vh] md:mb-0">
                <span className="tier-name heading-md text-primary block mb-[2vh]">Fast Launch Starter</span>
                <span className="tier-desc body-text text-muted-foreground block mb-[4vh]">A focused launch for small service businesses needing immediate results.</span>
                <div className="feature-tags flex flex-wrap gap-[1vw]">
                  <span className="feature-tag tag border border-primary/10 px-3 py-1 rounded-md">Landing Page</span>
                  <span className="feature-tag tag border border-primary/10 px-3 py-1 rounded-md">Essential SEO</span>
                </div>
              </div>
              <div className="tier-details pr-[6vw] mb-[4vh] md:mb-0 space-y-[1.5vh]">
                <span className="detail-label label text-muted-foreground opacity-30">RESOURCES</span>
                {["One high-converting landing page", "Mobile-optimized design", "Lead form setup", "On-page SEO fundamentals"].map((item, i) => (
                  <div key={i} className="detail-item body-text flex items-center gap-[1vw]">
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="tier-action flex flex-col items-start gap-[4vh]">
                <div className="price-lockup flex flex-col">
                  <span className="label line-through opacity-30">$900</span>
                  <div className="flex items-baseline gap-2">
                    <span className="amount heading-md text-4xl lg:text-5xl text-primary">$697</span>
                    <span className="period label opacity-40">one-time</span>
                  </div>
                </div>
                <Button className="btn-select rounded-full btn border border-primary text-primary h-12 md:h-[4.5vw] px-8 hover:bg-primary hover:text-white transition-all">Get Started</Button>
              </div>
            </div>

            <div className="pricing-row grid grid-cols-1 md:grid-cols-[80px_2fr_1.5fr_1fr] py-[8vh] border-b border-primary/10 items-start bg-primary/[0.03] reveal-text reveal-delay-1 relative">
              <div className="mb-[2vh] md:mb-0">
                <div className="tier-badge w-12 h-12 md:w-[3.5vw] md:h-[3.5vw] rounded-full bg-accent text-white flex items-center justify-center font-bold heading-md text-xl">2</div>
              </div>
              <div className="tier-info pr-[6vw] mb-[4vh] md:mb-0">
                <div className="flex items-center gap-[1.5vw] mb-[2vh]">
                  <span className="tier-name heading-md text-primary">Local Leads Pro</span>
                  <span className="tag bg-primary text-white px-3 py-1 rounded-full">Recommended</span>
                </div>
                <span className="tier-desc body-text text-muted-foreground block mb-[4vh]">Our flagship multi-page solution built for dominant local SEO presence.</span>
              </div>
              <div className="tier-details pr-[6vw] mb-[4vh] md:mb-0 space-y-[1.5vh]">
                <span className="detail-label label text-muted-foreground opacity-30">RESOURCES</span>
                {["5-7 High-intent pages", "Service Area pages", "Reviews integration", "Advanced CRM Sync", "Local SEO optimization"].map((item, i) => (
                  <div key={i} className="detail-item body-text flex items-center gap-[1vw]">
                    <div className="w-1 h-1 rounded-full bg-accent" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="tier-action flex flex-col items-start gap-[4vh]">
                <div className="price-lockup flex flex-col">
                  <span className="label line-through opacity-30">$1500</span>
                  <div className="flex items-baseline gap-2">
                    <span className="amount heading-md text-4xl lg:text-5xl text-primary">$1197</span>
                    <span className="period label opacity-40">one-time</span>
                  </div>
                </div>
                <Button className="btn-select rounded-full btn bg-accent text-white h-12 md:h-[4.5vw] px-8 hover:scale-[1.05] transition-transform shadow-xl shadow-accent/20">Select Plan</Button>
              </div>
            </div>

            <div className="pricing-row grid grid-cols-1 md:grid-cols-[80px_2fr_1.5fr_1fr] py-[8vh] border-b border-primary/10 items-start hover:bg-primary/[0.02] transition-colors reveal-text reveal-delay-2">
              <div className="mb-[2vh] md:mb-0">
                <div className="tier-badge w-12 h-12 md:w-[3.5vw] md:h-[3.5vw] rounded-full bg-primary text-white flex items-center justify-center font-bold heading-md text-xl">3</div>
              </div>
              <div className="tier-info pr-[6vw] mb-[4vh] md:mb-0">
                <span className="tier-name heading-md text-primary block mb-[2vh]">Growth Sync</span>
                <span className="tier-desc body-text text-muted-foreground block mb-[4vh]">Ongoing maintenance and conversion optimization for scaling businesses.</span>
              </div>
              <div className="tier-details pr-[6vw] mb-[4vh] md:mb-0 space-y-[1.5vh]">
                <span className="detail-label label text-muted-foreground opacity-30">RESOURCES</span>
                {["Hosting & Maintenance", "Monthly content tweaks", "UX performance audit", "Priority tech support"].map((item, i) => (
                  <div key={i} className="detail-item body-text flex items-center gap-[1vw]">
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="tier-action flex flex-col items-start gap-[4vh]">
                <div className="price-lockup flex flex-col">
                  <span className="label opacity-40">Setup from $700</span>
                  <div className="flex items-baseline gap-2">
                    <span className="amount heading-md text-3xl lg:text-4xl text-primary">+$129</span>
                    <span className="period label opacity-40">/mo.</span>
                  </div>
                </div>
                <Button className="btn-select rounded-full btn border border-primary text-primary h-12 md:h-[4.5vw] px-8 hover:bg-primary hover:text-white transition-all">Contact Sales</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-[20vh] border-t border-primary/5 bg-background relative z-10" id="contact">
        <div className="w-full px-[6vw]">
          <div className="bg-primary text-white p-12 md:p-[8vw] text-center max-w-[1200px] mx-auto rounded-3xl md:rounded-[4vw] shadow-[0_4vw_10vw_-2vw_rgba(29,38,37,0.3)] relative overflow-hidden reveal-text">
            <div className="relative z-10 space-y-8 md:space-y-[6vh]">
              <h2 className="heading-lg text-white leading-[0.9] tracking-tighter">Ready to Double Your <br />Plumbing Leads?</h2>
              <Button asChild className="bg-accent text-white hover:bg-white hover:text-primary transition-all rounded-full btn h-16 md:h-[7vw] px-12 md:px-[5vw] shadow-2xl group">
                <Link href="https://calendly.com" target="_blank" className="flex items-center gap-4 md:gap-[1.5vw]">
                  Book My Strategy Call
                  <ArrowRight className="w-6 h-6 md:w-[1.8vw] md:h-[1.8vw] group-hover:translate-x-1 transition-transform" />
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
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white heading-md">J</div>
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

export default Home;
