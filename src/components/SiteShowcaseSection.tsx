"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export function SiteShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const containersEntryY = useTransform(scrollYProgress, [0, 0.95], ["100vh", "0vh"]);
  const containersEntryOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  
  const centralImageOpacity = useTransform(scrollYProgress, [0, 0.35, 0.6], [1, 1, 0]);
  const centralTextOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);
  const centralScale = useTransform(scrollYProgress, [0, 0.6], [0.8, 1]);

  const leftImg = "https://i.ibb.co/xqqg1DhS/Computer-monitor-on-202603301741.jpg";
  const rightImg = "https://i.ibb.co/bgFv3GL7/202603310107.jpg";

  const ShowcaseCard = ({ src, label, subLabel }: { src: string, label: string, subLabel: string }) => (
    <div className="relative flex flex-col justify-center items-center h-[40vh] md:h-full text-center">
      <motion.div 
        style={{ opacity: textOpacity }}
        className="absolute text-2xl sm:text-3xl md:text-[4.5vw] font-headline font-black uppercase text-[#e0ded8] z-20 pointer-events-none leading-none tracking-normal whitespace-nowrap"
      >
        {label}
      </motion.div>
      
      <motion.div 
        style={{ y: containersEntryY, opacity: containersEntryOpacity }}
        className="relative flex flex-col items-start z-10"
      >
        <motion.div 
          whileHover="hover"
          initial="initial"
          className="relative w-[76.5vw] md:w-[37.8vw] aspect-[4/3] bg-transparent rounded-none overflow-hidden cursor-pointer group"
        >
          <motion.div
            variants={{
              hover: { scale: 1.05 }
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full relative flex flex-col"
          >
            <Image 
              src={src} 
              alt="Case Study" 
              width={1600}
              height={1200}
              className="w-full h-full object-contain"
              unoptimized
            />
          </motion.div>

          <motion.div
            variants={{
              initial: { y: "-120%", x: "-50%", opacity: 0 },
              hover: { y: "-50%", x: "-50%", opacity: 1 }
            }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-1/2 left-1/2 w-[60%] h-[60%] z-30 pointer-events-none overflow-hidden"
          >
            <div className="relative w-full h-full border border-[#e0ded8]/20 bg-[#0f0f0f]/20 flex flex-col shadow-2xl shadow-black/50">
              <Image 
                src={src} 
                alt="Case Study Preview" 
                width={1600}
                height={1200}
                className="w-full h-full object-contain"
                unoptimized
              />
            </div>
          </motion.div>
          
          <motion.div 
            variants={{
              initial: { opacity: 0 },
              hover: { opacity: 0.2 }
            }}
            className="absolute inset-0 bg-[#0f0f0f] z-20 pointer-events-none"
          />
        </motion.div>
        
        <div className="flex flex-col mt-4">
          <span className="text-[1vw] text-[#e0ded8]/40 uppercase font-mono tracking-widest">
            {subLabel}
          </span>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div ref={containerRef} className="relative h-[180vh] z-10 bg-[#0f0f0f]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="w-full h-full flex items-center justify-center relative">
          
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none px-6">
            <div className="relative flex items-center justify-center">
              
              <motion.div 
                style={{ 
                  opacity: centralImageOpacity, 
                  scale: centralScale,
                }}
                className="absolute z-10 w-[13.52vw] h-[16.9vw]"
              >
                <Image 
                  src="https://i.ibb.co/zWwNcSSf/image.png"
                  alt="Decorative center element"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </motion.div>

              <motion.div 
                style={{ 
                  opacity: centralTextOpacity,
                  scale: centralScale
                }}
                className="font-kurale font-bold text-[3vw] uppercase text-[#c7b684] tracking-normal text-center"
              >
                <div className="flex flex-col items-center leading-[1.0]">
                  {"YOUR SITE".split("").map((char, i) => (
                    <span key={i} className={char === " " ? "h-[0.5em]" : ""}>
                      {char}
                    </span>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>

          <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-[4vw] relative z-10 gap-8 md:gap-[4vw]">
            <ShowcaseCard 
              src={leftImg} 
              label="EXPLORE HOW YOUR" 
              subLabel="template 1"
            />
            <ShowcaseCard 
              src={rightImg} 
              label="SITE CAN LOOK LIKE" 
              subLabel="template 2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
