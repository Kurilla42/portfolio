
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    color: "bg-primary"
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
    color: "bg-primary"
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

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + PRICING_PLANS.length) % PRICING_PLANS.length);
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
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction > 0 ? -20 : 20,
      opacity: 0,
    }),
  };

  return (
    <section className="w-full bg-transparent py-20 md:py-32" id="packages">
      <div className="w-full px-[8vw] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch min-h-[600px]">
          {/* Left Column: Navigation Tabs */}
          <div className="lg:col-span-4 flex flex-col justify-center order-2 lg:order-1">
            <div className="space-y-4 mb-16">
              <span className="label text-primary/40 block tracking-[0.3em]">
                [ PRICING PLANS ]
              </span>
              <h2 className="heading-md text-primary text-[3.5vw] leading-tight">
                SELECT YOUR<br />GROWTH TIER
              </h2>
            </div>

            <div className="flex flex-col space-y-0 border-l border-primary/10">
              {PRICING_PLANS.map((plan, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={plan.id}
                    onClick={() => handleTabClick(index)}
                    className={cn(
                      "group relative flex items-center gap-6 py-10 px-8 text-left transition-all duration-500 border-b border-primary/10 last:border-0",
                      isActive
                        ? "bg-white/40"
                        : "hover:bg-white/20"
                    )}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary/10 overflow-hidden">
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
                      "font-mono text-[1vw] font-bold tabular-nums transition-colors duration-500",
                      isActive ? "text-primary" : "text-primary/20"
                    )}>
                      /{plan.id}
                    </span>

                    <span className={cn(
                      "text-[1.8vw] font-bold tracking-tight transition-colors duration-500 uppercase",
                      isActive ? "text-primary" : "text-primary/30"
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
              <div className="h-full rounded-[3vw] overflow-hidden bg-white/60 backdrop-blur-md border border-white shadow-2xl p-[4vw] flex flex-col">
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
                      opacity: { duration: 0.3 },
                    }}
                    className="flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        {PRICING_PLANS[activeIndex].badge && (
                          <span className="tag bg-accent text-white px-4 py-1.5 rounded-full mb-4 inline-block">
                            {PRICING_PLANS[activeIndex].badge}
                          </span>
                        )}
                        <h3 className="heading-md text-primary text-[3vw] mb-4">
                          {PRICING_PLANS[activeIndex].title}
                        </h3>
                        <p className="body-text text-muted-foreground text-[1.2vw] max-w-xl">
                          {PRICING_PLANS[activeIndex].description}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <span className="label opacity-40 block mb-2">{PRICING_PLANS[activeIndex].id === "03" ? "Starting" : "Value"}</span>
                        <span className="label line-through opacity-30 block text-[1vw]">{PRICING_PLANS[activeIndex].oldPrice}</span>
                        <div className="flex items-baseline justify-end gap-2">
                          <span className="heading-md text-[4vw] text-primary">{PRICING_PLANS[activeIndex].investment}</span>
                          <span className="label opacity-40">{PRICING_PLANS[activeIndex].period}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-12 mt-12 mb-auto">
                      <div>
                        <span className="label text-primary/30 block mb-6 tracking-widest">[ INCLUDED RESOURCES ]</span>
                        <ul className="space-y-4">
                          {PRICING_PLANS[activeIndex].resources.map((resource, i) => (
                            <li key={i} className="flex items-center gap-4 body-text text-primary">
                              <div className={cn("w-6 h-6 rounded-full flex items-center justify-center shrink-0", PRICING_PLANS[activeIndex].color)}>
                                <Check className="w-3.5 h-3.5 text-white" />
                              </div>
                              {resource}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex flex-col justify-end items-end h-full">
                        <div className="bg-primary/5 rounded-[2vw] p-8 w-full border border-primary/5">
                          <p className="body-text text-primary/60 text-[0.9vw] leading-relaxed mb-6">
                            "Everything you need to stop losing leads to competitors and start winning the local market."
                          </p>
                          <Button asChild className={cn("w-full h-[4.5vw] rounded-full text-white text-[1vw] font-bold group", PRICING_PLANS[activeIndex].id === "02" ? "bg-accent hover:scale-[1.02]" : "bg-primary")}>
                            <Link href="#contact" className="flex items-center justify-center gap-3">
                              Select Plan
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <div className="absolute bottom-10 left-10 flex gap-4 z-20">
                  <button
                    onClick={handlePrev}
                    className="w-[3.5vw] h-[3.5vw] rounded-full bg-white border border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all active:scale-90"
                  >
                    <ChevronLeft className="w-[1.2vw] h-[1.2vw]" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-[3.5vw] h-[3.5vw] rounded-full bg-white border border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all active:scale-90"
                  >
                    <ChevronRight className="w-[1.2vw] h-[1.2vw]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
