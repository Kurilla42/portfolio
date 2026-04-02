"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Figma, MousePointer2 } from "lucide-react";
import { HighlightWipeHeading } from "@/components/HighlightWipeHeading";

interface ShaderShowcaseProps {
  isLifted?: boolean;
}

export default function ShaderShowcase({ isLifted }: ShaderShowcaseProps) {
  const [greeting, setGreeting] = useState("Good morning!");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) setGreeting("Good afternoon!");
    else if (hour >= 17 || hour < 5) setGreeting("Good evening!");
  }, []);
  
  return (
    <div className="relative h-screen w-full font-sans overflow-hidden bg-transparent">
      {/* Hero Content */}
      <div className="relative z-10 w-full h-full px-6 md:px-[4vw] pt-6 md:pt-[4vh] pb-8 md:pb-[4vh] flex flex-col justify-between text-[#e0ded8]">
        
        {/* TOP ROW */}
        <div className="grid grid-cols-12 w-full items-start gap-4">
          <div className="col-span-12 md:col-span-4 flex justify-between md:block">
            <span className="text-[10px] md:text-[0.7vw] uppercase tracking-[0.1em] opacity-60 font-sans">{greeting}</span>
            <div className="flex md:hidden gap-4">
               <span className="text-[10px] uppercase tracking-[0.1em] opacity-60 font-sans">li</span>
               <span className="text-[10px] uppercase tracking-[0.1em] opacity-60 font-sans">dr</span>
            </div>
          </div>
          <div className="col-span-4 hidden md:flex justify-center gap-[1vw]">
            <span className="md:text-[0.7vw] uppercase tracking-[0.1em] opacity-40 font-sans">Socials /</span>
            <span className="md:text-[0.7vw] uppercase tracking-[0.1em] hover:opacity-100 opacity-60 cursor-pointer font-sans">li /</span>
            <span className="md:text-[0.7vw] uppercase tracking-[0.1em] hover:opacity-100 opacity-60 cursor-pointer font-sans">dr /</span>
            <span className="md:text-[0.7vw] uppercase tracking-[0.1em] hover:opacity-100 opacity-60 cursor-pointer font-sans">tw</span>
          </div>
          <div className="col-span-12 md:col-span-4 flex justify-end gap-2 sm:gap-[4vw] md:gap-[2vw]">
            <div className="flex gap-2 sm:gap-[2vw] md:gap-[1vw]">
              <span className="text-[10px] md:text-[0.7vw] uppercase tracking-[0.1em] text-[#e0ded8] font-sans">Index /</span>
              <span className="text-[10px] md:text-[0.7vw] uppercase tracking-[0.1em] opacity-60 font-sans">About /</span>
            </div>
            <span className="text-[10px] md:text-[0.7vw] uppercase tracking-[0.1em] border-b border-[#e0ded8]/40 pb-0.5 cursor-pointer font-sans">Let's talk!</span>
          </div>
        </div>

        {/* BOTTOM AREA */}
        <div className="w-full mt-auto flex flex-col">
          
          {/* Identity Section */}
          <div className="grid grid-cols-12 w-full gap-4 md:gap-0 mb-6 md:mb-[2vh]">
            <div className="col-span-12 flex flex-col">
              <p className="text-[3.5vw] md:text-[1vw] opacity-60 mb-1 font-sans">Hi there! this is</p>
              <h2 className="text-[8vw] md:text-[3vw] font-sans font-bold leading-tight tracking-tighter">
                <span className="text-[#e0ded8]">Anton</span> <span className="opacity-40 font-medium">Kolesnikov</span>
              </h2>
            </div>
          </div>

          {/* Main Heading & Manifesto Section */}
          <div className="grid grid-cols-12 w-full items-start gap-4 md:gap-0">
            {/* Left Column: Heading - Proportional VW for Mobile */}
            <div className="col-span-12 md:col-span-8">
              <HighlightWipeHeading 
                as="h1"
                lines={["LANDING PAGES", "FOR PLUMBING", "LEADS"]}
                className="text-[12vw] md:text-[6vw] font-headline text-[#e0ded8] w-full md:w-[110%] -ml-0 md:-ml-1 tracking-tight leading-[0.9]"
                stagger={0.12}
                trigger={isLifted}
                delay={0.6}
              />
            </div>

            {/* Right Column: Manifesto and Icons */}
            <div className="col-span-12 md:col-span-4 md:pl-[4vw] flex flex-col pt-1.5 md:pt-[0.5vw]">
              {/* Divider Line */}
              <div className="w-full h-[1px] bg-[#e0ded8]/20 mb-4 md:mb-[1.5vw]" />
              
              {/* Manifesto Text - Sized to match step points */}
              <div className="space-y-1 md:space-y-[0.3vw] text-[4.5vw] md:text-[1vw] uppercase tracking-wider font-medium font-mono text-[#e0ded8]/60 mb-8 md:mb-[3vw]">
                <p>Built for service businesses</p>
                <p className="text-left">Focused on conversion</p>
                <p>Made for owners who care about results</p>
              </div>

              {/* Links & Icons */}
              <div className="flex items-center justify-between md:justify-start gap-4 md:gap-[2.5vw] mt-auto">
                <span className="text-[11px] md:text-[0.91vw] uppercase font-bold tracking-widest opacity-40 hover:opacity-100 transition-opacity font-sans">WebFlow</span>
                <Figma className="w-[20px] md:w-[1.56vw] h-[20px] md:h-[1.56vw] opacity-40 hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
                   <MousePointer2 className="w-[18px] md:w-[1.43vw] h-[18px] md:h-[1.43vw]" />
                   <span className="text-[11px] md:text-[0.91vw] uppercase font-bold tracking-tighter font-sans">Cursor</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
