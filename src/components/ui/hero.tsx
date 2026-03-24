
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Figma, MousePointer2 } from "lucide-react";
import { HighlightWipeHeading } from "@/components/HighlightWipeHeading";

export default function ShaderShowcase() {
  const [greeting, setGreeting] = useState("Good morning!");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) setGreeting("Good afternoon!");
    else if (hour >= 17 || hour < 5) setGreeting("Good evening!");
  }, []);
  
  return (
    <div className="relative h-screen w-full font-sans overflow-hidden bg-transparent">
      {/* Hero Content */}
      <div className="relative z-10 w-full h-full px-6 md:px-[4vw] pt-6 md:pt-[4vh] pb-8 md:pb-[2vh] flex flex-col justify-between text-white">
        
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
          <div className="col-span-12 md:col-span-4 flex justify-end gap-[4vw] md:gap-[2vw]">
            <div className="flex gap-[2vw] md:gap-[1vw]">
              <span className="text-[10px] md:text-[0.7vw] uppercase tracking-[0.1em] text-white font-sans">Index /</span>
              <span className="text-[10px] md:text-[0.7vw] uppercase tracking-[0.1em] opacity-60 font-sans">About /</span>
            </div>
            <span className="text-[10px] md:text-[0.7vw] uppercase tracking-[0.1em] border-b border-white/40 pb-0.5 cursor-pointer font-sans">Let's talk!</span>
          </div>
        </div>

        {/* BOTTOM AREA (COMBINED) */}
        <div className="grid grid-cols-12 w-full mt-auto items-end gap-10 md:gap-0">
          {/* Main Heading & Identity */}
          <div className="col-span-12 md:col-span-8 flex flex-col">
            <div className="mb-4 md:mb-[3vh]">
              <p className="text-[3.5vw] md:text-[1vw] opacity-60 mb-1 font-sans">Hi there! this is</p>
              <h2 className="text-[8vw] md:text-[3vw] font-sans font-bold leading-tight tracking-tighter">
                <span className="text-white">Anton</span> <span className="opacity-40 font-medium">Kolesnikov</span>
              </h2>
            </div>
            
            <HighlightWipeHeading 
              as="h1"
              lines={["LANDING PAGES", "FOR PLUMBING", "LEADS"]}
              className="text-4xl sm:text-5xl md:text-[6vw] font-headline text-white w-full md:w-[110%] -ml-0 md:-ml-1 tracking-tight leading-[0.9]"
              stagger={0.12}
            />
          </div>

          {/* Bio & Links */}
          <div className="col-span-12 md:col-span-4 md:pl-[4vw] flex flex-col gap-4 md:gap-[1.5vw] pb-1">
            <div className="space-y-2 md:space-y-[0.6vw] text-[3.5vw] md:text-[1vw] uppercase tracking-wider font-medium font-sans text-white/60 mb-2">
              <p>Built for service businesses</p>
              <p>Focused on conversion</p>
            </div>

            <p className="text-xs md:text-[1vw] leading-relaxed opacity-60 max-w-full md:max-w-[18vw] font-sans">
              I'm an award winning product designer specialized in lead generation for local home service businesses.
            </p>
            
            <div className="flex items-center gap-6 md:gap-[1.5vw] pt-2 md:pt-0">
              <span className="text-[10px] md:text-[0.7vw] uppercase font-bold tracking-widest opacity-40 hover:opacity-100 transition-opacity font-sans">WebFlow</span>
              <Figma className="w-[18px] md:w-[1.2vw] h-[18px] md:h-[1.2vw] opacity-40 hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
                 <MousePointer2 className="w-[16px] md:w-[1.1vw] h-[16px] md:h-[1.1vw]" />
                 <span className="text-[10px] md:text-[0.7vw] uppercase font-bold tracking-tighter font-sans">Cursor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
