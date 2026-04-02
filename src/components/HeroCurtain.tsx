'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface HeroCurtainProps {
  isLifted: boolean;
}

export function HeroCurtain({ isLifted }: HeroCurtainProps) {
  return (
    <motion.div 
      initial={{ y: "0%" }}
      animate={{ y: isLifted ? "-105%" : "0%" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] w-full h-screen bg-black/70 backdrop-blur-md flex flex-col pointer-events-none select-none overflow-hidden"
    >
      {/* Top spacer significantly increased to push content lower */}
      <div className="flex-[0.8]" />

      {/* Middle Section: Centered vertically but shifted lower by spacers */}
      <div className="flex-1 flex items-center justify-center px-[4vw]">
        <motion.div 
          initial={{ y: 0, opacity: 1 }}
          animate={{ 
            y: isLifted ? -200 : 0, 
            opacity: isLifted ? 0 : 1 
          }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex justify-center items-end gap-[2vw] md:gap-[3vw]"
        >
          {/* First L and P */}
          <div className="flex items-end justify-start gap-[1.5vw] md:gap-[2vw]">
            <span className="font-headline text-[22vw] md:text-[30vw] leading-[0.75] text-[#e0ded8] tracking-tighter drop-shadow-2xl inline-block">L</span>
            <span className="font-headline text-[22vw] md:text-[30vw] leading-[0.75] text-[#e0ded8] tracking-tighter drop-shadow-2xl inline-block">P</span>
          </div>

          {/* Central Image - Base-aligned or slightly lower */}
          <div className="relative w-[22vw] md:w-[30vw] aspect-square mb-[-8vh] md:mb-[-12vh] shrink-0">
            <Image 
              src="https://i.ibb.co/LzYz8M3F/Whisk-4c956caa38384ae948e4da1d2626c136dr-removebg-preview.png"
              alt="Decorative accent"
              fill
              className="object-contain"
              unoptimized
            />
          </div>

          {/* Second P and L */}
          <div className="flex items-end justify-end gap-[1.5vw] md:gap-[2vw]">
            <span className="font-headline text-[22vw] md:text-[30vw] leading-[0.75] text-[#e0ded8] tracking-tighter drop-shadow-2xl inline-block">P</span>
            <span className="font-headline text-[22vw] md:text-[30vw] leading-[0.75] text-[#e0ded8] tracking-tighter drop-shadow-2xl inline-block">L</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section Spacer decreased to allow the shift */}
      <div className="flex-[0.3]" />

      {/* Bottom bar with WHATS LPPL? */}
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: isLifted ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        className="h-[6vh] w-full bg-black/40 flex items-center justify-center px-[4vw] relative overflow-hidden shrink-0 border-t border-[#e0ded8]/5"
      >
        <span className="font-mono text-[14px] md:text-[18px] font-black text-[#e0ded8] tracking-[0.4em] uppercase">
          WHATS LPPL?
        </span>
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-full h-[3px] bg-[#c7b684] origin-left"
        />
      </motion.div>
    </motion.div>
  );
}
