
"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function SiteShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const leftTextOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const leftTextX = useTransform(scrollYProgress, [0, 0.4], [0, -200]);

  const rightTextOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const rightTextX = useTransform(scrollYProgress, [0, 0.4], [0, 200]);

  const imageY = useTransform(scrollYProgress, [0.3, 0.8], [500, 0]);
  const imageOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  const siteName = "YOUR SITE".split("");
  const leftImage = PlaceHolderImages.find(img => img.id === 'case-study-2');
  const rightImage = PlaceHolderImages.find(img => img.id === 'case-study-3');

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-[#e5e5e5]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Central Vertical Text */}
        <div className="absolute z-20 flex flex-col items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center text-[#8bacaa] font-black leading-none uppercase tracking-[0.25em]">
            <span className="mb-[4vh] text-[8vw] opacity-30">「</span>
            {siteName.map((char, i) => (
              <span key={i} className={char === " " ? "h-[8vh]" : "my-[0.5vh] text-[4vw]"}>
                {char}
              </span>
            ))}
            <span className="mt-[4vh] text-[8vw] opacity-30">」</span>
          </div>
        </div>

        <div className="w-full h-full grid grid-cols-2 items-center">
          
          {/* Left Side */}
          <div className="relative flex justify-end items-center h-full pr-[8vw]">
            <motion.div 
              style={{ opacity: leftTextOpacity, x: leftTextX }}
              className="absolute text-[12vw] font-black text-[#1a1a1a] uppercase tracking-tighter text-right leading-[0.8] z-10"
            >
              Explore<br />How
            </motion.div>
            
            <motion.div 
              style={{ y: imageY, opacity: imageOpacity }}
              className="relative w-[35vw] aspect-[3/4] rounded-[5vw] overflow-hidden shadow-[0_4vw_8vw_-1vw_rgba(0,0,0,0.3)]"
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

          {/* Right Side */}
          <div className="relative flex justify-start items-center h-full pl-[8vw]">
            <motion.div 
              style={{ opacity: rightTextOpacity, x: rightTextX }}
              className="absolute text-[12vw] font-black text-[#1a1a1a] uppercase tracking-tighter text-left leading-[0.8] z-10"
            >
              Can Look<br />Like
            </motion.div>

            <motion.div 
              style={{ y: imageY, opacity: imageOpacity }}
              className="relative w-[35vw] aspect-[3/4] rounded-[5vw] overflow-hidden shadow-[0_4vw_8vw_-1vw_rgba(0,0,0,0.3)]"
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
