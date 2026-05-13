'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Navigation } from 'lucide-react';
import { OFFICES, SERVICE_CITIES } from '@/lib/data';
import Link from 'next/link';

export const ServiceAreas = () => {
  return (
    <section id="areas" className="py-24 bg-background overflow-hidden border-t border-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16">
          <p className="font-code uppercase text-[11px] tracking-widest text-muted-foreground font-black mb-4">
            10 / ZONE
          </p>
          <h2 className="text-black font-black leading-[0.85] tracking-tighter uppercase m-0" style={{ fontSize: 'clamp(3rem, 6vw, 6.5rem)' }}>
            We show up here.
          </h2>
          <p className="font-body text-lg text-muted-foreground mt-6 max-w-2xl">
            Serving the Twin Cities and Central Minnesota with industrial-strength plumbing since 1962.
          </p>
        </div>

        {/* 12-Col Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Map Column (Left 5) */}
          <motion.div 
            className="lg:col-span-5 relative aspect-[4/5] bg-[#e5e3df] border border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Real Google Map with CSS Filters to match the industrial theme */}
            <div className="absolute inset-0 w-full h-full grayscale-[1] contrast-[1.2] brightness-[0.95] pointer-events-auto">
               <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d450000.0!2d-93.7505187!3d45.3341117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52b3659223126f21%3A0x1034c4493390c58f!2s12345%20County%20Rd%205%2C%20Big%20Lake%2C%20MN%2055309!5e0!3m2!1sen!2sus!4v1715854653245!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  className="opacity-90"
               ></iframe>
            </div>

            {/* Map Grid Pattern Overlay (Visual flair) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            {/* Bottom Technical Footer */}
            <div className="absolute bottom-0 right-0 left-0 bg-white/60 backdrop-blur-[2px] h-5 flex items-center justify-between px-3 z-30 pointer-events-none">
              <div className="flex gap-2">
                <span className="text-[7px] font-code uppercase text-black/50">45.3341° N, 93.7483° W</span>
              </div>
              <div className="flex gap-3">
                <span className="text-[7px] font-code uppercase text-black/40">Real-time Dispatch Active</span>
              </div>
            </div>
          </motion.div>

          {/* City Table Column (Right 7) */}
          <div className="lg:col-span-7 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-0 border-y border-black/10">
              {/* Desktop Table (Full) */}
              {SERVICE_CITIES.map((city, idx) => (
                <div 
                  key={city.name}
                  className={`flex justify-between items-center border-b border-black/10 py-3 group hover:bg-black/[0.02] transition-colors px-2 ${idx >= 5 ? 'hidden md:flex' : 'flex'}`}
                >
                  <span className="font-code text-[11px] font-black tracking-tighter uppercase">
                    {city.name}
                  </span>
                  <span className="font-code text-[9px] text-muted-foreground/60">
                    {city.zips.split('—')[0].split(',')[0]}...
                  </span>
                </div>
              ))}
            </div>
            
            <div className="pt-2">
              <p className="font-code text-[11px] uppercase font-black text-muted-foreground md:block hidden">
                + 32 more service locations · <Link href="#" className="text-primary underline hover:text-primary/80 transition-colors">ZIP lookup →</Link>
              </p>
              <p className="font-code text-[11px] uppercase font-black text-muted-foreground md:hidden">
                + 42 more service locations · <Link href="#" className="text-primary underline hover:text-primary/80 transition-colors">ZIP lookup →</Link>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              {OFFICES.map((office, idx) => (
                <div key={idx} className="bg-white border border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                  <h3 className="text-lg font-headline mb-3 uppercase tracking-tight">{office.name}</h3>
                  <p className="font-code text-[10px] font-black text-muted-foreground leading-relaxed uppercase tracking-widest">
                    {office.address}<br />
                    {office.city}, {office.state} {office.zip}
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <p className="font-code text-[12px] text-primary font-black uppercase">
                      {office.phone}
                    </p>
                    <div className="h-px flex-1 bg-black/5" />
                    <Navigation size={14} className="text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
