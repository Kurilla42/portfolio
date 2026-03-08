
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
      'https://i.ibb.co/twSbTjCt/Whisk-qmyyuznivmnwiwyj1injdtytymmkrtllrgmk1sy.png',
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
  return (
    <div className="relative bg-[#000] z-20">
      {showcaseItems.map((item, index) => (
        <section
          key={index}
          className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden border-b border-white/5"
        >
          <ShowcaseItem item={item} index={index} />
        </section>
      ))}
    </div>
  );
}

function ShowcaseItem({ item, index }: { item: any; index: number }) {
  return (
    <div className="relative w-full h-full group overflow-hidden">
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover object-top"
        priority
        unoptimized
        quality={100}
        sizes="100vw"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full h-full flex flex-col justify-end px-[8vw] pb-[12vh]"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 items-end w-full">
          
          <div className="md:col-span-8 text-left">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-[1.1vw] text-white/50 tracking-[0.3em] uppercase block">
                [ {item.number} ]
              </span>
              <div className="h-[1px] w-[6vw] bg-white/20" />
            </div>
            <h2 className="text-[7.5vw] font-black text-white uppercase leading-[0.8] tracking-tighter font-sans">
              {item.title}
            </h2>
          </div>

          <div className="md:col-span-4 flex flex-col items-start md:items-end text-left md:text-right">
            <p className="body-text text-white text-[1.4vw] leading-[1.4] font-medium opacity-100 max-w-[450px]">
              {item.description}
            </p>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
}
