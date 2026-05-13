'use client';

import React from 'react';

const steps = [
  {
    id: '01',
    label: 'BOOK',
    title: 'You call or book.',
    description: 'A real human picks up — not a phone tree. We ask three questions and dispatch the closest truck.',
  },
  {
    id: '02',
    label: 'QUOTE',
    title: 'We quote flat-rate.',
    description: 'Before we touch anything, you get a number in writing. If you hate the number, the visit is free.',
  },
  {
    id: '03',
    label: 'FIX',
    title: 'The fix happens.',
    description: 'Same visit if we have parts on the truck (we usually do). Shoe covers on, tarp down, no surprises.',
  },
  {
    id: '04',
    label: 'PAY',
    title: 'You pay what we said.',
    description: 'Card, ACH, financing. Same number we quoted. Receipt by text before we leave.',
  },
];

export const Process = () => {
  return (
    <section id="process" className="py-24 bg-background overflow-hidden border-b border-black">
      <div className="container mx-auto px-4 max-w-[1400px]">
        {/* Header Block */}
        <div className="mb-20 space-y-8">
          <div className="flex items-center gap-4">
            <p className="font-code text-[11px] uppercase tracking-widest font-black text-muted-foreground">
              05 / PROCESS
            </p>
          </div>
          <h2 className="text-black font-black leading-[0.85] tracking-tighter uppercase m-0 max-w-4xl" style={{ fontSize: 'clamp(3rem, 6vw, 6.5rem)' }}>
            Four steps.<br />
            That's the whole thing.
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-y border-black divide-y md:divide-y-0 md:divide-x divide-black">
          {steps.map((step) => (
            <div key={step.id} className="p-8 lg:p-12 space-y-8 flex flex-col justify-between group hover:bg-black/5 transition-colors">
              <div className="space-y-6">
                <p className="font-code text-[11px] uppercase font-black text-primary tracking-widest">
                  STEP {step.id} / {step.label}
                </p>
                <h3 className="font-headline text-2xl lg:text-3xl leading-none tracking-tight uppercase">
                  {step.title}
                </h3>
                <p className="font-body text-sm lg:text-base text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
