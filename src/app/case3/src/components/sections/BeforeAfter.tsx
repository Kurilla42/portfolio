'use client';

import React from 'react';
import { ImageComparison } from '@/components/ui/image-comparison';

const cases = [
  {
    id: 'case-1',
    location: 'Edina, MN  ·  January 2026  ·  Single visit · 4 hrs total',
    title: 'FROZEN GALVANIZED LINE — BURST AT 2:47 AM',
    desc: '"Old galvanized vertical split during the cold snap — homeowner caught it before it took the basement. We re-routed to type-L copper with a U-bend off the main, dropped a dehumidifier on the wall, and were out before sunrise."',
    before: 'https://i.ibb.co/pjMs4G6X/7cdac66c-4a0d-4255-88d2-a59d6a204d2f.jpg',
    after: 'https://i.ibb.co/4R07jXvw/c133fc33-88ee-46a8-a5cc-a1aa2e481cc5.png',
  },
  {
    id: 'case-2',
    location: 'St. Paul, MN  ·  May 2026  ·  Same-day install · 3 hrs 40 min',
    title: 'WATER HEATER FAILURE — RUST AT YEAR 13',
    desc: '"Tank was leaking from the base and streaking rust across the slab. Pulled it, hauled it, dropped in a new 40-gal Bradford White with a fresh expansion tank, seismic strap, and a yellow flex on the gas line. Photos to the homeowner\'s insurance the same afternoon."',
    before: 'https://i.ibb.co/Vc5gXzJv/4598958c-ccb8-4a0f-a0d8-e2422a7e7de0.jpg',
    after: 'https://i.ibb.co/JwnHFv18/f48c71b0-cf66-4d1a-8346-394c2397fe50.png',
  }
];

export const BeforeAfter = () => {
  return (
    <section id="field-log" className="py-24 bg-[#F5F1EA] border-t border-black px-4">
      <div className="container mx-auto">
        <div className="mb-16 space-y-4">
          <p className="font-code text-[11px] uppercase tracking-widest font-black text-muted-foreground">
            07 / FIELD LOG
          </p>
          <h2 className="text-black font-black leading-[0.85] tracking-tighter uppercase m-0" style={{ fontSize: 'clamp(3rem, 6vw, 6.5rem)' }}>
            What we walked into.<br />
            What we left.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {cases.map((item) => (
            <div key={item.id} className="space-y-6">
              <div className="relative border-2 border-black bg-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group">
                <ImageComparison
                  beforeImage={item.before}
                  afterImage={item.after}
                  className="aspect-[4/3] w-full"
                />
              </div>
              
              <div className="space-y-4 pt-2">
                <div className="space-y-1">
                  <h3 className="font-headline text-2xl uppercase tracking-tight m-0">{item.title}</h3>
                  <p className="font-code text-[10px] uppercase font-black text-primary tracking-widest">{item.location}</p>
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed italic">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
