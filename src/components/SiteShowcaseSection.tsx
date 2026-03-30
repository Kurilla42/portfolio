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

  // Значительно замедленная анимация входа: расширяем диапазоны скролла
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const containersEntryY = useTransform(scrollYProgress, [0, 0.95], ["100vh", "0vh"]);
  const containersEntryOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  
  // Центральные элементы
  const centralImageOpacity = useTransform(scrollYProgress, [0, 0.35, 0.6], [1, 1, 0]);
  const centralTextOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);
  const centralScale = useTransform(scrollYProgress, [0, 0.6], [0.8, 1]);

  const leftImg = "https://i.ibb.co/sdMw1xpg/2026-03-26-12-52-03.jpg";
  const rightImg = "https://i.ibb.co/jZf5xxMd/2026-03-26-12-51-49.jpg";

  const renderVerticalText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="block leading-[0.6] mb-0.5">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  const ShowcaseCard = ({ src, label, subLabel }: { src: string, label: string, subLabel: string }) => (
    <div className="relative flex flex-col justify-center items-center h-[40vh] md:h-full text-center">
      <motion.div 
        style={{ opacity: textOpacity }}
        className="absolute text-3xl sm:text-4xl md:text-[5vw] font-black uppercase text-[#e0ded8] z-20 pointer-events-none leading-[1.3] md:leading-[1.4] tracking-tight"
      >
        {label.split("<br />").map((line, i) => (
          <span key={i} className="block">{line}</span>
        ))}
      </motion.div>
      
      <motion.div 
        style={{ y: containersEntryY, opacity: containersEntryOpacity }}
        className="relative flex flex-col items-start z-10"
      >
        <motion.div 
          whileHover="hover"
          initial="initial"
          className="relative w-[85vw] md:w-[42vw] aspect-[1920/1080] bg-[#1a1a1a] rounded-none overflow-hidden cursor-pointer group"
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
              width={1920}
              height={1080}
              className="w-full h-auto object-top"
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
            <div className="relative w-full h-full border border-[#e0ded8]/20 bg-black/20 flex flex-col shadow-2xl shadow-black/50">
              <Image 
                src={src} 
                alt="Case Study Preview" 
                width={1920}
                height={1080}
                className="w-full h-auto object-top"
                unoptimized
              />
            </div>
          </motion.div>
          
          <motion.div 
            variants={{
              initial: { opacity: 0 },
              hover: { opacity: 0.2 }
            }}
            className="absolute inset-0 bg-black z-20 pointer-events-none"
          />
        </motion.div>
        
        <span className="mt-4 text-[1vw] text-[#e0ded8]/40 uppercase font-mono tracking-widest">
          {subLabel}
        </span>
      </motion.div>
    </div>
  );

  return (
    <div ref={containerRef} className="relative h-[180vh] z-10">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://i.ibb.co/Y7Rzv80G/1.jpg"
          alt="Showcase Background"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="w-full h-full flex items-center justify-center relative">
          
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none px-6">
            <div className="relative flex items-center justify-center">
              
              <motion.div 
                style={{ 
                  opacity: centralImageOpacity, 
                  scale: centralScale,
                }}
                className="absolute z-10 w-[8vw] h-[10vw]"
              >
                <Image 
                  src="https://i.ibb.co/JR9GrQfJ/image.png"
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
                className="flex flex-col items-center font-kurale font-bold text-xl md:text-[3.0vw] uppercase text-[#c7b684] tracking-tight leading-none"
              >
                <div className="flex flex-col items-center">
                  {renderVerticalText("YOUR SITE")}
                </div>
              </motion.div>

            </div>
          </div>

          <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-[4vw] relative z-10 gap-8 md:gap-[4vw]">
            <ShowcaseCard 
              src={leftImg} 
              label="EXPLORE<br />HOW YOUR" 
              subLabel="template 1"
            />
            <ShowcaseCard 
              src={rightImg} 
              label="SITE CAN<br />LOOK LIKE" 
              subLabel="template 2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
