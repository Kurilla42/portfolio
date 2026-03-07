
'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const showcaseItems = [
  {
    title: 'Laser Focused Intent',
    description: 'Every element is engineered to move the visitor toward a single goal: booking a call or requesting a quote.',
    image: { imageUrl: 'https://i.ibb.co/4ZGtc09G/Whisk-89cb8686ddb9da498354cec156be16b4dr.png' },
    number: '01'
  },
  {
    title: 'Ad Spend Efficiency',
    description: 'Stop wasting money on Google Ads that send traffic to your homepage. Increase your Quality Score and lower CPL.',
    image: PlaceHolderImages.find(img => img.id === 'case-study-2'),
    number: '02'
  },
  {
    title: 'Trust & Authority',
    description: "Deeply understand your customer's pain points. Clean design that reflects the professionalism of your crew.",
    image: PlaceHolderImages.find(img => img.id === 'case-study-3'),
    number: '03'
  },
  {
    title: 'Revenue Machine',
    description: 'Transform your website into a 24/7 sales engine that works while you are out on service calls.',
    image: PlaceHolderImages.find(img => img.id === 'process-step'),
    number: '04'
  }
];

export function LuminaInteractiveList() {
  const containerRef = useRef<HTMLDivElement>(null);

  // useScroll tracks the progress of the container passing through the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate horizontal translation. With 4 items, we move 300% to show the 4th item.
  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const smoothX = useSpring(xTransform, { stiffness: 80, damping: 25, restDelta: 0.001 });

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#97b0ad]">
      {/* Sticky Viewport: This is the part that stays on screen */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        
        {/* Progress Bar */}
        <div className="absolute bottom-[6vh] left-[8vw] right-[8vw] h-[1px] bg-primary/10 z-50">
          <motion.div 
            className="h-full bg-accent" 
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }} 
          />
        </div>

        {/* Labels */}
        <div className="absolute top-[10vh] left-[8vw] z-50 pointer-events-none">
          <span className="label text-muted-foreground opacity-40">[ CORE PHILOSOPHY ]</span>
        </div>

        {/* Horizontal Track: This is the long ribbon that moves right */}
        <motion.div 
          style={{ x: smoothX }}
          className="flex h-full w-[400vw] items-center will-change-transform"
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
  // Range mapping for 4 items (0.25 steps each)
  const start = index * 0.25;
  const end = (index + 1) * 0.25;
  const center = (start + end) / 2;

  // Text focus effect: brighter in the middle, dimmer on sides
  const textOpacity = useTransform(progress, 
    [start, center, end], 
    [0.4, 1, 0.4]
  );
  
  // Internal Parallax for image: moves slightly differently than the track
  const imageX = useTransform(progress, 
    [start, end], 
    ["10%", "-10%"]
  );

  return (
    <div className="w-[100vw] h-full flex items-center px-[8vw] gap-[10vw] shrink-0">
      {/* Image Container */}
      <div className="relative w-[45vw] aspect-[16/10] rounded-[2vw] overflow-hidden shadow-[0_2vw_5vw_-1vw_rgba(0,0,0,0.2)] bg-primary/5">
        <motion.div 
          style={{ x: imageX }}
          className="relative w-full h-full scale-125"
        >
          <Image 
            src={item.image?.imageUrl || ''} 
            alt={item.title} 
            fill 
            className="object-cover"
            priority
            sizes="45vw"
          />
        </motion.div>
        {/* Subtle Visual Overlay */}
        <div className="absolute inset-0 bg-primary/5 mix-blend-multiply pointer-events-none" />
      </div>

      {/* Text Container */}
      <motion.div 
        style={{ opacity: textOpacity }}
        className="flex flex-col max-w-[35vw]"
      >
        <span className="services-item text-primary/5 leading-none mb-[3vh] block">
          {item.number}
        </span>
        <h2 className="heading-lg text-primary tracking-tighter mb-[5vh] leading-[0.9]">
          {item.title}
        </h2>
        <p className="body-text text-primary/70 max-w-[30vw] leading-relaxed">
          {item.description}
        </p>
      </motion.div>
    </div>
  );
}
