'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const showcaseItems = [
  {
    title: 'Mobile-First Layouts',
    description:
      'Every element is engineered to move the visitor toward a single goal: booking a call or requesting a quote.',
    image:
      'https://i.ibb.co/4ZGtc09G/Whisk-89cb8686ddb9da498354cec156be16b4dr.png',
    number: '01',
  },
  {
    title: 'Loading Speed',
    description:
      'Stop wasting money on Google Ads that send traffic to your homepage. Increase your Quality Score and lower CPL.',
    image:
      'https://i.ibb.co/1t2yTNhv/Whisk-26ffea690ffcaab8e1f4de3f2a4f3d7bdr.png',
    number: '02',
  },
  {
    title: 'Strong Offers',
    description:
      "Deeply understand your customer's pain points. Clean design that reflects the professionalism of your crew.",
    image:
      'https://i.ibb.co/Pz3d7g2S/Whisk-wedn4atn3etz5gtntqgz5gtl2kzy00cm1ujztem.jpg',
    number: '03',
  },
  {
    title: 'Trust Elements',
    description:
      'Transform your website into a 24/7 sales engine that works while you are out on service calls.',
    image:
      'https://i.ibb.co/mV4xt97Z/Whisk-1ugn5kjmzm2nkzgotezmwktl3itm00sm0mgotaj.png',
    number: '04',
  },
  {
    title: 'Calls To Action',
    description:
      'Proven triggers that turn casual browsers into booked appointments, optimized for high conversion rates.',
    image: 'https://i.ibb.co/93bwJt4W/orange-portrait-004.jpg',
    number: '05',
  },
];

export function LuminaInteractiveList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col md:flex-row z-20 border-b border-white/10">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://i.ibb.co/Y7Rzv80G/1.jpg"
          alt="List Background"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Subtle Noise/Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-soft-light z-30 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'0%27svg%27%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E')]" />

      {showcaseItems.map((item, index) => {
        const isHovered = hoveredIndex === index;
        
        return (
          <motion.div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={cn(
              "relative h-full transition-all duration-700 ease-[0.22,1,0.36,1] flex flex-col justify-end overflow-hidden border-r border-white/5 last:border-r-0 cursor-pointer group",
              isHovered ? "flex-[4] md:flex-[5]" : "flex-1"
            )}
          >
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className={cn(
                  "object-cover transition-transform duration-1000 ease-out",
                  isHovered ? "scale-105" : "scale-110 grayscale-[50%] brightness-50"
                )}
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
            </div>

            {/* Vertical Content (Non-hovered) */}
            <AnimatePresence>
              {!isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 z-10 flex flex-col items-center py-[8vh]"
                >
                  <span className="text-[4vw] md:text-[1.8vw] font-mono text-white font-bold tracking-widest mb-[12vh]">
                    {item.number}
                  </span>
                  <div className="flex-1 flex items-center justify-center">
                    <h3 className="whitespace-nowrap transform -rotate-90 origin-center text-white uppercase tracking-[0.4em] font-bold text-[3vw] md:text-[2vw]">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expanded Content (Hovered) */}
            <div className="relative z-20 w-full h-full p-[4vw] flex flex-col justify-end">
              <AnimatePresence mode="wait">
                {isHovered && (
                  <motion.div
                    key="expanded-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                    className="w-full pointer-events-none overflow-hidden"
                  >
                    <div className="max-w-[80%] min-w-[450px]">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="font-mono text-[1vw] text-accent tracking-[0.2em] uppercase font-bold">
                          [ {item.number} ]
                        </span>
                        <div className="h-[1px] w-[4vw] bg-accent/60" />
                      </div>
                      <h2 className="heading-md text-white uppercase text-[3vw] mb-6 leading-tight whitespace-nowrap">
                        {item.title}
                      </h2>
                      <p className="body-text text-white/80 text-[1.1vw] leading-relaxed max-w-[450px]">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Glow Indicator */}
            <motion.div 
              className="absolute bottom-0 left-0 h-[2px] bg-accent z-30"
              initial={{ width: 0 }}
              animate={{ width: isHovered ? "100%" : "0%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>
        );
      })}
    </section>
  );
}
