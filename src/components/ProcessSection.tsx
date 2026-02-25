
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

  // Рассчитываем вертикальное смещение списка. 
  // Мы начинаем с большого запаса внизу и поднимаем его так, 
  // чтобы к концу скролла все 4 элемента были четко видны.
  const listY = useTransform(smoothProgress, [0, 0.3, 0.6, 1], [600, 400, 200, 0]);

  return (
    <div ref={containerRef} className="relative h-[450vh] bg-[#e5e5e3]">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        {/* Используем w-full без жесткого ограничения container-custom для максимального размаха */}
        <div className="w-full px-6 md:px-12 lg:px-16 grid md:grid-cols-2 gap-0 items-center">
          
          {/* Левая часть - Огромный заголовок, прижат влево */}
          <div className="relative z-10 pr-12">
            <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-muted-foreground block mb-6">
              [OUR METHODOLOGY]
            </span>
            <div className="relative">
              <h2 className="text-[90px] md:text-[140px] lg:text-[180px] xl:text-[210px] font-black text-[#1a1a1a] uppercase tracking-tighter leading-[0.8] flex flex-col">
                <span>THE</span>
                <span className="relative">
                  STEPS
                  <span className="font-serif italic capitalize text-[#8bacaa]/60 font-light lowercase tracking-normal text-[60px] md:text-[100px] lg:text-[130px] absolute -top-8 md:-top-16 left-[20%] z-20">
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

          {/* Правая часть - Накапливающийся список, занимает ровно 50% и уходит вправо */}
          <div className="relative h-[85vh] flex flex-col justify-center overflow-hidden pl-12 border-l border-black/5">
            <motion.div 
              style={{ y: listY }}
              className="flex flex-col gap-10 md:gap-14"
            >
              {steps.map((step, index) => {
                // Плавное появление каждого шага
                const stepStart = index * 0.25;
                const stepEnd = stepStart + 0.15;
                
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(smoothProgress, [stepStart, stepEnd], [index === 0 ? 1 : 0, 1]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const scale = useTransform(smoothProgress, [stepStart, stepEnd], [0.95, 1]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const yOffset = useTransform(smoothProgress, [stepStart, stepEnd], [40, 0]);

                return (
                  <motion.div
                    key={index}
                    style={{ opacity, scale, y: yOffset }}
                    className="border-b border-black/10 pb-8 md:pb-12 last:border-0"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                      <div className="flex gap-6 items-start">
                        <span className="text-4xl md:text-6xl lg:text-7xl font-black text-black/5 leading-none pt-1">
                          {step.number}
                        </span>
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a1a1a] uppercase tracking-tighter leading-none">
                              {step.title}
                            </h3>
                            <p className="text-[11px] font-bold tracking-widest text-muted-foreground">{step.location}</p>
                          </div>
                          <p className="max-w-lg text-sm md:text-base text-muted-foreground leading-relaxed font-medium">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-start md:items-end gap-2 shrink-0 pt-2">
                        <span className="text-2xl md:text-3xl lg:text-4xl font-black text-[#1a1a1a] uppercase tracking-tighter">
                          {step.period}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#88ac66] animate-pulse" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a1a1a]">
                            {step.status}
                          </span>
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
