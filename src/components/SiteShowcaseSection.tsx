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

  // Use spring for smoother transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  // --- PHASE 1 & 2: TYPOGRAPHY DIVERGENCE (0% -> 40%) ---
  const leftTextX = useTransform(smoothProgress, [0, 0.4, 1], ["0vw", "-45vw", "-65vw"]);
  const leftTextScale = useTransform(smoothProgress, [0, 0.4, 1], [1, 0.9, 0.85]);
  const leftTextOpacity = useTransform(
    smoothProgress, 
    [0, 0.35, 0.4, 0.8, 1], 
    [1, 1, 0.6, 0.55, 0.25]
  );

  const rightTextX = useTransform(smoothProgress, [0, 0.4, 1], ["0vw", "45vw", "65vw"]);
  const rightTextScale = useTransform(smoothProgress, [0, 0.4, 1], [1, 0.9, 0.85]);
  const rightTextOpacity = useTransform(
    smoothProgress, 
    [0, 0.35, 0.4, 0.8, 1], 
    [1, 1, 0.6, 0.55, 0.25]
  );

  const anchorOpacity = useTransform(
    smoothProgress, 
    [0, 0.4, 0.8, 1], 
    [0.8, 0.6, 0.5, 0.3]
  );

  // --- PHASE 3: IMAGE EMERGENCE (40% -> 80%) ---
  const leftImageY = useTransform(smoothProgress, [0.4, 0.6], ["100px", "0px"]);
  const leftImageOpacity = useTransform(smoothProgress, [0.4, 0.55], [0, 1]);
  
  const rightImageY = useTransform(smoothProgress, [0.45, 0.65], ["100px", "0px"]);
  const rightImageOpacity = useTransform(smoothProgress, [0.45, 0.6], [0, 1]);

  // --- PHASE 4: STACKING ---
  const sectionScale = useTransform(smoothProgress, [0.8, 1], [1, 0.95]);

  const leftCase = PlaceHolderImages.find(img => img.id === 'case-study-2');
  const rightCase = PlaceHolderImages.find(img => img.id === 'case-study-3');

  return (
    <div ref={containerRef} className="relative h-[350vh] bg-transparent z-10">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        <motion.div 
          style={{ scale: sectionScale }}
          className="w-full h-full flex items-center justify-center relative"
        >
          {/* Central Anchor */}
          <div className="absolute z-20 flex flex-col items-center justify-center pointer-events-none">
            <motion.div 
              style={{ opacity: anchorOpacity }}
              className="flex flex-col items-center text-primary leading-none"
            >
              <span className="mb-[1vh] text-[4vw] opacity-30 leading-none rotate-90 inline-block">「</span>
              
              <div className="flex flex-col items-center accent-italic text-[6.5vw] lowercase leading-[0.75]">
                {"your site".split("").map((char, i) => (
                  <span key={i} className="block">
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </div>
              
              <span className="mt-[1vh] text-[4vw] opacity-30 leading-none rotate-90 inline-block">」</span>
            </motion.div>
          </div>

          {/* Main Stage */}
          <div className="w-full h-full grid grid-cols-2 items-center px-[4vw]">
            <div className="relative flex justify-center items-center h-full">
              <motion.div 
                style={{ x: leftTextX, scale: leftTextScale, opacity: leftTextOpacity }}
                className="absolute heading-xl text-primary z-0 pointer-events-none text-center"
              >
                Explore<br />How
              </motion.div>
              <motion.div 
                style={{ y: leftImageY, opacity: leftImageOpacity }}
                className="relative w-[38vw] aspect-[3/4] rounded-[3vw] overflow-hidden shadow-[0_4vw_8vw_-1vw_rgba(0,0,0,0.25)] z-10"
              >
                <Image src={leftCase?.imageUrl || ''} alt="Case Study Left" fill className="object-cover" priority sizes="38vw" />
                <div className="absolute inset-0 bg-black/5 mix-blend-multiply" />
              </motion.div>
            </div>

            <div className="relative flex justify-center items-center h-full">
              <motion.div 
                style={{ x: rightTextX, scale: rightTextScale, opacity: rightTextOpacity }}
                className="absolute heading-xl text-primary z-0 pointer-events-none text-center"
              >
                Can Look<br />Like
              </motion.div>
              <motion.div 
                style={{ y: rightImageY, opacity: rightImageOpacity }}
                className="relative w-[38vw] aspect-[3/4] rounded-[3vw] overflow-hidden shadow-[0_4vw_8vw_-1vw_rgba(0,0,0,0.25)] z-10"
              >
                <Image src={rightCase?.imageUrl || ''} alt="Case Study Right" fill className="object-cover" priority sizes="38vw" />
                <div className="absolute inset-0 bg-black/5 mix-blend-multiply" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-[20vh] bg-gradient-to-t from-black/5 to-transparent pointer-events-none z-30" />
      </div>
    </div>
  );
}