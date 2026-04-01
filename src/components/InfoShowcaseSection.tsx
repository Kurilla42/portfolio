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

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={containerRef} className="relative w-full z-20 overflow-hidden bg-black">
      {/* FIRST BLOCK: Typography with BACKGROUND IMAGE */}
      <div className="relative min-h-[70vh] md:min-h-screen w-full overflow-hidden">
        {/* Background Layer strictly for this part */}
        <div className="absolute inset-0 z-0 h-full w-full">
          <motion.div 
            style={{ y }}
            className="absolute -top-[10%] left-0 w-full h-[120%]"
          >
            <Image
              src={imageSrc}
              alt="Section Background"
              fill
              className="object-cover object-top"
              priority
              unoptimized
            />
            {/* Fade out to the bottom background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
          </motion.div>
        </div>

        {/* Big Letters */}
        <div className="relative z-10 h-full w-full flex items-start justify-between px-6 md:px-[5vw] pt-[15vh] md:pt-[10vh] pointer-events-none">
          <h2 className="text-[25vw] md:text-[30vw] font-headline leading-none text-[#e0ded8] tracking-tight select-none">
            IN
          </h2>
          <h2 className="text-[25vw] md:text-[30vw] font-headline leading-none text-[#e0ded8] tracking-tight select-none">
            FO
          </h2>
        </div>
      </div>

      {/* SECOND BLOCK: Quote and Decorative Line (Solid Black Background) */}
      <div className="relative z-10 w-full flex flex-col items-center text-center px-6 md:px-[4vw] pt-[5vh] pb-[5vh] md:pb-[8vh] bg-black">
        <p className="text-xl sm:text-2xl md:text-[3.0vw] font-headline uppercase leading-[1.3] md:leading-[1.1] text-[#e0ded8] tracking-normal max-w-full md:max-w-[85vw] mb-12 md:mb-16">
          {quote}
        </p>

        {/* Decorative Line with Image in Gap */}
        <div className="w-full flex items-center justify-center gap-2 md:gap-4 px-4 max-w-[90vw] mx-auto">
          <div className="flex-1 h-[1px] bg-white" />
          <div className="relative w-72 h-72 md:w-[60vw] md:h-[60vw] shrink-0">
            <Image 
              src="https://i.ibb.co/nN2y7dpt/generated-image-12-removebg-preview.png"
              alt="Decorative Icon"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="flex-1 h-[1px] bg-white" />
        </div>
      </div>

      {/* THIRD PART: Comparison Table / Children (Solid Black Background) */}
      {children && (
        <div className="relative z-10 w-full bg-black">
          {children}
        </div>
      )}
    </section>
  );
}
