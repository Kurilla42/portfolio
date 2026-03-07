
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // With 5 items, we move 400% (0 to -80%)
  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const smoothX = useSpring(xTransform, { stiffness: 80, damping: 25, restDelta: 0.001 });

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#97b0ad]">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        
        {/* Progress Bar */}
        <div className="absolute bottom-[6vh] left-[8vw] right-[8vw] h-[1px] bg-primary/10 z-50">
          <motion.div 
            className="h-full bg-accent" 
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }} 
          />
        </div>

        {/* Horizontal Track */}
        <motion.div 
          style={{ x: smoothX }}
          className="flex h-full w-[500vw] items-center will-change-transform"
        >
          {showcaseItems.map((item, index) => (
            <ShowcaseItem 
              key={index} 
              item={item} 
              index={index} 
              progress={scrollYProgress} 
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ShowcaseItem({ item, index, progress }: { item: any, index: number, progress: any }) {
  // Range mapping for 5 items (0.2 steps each)
  const start = index * 0.2;
  const end = (index + 1) * 0.2;
  const center = (start + end) / 2;

  // Text focus effect: emergin from background
  const contentOpacity = useTransform(progress, 
    [start - 0.1, start, center, end, end + 0.1], 
    [0, 0.4, 1, 0.4, 0]
  );

  const contentScale = useTransform(progress,
    [start, center, end],
    [0.9, 1, 0.9]
  );

  // Staircase logic: toggle flex direction
  const isTextTop = index % 2 === 0;

  return (
    <div className="w-[100vw] h-full flex items-center justify-center px-[8vw] shrink-0">
      <motion.div 
        style={{ opacity: contentOpacity, scale: contentScale }}
        className={`flex ${isTextTop ? 'flex-col' : 'flex-col-reverse'} items-start gap-[6vh] max-w-[80vw]`}
      >
        {/* Text Block */}
        <div className="flex flex-col">
          <span className="services-item text-primary/10 leading-none mb-[2vh] block">
            {item.number}
          </span>
          <h2 className="text-[3.0vw] font-black text-primary tracking-tighter leading-[0.9] uppercase font-sans">
            {item.title}
          </h2>
          <p className="body-text text-primary/70 max-w-[30vw] mt-[3vh] leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Image Block: Straight Corners */}
        <div className="relative w-[50vw] aspect-[16/9] overflow-hidden shadow-[0_2vw_5vw_-1vw_rgba(0,0,0,0.15)] bg-primary/5">
          <Image 
            src={item.image} 
            alt={item.title} 
            fill 
            className="object-cover"
            priority
            sizes="50vw"
          />
          {/* Subtle Visual Overlay */}
          <div className="absolute inset-0 bg-primary/5 mix-blend-multiply pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
}
