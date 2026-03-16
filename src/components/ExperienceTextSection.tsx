"use client";

import { useRef } from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
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

interface ExperienceTextSectionProps {
  progress: MotionValue<number>;
}

export function ExperienceTextSection({ progress }: ExperienceTextSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Появляется после того как Hero текст исчезает (0.2) и остается до начала наезда Монолита
  const opacity = useTransform(progress, [0.15, 0.35, 0.7, 0.9], [0, 1, 1, 0]);
  const y = useTransform(progress, [0.15, 0.35], [40, 0]);
  
  return (
    <motion.section 
      ref={containerRef} 
      style={{ opacity }}
      className="absolute inset-0 bg-transparent flex flex-col items-center justify-center px-[8vw] py-[15vh] z-30 text-center pointer-events-none"
    >
      <motion.div style={{ y }} className="max-w-[85vw] flex flex-col items-center">
        <span className="label text-white/40 block mb-[6vh] tracking-[0.2em] uppercase font-mono">[ THE PATTERN ]</span>
        <HighlightWipeHeading 
          as="p"
          lines={lines}
          className="heading-md text-white items-center"
          stagger={0.08}
        />
      </motion.div>
    </motion.section>
  );
}
