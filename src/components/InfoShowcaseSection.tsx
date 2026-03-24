'use client';

import React, { useRef } from 'react';
import Image from 'next/image';

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
  
  return (
    <section ref={containerRef} className="relative w-full z-20 overflow-hidden">
      {/* Shared Background Layer */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Image
          src={imageSrc}
          alt="Section Background"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full flex flex-col">
        
        {/* FIRST BLOCK: Typography */}
        <div className="min-h-[70vh] md:min-h-screen w-full flex items-start justify-between px-6 md:px-[5vw] pt-[15vh] md:pt-[10vh] pointer-events-none">
          <h2 className="text-[25vw] md:text-[30vw] font-headline leading-none text-white tracking-tight select-none">
            IN
          </h2>
          <h2 className="text-[25vw] md:text-[30vw] font-headline leading-none text-white tracking-tight select-none">
            FO
          </h2>
        </div>

        {/* SECOND BLOCK: Quote and Decorative Line */}
        <div className="w-full flex flex-col items-center text-center px-6 md:px-[4vw] pt-[5vh] pb-[5vh] md:pb-[8vh]">
          <p className="text-xl sm:text-2xl md:text-[3.0vw] font-black uppercase leading-[1.3] md:leading-[1.1] text-white tracking-tighter max-w-full md:max-w-[80vw] drop-shadow-lg mb-12 md:mb-16">
            {quote}
          </p>

          {/* Decorative Line with Image in Gap */}
          <div className="w-full max-w-[94vw] flex items-center gap-4 md:gap-8 px-4">
            <div className="flex-1 h-[2px] bg-white opacity-100" />
            <div className="relative w-10 h-14 md:w-14 md:h-20 shrink-0">
              <Image 
                src="https://i.ibb.co/JR9GrQfJ/image.png"
                alt="Decorative Icon"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="flex-1 h-[2px] bg-white opacity-100" />
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
