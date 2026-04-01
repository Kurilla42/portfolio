"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from 'next/image';
import { Button } from "@/components/ui/button";

const PRICING_PLANS = [
  {
    id: "01",
    title: "Ready-Made Landing",
    description: "Ready-Made High-Converting Landing Page",
    subdescription: "Quick launch using my template, tailored specifically for plumbing services in the US",
    whoIsThisFor: "Small plumbing companies and independent contractors who need a proper website \"yesterday,\" without lengthy approval processes or custom design wait times.",
    resources: [
      "Landing page setup using my template optimized for leads and calls",
      "Customization of the logo, colors, and images to match your brand",
      "Structural adaptation to fit your specific plumbing services and local service areas",
      "Integration of lead forms and \"Call now\" buttons with your email, CRM, or messengers",
      "Mobile and speed optimization for fast loading on smartphones",
      "Basic SEO structure for local searches including titles, H1s, URLs, and \"near me\" blocks",
      "30 days of technical support and bug fixes"
    ],
    footerText: "You get a modern landing page that turns visitors into calls and leads, without overpaying marketing agencies.",
    buttonText: "Order Template Landing Page",
    investment: "$697",
    period: "one-time",
    oldPrice: "$900",
    badge: null,
    color: "bg-white"
  },
  {
    id: "02",
    title: "Custom Website/Landing",
    description: "Custom Website/Landing Page for Your Business",
    subdescription: "Tailored design and structure to match your brand, services, and local region",
    whoIsThisFor: "Companies that want to stand out from competitors, get a scalable site designed for growth, and prioritize maximum conversions",
    resources: [
      "Personalized wireframe and structure for your services, USPs, and target areas",
      "Fully custom design (not just color swaps in a template)",
      "Setup of up to 3–5 pages: homepage, services, about us, contacts, service areas",
      "Advanced form setup with lead tracking (goals/events configuration)",
      "Basic SEO structure for local searches (titles, H1s, URLs, \"near me\" blocks)",
      "Integration with CRM/email/messengers, plus full testing",
      "30 days of technical support and agreed-upon refinements"
    ],
    footerText: "You get a unique website that strengthens your brand, addresses objections, and systematically turns traffic into calls and leads.",
    buttonText: "Discuss Custom Project",
    investment: "$1197",
    period: "one-time",
    oldPrice: "$1500",
    badge: null,
    color: "bg-white"
  },
  {
    id: "03",
    title: "Fast AI-Powered Landing",
    description: "Fast AI-Powered Landing Page",
    subdescription: "Affordable solution: AI-generated landing page with my setup, so you finally have a working site",
    whoIsThisFor: "Those just starting a plumbing business or wanting to test online ads with minimal investment",
    resources: [
      "AI-tool creation of a landing page based on your brief",
      "Light tweaks to structure and blocks for your services (no complex custom design)",
      "Swap of logo, contact info, basic texts, and images",
      "Setup of lead forms and call buttons, with functionality testing",
      "Basic SEO structure for local searches (titles, H1s, URLs, \"near me\" blocks)",
      "30-day guarantee on forms and integrations"
    ],
    footerText: "In just a few days, you get a working site ready for ads or your Google Business Profile.",
    buttonText: "Launch AI Landing Page",
    investment: "$397",
    period: "one-time",
    oldPrice: "$600",
    badge: null,
    color: "bg-white"
  },
];

const AUTO_PLAY_DURATION = 10000;

