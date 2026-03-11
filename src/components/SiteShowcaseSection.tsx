
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

  // --- Анимация Текста (Растворение) ---
  const textOpacity = useTransform(smoothProgress, [0, 0.35], [1, 0]);
  const textScale = useTransform(smoothProgress, [0, 0.35], [1, 0.95]);

  // --- Анимация Фонового Текста "YOUR SITE" ---
  const bgTextOpacity = useTransform(smoothProgress, [0.1, 0.5], [0, 0.6]);
  const bgTextScale = useTransform(smoothProgress, [0.1, 0.5], [0.8, 1]);

  // --- Анимация Изображений (Выезд снизу) ---
  const imageY = useTransform(smoothProgress, [0.1, 0.5], ["60vh", "0vh"]);
  const imageOpacity = useTransform(smoothProgress, [0.1, 0.4], [0, 1]);
  
  // Общее масштабирование секции в конце
  const sectionScale = useTransform(smoothProgress, [0.8, 1], [1, 0.95]);

  const leftCase = PlaceHolderImages.find(img => img.id === 'case-study-2');
  const rightCase = PlaceHolderImages.find(img => img.id === 'case-study-3');

  return (
    <div ref={containerRef} className="relative h-[350vh] bg-black z-10">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        <motion.div 
          style={{ scale: sectionScale }}
          className="w-full h-full flex items-center justify-center relative"
        >
          {/* Central Background Text: YOUR SITE */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <motion.div 
              style={{ opacity: bgTextOpacity, scale: bgTextScale }}
              className="flex flex-col items-center"
            >
              <div className="flex flex-col items-center accent-italic text-[10vw] lowercase leading-[0.75] text-white/40">
                <span className="block">your</span>
                <span className="block">site</span>
              </div>
            </motion.div>
          </div>

          {/* Main Stage: Images and Overlays */}
          <div className="w-full h-full grid grid-cols-2 items-center px-[4vw] relative z-10">
            {/* Left Side */}
            <div className="relative flex justify-center items-center h-full">
              <motion.div 
                style={{ opacity: textOpacity, scale: textScale }}
                className="absolute heading-xl text-white z-20 pointer-events-none text-center"
              >
                EXPLORE<br />HOW YOUR
              </motion.div>
              <motion.div 
                style={{ y: imageY, opacity: imageOpacity }}
                className="relative w-[38vw] aspect-[3/4] rounded-[3vw] overflow-hidden shadow-[0_4vw_8vw_-1vw_rgba(0,0,0,0.5)] z-10"
              >
                <Image 
                  src={leftCase?.imageUrl || ''} 
                  alt="Case Study Left" 
                  fill 
                  className="object-cover object-top" 
                  priority 
                  unoptimized
                  quality={100}
                />
              </motion.div>
            </div>

            {/* Right Side */}
            <div className="relative flex justify-center items-center h-full">
              <motion.div 
                style={{ opacity: textOpacity, scale: textScale }}
                className="absolute heading-xl text-white z-20 pointer-events-none text-center"
              >
                SITE CAN<br />LOOK LIKE
              </motion.div>
              <motion.div 
                style={{ y: imageY, opacity: imageOpacity }}
                className="relative w-[38vw] aspect-[3/4] rounded-[3vw] overflow-hidden shadow-[0_4vw_8vw_-1vw_rgba(0,0,0,0.5)] z-10"
              >
                <Image 
                  src={rightCase?.imageUrl || ''} 
                  alt="Case Study Right" 
                  fill 
                  className="object-cover object-top" 
                  priority 
                  unoptimized
                  quality={100}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Fade Gradient for transitions */}
        <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-black to-transparent pointer-events-none z-30" />
      </div>
    </div>
  );
}
