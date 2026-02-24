
"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ShaderShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Ускоренная анимация (уменьшены интервалы прогресса)
  // Основной заголовок (исчезает быстро)
  const mainOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const mainX = useTransform(scrollYProgress, [0, 0.2], ["0%", "-50%"]);
  const mainY = useTransform(scrollYProgress, [0, 0.2], ["0%", "10%"]);
  const mainScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // Test 1 (появляется быстрее, держится меньше)
  const test1Opacity = useTransform(scrollYProgress, [0.15, 0.3, 0.5, 0.7], [0, 1, 1, 0]);
  const test1X = useTransform(scrollYProgress, [0.15, 0.3, 0.5, 0.7], ["30vw", "0%", "0%", "30vw"]);
  const test1Y = useTransform(scrollYProgress, [0.15, 0.3, 0.5, 0.7], ["0%", "0%", "0%", "15%"]);
  const test1Scale = useTransform(scrollYProgress, [0.15, 0.3, 0.5, 0.7], [0.5, 1, 1, 0.7]);

  // Test 2 (финальный текст)
  const test2Opacity = useTransform(scrollYProgress, [0.65, 0.85, 1.0], [0, 1, 1]);
  const test2X = useTransform(scrollYProgress, [0.65, 0.85, 1.0], ["-30vw", "-10vw", "0%"]);
  const test2Y = useTransform(scrollYProgress, [0.65, 0.85, 1.0], ["10%", "5%", "0%"]);
  const test2Scale = useTransform(scrollYProgress, [0.65, 0.85, 1.0], [0.3, 0.7, 1]);

  // Параллакс фона
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  
  // Эффект погружения кадра
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "3%"]);

  return (
    <div ref={containerRef} className="h-[300vh] bg-black relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        
        {/* Background Image with Parallax */}
        <motion.div 
          style={{ y: bgY }}
          className="absolute inset-0 z-0 h-[120%]"
        >
          <Image
            src="https://i.ibb.co/VpvhxdKN/Whisk-3864d9b3b89f45385ae4b571ebd64a53dr.jpg"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          
          {/* Бесшовный градиент к цвету #8bacaa */}
          <div 
            className="absolute inset-x-0 bottom-0 h-[50%]" 
            style={{
              background: "linear-gradient(to bottom, transparent 0%, rgba(139, 172, 170, 0.6) 50%, #8bacaa 100%)"
            }}
          />
        </motion.div>

        {/* Text Layers Container */}
        <motion.div 
          style={{ y: contentY }}
          className="relative z-10 w-full max-w-7xl px-6 text-center h-full"
        >
          
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
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-2xl">
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
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">
              Precision Engineering
            </h2>
          </motion.div>

          {/* Test 2 Layer */}
          <motion.div
            style={{
              opacity: test2Opacity,
              x: test2X,
              y: test2Y,
              scale: test2Scale,
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">
              Seamless Flow
            </h2>
          </motion.div>

        </motion.div>

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
          <span className="text-[10px] uppercase tracking-widest font-bold">Explore the Depth</span>
          <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
        </motion.div>
      </div>
      
      {/* Убрана черная линия через замену фона контейнера перехода */}
      <div className="h-[10vh] bg-[#8bacaa] w-full" />
    </div>
  );
}
