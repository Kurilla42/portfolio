
"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function SiteShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Плавная пружина для всех трансформаций
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  // --- Анимация Исчезающего Текста (6vw) ---
  const textOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);

  // --- Анимация Появляющегося Фонового Текста (3vw) ---
  const bgTextOpacity = useTransform(smoothProgress, [0.1, 0.6], [0, 0.4]);
  const bgTextScale = useTransform(smoothProgress, [0.1, 0.6], [0.95, 1]);

  // --- Анимация Изображений (Выезд с самого низа экрана) ---
  const imageY = useTransform(smoothProgress, [0.05, 0.6], ["100vh", "0vh"]);
  const imageOpacity = useTransform(smoothProgress, [0.05, 0.4], [0, 1]);
  
  // Общее масштабирование секции в конце для эффекта отдаления
  const sectionScale = useTransform(smoothProgress, [0.8, 1], [1, 0.95]);

  const leftCase = PlaceHolderImages.find(img => img.id === 'case-study-2');
  const rightCase = PlaceHolderImages.find(img => img.id === 'case-study-3');

  const renderVerticalText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="block leading-[0.9]">{char}</span>
    ));
  };

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-black z-10">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        <motion.div 
          style={{ scale: sectionScale }}
          className="w-full h-full flex items-center justify-center relative"
        >
          {/* Central Background Text: YOUR SITE (Single Column Vertical / Inter / 3vw) */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <motion.div 
              style={{ opacity: bgTextOpacity, scale: bgTextScale }}
              className="flex flex-col items-center font-sans font-black text-[3vw] heading-md uppercase text-white leading-none"
            >
              <div className="flex flex-col items-center">
                {renderVerticalText("YOUR")}
              </div>
              <div className="h-[2vh]" aria-hidden="true" /> {/* Spacer between words */}
              <div className="flex flex-col items-center">
                {renderVerticalText("SITE")}
              </div>
            </motion.div>
          </div>

          {/* Main Stage: Images and Overlays */}
          <div className="w-full h-full grid grid-cols-2 items-center px-[4vw] relative z-10">
            {/* Left Side */}
            <div className="relative flex justify-center items-center h-full">
              <motion.div 
                style={{ opacity: textOpacity }}
                className="absolute heading-lg text-white z-20 pointer-events-none text-center"
              >
                EXPLORE<br />HOW YOUR
              </motion.div>
              <motion.div 
                style={{ y: imageY, opacity: imageOpacity }}
                className="relative w-[38vw] aspect-[3/4] rounded-[2vw] overflow-hidden shadow-[0_4vw_8vw_-1vw_rgba(0,0,0,0.8)] z-10"
              >
                <Image 
                  src={leftCase?.imageUrl || ''} 
                  alt="Case Study Left" 
                  fill 
                  className="object-cover object-top" 
                  priority 
                  unoptimized
                />
              </motion.div>
            </div>

            {/* Right Side */}
            <div className="relative flex justify-center items-center h-full">
              <motion.div 
                style={{ opacity: textOpacity }}
                className="absolute heading-lg text-white z-20 pointer-events-none text-center"
              >
                SITE CAN<br />LOOK LIKE
              </motion.div>
              <motion.div 
                style={{ y: imageY, opacity: imageOpacity }}
                className="relative w-[38vw] aspect-[3/4] rounded-[2vw] overflow-hidden shadow-[0_4vw_8vw_-1vw_rgba(0,0,0,0.8)] z-10"
              >
                <Image 
                  src={rightCase?.imageUrl || ''} 
                  alt="Case Study Right" 
                  fill 
                  className="object-cover object-top" 
                  priority 
                  unoptimized
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
