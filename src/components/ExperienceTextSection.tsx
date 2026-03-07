
"use client";

import { useRef } from 'react';
import { HighlightWipeHeading } from '@/components/HighlightWipeHeading';

const lines = [
  "After 12 years of internet marketing and studying",
  "hundreds of local service websites, I noticed",
  "a pattern: the same mistakes showed up again",
  "and again. Pages that looked professional",
  "but generated almost no calls.",
  "",
  "The problem wasn't traffic. It wasn't the budget.",
  "It was 5 specific things that most web designers",
  "simply don't think about — because they",
  "think like designers, not marketers."
];

export function ExperienceTextSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[100vh] bg-[#97b0ad] flex flex-col items-center justify-center px-[8vw] py-[15vh] z-10 text-center"
    >
      <div className="max-w-[85vw] flex flex-col items-center">
        <span className="label text-white/40 block mb-[6vh] tracking-[0.2em] uppercase font-mono">[ THE PATTERN ]</span>
        <HighlightWipeHeading 
          as="p"
          lines={lines}
          className="text-[3.8vw] font-black leading-[1.05] tracking-tighter text-white uppercase font-sans items-center"
          stagger={0.08}
        />
      </div>
    </section>
  );
}
