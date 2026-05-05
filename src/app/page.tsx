'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { SiteShowcaseSection } from '@/components/SiteShowcaseSection';
import { ExperienceTextSection } from '@/components/ExperienceTextSection';
import ShaderShowcase from "@/components/ui/hero";
import Image from 'next/image';
import { VerticalPricingTabs } from '@/components/ui/vertical-pricing-tabs';
import { InfoShowcaseSection } from '@/components/InfoShowcaseSection';
import { HeroCurtain } from '@/components/HeroCurtain';
import Link from 'next/link';

const steps = [
  { number: "DAY 01", title: "Choose Your Service" },
  { number: "DAY 02", title: "Complete the Brief" },
  { number: "DAY 03", title: "Build the Landing" },
  { number: "DAY 04", title: "Test & Connect CRM" },
  { number: "DAY 05", title: "Deploy & Launch" }
];

const comparisonData = [
  {
    criterion: "NICHE FOCUS",
    me: "Exclusive Home Services",
    freelancer: "Generic Templates for Any Niche"
  },
  {
    criterion: "STRATEGY",
    me: "12+ Years in Local Lead Gen",
    freelancer: "Pretty Sites with No Strategy"
  },
  {
    criterion: "STRUCTURE",
    me: "Conversion-First Layouts",
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

const quoteLines = [
  "MY GOAL HAS ALWAYS BEEN TO grow revenue for my clients. I build",
  "<span class='text-[#c7b684]'>high-converting</span> landing pages, uniquely crafted from user",
  "insights and proven conversion principles - always",
  "<span class='text-[#c7b684]'>setting you apart</span> from the competition"
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
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

export default function Home() {
  const combinedRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
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

  const bgDesktopUrl = "https://i.ibb.co/DD1rRjBJ/ezgif-com-video-to-gif-converter-1.gif";
  const bgMobileUrl = "https://i.ibb.co/qYZ8Bq2k/N5cohaa-Wu-Brrm5-Ozvud-HSkii-EXA.jpg";

  return (
    <div className="min-h-screen bg-[#000000]">
      <HeroCurtain isLifted={isLifted} />

      <div ref={combinedRef} className="relative z-0">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            style={{ y: bgY, scale: bgScale }}
            className="absolute -top-[20%] left-0 w-full h-[140%]"
          >
            <Image
              src={bgDesktopUrl}
              alt="Background desktop"
              fill
              className="hidden md:block absolute inset-0 object-cover object-center blur-[10px]"
              priority
              unoptimized
            />
            <Image
              src={bgMobileUrl}
              alt="Background mobile"
              fill
              className="block md:hidden absolute inset-0 object-cover object-center blur-[10px]"
              priority
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

        <div className="relative z-20">
          <section className="relative min-h-[100vh] py-[15vh] md:py-[20vh] overflow-hidden">
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,transparent_0%,black_65%)]" />
            <div className="relative z-10">
              <ExperienceTextSection />
            </div>
          </section>
        </div>
      </div>
      
      <SiteShowcaseSection />

      <section className="relative py-[12vh] md:py-[20vh] z-30 overflow-hidden w-full bg-black" id="steps">
        <div className="relative z-10 w-full px-6 md:px-[4vw]">
          <div className="grid grid-cols-12 gap-10 md:gap-0 items-center relative">
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
              <h2 className="text-[12vw] md:text-[6vw] font-headline text-[#e0ded8] uppercase leading-[0.9] mb-4 md:mb-8 tracking-tight">
                SIMPLE STEPS TO<br />GET YOUR SITE
              </h2>
              <p className="font-mono text-[3.5vw] md:text-[0.9vw] uppercase tracking-tight text-[#e0ded8]/60 leading-relaxed w-full max-w-full">
                <span className="md:hidden">No confusion, no delays</span>
                <span className="hidden md:inline">No confusion, no delays. Just a simple process to get your site live</span>
              </p>
            </div>

            <div className="col-span-12 lg:col-start-8 lg:col-span-5 flex flex-col pt-4 md:pt-0 relative">
              <motion.div 
                className="flex flex-col w-full border-t border-[#e0ded8]/20"
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
                    className="flex items-center py-6 md:py-[1.8vh] border-b border-[#e0ded8]/20 group transition-colors duration-300 cursor-default w-full overflow-hidden"
                  >
                    <div className="flex items-center gap-6 md:gap-[3vw] w-full">
                      <div className="h-[4vw] md:h-[2vw] overflow-hidden shrink-0">
                        <motion.div
                          variants={rollingTextVariants}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="flex flex-col"
                        >
                          <span className="font-mono text-[4vw] md:text-[2vw] text-[#e0ded8]/30 font-bold uppercase tracking-wider h-[4vw] md:h-[2vw] flex items-center">
                            {step.number}
                          </span>
                          <span className="font-mono text-[4vw] md:text-[2vw] text-[#e0ded8] font-bold uppercase tracking-wider h-[4vw] md:h-[2vw] flex items-center">
                            {step.number}
                          </span>
                        </motion.div>
                      </div>
                      
                      <div className="h-[4vw] md:h-[2vw] overflow-hidden w-full">
                        <motion.div
                          variants={rollingTextVariants}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="flex flex-col"
                        >
                          <h3 className="text-[4vw] md:text-[2vw] font-mono font-bold text-[#e0ded8] uppercase tracking-tight h-[4vw] md:h-[2vw] flex items-center whitespace-normal">
                            {step.title}
                          </h3>
                          <h3 className="text-[4vw] md:text-[2vw] font-mono font-bold text-[#c7b684] uppercase tracking-tight h-[4vw] md:h-[2vw] flex items-center whitespace-normal">
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
        quoteLines={quoteLines}
        mobileImageSrc="https://i.ibb.co/kVJpKgR9/Whisk-yiwomrjz2igmijtntcjnkhtl1ejz00cn3ujmtgd-upscayl-2x-upscayl-standard-4x.jpg"
      >
        <section className="relative pb-16 pt-8 z-30 overflow-hidden w-full" id="difference">
          <div className="w-full px-6 md:px-[4vw]">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-[4vw] w-full">
              <motion.div 
                className="w-full lg:w-[60vw]"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <div className="lg:hidden mb-6">
                  <h2 className="text-[12vw] md:text-[6vw] font-headline text-[#e0ded8] uppercase leading-[0.9] tracking-tight">
                    EXPLORE THE<br />DIFFERENCE
                  </h2>
                </div>

                <div className="w-full border-t border-b border-[#e0ded8]/20 hidden lg:block">
                  <div className="grid grid-cols-[15vw_22.5vw_22.5vw] gap-0">
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
                        <span className={`text-[1vw] font-mono font-bold tracking-[0.2em] uppercase truncate transition-colors duration-300
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
                      <span className="text-[3.5vw] font-mono text-[#c7b684] uppercase tracking-widest">{item.criterion}</span>
                      <div className="bg-[#e0ded8]/5 p-4 rounded-lg">
                        <span className="text-[2.5vw] font-mono text-[#e0ded8]/40 uppercase block mb-1">Anton Kolesnikov</span>
                        <p className="text-[3.5vw] font-mono font-bold text-[#e0ded8]">{item.me}</p>
                      </div>
                      <div className="p-4 border border-[#e0ded8]/5 rounded-lg">
                        <span className="text-[2.5vw] font-mono text-[#e0ded8]/40 uppercase block mb-1">Freelancer/Agency</span>
                        <p className="text-[3.5vw] font-mono font-medium text-[#e0ded8]/60">{item.freelancer}</p>
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
                      className="grid grid-cols-[15vw_22.5vw_22.5vw] gap-0 border-b border-[#e0ded8]/20 items-stretch group cursor-default"
                    >
                      <div className="py-[1.5vh] pr-[3.4vw] flex items-center overflow-hidden">
                         <div className="h-[1.2vw] overflow-hidden">
                           <motion.div
                             variants={rollingTextVariants}
                             transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                             className="flex flex-col"
                           >
                             <span className="text-[1vw] font-mono font-bold tracking-[0.1em] uppercase text-[#e0ded8]/40 group-hover:text-[#e0ded8] transition-colors duration-300 h-[1.2vw] flex items-center">
                               {item.criterion}
                             </span>
                             <span className="text-[1vw] font-mono font-bold tracking-[0.1em] uppercase text-[#e0ded8] h-[1.2vw] flex items-center">
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
                             <p className="text-[1vw] font-mono font-bold leading-tight truncate text-[#e0ded8] h-[1.2vw] flex items-center">
                               {item.me}
                             </p>
                             <p className="text-[1vw] font-mono font-bold leading-tight truncate text-[#e0ded8] h-[1.2vw] flex items-center">
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
                             <p className="text-[1vw] font-mono font-medium leading-tight truncate text-[#e0ded8]/40 group-hover:text-[#e0ded8]/60 transition-colors duration-300 h-[1.2vw] flex items-center">
                               {item.freelancer}
                             </p>
                             <p className="text-[1vw] font-mono font-medium leading-tight truncate text-[#e0ded8] h-[1.2vw] flex items-center">
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

      <section className="relative w-full bg-black py-16 px-6 md:px-[4vw] z-30" id="contact">
        <div className="relative w-full aspect-[21/9] min-h-[500px] bg-black overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 p-2 md:p-[1vw]">
             <div className="relative w-full h-full overflow-hidden border border-white/10 group">
                <Image 
                  src="https://i.ibb.co/wFqwsVGc/i-EHXOE8-MWd2v-Ga9-Prmwyjtm35-A.png"
                  alt="Final CTA Background"
                  fill
                  className="object-cover object-center blur-sm transition-all duration-1000"
                  unoptimized
                  priority
                />
                <div className="absolute inset-0 bg-black/35 transition-all duration-1000" />
                
                <div className="absolute inset-0 z-10 p-8 md:p-[4vw] flex flex-col items-center">
                  <div className="hidden md:grid grid-cols-12 items-center w-full h-full">
                    <div className="md:col-span-5">
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <h2 className="md:text-[8vw] font-headline text-white leading-[0.9] uppercase tracking-tight drop-shadow-2xl">
                          COME<br />SAY<br />HELLO
                        </h2>
                      </motion.div>
                    </div>

                    <div className="md:col-span-2 flex justify-center py-8 md:py-0">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative md:w-[60vw] aspect-square"
                      >
                        <Image 
                          src="https://i.ibb.co/5Wj20F9h/Whisk-203fe268da3200295ee414b93c2d40aedr-removebg-preview.png"
                          alt="Decorative accent"
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </motion.div>
                    </div>

                    <div className="md:col-span-5 flex flex-col md:items-end md:text-right">
                      <motion.div 
                        className="flex flex-col gap-4 md:gap-6 font-mono text-[1.2vw] uppercase tracking-widest text-white"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                      >
                        <Link href="https://www.facebook.com/profile.php?id=61585447957089" target="_blank" rel="noopener noreferrer" className="hover:text-[#c7b684] transition-colors">[ FACEBOOK ]</Link>
                        <Link href="https://www.instagram.com/will_dukalis?igsh=MTN2OHM4aGZua2JvZQ==" target="_blank" rel="noopener noreferrer" className="hover:text-[#c7b684] transition-colors">[ INSTAGRAM ]</Link>
                        <Link href="mailto:plumbing.landing@gmail.com" className="hover:text-[#c7b684] transition-colors">plumbing.landing@gmail.com</Link>
                        <Link href="tel:+79127582210" className="hover:text-[#c7b684] transition-colors">WhatsApp +7 (912) 758-22-10</Link>
                      </motion.div>
                    </div>
                  </div>

                  <div className="md:hidden flex flex-col items-center w-full pt-4 h-full">
                    <motion.h2 
                      className="text-[12vw] font-headline text-white uppercase tracking-tight whitespace-nowrap mb-2 text-center"
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                    >
                      COME SAY HELLO
                    </motion.h2>

                    <div className="relative w-[26vw] aspect-square mt-10 mb-6">
                       <Image 
                          src="https://i.ibb.co/5Wj20F9h/Whisk-203fe268da3200295ee414b93c2d40aedr-removebg-preview.png"
                          alt="Decorative accent"
                          fill
                          className="object-contain"
                          unoptimized
                        />
                    </div>

                    <div className="flex flex-col items-center gap-3 text-[3.5vw] font-mono text-white/80 uppercase text-center mt-auto pb-10">
                       <Link href="https://www.facebook.com/profile.php?id=61585447957089" target="_blank" rel="noopener noreferrer">[ FACEBOOK ]</Link>
                       <Link href="https://www.instagram.com/will_dukalis?igsh=MTN2OHM4aGZua2JvZQ==" target="_blank" rel="noopener noreferrer">[ INSTAGRAM ]</Link>
                       <Link href="mailto:plumbing.landing@gmail.com">plumbing.landing@gmail.com</Link>
                       <Link href="tel:+79127582210">WhatsApp +7 (912) 758-22-10</Link>
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 left-4 font-mono text-[10px] text-white/30 uppercase tracking-widest">[ ANTON KOLESNIKOV ]</div>
                <div className="absolute top-4 right-4 font-mono text-[10px] text-white/30 uppercase tracking-widest">[ COPYRIGHT 2026 ]</div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}