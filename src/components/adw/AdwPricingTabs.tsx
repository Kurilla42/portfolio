"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PRICING_PLANS = [
  {
    id: "01",
    title: "GROWTH BUNDLE",
    description: "All Channels, Run As One System",
    subdescription: "Google Ads, Meta, and Local SEO working together — with full analytics and tracking tying every lead back to revenue.",
    whoIsThisFor: "Established businesses ready to dominate their local market and want one partner accountable for the whole funnel.",
    resources: [
      "Everything in Google Ads, Meta & SEO packages",
      "Analytics & tracking add-on included (GA4, call tracking)",
      "Offline / CRM conversion import",
      "One unified dashboard across all channels",
      "Cross-channel strategy & monthly review call",
      "Priority support and faster turnaround",
      "Single transparent invoice, no lock-in"
    ],
    footerText: "You get a complete growth engine — every channel aligned, every dollar measured, one team owning the result.",
    buttonText: "Request a Custom Scope",
    investment: "$1,290",
    pricePrefix: "From",
    period: "per month",
    retainer: "Setup from $990 (one-time)",
    oldPrice: "$2,400",
    badge: "best value",
  },
  {
    id: "02",
    title: "GOOGLE ADS",
    description: "Google Ads Launch & Management",
    subdescription: "Start getting calls from people actively searching for your service in your area — with every call and form tracked.",
    whoIsThisFor: "Local businesses that want a fast, steady flow of high-intent leads and are ready to invest in paid traffic to win their market.",
    resources: [
      "Keyword & competitor research for your services and area",
      "Search + Performance Max campaign build",
      "Precise geo / radius / zip targeting",
      "Conversion tracking for calls, forms & WhatsApp",
      "Negative keyword management to protect budget",
      "AI-assisted bidding fed with real conversion data",
      "Bi-weekly optimization & plain-English reports"
    ],
    footerText: "You get a profitable, fully tracked Google Ads engine — calls from ready-to-buy customers, not vanity clicks.",
    buttonText: "Request a Custom Scope",
    investment: "$597",
    pricePrefix: null,
    period: "setup",
    retainer: "+ $450/mo or 15% of spend",
    oldPrice: "$900",
    badge: "entry package",
  },
  {
    id: "03",
    title: "META ADS",
    description: "Facebook & Instagram Ads",
    subdescription: "Create demand where attention lives, then bring back everyone who didn't convert the first time.",
    whoIsThisFor: "Businesses with a clear offer who want to fill the funnel, build local awareness, and retarget warm audiences into booked jobs.",
    resources: [
      "Audience, interest & lookalike building",
      "Scroll-stopping creative concepts & testing",
      "Instant lead forms & click-to-message setup",
      "Retargeting of site visitors & past leads",
      "Pixel & Conversions API tracking",
      "Full funnel from awareness to enquiry",
      "Weekly creative refresh & optimization"
    ],
    footerText: "You get a Meta funnel that turns scrolling into enquiries — and keeps your brand in front of people who already know you.",
    buttonText: "Request a Custom Scope",
    investment: "$497",
    pricePrefix: null,
    period: "setup",
    retainer: "+ $400/mo management",
    oldPrice: "$750",
    badge: null,
  },
  {
    id: "04",
    title: "SEO + PROFILE",
    description: "Local SEO + Google Business Profile",
    subdescription: "Own the map pack and organic results so customers keep finding you — long after the ad budget stops.",
    whoIsThisFor: "Owners who want compounding, long-term visibility on Google Search and Maps without paying for every single click.",
    resources: [
      "Google Business Profile setup & optimization",
      "Categories, services, photos & weekly posts",
      "Review generation system & response templates",
      "Local landing pages per service & city",
      "Citations & consistent NAP across the web",
      "On-page SEO for \"near me\" intent",
      "Monthly ranking & visibility reporting"
    ],
    footerText: "You get a Google presence that earns trust and traffic on autopilot — the asset that keeps paying after the ads pause.",
    buttonText: "Request a Custom Scope",
    investment: "$397",
    pricePrefix: null,
    period: "setup",
    retainer: "+ $500/mo management",
    oldPrice: "$600",
    badge: null,
  },
];

const TEXT_STYLE_MATCH = "font-mono text-[3.5vw] md:text-[0.9vw] uppercase tracking-widest text-[#e0ded8] leading-relaxed";

export function AdwPricingTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef(null);
  useInView(containerRef, { once: true, amount: 0.2 });

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          {/* Left Column: Heading and Navigation */}
          <div className="lg:col-span-4 flex flex-col justify-start order-1 lg:order-1 pt-0">
            <div className="space-y-4 mb-8 md:mb-[4vw]">
              <h2 className="text-[12vw] md:text-[6vw] font-headline text-[#e0ded8] uppercase leading-[0.9] tracking-tight">
