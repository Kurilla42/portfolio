'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SiteShowcaseSection } from '@/components/SiteShowcaseSection';
import { ProcessSection } from '@/components/ProcessSection';
import Link from 'next/link';
import ShaderShowcase from "@/components/ui/hero";
import { ArrowRight, Zap, AlertTriangle, Building2 } from 'lucide-react';

const comparisonData = [
  {
    criterion: "Niche expertise",
    whoTheyServe: "Industry Specialization",
    me: [
      "Exclusive **Plumbing & Home Service** focus",
      "Understands **US-specific** seasonality and owner pains"
    ],
    freelancer: [
      "Takes on **any niche** (cafés, courses, retail)",
      "Uses **generic templates** for every client"
    ],
    agency: [
      "Juggles **dozens of niches** at once",
      "Relies on generic **'best practices'**"
    ]
  },
  {
    criterion: "12 years in marketing",
    whoTheyServe: "Strategic Background",
    me: [
      "**12+ years** in digital lead generation",
      "SEO and Ads built **directly** into site structure"
    ],
    freelancer: [
      "Builds **'pretty business cards'**",
      "No real **lead tracking** strategy"
    ],
    agency: [
      "Project split between **siloed teams**",
      "No single **strategy owner** for your goals"
    ]
  },
  {
    criterion: "Battle‑tested templates",
    whoTheyServe: "Structural Integrity",
    me: [
      "Conversion-optimized **plumbing-first** layouts",
      "Proven **trust triggers** and local offers"
    ],
    freelancer: [
      "Builds every site **from scratch**",
      "Uses **unproven** structural patterns"
    ],
    agency: [
      "Same **industry template** for every client",
      "Site ends up looking like **everyone else's**"
    ]
  },
  {
    criterion: "Focus on leads",
    whoTheyServe: "Growth Metric",
    me: [
      "Design serves **calls & form submissions**",
      "**Strategic CTA** and guarantee placement"
    ],
    freelancer: [
      "Talks mostly about **colors and fonts**",
      "Vague logic on **conversion growth**"
    ],
    agency: [
      "Obsesses over **traffic and clicks**",
      "Main CTAs and forms are often **hidden**"
    ]
  },
  {
    criterion: "Ready for ads & scaling",
    whoTheyServe: "Ad Readiness",
    me: [
      "**Service & City** pages ready from Day 1",
      "Optimized for **scaling local campaigns**"
    ],
    freelancer: [
      "Generic pages **hard to scale**",
      "Structure not ready for **paid traffic**"
    ],
    agency: [
      "No **dedicated landing pages** for ads",
      "Needs **rebuilds** for every new campaign"
    ]
  }
];

