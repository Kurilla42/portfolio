'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SiteShowcaseSection } from '@/components/SiteShowcaseSection';
import { ProcessSection } from '@/components/ProcessSection';
import { HighlightWipeHeading } from '@/components/HighlightWipeHeading';
import { LuminaInteractiveList } from '@/components/ui/lumina-interactive-list';
import { ExperienceTextSection } from '@/components/ExperienceTextSection';
import Link from 'next/link';
import ShaderShowcase from "@/components/ui/hero";
import { ArrowRight } from 'lucide-react';

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroCombinedRef = useRef<HTMLDivElement>(null);
  const [activeRow, setActiveRow] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroCombinedRef,
    offset: ["start start", "end end"]
  });

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
      {/* Combined Background Area for Hero and Experience */}
      <div ref={heroCombinedRef} className="relative">
        <ShaderShowcase progress={scrollYProgress} />
        <ExperienceTextSection />
      </div>

      {/* Horizontal Scroll Philosophy Section */}
      <LuminaInteractiveList />
      
      <SiteShowcaseSection />
      <ProcessSection />

      {/* Editorial Comparison Table Section */}
      <section 
        ref={sectionRef} 
        className="relative py-[15vh] z-10 bg-black overflow-hidden w-full" 
        id="about"
      >
        <div className="w-full">
          
          <div className="mb-[8vh] px-[8vw] flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h2 className="text-[3vw] heading-md text-white uppercase leading-[1.1]">
                THE DIFFERENCE. <br />PRECISION VS GENERAL.
              </h2>
              <p className="text-[1vw] body-text text-white/60 max-w-[30vw] mt-4 leading-relaxed">
                A side-by-side breakdown of why focus and strategy outperform generalist design every single time.
              </p>
            </div>
          </div>

          {/* Table Container */}
          <motion.div 
            className="px-[8vw]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Table Headers */}
            <div className="w-full border-t border-b border-white/20 mb-0">
              <div className="grid grid-cols-[1.2fr_2fr_1.8fr_1.8fr] gap-0">
                {[
                  { label: "CRITERIA", active: false },
                  { label: "ANTON KOLESNIKOV", active: true },
                  { label: "FREELANCER", active: false },
                  { label: "AGENCY", active: false }
                ].map((header, i) => (
                  <div 
                    key={i} 
                    className={`relative flex items-center py-[1.5vh] 
                      ${i === 0 ? 'pr-[3vw]' : 'px-[2.5vw]'}
                    `}
                  >
                    <span className={`text-[1vw] font-bold tracking-[0.2em] uppercase truncate transition-colors duration-300
                      ${header.active ? 'text-white' : 'text-white/30'}
                    `}>
                      {header.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Table Body */}
            <div className="flex flex-col relative">
              {comparisonData.map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className="grid grid-cols-[1.2fr_2fr_1.8fr_1.8fr] gap-0 border-b border-white/20 items-center compare-row-trigger group"
                >
                  {/* Criteria */}
                  <div className="py-[1.5vh] pr-[3vw] transition-all duration-300">
                    <span className="text-[0.9vw] font-bold tracking-[0.1em] uppercase text-white/40 group-hover:text-white">
                      {item.criterion}
                    </span>
                  </div>

                  {/* Anton */}
                  <div className="py-[1.5vh] px-[2.5vw] transition-all duration-300 bg-white/5 group-hover:bg-white/10">
                    <p className="text-[1vw] font-bold leading-tight truncate text-white">
                      {item.me}
                    </p>
                  </div>

                  {/* Freelancer */}
                  <div className="py-[1.5vh] px-[2.5vw] transition-all duration-300">
                    <p className="text-[1vw] font-medium leading-tight truncate text-white/40 group-hover:text-white/60">
                      {item.freelancer}
                    </p>
                  </div>

                  {/* Agency */}
                  <div className="py-[1.5vh] pl-[2.5vw] transition-all duration-300">
                    <p className="text-[1vw] font-medium leading-tight truncate text-white/40 group-hover:text-white/60">
                      {item.agency}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-[15vh] bg-[#eaeaf2] relative z-10" id="packages">
        <div className="w-full px-[8vw]">
          <header className="mb-[15vh]">
            <HighlightWipeHeading 
              lines={["PRICING PLANS"]}
              className="heading-xl text-primary mb-[5vh]"
            />
            <p className="body-text text-muted-foreground max-w-[45vw]">
              Choose a capacity level that fits your business stage. 
              Built for performance, scalability, and predictable lead flow.
            </p>
          </header>

          <div className="pricing-table border-t border-primary">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-[80px_2fr_1.5fr_1fr] py-[3vh] border-b border-primary text-muted-foreground label opacity-40">
              <span>Level</span>
              <span>Tier Specifications</span>
              <span>Included Resources</span>
              <span>Investment</span>
            </div>

            {/* Row 1 */}
            <div className="pricing-row grid grid-cols-1 md:grid-cols-[80px_2fr_1.5fr_1fr] py-[8vh] border-b border-primary items-start hover:bg-white/20 transition-colors">
              <div className="mb-[2vh] md:mb-0">
                <div className="tier-badge w-12 h-12 md:w-[3.5vw] md:h-[3.5vw] rounded-full bg-primary text-white flex items-center justify-center font-bold heading-md text-xl">1</div>
              </div>
              <div className="tier-info pr-[6vw] mb-[4vh] md:mb-0">
                <span className="tier-name heading-md text-primary block mb-[2vh]">Fast Launch Starter</span>
                <span className="tier-desc body-text text-muted-foreground block mb-[4vh]">A focused launch for small service businesses needing immediate results.</span>
                <div className="feature-tags flex flex-wrap gap-[1vw]">
                  <span className="feature-tag tag border border-primary px-3 py-1 rounded-md">Landing Page</span>
                  <span className="feature-tag tag border border-primary px-3 py-1 rounded-md">Essential SEO</span>
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

            {/* Row 2 */}
            <div className="pricing-row grid grid-cols-1 md:grid-cols-[80px_2fr_1.5fr_1fr] py-[8vh] border-b border-primary items-start bg-white/30 backdrop-blur-sm relative">
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

            {/* Row 3 */}
            <div className="pricing-row grid grid-cols-1 md:grid-cols-[80px_2fr_1.5fr_1fr] py-[8vh] border-b border-primary items-start hover:bg-white/20 transition-colors">
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
      <section className="py-[20vh] border-t border-primary/5 bg-[#eaeaf2] relative z-10" id="contact">
        <div className="w-full px-[6vw]">
          <div className="bg-primary text-white p-12 md:p-[8vw] text-center max-w-[1200px] mx-auto rounded-3xl md:rounded-[4vw] shadow-[0_4vw_10vw_-2vw_rgba(29,38,37,0.3)] relative overflow-hidden">
            <div className="relative z-10 space-y-8 md:space-y-[6vh]">
              <HighlightWipeHeading 
                lines={["Ready to Double Your", "Plumbing Leads?"]}
                className="heading-lg text-white leading-[0.9] tracking-tighter items-center"
              />
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
      <footer className="py-[10vh] border-t border-primary/5 bg-[#eaeaf2] relative z-10">
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
