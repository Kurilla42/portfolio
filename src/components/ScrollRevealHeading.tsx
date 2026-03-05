"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealHeadingProps {
  children: string | string[];
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  stagger?: number;
  subheading?: boolean;
}

export function ScrollRevealHeading({
  children,
  as: Component = "h2",
  className,
  stagger = 0.1,
  subheading = false,
}: ScrollRevealHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxProgress, setMaxProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.35"],
  });

  // Track max progress to prevent reverse animation on scroll up
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > maxProgress) {
      setMaxProgress(latest);
    }
  });

  const lines = Array.isArray(children) ? children : [children];

  return (
    <div ref={containerRef} className={cn("flex flex-col", className)}>
      {lines.map((line, index) => (
        <Line 
          key={index} 
          line={line} 
          index={index} 
          progress={maxProgress} 
          stagger={stagger} 
          Component={Component}
          subheading={subheading}
        />
      ))}
    </div>
  );
}

function Line({ 
  line, 
  index, 
  progress, 
  stagger, 
  Component,
  subheading 
}: { 
  line: string; 
  index: number; 
  progress: number; 
  stagger: number;
  Component: any;
  subheading: boolean;
}) {
  // Adjust progress per line based on stagger
  const lineStart = index * stagger;
  const lineProgress = Math.min(Math.max((progress - lineStart) / (1 - lineStart || 1), 0), 1);

  if (subheading) {
    // Simpler reveal for small tags/subheadings
    return (
      <motion.div
        style={{
          opacity: lineProgress,
          y: (1 - lineProgress) * 10,
        }}
        className="will-change-transform"
      >
        <Component>{line}</Component>
      </motion.div>
    );
  }

  // Dramatic vertical mask reveal for main headings
  // clip-path: inset(top, right, bottom, left)
  // top 100% -> 0% reveals bottom up
  const topClip = (1 - lineProgress) * 100;
  const translateY = (1 - lineProgress) * 20;
  const opacity = 0.2 + (lineProgress * 0.8);

  return (
    <div className="mask-container">
      <motion.div
        style={{
          clipPath: `inset(${topClip}% 0 0 0)`,
          y: translateY,
          opacity: opacity,
        }}
        className="will-change-transform"
      >
        <Component>{line}</Component>
      </motion.div>
    </div>
  );
}