"use client";

import { HighlightWipeHeading } from '@/components/HighlightWipeHeading';

const part1 = [
  "After 12 years in internet marketing, I found",
  "why so many local service websites",
  "fail to generate calls"
];

const part2 = [
  "It’s not the traffic or the budget — it’s",
  "<span class='font-kurale font-bold text-[#c7b684] text-[3.1vw]'>5 costly mistakes</span> web designers make",
  "when they focus on looks instead of",
  "<span class='font-kurale font-bold text-[#c7b684] text-[3.1vw]'>conversions</span>"
];

export function ExperienceTextSection() {
  return (
    <div className="w-full flex flex-col items-center justify-center px-6 md:px-[8vw]">
      <div className="w-full md:max-w-[85vw] flex flex-col gap-12 md:gap-16">
        {/* Top / Left Part */}
        <div className="w-full flex justify-start">
          <HighlightWipeHeading 
            as="p"
            lines={part1}
            className="text-xl sm:text-2xl md:text-[3vw] font-medium uppercase leading-[1.3] md:leading-[1.1] text-[#e0ded8] items-start text-left tracking-tighter"
            stagger={0.08}
            triggerOnce={true}
          />
        </div>

        {/* Bottom / Right Part */}
        <div className="w-full flex justify-end">
          <HighlightWipeHeading 
            as="p"
            lines={part2}
            className="text-xl sm:text-2xl md:text-[3vw] font-medium uppercase leading-[1.3] md:leading-[1.1] text-[#e0ded8] items-end text-right tracking-tighter"
            stagger={0.08}
            triggerOnce={true}
            delay={0.4}
          />
        </div>
      </div>
    </div>
  );
}
