"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const cases = [
  {
    id: "01",
    title: "RESIDENTIAL MASTERPIECE",
    description: "COMPLETE BATHROOM OVERHAUL FOR A HISTORIC HOME IN BROOKLYN. MODERN FIXTURES MEET CLASSIC AESTHETICS.",
    image: "https://i.ibb.co/NgFktWnH/2026-04-22-20-48-13.png",
    layout: "left"
  },
  {
    id: "02",
    title: "COMMERCIAL INFRASTRUCTURE",
    description: "EFFICIENCY-DRIVEN PLUMBING SYSTEMS FOR A NEW TECH HUB. 24/7 RELIABILITY FOR CRITICAL OPERATIONS.",
    image: "https://i.ibb.co/ZRY8rbdP/2026-04-22-20-46-21.png",
    layout: "right"
  }
];

export function SiteShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const centralIconOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5], [1, 1, 0]);
  const centralScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  const case1Y = useTransform(scrollYProgress, [0.15, 0.45], ["100vh", "0vh"]);
  const case1Opacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);

  const case2Y = useTransform(scrollYProgress, [0.55, 0.85], ["100vh", "0vh"]);
  const case2Opacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);

  const caseTransforms = [
    { y: case1Y, opacity: case1Opacity },
    { y: case2Y, opacity: case2Opacity }
  ];

  return (
    <div ref={containerRef} className="relative h-[300vh] z-10 bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
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

        <div className="relative w-full h-full max-w-[92vw] mx-auto flex flex-col justify-center gap-16 py-[5vh]">
          {cases.map((item, idx) => (
            <motion.div
              key={item.id}
              style={{ 
                y: caseTransforms[idx].y, 
                opacity: caseTransforms[idx].opacity 
              }}
              className="relative w-full h-[28vh] flex items-center will-change-transform"
            >
              <div className="grid grid-cols-4 w-full items-center h-full">
                
                {item.layout === 'left' ? (
                  <>
                    <div className="col-span-1 aspect-video relative overflow-hidden w-[120%]">
                      <Image 
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="col-span-1 px-[2vw] flex items-center justify-center">
                      <div className="w-full h-[1px] bg-[#e0ded8]/20" />
                    </div>
                    <div className="col-span-2 flex flex-col justify-center">
                      <h3 className="text-[4vw] md:text-[2vw] font-mono font-bold text-[#e0ded8] uppercase tracking-tight mb-2">
                        {item.title} 
                        <span className="ml-3 text-[2.5vw] md:text-[1vw] font-mono font-bold text-[#e0ded8]/40 tracking-[0.2em]">
                          [ CASE 1 ]
                        </span>
                      </h3>
                      <p className="text-[2.5vw] md:text-[1vw] font-mono font-bold leading-tight text-[#e0ded8]/40 uppercase tracking-[0.2em]">
                        {item.description}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-span-2 flex flex-col justify-center text-right">
                      <h3 className="text-[4vw] md:text-[2vw] font-mono font-bold text-[#e0ded8] uppercase tracking-tight mb-2">
                        <span className="mr-3 text-[2.5vw] md:text-[1vw] font-mono font-bold text-[#e0ded8]/40 tracking-[0.2em]">
                          [ CASE 2 ]
                        </span>
                        {item.title}
                      </h3>
                      <p className="text-[2.5vw] md:text-[1vw] font-mono font-bold leading-tight text-[#e0ded8]/40 uppercase tracking-[0.2em]">
                        {item.description}
                      </p>
                    </div>
                    <div className="col-span-1 px-[2vw] flex items-center justify-center">
                      <div className="w-full h-[1px] bg-[#e0ded8]/20" />
                    </div>
                    <div className="col-span-1 aspect-video relative overflow-hidden w-[120%] justify-self-end">
                      <Image 
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </>
                )}

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
