"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ScrollRevealHeading } from '@/components/ScrollRevealHeading';

const steps = [
  {
    number: "DAY 01",
    title: "Discovery",
  },
  {
    number: "DAY 02",
    title: "Wireframing",
  },
  {
    number: "DAY 03",
    title: "The Build",
  },
  {
    number: "DAY 04",
    title: "Launch & Sync",
  }
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Internal Step Accumulation Scroll
  const { scrollYProgress: internalScroll } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Entrance Scroll
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

  return (
    <div 
      ref={containerRef} 
      className="relative h-[400vh] bg-transparent z-20 mt-[-100vh]"
    >
      <motion.div 
        style={{ 
          y: entryY, 
        }}
        className="sticky top-0 h-screen w-full flex items-center overflow-hidden bg-transparent"
      >
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-[1fr_1.2fr]">
          
          {/* Left Side: Brand Anchor */}
          <div className="px-[8vw] flex flex-col justify-center h-full bg-transparent z-10">
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
          <div className="h-full flex flex-col justify-center px-[8vw] relative bg-transparent">
            <div className="flex flex-col gap-[2vh] w-full relative">
              {steps.map((step, index) => {
                const activeStart = index * 0.25;
                const activeEnd = (index + 1) * 0.25;
                
                // No more fading out to very low opacity or blur
                // Text stays sharp and clearly visible once it reaches its point
                const opacity = useTransform(smoothInternal, 
                  [activeStart - 0.05, activeStart, activeEnd + 0.2], 
                  [0, 1, 0.8]
                );

                const y = useTransform(smoothInternal,
                  [activeStart - 0.05, activeStart, activeEnd + 0.2],
                  [20, 0, -15]
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
                      display: isVisible ? 'block' : 'none'
                    }}
                    className="border-b border-primary/10 pb-[4vh] last:border-0"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-[3vw]">
                      <div className="flex gap-[3vw] items-start">
                        <span className="services-item text-primary/10 leading-none pt-[1vh] !text-[3.5vw] min-w-[12vw]">
                          {step.number}
                        </span>
                        <div className="space-y-[1vh]">
                          <h3 className="heading-md text-primary tracking-tighter">
                            {step.title}
                          </h3>
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
