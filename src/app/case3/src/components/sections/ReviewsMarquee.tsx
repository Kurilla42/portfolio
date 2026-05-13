'use client';

import React from 'react';
import { REVIEWS } from '@/lib/data';

export const ReviewsMarquee = () => {
  return (
    <section id="testimonials" className="py-24 bg-background overflow-hidden border-t border-black">
      <div className="container mx-auto px-4 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <p className="font-body text-[12px] uppercase tracking-[0.12em] font-semibold text-graphite">
              09 / REVIEWS
            </p>
            <h2 className="text-ink font-extrabold leading-[1.02] tracking-[-0.015em] uppercase m-0" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
              Twin Cities homeowners <br />
              say this stuff.
            </h2>
            <p className="font-body text-[14px] font-medium text-graphite uppercase tracking-widest">
              3,412 verified reviews · 4.9 average · all real names
            </p>
          </div>
          <a 
            href="#" 
            className="hidden md:inline-block font-headline text-[14px] font-bold uppercase tracking-[0.05em] text-ink border-2 border-black px-5 py-3 bg-white underline underline-offset-4 hover:bg-black hover:text-white transition-all duration-300"
          >
            READ ALL REVIEWS →
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
        
        {/* Mobile only CTA position */}
        <div className="mt-12 text-center md:hidden">
          <a 
            href="#" 
            className="w-full inline-block font-headline text-[14px] font-bold uppercase tracking-[0.05em] text-ink border-2 border-black px-5 py-4 bg-white underline underline-offset-4 active:bg-black active:text-white transition-all duration-300"
          >
            READ ALL REVIEWS →
          </a>
        </div>
      </div>
    </section>
  );
};

const ReviewCard = ({ review }: { review: (typeof REVIEWS)[0] }) => {
  return (
    <div className="bg-white border border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between group">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-primary text-[14px]">★</span>
            ))}
          </div>
          <span className="font-code text-[10px] uppercase font-black text-muted-foreground/60 tracking-widest">
            GOOGLE — {review.date}
          </span>
        </div>

        <p className="font-body text-[18px] text-ink leading-[1.5] italic">
          "{review.text}"
        </p>
      </div>
      
      <div className="mt-10 pt-6 border-t border-black/10">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-headline text-[15px] font-bold uppercase m-0 leading-none mb-1">
              — {review.author}
            </h4>
            <p className="font-body text-[12px] font-medium text-graphite leading-none uppercase tracking-wide">
              {review.meta}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
