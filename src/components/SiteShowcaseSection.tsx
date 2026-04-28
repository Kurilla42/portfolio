"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const cases = [
  {
    id: "01",
    image: "https://i.ibb.co/NgFktWnH/2026-04-22-20-48-13.png",
    layout: "left"
  },
  {
    id: "02",
    image: "https://i.ibb.co/ZRY8rbdP/2026-04-22-20-46-21.png",
    layout: "right"
  },
  {
    id: "03",
    image: "https://i.ibb.co/GvnyyDvB/2026-04-28-13-03-19.png",
    layout: "left"
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

  // Настройка анимации для 3-х кейсов на протяжении 300vh
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
              className="relative w-full h-[28vh] flex items-center will-change-transform"
            >
              <div className="grid grid-cols-12 w-full items-center h-full">
                {item.layout === 'left' ? (
                  <div className="col-span-12 md:col-span-5 aspect-video relative overflow-hidden">
                    <Image 
                      src={item.image}
                      alt={`Case ${item.id}`}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="col-span-12 md:col-start-8 md:col-span-5 aspect-video relative overflow-hidden">
                    <Image 
                      src={item.image}
                      alt={`Case ${item.id}`}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}