'use client';

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { val: "500+", label: "Verified Reviews", sub: "Twin Cities Favorite" },
  { val: "4.9", label: "Google Rating", sub: "Average Job Quality" },
  { val: "A+", label: "BBB Rated", sub: "Fully Accredited" },
  { val: "EST. 2012", label: "Local Family Owned", sub: "Since The Beginning" },
];

export const TrustStrip = () => {
  return (
    <div className="bg-dark py-12 border-y border-white/5">
      <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center space-y-1"
          >
            <h4 className="text-primary font-headline text-4xl leading-none">{stat.val}</h4>
            <p className="text-white font-headline text-xs uppercase tracking-tight">{stat.label}</p>
            <p className="text-white/40 font-code text-[9px] uppercase tracking-widest">{stat.sub}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
