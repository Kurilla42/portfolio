'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SiteShowcaseSection } from '@/components/SiteShowcaseSection';
import { HighlightWipeHeading } from '@/components/HighlightWipeHeading';
import { LuminaInteractiveList } from '@/components/ui/lumina-interactive-list';
import { ExperienceTextSection } from '@/components/ExperienceTextSection';
import ShaderShowcase from "@/components/ui/hero";
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
  { number: "DAY 04", title: "Launch & Sync" },
  { number: "DAY 05", title: "Scale & Support" }
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
  
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  return (
    <div className="min-h-screen bg-[#eaeaf2]">
      {/* HERO & EXPERIENCE SECTION */}
      <div ref={parallaxRef} className="relative w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div 
            style={{ y: backgroundY }}
            className="absolute inset-0 h-[120%] -top-[10%]" 
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
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_50%,rgba(11,11,11,1)_75%)]" />
        </div>

        <div className="relative z-10">
          <section className="relative h-screen w-full">
            <ShaderShowcase />
          </section>
          <section className="relative min-h-[80vh] py-[10vh] md:py-[15vh]">
            <ExperienceTextSection />
          </section>
        </div>
      </div>

      {/* MONOLITH SECTION */}
      <section className="relative z-20">
        <LuminaInteractiveList />
      </section>
      
      {/* SHOWCASE SECTION */}
      <SiteShowcaseSection />

      {/* STEPS SECTION */}
      <section className="relative py-[10vh] md:py-[20vh] z-30 overflow-hidden w-full" id="steps">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://i.ibb.co/Y7Rzv80G/1.jpg"
            alt="Steps Background"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 w-full px-6 md:px-[8vw]">
          <div className="grid grid-cols-12 gap-10 md:gap-[4vw] items-start">
            <div className="col-span-12 lg:col-span-5 flex flex-col">
              <h2 className="text-3xl md:text-[3vw] heading-md text-white uppercase leading-[1.1] mb-8 md:mb-[6vh]">
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
                <div className="flex flex-col gap-4 w-full md:max-w-[22vw]">
                  <p className="text-[11px] md:text-[12px] text-white/50 leading-relaxed uppercase tracking-[0.15em] font-mono">
                    My goal has always been to elevate everyday interactions into something more meaningful and crucially, quietly threading in moments of joy.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-7 flex flex-col pt-0 lg:pt-[10vh]">
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
                    className="flex items-center justify-between py-6 md:py-[1.5vh] border-b border-white/20 group hover:bg-white/5 transition-colors duration-300 cursor-default"
                  >
                    <div className="flex items-baseline gap-6 md:gap-[2vw] overflow-hidden">
                      <span className="font-mono text-sm md:text-[1vw] text-white/30 font-bold uppercase tracking-wider group-hover:text-white/60 transition-colors duration-300">
                        {step.number}
                      </span>
                      <div className="h-8 md:h-[2.4vw] overflow-hidden">
                        <motion.div
                          variants={rollingTextVariants}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="flex flex-col"
                        >
                          <h3 className="text-xl md:text-[2vw] font-bold text-white uppercase tracking-tight h-8 md:h-[2.4vw] flex items-center">
                            {step.title}
                          </h3>
                          <h3 className="text-xl md:text-[2vw] font-bold text-white uppercase tracking-tight h-8 md:h-[2.4vw] flex items-center">
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

      {/* INFO SHOWCASE + DIFFERENCE TABLE */}
      <InfoShowcaseSection>
        <section className="relative py-[10vh] md:py-[20vh] z-30 overflow-hidden w-full" id="difference">
          <div className="w-full px-6 md:px-[8vw]">
            <div className="flex flex-col lg:flex-row justify-center items-end gap-[4vw] w-full">
              <motion.div 
                className="w-full lg:w-[61.2vw]"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {/* Mobile Header for Table */}
                <div className="lg:hidden mb-6">
                  <h2 className="text-3xl heading-md text-white uppercase leading-[1.1]">
                    THE DIFFERENCE
                  </h2>
                </div>

                <div className="w-full border-t border-b border-white/20 hidden lg:block">
                  <div className="grid grid-cols-[10.2vw_1fr_1fr] gap-0">
                    {[
                      { label: "CRITERIA", active: false },
                      { label: "ANTON KOLESNIKOV", active: true },
                      { label: "FREELANCER/AGENCY", active: false }
                    ].map((header, i) => (
                      <div 
                        key={header.label} 
                        className={`relative flex items-center py-[1.5vh] 
                          ${i === 0 ? 'pr-[3.4vw]' : 'px-[1.7vw]'}
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

                {/* Mobile version of the comparison */}
                <div className="flex flex-col lg:hidden space-y-8">
                  {comparisonData.map((item, idx) => (
                    <div key={idx} className="flex flex-col space-y-3 border-b border-white/10 pb-6">
                      <span className="text-[10px] font-mono text-accent uppercase tracking-widest">{item.criterion}</span>
                      <div className="bg-white/5 p-4 rounded-lg">
                        <span className="text-[10px] text-white/40 uppercase block mb-1">Anton Kolesnikov</span>
                        <p className="text-sm font-bold text-white">{item.me}</p>
                      </div>
                      <div className="p-4 border border-white/5 rounded-lg">
                        <span className="text-[10px] text-white/40 uppercase block mb-1">Freelancer/Agency</span>
                        <p className="text-sm font-medium text-white/60">{item.freelancer}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop version of the comparison */}
                <div className="hidden lg:flex flex-col relative">
                  {comparisonData.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      variants={itemVariants}
                      whileHover="hover"
                      initial="initial"
                      className="grid grid-cols-[10.2vw_25.5vw_25.5vw] gap-0 border-b border-white/20 items-stretch group cursor-default"
                    >
                      <div className="py-[1.5vh] pr-[3.4vw] flex items-center overflow-hidden">
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

                      <div className="py-[1.5vh] px-[1.7vw] bg-white/5 group-hover:bg-white/10 transition-colors duration-300 flex items-center overflow-hidden">
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

                      <div className="py-[1.5vh] px-[1.7vw] flex items-center overflow-hidden">
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
      </InfoShowcaseSection>

      {/* PRICING SECTION */}
      <VerticalPricingTabs />

      {/* FINAL CTA SECTION */}
      <section className="relative py-[15vh] md:py-[25vh] z-30 overflow-hidden w-full" id="contact">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://i.ibb.co/Gf1L4KfQ/generated-image-18.jpg"
            alt="Final CTA Background"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 w-full px-6 md:px-[8vw] flex flex-col items-center justify-center text-center">
          <div className="w-full md:max-w-[85vw] flex flex-col items-center">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.4, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="label text-white block mb-8 md:mb-[6vh] tracking-[0.2em] uppercase font-mono text-[10px] md:text-xs"
            >
              [ GET STARTED ]
            </motion.span>
            
            <HighlightWipeHeading 
              lines={["Ready to Double Your", "Plumbing Leads?"]}
              className="text-xl sm:text-2xl md:text-[3.0vw] font-black uppercase leading-[1.3] md:leading-[1.1] text-white items-center tracking-tighter"
              stagger={0.08}
              triggerOnce={true}
            />
            
            <p className="tag opacity-50 text-white mt-8 text-[10px] md:text-xs uppercase tracking-widest font-mono">
              Limited availability for monthly intakes.
            </p>
          </div>
        </div>
      </section>

      <footer className="py-[6vh] md:py-[10vh] bg-[#0b0b0b] relative z-40">
        <div className="w-full px-6 md:px-[6vw]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-[6vh]">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white/10 flex items-center justify-center text-white heading-md text-sm md:text-base">J</div>
              <span className="text-base md:heading-md text-white/80 font-bold uppercase tracking-tight">JobFlow Landing Pages</span>
            </div>
            <div className="tag text-white/40 text-center md:text-right text-[10px] md:text-xs font-mono uppercase tracking-[0.1em]">
              &copy; {new Date().getFullYear()} Anton Kolesnikov. Precision Engineered for Results.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
