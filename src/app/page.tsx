'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { SiteShowcaseSection } from '@/components/SiteShowcaseSection';
import { HighlightWipeHeading } from '@/components/HighlightWipeHeading';
import { ExperienceTextSection } from '@/components/ExperienceTextSection';
import ShaderShowcase from "@/components/ui/hero";
import Image from 'next/image';
import { VerticalPricingTabs } from '@/components/ui/vertical-pricing-tabs';
import { InfoShowcaseSection } from '@/components/InfoShowcaseSection';
import { HeroCurtain } from '@/components/HeroCurtain';

const steps = [
  { number: "DAY 01", title: "Choose Your Service" },
  { number: "DAY 02", title: "Complete the Brief" },
  { number: "DAY 03", title: "Build the Landing Page" },
  { number: "DAY 04", title: "Test & Connect CRM" },
  { number: "DAY 05", title: "Deploy & Launch" }
];

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
    criterion: "NICHE SCALING",
    me: "City-Specific Ad Landing Pages",
    freelancer: "Hard to Scale for Paid Traffic"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const rollingTextVariants = {
  initial: { y: 0 },
  hover: { y: '-50%' }
};

export function Home() {
  const combinedRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [isLifted, setIsLifted] = useState(false);
  
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: combinedScroll } = useScroll({
    target: combinedRef,
    offset: ["start start", "end end"]
  });

  const bgY = useTransform(combinedScroll, [0, 1], ["0%", "25%"]);
  const bgScale = useTransform(combinedScroll, [0, 1], [1, 1.1]);

  useMotionValueEvent(heroScroll, "change", (latest) => {
    if (latest > 0.01 && !isLifted) {
      setIsLifted(true);
    }
  });

  const bgVideoUrl = "https://i.ibb.co/DD1rRjBJ/ezgif-com-video-to-gif-converter-1.gif";

  return (
    <div className="min-h-screen bg-[#eaeaf2]">
      <HeroCurtain isLifted={isLifted} />

      <div ref={combinedRef} className="relative z-0">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            style={{ y: bgY, scale: bgScale }}
            className="absolute -top-[20%] left-0 w-full h-[140%]"
          >
            <Image
              src={bgVideoUrl}
              alt="Scroll-reactive background"
              fill
              className="absolute inset-0 object-cover object-center"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent 85% to-black" />
          </motion.div>
        </div>

        <div ref={heroSectionRef} className="relative h-[135vh] w-full z-10">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ 
                opacity: isLifted ? 1 : 0, 
                scale: isLifted ? 1 : 0.98 
              }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 h-full w-full"
            >
              <ShaderShowcase isLifted={isLifted} />
            </motion.div>
          </div>
        </div>

        <div ref={parallaxRef} className="relative z-20">
          <section className="relative min-h-[100vh] py-[15vh] md:py-[20vh] overflow-hidden">
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,transparent_0%,black_65%)]" />
            
            <div className="relative z-10">
              <ExperienceTextSection />
            </div>
          </section>
        </div>
      </div>
      
      <SiteShowcaseSection />

      <section className="relative py-[10vh] md:py-[20vh] z-30 overflow-hidden w-full bg-black" id="steps">
        <div className="relative z-10 w-full px-6 md:px-[4vw]">
          <div className="grid grid-cols-12 gap-10 md:gap-[4vw] items-start relative">
            
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[18vw] h-[45vh] z-20 pointer-events-none hidden lg:block">
              <Image 
                src="https://i.ibb.co/NgHGBXj6/generated-image-16-removebg-preview.png"
                alt="Plumbing Specialist"
                fill
                className="object-contain object-center"
                unoptimized
              />
            </div>

            <div className="col-span-12 lg:col-span-5 flex flex-col">
              <h2 className="text-4xl sm:text-5xl md:text-[6vw] font-headline text-[#e0ded8] uppercase leading-[0.9] mb-8 tracking-tight">
                SIMPLE STEPS TO<br />GET YOUR SITE
              </h2>
              <p className="text-[1vw] text-[#e0ded8]/40 uppercase font-mono tracking-widest max-w-[25vw] leading-relaxed ml-[1vw]">
                No confusion, no delays. Just a simple process to get your site live
              </p>
            </div>

            <div className="col-span-12 lg:col-start-8 lg:col-span-5 flex flex-col pt-0 relative">
              <motion.div 
                className="flex flex-col w-full lg:w-fit border-t border-[#e0ded8]/20"
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
                    className="flex items-center justify-between py-6 md:py-[1.5vh] border-b border-[#e0ded8]/20 group hover:bg-[#e0ded8]/5 transition-colors duration-300 cursor-default w-full"
                  >
                    <div className="flex items-baseline gap-6 md:gap-[2vw] overflow-hidden pr-8">
                      <span className="font-mono text-sm md:text-[1vw] text-[#e0ded8]/30 font-bold uppercase tracking-wider group-hover:text-[#e0ded8]/60 transition-colors duration-300">
                        {step.number}
                      </span>
                      <div className="h-8 md:h-[2.4vw] overflow-hidden">
                        <motion.div
                          variants={rollingTextVariants}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="flex flex-col"
                        >
                          <h3 className="text-xl md:text-[2vw] font-sans font-black text-[#e0ded8] uppercase tracking-tight h-8 md:h-[2.4vw] flex items-center whitespace-nowrap">
                            {step.title}
                          </h3>
                          <h3 className="text-xl md:text-[2vw] font-sans font-black text-[#c7b684] uppercase tracking-tight h-8 md:h-[2.4vw] flex items-center whitespace-nowrap">
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

      <InfoShowcaseSection
        quote="MY GOAL HAS ALWAYS BEEN TO grow revenue for my clients. I build <span class='text-[#c7b684]'>high-converting</span> landing pages, uniquely crafted from user insights and proven conversion principles - always <span class='text-[#c7b684]'>setting you apart</span> from the competition"
      >
        <section className="relative pb-16 pt-8 z-30 overflow-hidden w-full" id="difference">
          <div className="w-full px-6 md:px-[4vw]">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-[4vw] w-full">
              <motion.div 
                className="w-full lg:w-[57.12vw]"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <div className="lg:hidden mb-6">
                  <h2 className="text-4xl sm:text-5xl md:text-[6vw] font-headline text-[#e0ded8] uppercase leading-[0.9] tracking-tight">
                    EXPLORE THE<br />DIFFERENCE
                  </h2>
                </div>

                <div className="w-full border-t border-b border-[#e0ded8]/20 hidden lg:block">
                  <div className="grid grid-cols-[15vw_21.06vw_21.06vw] gap-0">
                    {[
                      { label: "CRITERIA", active: false },
                      { label: "ANTON KOLESNIKOV", active: true },
                      { label: "FREELANCER/AGENCY", active: false }
                    ].map((header, i) => (
                      <div 
                        key={header.label} 
                        className={`relative flex items-center py-[1.5vh] 
                          ${i === 0 ? 'pr-[3.4vw]' : 'px-[1.7vw]'}
                          ${header.active ? 'bg-[#e0ded8]/5' : ''}
                        `}
                      >
                        <span className={`text-[1vw] font-bold tracking-[0.2em] uppercase truncate transition-colors duration-300
                          ${header.active ? 'text-[#e0ded8]' : 'text-[#e0ded8]/30'}
                        `}>
                          {header.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col lg:hidden space-y-8">
                  {comparisonData.map((item, idx) => (
                    <div key={idx} className="flex flex-col space-y-3 border-b border-[#e0ded8]/10 pb-6">
                      <span className="text-[10px] font-mono text-[#c7b684] uppercase tracking-widest">{item.criterion}</span>
                      <div className="bg-[#e0ded8]/5 p-4 rounded-lg">
                        <span className="text-[10px] text-[#e0ded8]/40 uppercase block mb-1">Anton Kolesnikov</span>
                        <p className="text-sm font-bold text-[#e0ded8]">{item.me}</p>
                      </div>
                      <div className="p-4 border border-[#e0ded8]/5 rounded-lg">
                        <span className="text-[10px] text-[#e0ded8]/40 uppercase block mb-1">Freelancer/Agency</span>
                        <p className="text-sm font-medium text-[#e0ded8]/60">{item.freelancer}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hidden lg:flex flex-col relative">
                  {comparisonData.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      variants={itemVariants}
                      whileHover="hover"
                      initial="initial"
                      className="grid grid-cols-[15vw_21.06vw_21.06vw] gap-0 border-b border-[#e0ded8]/20 items-stretch group cursor-default"
                    >
                      <div className="py-[1.5vh] pr-[3.4vw] flex items-center overflow-hidden">
                         <div className="h-[1.2vw] overflow-hidden">
                           <motion.div
                             variants={rollingTextVariants}
                             transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                             className="flex flex-col"
                           >
                             <span className="text-[1vw] font-bold tracking-[0.1em] uppercase text-[#e0ded8]/40 group-hover:text-[#e0ded8] transition-colors duration-300 h-[1.2vw] flex items-center">
                               {item.criterion}
                             </span>
                             <span className="text-[1vw] font-bold tracking-[0.1em] uppercase text-[#e0ded8] h-[1.2vw] flex items-center">
                               {item.criterion}
                             </span>
                           </motion.div>
                         </div>
                      </div>

                      <div className="py-[1.5vh] px-[1.7vw] bg-[#e0ded8]/5 group-hover:bg-[#e0ded8]/10 transition-colors duration-300 flex items-center overflow-hidden">
                        <div className="h-[1.2vw] overflow-hidden w-full">
                           <motion.div
                             variants={rollingTextVariants}
                             transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                             className="flex flex-col"
                           >
                             <p className="text-[1vw] font-bold leading-tight truncate text-[#e0ded8] h-[1.2vw] flex items-center">
                               {item.me}
                             </p>
                             <p className="text-[1vw] font-bold leading-tight truncate text-[#e0ded8] h-[1.2vw] flex items-center">
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
                             <p className="text-[1vw] font-medium leading-tight truncate text-[#e0ded8]/40 group-hover:text-[#e0ded8]/60 transition-colors duration-300 h-[1.2vw] flex items-center">
                               {item.freelancer}
                             </p>
                             <p className="text-[1vw] font-medium leading-tight truncate text-[#e0ded8] h-[1.2vw] flex items-center">
                               {item.freelancer}
                             </p>
                           </motion.div>
                         </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <div className="flex flex-col items-start text-left hidden lg:flex">
                <h2 className="text-4xl sm:text-5xl md:text-[6vw] font-headline text-[#e0ded8] uppercase leading-[0.9] tracking-tight">
                  EXPLORE THE<br />DIFFERENCE
                </h2>
              </div>
            </div>
          </div>
        </section>
      </InfoShowcaseSection>

      <VerticalPricingTabs />

      <section className="relative h-screen z-30 overflow-hidden w-full" id="contact">
        <div className="absolute inset-0 z-0 h-full w-full">
          <Image 
            src="https://i.ibb.co/Gf1L4KfQ/generated-image-18.jpg"
            alt="Final CTA Background"
            fill
            className="object-cover object-center"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 w-full h-full px-6 md:px-[8vw] flex flex-col items-center justify-center text-center">
          <div className="w-full md:max-w-[85vw] flex flex-col items-center">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.4, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="label text-[#e0ded8] block mb-8 md:mb-[6vh] tracking-[0.2em] uppercase font-mono text-[10px] md:text-xs"
            >
              [ GET STARTED ]
            </motion.span>
            
            <HighlightWipeHeading 
              lines={["Ready to Double Your", "Plumbing Leads?"]}
              className="text-xl sm:text-2xl md:text-[3.0vw] font-black uppercase leading-[1.3] md:leading-[1.1] text-[#e0ded8] items-center tracking-tighter"
              stagger={0.08}
              triggerOnce={true}
            />
            
            <p className="tag opacity-50 text-[#e0ded8] mt-8 text-[10px] md:text-xs uppercase tracking-widest font-mono">
              Limited availability for monthly intakes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
