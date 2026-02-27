
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
  
  // Уменьшил высоту с 600vh до 400vh для более быстрого скролла
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
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-[1fr_1.4fr]">
          
          {/* Левая часть - Заголовок (фиксированный) */}
          <div className="px-10 md:px-20 flex flex-col justify-center h-full border-r border-black/5">
            <span className="label text-muted-foreground block mb-8 reveal-text">
              [OUR METHODOLOGY]
            </span>
            <div className="relative">
              <h2 className="heading-xl text-primary leading-[0.8] flex flex-col reveal-text">
                <span>THE</span>
                <span className="relative">
                  STEPS
                  <span className="accent-italic lowercase text-[0.6em] absolute -top-4 left-[20%] z-20">
                    simple
                  </span>
                </span>
                <span>TO FLOW</span>
              </h2>
            </div>
            <p className="max-w-md body-text text-lg mt-12 reveal-text reveal-delay-1">
              A streamlined approach from initial contact to a high-performing landing page in just 10 business days.
            </p>
          </div>

          {/* Правая часть - Накапливающийся список */}
          <div className="h-full flex flex-col justify-center px-10 md:px-20 relative">
            <div className="flex flex-col gap-10 md:gap-16 w-full max-w-4xl">
              {steps.map((step, index) => {
                // Более компактные интервалы для быстрого скролла
                const start = index * 0.22;
                const end = start + 0.18;
                
                // Для первого этапа (index 0) opacity сразу 1
                const initialOpacity = index === 0 ? 1 : 0;
                
                // Анимация появления и движения вверх
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(smoothProgress, [start, start + 0.05], [initialOpacity, 1]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const y = useTransform(smoothProgress, [start, end], [400, 0]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const scale = useTransform(smoothProgress, [start, end], [0.95, 1]);

                return (
                  <motion.div
                    key={index}
                    style={{ 
                      opacity, 
                      y, 
                      scale,
                    }}
                    className="border-b border-black/10 pb-8 md:pb-12 last:border-0"
                  >
                    <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6">
                      <div className="flex gap-8 items-start">
                        <span className="services-item text-primary/10 leading-none pt-1">
                          {step.number}
                        </span>
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <h3 className="heading-lg text-primary text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-none">
                              {step.title}
                            </h3>
                            <p className="label text-muted-foreground">{step.location}</p>
                          </div>
                          <p className="max-w-xl body-text text-base md:text-lg text-muted-foreground/80 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-row xl:flex-col items-center xl:items-end gap-3 shrink-0 xl:pt-2">
                        <span className="heading-md text-primary text-3xl md:text-4xl">
                          {step.period}
                        </span>
                        <div className="flex items-center gap-2 bg-black/[0.03] px-3 py-1 rounded-full">
                          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                          <span className="tag text-primary">
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
