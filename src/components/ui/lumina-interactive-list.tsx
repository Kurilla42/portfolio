'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
    title: 'loading Speed',
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
    title: 'Ttrust Elements',
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
  return (
    <div className="relative bg-[#97b0ad] z-20">
      {showcaseItems.map((item, index) => (
        <section
          key={index}
          className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden border-t border-primary/5 bg-[#97b0ad]"
        >
          <ShowcaseItem item={item} index={index} />
        </section>
      ))}
    </div>
  );
}

function ShowcaseItem({ item, index }: { item: any; index: number }) {
  // Ladder layout: 0, 2, 4 (Text Left, Image Right) | 1, 3 (Image Left, Text Right)
  const isImageRight = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`flex ${
        isImageRight ? 'flex-col md:flex-row' : 'flex-col md:flex-row-reverse'
      } items-center gap-[6vh] w-full max-w-[85vw] mx-auto`}
    >
      {/* TEXT AREA */}
      <div className="flex flex-col flex-1">
        <span className="services-item text-primary/10 leading-none mb-[2vh] block text-[4vw]">
          {item.number}
        </span>
        <h2 className="text-[3.0vw] font-black text-primary uppercase leading-[0.9] tracking-tighter font-sans">
          {item.title}
        </h2>
        <p className="body-text text-primary/70 max-w-[30vw] mt-[3vh] leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* IMAGE AREA */}
      <div className="relative flex-1 aspect-[16/9] md:aspect-[4/3] w-full overflow-hidden shadow-[0_2vw_5vw_-1vw_rgba(0,0,0,0.15)] bg-primary/5 rounded-none">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          priority
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-primary/5 mix-blend-multiply pointer-events-none" />
      </div>
    </motion.div>
  );
}