export function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Column Alignment Motion (t=0 to t=1)
  const criteriaY = useTransform(smoothProgress, [0.1, 0.4], [0, 0]);
  const meY = useTransform(smoothProgress, [0.1, 0.4], [180, 0]);
  const freelancerY = useTransform(smoothProgress, [0.1, 0.4], [90, 0]);
  const agencyY = useTransform(smoothProgress, [0.1, 0.4], [180, 0]);

  const criteriaParallax = useTransform(smoothProgress, [0, 1], [0, 10]);
  const meParallax = useTransform(smoothProgress, [0, 1], [0, 5]);
  const freelancerParallax = useTransform(smoothProgress, [0, 1], [0, 15]);
  const agencyParallax = useTransform(smoothProgress, [0, 1], [0, 12]);

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
      {/* Hero Section */}
      <ShaderShowcase />

      {/* Showcase Section */}
      <SiteShowcaseSection />

      {/* Process Section */}
      <ProcessSection />

      {/* Comparison Section (About Block) */}
      <section 
        ref={sectionRef} 
        className="relative py-[20vh] z-10 bg-background overflow-hidden" 
        id="about"
      >
        <div className="w-full px-[8vw]">
          
          {/* Section Header */}
          <div className="mb-[12vh]">
            <h2 className="heading-lg text-primary tracking-tighter reveal-text">
              Fully integrated. <br />
              <em className="accent-italic">Best in class.</em>
            </h2>
          </div>

          {/* Sticky Table Header */}
          <div className="sticky top-[100px] z-30 grid grid-cols-[16fr_28fr_28fr_28fr] gap-[2vw] mb-[8vh]">
            {[
              { label: "CRITERIA", color: "text-muted-foreground", id: 0 },
              { label: "ANTON KOLESNIKOV", color: "text-white", bg: "bg-primary", id: 1, icon: <Zap className="w-4 h-4 text-accent fill-accent" /> },
              { label: "TYPICAL FREELANCER", color: "text-muted-foreground", id: 2 },
              { label: "TRADITIONAL AGENCY", color: "text-muted-foreground", id: 3, icon: <Building2 className="w-4 h-4 text-muted-foreground" /> }
            ].map((header, i) => (
              <div 
                key={i} 
                className={`relative overflow-hidden border border-primary/5 rounded-2xl px-[1.5vw] h-[80px] flex items-center shadow-sm ${header.bg || 'bg-white/80 backdrop-blur-xl'}`}
              >
                <div className="flex items-center gap-2">
                  <span className={`label font-bold uppercase ${header.color} text-[10px] xl:text-[11px]`}>
                    {header.label}
                  </span>
                  {header.icon}
                </div>
                
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
          <div className="grid grid-cols-[16fr_28fr_28fr_28fr] gap-[2vw] relative">
            
            {/* Column 1: Criteria */}
            <motion.div style={{ y: criteriaY, translateY: criteriaParallax }} className="flex flex-col gap-[6vh]">
              {comparisonData.map((item, idx) => (
                <div 
                  key={idx} 
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`compare-row-trigger transition-all duration-300 bg-white border border-primary/5 rounded-2xl px-[1.5vw] py-[3vh] h-[30vh] flex flex-col justify-center overflow-hidden
                    ${(activeRow === idx || hoveredRow === idx) ? 'ring-1 ring-primary/10 shadow-lg scale-[1.01] brightness-[1.03]' : 'shadow-sm opacity-90'}`}
                >
                  <h3 className="heading-md text-primary text-base xl:text-lg mb-2 line-clamp-2">{item.criterion}</h3>
                  <p className="body-text text-muted-foreground opacity-70">
                    {item.whoTheyServe}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Column 2: Anton Kolesnikov */}
            <motion.div style={{ y: meY, translateY: meParallax }} className="flex flex-col gap-[6vh]">
              {comparisonData.map((item, idx) => (
                <motion.div 
                  key={idx}
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                  whileHover={{ scale: 1.04, y: -2 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className={`transition-all duration-300 bg-white border-2 rounded-2xl px-[1.5vw] py-[3vh] h-[30vh] flex flex-col justify-center relative group overflow-hidden
                    ${(activeRow === idx || hoveredRow === idx) 
                      ? 'border-accent bg-accent/5 shadow-2xl z-10 scale-[1.02]' 
                      : 'border-primary/10 shadow-xl opacity-90'}`}
                >
                  <div className="overflow-y-auto pr-2 scrollbar-hide">
                    {item.me.map((point, pIdx) => (
                      <p 
                        key={pIdx} 
                        className="body-text text-primary font-medium leading-relaxed mb-4 last:mb-0"
                        dangerouslySetInnerHTML={{ 
                          __html: point.replace(/\*\*(.*?)\*\*/g, '<span class="text-primary font-bold">$1</span>') 
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Column 3: Typical Freelancer */}
            <motion.div style={{ y: freelancerY, translateY: freelancerParallax }} className="flex flex-col gap-[6vh]">
              {comparisonData.map((item, idx) => (
                <div 
                  key={idx} 
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`transition-all duration-300 bg-white/40 border border-primary/5 rounded-2xl px-[1.5vw] py-[3vh] h-[30vh] flex flex-col justify-center grayscale-50 overflow-hidden
                    ${(activeRow === idx || hoveredRow === idx) 
                      ? 'opacity-100 scale-[1.01] brightness-[1.03] grayscale-0' 
                      : 'opacity-50'}
                    hover:bg-red-50/10 hover:border-red-200`}
                >
                  <div className="overflow-y-auto pr-2 scrollbar-hide">
                    {item.freelancer.map((point, pIdx) => (
                      <p 
                        key={pIdx} 
                        className="body-text text-muted-foreground leading-relaxed italic mb-4 last:mb-0"
                        dangerouslySetInnerHTML={{ 
                          __html: point.replace(/\*\*(.*?)\*\*/g, '<span class="text-muted-foreground font-semibold">$1</span>') 
                        }}
                      />
                    ))}
                  </div>
                  {hoveredRow === idx && (
                    <motion.div 
                      initial={{ x: -2 }}
                      animate={{ x: [2, -2, 2] }}
                      transition={{ duration: 0.1, repeat: 2 }}
                      className="absolute bottom-4 right-6 text-red-400 opacity-20"
                    >
                      <AlertTriangle className="w-4 h-4" />
                    </motion.div>
                  )}
                </div>
              ))}
            </motion.div>

            {/* Column 4: Traditional Agency */}
            <motion.div style={{ y: agencyY, translateY: agencyParallax }} className="flex flex-col gap-[6vh]">
              {comparisonData.map((item, idx) => (
                <div 
                  key={idx} 
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`transition-all duration-300 bg-white/40 border border-primary/5 rounded-2xl px-[1.5vw] py-[3vh] h-[30vh] flex flex-col justify-center grayscale-50 overflow-hidden
                    ${(activeRow === idx || hoveredRow === idx) 
                      ? 'opacity-100 scale-[1.01] brightness-[1.03] grayscale-0' 
                      : 'opacity-50'}
                    hover:bg-blue-50/10 hover:border-blue-200`}
                >
                  <div className="overflow-y-auto pr-2 scrollbar-hide">
                    {item.agency.map((point, pIdx) => (
                      <p 
                        key={pIdx} 
                        className="body-text text-muted-foreground leading-relaxed italic mb-4 last:mb-0"
                        dangerouslySetInnerHTML={{ 
                          __html: point.replace(/\*\*(.*?)\*\*/g, '<span class="text-muted-foreground font-semibold">$1</span>') 
                        }}
                      />
                    ))}
                  </div>
                  {hoveredRow === idx && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.2 }}
                      className="absolute bottom-4 right-6 text-blue-400"
                    >
                      <Building2 className="w-4 h-4" />
                    </motion.div>
                  )}
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
