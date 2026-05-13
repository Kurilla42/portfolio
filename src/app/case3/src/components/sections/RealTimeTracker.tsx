'use client';

import React from 'react';
import Image from 'next/image';

export const RealTimeTracker = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-8">
          <h2 className="leading-none">WATCH YOUR PLUMBER<br/><span className="text-primary italic">IN REAL TIME.</span></h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            No more "we'll be there between 8am and 4pm." We send you a link to our GPS tracker the moment your tech is dispatched. You'll see exactly where they are and their estimated arrival time down to the minute.
          </p>
          <div className="space-y-4">
            {['Uber-style GPS Tracking', 'Technician Bio & Photo sent via SMS', 'Digital Diagnosis with Photos'].map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-lg font-bold">
                <div className="w-2 h-2 rounded-full bg-primary" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="relative aspect-[3/4] max-w-sm mx-auto">
          <div className="absolute inset-0 bg-dark rounded-[3rem] shadow-2xl p-4">
             <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                <Image 
                  src="https://picsum.photos/seed/tracking/600/1000" 
                  alt="Tracker UI" 
                  fill 
                  className="object-cover"
                  data-ai-hint="mobile app interface"
                />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
