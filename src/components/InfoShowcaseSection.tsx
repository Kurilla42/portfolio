
'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

interface InfoShowcaseSectionProps {
  imageSrc?: string;
  quote?: string;
  children?: React.ReactNode;
}

export function InfoShowcaseSection({
  imageSrc = "https://i.ibb.co/LDgsQj1v/Whisk-yiwomrjz2igmijtntcjnkhtl1ejz00cn3ujmtgd.jpg",
  quote = "MY GOAL HAS ALWAYS BEEN TO grow revenue for my clients. I build high-converting landing pages, uniquely crafted from user insights and proven conversion principles - always setting you apart from the competition",
  children
}: InfoShowcaseSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Параллакс эффект: изображение смещается сверху вниз
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section ref={containerRef} className="relative w-full z-20 overflow-hidden bg-black">
      {/* Shared Background Layer with Parallax and Transition Overlay */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <motion.div 
          style={{ y }}
          className="absolute -top-[20%] left-0 w-full h-[140%]"
        >
          <Image
            src={imageSrc}
            alt="Section Background"
            fill
            className="object-cover object-top"
            priority
            unoptimized
          />
          {/* 
            Overlay for Transition:
            - Clear at the top (letters IN FO)
            - Deepening at the middle (where text starts)
            - Full black at the bottom (table area)
          */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 via-black/80 to-black" />
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full flex flex-col">
        
        {/* FIRST BLOCK: Typography (Clear area) */}
        <div className="min-h-[70vh] md:min-h-screen w-full flex items-start justify-between px-6 md:px-[5vw] pt-[15vh] md:pt-[10vh] pointer-events-none">
          <h2 className="text-[25vw] md:text-[30vw] font-headline leading-none text-[#e0ded8] tracking-tight select-none">
            IN
          </h2>
          <h2 className="text-[25vw] md:text-[30vw] font-headline leading-none text-[#e0ded8] tracking-tight select-none">
            FO
          </h2>
        </div>

        {/* SECOND BLOCK: Quote and Decorative Line (Transition area) */}
        <div className="w-full flex flex-col items-center text-center px-6 md:px-[4vw] pt-[5vh] pb-[5vh] md:pb-[8vh]">
          <p className="text-xl sm:text-2xl md:text-[3.0vw] font-headline uppercase leading-[1.3] md:leading-[1.1] text-[#e0ded8] tracking-normal max-w-full md:max-w-[85vw] drop-shadow-2xl mb-12 md:mb-16">
            {quote}
          </p>

          {/* Decorative Line with Image in Gap */}
          <div className="w-full flex items-center justify-center gap-2 md:gap-4 px-4">
            <div className="flex-1 h-[1px] bg-white opacity-100" />
            <div className="relative w-72 h-72 md:w-[35vw] md:h-[35vw] shrink-0">
              <Image 
                src="https://i.ibb.co/nN2y7dpt/generated-image-12-removebg-preview.png"
                alt="Decorative Icon"
                fill
                className="object-contain opacity-100 scale-125"
                unoptimized
              />
            </div>
            <div className="flex-1 h-[1px] bg-white opacity-100" />
          </div>
        </div>

        {/* THIRD PART: Comparison Table / Children (Dark area) */}
        {children && (
          <div className="relative w-full">
            {children}
          </div>
        )}

      </div>
    </section>
  );
}
