
"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

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

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#e5e5e3]">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="container-custom w-full grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-20 items-center">
          
          {/* Левая часть - Заголовок (фиксированный) */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground block mb-4">
              [OUR METHODOLOGY]
            </span>
            <h2 className="text-6xl md:text-8xl font-black text-[#1a1a1a] uppercase tracking-tighter leading-[0.85] relative">
              THE <span className="font-serif italic capitalize text-[#8bacaa] font-light lowercase tracking-normal text-5xl md:text-7xl absolute -top-4 md:-top-8 left-1/4">simple</span> <br />
              STEPS <br />
              TO FLOW
            </h2>
            <p className="max-w-xs text-sm text-muted-foreground mt-8 leading-relaxed font-medium">
              A streamlined approach from initial contact to a high-performing landing page in just 10 business days.
            </p>
          </div>

          {/* Правая часть - Пункты (появляются при скролле) */}
          <div className="relative h-[60vh] flex flex-col justify-center">
            {steps.map((step, index) => {
              // Рассчитываем появление каждого шага
              const start = index * 0.25;
              const end = (index + 1) * 0.25;
              
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.05, end], [0, 1, 1, index === steps.length - 1 ? 1 : 0]);
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const y = useTransform(scrollYProgress, [start, start + 0.1], [50, 0]);

              return (
                <motion.div
                  key={index}
                  style={{ opacity, y }}
                  className={cn(
                    "absolute inset-0 flex flex-col justify-center border-b border-black/10 pb-8",
                    index !== 0 && "pointer-events-none"
                  )}
                >
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl font-black text-black/20">{step.number}</span>
                        <div className="space-y-0.5">
                          <h3 className="text-4xl md:text-5xl font-black text-[#1a1a1a] uppercase tracking-tighter leading-none">
                            {step.title}
                          </h3>
                          <p className="text-[10px] font-bold tracking-widest text-muted-foreground">{step.location}</p>
                        </div>
                      </div>
                      <p className="max-w-md text-sm text-muted-foreground leading-relaxed font-medium">
                        {step.description}
                      </p>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-1">
                      <span className="text-2xl font-black text-[#1a1a1a] uppercase tracking-tighter">{step.period}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#88ac66] animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]">{step.status}</span>
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
  );
}
