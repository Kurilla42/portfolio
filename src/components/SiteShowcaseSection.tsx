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

  // Скорость анимации: умеренное ускорение (30% от первоначального)
  const textOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const containersEntryY = useTransform(scrollYProgress, [0, 0.15], ["100vh", "0vh"]);
  const containersEntryOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  
  // Центральные элементы
  const centralImageOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const centralTextOpacity = useTransform(scrollYProgress, [0.15, 0.22], [0, 1]);
  const centralScale = useTransform(scrollYProgress, [0, 0.15], [0.7, 1]);

  const leftImg = "https://i.ibb.co/dwF6JyH3/2026-03-23-23-59-45.jpg";
  const rightImg = "https://i.ibb.co/20vdRYyK/2026-03-24-00-00-03.jpg";

  const renderVerticalText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="block leading-[1.1] mb-1">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  const ShowcaseCard = ({ src, label }: { src: string, label: string }) => (
    <div className="relative flex justify-center items-center h-[40vh] md:h-full text-center">
      <motion.div 
        style={{ opacity: textOpacity }}
        className="absolute text-3xl sm:text-4xl md:text-[6vw] font-black uppercase text-white z-20 pointer-events-none leading-[1.1] tracking-tight"
      >
        {label.split("<br />").map((line, i) => (
          <span key={i} className="block">{line}</span>
        ))}
      </motion.div>
      
      <motion.div 
        style={{ y: containersEntryY, opacity: containersEntryOpacity }}
        whileHover="hover"
        initial="initial"
        className="relative w-[85vw] md:w-[42vw] aspect-[16/10] bg-[#1a1a1a] rounded-none overflow-hidden z-10 cursor-pointer group"
      >
        {/* Основное изображение: объект-контейн, чтобы было видно полностью */}
        <motion.div
          variants={{
            hover: { scale: 1.05 }
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full relative"
        >
          <Image 
            src={src} 
            alt="Case Study" 
            fill
            className="object-contain"
            unoptimized
          />
        </motion.div>

        {/* Мини-изображение, выезжающее сверху в центр при ховере */}
        <motion.div
          variants={{
            initial: { y: "-120%", x: "-50%", opacity: 0 },
            hover: { y: "-50%", x: "-50%", opacity: 1 }
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-1/2 left-1/2 w-[50%] h-[50%] z-30 pointer-events-none"
        >
          <div className="relative w-full h-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] border border-white/10">
            <Image 
              src={src} 
              alt="Case Study Preview" 
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </motion.div>
        
        {/* Затемняющий оверлей при ховере для акцента на миниатюре */}
        <motion.div 
          variants={{
            initial: { opacity: 0 },
            hover: { opacity: 0.4 }
          }}
          className="absolute inset-0 bg-black z-20 pointer-events-none"
        />
      </motion.div>
    </div>
  );

  return (
    <div ref={containerRef} className="relative h-[200vh] z-10">
      {/* Статичный фон */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://i.ibb.co/Y7Rzv80G/1.jpg"
          alt="Showcase Background"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="w-full h-full flex items-center justify-center relative">
          
          {/* Центральные элементы */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none px-6">
            <div className="relative flex items-center justify-center">
              
              {/* Декоративная иконка (уменьшена на 30% от 8vw) */}
              <motion.div 
                style={{ 
                  opacity: centralImageOpacity, 
                  scale: centralScale,
                }}
                className="absolute z-10 w-[5.6vw] h-[7vw]"
              >
                <Image 
                  src="https://i.ibb.co/JR9GrQfJ/image.png"
                  alt="Decorative center element"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </motion.div>

              {/* Вертикальный текст */}
              <motion.div 
                style={{ 
                  opacity: centralTextOpacity,
                  scale: centralScale
                }}
                className="flex flex-col items-center font-sans font-black text-4xl sm:text-6xl md:text-[3vw] uppercase text-white leading-none"
              >
                <div className="flex flex-col items-center">
                  {renderVerticalText("YOUR SITE")}
                </div>
              </motion.div>

            </div>
          </div>

          {/* Сцена с кейсами */}
          <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-[4vw] relative z-10 gap-8 md:gap-[4vw]">
            <ShowcaseCard src={leftImg} label="EXPLORE<br />HOW YOUR" />
            <ShowcaseCard src={rightImg} label="SITE CAN<br />LOOK LIKE" />
          </div>
        </div>
      </div>
    </div>
  );
}
