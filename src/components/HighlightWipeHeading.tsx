'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HighlightWipeHeadingProps {
  lines: string[];
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  className?: string;
  stagger?: number;
  triggerOnce?: boolean;
  delay?: number;
}

export function HighlightWipeHeading({
  lines,
  as: Component = 'h2',
  className,
  stagger = 0.1,
  triggerOnce = true,
  delay = 0,
}: HighlightWipeHeadingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: triggerOnce, amount: 0.2 });

  return (
    <Component ref={ref} className={cn("flex flex-col", className)}>
      {lines.map((line, index) => (
        <span key={index} className="relative overflow-hidden inline-block w-fit py-1 mb-1">
          {/* Animated Dark Bar */}
          <motion.span
            initial={{ x: '-101%' }}
            animate={isInView ? { x: ['-101%', '0%', '101%'] } : { x: '-101%' }}
            transition={{
              duration: 1.1,
              times: [0, 0.4, 1],
              ease: [0.4, 0, 0.2, 1],
              delay: delay + (index * stagger),
            }}
            className="absolute inset-0 bg-[#111111] z-10 block"
            style={{ height: '115%', top: '-7.5%' }}
          />
          
          {/* Text revealed behind the bar */}
          <motion.span
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={isInView ? { clipPath: ['inset(0 100% 0 0)', 'inset(0 100% 0 0)', 'inset(0 0% 0 0)'] } : { clipPath: 'inset(0 100% 0 0)' }}
            transition={{
              duration: 1.1,
              times: [0, 0.4, 1],
              ease: [0.4, 0, 0.2, 1],
              delay: delay + (index * stagger),
            }}
            className="relative z-0 block whitespace-nowrap"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
