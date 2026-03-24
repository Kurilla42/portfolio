'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface HeroCurtainProps {
  scrollProgress: MotionValue<number>;
}

export function HeroCurtain({ scrollProgress }: HeroCurtainProps) {
  // Шторка уходит полностью за первую треть (0.3) скролла Hero-контейнера
  const curtainY = useTransform(scrollProgress, [0, 0.4], ["0%", "-105%"]);
  
  // Прозрачность шторки и букв исчезает чуть раньше, чем она улетает
  const curtainOpacity = useTransform(scrollProgress, [0, 0.3], [1, 0]);
  
  // Анимация букв вверх для динамики
  const lettersY = useTransform(scrollProgress, [0, 0.3], [0, -150]);

  return (
    <motion.div 
      style={{ y: curtainY }}
      className="fixed inset-0 z-[100] w-full h-screen bg-black/40 backdrop-blur-md flex flex-col pointer-events-none select-none overflow-hidden"
    >
      {/* Middle Section: L P P L */}
      <div className="flex-1 flex items-center justify-center px-[8vw]">
        <motion.div 
          style={{ y: lettersY, opacity: curtainOpacity }}
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

      {/* Bottom Section: White line with WHATS LPPL? */}
      <motion.div 
        style={{ opacity: curtainOpacity }}
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
