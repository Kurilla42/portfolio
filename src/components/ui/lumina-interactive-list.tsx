'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';

const showcaseItems = [
  {
    title: 'Mobile-First Layouts',
    description: 'Every element is engineered to move the visitor toward a single goal: booking a call or requesting a quote.',
    image: 'https://i.ibb.co/4ZGtc09G/Whisk-89cb8686ddb9da498354cec156be16b4dr.png',
    number: '01'
  },
  {
    title: 'Loading Speed',
    description: 'Stop wasting money on Google Ads that send traffic to your homepage. Increase your Quality Score and lower CPL.',
    image: 'https://i.ibb.co/1t2yTNhv/Whisk-26ffea690ffcaab8e1f4de3f2a4f3d7bdr.png',
    number: '02'
  },
  {
    title: 'Strong Offers',
    description: "Deeply understand your customer's pain points. Clean design that reflects the professionalism of your crew.",
    image: 'https://i.ibb.co/Pz3d7g2S/Whisk-wedn4atn3etz5gtntqgz5gtl2kzy00cm1ujztem.jpg',
    number: '03'
  },
  {
    title: 'Trust Elements',
    description: 'Transform your website into a 24/7 sales engine that works while you are out on service calls.',
    image: 'https://i.ibb.co/mV4xt97Z/Whisk-1ugn5kjmzm2nkzgotezmwktl3itm00sm0mgotaj.png',
    number: '04'
  },
  {
    title: 'Calls To Action',
    description: 'Proven triggers that turn casual browsers into booked appointments, optimized for high conversion rates.',
    image: 'https://i.ibb.co/93bwJt4W/orange-portrait-004.jpg',
    number: '05'
  }
];

export function LuminaInteractiveList() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Высота 600vh дает запас для прокрутки 5 элементов (по 100vh на каждый переход)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Смещение трека: от 0% до -80% (так как 5 элементов по 100vw = 500vw, нам нужно сдвинуть на 400vw)
  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const smoothX = useSpring(xTransform, { stiffness: 60, damping: 20, restDelta: 0.001 });

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-[#97b0ad] z-20">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        
        {/* Горизонтальный трек: ширина 500vw для 5 карточек */}
        <motion.div 
          style={{ x: smoothX }}
          className="flex flex-row flex-nowrap h-full w-[500vw] items-center will-change-transform"
        >
          {showcaseItems.map((item, index) => (
            <ShowcaseItem 
              key={index} 
              item={item} 
              index={index} 
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ShowcaseItem({ item, index }: { item: any, index: number }) {
  // Лестничная структура: чередуем направление flex
  // 1, 3, 5 элементы (index 0, 2, 4) -> Текст вверху, Картинка внизу
  // 2, 4 элементы (index 1, 3) -> Картинка вверху, Текст внизу
  const isTextTop = index % 2 === 0;

  return (
    <div className="w-[100vw] h-full flex items-center justify-center px-[8vw] shrink-0">
      <div className={`flex ${isTextTop ? 'flex-col' : 'flex-col-reverse'} items-start gap-[6vh] max-w-[85vw]`}>
        
        {/* Текстовый блок */}
        <div className="flex flex-col">
          <span className="services-item text-primary/10 leading-none mb-[2vh] block text-[4vw]">
            {item.number}
          </span>
          <h2 className="text-[3.0vw] font-black text-primary tracking-tighter leading-[0.9] uppercase font-sans">
            {item.title}
          </h2>
          <p className="body-text text-primary/70 max-w-[30vw] mt-[3vh] leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Блок изображения: Прямые углы (rounded-none) */}
        <div className="relative w-[50vw] aspect-[16/9] overflow-hidden shadow-[0_2vw_5vw_-1vw_rgba(0,0,0,0.15)] bg-primary/5 rounded-none">
          <Image 
            src={item.image} 
            alt={item.title} 
            fill 
            className="object-cover"
            priority
            sizes="50vw"
          />
          {/* Легкое наложение для глубины */}
          <div className="absolute inset-0 bg-primary/5 mix-blend-multiply pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
