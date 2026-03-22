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
  quote = "MY GOAL HAS ALWAYS BEEN TO ELEVATE EVERYDAY INTERACTIONS INTO SOMETHING MORE MEANINGFUL AND CRUCIALLY, QUIETLY THREADING IN MOMENTS OF JOY THAT CATCH US BY SURPRISE AND STAY WITH US FOR YEARS TO COME",
  children
}: InfoShowcaseSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section ref={containerRef} className="relative w-full z-20 overflow-hidden bg-[#0b0b0b]">
      {/* Shared Background Layer */}
      <div className="absolute inset-x-0 -top-[10%] z-0 h-[120%] w-full">
        <motion.div 
          style={{ y: backgroundY }}
          className="relative h-full w-full"
        >
          <Image
            src={imageSrc}
            alt="Shared Vertical Background"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full flex flex-col">
        
        {/* FIRST BLOCK: Typography */}
        <div className="h-screen w-full flex items-start justify-between px-6 md:px-[5vw] pt-[10vh] md:pt-[5vh] pointer-events-none">
          <h2 className="text-[25vw] md:text-[30vw] font-black leading-none text-white tracking-tighter select-none font-sans">
            IN
          </h2>
          <h2 className="text-[25vw] md:text-[30vw] font-black leading-none text-white tracking-tighter select-none font-sans">
            FO
          </h2>
        </div>

        {/* SECOND BLOCK: Quote */}
        <div className="h-screen w-full flex flex-col items-center justify-center text-center px-6 md:px-[4vw]">
          <div className="flex flex-col items-center mb-10 md:mb-16">
            <div className="relative w-24 h-32 md:w-32 md:h-40">
              <Image 
                src="https://i.ibb.co/JR9GrQfJ/image.png"
                alt="Decorative Icon"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>

          <p className="text-white text-base sm:text-lg md:text-[1.2vw] leading-[1.6] font-bold uppercase tracking-[0.05em] max-w-full md:max-w-[42vw] drop-shadow-lg">
            {quote}
          </p>
        </div>

        {/* THIRD PART: Comparison Table */}
        {children && (
          <div className="relative w-full">
            {children}
          </div>
        )}

      </div>
    </section>
  );
}
