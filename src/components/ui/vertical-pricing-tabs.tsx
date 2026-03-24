
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from 'next/image';
import { Button } from "@/components/ui/button";

const PRICING_PLANS = [
  {
    id: "01",
    title: "Ready-Made High-Converting Landing Page",
    description: "Quick launch using my template, tailored specifically for plumbing services in the US",
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
    title: "Custom Website/Landing Page for Your Business",
    description: "Tailored design and structure to match your brand, services, and local region",
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
    badge: "Recommended",
    color: "bg-white"
  },
  {
    id: "03",
    title: "Fast AI-Powered Landing Page",
    description: "Affordable solution: AI-generated landing page with my setup, so you finally have a working site",
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-stretch min-h-[600px] md:min-h-[750px]">
          {/* Left Column: Navigation Tabs */}
          <div className="lg:col-span-4 flex flex-col justify-center order-2 lg:order-1">
            <div className="space-y-4 mb-10 md:mb-16">
              <span className="text-white/40 block tracking-[0.3em] font-sans text-[10px] md:text-[0.7vw] uppercase">
                PRICING PLANS
              </span>
              <h2 className="text-3xl md:text-[3.5vw] font-black uppercase leading-tight text-white tracking-tighter font-headline">
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
                      "group relative flex items-center gap-4 md:gap-6 py-6 md:py-8 px-6 md:px-8 text-left transition-all duration-500 border-b border-white/10 last:border-0",
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
                      "font-mono text-xs md:text-[0.8vw] font-bold tabular-nums transition-colors duration-500",
                      isActive ? "text-white" : "text-white/20"
                    )}>
                      /{plan.id}
                    </span>

                    <span className={cn(
                      "text-lg md:text-[1.2vw] font-bold tracking-tight transition-colors duration-500 uppercase",
                      isActive ? "text-white" : "text-white/30"
                    )}>
                      {plan.title.split(":")[0]}
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
                    <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-6">
                      <div className="w-full">
                        {PRICING_PLANS[activeIndex].badge && (
                          <span className="bg-white/10 text-white px-3 py-1 rounded-full mb-4 inline-block text-[10px] md:text-[0.6vw] font-sans uppercase tracking-widest">
                            {PRICING_PLANS[activeIndex].badge}
                          </span>
                        )}
                        <p className="text-2xl md:text-[2.5vw] font-normal text-white leading-tight max-w-2xl mb-6">
                          {PRICING_PLANS[activeIndex].description}
                        </p>
                        <div className="mb-6">
                          <span className="text-white/30 block mb-2 tracking-widest text-[10px] md:text-[0.7vw] uppercase font-sans">WHO IS THIS FOR</span>
                          <p className="text-sm md:text-[1vw] text-white/70 leading-relaxed font-sans">
                            {PRICING_PLANS[activeIndex].whoIsThisFor}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-left md:text-right w-full md:w-auto shrink-0">
                        <span className="text-white/40 block mb-2 text-[10px] md:text-[0.7vw] font-sans uppercase tracking-widest">Investment</span>
                        <span className="line-through text-white/20 block text-[10px] md:text-[1vw] font-mono">{PRICING_PLANS[activeIndex].oldPrice}</span>
                        <div className="flex items-baseline md:justify-end gap-2">
                          <span className="text-3xl md:text-[4vw] font-black text-white font-headline">{PRICING_PLANS[activeIndex].investment}</span>
                          <span className="text-white/40 text-[10px] md:text-[0.7vw] font-mono">{PRICING_PLANS[activeIndex].period}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
                      <div>
                        <span className="text-white/30 block mb-4 tracking-widest text-[10px] md:text-[0.7vw] uppercase font-sans">WHAT'S INCLUDED</span>
                        <ul className="space-y-3">
                          {PRICING_PLANS[activeIndex].resources.map((resource, i) => (
                            <li key={i} className="flex items-start gap-4 text-[10px] md:text-[0.7vw] text-white/80 font-sans leading-relaxed">
                              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                              {resource}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex flex-col justify-between h-full">
                        <div className="bg-white/5 rounded-2xl p-6 w-full border border-white/5 mb-6">
                          <p className="text-sm md:text-[0.9vw] text-white/60 leading-relaxed italic font-sans">
                            "{PRICING_PLANS[activeIndex].footerText}"
                          </p>
                        </div>
                        <div className="flex justify-start">
                          <Button 
                            variant="link" 
                            className="text-white p-0 h-auto font-bold uppercase tracking-[0.2em] text-[10px] md:text-[0.9vw] underline underline-offset-8 decoration-white/30 hover:decoration-white transition-all"
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
