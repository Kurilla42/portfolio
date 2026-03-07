
"use client";

import { useRef } from 'react';
import { HighlightWipeHeading } from '@/components/HighlightWipeHeading';

const lines = [
  "For 12 years, I’ve studied what makes local",
  "service pages convert: strong offers, clear",
  "structure, trust elements, persuasive copy,",
  "mobile-first layouts, and calls to action",
  "that actually generate leads.",
  "",
  "That means you get more than a nice-looking",
  "website. You get a landing page built around",
  "how real customers think and how real",
  "service businesses win more jobs online."
];

export function ExperienceTextSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[100vh] bg-[#97b0ad] flex items-center px-[8vw] py-[15vh] z-10"
    >
      <div className="max-w-[85vw]">
        <span className="label text-white/40 block mb-[6vh] tracking-[0.2em] uppercase font-mono">[ 12 YEARS OF PRECISION ]</span>
        <HighlightWipeHeading 
          as="p"
          lines={lines}
          className="text-[3.8vw] font-black leading-[1.05] tracking-tighter text-white uppercase font-sans"
          stagger={0.08}
        />
      </div>
    </section>
  );
}
