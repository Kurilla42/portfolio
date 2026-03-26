"use client";

import { HighlightWipeHeading } from '@/components/HighlightWipeHeading';

const lines = [
  "After 12 years in internet marketing, I found",
  "why so many local service websites",
  "fail to generate calls.",
  "",
  "It’s not the traffic or the budget — it’s",
  "<span class='font-kurale font-bold text-[#c7b684]'>5 costly mistakes</span> web designers make",
  "when they focus on looks instead of",
  "<span class='font-kurale font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#c7b684] to-[#c7b684] inline-block text-[3.1vw]'>conversions</span>"
];

export function ExperienceTextSection() {
  return (
    <div className="w-full flex flex-col items-center justify-center px-6 md:px-[8vw] text-center">
      <div className="w-full md:max-w-[85vw] flex flex-col items-center">
        <HighlightWipeHeading 
          as="p"
          lines={lines}
          className="text-xl sm:text-2xl md:text-[3.0vw] font-medium uppercase leading-[1.3] md:leading-[1.1] text-[#e0ded8] items-center tracking-tighter"
          stagger={0.08}
          triggerOnce={true}
        />
      </div>
    </div>
  );
}
