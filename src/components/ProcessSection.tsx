"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ScrollRevealHeading } from '@/components/ScrollRevealHeading';

const steps = [
  {
    number: "DAY 01",
    title: "Discovery",
    location: "[STRATEGY CALL]",
    status: "UNDERSTANDING"
  },
  {
    number: "DAY 02",
    title: "Wireframing",
    location: "[BLUEPRINT]",
    status: "PLANNING"
  },
  {
    number: "DAY 03",
    title: "The Build",
    location: "[DEVELOPMENT]",
    status: "CRAFTING"
  },
  {
    number: "DAY 04",
    title: "Launch & Sync",
    location: "[GOING LIVE]",
    status: "REVENUE"
  }
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Internal Step Accumulation Scroll
  const { scrollYProgress: internalScroll } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Entrance Scroll (The 100% Overlap Stack Effect)
  const { scrollYProgress: entryScroll } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  const smoothInternal = useSpring(internalScroll, { stiffness: 80, damping: 25 });
  const smoothEntry = useSpring(entryScroll, { stiffness: 100, damping: 30 });

  const entryY = useTransform(
    smoothEntry, 
    [0, 1], 
    ["30vh", "0vh"]
  );
  
  const entryOpacity = 1;

  const entryScale = useTransform(
    smoothEntry, 
    [0, 1], 
    [0.98, 1]
  );

  return (
    <div 
      ref={containerRef} 
      className="relative h-[400vh] bg-background z-20 mt-[-100vh] shadow-[0_-30vh_50vh_rgba(0,0,0,0.15)]"
    >
      <motion.div 
        style={{ 
          y: entryY, 
          opacity: entryOpacity, 
          scale: entryScale 
        }}
        className="sticky top-0 h-screen w-full flex items-center overflow-hidden bg-background"
      >
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-[1fr_1.2fr]">
          
          {/* Left Side: Brand Anchor */}
          <div className="px-[8vw] flex flex-col justify-center h-full bg-background z-10">
            <span className="tag text-muted-foreground block mb-[5vh]">
              [OUR METHODOLOGY]
            </span>
            <div className="relative flex flex-col">
              <ScrollRevealHeading as="h2" className="heading-lg text-primary leading-[0.85] tracking-tighter">
                THE STEPS
              </ScrollRevealHeading>
              <div className="flex items-baseline gap-[1.5vw] -mt-[1vh]">
                <span className="accent-italic text-[6.5vw] lowercase leading-none">simple</span>
                <ScrollRevealHeading as="h2" className="heading-lg text-primary tracking-tighter leading-none">
                  TO FLOW
                </ScrollRevealHeading>
              </div>
            </div>
            <p className="max-w-[28vw] body-text mt-[8vh] text-primary/70 text-[1.1vw] leading-relaxed">
              A streamlined, high-performance approach from discovery call to a revenue-generating launch in just 10 days.
            </p>
          </div>

          {/* Right Side: Step Accumulation */}
          <div className="h-full flex flex-col justify-center px-[8vw] relative bg-background">
            <div className="flex flex-col gap-[2vh] w-full relative">
              {steps.map((step, index) => {
                const activeStart = index * 0.25;
                const activeEnd = (index + 1) * 0.25;
                
                const opacity = useTransform(smoothInternal, 
                  [activeStart - 0.1, activeStart, activeEnd, activeEnd + 0.25, activeEnd + 0.5], 
                  [0, 1, 0.6, 0.2, 0.15]
                );

                const y = useTransform(smoothInternal,
                  [activeStart - 0.1, activeStart, activeEnd, activeEnd + 0.25, activeEnd + 0.5],
                  [20, 0, -15, -30, -45]
                );

                const scale = useTransform(smoothInternal,
                  [activeStart - 0.1, activeStart, activeEnd],
                  [0.98, 1.05, 1]
                );

                const isVisible = useTransform(smoothInternal, 
                  p => p >= (index === 0 ? 0 : activeStart - 0.05)
                );

                return (
                  <motion.div
                    key={index}
                    style={{ 
                      opacity, 
                      y, 
                      scale,
                      display: isVisible ? 'block' : 'none'
                    }}
                    className="border-b border-primary/10 pb-[4vh] last:border-0 will-change-transform"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-[3vw]">
                      <div className="flex gap-[3vw] items-start">
                        <span className="services-item text-primary/10 leading-none pt-[1vh] !text-[3.5vw] min-w-[12vw]">
                          {step.number}
                        </span>
                        <div className="space-y-[1vh]">
                          <div className="space-y-[0.5vh]">
                            <h3 className="heading-md text-primary tracking-tighter">
                              {step.title}
                            </h3>
                            <p className="tag text-muted-foreground opacity-60">{step.location}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
