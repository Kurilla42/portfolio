'use client';

import React from 'react';
import Image from 'next/image';

export const StatsStats = () => {
  return (
    <section className="py-24 bg-background border-t border-black px-4">
      <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-12">
          <div className="space-y-4">
             <h2 className="text-black font-black leading-[0.9] m-0">NO BS. JUST HARD WORK.</h2>
             <div className="w-full h-1 bg-black" />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="border border-black p-6 bg-white space-y-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-3xl font-headline m-0">15+</p>
              <p className="font-code text-[10px] uppercase font-black tracking-widest text-muted-foreground">Years in the trenches</p>
            </div>
            <div className="border border-black p-6 bg-white space-y-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-3xl font-headline m-0">10K+</p>
              <p className="font-code text-[10px] uppercase font-black tracking-widest text-muted-foreground">Leaks Stopped</p>
            </div>
          </div>

          <div className="pl-6 border-l-2 border-primary italic font-body text-lg text-muted-foreground space-y-4">
            <p>"Thelen's crew showed up at 2 AM, found the main line break under the driveway, and had it patched before the sun came up. True professionals."</p>
            <p className="font-code text-[11px] uppercase font-black text-black not-italic">— MARCUS T., FOREMAN AT ATLAS BUILDERS</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="relative aspect-[3/4] border-2 border-black bg-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <Image 
              src="https://picsum.photos/seed/tech-1/600/800" 
              alt="Tech" 
              fill 
              className="object-cover grayscale"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3">
              <p className="font-code text-[10px] text-white uppercase font-black tracking-widest">DOMINGO R. / LEAD</p>
            </div>
          </div>
          <div className="relative aspect-[3/4] border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <Image 
              src="https://picsum.photos/seed/tool-1/600/800" 
              alt="Equipment" 
              fill 
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3">
              <p className="font-code text-[10px] text-white uppercase font-black tracking-widest">EQUIPMENT / TIER 1</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
