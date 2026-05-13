'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ESTIMATE_DATA, COMPANY_INFO } from '@/lib/data';
import { useContactModal } from '@/context/contact-modal-context';
import { cn } from '@/lib/utils';

export const CostEstimator = () => {
  const { openModal } = useContactModal();
  const [selections, setSelections] = useState({
    issue: 'clogged-drain',
    homeSize: 'medium',
    urgency: 'normal',
  });

  const priceRange = useMemo(() => {
    const issue = ESTIMATE_DATA.issues.find((i) => i.id === selections.issue);
    const homeSize = ESTIMATE_DATA.homeSizes.find((h) => h.id === selections.homeSize);
    const urgency = ESTIMATE_DATA.urgency.find((u) => u.id === selections.urgency);

    if (!issue || !homeSize || !urgency) return [0, 0, 0];

    const baseLow = issue.base[0] * homeSize.mult * urgency.mult;
    const baseHigh = issue.base[1] * homeSize.mult * urgency.mult;
    const average = Math.round((baseLow + baseHigh) / 2);

    return [Math.round(baseLow), Math.round(baseHigh), average];
  }, [selections]);

  const handleSelect = (key: string, value: string) => {
    setSelections((prev) => ({ ...prev, [key]: value }));
  };

  const handleBook = () => {
    const issue = ESTIMATE_DATA.issues.find(i => i.id === selections.issue)?.label;
    openModal({
      service: selections.issue,
      message: `Estimator: ${issue} / Home: ${selections.homeSize} / Urgency: ${selections.urgency}. Range: $${priceRange[0]}-$${priceRange[1]}`,
    });
  };

  return (
    <section id="pricing" className="py-24 bg-background border-y border-black overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="border border-black p-4 sm:p-8 md:p-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Info */}
          <div className="space-y-10">
            <div className="space-y-4">
              <p className="font-code text-[11px] uppercase tracking-widest font-black text-muted-foreground">
                03 / ESTIMATOR // BUILT FROM 11,400 THELEN JOBS
              </p>
              <h2 className="text-black font-black leading-[0.85] tracking-tighter uppercase" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                A REAL NUMBER, <br /> NOT "IT DEPENDS."
              </h2>
              <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
                Pick what's wrong and the size of your home. We'll show the range our last hundred customers paid for parts and labor, based on our flat-rate book.
              </p>
            </div>

            <div className="border border-black p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-md">
              <p className="font-code text-[11px] uppercase font-black tracking-widest text-primary mb-2">PROMO OFFER</p>
              <h3 className="font-headline text-lg uppercase mb-2">$50 BACK IN YOUR POCKET.</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Schedule a free in-home quote after using this tool and we'll take $50 off the first repair over $250. Good through 2026.
              </p>
            </div>
          </div>

          {/* Right Side: Selection & Results */}
          <div className="space-y-10 md:space-y-12 w-full overflow-hidden">
            
            {/* Row 1: What's Happening */}
            <div className="space-y-4">
              <p className="font-code text-[10px] uppercase font-black text-muted-foreground tracking-widest">WHAT'S HAPPENING?</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {ESTIMATE_DATA.issues.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect('issue', item.id)}
                    className={cn(
                      "p-3 sm:p-4 border border-black text-left transition-all min-w-0 flex flex-col justify-between",
                      selections.issue === item.id 
                        ? "bg-primary text-white shadow-none" 
                        : "bg-white text-black hover:bg-muted shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    )}
                  >
                    <p className="font-headline text-[10px] sm:text-[11px] uppercase leading-tight mb-1 break-words">{item.label}</p>
                    <p className={cn("font-code text-[8px] sm:text-[9px] uppercase font-black", selections.issue === item.id ? "text-white/60" : "text-muted-foreground")}>
                      {item.sub}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Row 2: Home Size */}
            <div className="space-y-4">
              <p className="font-code text-[10px] uppercase font-black text-muted-foreground tracking-widest">HOME SIZE</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {ESTIMATE_DATA.homeSizes.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect('homeSize', item.id)}
                    className={cn(
                      "p-3 sm:p-4 border border-black text-left transition-all min-w-0 flex flex-col justify-between",
                      selections.homeSize === item.id 
                        ? "bg-primary text-white shadow-none" 
                        : "bg-white text-black hover:bg-muted shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    )}
                  >
                    <p className="font-headline text-[10px] sm:text-[11px] uppercase leading-tight mb-1 break-words">{item.label}</p>
                    <p className={cn("font-code text-[8px] sm:text-[9px] uppercase font-black", selections.homeSize === item.id ? "text-white/60" : "text-muted-foreground")}>
                      {item.sub}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Row 3: Urgency */}
            <div className="space-y-4">
              <p className="font-code text-[10px] uppercase font-black text-muted-foreground tracking-widest">URGENCY</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {ESTIMATE_DATA.urgency.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect('urgency', item.id)}
                    className={cn(
                      "p-3 sm:p-4 border border-black text-left transition-all min-w-0 flex flex-col justify-between",
                      selections.urgency === item.id 
                        ? "bg-primary text-white shadow-none" 
                        : "bg-white text-black hover:bg-muted shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    )}
                  >
                    <p className="font-headline text-[10px] sm:text-[11px] uppercase leading-tight mb-1 break-words">{item.label}</p>
                    <p className={cn("font-code text-[8px] sm:text-[9px] uppercase font-black", selections.urgency === item.id ? "text-white/60" : "text-muted-foreground")}>
                      {item.sub}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Result Box */}
            <div className="bg-[#EAE3D2] border border-black p-5 sm:p-8 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex justify-between items-start mb-6">
                <p className="font-code text-[10px] uppercase font-black text-muted-foreground tracking-widest">TYPICAL PRICE RANGE</p>
                <p className="font-code text-[10px] uppercase font-black text-primary tracking-widest">±12% ACCURACY</p>
              </div>

              <div className="mb-8 overflow-hidden">
                <h4 className="font-headline text-2xl xs:text-3xl sm:text-5xl md:text-6xl tracking-tighter leading-none mb-2 break-words">
                  ${priceRange[0]} <span className="text-primary">—</span> ${priceRange[1]}
                </h4>
                <div className="w-full h-[1px] bg-black/10 my-4" />
                <div className="flex flex-col sm:flex-row justify-between gap-2 font-code text-[9px] sm:text-[10px] uppercase font-black text-muted-foreground/60 tracking-widest">
                  <span>MOST CUSTOMERS PAY: ${priceRange[2]}</span>
                  <span className="hidden sm:inline">INCLUDES LABOR + COMMON PARTS</span>
                </div>
              </div>

              <Button 
                onClick={handleBook}
                className="w-full h-14 sm:h-16 bg-primary text-white font-headline text-base sm:text-lg uppercase tracking-wide rounded-none border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-primary/90 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                LOCK IN THIS PRICE NOW™
              </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};