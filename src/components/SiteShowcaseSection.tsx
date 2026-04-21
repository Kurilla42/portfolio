
"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const cases = [
  {
    id: "01",
    title: "RESIDENTIAL MASTERPIECE",
    description: "COMPLETE BATHROOM OVERHAUL FOR A HISTORIC HOME IN BROOKLYN. MODERN FIXTURES MEET CLASSIC AESTHETICS.",
    image: "https://i.ibb.co/xqqg1DhS/Computer-monitor-on-202603301741.jpg",
    layout: "left"
  },
  {
    id: "02",
    title: "COMMERCIAL INFRASTRUCTURE",
    description: "EFFICIENCY-DRIVEN PLUMBING SYSTEMS FOR A NEW TECH HUB. 24/7 RELIABILITY FOR CRITICAL OPERATIONS.",
    image: "https://i.ibb.co/bgFv3GL7/202603310107.jpg",
    layout: "right"
  },
  {
    id: "03",
    title: "EMERGENCY RESPONSE HUB",
    description: "RAPID DEPLOYMENT SYSTEM FOR COMMERCIAL LEAK DETECTION. MINIMIZED DOWNTIME BY 40% FOR OUR KEY CLIENT.",
    image: "https://i.ibb.co/LDgsQj1v/Whisk-yiomrjz2igmijtntcjnkhtl1ejz00cn3ujmtgd.jpg",
    layout: "left"
  }
];

export function SiteShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Анимация начального текста и декоративного элемента
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const centralIconOpacity = useTransform(scrollYProgress, [0, 0.15, 0.4], [1, 1, 0]);
  const centralScale = useTransform(scrollYProgress, [0, 0.4], [0.8, 1]);

  // Тайминги для появления кейсов
  const case1Y = useTransform(scrollYProgress, [0.15, 0.35], ["100vh", "0vh"]);
  const case1Opacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);

  const case2Y = useTransform(scrollYProgress, [0.4, 0.6], ["100vh", "0vh"]);
  const case2Opacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);

  const case3Y = useTransform(scrollYProgress, [0.65, 0.85], ["100vh", "0vh"]);
  const case3Opacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);

  const caseTransforms = [
    { y: case1Y, opacity: case1Opacity },
    { y: case2Y, opacity: case2Opacity },
    { y: case3Y, opacity: case3Opacity }
  ];

  return (
    <div ref={containerRef} className="relative h-[400vh] z-10 bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Разделенный начальный текст */}
        <motion.div 
          style={{ opacity: headingOpacity }}
          className="absolute inset-0 z-20 flex items-center justify-between pointer-events-none px-[15%]"
        >
          <h2 className="text-[8vw] md:text-[3.5vw] font-headline font-black uppercase text-[#e0ded8] leading-[0.9] tracking-tight w-[40%] md:w-[35%]">
            EXPLORE HOW YOUR
          </h2>
          <h2 className="text-[8vw] md:text-[3.5vw] font-headline font-black uppercase text-[#e0ded8] leading-[0.9] tracking-tight w-[40%] md:w-[35%] text-right">
            SITE CAN LOOK LIKE
          </h2>
        </motion.div>

        {/* Центральная декоративная иконка */}
        <motion.div 
          style={{ 
            opacity: centralIconOpacity, 
            scale: centralScale,
          }}
          className="absolute z-10 w-[54vw] md:w-[13.52vw] h-[68vw] md:h-[16.9vw]"
        >
          <Image 
            src="https://i.ibb.co/zWwNcSSf/image.png"
            alt="Decorative icon"
            fill
            className="object-contain"
            unoptimized
          />
        </motion.div>

        {/* Контейнер для кейсов "лесенкой" */}
        <div className="relative w-full h-full max-w-[92vw] mx-auto flex flex-col justify-center py-[5vh]">
          {/* Верхняя линия (по аналогии с блоком шагов) */}
          <motion.div 
            style={{ opacity: case1Opacity }}
            className="w-full h-[1px] bg-[#e0ded8]/20"
          />
          
          {cases.map((item, idx) => (
            <motion.div
              key={item.id}
              style={{ 
                y: caseTransforms[idx].y, 
                opacity: caseTransforms[idx].opacity 
              }}
              className="relative w-full h-[25vh] md:h-[22vh] flex items-center will-change-transform border-b border-[#e0ded8]/20"
            >
              <div className="flex w-full h-full items-center justify-between">
                
                {item.layout === 'left' ? (
                  <>
                    {/* Картинка Слева */}
                    <div className="w-[42%] md:w-[35%] h-full relative overflow-hidden">
                      <Image 
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    {/* Пустое пространство в центре */}
                    <div className="flex-1" />
                    {/* Описание Справа */}
                    <div className="w-[42%] md:w-[35%] flex flex-col justify-center">
                      <h3 className="text-[4vw] md:text-[2vw] font-mono font-bold text-[#e0ded8] uppercase tracking-tight mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[2.5vw] md:text-[1vw] font-mono font-bold leading-tight text-[#e0ded8] uppercase tracking-[0.1em]">
                        {item.description}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Описание Слева */}
                    <div className="w-[42%] md:w-[35%] flex flex-col justify-center text-right">
                      <h3 className="text-[4vw] md:text-[2vw] font-mono font-bold text-[#e0ded8] uppercase tracking-tight mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[2.5vw] md:text-[1vw] font-mono font-bold leading-tight text-[#e0ded8] uppercase tracking-[0.1em]">
                        {item.description}
                      </p>
                    </div>
                    {/* Пустое пространство в центре */}
                    <div className="flex-1" />
                    {/* Картинка Справа */}
                    <div className="w-[42%] md:w-[35%] h-full relative overflow-hidden">
                      <Image 
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </>
                )}

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
