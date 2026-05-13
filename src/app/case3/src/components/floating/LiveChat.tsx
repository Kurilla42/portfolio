"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContactModal } from '@/context/contact-modal-context';
import { cn } from '@/lib/utils';

const quickReplies = [
  { text: "How fast can you come?", context: "Emergency ETA inquiry" },
  { text: "Water heater price?", context: "Water heater quote request" },
  { text: "Are you open now?", context: "Business hours inquiry" },
];

export const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { openModal } = useContactModal();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setIsVisible(true);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuickReply = (reply: typeof quickReplies[0]) => {
    openModal({ message: reply.context });
    setIsOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="hidden md:flex fixed bottom-8 right-8 z-50 items-center justify-center"
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center group transition-transform hover:scale-110 active:scale-95"
            >
              <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-destructive text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white">
                1
              </div>
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="x" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                    <X size={28} />
                  </motion.div>
                ) : (
                  <motion.div key="msg" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                    <MessageCircle size={28} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            className="hidden md:flex fixed bottom-28 right-8 z-50 w-[350px] bg-white rounded-3xl shadow-2xl border border-black/5 overflow-hidden flex-col"
          >
            {/* Header */}
            <div className="bg-primary p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <User size={20} />
                </div>
                <div>
                  <h4 className="font-headline text-lg uppercase leading-none">Thelen Concierge</h4>
                  <p className="text-[10px] font-code text-white/60 uppercase tracking-widest mt-1">Typical reply: 2 mins</p>
                </div>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-6 space-y-4 bg-muted/10 min-h-[300px]">
              <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-sm font-body border border-black/5 max-w-[85%]">
                Hi! I'm the Thelen assistant. How can we help you stay comfortable today?
              </div>

              <div className="space-y-2 pt-4">
                <p className="text-[10px] font-code uppercase text-muted-foreground font-black px-2">Quick Inquiries</p>
                {quickReplies.map((reply) => (
                  <button
                    key={reply.text}
                    onClick={() => handleQuickReply(reply)}
                    className="w-full text-left p-4 bg-white hover:bg-primary hover:text-white rounded-xl text-sm font-medium transition-colors border border-black/5 shadow-sm"
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t flex gap-2">
              <input 
                type="text" 
                placeholder="Type a message..."
                className="flex-1 bg-muted/30 border-none rounded-xl px-4 text-sm focus:ring-2 focus:ring-primary outline-none"
                onKeyDown={(e) => e.key === 'Enter' && openModal()}
              />
              <button 
                onClick={() => openModal()}
                className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/90 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};