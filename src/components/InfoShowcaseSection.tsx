'use client';

import { motion } from 'framer-motion';
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
  
  return (
    <div ref={containerRef} className="relative h-[200vh] bg-black overflow-visible z-20">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image - Full brightness, no parallax */}
        <div className="absolute inset-0 z-0">
          <Image
            src={imageSrc}
            alt="Showcase Background"
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Massive Typography Layer - Static 10vw size */}
        <div className="absolute inset-0 z-10 flex items-center justify-between px-[10vw] pointer-events-none">
          <h2 className="text-[10vw] font-black leading-none text-white/20 tracking-tighter select-none">
            IN
          </h2>
          <h2 className="text-[10vw] font-black leading-none text-white/20 tracking-tighter select-none">
            FO
          </h2>
        </div>

        {/* Central Content - Static position */}
        <div className="relative z-20 flex flex-col items-center max-w-[50vw] text-center">
          {/* Vertical Brackets with characters */}
          <div className="flex flex-col items-center mb-12">
            <div className="text-accent text-[4vw] leading-none mb-2">「</div>
            <div className="flex flex-col items-center gap-2 py-4">
              <span className="text-accent text-[2.5vw] font-serif font-bold leading-none">簡</span>
              <span className="text-accent text-[2.5vw] font-serif font-bold leading-none">介</span>
            </div>
            <div className="text-accent text-[4vw] leading-none">」</div>
          </div>

          {/* Quote Text */}
          <p className="body-text text-white text-[1.4vw] leading-relaxed font-medium uppercase tracking-wider max-w-[35vw]">
            {quote}
          </p>
        </div>
      </div>
    </div>
  );
}
