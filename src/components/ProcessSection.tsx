
"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Discovery",
    location: "[STRATEGY CALL]",
    description: "Free 15-min strategy call to understand your business goals and service areas.",
    period: "DAY 1",
    status: "UNDERSTANDING"
  },
  {
    number: "02",
    title: "Wireframing",
    location: "[BLUEPRINT]",
    description: "I map out the conversion flow and write copy that speaks directly to your customers.",
    period: "DAY 2-4",
    status: "PLANNING"
  },
  {
    number: "03",
    title: "Build & Design",
    location: "[DEVELOPMENT]",
    description: "High-performance coding with a focus on speed, accessibility, and clean aesthetics.",
    period: "DAY 5-8",
    status: "CRAFTING"
  },
  {
    number: "04",
    title: "Launch & Optimize",
    location: "[GOING LIVE]",
    description: "Integrate with your CRM and launch. We monitor initial traffic for performance.",
    period: "DAY 10",
    status: "REVENUE"
  }
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#e5e5e3]">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Side - Proportionally scaled */}
          <div className="px-[6vw] flex flex-col justify-center h-full border-r border-black/5 bg-[#e5e5e3] z-10">
            <span className="label text-muted-foreground block mb-[4vh] reveal-text text-[0.8vw]">
              [OUR METHODOLOGY]
            </span>
            <div className="relative">
              <h2 className="text-[10vw] font-bold text-primary leading-[0.85] flex flex-col tracking-tighter reveal-text">
                <span>THE</span>
                <span className="relative">
                  STEPS
                  <span className="accent-italic lowercase text-[0.3em] absolute -top-[2vh] left-[20%] z-20">
                    simple
                  </span>
                </span>
                <span>TO FLOW</span>
              </h2>
            </div>
            <p className="max-w-[25vw] body-text text-[1.2vw] mt-[6vh] reveal-text reveal-delay-1 leading-relaxed">
              A streamlined approach from initial contact to a high-performing landing page in just 10 business days.
            </p>
          </div>

          {/* Right Side - Step accumulation */}
          <div className="h-full flex flex-col justify-center px-[6vw] relative bg-[#e5e5e3]">
            <div className="flex flex-col gap-[3vh] w-full max-w-[40vw]">
              {steps.map((step, index) => {
                const start = index * 0.22;
                const end = start + 0.18;
                
                const initialOpacity = index === 0 ? 1 : 0;
                
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(smoothProgress, [start, start + 0.05], [initialOpacity, 1]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const y = useTransform(smoothProgress, [start, end], [300, 0]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const scale = useTransform(smoothProgress, [start, end], [0.98, 1]);

                return (
                  <motion.div
                    key={index}
                    style={{ 
                      opacity, 
                      y, 
                      scale,
                    }}
                    className="border-b border-black/10 pb-[3vh] last:border-0"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-[2vw]">
                      <div className="flex gap-[2vw] items-start">
                        <span className="services-item text-primary/10 leading-none pt-[0.5vh] text-[4vw]">
                          {step.number}
                        </span>
                        <div className="space-y-[1.5vh]">
                          <div className="space-y-[0.5vh]">
                            <h3 className="heading-lg text-primary text-[3vw] tracking-tighter leading-none">
                              {step.title}
                            </h3>
                            <p className="label text-muted-foreground text-[0.7vw]">{step.location}</p>
                          </div>
                          <p className="max-w-[25vw] body-text text-[0.9vw] text-muted-foreground/80 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-row lg:flex-col items-center lg:items-end gap-[0.5vw] shrink-0 lg:pt-[1vh]">
                        <span className="heading-md text-primary text-[2vw]">
                          {step.period}
                        </span>
                        <div className="flex items-center gap-[0.5vw] bg-black/[0.03] px-[0.8vw] py-[0.4vh] rounded-full">
                          <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-accent animate-pulse" />
                          <span className="tag text-primary text-[0.6vw]">
                            {step.status}
                          </span>
                        </div>
                      </div>
                    </div>
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
