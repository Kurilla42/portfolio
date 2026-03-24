
'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function HeroCurtain() {
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"]
  });

  // Шторка уходит вверх при скролле (от 0 до 50% высоты контейнера)
  const curtainY = useTransform(scrollYProgress, [0, 0.4], ["0%", "-105%"]);
  
  // Размытие и затемнение фона шторки
  const curtainOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  
  // Анимация букв (расхождение или просто уход вместе со шторкой)
  const lettersY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  return (
    <motion.div 
      style={{ y: curtainY }}
      className="fixed inset-0 z-[100] w-full h-screen bg-[#0b0b0b]/95 backdrop-blur-2xl flex flex-col pointer-events-none select-none overflow-hidden"
    >
      {/* Middle Section: L P P L */}
      <div className="flex-1 flex items-center justify-center px-[8vw]">
        <motion.div 
          style={{ y: lettersY }}
          className="w-full flex justify-between items-center"
        >
          {["L", "P", "P", "L"].map((char, i) => (
            <span 
              key={i} 
              className="font-headline text-[15vw] md:text-[20vw] leading-none text-white tracking-tighter"
            >
              {char}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom Section: Opaque line with WHATS LPPL? */}
      <div className="h-[5vh] w-full bg-white flex items-center px-[4vw] relative overflow-hidden">
        <span className="font-mono text-[10px] md:text-xs font-bold text-black tracking-[0.3em] uppercase">
          WHATS LPPL?
        </span>
        {/* Decorative progress line effect */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-full h-[2px] bg-accent origin-left"
        />
      </div>
    </motion.div>
  );
}
