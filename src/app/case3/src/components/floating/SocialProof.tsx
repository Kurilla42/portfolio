"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, ShieldCheck, Star } from 'lucide-react';

const events = [
  { id: 1, text: "Mark in Plymouth just booked a furnace tune-up", time: "3 min ago", icon: ShieldCheck },
  { id: 2, text: "Jennifer in St. Paul rated us 5 stars", time: "12 min ago", icon: Star },
  { id: 3, text: "Thomas in Maple Grove scheduled AC service", time: "1 hr ago", icon: UserCheck },
  { id: 4, text: "Sarah in Big Lake just requested a quote", time: "15 min ago", icon: ShieldCheck },
];

export const SocialProof = () => {
  const [currentEvent, setCurrentEvent] = useState<typeof events[0] | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasShown = sessionStorage.getItem('social-proof-shown');
      if (!hasShown) {
        setCurrentEvent(events[Math.floor(Math.random() * events.length)]);
        sessionStorage.setItem('social-proof-shown', 'true');
      }
    }, 8000);

    const dismissTimer = setTimeout(() => {
      setCurrentEvent(null);
    }, 18000);

    return () => {
      clearTimeout(timer);
      clearTimeout(dismissTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {currentEvent && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="fixed bottom-20 left-4 md:bottom-8 md:left-8 z-50 max-w-[280px] bg-white rounded-2xl p-4 shadow-2xl border border-black/5 flex items-start gap-3"
        >
          <div className="bg-primary/10 text-primary p-2 rounded-full">
            <currentEvent.icon size={18} />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-body font-bold text-foreground leading-tight">
              {currentEvent.text}
            </p>
            <p className="text-[10px] font-code uppercase text-muted-foreground font-black">
              {currentEvent.time}
            </p>
          </div>
          <button 
            onClick={() => setCurrentEvent(null)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
