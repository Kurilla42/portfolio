'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SiteShowcaseSection } from '@/components/SiteShowcaseSection';
import { HighlightWipeHeading } from '@/components/HighlightWipeHeading';
import { LuminaInteractiveList } from '@/components/ui/lumina-interactive-list';
import { ExperienceTextSection } from '@/components/ExperienceTextSection';
import Link from 'next/link';
import ShaderShowcase from "@/components/ui/hero";
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { VerticalPricingTabs } from '@/components/ui/vertical-pricing-tabs';
import { InfoShowcaseSection } from '@/components/InfoShowcaseSection';

const comparisonData = [
  {
    criterion: "NICHE FOCUS",
    me: "Exclusive Plumbing & Home Services",
    freelancer: "Generic Templates for Any Niche"
  },
  {
    criterion: "STRATEGY",
    me: "12+ Years in Local Lead Gen",
    freelancer: "Pretty Sites with No Strategy"
  },
  {
    criterion: "STRUCTURE",
    me: "Conversion-First Plumbing Layouts",
    freelancer: "Unproven Structural Patterns"
  },
  {
    criterion: "GOAL",
    me: "Calls & Form Submissions",
    freelancer: "Colors, Fonts & Visuals"
  },
  {
    criterion: "SCALING",
    me: "City-Specific Ad Landing Pages",
    freelancer: "Hard to Scale for Paid Traffic"
  }
];

