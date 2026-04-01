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
  imageSrc = "https://images.unsplash.com/photo-1659353588842-891391e6fcd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxwbHVtYmVyJTIwcHJvZmVzc2lvbmFsfGVufDB8fHx8MTc3MTM0OTIzMHww&ixlib=rb-4.1.0&q=80&w=1080",
  quote = "MY GOAL HAS ALWAYS BEEN TO grow revenue for my clients. I build high-converting landing pages, uniquely crafted from user insights and proven conversion principles - always setting you apart from the competition",
  children
}: InfoShowcaseSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect: image moves slightly slower than scroll to create depth
  // We use a taller container and start from 0 to avoid gaps at the top
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={containerRef} className="relative w-full z-20 overflow-hidden bg-black">
      {/* COMBINED BLOCK: IN FO + Quote with SPLIT BACKGROUND (200vh) */}
      <div className="relative min-h-[200vh] w-full flex flex-col">
        
        {/* Background Layer: Image pinned to top, fading to black at the bottom */}
        <div className="absolute inset-0 z-0 h-full w-full bg-black overflow-hidden">
          <motion.div 
            style={{ y }}
            className="absolute top-0 left-0 w-full h-[140vh]" 
          >
            <Image
              src={imageSrc}
              alt="Section Background"
              fill
              className="object-cover object-top" 
              priority
              unoptimized
            />
            {/* Fade to black transition: pushed to the very bottom of the image container */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent 50% via-black/20 75% via-black/80 90% to-black" />
          </motion.div>
        </div>

        {/* Content Area for IN FO and Quote */}
        <div className="relative z-10 flex flex-col items-center w-full">
           {/* Big Letters - Over the top of the image */}
           <div className="w-full flex items-start justify-between px-6 md:px-[5vw] pt-[15vh] md:pt-[10vh] pointer-events-none">
              <h2 className="text-[25vw] md:text-[30vw] font-headline leading-none text-[#e0ded8] tracking-tight select-none">
                IN
              </h2>
              <h2 className="text-[25vw] md:text-[30vw] font-headline leading-none text-[#e0ded8] tracking-tight select-none">
                FO
              </h2>
           </div>
           
           {/* Manifesto Text - Placed lower, transition area */}
           <div className="w-full text-center px-6 md:px-[4vw] pt-[60vh] md:pt-[80vh] pb-[20vh]">
             <p className="text-xl sm:text-2xl md:text-[3.0vw] font-headline uppercase leading-[1.3] md:leading-[1.1] text-[#e0ded8] tracking-normal max-w-full md:max-w-[85vw] mx-auto drop-shadow-2xl">
               {quote}
             </p>
           </div>
        </div>
      </div>

      {/* SEPARATE SECTION: Decorative Lines and Comparison Table */}
      <div className="relative z-10 w-full bg-black flex flex-col items-center pb-[15vh]">
        {/* Decorative Line with Image Gap */}
        <div className="w-full flex items-center justify-center gap-2 md:gap-4 px-4 max-w-[90vw] mx-auto mb-16 md:mb-24">
          <div className="flex-1 h-[1px] bg-white" />
          <div className="relative w-[35vw] h-[35vw] md:w-[45vw] md:h-[45vw] shrink-0">
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

        {/* Comparison Table (Children) */}
        {children && (
          <div className="w-full">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