YOUR<br />PLAN
              </h2>
            </div>

            <div className="flex flex-col space-y-0">
              {PRICING_PLANS.map((plan, index) => {
                const isActive = activeIndex === index;
                const hasBottomBorder = index !== 0 && index !== 1 && index !== 2 && index !== PRICING_PLANS.length - 1;

                return (
                  <React.Fragment key={plan.id}>
                    {index === 1 && (
                      <div className="py-6 md:py-[2vw] flex items-center px-6 md:px-[2vw]" aria-hidden="true">
                        <div className="w-full h-[1px] bg-[#c7b684]" />
                      </div>
                    )}
                    <button
                      onClick={() => handleTabClick(index)}
                      className={cn(
                        "group relative flex items-center gap-4 md:gap-[1.5vw] py-6 md:py-[2vw] px-6 md:px-[2vw] text-left transition-all duration-500 border-l border-[#e0ded8]/10",
                        hasBottomBorder && "border-b border-[#e0ded8]/10",
                        isActive ? "bg-[#e0ded8]/5" : "hover:bg-[#e0ded8]/5"
                      )}
                    >
                      <div className={cn(
                        "absolute left-0 top-0 bottom-0 w-[3px] transition-colors duration-500",
                        isActive ? "bg-[#c7b684]" : "bg-[#e0ded8]/5"
                      )} />

                      <span className={cn(
                        "font-mono text-[3.5vw] md:text-[0.8vw] font-bold tabular-nums transition-colors duration-500",
                        isActive ? "text-[#e0ded8]" : "text-[#e0ded8]/20"
                      )}>
                        /{plan.id}
                      </span>

                      <div className="flex flex-wrap items-center gap-3">
                        <span className={cn(
                          "text-[5vw] md:text-[1.2vw] font-mono font-bold tracking-tight transition-colors duration-500 uppercase",
                          isActive ? "text-[#e0ded8]" : "text-[#e0ded8]/30"
                        )}>
                          {plan.title}
                        </span>
                        {plan.badge && (
                          <span className="px-2 py-0.5 bg-[#c7b684] text-black text-[2vw] md:text-[0.6vw] font-mono font-bold uppercase tracking-wider rounded-sm ml-2">
                            {plan.badge}
                          </span>
                        )}
                      </div>
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-8 flex flex-col order-2 lg:order-2">
            <div className="relative min-h-[500px] md:min-h-[850px]">
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
                    <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-6 pt-8 md:pt-0">
                      <div className="w-full">
                        <p className={cn(TEXT_STYLE_MATCH, "mb-8")}>
                          {PRICING_PLANS[activeIndex].subdescription}
                        </p>
                        <div className="mb-10">
                          <span className={cn(TEXT_STYLE_MATCH, "block mb-2")}>WHO IS THIS FOR</span>
                          <p className={TEXT_STYLE_MATCH}>
                            {PRICING_PLANS[activeIndex].whoIsThisFor}
                          </p>
                        </div>
                      </div>

                      <div className="text-left md:text-right w-full md:w-auto shrink-0 pt-2">
                        <div className="flex items-baseline md:justify-end gap-4">
                          {PRICING_PLANS[activeIndex].pricePrefix && (
                            <span className="font-mono text-[3.5vw] md:text-[0.9vw] uppercase tracking-widest text-[#e0ded8]">
                              {PRICING_PLANS[activeIndex].pricePrefix}
                            </span>
                          )}
                          <span className="text-[8vw] md:text-[4vw] font-black text-[#e0ded8] font-headline">
                            {PRICING_PLANS[activeIndex].investment}
                          </span>
                        </div>
                        <div className="flex flex-col md:items-end mt-2 gap-0.5">
                          <span className="font-mono text-[3vw] md:text-[0.75vw] uppercase tracking-widest text-[#e0ded8]/40">
                            {PRICING_PLANS[activeIndex].period}
                          </span>
                          <span className="font-mono text-[3.5vw] md:text-[0.9vw] uppercase tracking-widest text-[#c7b684]">
                            {PRICING_PLANS[activeIndex].retainer}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col mb-8">
                      <div className="mb-10">
                        <span className={cn(TEXT_STYLE_MATCH, "block mb-4")}>WHAT'S INCLUDED</span>
                        <ul className="space-y-3 mb-10">
                          {PRICING_PLANS[activeIndex].resources.map((resource, i) => (
                            <li key={i} className={cn(TEXT_STYLE_MATCH, "flex items-start gap-4")}>
                              <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#c7b684] shrink-0" />
                              {resource}
                            </li>
                          ))}
                        </ul>

                        <div className="max-w-2xl mb-8">
                          <p className={TEXT_STYLE_MATCH}>
                            {PRICING_PLANS[activeIndex].footerText}
                          </p>
                        </div>

                        <div className="flex justify-start">
                          <Button
                            asChild
                            variant="link"
                            className="text-[#e0ded8] p-0 h-auto font-mono font-bold uppercase tracking-[0.2em] text-[3.5vw] md:text-[1vw] underline underline-offset-8 decoration-[#e0ded8]/30 hover:decoration-[#e0ded8] transition-all"
                          >
                            <Link href="#contact">
                              {PRICING_PLANS[activeIndex].buttonText}
                            </Link>
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
