'use client';

import React from 'react';
import Image from 'next/image';
import { TECHNICIANS } from '@/lib/data';

export const Team = () => {
  return (
    <section id="team" className="py-24 bg-[#F5F1EA] overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1400px]">
        {/* Section Header */}
        <div className="mb-20">
          <p className="font-code text-[11px] uppercase tracking-widest text-muted-foreground font-black mb-4">
            06 / CREW
          </p>
          <h2 className="text-black font-black leading-[0.85] tracking-tighter uppercase m-0" style={{ fontSize: 'clamp(3rem, 6vw, 7rem)' }}>
            The people who'll<br />actually show up.
          </h2>
          <p className="font-body text-lg text-muted-foreground mt-8 max-w-2xl leading-relaxed">
            Every one of our trucks is background-checked, licensed, and named on this page. <span className="text-black font-bold italic">No subcontractors.</span>
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TECHNICIANS.map((tech) => (
            <div 
              key={tech.id} 
              className="flex flex-col group cursor-pointer"
            >
              {/* Polaroid Photo Wrapper */}
              <div 
                className="relative aspect-[3/4] border-2 border-black bg-background p-3 pb-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="relative w-full h-full overflow-hidden border border-black/5 bg-black/5">
                  <Image
                    src={tech.photoUrl}
                    alt={tech.name}
                    fill
                    quality={95}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                    style={{ 
                      filter: 'grayscale(0.15) contrast(1.05) brightness(0.97) sepia(0.08)' 
                    }}
                  />
                </div>
                
                {/* Polaroid Caption Label */}
                <div className="absolute bottom-4 left-3 font-code text-[9px] uppercase tracking-widest text-graphite font-black">
                  {tech.name} · {tech.role.split('·')[0]}
                </div>
              </div>

              {/* Bio content area */}
              <div className="pt-6 px-1 space-y-4">
                <p className="font-body text-sm text-black leading-relaxed italic">
                  {tech.bio}
                </p>
                <div className="pt-2 border-t border-black/5">
                  <p className="font-code text-[10px] uppercase font-black text-primary tracking-tighter">
                    {tech.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
