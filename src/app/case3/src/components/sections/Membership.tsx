'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const plans = [
  {
    id: 'happy-home',
    name: 'Happy Home Club',
    price: 15,
    savings: 'Save $36 annually',
    description: 'The foundation of home comfort. Perfect for homeowners who want basic preventative care.',
    benefits: [
      '2 HVAC tune-ups per year',
      '1 plumbing inspection',
      '15% off any repair',
      'Priority emergency scheduling',
      'No overtime fees (24/7)',
      'Free drain inspection if requested',
      'Transferable when you sell',
      'Cancel anytime, no penalty',
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum Plan',
    price: 39,
    savings: 'Save $120 annually',
    description: 'Total peace of mind. Waived fees and deep discounts for high-efficiency homes.',
    benefits: [
      '2 HVAC tune-ups per year',
      '1 plumbing inspection',
      '25% off any repair',
      'Waived service call fees ($89 value)',
      'Waived overtime fees (24/7)',
      'Free sewer camera inspection',
      'Lifetime workmanship warranty',
      'Priority front-of-line dispatch',
    ],
  },
];

export const Membership = () => {
  const [activeTab, setActiveTab] = useState(plans[0].id);
  const currentPlan = plans.find((p) => p.id === activeTab)!;

  return (
    <section id="membership" className="py-24 bg-dark text-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-16 md:mb-20 text-center md:text-left">
          <p className="font-code uppercase text-xs tracking-widest text-white/60 font-black mb-4">
            PREVENTATIVE CARE
          </p>
          <h2 className="text-white leading-none mb-6">
            The club that pays <br className="hidden md:block" /> for itself.
          </h2>
        </div>

        {/* Layout Grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Tabs Column */}
          <div className="lg:col-span-4 w-full">
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 gap-4 scrollbar-hide">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setActiveTab(plan.id)}
                  className={cn(
                    "relative flex-shrink-0 lg:w-full p-6 text-left rounded-2xl transition-all duration-300",
                    "border-2",
                    activeTab === plan.id
                      ? "bg-primary border-primary text-white"
                      : "bg-white/5 border-white/10 text-white/50 hover:text-white/80 hover:bg-white/10"
                  )}
                >
                  {activeTab === plan.id && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-white hidden lg:block"
                    />
                  )}
                  <div className="space-y-1">
                    <p className="font-headline text-lg lg:text-xl uppercase">{plan.name}</p>
                    <p className="font-code text-xs opacity-70">${plan.price}/month</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-8 w-full">
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 lg:p-12 relative overflow-hidden min-h-0 lg:h-[580px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPlan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="space-y-10"
                >
                  {/* Price Header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-6xl md:text-8xl font-headline tracking-tighter text-primary">
                          ${currentPlan.price}
                        </span>
                        <span className="text-xl font-headline opacity-40 uppercase">/ MO</span>
                      </div>
                      <span className="inline-block bg-white/10 px-3 py-1 rounded-full font-code text-[10px] uppercase tracking-widest text-white/70">
                        {currentPlan.savings}
                      </span>
                    </div>
                    <div className="max-w-xs md:text-right">
                      <h3 className="text-2xl font-headline mb-2">{currentPlan.name}</h3>
                      <p className="text-sm text-white/50 leading-relaxed font-body">
                        {currentPlan.description}
                      </p>
                    </div>
                  </div>

                  {/* Benefits Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    {currentPlan.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-3 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40 group-hover:opacity-100 transition-opacity" />
                        <span className="text-sm font-body text-white/80 group-hover:text-white transition-colors">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Area */}
                  <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center gap-6">
                    <Button 
                      size="lg" 
                      className="h-16 px-10 text-lg font-headline bg-primary text-white hover:bg-primary/90 w-full sm:w-auto uppercase tracking-wide"
                    >
                      Join {currentPlan.name}
                    </Button>
                    <p className="text-xs font-code text-white/40 uppercase tracking-widest text-center sm:text-left">
                      * NO LONG-TERM CONTRACTS · CANCEL ANYTIME
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
