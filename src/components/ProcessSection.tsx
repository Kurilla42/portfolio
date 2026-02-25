
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

  // Рассчитываем вертикальное смещение всего контейнера списка.
  // Мы начинаем со смещения 240px (чтобы первый пункт был внизу), 
  // и по мере появления новых пунктов поднимаем список выше.
  const listY = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75], [280, 180, 80, 0]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#e5e5e3]">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="container-custom w-full grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-24 items-center">
          
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

          {/* Правая часть - Список с эффектом выталкивания вверх */}
          <div className="relative h-[500px] flex flex-col justify-end overflow-hidden">
            <motion.div 
              style={{ y: listY }}
              className="flex flex-col gap-6 md:gap-8"
            >
              {steps.map((step, index) => {
                // Первый пункт виден почти сразу, остальные появляются на своих этапах скролла
                const start = index === 0 ? 0 : index * 0.25 - 0.1;
                const end = index === 0 ? 0.05 : index * 0.25;
                
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(smoothProgress, [start, end], [index === 0 ? 1 : 0, 1]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const scale = useTransform(smoothProgress, [start, end], [index === 0 ? 1 : 0.95, 1]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const itemTranslateY = useTransform(smoothProgress, [start, end], [20, 0]);

                return (
                  <motion.div
                    key={index}
                    style={{ opacity, scale, y: itemTranslateY }}
                    className="border-b border-black/10 pb-6 md:pb-8 last:border-0 bg-[#e5e5e3]"
                  >
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl font-black text-black/10">{step.number}</span>
                          <div className="space-y-0.5">
                            <h3 className="text-3xl md:text-4xl font-black text-[#1a1a1a] uppercase tracking-tighter leading-none">
                              {step.title}
                            </h3>
                            <p className="text-[9px] font-bold tracking-widest text-muted-foreground">{step.location}</p>
                          </div>
                        </div>
                        <p className="max-w-md text-xs text-muted-foreground leading-relaxed font-medium">
                          {step.description}
                        </p>
                      </div>

                      <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
                        <span className="text-xl font-black text-[#1a1a1a] uppercase tracking-tighter">{step.period}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#88ac66] animate-pulse" />
                          <span className="text-[9px] font-bold uppercase tracking-widest text-[#1a1a1a]">{step.status}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
