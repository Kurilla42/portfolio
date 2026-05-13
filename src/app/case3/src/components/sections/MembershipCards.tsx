'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: "TUNE-UP CLUB",
    price: "12",
    features: ["2 HVAC tune-ups (spring + fall)", "1 plumbing inspection", "10% off all service calls", "Priority dispatch (we move you ahead)"],
    color: "bg-white",
    textColor: "text-dark",
    buttonColor: "bg-primary text-white hover:bg-primary/90"
  },
  {
    name: "PLATINUM PLAN",
    price: "29",
    features: ["Everything in Tune-Up Club", "Zero dispatch fees, ever", "Free water-heater flush annually", "5-year extended warranty on installs"],
    color: "bg-primary",
    textColor: "text-white",
    highlight: true,
    buttonColor: "bg-dark text-white hover:bg-dark/90"
  }
];

export const MembershipCards = () => {
  return (
    <section id="pricing" className="py-24 bg-background border-t">
      <div className="container mx-auto px-4">
        <div className="mb-16 space-y-4">
          <p className="font-code text-[11px] uppercase tracking-widest font-black text-muted-foreground">
            08 / MEMBERSHIP
          </p>
          <h2 className="leading-[0.95] tracking-tighter uppercase m-0" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}>
            The Home Club.<br/>Because pipes don't fail politely.
          </h2>
          <p className="font-body text-lg text-muted-foreground mt-6 max-w-2xl">
            Two-tier maintenance plan. Cancel anytime. No phone-tree to do it.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div key={i} className={`${plan.color} ${plan.textColor} p-12 border border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative`}>
              {plan.highlight && (
                <div className="absolute top-0 right-0 bg-dark text-white px-4 py-1 font-code text-[10px] font-black shadow-[-2px_2px_0px_0px_rgba(0,0,0,1)]">MOST POPULAR</div>
              )}
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-headline mb-2 uppercase">{plan.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black">${plan.price}</span>
                    <span className="font-code text-xs uppercase opacity-50">/ month</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <Check size={18} className={plan.textColor === 'text-white' ? 'text-dark' : 'text-primary'} />
                      <span className="font-bold text-lg leading-tight">{f}</span>
                    </div>
                  ))}
                </div>
                <Button className={`w-full h-16 text-lg font-headline uppercase rounded-none border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all ${plan.buttonColor}`}>
                  JOIN {plan.name.split(' ')[0]} →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
