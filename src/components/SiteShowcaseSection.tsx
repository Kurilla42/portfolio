
"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Lock } from 'lucide-react';

const cases = [
  {
    id: "01",
    image: "https://i.ibb.co/NgFktWnH/2026-04-22-20-48-13.png",
    layout: "left",
    domain: "bears-plumbing.com"
  },
  {
    id: "02",
    image: "https://i.ibb.co/ZRY8rbdP/2026-04-22-20-46-21.png",
    layout: "right",
    domain: "expert-plumbing.app"
  },
  {
    id: "03",
    image: "https://i.ibb.co/GvnyyDvB/2026-04-28-13-03-19.png",
    layout: "left",
    domain: "thelen-mechanical.com"
  }
];

export function SiteShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const centralIconOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9], [1, 1, 0]);
  const centralScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  const case1Y = useTransform(scrollYProgress, [0.1, 0.35], ["100vh", "0vh"]);
  const case1Opacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);

  const case2Y = useTransform(scrollYProgress, [0.4, 0.65], ["100vh", "0vh"]);
  const case2Opacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);

  const case3Y = useTransform(scrollYProgress, [0.7, 0.95], ["100vh", "0vh"]);
  const case3Opacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);

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
          className="absolute inset-0 z-20 flex items-center justify-between pointer-events-none px-[15%]"
        >
          <h2 className="text-[8vw] md:text-[3.5vw] font-headline font-black uppercase text-[#e0ded8] leading-[0.9] tracking-tight w-[40%] md:w-[35%]">
            EXPLORE HOW YOUR
          </h2>
          <h2 className="text-[8vw] md:text-[3.5vw] font-headline font-black uppercase text-[#e0ded8] leading-[0.9] tracking-tight w-[40%] md:w-[35%] text-right">
            SITE CAN LOOK LIKE
          </h2>
        </motion.div>

        {/* Central Decorative Icon */}
        <motion.div 
          style={{ 
            opacity: centralIconOpacity, 
            scale: centralScale,
          }}
          className="absolute z-10 w-[54vw] md:w-[13.52vw] h-[68vw] md:h-[16.9vw]"
        >
          <Image 
            src="https://i.ibb.co/zWwNcSSf/image.png"
            alt="Decorative icon"
            fill
            className="object-contain"
            unoptimized
          />
        </motion.div>

        {/* Cases List */}
        <div className="relative w-full h-full max-w-[92vw] mx-auto flex flex-col justify-center gap-4 py-[5vh]">
          {cases.map((item, idx) => (
            <motion.div
              key={item.id}
              style={{ 
                y: caseTransforms[idx].y, 
                opacity: caseTransforms[idx].opacity 
              }}
              className="relative w-full h-[36vh] flex items-center will-change-transform"
            >
              <div className="grid grid-cols-12 w-full items-center h-full relative">
                {/* Background Large Number */}
                <div className={`absolute top-1/2 -translate-y-1/2 z-0 pointer-events-none select-none overflow-hidden
                  ${item.layout === 'left' ? 'left-[20%]' : 'right-[20%]'}
                `}>
                  <span className="font-headline text-[25vw] md:text-[20vw] leading-none text-white/[0.04] tracking-tighter">
                    {item.id}
                  </span>
                </div>

                <div className={`${item.layout === 'left' ? 'col-span-12 md:col-span-5' : 'col-span-12 md:col-start-8 md:col-span-5'} flex flex-col relative z-10`}>
                  {/* Browser Mockup Container */}
                  <div className="browser-mockup group/browser rounded-[10px] overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.08)] bg-[#1C1C20] transition-transform duration-300 hover:-translate-y-1">
                    {/* Browser Chrome */}
                    <div className="browser-chrome h-9 bg-[#1C1C20] flex items-center px-4 gap-4">
                      <div className="traffic-lights flex gap-2">
                        <span className="dot w-3 h-3 rounded-full bg-[#FF5F57]"></span>
                        <span className="dot w-3 h-3 rounded-full bg-[#FEBC2E]"></span>
                        <span className="dot w-3 h-3 rounded-full bg-[#28C840]"></span>
                      </div>
                      <div className="url-bar flex-1 h-[22px] bg-[#0E0E12] rounded-md px-3 flex items-center gap-1.5 font-mono text-[11px] text-white/50">
                        <Lock size={11} className="text-white/50 shrink-0" />
                        <span className="truncate">{item.domain}</span>
                      </div>
                    </div>
                    {/* Browser Content */}
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

                  {/* Caption with decorative line */}
                  <div className={`flex items-center mt-6 gap-4 ${item.layout === 'right' ? 'flex-row-reverse' : ''}`}>
                     <div className={`flex justify-between items-center gap-6 font-mono text-[3.5vw] md:text-[0.9vw] uppercase tracking-tight text-[#e0ded8]/60 shrink-0 ${item.layout === 'right' ? 'flex-row-reverse' : ''}`}>
                       <span className="text-[#e0ded8]">VIEW FULL</span>
                       <span>TEMPLATE {parseInt(item.id)}</span>
                     </div>
                     <div className="flex-1 h-[1px] bg-white/20" />
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
