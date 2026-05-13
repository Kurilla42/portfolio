"use client";

import React from 'react';
import { useExitIntent } from '@/hooks/use-exit-intent';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useContactModal } from '@/context/contact-modal-context';
import { Zap } from 'lucide-react';

export const ExitIntentModal = () => {
  const { isExiting, reset } = useExitIntent();
  const { openModal } = useContactModal();

  const handleClaim = () => {
    reset();
    openModal({ message: "Claiming $25 exit discount" });
  };

  return (
    <Dialog open={isExiting} onOpenChange={reset}>
      <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-primary p-12 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full text-primary mb-4 animate-bounce">
            <Zap size={40} fill="currentColor" />
          </div>
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-white font-headline text-4xl uppercase leading-none tracking-tighter">
              Wait! Don't Go Cold.
            </DialogTitle>
            <DialogDescription className="text-white/80 font-body text-xl">
              Get <span className="text-white font-bold underline">$25 OFF</span> your first service call if you book in the next 10 minutes.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 pt-6">
            <Button 
              size="lg" 
              onClick={handleClaim}
              className="h-16 bg-white text-primary font-headline text-xl hover:bg-white/90 rounded-2xl"
            >
              CLAIM MY $25 OFF
            </Button>
            <Button 
              variant="ghost" 
              onClick={reset}
              className="text-white/60 hover:text-white hover:bg-transparent text-sm font-medium"
            >
              No thanks, I'll pay full price
            </Button>
          </div>
        </div>
        <div className="bg-dark p-4 text-center">
          <p className="text-[10px] text-white/40 font-code uppercase tracking-widest">
            * Limited to new customers in the Twin Cities area
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
