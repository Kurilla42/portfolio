
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
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // --- PHASE 1 & 2: TEXT MOVEMENT (0% -> 40% and beyond) ---
  // Left Text: "EXPLORE HOW"
  const leftTextX = useTransform(smoothProgress, [0, 0.4, 1], ["0vw", "-45vw", "-65vw"]);
  const leftTextScale = useTransform(smoothProgress, [0, 0.4, 1], [1, 0.9, 0.85]);
  const leftTextOpacity = useTransform(smoothProgress, [0, 0.4, 1], [1, 0.55, 0.3]);

  // Right Text: "CAN LOOK LIKE"
  const rightTextX = useTransform(smoothProgress, [0, 0.4, 1], ["0vw", "45vw", "65vw"]);
  const rightTextScale = useTransform(smoothProgress, [0, 0.4, 1], [1, 0.9, 0.85]);
  const rightTextOpacity = useTransform(smoothProgress, [0, 0.4, 1], [1, 0.55, 0.3]);

  // Central Anchor: "YOUR SITE"
  const anchorOpacity = useTransform(smoothProgress, [0, 0.4, 1], [0.8, 0.6, 0.4]);

  // --- PHASE 3: IMAGE EMERGENCE (40% -> 100%) ---
  // Left Image
  const leftImageY = useTransform(smoothProgress, [0.4, 0.6], ["100px", "0px"]);
  const leftImageOpacity = useTransform(smoothProgress, [0.4, 0.55], [0, 1]);
  
  // Right Image (with 5% delay/stagger)
  const rightImageY = useTransform(smoothProgress, [0.45, 0.65], ["100px", "0px"]);
  const rightImageOpacity = useTransform(smoothProgress, [0.45, 0.6], [0, 1]);

  const leftCase = PlaceHolderImages.find(img => img.id === 'case-study-2');
  const rightCase = PlaceHolderImages.find(img => img.id === 'case-study-3');

  const siteName = "YOUR SITE".split("");

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-[#e5e5e5]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Phase 1 Anchor: Central Vertical Text */}
        <div className="absolute z-20 flex flex-col items-center justify-center pointer-events-none">
          <motion.div 
            style={{ opacity: anchorOpacity }}
            className="flex flex-col items-center text-[#8bacaa] font-black leading-none uppercase tracking-[0.25em]"
          >
            <span className="mb-[2vh] text-[6vw] opacity-30 leading-none">「</span>
            {siteName.map((char, i) => (
              <span key={i} className={char === " " ? "h-[4vh]" : "my-[0.2vh] text-[1.8vw] font-bold"}>
                {char}
              </span>
            ))}
            <span className="mt-[2vh] text-[6vw] opacity-30 leading-none">」</span>
          </motion.div>
        </div>

        {/* The Scenery */}
        <div className="w-full h-full grid grid-cols-2 items-center px-[4vw]">
          
          {/* Left Side: Text and Rising Image */}
          <div className="relative flex justify-center items-center h-full">
            <motion.div 
              style={{ 
                x: leftTextX, 
                scale: leftTextScale, 
                opacity: leftTextOpacity 
              }}
              className="absolute text-[12vw] font-black text-[#1a1a1a] uppercase tracking-tighter leading-[0.8] whitespace-nowrap z-0 pointer-events-none"
            >
              Explore<br />How
            </motion.div>
            
            <motion.div 
              style={{ y: leftImageY, opacity: leftImageOpacity }}
              className="relative w-[38vw] aspect-[3/4] rounded-[3vw] overflow-hidden shadow-[0_4vw_8vw_-1vw_rgba(0,0,0,0.25)] z-10"
            >
              <Image 
                src={leftCase?.imageUrl || ''} 
                alt="Case Study Left" 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/5 mix-blend-multiply" />
            </motion.div>
          </div>

          {/* Right Side: Text and Rising Image */}
          <div className="relative flex justify-center items-center h-full">
            <motion.div 
              style={{ 
                x: rightTextX, 
                scale: rightTextScale, 
                opacity: rightTextOpacity 
              }}
              className="absolute text-[12vw] font-black text-[#1a1a1a] uppercase tracking-tighter leading-[0.8] whitespace-nowrap z-0 pointer-events-none"
            >
              Can Look<br />Like
            </motion.div>

            <motion.div 
              style={{ y: rightImageY, opacity: rightImageOpacity }}
              className="relative w-[38vw] aspect-[3/4] rounded-[3vw] overflow-hidden shadow-[0_4vw_8vw_-1vw_rgba(0,0,0,0.25)] z-10"
            >
              <Image 
                src={rightCase?.imageUrl || ''} 
                alt="Case Study Right" 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/5 mix-blend-multiply" />
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
