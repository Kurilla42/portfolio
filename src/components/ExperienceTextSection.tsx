"use client";

import { HighlightWipeHeading } from '@/components/HighlightWipeHeading';

const lines = [
  "After 12 years of internet marketing and studying",
  "hundreds of local service websites, I noticed",
  "a pattern: the same mistakes showed up again",
  "and again. Pages that looked professional",
  "but generated almost no calls.",
  "",
  "The problem wasn't traffic. It wasn't the budget.",
  "It was <span class='font-kurale font-bold'>5 specific things</span> that most web designers",
  "simply don't think about — because they",
  "think like designers, <span class='font-kurale font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#b68d4d] to-[#c99b5d] inline-block text-[1.1vw]'>not marketers</span>"
];

export function ExperienceTextSection() {
  return (
    <div className="w-full flex flex-col items-center justify-center px-6 md:px-[8vw] text-center">
      <div className="w-full md:max-w-[85vw] flex flex-col items-center">
        <HighlightWipeHeading 
          as="p"
          lines={lines}
          className="text-xl sm:text-2xl md:text-[3.0vw] font-medium uppercase leading-[1.3] md:leading-[1.1] text-white items-center tracking-tighter"
          stagger={0.08}
          triggerOnce={true}
        />
      </div>
    </div>
  );
}
