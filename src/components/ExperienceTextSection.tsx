
"use client";

import { motion } from 'framer-motion';
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
  return (
    <div className="w-full flex flex-col items-center justify-center px-[8vw] text-center">
      <div className="max-w-[85vw] flex flex-col items-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.4, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="label text-white block mb-[6vh] tracking-[0.2em] uppercase font-mono"
        >
          [ THE PATTERN ]
        </motion.span>
        
        <HighlightWipeHeading 
          as="p"
          lines={lines}
          className="heading-md text-white items-center"
          stagger={0.08}
          triggerOnce={true}
        />
      </div>
    </div>
  );
}
