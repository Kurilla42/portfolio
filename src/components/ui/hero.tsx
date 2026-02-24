
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ShaderShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Анимация для основного заголовка (уходит влево и вниз)
  const mainOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const mainX = useTransform(scrollYProgress, [0, 0.4], ["0%", "-100%"]);
  const mainY = useTransform(scrollYProgress, [0, 0.4], ["0%", "20%"]);
  const mainScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.5]);

  // Анимация для "Test 1" (приходит справа, потом уходит вправо-вниз)
  const test1Opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.5, 1, 1, 0]);
  const test1X = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], ["38vw", "0%", "0%", "100%"]);
  const test1Y = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], ["0%", "0%", "0%", "20%"]);
  const test1Scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.3, 1, 1, 0.5]);

  // Анимация для "Test 2" (появляется слева вдали, потом выходит в центр)
  const test2Opacity = useTransform(scrollYProgress, [0.4, 0.6, 1], [0, 0.5, 1]);
  const test2X = useTransform(scrollYProgress, [0.4, 0.6, 1], ["-50vw", "-38vw", "0%"]);
  const test2Scale = useTransform(scrollYProgress, [0.4, 0.6, 1], [0.1, 0.3, 1]);

  return (
    <div ref={containerRef} className="h-[400vh] bg-black relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://i.ibb.co/VpvhxdKN/Whisk-3864d9b3b89f45385ae4b571ebd64a53dr.jpg"
            alt="Hero Background"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        </div>

        {/* Text Layers */}
        <div className="relative z-10 w-full max-w-7xl px-6 text-center">
          
          {/* Main Title Layer */}
          <motion.div
            style={{
              opacity: mainOpacity,
              x: mainX,
              y: mainY,
              scale: mainScale,
            }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none">
              High Conversion<br />
              <span className="text-accent">Plumbing</span><br />
              Landing Pages
            </h1>
          </motion.div>

          {/* Test 1 Layer */}
          <motion.div
            style={{
              opacity: test1Opacity,
              x: test1X,
              y: test1Y,
              scale: test1Scale,
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter">
              Test 1
            </h2>
          </motion.div>

          {/* Test 2 Layer */}
          <motion.div
            style={{
              opacity: test2Opacity,
              x: test2X,
              scale: test2Scale,
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter">
              Test 2
            </h2>
          </motion.div>

        </div>

        {/* Static Header Overlays */}
        <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg">J</div>
            <span className="font-bold text-white tracking-tighter uppercase">Anton Kolesnikov</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#why" className="text-white/60 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Why</a>
            <a href="#work" className="text-white/60 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Work</a>
            <a href="#packages" className="text-white/60 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Pricing</a>
            <a href="#contact" className="px-5 py-2 rounded-full bg-accent text-accent-foreground font-bold text-xs uppercase tracking-widest hover:bg-white transition-all">Contact</a>
          </nav>
        </header>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll to Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}
