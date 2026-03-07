"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { ScrollRevealHeading } from '@/components/ScrollRevealHeading';

const steps = [
  { number: "DAY 01", title: "Discovery" },
  { number: "DAY 02", title: "Wireframing" },
  { number: "DAY 03", title: "The Build" },
  { number: "DAY 04", title: "Launch & Sync" }
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  
  // Total section scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // Update active step based on progress
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const stepIndex = Math.floor(latest * 4);
    setActiveStep(Math.min(stepIndex, 3));
  });

  // SVG Path animation values
  const pathLength = 800;

  return (
    <div 
      ref={containerRef} 
      className="relative h-[400vh] bg-[#F5F2EB] z-30 mt-[-100vh] shadow-[0_-20px_40px_rgba(0,0,0,0.02)]"
      id="process"
    >
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-[1fr_0.4fr_1fr] px-[6vw]">
          
          {/* Left Side: Title */}
          <div className="flex flex-col justify-center h-full z-10">
            <span className="label text-muted-foreground block mb-[5vh]">
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
            <p className="max-w-[22vw] body-text mt-[8vh] text-primary/70 text-[1.1vw] leading-relaxed">
              A streamlined, high-performance approach from discovery call to a revenue-generating launch in just 10 days.
            </p>
          </div>

          {/* Center: Interactive Timeline Line */}
          <div className="relative h-full flex items-center justify-center">
            <div className="relative h-[60vh] w-[100px]">
              <svg 
                viewBox="0 0 100 800" 
                className="absolute inset-0 w-full h-full overflow-visible"
                fill="none"
              >
                {/* Background Shadow Path */}
                <path
                  d="M50 0 C70 150, 30 250, 50 400 C70 550, 30 650, 50 800"
                  stroke="rgba(0,0,0,0.03)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Active Orange Path */}
                <motion.path
                  d="M50 0 C70 150, 30 250, 50 400 C70 550, 30 650, 50 800"
                  stroke="#fc7c19"
                  strokeWidth="8"
                  strokeLinecap="round"
                  style={{
                    pathLength: useTransform(smoothProgress, [0, 1], [0, 1]),
                    strokeDasharray: pathLength,
                    strokeDashoffset: 0
                  }}
                />

                {/* Nodes */}
                {steps.map((_, i) => {
                  const stepProgress = i / 3.2; // roughly position dots
                  const opacity = useTransform(smoothProgress, [stepProgress - 0.05, stepProgress], [0, 1]);
                  const scale = useTransform(smoothProgress, [stepProgress - 0.05, stepProgress], [0.7, 1]);
                  
                  // Simple vertical mapping for circles
                  const y = i * 266; 

                  return (
                    <motion.g key={i} style={{ opacity, scale }}>
                      <circle 
                        cx="50" cy={y} r="14" 
                        fill="#fc7c19" 
                        className="drop-shadow-[0_0_8px_rgba(252,124,25,0.5)]"
                      />
                      <circle cx="50" cy={y} r="6" fill="white" />
                    </motion.g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Right Side: Steps List */}
          <div className="h-full flex flex-col justify-center relative">
            <div className="flex flex-col gap-[8vh] w-full">
              {steps.map((step, index) => {
                const start = index * 0.25;
                const end = (index + 1) * 0.25;
                
                const opacity = useTransform(smoothProgress, 
                  [start - 0.1, start, end + 0.1], 
                  [0.2, 1, 0.8]
                );

                const x = useTransform(smoothProgress,
                  [start - 0.1, start],
                  [20, 0]
                );

                return (
                  <motion.div
                    key={index}
                    style={{ opacity, x }}
                    className="flex items-center gap-[3vw]"
                  >
                    <span className="services-item text-primary/10 !text-[3vw] min-w-[10vw]">
                      {step.number}
                    </span>
                    <h3 className="heading-md text-primary tracking-tighter">
                      {step.title}
                    </h3>
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
