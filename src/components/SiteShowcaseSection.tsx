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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const textOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const imageY = useTransform(smoothProgress, [0.05, 0.6], ["100vh", "0vh"]);
  const imageOpacity = useTransform(smoothProgress, [0.05, 0.4], [0, 1]);
  
  const centralImageOpacity = useTransform(smoothProgress, [0, 0.65, 0.8], [1, 1, 0]);
  const centralTextOpacity = useTransform(smoothProgress, [0.75, 0.95], [0, 1]);
  const bgTextScale = useTransform(smoothProgress, [0.1, 0.6], [0.8, 1]);

  const sectionScale = useTransform(smoothProgress, [0.8, 1], [1, 0.95]);

  const leftCase = PlaceHolderImages.find(img => img.id === 'case-study-2');
  const rightCase = PlaceHolderImages.find(img => img.id === 'case-study-3');

  const renderVerticalText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="block leading-[1.4] mb-1">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className="relative h-[400vh] z-10">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://i.ibb.co/Y7Rzv80G/1.jpg"
          alt="Showcase Background"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        <motion.div 
          style={{ scale: sectionScale }}
          className="w-full h-full flex items-center justify-center relative"
        >
          {/* Central Background Elements */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none px-6">
            <div className="relative flex items-center justify-center">
              
              {/* Central decorative image - Reduced size by 30% */}
              <motion.div 
                style={{ 
                  opacity: centralImageOpacity, 
                  scale: bgTextScale,
                }}
                className="absolute z-10 w-[16.8vw] h-[22.4vw] md:w-[16.8vw] md:h-[21vw]"
              >
                <Image 
                  src="https://i.ibb.co/JR9GrQfJ/image.png"
                  alt="Decorative center element"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </motion.div>

              {/* YOUR SITE Text */}
              <motion.div 
                style={{ 
                  opacity: centralTextOpacity, 
                  scale: bgTextScale,
                }}
                className="flex flex-col items-center font-sans font-black text-4xl sm:text-6xl md:text-[3vw] uppercase text-white leading-none"
              >
                <div className="flex flex-col items-center">
                  {renderVerticalText("YOUR SITE")}
                </div>
              </motion.div>

            </div>
          </div>

          {/* Main Stage */}
          <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-[4vw] relative z-10 gap-8 md:gap-0">
            {/* Left Side */}
            <div className="relative flex justify-center items-center h-[40vh] md:h-full text-center">
              <motion.div 
                style={{ opacity: textOpacity }}
                className="absolute text-3xl sm:text-4xl md:text-[6vw] font-black uppercase text-white z-20 pointer-events-none leading-[1.1] tracking-tight"
              >
                EXPLORE<br />HOW YOUR
              </motion.div>
              <motion.div 
                style={{ y: imageY, opacity: imageOpacity }}
                className="relative w-[70vw] md:w-[38vw] aspect-[3/4] rounded-2xl md:rounded-[2vw] overflow-hidden z-10"
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
            <div className="relative flex justify-center items-center h-[40vh] md:h-full text-center">
              <motion.div 
                style={{ opacity: textOpacity }}
                className="absolute text-3xl sm:text-4xl md:text-[6vw] font-black uppercase text-white z-20 pointer-events-none leading-[1.1] tracking-tight"
              >
                SITE CAN<br />LOOK LIKE
              </motion.div>
              <motion.div 
                style={{ y: imageY, opacity: imageOpacity }}
                className="relative w-[70vw] md:w-[38vw] aspect-[3/4] rounded-2xl md:rounded-[2vw] overflow-hidden z-10"
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