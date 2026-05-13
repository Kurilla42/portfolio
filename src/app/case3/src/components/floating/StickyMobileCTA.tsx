"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Calendar } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';
import { useContactModal } from '@/context/contact-modal-context';

export const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { openModal } = useContactModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="md:hidden fixed bottom-0 left-0 right-0 bg-white z-[40] flex gap-px border-t shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.2)]"
        >
          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="flex-1 bg-destructive text-white h-16 flex items-center justify-center gap-2 font-headline text-sm uppercase tracking-tight"
          >
            <Phone size={18} />
            Call Now
          </a>
          <button
            onClick={() => openModal()}
            className="flex-1 bg-primary text-white h-16 flex items-center justify-center gap-2 font-headline text-sm uppercase tracking-tight"
          >
            <Calendar size={18} />
            Get Quote
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
