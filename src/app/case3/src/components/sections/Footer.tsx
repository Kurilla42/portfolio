'use client';

import React from 'react';
import { COMPANY_INFO } from '@/lib/data';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-black/10 py-20 px-4">
      <div className="container mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 items-start mb-20">
          
          {/* Column 1: Identity */}
          <div className="space-y-8">
            <div className="flex flex-col">
              <h2 className="text-xl font-headline italic tracking-tighter uppercase leading-none">THELEN PLUMBING CO.</h2>
              <span className="font-body text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Family-owned since 1962</span>
            </div>
            
            <p className="font-body text-xs text-muted-foreground max-w-[280px] leading-relaxed uppercase font-medium">
              Three generations · Twin Cities, MN. Licensed, bonded, and locally dispatched.
            </p>
          </div>

          {/* Wrapper for side-by-side links on mobile */}
          <div className="grid grid-cols-2 gap-8 md:contents">
            {/* Column 2: Services */}
            <div className="space-y-6">
              <p className="font-code text-[11px] uppercase font-black tracking-[0.2em] text-muted-foreground">SERVICES</p>
              <ul className="space-y-3">
                {['Pipe Repair', 'Water Heaters', 'Drain Clearing', 'Fixtures', 'Leak Detection', 'Commercial', 'Membership', 'Financing'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="font-code text-[10px] font-black text-muted-foreground hover:text-black uppercase tracking-widest transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Company */}
            <div className="space-y-6">
              <p className="font-code text-[11px] uppercase font-black tracking-[0.2em] text-muted-foreground">COMPANY</p>
              <ul className="space-y-3">
                {['About', 'The Crew', 'Reviews', 'Service Area', 'Careers', 'Press', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="font-code text-[10px] font-black text-muted-foreground hover:text-black uppercase tracking-widest transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-6">
            <p className="font-code text-[11px] uppercase font-black tracking-[0.2em] text-muted-foreground">CONTACT</p>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="font-code text-[10px] font-black uppercase tracking-widest">
                   <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-primary">{COMPANY_INFO.phone} · 24/7</a>
                </p>
                <p className="font-code text-[10px] font-black text-muted-foreground uppercase tracking-widest">{COMPANY_INFO.email}</p>
                <p className="font-code text-[10px] font-black text-muted-foreground uppercase tracking-widest">12345 County Rd 5, Big Lake, MN 55309</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-code text-[9px] font-black text-muted-foreground uppercase tracking-widest">
            LIC #MN-PC042881  ·  PHCC MEMBER  ·  BBB A+  ·  © 2026 Thelen Plumbing Co. · 3 generations and counting.
          </p>

          <div className="flex gap-6">
            {['PRIVACY', 'TERMS'].map((item) => (
              <Link key={item} href="#" className="font-code text-[9px] font-black text-muted-foreground hover:text-black uppercase tracking-widest">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
