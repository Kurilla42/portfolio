'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HeroCurtainProps {
  isLifted: boolean;
}

export function HeroCurtain({ isLifted }: HeroCurtainProps) {
  return (
    <motion.div 
      initial={{ y: "0%" }}
      animate={{ y: isLifted ? "-105%" : "0%" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] w-full h-screen bg-black/40 backdrop-blur-md flex flex-col pointer-events-none select-none overflow-hidden"
    >
      {/* Top Spacer to push letters to the middle/bottom */}
      <div className="flex-[0.5]" />

      {/* Middle/Bottom Section: Massive L P P L */}
      <div className="flex-1 flex items-end justify-center px-[4vw] pb-4">
        <motion.div 
          initial={{ y: 0, opacity: 1 }}
          animate={{ 
            y: isLifted ? -200 : 0, 
            opacity: isLifted ? 0 : 1 
          }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex justify-between items-end"
        >
          {["L", "P", "P", "L"].map((char, i) => (
            <span 
              key={i} 
              className="font-headline text-[22vw] md:text-[30vw] leading-[0.75] text-white tracking-tighter drop-shadow-2xl"
            >
              {char}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom Section: White line with WHATS LPPL? */}
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: isLifted ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        className="h-[6vh] w-full bg-white flex items-center px-[4vw] relative overflow-hidden shrink-0"
      >
        <span className="font-mono text-[10px] md:text-xs font-black text-black tracking-[0.4em] uppercase">
          WHATS LPPL?
        </span>
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-full h-[3px] bg-accent origin-left"
        />
      </motion.div>
    </motion.div>
  );
}
