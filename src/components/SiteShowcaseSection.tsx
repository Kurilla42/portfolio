
"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Lock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const cases = [
  {
    id: "01",
    name: "Empire State Plumbing (Manhattan)",
    image: "https://i.ibb.co/4RTpwFsR/2026-04-28-20-44-06.png",
    domain: "bears-plumbing.com",
    href: "/case1",
    description: "Deep navy paired with yellow CTAs — the classic \"trusted local contractor\" feel, but built on a disciplined grid with careful typography. The team is shown through real on-site photography instead of stock, which sells the brand as a genuine neighborhood operation rather than a national franchise."
  },
  {
    id: "02",
    name: "ProFlow Plumbing",
    image: "https://i.ibb.co/kg7YRdSz/2026-04-28-20-44-39.png",
    domain: "expert-plumbing.app",
    href: "/case2",
    description: "Warm cream background, slab-serif headlines, and gradient accent bars segment the page into clear narrative blocks. The execution leans editorial — more premium than typical competitors in the space, without losing the human, trust-driven tone a local service business needs."
  },
  {
    id: "03",
    name: "Thelen Plumbing Co",
    image: "https://i.ibb.co/q30RfBHv/2026-04-28-20-49-48.png",
    domain: "thelen-mechanical.com",
    href: "/case3",
    description: "Swiss-editorial minimalism applied to plumbing: oversized black headlines, cream paper background, a single terracotta accent. Reads like a magazine spread rather than a contractor's website — the boldest visual direction of the three."
  }
];

export function SiteShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // Скорректированная анимация: меньше движения по Y, чтобы избежать наложений
  const case1Y = useTransform(scrollYProgress, [0.1, 0.3], ["5vh", "0vh"]);
  const case1Opacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);

  const case2Y = useTransform(scrollYProgress, [0.35, 0.55], ["5vh", "0vh"]);
  const case2Opacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);

  const case3Y = useTransform(scrollYProgress, [0.6, 0.8], ["5vh", "0vh"]);
  const case3Opacity = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);

  const caseTransforms = [
    { y: case1Y, opacity: case1Opacity },
    { y: case2Y, opacity: case2Opacity },
    { y: case3Y, opacity: case3Opacity }
  ];

  return (
    <div ref={containerRef} className="relative h-[300vh] z-10 bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Initial Text Overlay */}
        <motion.div 
          style={{ opacity: headingOpacity }}
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-6 md:px-[4vw]"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-[4vw]">
            <h2 className="text-[12vw] md:text-[6vw] font-headline font-black uppercase text-[#e0ded8] leading-[0.9] tracking-tight text-center md:text-left">
              EXPLORE HOW<br />YOUR
            </h2>
            
            <div className="relative w-[15vw] h-[15vw] md:w-[8vw] md:h-[8vw] shrink-0">
               <Image 
                  src="https://i.ibb.co/zWwNcSSf/image.png"
                  alt="Decorative accent"
                  fill
                  className="object-contain"
                  unoptimized
               />
            </div>

            <h2 className="text-[12vw] md:text-[6vw] font-headline font-black uppercase text-[#e0ded8] leading-[0.9] tracking-tight text-center md:text-right">
              SITE CAN<br />LOOK LIKE
            </h2>
          </div>
        </motion.div>

        {/* Case List */}
        <div className="relative w-full h-full max-w-[92vw] mx-auto flex flex-col justify-center gap-8 py-[2vh]">
          {cases.map((item, idx) => (
            <motion.div
              key={item.id}
              style={{ 
                y: caseTransforms[idx].y, 
                opacity: caseTransforms[idx].opacity 
              }}
              className="relative w-full h-[26vh] flex items-center will-change-transform"
            >
              <div className="grid grid-cols-12 w-full items-center h-full relative gap-8 md:gap-0">
                {/* Left Side: Browser Mockup (Reduced size by 15% from previous 80% -> ~68%) */}
                <div className="col-span-12 md:col-span-4 flex flex-col relative z-10 w-full">
                  <div className="browser-mockup w-full md:w-[68%] group/browser rounded-[10px] overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.08)] bg-[#1C1C20] transition-transform duration-300 hover:-translate-y-1">
                    <div className="browser-chrome h-8 bg-[#1C1C20] flex items-center px-4 gap-4">
                      <div className="traffic-lights flex gap-2">
                        <span className="dot w-[10px] h-[10px] rounded-full bg-[#FF5F57]"></span>
                        <span className="dot w-[10px] h-[10px] rounded-full bg-[#FEBC2E]"></span>
                        <span className="dot w-[10px] h-[10px] rounded-full bg-[#28C840]"></span>
                      </div>
                      <div className="url-bar flex-1 h-[20px] bg-[#0E0E12] rounded-md px-3 flex items-center gap-1.5 font-mono text-[10px] text-white/50">
                        <Lock size={10} className="text-white/50 shrink-0" />
                        <span className="truncate">{item.domain}</span>
                      </div>
                    </div>
                    <div className="browser-content block leading-[0]">
                      <div className="relative overflow-hidden bg-[#111] aspect-[1585/908]">
                        <Image 
                          src={item.image}
                          alt={`Case ${item.id}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connection Line (как в блоке шагов) */}
                <div className="hidden md:block md:col-span-2">
                  <div className="w-full h-[1px] bg-[#e0ded8]/20" />
                </div>

                {/* Right Side: Description */}
                <div className="col-span-12 md:col-span-6 flex flex-col justify-center">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-mono text-[4vw] md:text-[1.1vw] font-bold text-[#e0ded8] uppercase tracking-tight">
                        Case {parseInt(item.id)} — {item.name}
                      </h3>
                      <p className="font-mono text-[3.5vw] md:text-[0.8vw] uppercase tracking-tight text-[#e0ded8]/60 leading-relaxed max-w-[95%]">
                        {item.description}
                      </p>
                    </div>
                    
                    <div className="flex justify-start">
                      <Button 
                        asChild 
                        variant="link" 
                        className="p-0 h-auto text-[#e0ded8] font-mono font-bold uppercase tracking-[0.2em] text-[3vw] md:text-[0.8vw] underline underline-offset-8 decoration-[#e0ded8]/20 hover:decoration-[#e0ded8] transition-all"
                      >
                        <Link href={item.href}>[ VIEW FULL ]</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
