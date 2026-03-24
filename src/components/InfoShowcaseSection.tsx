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
      {/* Shared Background Layer - Static (Parallax removed) */}
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
        <div className="h-screen w-full flex items-start justify-between px-6 md:px-[5vw] pt-[10vh] md:pt-[5vh] pointer-events-none">
          <h2 className="text-[25vw] md:text-[30vw] font-headline leading-none text-white tracking-tight select-none">
            IN
          </h2>
          <h2 className="text-[25vw] md:text-[30vw] font-headline leading-none text-white tracking-tight select-none">
            FO
          </h2>
        </div>

        {/* SECOND BLOCK: Quote */}
        <div className="h-screen w-full flex flex-col items-center justify-center text-center px-6 md:px-[4vw]">
          <p className="text-xl sm:text-2xl md:text-[3.0vw] font-black uppercase leading-[1.3] md:leading-[1.1] text-white tracking-tighter max-w-full md:max-w-[80vw] drop-shadow-lg mb-12 md:mb-16">
            {quote}
          </p>

          {/* Decorative Line with Image in Gap */}
          <div className="w-full max-w-[92vw] flex items-center gap-6 px-4">
            <div className="flex-1 h-[1.5px] bg-white" />
            <div className="relative w-14 h-18 md:w-16 md:h-22 shrink-0">
              <Image 
                src="https://i.ibb.co/JR9GrQfJ/image.png"
                alt="Decorative Icon"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="flex-1 h-[1.5px] bg-white" />
          </div>
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
