
"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';

export function SiteShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Увеличиваем высоту контейнера, чтобы хватило места на входную анимацию и внутренний скролл
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  // ЭТАП 1: Вход (ускорено на 60% относительно базовых значений)
  // Контейнеры и текст теперь появляются/исчезают в самом начале скролла (до 0.12-0.14)
  const textOpacity = useTransform(smoothProgress, [0, 0.04], [1, 0]);
  const containersEntryY = useTransform(smoothProgress, [0, 0.08], ["100vh", "0vh"]);
  const containersEntryOpacity = useTransform(smoothProgress, [0, 0.06], [0, 1]);
  
  // Центральные элементы
  const centralImageOpacity = useTransform(smoothProgress, [0, 0.07, 0.1], [1, 1, 0]);
  const centralTextOpacity = useTransform(smoothProgress, [0.09, 0.13], [0, 1]);
  const centralScale = useTransform(smoothProgress, [0, 0.08], [0.8, 1]);

  // ЭТАП 2: Внутренний скролл изображений (начинается очень рано - с 0.14)
  // При высоте h-[600%] (6x контейнера), чтобы дойти до низа, нужно сместить на 5/6 высоты.
  // 5 / 6 = 0.8333... или -83.33%
  const innerImageScroll = useTransform(smoothProgress, [0.14, 0.95], ["0%", "-83.33%"]);

  const caseStudyImg = "https://i.ibb.co/hFSrMwz5/1.jpg";

  const renderVerticalText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="block leading-[1.1] mb-1">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className="relative h-[800vh] z-10">
      {/* Background Image */}
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
          
          {/* Central Background Elements */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none px-6">
            <div className="relative flex items-center justify-center">
              
              {/* Central decorative image - Уменьшена на 30% */}
              <motion.div 
                style={{ 
                  opacity: centralImageOpacity, 
                  scale: centralScale,
                }}
                className="absolute z-10 w-[11.7vw] h-[14.7vw] md:w-[11.7vw] md:h-[14.7vw]"
              >
                <Image 
                  src="https://i.ibb.co/JR9GrQfJ/image.png"
                  alt="Decorative center element"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </motion.div>

              {/* Vertical Text Revealed after icon fades */}
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

          {/* Main Stage: Case Study Containers */}
          <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-[4vw] relative z-10 gap-8 md:gap-[4vw]">
            
            {/* Left Case Container */}
            <div className="relative flex justify-center items-center h-[40vh] md:h-full text-center">
              <motion.div 
                style={{ opacity: textOpacity }}
                className="absolute text-3xl sm:text-4xl md:text-[6vw] font-black uppercase text-white z-20 pointer-events-none leading-[1.1] tracking-tight"
              >
                EXPLORE<br />HOW YOUR
              </motion.div>
              
              <motion.div 
                style={{ y: containersEntryY, opacity: containersEntryOpacity }}
                className="relative w-[85vw] md:w-[42vw] aspect-[16/10] bg-[#1a1a1a] rounded-none overflow-hidden z-10 border border-white/5"
              >
                <motion.div 
                  style={{ y: innerImageScroll }}
                  className="relative w-full h-[600%]"
                >
                  <Image 
                    src={caseStudyImg} 
                    alt="Case Study Left" 
                    fill 
                    className="object-cover object-top" 
                    priority 
                    unoptimized
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Right Case Container */}
            <div className="relative flex justify-center items-center h-[40vh] md:h-full text-center">
              <motion.div 
                style={{ opacity: textOpacity }}
                className="absolute text-3xl sm:text-4xl md:text-[6vw] font-black uppercase text-white z-20 pointer-events-none leading-[1.1] tracking-tight"
              >
                SITE CAN<br />LOOK LIKE
              </motion.div>
              
              <motion.div 
                style={{ y: containersEntryY, opacity: containersEntryOpacity }}
                className="relative w-[85vw] md:w-[42vw] aspect-[16/10] bg-[#1a1a1a] rounded-none overflow-hidden z-10 border border-white/5"
              >
                <motion.div 
                  style={{ y: innerImageScroll }}
                  className="relative w-full h-[600%]"
                >
                  <Image 
                    src={caseStudyImg} 
                    alt="Case Study Right" 
                    fill 
                    className="object-cover object-top" 
                    priority 
                    unoptimized
                  />
                </motion.div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
