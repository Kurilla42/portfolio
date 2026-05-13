'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { COMPANY_INFO } from '@/lib/data';
import Link from 'next/link';

const navItems = [
  { name: 'Services', href: '#services' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'About', href: '#team' },
  { name: 'Reviews', href: '#testimonials' },
];

const mobileNavItems = [
  { name: '01 / Services', href: '#services' },
  { name: '02 / Estimator', href: '#pricing' },
  { name: '03 / Process', href: '#process' },
  { name: '04 / Crew', href: '#team' },
  { name: '05 / Field Log', href: '#field-log' },
  { name: '06 / Membership', href: '#pricing' },
  { name: '07 / Reviews', href: '#testimonials' },
  { name: '08 / Zone', href: '#areas' },
  { name: '09 / FAQ', href: '#faq' },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      // Increased threshold to 50px to prevent jitter near top of page
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Safe locale string formatting to prevent hydration mismatch
  const formattedReviewCount = mounted 
    ? COMPANY_INFO.stats.reviewCount.toLocaleString() 
    : COMPANY_INFO.stats.reviewCount.toString();

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b border-black bg-background overflow-hidden"
      initial={false}
      animate={{
        height: isScrolled ? '72px' : '96px',
      }}
      transition={{ 
        duration: 0.3, 
        ease: [0.4, 0, 0.2, 1] // Custom cubic-bezier for smoother motion
      }}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex flex-col">
          <Link href="/" className="font-headline text-2xl tracking-tighter uppercase leading-none">
            {COMPANY_INFO.name}
          </Link>
          <span className="font-body text-[10px] uppercase font-semibold tracking-widest text-muted-foreground mt-1">
            {COMPANY_INFO.tagline}
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-code text-[11px] uppercase font-bold tracking-widest hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <div className="text-right">
            <p className="font-code text-[10px] font-black uppercase tracking-widest leading-none mb-1">
              ★ {COMPANY_INFO.stats.rating} ({formattedReviewCount} reviews)
            </p>
            <p className="font-code text-[9px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
              LIC #MN-PC042881
            </p>
          </div>
          <Button
            className="bg-primary text-white hover:bg-primary/90 font-code text-[11px] h-10 px-6 uppercase tracking-widest rounded-none border border-black flex gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
            asChild
          >
            <a href={`tel:${COMPANY_INFO.phone}`}>
              REQUEST SERVICE →
            </a>
          </Button>
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full bg-background border-l-2 border-black rounded-none flex flex-col">
              <div className="flex flex-col flex-1 py-12 px-6 space-y-4 overflow-y-auto">
                {mobileNavItems.map((item) => (
                  <SheetClose key={item.name} asChild>
                    <Link
                      href={item.href}
                      className="text-2xl font-headline border-b border-black/10 pb-2 uppercase tracking-tight hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </SheetClose>
                ))}
                <div className="pt-8">
                   <a href={`tel:${COMPANY_INFO.phone}`} className="text-2xl font-code uppercase font-bold text-primary">
                    {COMPANY_INFO.phone}
                  </a>
                  <p className="text-[10px] font-code uppercase text-muted-foreground mt-2">24/7 EMERGENCY DISPATCH</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};
