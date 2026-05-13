'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COMPANY_INFO } from '@/lib/data';

export const FinalCta = () => {
  return (
    <section className="relative z-10 min-h-[70vh] flex items-center justify-center bg-primary overflow-hidden px-4 py-24">
      <div className="container mx-auto max-w-6xl relative z-10 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-signal-ink font-headline font-extrabold leading-[0.95] tracking-tighter uppercase" style={{ fontSize: 'clamp(4rem, 14vw, 9rem)' }}>
            Enough reading.<br />Call us.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center justify-center gap-6"
        >
          <a 
            href={`tel:${COMPANY_INFO.phone}`}
            className="text-signal-ink font-code text-4xl md:text-6xl font-black tracking-tighter hover:text-white transition-colors"
          >
            {COMPANY_INFO.phone} · 24/7
          </a>
          <p className="font-body text-xl text-signal-ink/80">
            Or <button className="underline hover:text-white transition-colors">book online →</button> if it's not bleeding.
          </p>
        </motion.div>
      </div>
    </section>
  );
};