
"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function SiteShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Отслеживаем прогресс скролла внутри контейнера
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Анимации для левого текста (исчезает и уходит влево)
  const leftTextOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const leftTextX = useTransform(scrollYProgress, [0, 0.4], [0, -100]);

  // Анимации для правого текста (исчезает и уходит вправо)
  const rightTextOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const rightTextX = useTransform(scrollYProgress, [0, 0.4], [0, 100]);

  // Анимации для картинок (появляются снизу)
  const imageY = useTransform(scrollYProgress, [0.3, 0.8], [300, 0]);
  const imageOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  const siteName = "YOUR SITE".split("");
  const leftImage = PlaceHolderImages.find(img => img.id === 'case-study-2');
  const rightImage = PlaceHolderImages.find(img => img.id === 'case-study-3');

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-[#e5e5e5]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Центральный вертикальный текст - Увеличен масштаб */}
        <div className="absolute z-20 flex flex-col items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center text-[#8bacaa] font-black text-3xl md:text-5xl lg:text-6xl leading-none uppercase tracking-[0.2em]">
            <span className="mb-6 text-6xl md:text-8xl opacity-30">「</span>
            {siteName.map((char, i) => (
              <span key={i} className={char === " " ? "h-10 md:h-16" : "my-1"}>
                {char}
              </span>
            ))}
            <span className="mt-6 text-6xl md:text-8xl opacity-30">」</span>
          </div>
        </div>

        <div className="w-full h-full grid grid-cols-2 items-center">
          
          {/* Левая сторона - Explore How */}
          <div className="relative flex justify-end items-center h-full pr-10 md:pr-20">
            <motion.div 
              style={{ opacity: leftTextOpacity, x: leftTextX }}
              className="absolute text-7xl md:text-[10vw] lg:text-[12vw] font-black text-[#1a1a1a] uppercase tracking-tighter text-right leading-[0.8] z-10"
            >
              Explore<br />How
            </motion.div>
            
            <motion.div 
              style={{ y: imageY, opacity: imageOpacity }}
              className="relative w-[85%] md:w-[75%] aspect-[3/4] rounded-[40px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]"
            >
              <Image 
                src={leftImage?.imageUrl || ''} 
                alt="Showcase left" 
                fill 
                className="object-cover"
                priority
              />
            </motion.div>
          </div>

          {/* Правая сторона - Can Look Like */}
          <div className="relative flex justify-start items-center h-full pl-10 md:pl-20">
            <motion.div 
              style={{ opacity: rightTextOpacity, x: rightTextX }}
              className="absolute text-7xl md:text-[10vw] lg:text-[12vw] font-black text-[#1a1a1a] uppercase tracking-tighter text-left leading-[0.8] z-10"
            >
              Can Look<br />Like
            </motion.div>

            <motion.div 
              style={{ y: imageY, opacity: imageOpacity }}
              className="relative w-[85%] md:w-[75%] aspect-[3/4] rounded-[40px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]"
            >
              <Image 
                src={rightImage?.imageUrl || ''} 
                alt="Showcase right" 
                fill 
                className="object-cover"
                priority
              />
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
