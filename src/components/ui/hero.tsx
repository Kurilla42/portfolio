
"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Figma, MousePointer2 } from "lucide-react";

export default function ShaderShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [greeting, setGreeting] = useState("Good morning!");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) setGreeting("Good afternoon!");
    else if (hour >= 17 || hour < 5) setGreeting("Good evening!");
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Transition background to #97b0ad starting from 50% scroll
  const bgOpacity = useTransform(smoothProgress, [0.5, 0.95], [0, 1]);

  return (
    <div ref={containerRef} className="relative min-h-[200vh] bg-transparent font-sans">
      {/* Background Layer */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden">
        <Image
          src="https://i.ibb.co/NgDy55vR/Whisk-yiwomrjz2igmijtntcjnkhtl1ejz00cn3ujmtgd-upscayl-2x-upscayl-standard-4x.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* The transition overlay to #97b0ad */}
        <motion.div 
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 z-10 bg-[#97b0ad]" 
        />
        {/* Subtle base static overlay */}
        <div className="absolute inset-0 z-0 bg-black/20" />
      </div>

      {/* Screen 1: Reference-matched Layout */}
      <div className="relative z-20 w-full h-screen px-[4vw] pt-[4vh] pb-[6vh] flex flex-col justify-between text-white overflow-hidden">
        
        {/* TOP ROW */}
        <div className="grid grid-cols-12 w-full items-start">
          <div className="col-span-4">
            <span className="text-[11px] uppercase tracking-[0.1em] opacity-60">{greeting}</span>
          </div>
          <div className="col-span-4 flex justify-center gap-4">
            <span className="text-[11px] uppercase tracking-[0.1em] opacity-40">Socials /</span>
            <span className="text-[11px] uppercase tracking-[0.1em] hover:opacity-100 opacity-60 cursor-pointer">li /</span>
            <span className="text-[11px] uppercase tracking-[0.1em] hover:opacity-100 opacity-60 cursor-pointer">dr /</span>
            <span className="text-[11px] uppercase tracking-[0.1em] hover:opacity-100 opacity-60 cursor-pointer">tw</span>
          </div>
          <div className="col-span-4 flex justify-end gap-8">
            <div className="flex gap-4">
              <span className="text-[11px] uppercase tracking-[0.1em] text-white">Index /</span>
              <span className="text-[11px] uppercase tracking-[0.1em] opacity-60">About /</span>
              <span className="text-[11px] uppercase tracking-[0.1em] opacity-60">Projects</span>
            </div>
            <span className="text-[11px] uppercase tracking-[0.1em] border-b border-white/40 pb-0.5 cursor-pointer">Let's talk!</span>
          </div>
        </div>

        {/* MIDDLE SECTION */}
        <div className="grid grid-cols-12 w-full mt-auto mb-[8vh] items-end">
          {/* Main Info Area */}
          <div className="col-span-8 flex flex-col">
            <div className="mb-[6vh]">
              <p className="text-[12px] opacity-60 mb-1">Hi there! this is</p>
              <h2 className="text-[24px] font-bold"><span className="text-white">Anton</span> <span className="opacity-40 font-medium">Kolesnikov</span></h2>
            </div>
            
            <h1 className="text-[9.5vw] font-black leading-[0.8] tracking-[-0.05em] uppercase w-[110%] -ml-1">
              Landing Pages<br />
              For Plumbing<br />
              <span className="text-accent">Calls</span>
            </h1>
          </div>

          {/* Right Side Info Area */}
          <div className="col-span-4 flex flex-col pl-[4vw]">
            <div className="space-y-6 mb-[15vh]">
               <div className="h-[1px] w-full bg-white/10" />
               <div className="space-y-2 opacity-60 text-[13px] uppercase tracking-wider font-medium">
                  <p>Built for service businesses</p>
                  <p>Focused on conversion</p>
                  <p>Made for owners who care about results</p>
               </div>
               <div className="flex items-center justify-between group cursor-pointer pt-4">
                  <span className="text-[13px] uppercase tracking-wider">How can I help?</span>
                  <span className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
               </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="grid grid-cols-12 w-full items-end">
          <div className="col-span-4">
            <span className="text-[10px] uppercase tracking-[0.2em] opacity-40">(Scroll down)</span>
          </div>
          <div className="col-span-4" />
          <div className="col-span-4 pl-[4vw] flex flex-col gap-6">
            <p className="text-[12px] leading-relaxed opacity-60 max-w-[280px]">
              I'm an award winning product designer specialized in financial products. I work for Fintech, Banking, Crypto & Web3
            </p>
            <div className="flex items-center gap-6 pt-4">
              {/* Webflow Minimalist Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="opacity-40 hover:opacity-100 transition-opacity">
                <path d="M22.56 5.86h-3.41l-1.89 6.84-1.89-6.84h-3.41l-1.89 6.84-1.89-6.84H4.77l-1.89 6.84L1 5.86h-1v12.28h3.32l1.89-6.84 1.89 6.84h3.41l1.89-6.84 1.89 6.84h3.32l1.89-6.84 1.89 6.84H23V5.86h-.44z"/>
              </svg>
              {/* Figma */}
              <Figma size={20} className="opacity-40 hover:opacity-100 transition-opacity" />
              {/* Cursor Icon */}
              <div className="flex items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
                 <MousePointer2 size={18} />
                 <span className="text-[10px] uppercase font-bold tracking-tighter">Cursor</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy Section Intro (Visible during scroll) */}
      <div className="h-screen flex flex-col justify-center px-[6vw]">
        {/* This stays empty to allow the background transition to be the focus during the second 100vh of scroll */}
      </div>
    </div>
  );
}