const steps = [
  { number: "DAY 01", title: "Discovery" },
  { number: "DAY 02", title: "Wireframing" },
  { number: "DAY 03", title: "The Build" },
  { number: "DAY 04", title: "Launch & Sync" }
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

const rollingTextVariants = {
  initial: { y: 0 },
  hover: { y: '-50%' }
};

export default function Home() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  // Parallax logic
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  return (
    <div className="min-h-screen bg-[#eaeaf2]">
      {/* COMBINED HERO & EXPERIENCE BLOCK */}
      <div ref={parallaxRef} className="relative w-full overflow-hidden">
        {/* Shared Background Image with Parallax */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            style={{ y: backgroundY }}
            className="absolute inset-0 h-[120%]" 
          >
            <Image
              src="https://i.ibb.co/RTS1fr60/N5cohaa-Wu-Brrm5-Ozvud-HSkii-EXA.jpg"
              alt="Hero Background"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_50%,rgba(0,0,0,1)_75%)]" />
        </div>

        <div className="relative z-10">
          {/* 1. HERO SECTION */}
          <section className="relative h-screen w-full">
            <ShaderShowcase />
          </section>

          {/* 2. EXPERIENCE SECTION */}
          <section className="relative min-h-[80vh] py-[15vh]">
            <ExperienceTextSection />
          </section>
        </div>
      </div>

      {/* 3. MONOLITH SECTION */}
      <section className="relative z-20 shadow-[0_-20vh_20vh_-10vh_rgba(0,0,0,0.5)]">
        <LuminaInteractiveList />
      </section>
      
      {/* 4. SHOWCASE SECTION */}
      <SiteShowcaseSection />

      {/* 5. STEPS SECTION */}
      <section className="relative py-[20vh] z-30 bg-black overflow-hidden w-full" id="steps">
        <div className="w-full px-[8vw]">
          <div className="grid grid-cols-12 gap-[4vw] items-start">
            <div className="col-span-12 lg:col-span-5 flex flex-col">
              <h2 className="text-[3vw] heading-md text-white uppercase leading-[1.1] mb-[6vh]">
                SIMPLE STEPS
              </h2>
              <div className="flex flex-col gap-8">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full lg:w-[22vw] aspect-[16/10] overflow-hidden border border-white/10"
                >
                  <Image 
                    src="https://i.ibb.co/yFbMvrjt/j-GIDW70qyf-Bu-P6v8-UKUwum-U8-HGo.avif"
                    alt="Process illustration"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </motion.div>
                <div className="flex flex-col gap-4 max-w-[22vw]">
                  <p className="text-[12px] text-white/50 leading-relaxed uppercase tracking-[0.15em] font-mono">
                    My goal has always been to elevate everyday interactions into something more meaningful and crucially, quietly threading in moments of joy that catch us by surprise and stay with us for years to come.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7 flex flex-col pt-[10vh]">
              <motion.div 
                className="flex flex-col w-full border-t border-white/20"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover="hover"
                    initial="initial"
                    className="flex items-center justify-between py-[1.5vh] border-b border-white/20 group hover:bg-white/5 transition-colors duration-300 cursor-default"
                  >
                    <div className="flex items-baseline gap-[2vw] overflow-hidden">
                      <span className="font-mono text-[1vw] text-white/30 font-bold uppercase tracking-wider group-hover:text-white/60 transition-colors duration-300">
                        {step.number}
                      </span>
                      <div className="h-[2.4vw] overflow-hidden">
                        <motion.div
                          variants={rollingTextVariants}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="flex flex-col"
                        >
                          <h3 className="text-[2vw] font-bold text-white uppercase tracking-tight h-[2.4vw] flex items-center">
                            {step.title}
                          </h3>
                          <h3 className="text-[2vw] font-bold text-white uppercase tracking-tight h-[2.4vw] flex items-center">
                            {step.title}
                          </h3>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NEW INFO BLOCK */}
      <InfoShowcaseSection />

      {/* 7. DIFFERENCE TABLE SECTION */}
      <section className="relative py-[20vh] z-30 bg-black overflow-hidden w-full" id="difference">
        <div className="w-full px-[8vw]">
          <div className="flex flex-col lg:flex-row justify-center items-end gap-[4vw] w-full">
            <motion.div 
              className="w-[72vw]"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {/* Table Headers */}
              <div className="w-full border-t border-b border-white/20">
                <div className="grid grid-cols-[12vw_1fr_1fr] gap-0">
                  {[
                    { label: "CRITERIA", active: false },
                    { label: "ANTON KOLESNIKOV", active: true },
                    { label: "FREELANCER/AGENCY", active: false }
                  ].map((header, i) => (
                    <div 
                      key={header.label} 
                      className={`relative flex items-center py-[1.5vh] 
                        ${i === 0 ? 'pr-[4vw]' : 'px-[2vw]'}
                        ${header.active ? 'bg-white/5' : ''}
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
                    whileHover="hover"
                    initial="initial"
                    className="grid grid-cols-[12vw_30vw_30vw] gap-0 border-b border-white/20 items-stretch group cursor-default"
                  >
                    <div className="py-[1.5vh] pr-[4vw] flex items-center overflow-hidden">
                       <div className="h-[1.2vw] overflow-hidden">
                         <motion.div
                           variants={rollingTextVariants}
                           transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                           className="flex flex-col"
                         >
                           <span className="text-[1vw] font-bold tracking-[0.1em] uppercase text-white/40 group-hover:text-white transition-colors duration-300 h-[1.2vw] flex items-center">
                             {item.criterion}
                           </span>
                           <span className="text-[1vw] font-bold tracking-[0.1em] uppercase text-white h-[1.2vw] flex items-center">
                             {item.criterion}
                           </span>
                         </motion.div>
                       </div>
                    </div>

                    <div className="py-[1.5vh] px-[2vw] bg-white/5 group-hover:bg-white/10 transition-colors duration-300 flex items-center overflow-hidden">
                      <div className="h-[1.2vw] overflow-hidden w-full">
                         <motion.div
                           variants={rollingTextVariants}
                           transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                           className="flex flex-col"
                         >
                           <p className="text-[1vw] font-bold leading-tight truncate text-white h-[1.2vw] flex items-center">
                             {item.me}
                           </p>
                           <p className="text-[1vw] font-bold leading-tight truncate text-white h-[1.2vw] flex items-center">
                             {item.me}
                           </p>
                         </motion.div>
                       </div>
                    </div>

                    <div className="py-[1.5vh] px-[2vw] flex items-center overflow-hidden">
                      <div className="h-[1.2vw] overflow-hidden w-full">
                         <motion.div
                           variants={rollingTextVariants}
                           transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                           className="flex flex-col"
                         >
                           <p className="text-[1vw] font-medium leading-tight truncate text-white/40 group-hover:text-white/60 transition-colors duration-300 h-[1.2vw] flex items-center">
                             {item.freelancer}
                           </p>
                           <p className="text-[1vw] font-medium leading-tight truncate text-white h-[1.2vw] flex items-center">
                             {item.freelancer}
                           </p>
                         </motion.div>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="flex flex-col items-end text-right hidden lg:flex">
              <h2 className="text-[3vw] heading-md text-white uppercase leading-[1.1] mb-[2vh]">
                THE<br />DIFFERENCE
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PRICING SECTION */}
      <VerticalPricingTabs />

      {/* 9. FINAL CTA */}
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
