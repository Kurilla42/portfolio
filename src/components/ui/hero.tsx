
"use client";

import Image from "next/image";
import { motion, useTransform, MotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Figma, MousePointer2 } from "lucide-react";
import { HighlightWipeHeading } from "@/components/HighlightWipeHeading";

interface ShaderShowcaseProps {
  progress?: MotionValue<number>;
}

export default function ShaderShowcase({ progress }: ShaderShowcaseProps) {
  const [greeting, setGreeting] = useState("Good morning!");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) setGreeting("Good afternoon!");
    else if (hour >= 17 || hour < 5) setGreeting("Good evening!");
  }, []);
  
  // Use progress from parent if available, otherwise default to 0
  // Transition between the initial hero image and the experience block background
  const secondImageOpacity = useTransform(progress || new motion.Value(0), [0, 0.8], [0, 1]);

  return (
    <div className="relative min-h-screen bg-transparent font-sans">
      {/* Fixed Background Layer shared with next section */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden">
        {/* Base Hero Image */}
        <Image
          src="https://i.ibb.co/NgDy55vR/Whisk-yiwomrjz2igmijtntcjnkhtl1ejz00cn3ujmtgd-upscayl-2x-upscayl-standard-4x.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        
        {/* Experience Background Image that fades in */}
        <motion.div 
          style={{ opacity: secondImageOpacity }}
          className="absolute inset-0 z-10"
        >
          <Image
            src="https://i.ibb.co/fz8VwXFC/f287897f-0106-4a17-a80c-76b912a016a7-upscayl-2x-upscayl-standard-4x.png"
            alt="Experience Background"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </motion.div>
      </div>

      {/* Screen 1 Content */}
      <div className="relative z-20 w-full h-screen px-[4vw] pt-[4vh] pb-[2vh] flex flex-col justify-between text-white overflow-hidden">
        
        {/* TOP ROW */}
        <div className="grid grid-cols-12 w-full items-start">
          <div className="col-span-4">
            <span className="text-[11px] uppercase tracking-[0.1em] opacity-60 font-sans">{greeting}</span>
          </div>
          <div className="col-span-4 flex justify-center gap-4">
            <span className="text-[11px] uppercase tracking-[0.1em] opacity-40 font-sans">Socials /</span>
            <span className="text-[11px] uppercase tracking-[0.1em] hover:opacity-100 opacity-60 cursor-pointer font-sans">li /</span>
            <span className="text-[11px] uppercase tracking-[0.1em] hover:opacity-100 opacity-60 cursor-pointer font-sans">dr /</span>
            <span className="text-[11px] uppercase tracking-[0.1em] hover:opacity-100 opacity-60 cursor-pointer font-sans">tw</span>
          </div>
          <div className="col-span-4 flex justify-end gap-8">
            <div className="flex gap-4">
              <span className="text-[11px] uppercase tracking-[0.1em] text-white font-sans">Index /</span>
              <span className="text-[11px] uppercase tracking-[0.1em] opacity-60 font-sans">About /</span>
              <span className="text-[11px] uppercase tracking-[0.1em] opacity-60 font-sans">Projects</span>
            </div>
            <span className="text-[11px] uppercase tracking-[0.1em] border-b border-white/40 pb-0.5 cursor-pointer font-sans">Let's talk!</span>
          </div>
        </div>

        {/* MIDDLE SECTION */}
        <div className="grid grid-cols-12 w-full mt-auto mb-0 items-end">
          <div className="col-span-8 flex flex-col">
            <div className="mb-[6vh]">
              <p className="text-[15px] opacity-60 mb-1 font-sans">Hi there! this is</p>
              <h2 className="text-[30px] font-sans font-bold"><span className="text-white">Anton</span> <span className="opacity-40 font-medium">Kolesnikov</span></h2>
            </div>
            
            <HighlightWipeHeading 
              as="h1"
              lines={["LANDING PAGES", "FOR PLUMBING", "CALLS"]}
              className="text-[7.5vw] font-sans font-black leading-[0.8] tracking-normal uppercase w-[110%] -ml-1"
              stagger={0.12}
            />
          </div>

          <div className="col-span-4 flex flex-col pl-[4vw]">
            <div className="space-y-6 mb-[15vh]">
               <div className="h-[1px] w-full bg-white/10" />
               <div className="space-y-2 opacity-60 text-[15px] uppercase tracking-wider font-medium font-sans text-white">
                  <p>Built for service businesses</p>
                  <p>Focused on conversion</p>
                  <p>Made for owners who care about results</p>
               </div>
               <div className="flex items-center justify-between group cursor-pointer pt-4">
                  <span className="text-[13px] uppercase tracking-wider font-sans">How can I help?</span>
                  <span className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
               </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="grid grid-cols-12 w-full items-end">
          <div className="col-span-4" />
          <div className="col-span-4" />
          <div className="col-span-4 pl-[4vw] flex flex-col gap-6">
            <p className="text-[15px] leading-relaxed opacity-60 max-w-[280px] font-sans">
              I'm an award winning product designer specialized in financial products. I work for Fintech, Banking, Crypto & Web3
            </p>
            <div className="flex items-center gap-6 pt-4">
              <span className="text-[10px] uppercase font-bold tracking-widest opacity-40 hover:opacity-100 transition-opacity font-sans">WebFlow</span>
              <Figma size={20} className="opacity-40 hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
                 <MousePointer2 size={18} />
                 <span className="text-[10px] uppercase font-bold tracking-tighter font-sans">Cursor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
