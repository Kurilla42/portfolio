
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
  imageSrc = "https://i.ibb.co/xqjNS2sj/202603190505.jpg",
  quote = "MY GOAL HAS ALWAYS BEEN TO grow revenue for my clients. I build high-converting landing pages, uniquely crafted from user insights and proven conversion principles - always setting you apart from the competition",
  children
}: InfoShowcaseSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Параллакс эффект: изображение смещается сверху вниз
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={containerRef} className="relative w-full z-20 overflow-hidden">
      {/* Shared Background Layer with Parallax */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <motion.div 
          style={{ y }}
          className="absolute -top-[20%] left-0 w-full h-[120%]"
        >
          <Image
            src={imageSrc}
            alt="Section Background"
            fill
            className="object-cover object-top"
            priority
            unoptimized
          />
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full flex flex-col">
        
        {/* FIRST BLOCK: Typography */}
        <div className="min-h-[70vh] md:min-h-screen w-full flex items-start justify-between px-6 md:px-[5vw] pt-[15vh] md:pt-[10vh] pointer-events-none">
          <h2 className="text-[25vw] md:text-[30vw] font-headline leading-none text-[#e0ded8] tracking-tight select-none">
            IN
          </h2>
          <h2 className="text-[25vw] md:text-[30vw] font-headline leading-none text-[#e0ded8] tracking-tight select-none">
            FO
          </h2>
        </div>

        {/* SECOND BLOCK: Quote and Decorative Line */}
        <div className="w-full flex flex-col items-center text-center px-6 md:px-[4vw] pt-[5vh] pb-[5vh] md:pb-[8vh]">
          <p className="text-xl sm:text-2xl md:text-[3.0vw] font-headline uppercase leading-[1.3] md:leading-[1.1] text-[#e0ded8] tracking-normal max-w-full md:max-w-[85vw] drop-shadow-lg mb-12 md:mb-16">
            {quote}
          </p>

          {/* Decorative Line with Image in Gap */}
          <div className="w-full flex items-center justify-center gap-8 md:gap-[4vw] px-4">
            <div className="flex-1 h-[1px] bg-[#e0ded8]/30" />
            <div className="relative w-10 h-10 md:w-[3vw] md:h-[3vw] shrink-0">
              <Image 
                src="https://i.ibb.co/nN2y7dpt/generated-image-12-removebg-preview.png"
                alt="Decorative Icon"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="flex-1 h-[1px] bg-[#e0ded8]/30" />
          </div>
        </div>

        {/* THIRD PART: Comparison Table / Children */}
        {children && (
          <div className="relative w-full">
            {children}
          </div>
        )}

      </div>
    </section>
  );
}
