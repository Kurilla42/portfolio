"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from 'next/image';

const PRICING_PLANS = [
  {
    id: "01",
    title: "Fast Launch Starter",
    description: "A focused launch for small service businesses needing immediate results.",
    resources: ["One high-converting landing page", "Mobile-optimized design", "Lead form setup", "On-page SEO fundamentals"],
    investment: "$697",
    period: "one-time",
    oldPrice: "$900",
    badge: null,
    color: "bg-accent"
  },
  {
    id: "02",
    title: "Local Leads Pro",
    description: "Our flagship multi-page solution built for dominant local SEO presence.",
    resources: ["5-7 High-intent pages", "Service Area pages", "Reviews integration", "Advanced CRM Sync", "Local SEO optimization"],
    investment: "$1197",
    period: "one-time",
    oldPrice: "$1500",
    badge: "Recommended",
    color: "bg-accent"
  },
  {
    id: "03",
    title: "Growth Sync",
    description: "Ongoing maintenance and conversion optimization for scaling businesses.",
    resources: ["Hosting & Maintenance", "Monthly content tweaks", "UX performance audit", "Priority tech support"],
    investment: "+$129",
    period: "/mo.",
    oldPrice: "Setup from $700",
    badge: null,
    color: "bg-accent"
  },
];

const AUTO_PLAY_DURATION = 8000;

export function VerticalPricingTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % PRICING_PLANS.length);
  }, []);

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setIsPaused(false);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, AUTO_PLAY_DURATION);

    return () => clearInterval(interval);
  }, [activeIndex, isPaused, handleNext]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 10 : -10,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction > 0 ? -10 : 10,
      opacity: 0,
    }),
  };

  return (
    <section className="w-full py-16 md:py-32 relative z-30" id="packages">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://i.ibb.co/Y7Rzv80G/1.jpg"
          alt="Pricing Background"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10 w-full px-6 md:px-[8vw] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-stretch min-h-[500px] md:min-h-[600px]">
          {/* Left Column: Navigation Tabs */}
          <div className="lg:col-span-4 flex flex-col justify-center order-2 lg:order-1">
            <div className="space-y-4 mb-10 md:mb-16">
              <span className="label text-white/40 block tracking-[0.3em] text-[10px] md:text-xs">
                [ PRICING PLANS ]
              </span>
              <h2 className="text-3xl md:text-[3.5vw] font-black uppercase leading-tight text-white tracking-tighter">
                SELECT YOUR<br />GROWTH TIER
              </h2>
            </div>

            <div className="flex flex-col space-y-0 border-l border-white/10">
              {PRICING_PLANS.map((plan, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={plan.id}
                    onClick={() => handleTabClick(index)}
                    className={cn(
                      "group relative flex items-center gap-4 md:gap-6 py-6 md:py-10 px-6 md:px-8 text-left transition-all duration-500 border-b border-white/10 last:border-0",
                      isActive
                        ? "bg-white/5"
                        : "hover:bg-white/5"
                    )}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-white/5 overflow-hidden">
                      {isActive && (
                        <motion.div
                          key={`progress-${index}-${isPaused}`}
                          className={cn("absolute top-0 left-0 w-full origin-top", plan.color)}
                          initial={{ height: "0%" }}
                          animate={isPaused ? { height: "0%" } : { height: "100%" }}
                          transition={{
                            duration: AUTO_PLAY_DURATION / 1000,
                            ease: "linear",
                          }}
                        />
                      )}
                    </div>

                    <span className={cn(
                      "font-mono text-xs md:text-[1vw] font-bold tabular-nums transition-colors duration-500",
                      isActive ? "text-white" : "text-white/20"
                    )}>
                      /{plan.id}
                    </span>

                    <span className={cn(
                      "text-lg md:text-[1.8vw] font-bold tracking-tight transition-colors duration-500 uppercase",
                      isActive ? "text-white" : "text-white/30"
                    )}>
                      {plan.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Content */}
          <div className="lg:col-span-8 flex flex-col order-1 lg:order-2">
            <div 
              className="relative h-full"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="h-full flex flex-col relative p-0 md:pl-[4vw]">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    className="flex flex-col h-full"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
                      <div className="w-full">
                        {PRICING_PLANS[activeIndex].badge && (
                          <span className="tag bg-accent text-white px-3 py-1 rounded-full mb-4 inline-block text-[10px]">
                            {PRICING_PLANS[activeIndex].badge}
                          </span>
                        )}
                        <h3 className="text-2xl md:text-[3vw] font-black uppercase text-white mb-4">
                          {PRICING_PLANS[activeIndex].title}
                        </h3>
                        <p className="text-sm md:text-[1.2vw] text-white/60 leading-relaxed max-w-xl font-medium">
                          {PRICING_PLANS[activeIndex].description}
                        </p>
                      </div>
                      
                      <div className="text-left md:text-right w-full md:w-auto shrink-0">
                        <span className="label text-white/40 block mb-2 text-[10px]">{PRICING_PLANS[activeIndex].id === "03" ? "Starting" : "Value"}</span>
                        <span className="label line-through text-white/20 block text-[10px] md:text-[1vw]">{PRICING_PLANS[activeIndex].oldPrice}</span>
                        <div className="flex items-baseline md:justify-end gap-2">
                          <span className="text-3xl md:text-[4vw] font-black text-white">{PRICING_PLANS[activeIndex].investment}</span>
                          <span className="label text-white/40 text-[10px]">{PRICING_PLANS[activeIndex].period}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6 md:mt-12 mb-auto">
                      <div>
                        <span className="label text-white/30 block mb-6 tracking-widest text-[10px] uppercase font-mono">[ INCLUDED RESOURCES ]</span>
                        <ul className="space-y-4">
                          {PRICING_PLANS[activeIndex].resources.map((resource, i) => (
                            <li key={i} className="flex items-center gap-4 text-sm md:text-base text-white/80 font-medium">
                              <div className={cn("w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center shrink-0", PRICING_PLANS[activeIndex].color)}>
                                <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
                              </div>
                              {resource}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex flex-col justify-end items-end h-full hidden md:flex">
                        <div className="bg-white/5 rounded-[2vw] p-8 w-full border border-white/5">
                          <p className="text-sm md:text-[0.9vw] text-white/50 leading-relaxed italic font-medium">
                            "Everything you need to stop losing leads to competitors and start winning the local market."
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
