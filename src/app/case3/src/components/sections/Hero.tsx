'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { COMPANY_INFO } from '@/lib/data';
import Image from 'next/image';

export const Hero = () => {
  return (
    <section className="relative bg-background border-b border-black overflow-hidden px-4 py-16 lg:py-24">
      <div className="container mx-auto grid lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-12">
          <div className="inline-flex items-center">
            <span className="font-body text-[12px] uppercase font-semibold tracking-[0.12em] text-graphite">
              {COMPANY_INFO.emergencyTagline}
            </span>
          </div>

          <h1 className="text-ink font-extrabold leading-[0.95] tracking-[-0.02em] uppercase" style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}>
            Stuck with a leak?<br />
            Call Thelen.
          </h1>

          <div className="space-y-2">
            <p className="font-body text-[12px] uppercase font-semibold tracking-[0.12em] text-graphite">
              TAP TO CALL — 24/7 LIVE LINE
            </p>
            <p className="font-headline font-extrabold tracking-[-0.02em] text-ink leading-none" style={{ fontSize: 'clamp(2.75rem, 9vw, 6.5rem)' }}>
              {COMPANY_INFO.phone}
            </p>
            <p className="font-body text-[14px] font-medium text-ink-soft">
              Twin Cities · St. Paul · Big Lake
            </p>
          </div>

          <div className="flex flex-wrap gap-6 pt-4">
            <Button 
              className="h-16 px-10 bg-primary text-white font-headline font-bold text-[16px] rounded-none border-2 border-black hover:bg-primary/90 flex gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase tracking-[0.02em] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              asChild
            >
              <a href={`tel:${COMPANY_INFO.phone}`}>
                EMERGENCY DISPATCH <span>→</span>
              </a>
            </Button>
            <Button 
              variant="outline"
              className="h-16 px-10 border-2 border-black bg-white text-black font-headline font-bold text-[16px] rounded-none hover:bg-muted shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase tracking-[0.02em] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              Book a routine visit
            </Button>
          </div>

          <div className="pt-8">
            {/* Mobile: 2 lines, swapped Insured and BBB */}
            <p className="md:hidden font-code text-[13px] font-medium text-graphite uppercase tracking-widest">
              LIC #MN-PC042881 · BBB A+<br />
              INSURED $1M · PHCC MEMBER
            </p>
            {/* Desktop: Original layout */}
            <p className="hidden md:block font-code text-[13px] font-medium text-graphite uppercase tracking-widest">
              LIC #MN-PC042881  ·  INSURED $1M  ·  BBB A+  ·  PHCC MEMBER
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] w-full border-2 border-black bg-black group overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
             <Image 
                src="https://i.ibb.co/NqbLPk0/Documentary-style-photograph-of-202604280055-1.webp" 
                alt="Thelen Crew" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                data-ai-hint="plumbing team"
                priority
             />
             <div className="absolute bottom-4 left-4 right-4 bg-white border border-black p-3 flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="font-code text-[13px] font-medium text-graphite uppercase">
                  ESTABLISHED 1962 · 3RD GENERATION
                </span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};