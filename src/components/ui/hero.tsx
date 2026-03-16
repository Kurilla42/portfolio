"use client";

import Image from "next/image";
import { motion, useTransform, MotionValue } from "framer-motion";
import { useEffect, useState } from "react";
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
  
  const experienceImg = "https://i.ibb.co/Y6mmwvG/Whisk-b58d627825337489433466f42b316b9feg.png";

  // Background transition: fade in second image
  const secondImageOpacity = useTransform(progress || new motion.Value(0), [0, 0.4, 0.8], [0, 1, 1]);
  
  // Content transition: fade out Hero text early in the scroll
  const contentOpacity = useTransform(progress || new motion.Value(0), [0, 0.2], [1, 0]);
  
  // Disable pointer events when content is invisible to avoid blocking interactions in the next section
  const pointerEvents = useTransform(progress || new motion.Value(0), (p) => p > 0.2 ? 'none' : 'auto');

  return (
    <div className="relative min-h-screen bg-transparent font-sans">
      {/* Fixed Background Layer */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden">
        {/* Base Hero Image */}
        <Image
          src="https://i.ibb.co/MyTDsBGB/Whisk-cdcdf93c304908096814b506dbaf17a6dr.png"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
          unoptimized
          quality={100}
        />
        
        {/* Experience Background Image */}
        <motion.div 
          style={{ opacity: secondImageOpacity }}
          className="absolute inset-0 z-10"
        >
          <Image
            src={experienceImg}
            alt="Experience Background"
            fill
            className="object-cover"
            priority
            unoptimized
            quality={100}
          />
        </motion.div>
      </div>

      {/* Screen 1 Content */}
      <motion.div 
        style={{ 
          opacity: contentOpacity,
          pointerEvents: pointerEvents as any
        }}
        className="relative z-20 w-full h-screen px-[4vw] pt-[4vh] pb-[2vh] flex flex-col justify-between text-white overflow-hidden"
      >
        
        {/* TOP ROW */}
        <div className="grid grid-cols-12 w-full items-start">
          <div className="col-span-4">
            <span className="text-[0.6vw] uppercase tracking-[0.1em] opacity-60 font-sans">{greeting}</span>
          </div>
          <div className="col-span-4 flex justify-center gap-[1vw]">
            <span className="text-[0.6vw] uppercase tracking-[0.1em] opacity-40 font-sans">Socials /</span>
            <span className="text-[0.6vw] uppercase tracking-[0.1em] hover:opacity-100 opacity-60 cursor-pointer font-sans">li /</span>
            <span className="text-[0.6vw] uppercase tracking-[0.1em] hover:opacity-100 opacity-60 cursor-pointer font-sans">dr /</span>
            <span className="text-[0.6vw] uppercase tracking-[0.1em] hover:opacity-100 opacity-60 cursor-pointer font-sans">tw</span>
          </div>
          <div className="col-span-4 flex justify-end gap-[2vw]">
            <div className="flex gap-[1vw]">
              <span className="text-[0.6vw] uppercase tracking-[0.1em] text-white font-sans">Index /</span>
              <span className="text-[0.6vw] uppercase tracking-[0.1em] opacity-60 font-sans">About /</span>
              <span className="text-[0.6vw] uppercase tracking-[0.1em] opacity-60 font-sans">Projects</span>
            </div>
            <span className="text-[0.6vw] uppercase tracking-[0.1em] border-b border-white/40 pb-0.5 cursor-pointer font-sans">Let's talk!</span>
          </div>
        </div>

        {/* MIDDLE SECTION */}
        <div className="grid grid-cols-12 w-full mt-auto mb-0 items-end">
          <div className="col-span-8 flex flex-col">
            <div className="mb-[6vh]">
              <p className="text-[0.8vw] opacity-60 mb-1 font-sans">Hi there! this is</p>
              <h2 className="text-[1.6vw] font-sans font-bold"><span className="text-white">Anton</span> <span className="opacity-40 font-medium">Kolesnikov</span></h2>
            </div>
            
            <HighlightWipeHeading 
              as="h1"
              lines={["LANDING PAGES", "FOR PLUMBING", "LEADS"]}
              className="heading-lg text-white w-[110%] -ml-1"
              stagger={0.12}
            />
          </div>

          <div className="col-span-4 flex flex-col pl-[4vw]">
            <div className="space-y-[1.5vw] mb-[15vh]">
               <div className="h-[1px] w-full bg-white/10" />
               <div className="space-y-[0.5vw] opacity-60 text-[0.8vw] uppercase tracking-wider font-medium font-sans text-white">
                  <p>Built for service businesses</p>
                  <p>Focused on conversion</p>
                  <p>Made for owners who care about results</p>
               </div>
               <div className="flex items-center justify-between group cursor-pointer pt-[1vw]">
                  <span className="text-[0.7vw] uppercase tracking-wider font-sans">How can I help?</span>
                  <span className="text-[1.2vw] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
               </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="grid grid-cols-12 w-full items-end">
          <div className="col-span-4" />
          <div className="col-span-4" />
          <div className="col-span-4 pl-[4vw] flex flex-col gap-[1.5vw]">
            <p className="text-[0.8vw] leading-relaxed opacity-60 max-w-[15vw] font-sans">
              I'm an award winning product designer specialized in financial products. I work for Fintech, Banking, Crypto & Web3
            </p>
            <div className="flex items-center gap-[1.5vw] pt-[1vw]">
              <span className="text-[0.5vw] uppercase font-bold tracking-widest opacity-40 hover:opacity-100 transition-opacity font-sans">WebFlow</span>
              <Figma size={20} className="opacity-40 hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-[0.2vw] opacity-40 hover:opacity-100 transition-opacity">
                 <MousePointer2 size={18} />
                 <span className="text-[0.5vw] uppercase font-bold tracking-tighter font-sans">Cursor</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
