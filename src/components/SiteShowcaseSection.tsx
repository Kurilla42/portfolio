
"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Lock } from 'lucide-react';

const cases = [
  {
    id: "01",
    name: "Empire State Plumbing (Manhattan)",
    image: "https://i.ibb.co/NgFktWnH/2026-04-22-20-48-13.png",
    domain: "bears-plumbing.com",
    description: "Deep navy paired with yellow CTAs — the classic \"trusted local contractor\" feel, but built on a disciplined grid with careful typography. The team is shown through real on-site photography instead of stock, which sells the brand as a genuine neighborhood operation rather than a national franchise."
  },
  {
    id: "02",
    name: "ProFlow Plumbing",
    image: "https://i.ibb.co/ZRY8rbdP/2026-04-22-20-46-21.png",
    domain: "expert-plumbing.app",
    description: "Warm cream background, slab-serif headlines, and gradient accent bars segment the page into clear narrative blocks. The execution leans editorial — more premium than typical competitors in the space, without losing the human, trust-driven tone a local service business needs."
  },
  {
    id: "03",
    name: "Thelen Plumbing Co",
    image: "https://i.ibb.co/GvnyyDvB/2026-04-28-13-03-19.png",
    domain: "thelen-mechanical.com",
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

  // Настройка анимаций для появления
  const case1Y = useTransform(scrollYProgress, [0.1, 0.3], ["100vh", "0vh"]);
  const case1Opacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);

  const case2Y = useTransform(scrollYProgress, [0.35, 0.55], ["100vh", "0vh"]);
  const case2Opacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);

  const case3Y = useTransform(scrollYProgress, [0.6, 0.8], ["100vh", "0vh"]);
  const case3Opacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);

  const caseTransforms = [
    { y: case1Y, opacity: case1Opacity },
    { y: case2Y, opacity: case2Opacity },
    { y: case3Y, opacity: case3Opacity }
  ];

  return (
    <div ref={containerRef} className="relative h-[300vh] z-10 bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Начальный текстовый оверлей */}
        <motion.div 
          style={{ opacity: headingOpacity }}
          className="absolute inset-0 z-20 flex items-center justify-between pointer-events-none px-[15%]"
        >
          <h2 className="text-[8vw] md:text-[3.5vw] font-headline font-black uppercase text-[#e0ded8] leading-[0.9] tracking-tight w-[40%] md:w-[35%]">
            EXPLORE HOW YOUR
          </h2>
          <h2 className="text-[8vw] md:text-[3.5vw] font-headline font-black uppercase text-[#e0ded8] leading-[0.9] tracking-tight w-[40%] md:w-[35%] text-right">
            SITE CAN LOOK LIKE
          </h2>
        </motion.div>

        {/* Список кейсов */}
        <div className="relative w-full h-full max-w-[92vw] mx-auto flex flex-col justify-center gap-4 py-[2vh]">
          {cases.map((item, idx) => (
            <motion.div
              key={item.id}
              style={{ 
                y: caseTransforms[idx].y, 
                opacity: caseTransforms[idx].opacity 
              }}
              className="relative w-full h-[30vh] flex items-center will-change-transform"
            >
              <div className="grid grid-cols-12 w-full items-center h-full relative gap-8 md:gap-0">
                {/* Левая часть: скриншот */}
                <div className="col-span-12 md:col-span-5 flex flex-col relative z-10 w-full">
                  <div className="browser-mockup w-full md:w-[90%] group/browser rounded-[8px] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.08)] bg-[#1C1C20] transition-transform duration-300 hover:-translate-y-1">
                    <div className="browser-chrome h-8 bg-[#1C1C20] flex items-center px-3 gap-3">
                      <div className="traffic-lights flex gap-1.5">
                        <span className="dot w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></span>
                        <span className="dot w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></span>
                        <span className="dot w-2.5 h-2.5 rounded-full bg-[#28C840]"></span>
                      </div>
                      <div className="url-bar flex-1 h-[18px] bg-[#0E0E12] rounded-sm px-2 flex items-center gap-1 font-mono text-[9px] text-white/50">
                        <Lock size={9} className="text-white/50 shrink-0" />
                        <span className="truncate">{item.domain}</span>
                      </div>
                    </div>
                    <div className="browser-content block leading-[0]">
                      <div className="aspect-video relative overflow-hidden bg-[#111]">
                        <Image 
                          src={item.image}
                          alt={`Case ${item.id}`}
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Соединительная линия */}
                <div className="hidden md:block md:col-span-1">
                  <div className="w-full h-[1px] bg-[#e0ded8]/20" />
                </div>

                {/* Правая часть: текст */}
                <div className="col-span-12 md:col-span-6 flex flex-col justify-center">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-mono text-[4vw] md:text-[1.1vw] font-bold text-[#e0ded8] uppercase tracking-tight">
                      Case {parseInt(item.id)} — {item.name}
                    </h3>
                    <p className="font-mono text-[3.5vw] md:text-[0.9vw] uppercase tracking-tight text-[#e0ded8]/60 leading-relaxed max-w-[90%]">
                      {item.description}
                    </p>
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
