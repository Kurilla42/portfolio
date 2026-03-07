
"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const text = "For 12 years, I’ve studied what makes local service pages convert: strong offers, clear structure, trust elements, persuasive copy, mobile-first layouts, and calls to action that actually generate leads. That means you get more than a nice-looking website. You get a landing page built around how real customers think and how real service businesses win more jobs online.";

const words = text.split(" ");

function Word({ word, progress, range }: { word: string, progress: any, range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="relative inline-block mr-[0.25em] mb-[0.1em]">
      <span className="absolute opacity-15 select-none" aria-hidden="true">{word}</span>
      <motion.span style={{ opacity }}>{word}</motion.span>
    </span>
  );
}

export function ExperienceTextSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"]
  });

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[100vh] bg-[#97b0ad] flex items-center px-[8vw] py-[15vh] z-10"
    >
      <div className="max-w-[85vw]">
        <span className="label text-white/40 block mb-[6vh] tracking-[0.2em]">[ 12 YEARS OF PRECISION ]</span>
        <p className="text-[3.8vw] font-black leading-[1.05] tracking-tighter text-white uppercase font-sans">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = (i + 1) / words.length;
            return (
              <Word 
                key={i} 
                word={word} 
                progress={scrollYProgress} 
                range={[start, end]} 
              />
            );
          })}
        </p>
      </div>
    </section>
  );
}
