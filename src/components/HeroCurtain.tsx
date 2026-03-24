'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function HeroCurtain() {
  const { scrollYProgress } = useScroll();

  // Шторка уходит значительно быстрее (диапазон 0 -> 0.15 вместо 0.4)
  const curtainY = useTransform(scrollYProgress, [0, 0.15], ["0%", "-105%"]);
  
  // Уменьшена плотность фона (opacity 0.6) для прозрачности
  const curtainOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  
  // Анимация букв ускорена
  const lettersY = useTransform(scrollYProgress, [0, 0.1], [0, -100]);

  return (
    <motion.div 
      style={{ y: curtainY }}
      className="fixed inset-0 z-[100] w-full h-screen bg-black/60 backdrop-blur-xl flex flex-col pointer-events-none select-none overflow-hidden"
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
              className="font-headline text-[15vw] md:text-[20vw] leading-none text-white tracking-tighter drop-shadow-2xl"
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
