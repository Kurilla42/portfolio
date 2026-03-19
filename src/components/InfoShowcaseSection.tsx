'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface InfoShowcaseSectionProps {
  imageSrc?: string;
  quote?: string;
}

export function InfoShowcaseSection({
  imageSrc = "https://i.ibb.co/TqPBr5F1/Whisk-3864d9b3b89f45385ae4b571ebd64a53dr.jpg",
  quote = "My goal has always been to elevate everyday interactions into something more meaningful and crucially, quietly threading in moments of joy that catch us by surprise and stay with us for years to come"
}: InfoShowcaseSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.2, 0.8], ["20px", "-20px"]);

  return (
    <div ref={containerRef} className="relative h-[200vh] bg-black overflow-visible z-20">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={imageSrc}
            alt="Showcase Background"
            fill
            className="object-cover brightness-75"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        </motion.div>

        {/* Massive Typography Layer */}
        <div className="absolute inset-0 z-10 flex items-center justify-between px-[4vw] pointer-events-none">
          <motion.h2 
            style={{ opacity }}
            className="text-[45vw] font-black leading-none text-white/90 tracking-tighter select-none"
          >
            IN
          </motion.h2>
          <motion.h2 
            style={{ opacity }}
            className="text-[45vw] font-black leading-none text-white/90 tracking-tighter select-none"
          >
            FO
          </motion.h2>
        </div>

        {/* Central Decorative Elements & Text */}
        <motion.div 
          style={{ opacity, y: textY }}
          className="relative z-20 flex flex-col items-center max-w-[40vw] text-center"
        >
          {/* Vertical Brackets with characters */}
          <div className="flex flex-col items-center mb-12">
            <div className="text-accent text-[3vw] leading-none mb-2">「</div>
            <div className="flex flex-col items-center gap-2 py-4">
              <span className="text-accent text-[2vw] font-serif font-bold leading-none">簡</span>
              <span className="text-accent text-[2vw] font-serif font-bold leading-none">介</span>
            </div>
            <div className="text-accent text-[3vw] leading-none">」</div>
          </div>

          {/* Quote Text */}
          <p className="body-text text-white text-[1.2vw] leading-relaxed font-medium uppercase tracking-wider">
            {quote}
          </p>
        </motion.div>

        {/* Side Accents (pixel copy style) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-12 z-30 opacity-40">
           <div className="w-[1px] h-[15vh] bg-white/20" />
           <div className="w-[1px] h-[15vh] bg-white/20" />
        </div>
      </div>
    </div>
  );
}
