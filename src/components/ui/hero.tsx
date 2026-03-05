"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ShaderShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll tracking for parallax and fades
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax and visual effects on scroll
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const bgY = useTransform(smoothProgress, [0, 0.5], ["0%", "-10%"]);
  const bgDarken = useTransform(smoothProgress, [0, 0.4], ["rgba(29,38,37,0.2)", "rgba(29,38,37,0.7)"]);
  const headingOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0.85]);
  const headingScale = useTransform(smoothProgress, [0, 0.15], [1.02, 1]);
  const descY = useTransform(smoothProgress, [0, 0.2], [0, -20]);
  const descOpacity = useTransform(smoothProgress, [0.05, 0.2], [0, 1]);

  return (
    <div ref={containerRef} className="relative min-h-[200vh] bg-background">
      {/* Background Layer with Ken Burns Effect */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden bg-primary">
        <motion.div 
          style={{ y: bgY }}
          animate={{ 
            scale: [1, 1.08],
            x: [0, -20, 0],
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: "linear" 
          }}
          className="relative w-full h-full"
        >
          <Image
            src="https://i.ibb.co/VpvhxdKN/Whisk-3864d9b3b89f45385ae4b571ebd64a53dr.jpg"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        
        {/* Dynamic atmospheric overlay */}
        <motion.div 
          className="absolute inset-0 z-10" 
          style={{ backgroundColor: bgDarken }}
        />
        <div 
          className="absolute inset-0 z-15"
          style={{
            background: "linear-gradient(to bottom, transparent 60%, hsl(var(--background)) 100%)"
          }}
        />
      </div>

      {/* Navigation - Fade in from top */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-[2.5vw] mix-blend-exclusion"
      >
        <div className="flex items-center gap-[1vw]">
          <div className="w-[3vw] h-[3vw] rounded-lg bg-white flex items-center justify-center text-black font-bold heading-md">J</div>
          <span className="nav-link text-white">Anton Kolesnikov</span>
        </div>
        <nav className="hidden md:flex items-center space-x-[3vw]">
          <a href="#why" className="nav-link text-white/70 hover:text-white transition-colors">Why</a>
          <a href="#packages" className="nav-link text-white/70 hover:text-white transition-colors">Pricing</a>
          <motion.a 
            href="#contact" 
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,1)", color: "hsl(var(--primary))" }}
            className="px-[2.5vw] py-[1.2vh] rounded-full bg-accent text-white btn transition-all shadow-lg hover:shadow-accent/40"
          >
            Contact
          </motion.a>
        </nav>
      </motion.header>

      {/* Screen 1: The Main Hook */}
      <div className="relative z-20 w-full px-[6vw]">
        <div className="h-screen flex items-center justify-start">
          <div className="max-w-[85vw] is-visible">
            <div className="reveal-line-wrapper">
              <h1 className="reveal-line-left heading-xl text-white drop-shadow-2xl">
                High Conversion
              </h1>
            </div>
            
            <div className="flex items-baseline gap-[2vw] reveal-line-wrapper">
              <div className="reveal-line-right flex items-baseline gap-[2vw]">
                <span className="accent-italic text-white brightness-110 reveal-delay-1">
                  Plumbing
                </span>
                <span className="heading-xl text-white reveal-delay-1">Landing Pages</span>
              </div>
            </div>

            <motion.p 
              style={{ opacity: descOpacity, y: descY }}
              className="body-text text-white/90 mt-[6vh] max-w-[38vw] leading-relaxed reveal-text reveal-delay-2"
            >
              We design precision-engineered sales machines for US plumbing owners who demand predictable lead flow and dominant local authority.
            </motion.p>
          </div>
        </div>

        {/* Screen 2: The Core Philosophy */}
        <div className="h-screen flex flex-col justify-center">
          <div className="grid md:grid-cols-2 gap-[10vw] items-start">
            {/* Engineering Side */}
            <div className="max-w-[40vw] reveal-text">
              <div className="reveal-line-wrapper">
                <h2 className="reveal-line-left heading-lg text-white">
                  Precision
                </h2>
              </div>
              <div className="reveal-line-wrapper">
                <span className="reveal-line-right accent-italic text-[6.5vw] text-white/90">Engineering</span>
              </div>
              <p className="body-text text-white/95 mt-[4vh] max-w-[32vw] leading-relaxed reveal-text reveal-delay-1">
                Every pixel is placed with intent. We don't just build websites; we craft high-performance conversion funnels that transform casual browsers into lifetime customers.
              </p>
            </div>

            {/* Flow Side */}
            <div className="max-w-[40vw] md:text-right md:ml-auto md:mt-[20vh] reveal-text">
              <div className="reveal-line-wrapper">
                <h2 className="reveal-line-left heading-lg text-white">
                  Seamless
                </h2>
              </div>
              <div className="reveal-line-wrapper">
                <span className="reveal-line-right accent-italic text-[6.5vw] text-white/90">Flow</span>
              </div>
              <p className="body-text text-white/95 mt-[4vh] md:ml-auto max-w-[32vw] leading-relaxed reveal-text reveal-delay-1">
                From the first search click to the final service booking, your customer's journey is smooth, professional, and optimized for maximum trust.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Hint */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-[5vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-[1.5vh] text-white/40 z-20 pointer-events-none"
      >
        <span className="tag text-white/60">Explore the depth</span>
        <div className="w-[1px] h-[8vh] bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
    </div>
  );
}