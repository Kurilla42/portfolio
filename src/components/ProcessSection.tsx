
"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-[#e5e5e3]">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="w-full h-full flex flex-col md:flex-row items-center">
          
          {/* Левая часть - Заголовок */}
          <div className="w-full md:w-1/2 px-6 md:px-12 lg:px-16 flex flex-col justify-center h-full relative z-10">
            <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-muted-foreground block mb-6">
              [OUR METHODOLOGY]
            </span>
            <div className="relative">
              <h2 className="text-[80px] md:text-[120px] lg:text-[150px] xl:text-[180px] font-black text-[#1a1a1a] uppercase tracking-tighter leading-[0.8] flex flex-col">
                <span>THE</span>
                <span className="relative">
                  STEPS
                  <span className="font-serif italic capitalize text-[#8bacaa]/60 font-light lowercase tracking-normal text-[50px] md:text-[80px] lg:text-[110px] absolute -top-6 md:-top-12 left-[15%] z-20">
                    simple
                  </span>
                </span>
                <span>TO FLOW</span>
              </h2>
            </div>
            <p className="max-w-md text-base md:text-lg text-muted-foreground mt-12 leading-relaxed font-medium">
              A streamlined approach from initial contact to a high-performing landing page in just 10 business days.
            </p>
          </div>

          {/* Правая часть - Последовательно накапливающийся список */}
          <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-6 md:px-12 lg:px-16">
            <div className="flex flex-col gap-8 md:gap-12 relative">
              {steps.map((step, index) => {
                // Определяем интервалы для каждого шага
                // 0.0 - 0.2: Шаг 1
                // 0.25 - 0.45: Шаг 2
                // 0.5 - 0.7: Шаг 3
                // 0.75 - 0.95: Шаг 4
                const start = index * 0.25;
                const end = start + 0.2;
                
                // Анимация появления и движения вверх
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(smoothProgress, [start, start + 0.05], [0, 1]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const y = useTransform(smoothProgress, [start, end], [400, 0]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const scale = useTransform(smoothProgress, [start, end], [0.9, 1]);

                return (
                  <motion.div
                    key={index}
                    style={{ 
                      opacity, 
                      y, 
                      scale,
                      position: 'relative'
                    }}
                    className="border-b border-black/10 pb-6 md:pb-10 last:border-0"
                  >
                    <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 md:gap-8">
                      <div className="flex gap-4 md:gap-8 items-start">
                        <span className="text-4xl md:text-6xl lg:text-8xl font-black text-black/5 leading-none pt-1">
                          {step.number}
                        </span>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#1a1a1a] uppercase tracking-tighter leading-none">
                              {step.title}
                            </h3>
                            <p className="text-[10px] md:text-[11px] font-bold tracking-widest text-muted-foreground">{step.location}</p>
                          </div>
                          <p className="max-w-lg text-sm md:text-base text-muted-foreground/80 leading-relaxed font-medium">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-row xl:flex-col items-center xl:items-end gap-3 shrink-0 xl:pt-2">
                        <span className="text-xl md:text-3xl lg:text-4xl font-black text-[#1a1a1a] uppercase tracking-tighter">
                          {step.period}
                        </span>
                        <div className="flex items-center gap-2 bg-black/[0.03] px-2 py-1 rounded-full">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#88ac66] animate-pulse" />
                          <span className="text-[9px] font-bold uppercase tracking-widest text-[#1a1a1a]">
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
