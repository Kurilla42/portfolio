
"use client";

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const cases = [
  {
    id: "01",
    name: "Empire State Plumbing",
    image: "https://i.ibb.co/d0G6rCKv/case1-iota-vercel-app.png",
    domain: "bears-plumbing.com",
    href: "/case1",
    duration: 22,
    description: "Deep navy paired with yellow CTAs — the classic \"trusted local contractor\" feel, but built on a disciplined grid with careful typography. The team is shown through real on-site photography instead of stock."
  },
  {
    id: "02",
    name: "ProFlow Plumbing",
    image: "https://i.ibb.co/wFbPVcnm/case2-five-vercel-app.png",
    domain: "expert-plumbing.app",
    href: "/case2",
    duration: 25,
    description: "Warm cream background, slab-serif headlines, and gradient accent bars segment the page into clear narrative blocks. The execution leans editorial — more premium than typical competitors."
  },
  {
    id: "03",
    name: "Thelen Plumbing Co",
    image: "https://i.ibb.co/0pnXpSWQ/case3-livid-vercel-app-4.png",
    domain: "thelen-mechanical.com",
    href: "/case3",
    duration: 28,
    description: "Swiss-editorial minimalism applied to plumbing: oversized black headlines, cream paper background, a single terracotta accent. Reads like a magazine spread rather than a contractor's website."
  }
];

export function SiteShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDisplaying, setIsDisplaying] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const headingScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  
  const contentY = useTransform(scrollYProgress, [0.1, 0.3], ["100vh", "0vh"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Анимация прокрутки внутри кейса начнется только когда блок полностью выедет (>= 0.3)
    const currentlyDisplaying = latest >= 0.3;
    if (currentlyDisplaying !== isDisplaying) {
      setIsDisplaying(currentlyDisplaying);
    }

    if (latest < 0.2) {
      if (activeIndex !== 0) setActiveIndex(0);
      return;
    }
    
    const progressPerCase = 0.8 / cases.length;
    const adjustedLatest = latest - 0.2;
    const index = Math.min(Math.floor(adjustedLatest / progressPerCase), cases.length - 1);
    
    if (index >= 0 && index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  return (
    <div ref={containerRef} className="relative h-[300vh] md:h-[300vh] z-10 bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        <motion.div 
          style={{ opacity: headingOpacity, scale: headingScale }}
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-6 md:px-[4vw]"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-[2vw] w-full">
            <h2 className="text-[9vw] md:text-[4.4vw] font-headline font-black uppercase text-[#e0ded8] leading-none tracking-normal text-center md:text-left whitespace-nowrap">
              EXPLORE HOW YOUR
            </h2>
            
            <div className="relative w-[24vw] h-[24vw] md:w-[10vw] md:h-[10vw] shrink-0">
               <Image 
                  src="https://i.ibb.co/zWwNcSSf/image.png"
                  alt="Decorative accent"
                  fill
                  className="object-contain"
                  unoptimized
               />
            </div>

            <h2 className="text-[9vw] md:text-[4.4vw] font-headline font-black uppercase text-[#e0ded8] leading-none tracking-normal text-center md:text-right whitespace-nowrap">
              SITE CAN LOOK LIKE
            </h2>
          </div>
        </motion.div>

        <motion.div 
          style={{ y: contentY }}
          className="relative w-full h-full flex flex-col md:flex-row items-center justify-center px-6 md:px-[4vw] gap-12 md:gap-[5vw]"
        >
          <div className="relative w-full md:w-[40%] h-[80vh] flex items-center justify-center">
            <div className="relative w-[85%] md:w-full h-full bg-[#111] rounded-[20px] overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)] border border-white/5">
              <div className="absolute top-0 left-0 right-0 h-8 bg-[#1C1C20] z-20 flex items-center px-4 gap-4">
                <div className="flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF5F57]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#FEBC2E]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#28C840]"></span>
                </div>
                <div className="flex-1 h-4 bg-[#0E0E12] rounded px-2 flex items-center font-mono text-[8px] text-white/30 truncate">
                  {cases[activeIndex].domain}
                </div>
              </div>

              <div className="absolute inset-0 pt-8 overflow-hidden">
                {cases.map((item, idx) => (
                  <div
                    key={item.id}
                    className={cn(
                      "absolute inset-0 pt-8 transition-opacity duration-500",
                      activeIndex === idx ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    )}
                  >
                    <CaseScrollingImage 
                      src={item.image} 
                      isActive={isDisplaying && activeIndex === idx} 
                      duration={item.duration}
                      priority={idx === 0} 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 md:gap-12 w-full md:w-[45%]">
            {cases.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div 
                  key={item.id}
                  className={cn(
                    "relative flex flex-col gap-3 transition-all duration-700 ease-out",
                    isActive ? "opacity-100 translate-x-0" : "opacity-20 -translate-x-4 blur-[1px]"
                  )}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="caseHighlight"
                      className="absolute -left-6 top-0 bottom-0 w-[2px] bg-[#c7b684]"
                    />
                  )}
                  
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[3vw] md:text-[0.8vw] text-[#c7b684] font-bold">
                      /{item.id}
                    </span>
                    <h3 className="font-mono text-[4vw] md:text-[1.5vw] font-bold text-[#e0ded8] uppercase tracking-tight">
                      {item.name}
                    </h3>
                  </div>
                  
                  <p className="font-mono text-[3.5vw] md:text-[0.9vw] uppercase tracking-tight text-[#e0ded8]/60 leading-relaxed max-w-[90%]">
                    {item.description}
                  </p>

                  <div className="mt-2">
                    <Button 
                      asChild 
                      variant="link" 
                      className={cn(
                        "p-0 h-auto font-mono font-bold uppercase tracking-[0.2em] text-[2.5vw] md:text-[0.8vw] no-underline transition-all",
                        isActive ? "text-[#c7b684]" : "text-[#e0ded8]/40"
                      )}
                    >
                      <Link href={item.href}>[ VIEW FULL PROJECT ]</Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

function CaseScrollingImage({ src, isActive, duration, priority = false }: { src: string; isActive: boolean; duration: number; priority?: boolean }) {
  const [shouldReset, setShouldReset] = useState(false);

  // Когда кейс становится неактивным, мы ждем завершения перехода, прежде чем сбросить позицию
  useMotionValueEvent(isActive ? { get: () => true } as any : { get: () => false } as any, "change", (active) => {
    if (!active) {
      const timer = setTimeout(() => setShouldReset(true), 600);
      return () => clearTimeout(timer);
    } else {
      setShouldReset(false);
    }
  });

  return (
    <motion.div 
      initial={{ y: "0%" }}
      animate={isActive ? { y: ["0%", "-70%"] } : { y: "0%" }}
      transition={isActive ? { 
        duration: duration, 
        ease: "linear", 
        repeat: Infinity, 
        repeatType: "reverse" 
      } : { 
        duration: shouldReset ? 0 : 0.8,
        delay: isActive ? 0 : 0
      }}
      className="relative w-full flex flex-col"
    >
      <Image 
        src={src}
        alt="Case screenshot"
        width={1000}
        height={4000}
        className="w-full h-auto"
        unoptimized
        priority={priority}
      />
    </motion.div>
  );
}
