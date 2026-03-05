'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SiteShowcaseSection } from '@/components/SiteShowcaseSection';
import { ProcessSection } from '@/components/ProcessSection';
import { ScrollRevealHeading } from '@/components/ScrollRevealHeading';
import { LuminaInteractiveList } from '@/components/ui/lumina-interactive-list';
import Link from 'next/link';
import ShaderShowcase from "@/components/ui/hero";
import { ArrowRight, Zap, Building2, User } from 'lucide-react';

const comparisonData = [
  {
    criterion: "NICHE FOCUS",
    me: "Exclusive Plumbing & Home Services",
    freelancer: "Generic Templates for Any Niche",
    agency: "Juggles dozens of niches at once"
  },
  {
    criterion: "STRATEGY",
    me: "12+ Years in Local Lead Gen",
    freelancer: "Pretty Sites with No Strategy",
    agency: "No strategy owner; split teams"
  },
  {
    criterion: "STRUCTURE",
    me: "Conversion-First Plumbing Layouts",
    freelancer: "Unproven Structural Patterns",
    agency: "Same template for every client"
  },
  {
    criterion: "PRIMARY GOAL",
    me: "Calls & Form Submissions",
    freelancer: "Colors, Fonts & Visuals",
    agency: "Obsesses over traffic & clicks"
  },
  {
    criterion: "SCALING",
    me: "City-Specific Ad Landing Pages",
    freelancer: "Hard to Scale for Paid Traffic",
    agency: "Hard to scale; needs rebuilds"
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

  const col1Y = useTransform(smoothProgress, [0.1, 0.4], [0, 0]);
  const col2Y = useTransform(smoothProgress, [0.1, 0.4], [180, 0]); 
  const col3Y = useTransform(smoothProgress, [0.1, 0.4], [90, 0]);  
  const col4Y = useTransform(smoothProgress, [0.1, 0.4], [180, 0]); 

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
      <LuminaInteractiveList />
      <SiteShowcaseSection />
      <ProcessSection />

      {/* Editorial Comparison Table Section */}
      <section 
        ref={sectionRef} 
        className="relative py-[25vh] z-10 bg-[#F6F5EF] overflow-hidden w-full" 
        id="about"
      >
        <div className="w-full">
          
          <div className="mb-[15vh] px-[8vw]">
            <ScrollRevealHeading as="h2" className="heading-lg text-primary tracking-tighter">
              Integrated.
            </ScrollRevealHeading>
            <div className="flex items-center gap-4">
               <em className="accent-italic lowercase text-[4vw]">Editorial Precision.</em>
            </div>
          </div>

          {/* Table Headers */}
          <div className="sticky top-[100px] z-30 w-full border-b border-[#E3E0D6] bg-[#F6F5EF]/90 backdrop-blur-md">
            <div className="grid grid-cols-[1.2fr_2fr_1.8fr_1.8fr] gap-0 px-0">
              {[
                { label: "CRITERIA", active: false },
                { label: "ANTON KOLESNIKOV", active: true, dark: true },
                { label: "FREELANCER", active: false },
                { label: "AGENCY", active: false }
              ].map((header, i) => (
                <div 
                  key={i} 
                  className={`relative flex items-center h-[9vh] min-h-[80px] transition-colors duration-300
                    ${i === 0 ? 'pl-[8vw] pr-[3vw]' : i === 3 ? 'pr-[8vw] pl-[2.5vw]' : 'px-[2.5vw]'}
                    ${header.dark && (activeRow !== null || hoveredRow !== null) ? 'bg-white' : ''}
                  `}
                >
                  <span className={`text-[0.7vw] min-text-[12px] font-semibold tracking-[0.16em] uppercase truncate transition-colors duration-300
                    ${header.active && (activeRow !== null || hoveredRow !== null) ? 'text-primary' : 'text-[#9BA3A7]'}
                  `}>
                    {header.label}
                  </span>
                  {header.active && (activeRow !== null || hoveredRow !== null) && (
                    <motion.div 
                      layoutId="headerUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Table Body */}
          <div className="grid grid-cols-[1.2fr_2fr_1.8fr_1.8fr] gap-0 relative">
            <motion.div style={{ y: col1Y }} className="flex flex-col">
              {comparisonData.map((item, idx) => (
                <div 
                  key={idx} 
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`compare-row-trigger flex flex-col justify-center pl-[8vw] pr-[3vw] h-[9vh] min-h-[80px] border-b border-[#E3E0D6] transition-all duration-300 relative
                    ${(activeRow === idx || hoveredRow === idx) ? 'bg-white shadow-[0_16px_40px_rgba(0,0,0,0.06)] z-20' : idx % 2 === 0 ? 'bg-[#F9F8F3]' : 'bg-[#F6F5EF]'}`}
                >
                  {(activeRow === idx || hoveredRow === idx) && (
                    <motion.div 
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent" 
                    />
                  )}
                  <span className={`text-[0.75vw] min-text-[13px] font-medium tracking-[0.18em] uppercase truncate transition-colors duration-300
                    ${(activeRow === idx || hoveredRow === idx) ? 'text-primary' : 'text-[#7A858A]'}
                  `}>
                    {item.criterion}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div style={{ y: col2Y }} className="flex flex-col relative z-10">
              {comparisonData.map((item, idx) => (
                <motion.div 
                  key={idx}
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                  whileHover={{ y: -2 }}
                  className={`flex flex-col justify-center px-[2.5vw] h-[9vh] min-h-[80px] border-b border-[#E3E0D6] transition-all duration-300
                    ${(activeRow === idx || hoveredRow === idx) 
                      ? 'bg-white shadow-[0_16px_40px_rgba(0,0,0,0.06)] scale-[1.04] z-20 border-accent/20' 
                      : idx % 2 === 0 ? 'bg-[#F9F8F3]' : 'bg-[#F6F5EF]'}`}
                >
                  <p className={`text-[1.2vw] min-text-[18px] font-medium leading-tight truncate transition-colors duration-300
                    ${(activeRow === idx || hoveredRow === idx) ? 'text-[#111D22]' : 'text-[#1A2C32]'}
                  `}>
                    {item.me}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div style={{ y: col3Y }} className="flex flex-col">
              {comparisonData.map((item, idx) => (
                <div 
                  key={idx} 
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`flex flex-col justify-center px-[2.5vw] h-[9vh] min-h-[80px] border-b border-[#E3E0D6] transition-all duration-300
                    ${(activeRow === idx || hoveredRow === idx) 
                      ? 'bg-white shadow-[0_16px_40px_rgba(0,0,0,0.06)] scale-[1.01] z-20 opacity-100' 
                      : idx % 2 === 0 ? 'bg-[#F9F8F3] opacity-80' : 'bg-[#F6F5EF] opacity-80'}`}
                >
                  <p className={`text-[1.1vw] min-text-[16px] font-normal leading-tight truncate transition-opacity duration-300
                    ${(activeRow === idx || hoveredRow === idx) ? 'text-[#8FA0A5] opacity-85' : 'text-[#8FA0A5]'}
                  `}>
                    {item.freelancer}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div style={{ y: col4Y }} className="flex flex-col">
              {comparisonData.map((item, idx) => (
                <div 
                  key={idx} 
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`flex flex-col justify-center pr-[8vw] pl-[2.5vw] h-[9vh] min-h-[80px] border-b border-[#E3E0D6] transition-all duration-300
                    ${(activeRow === idx || hoveredRow === idx) 
                      ? 'bg-white shadow-[0_16px_40px_rgba(0,0,0,0.06)] scale-[1.01] z-20 opacity-100' 
                      : idx % 2 === 0 ? 'bg-[#F9F8F3] opacity-80' : 'bg-[#F6F5EF] opacity-80'}`}
                >
                  <p className={`text-[1.1vw] min-text-[16px] font-normal leading-tight truncate transition-opacity duration-300
                    ${(activeRow === idx || hoveredRow === idx) ? 'text-[#8FA0A5] opacity-85' : 'text-[#8FA0A5]'}
                  `}>
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
          <header className="mb-[15vh]">
            <ScrollRevealHeading as="h2" className="heading-xl text-primary mb-[5vh]">
              PRICING PLANS
            </ScrollRevealHeading>
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

            <div className="pricing-row grid grid-cols-1 md:grid-cols-[80px_2fr_1.5fr_1fr] py-[8vh] border-b border-primary/10 items-start hover:bg-primary/[0.02] transition-colors">
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

            <div className="pricing-row grid grid-cols-1 md:grid-cols-[80px_2fr_1.5fr_1fr] py-[8vh] border-b border-primary/10 items-start bg-primary/[0.03] relative">
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

            <div className="pricing-row grid grid-cols-1 md:grid-cols-[80px_2fr_1.5fr_1fr] py-[8vh] border-b border-primary/10 items-start hover:bg-primary/[0.02] transition-colors">
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
          <div className="bg-primary text-white p-12 md:p-[8vw] text-center max-w-[1200px] mx-auto rounded-3xl md:rounded-[4vw] shadow-[0_4vw_10vw_-2vw_rgba(29,38,37,0.3)] relative overflow-hidden">
            <div className="relative z-10 space-y-8 md:space-y-[6vh]">
              <ScrollRevealHeading as="h2" className="heading-lg text-white leading-[0.9] tracking-tighter">
                Ready to Double Your Plumbing Leads?
              </ScrollRevealHeading>
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
