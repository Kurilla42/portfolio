'use client';

import React from 'react';

const stats = [
  { val: "24", unit: "", sub: "YEARS DISPATCHING" },
  { val: "3,412", unit: "", sub: "GOOGLE REVIEWS · 4.9★" },
  { val: "47", unit: "", sub: "NEIGHBORHOODS SERVED IN MN" },
  { val: "11,400", unit: "", sub: "JOBS PER YEAR IN TWIN CITIES" },
];

export const EmergencyGuarantee = () => {
  return (
    <section className="bg-background overflow-hidden py-12 lg:py-24 border-b border-black">
      <div className="container mx-auto px-4">
        {/* Main Promise Box */}
        <div className="relative z-10 bg-primary border border-black p-8 lg:p-20 grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Heading */}
          <div className="space-y-6 lg:space-y-10">
            <p className="font-body text-[12px] uppercase font-semibold tracking-[0.12em] text-white/80">
              04 / GUARANTEE
            </p>
            <h2 
              className="text-white font-extrabold tracking-[-0.02em] uppercase m-0" 
              style={{ 
                fontSize: 'clamp(1.875rem, 4.5vw, 3.25rem)',
                lineHeight: '1.08',
                maxWidth: '22ch'
              }}
            >
              If our plumber isn't at your door <br />
              within 89 minutes, the diagnostic's <br />
              on us.
            </h2>
          </div>

          {/* Right Column: Steps & Disclaimer */}
          <div className="space-y-12">
            <div className="space-y-6">
              <p className="font-body text-white/90 text-lg leading-relaxed max-w-md">
                We back our dispatch around Twin Cities, weekdays and weekends. When you book a same-day call between 7am and 9pm, we either arrive in 89 minutes or you don't pay for the house call.
              </p>
              
              <div className="flex flex-col gap-4 mt-8 border-y-2 border-white/20 py-6">
                {[
                  { id: '01', text: 'Real-time GPS tracker sent to your phone' },
                  { id: '02', text: 'Technician bio and photo via SMS' },
                  { id: '03', text: 'Diagnostic fee waived if we hit minute 90' },
                ].map((item) => (
                  <div key={item.id} className="grid grid-cols-[32px_1fr] gap-4 items-baseline group">
                    <span className="font-code text-sm font-semibold text-white/70 group-hover:text-white transition-colors">{item.id}</span>
                    <p className="font-headline text-[16px] font-medium text-white tracking-wide uppercase">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="font-code text-[9px] uppercase font-medium text-white/40 tracking-[0.05em] leading-relaxed max-w-md">
              *Applies to same-day residential calls. Named winter storms or Vikings playoff games may pause promise with notice.
            </p>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-x border-b border-black divide-y lg:divide-y-0 md:divide-x divide-black bg-background">
          {stats.map((stat, i) => (
            <div key={i} className="p-10 space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="font-narrow text-ink font-bold leading-none" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
                  {stat.val}
                </span>
                {stat.unit && (
                  <span className="font-headline text-xl text-ink font-bold">
                    {stat.unit}
                  </span>
                )}
              </div>
              <p className="font-body text-[12px] uppercase font-semibold tracking-[0.1em] text-ink/85">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};