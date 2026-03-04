
"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Discovery",
    location: "[STRATEGY CALL]",
    description: "A focused strategy session to map your business goals and high-intent service areas.",
    period: "DAY 01",
    status: "UNDERSTANDING"
  },
  {
    number: "02",
    title: "Wireframing",
    location: "[BLUEPRINT]",
    description: "We architect the conversion flow and write psychological copy that drives action.",
    period: "DAY 02-04",
    status: "PLANNING"
  },
  {
    number: "03",
    title: "The Build",
    location: "[DEVELOPMENT]",
    description: "Precision coding focused on speed, local SEO visibility, and high-end aesthetics.",
    period: "DAY 05-08",
    status: "CRAFTING"
  },
  {
    number: "04",
    title: "Launch & Sync",
    location: "[GOING LIVE]",
    description: "Final optimization, CRM integration, and a hand-over of your new lead-gen engine.",
    period: "DAY 10",
    status: "REVENUE"
  }
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Internal Step Scroll
  const { scrollYProgress: internalScroll } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Entrance Scroll (for the overlap effect)
  const { scrollYProgress: entryScroll } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  const smoothInternal = useSpring(internalScroll, { stiffness: 80, damping: 25 });
  const smoothEntry = useSpring(entryScroll, { stiffness: 100, damping: 30 });

  // Entrance Animation Transforms based on User-specified t points
  const entryY = useTransform(smoothEntry, [0, 0.33, 0.66, 1], [100, 65, 30, 0]);
  const entryOpacity = useTransform(smoothEntry, [0, 0.33, 0.66, 1], [0.1, 0.4, 0.75, 1]);
  const entryScale = useTransform(smoothEntry, [0, 1], [0.97, 1]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-background z-40">
      <motion.div 
        style={{ 
          y: entryY, 
          opacity: entryOpacity, 
          scale: entryScale 
        }}
        className="sticky top-0 h-screen w-full flex items-center overflow-hidden"
      >
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-[1fr_1.2fr]">
          
          {/* Left Side: Brand Anchor */}
          <div className="px-[8vw] flex flex-col justify-center h-full border-r border-primary/5 bg-background z-10">
            <span className="tag text-muted-foreground block mb-[5vh] reveal-text">
              [OUR METHODOLOGY]
            </span>
            <div className="relative">
              <h2 className="heading-md text-primary leading-[0.85] flex flex-col tracking-tighter reveal-text text-[4.5vw]">
                <span>THE</span>
                <span className="relative">
                  STEPS
                  <span className="accent-italic lowercase text-[0.3em] absolute -top-[3vh] left-[20%] z-20 opacity-80">
                    simple
                  </span>
                </span>
                <span>TO FLOW</span>
              </h2>
            </div>
            <p className="max-w-[28vw] body-text mt-[8vh] reveal-text reveal-delay-1 text-primary/70 text-[1.1vw] leading-relaxed">
              A streamlined, high-performance approach from discovery call to a revenue-generating launch in just 10 days.
            </p>
          </div>

          {/* Right Side: Step Accumulation */}
          <div className="h-full flex flex-col justify-center px-[8vw] relative bg-background">
            <div className="flex flex-col gap-[2vh] w-full relative">
              {steps.map((step, index) => {
                const activeStart = index * 0.25;
                const activeEnd = (index + 1) * 0.25;
                
                // Accumulation Logic: Active -> Previous -> Old
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

                const isRendered = useTransform(smoothInternal, 
                  p => p >= (index === 0 ? 0 : activeStart - 0.05)
                );

                return (
                  <motion.div
                    key={index}
                    style={{ 
                      opacity, 
                      y, 
                      scale,
                      display: isRendered ? 'block' : 'none'
                    }}
                    className="border-b border-primary/10 pb-[4vh] last:border-0 will-change-transform"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-[3vw]">
                      <div className="flex gap-[3vw] items-start">
                        <span className="services-item text-primary/5 leading-none pt-[1vh]">
                          {step.number}
                        </span>
                        <div className="space-y-[2vh]">
                          <div className="space-y-[0.5vh]">
                            <h3 className="heading-md text-primary tracking-tighter">
                              {step.title}
                            </h3>
                            <p className="tag text-muted-foreground opacity-60">{step.location}</p>
                          </div>
                          <p className="max-w-[30vw] body-text text-primary/60">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-row lg:flex-col items-center lg:items-end gap-[1vw] shrink-0">
                        <span className="heading-md text-primary">{step.period}</span>
                        <div className="flex items-center gap-[0.8vw] bg-primary/[0.03] px-[1.2vw] py-[0.6vh] rounded-full border border-primary/5">
                          <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-accent animate-pulse" />
                          <span className="tag text-primary/80">{step.status}</span>
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
