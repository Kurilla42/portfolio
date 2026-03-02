
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
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-background">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-[1fr_1.2fr]">
          
          {/* Left Side: Hero Brand Anchor */}
          <div className="px-[8vw] flex flex-col justify-center h-full border-r border-primary/5 bg-background z-10">
            <span className="tag text-muted-foreground block mb-[5vh] reveal-text">
              [OUR METHODOLOGY]
            </span>
            <div className="relative">
              <h2 className="heading-xl text-primary leading-[0.85] flex flex-col tracking-tighter reveal-text">
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
            <p className="max-w-[28vw] body-text mt-[8vh] reveal-text reveal-delay-1 text-primary/70">
              A streamlined, high-performance approach from discovery call to a revenue-generating launch in just 10 days.
            </p>
          </div>

          {/* Right Side: Stage Accumulation */}
          <div className="h-full flex flex-col justify-center px-[8vw] relative bg-background">
            <div className="flex flex-col gap-[4vh] w-full">
              {steps.map((step, index) => {
                const start = index * 0.22;
                const end = start + 0.18;
                
                // Keep Step 1 visible by default for better entry UX
                const initialOpacity = index === 0 ? 1 : 0;
                
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(smoothProgress, [start, start + 0.05], [initialOpacity, 1]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const y = useTransform(smoothProgress, [start, end], [250, 0]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const scale = useTransform(smoothProgress, [start, end], [0.97, 1]);

                return (
                  <motion.div
                    key={index}
                    style={{ opacity, y, scale }}
                    className="border-b border-primary/10 pb-[4vh] last:border-0"
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
                        <span className="heading-md text-primary">
                          {step.period}
                        </span>
                        <div className="flex items-center gap-[0.8vw] bg-primary/[0.03] px-[1.2vw] py-[0.6vh] rounded-full border border-primary/5">
                          <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-accent animate-pulse" />
                          <span className="tag text-primary/80">
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
