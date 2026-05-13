'use client';

import React from 'react';
import { Star } from 'lucide-react';

const tickerItems = [
  { text: "EMERGENCY · FROM $189", icon: Star },
  { text: "DRAIN CLEARING · FROM $149", icon: Star },
  { text: "WATER HEATERS · FROM $1,200", icon: Star },
  { text: "LEAK DETECTION · FROM $275", icon: Star },
  { text: "SEWER LINE · FROM $450", icon: Star },
  { text: "FIXTURES · FROM $129", icon: Star },
  { text: "24/7 AVAILABLE", icon: Star },
];

export const EmergencyStrip = () => {
  return (
    <div className="relative z-10 bg-[#1a2230] h-14 flex items-center overflow-hidden border-y border-black isolate">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center">
            {tickerItems.map((item, idx) => (
              <div key={idx} className="flex items-center">
                <div className="flex items-center px-12">
                  <item.icon className="h-3 w-3 text-primary fill-current mr-8" />
                  <span className="font-code text-[11px] uppercase font-black text-white tracking-[0.2em]">
                    {item.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};