export function VerticalPricingTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

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
    if (isPaused || !isInView) return;

    const interval = setInterval(() => {
      handleNext();
    }, AUTO_PLAY_DURATION);

    return () => clearInterval(interval);
  }, [activeIndex, isPaused, handleNext, isInView]);

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
    <section ref={containerRef} className="w-full pb-16 md:pb-32 pt-24 relative z-30 bg-black" id="packages">
      <div className="relative z-10 w-full px-6 md:px-[4vw] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start min-h-[600px] md:min-h-[750px]">
          {/* Left Column: Heading and Navigation (Raised to the Top) */}
          <div className="lg:col-span-4 flex flex-col justify-start order-2 lg:order-1 pt-0">
            <div className="space-y-4 mb-8 md:mb-[4vw]">
              <h2 className="text-4xl sm:text-5xl md:text-[6vw] font-headline text-[#e0ded8] uppercase leading-[0.9] tracking-tight">
                SELECT YOUR<br />GROWTH TIER
              </h2>
            </div>

            <div className="flex flex-col space-y-0 border-l border-[#e0ded8]/10">
              {PRICING_PLANS.map((plan, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={plan.id}
                    onClick={() => handleTabClick(index)}
                    className={cn(
                      "group relative flex items-center gap-4 md:gap-[1.5vw] py-6 md:py-[2vw] px-6 md:px-[2vw] text-left transition-all duration-500 border-b border-[#e0ded8]/10 last:border-0",
                      isActive
                        ? "bg-[#e0ded8]/5"
                        : "hover:bg-[#e0ded8]/5"
                    )}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#e0ded8]/5 overflow-hidden">
                      {isActive && isInView && (
                        <motion.div
                          key={`progress-${index}-${isPaused}`}
                          className={cn("absolute top-0 left-0 w-full origin-top bg-[#c7b684]")}
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
                      "font-mono text-xs md:text-[0.8vw] font-bold tabular-nums transition-colors duration-500",
                      isActive ? "text-[#e0ded8]" : "text-[#e0ded8]/20"
                    )}>
                      /{plan.id}
                    </span>

                    <span className={cn(
                      "text-lg md:text-[1.2vw] font-bold tracking-tight transition-colors duration-500 uppercase",
                      isActive ? "text-[#e0ded8]" : "text-[#e0ded8]/30"
                    )}>
                      {plan.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Content */}
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
                    <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-6">
                      <div className="w-full">
                        <p className="text-xl md:text-[1vw] font-normal text-[#e0ded8] leading-tight max-w-2xl mb-8 uppercase tracking-tight font-sans">
                          {PRICING_PLANS[activeIndex].subdescription}
                        </p>
                        <div className="mb-10">
                          <span className="text-[#e0ded8]/70 block mb-2 tracking-widest text-[10px] md:text-[1vw] uppercase font-sans">WHO IS THIS FOR</span>
                          <p className="text-sm md:text-[1vw] text-[#e0ded8]/70 leading-relaxed font-sans">
                            {PRICING_PLANS[activeIndex].whoIsThisFor}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-left md:text-right w-full md:w-auto shrink-0 pt-2">
                        <div className="flex items-baseline md:justify-end gap-4">
                          <span className="line-through text-[#e0ded8]/20 text-[20px] md:text-[2vw] font-mono">
                            {PRICING_PLANS[activeIndex].oldPrice}
                          </span>
                          <span className="text-3xl md:text-[4vw] font-black text-[#e0ded8] font-headline">
                            {PRICING_PLANS[activeIndex].investment}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col mb-8">
                      <div className="mb-10">
                        <span className="text-[#e0ded8]/70 block mb-4 tracking-widest text-[10px] md:text-[1vw] uppercase font-sans">WHAT'S INCLUDED</span>
                        <ul className="space-y-3 mb-10">
                          {PRICING_PLANS[activeIndex].resources.map((resource, i) => (
                            <li key={i} className="flex items-start gap-4 text-[10px] md:text-[1vw] text-[#e0ded8]/70 font-sans leading-relaxed">
                              <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#c7b684] shrink-0" />
                              {resource}
                            </li>
                          ))}
                        </ul>

                        <div className="max-w-2xl mb-8">
                          <p className="text-sm md:text-[1vw] text-[#e0ded8]/70 leading-relaxed font-sans">
                            {PRICING_PLANS[activeIndex].footerText}
                          </p>
                        </div>

                        <div className="flex justify-start">
                          <Button 
                            variant="link" 
                            className="text-[#e0ded8] p-0 h-auto font-bold uppercase tracking-[0.2em] text-[10px] md:text-[1vw] underline underline-offset-8 decoration-[#e0ded8]/30 hover:decoration-[#e0ded8] transition-all font-sans"
                          >
                            {PRICING_PLANS[activeIndex].buttonText}
                          </Button>
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
