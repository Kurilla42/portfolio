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
  imageSrc = "https://i.ibb.co/LDgsQj1v/Whisk-yiomrjz2igmijtntcjnkhtl1ejz00cn3ujmtgd.jpg",
  quote = "MY GOAL HAS ALWAYS BEEN TO grow revenue for my clients. I build <span class='text-[#c7b684]'>high-converting</span> landing pages, uniquely crafted from user insights and proven conversion principles - always <span class='text-[#c7b684]'>setting you apart</span> from the competition",
  children
}: InfoShowcaseSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={containerRef} className="relative w-full z-20 overflow-hidden bg-black">
      <div className="relative min-h-[160vh] w-full flex flex-col">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0 h-full w-full bg-black overflow-hidden">
          <motion.div 
            style={{ y }}
            className="absolute -top-[5%] left-0 w-full h-[140vh]" 
          >
            <Image
              src={imageSrc}
              alt="Section Background"
              fill
              className="object-cover object-top" 
              priority
              unoptimized
            />
            {/* Gradient Overlay starts exactly at the text area */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent 60% to-black" />
          </motion.div>
        </div>

        {/* IN FO Letters */}
        <div className="relative z-10 flex flex-col items-center w-full h-full">
           <div className="w-full flex items-start justify-between px-6 md:px-[5vw] pt-[15vh] md:pt-[10vh] pointer-events-none">
              <h2 className="text-[25vw] md:text-[30vw] font-headline leading-none text-[#e0ded8] tracking-tight select-none">
                IN
              </h2>
              <h2 className="text-[25vw] md:text-[30vw] font-headline leading-none text-[#e0ded8] tracking-tight select-none">
                FO
              </h2>
           </div>
           
           {/* Manifest Quote */}
           <div className="w-full text-center px-6 md:px-[4vw] pt-[30vh] md:pt-[45vh] pb-0 mt-auto">
             <p 
               className="text-xl sm:text-2xl md:text-[3.0vw] font-headline uppercase leading-[1.3] md:leading-[1.1] text-[#e0ded8] tracking-normal max-w-full md:max-w-[85vw] mx-auto drop-shadow-2xl"
               dangerouslySetInnerHTML={{ __html: quote }}
             />
           </div>
        </div>
      </div>

      {/* Decorative and Additional Content Area */}
      <div className="relative z-10 w-full bg-black flex flex-col items-center pb-0 pt-0">
        <div className="w-full flex items-center justify-center gap-2 md:gap-4 px-4 max-w-[90vw] mx-auto mb-2 md:mb-4">
          <div className="flex-1 h-[1px] bg-white/20" />
          <div className="relative w-[3.9375vw] h-[3.9375vw] shrink-0">
            <Image 
              src="https://i.ibb.co/WpR3h82f/generated-image-12-removebg-preview.png"
              alt="Decorative Icon"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="flex-1 h-[1px] bg-white/20" />
        </div>

        {children && (
          <div className="w-full">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
