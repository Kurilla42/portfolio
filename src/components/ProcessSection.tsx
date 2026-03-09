"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const steps = [
  { number: "DAY 01", title: "Discovery" },
  { number: "DAY 02", title: "Wireframing" },
  { number: "DAY 03", title: "The Build" },
  { number: "DAY 04", title: "Launch & Sync" }
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <div 
      ref={containerRef} 
      className="relative h-[300vh] bg-[#eaeaf2] z-30 mt-[-100vh] shadow-[0_-20px_40px_rgba(0,0,0,0.02)]"
      id="process"
    >
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 px-[8vw] gap-[10vw]">
          
          {/* Left Side: Title */}
          <div className="flex flex-col justify-center h-full">
            <span className="label text-muted-foreground block mb-[4vh] opacity-40">
              [ OUR METHODOLOGY ]
            </span>
            <div className="relative flex flex-col">
              <h2 className="text-[7.5vw] font-black text-primary leading-[0.8] tracking-tighter uppercase">
                THE STEPS
              </h2>
              <div className="flex items-baseline gap-[1vw]">
                <h2 className="text-[7.5vw] font-black text-primary leading-[0.8] tracking-tighter uppercase">
                  SIMPLE TO FLOW
                </h2>
              </div>
            </div>
            <p className="max-w-[25vw] body-text mt-[6vh] text-primary/50 text-[1.1vw] leading-relaxed">
              A streamlined, high-performance approach from discovery call to a revenue-generating launch in just 10 days.
            </p>
          </div>

          {/* Right Side: Steps List */}
          <div className="h-full flex flex-col justify-center">
            <div className="flex flex-col w-full border-t border-primary/10">
              {steps.map((step, index) => {
                const start = index * 0.25;
                const end = (index + 1) * 0.25;
                
                const opacity = useTransform(smoothProgress, 
                  [start - 0.1, start, end], 
                  [0.3, 1, 0.3]
                );

                return (
                  <motion.div
                    key={index}
                    style={{ opacity }}
                    className="flex items-center justify-between py-[4vh] border-b border-primary/10 group transition-colors"
                  >
                    <div className="flex items-baseline gap-[3vw]">
                      <span className="text-[3.0vw] font-black text-primary/20 tracking-tighter uppercase font-sans">
                        {step.number}
                      </span>
                      <h3 className="text-[3.0vw] font-black text-primary tracking-tighter uppercase font-sans">
                        {step.title}
                      </h3>
                    </div>
                    <motion.span 
                      className="text-[2vw] text-accent opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    >
                      →
                    </motion.span>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
