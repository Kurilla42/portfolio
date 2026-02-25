
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
  const leftTextX = useTransform(scrollYProgress, [0, 0.4], [0, -50]);

  // Анимации для правого текста (исчезает и уходит вправо)
  const rightTextOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const rightTextX = useTransform(scrollYProgress, [0, 0.4], [0, 50]);

  // Анимации для картинок (появляются снизу)
  const imageY = useTransform(scrollYProgress, [0.3, 0.8], [200, 0]);
  const imageOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  const siteName = "YOUR SITE".split("");
  const leftImage = PlaceHolderImages.find(img => img.id === 'case-study-2');
  const rightImage = PlaceHolderImages.find(img => img.id === 'case-study-3');

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-[#e5e5e5]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Центральный вертикальный текст */}
        <div className="absolute z-20 flex flex-col items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center text-[#8bacaa] font-black text-xl md:text-2xl leading-none uppercase tracking-widest">
            <span className="mb-4 text-4xl opacity-40">「</span>
            {siteName.map((char, i) => (
              <span key={i} className={char === " " ? "h-6" : "my-0.5"}>
                {char}
              </span>
            ))}
            <span className="mt-4 text-4xl opacity-40">」</span>
          </div>
        </div>

        <div className="container-custom w-full grid grid-cols-2 gap-20 md:gap-40 items-center">
          
          {/* Левая сторона */}
          <div className="relative flex justify-end items-center h-full">
            <motion.div 
              style={{ opacity: leftTextOpacity, x: leftTextX }}
              className="absolute text-5xl md:text-8xl font-black text-[#1a1a1a] uppercase tracking-tighter text-right leading-none z-10"
            >
              Explore<br />How
            </motion.div>
            
            <motion.div 
              style={{ y: imageY, opacity: imageOpacity }}
              className="relative w-full aspect-[4/5] md:w-[80%] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image 
                src={leftImage?.imageUrl || ''} 
                alt="Showcase left" 
                fill 
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Правая сторона */}
          <div className="relative flex justify-start items-center h-full">
            <motion.div 
              style={{ opacity: rightTextOpacity, x: rightTextX }}
              className="absolute text-5xl md:text-8xl font-black text-[#1a1a1a] uppercase tracking-tighter text-left leading-none z-10"
            >
              Can Look<br />Like
            </motion.div>

            <motion.div 
              style={{ y: imageY, opacity: imageOpacity }}
              className="relative w-full aspect-[4/5] md:w-[80%] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image 
                src={rightImage?.imageUrl || ''} 
                alt="Showcase right" 
                fill 
                className="object-cover"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
