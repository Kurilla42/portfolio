"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ScrollRevealHeading } from "@/components/ScrollRevealHeading";

export default function ShaderShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll tracking for parallax and background darkening
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const bgY = useTransform(smoothProgress, [0, 0.5], ["0%", "-10%"]);
  const bgDarken = useTransform(smoothProgress, [0, 0.4], ["rgba(29,38,37,0.2)", "rgba(29,38,37,0.7)"]);
  
  // Description specifically reveals based on scroll
  const descProgress = useTransform(smoothProgress, [0.05, 0.25], [0, 1]);

  return (
    <div ref={containerRef} className="relative min-h-[200vh] bg-transparent">
      {/* Background Layer with Ken Burns Effect */}
      <div className="absolute top-0 left-0 w-full h-screen z-0 overflow-hidden bg-primary">
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
      </div>

      {/* Screen 1: The Main Hook */}
      <div className="relative z-20 w-full px-[6vw]">
        <div className="h-screen flex items-center justify-start">
          <div className="max-w-[85vw]">
            <ScrollRevealHeading as="h1" className="heading-xl text-white drop-shadow-2xl">
              High Conversion
            </ScrollRevealHeading>
            
            <div className="flex items-baseline gap-[2vw]">
              <span className="accent-italic text-white brightness-110 text-[7vw]">Plumbing</span>
              <ScrollRevealHeading as="h1" className="heading-xl text-white">
                Landing Pages
              </ScrollRevealHeading>
            </div>

            <motion.div
              style={{ opacity: descProgress, y: useTransform(descProgress, [0, 1], [20, 0]) }}
              className="mt-[6vh] max-w-[38vw]"
            >
              <p className="body-text text-white/90 leading-relaxed">
                We design precision-engineered sales machines for US plumbing owners who demand predictable lead flow and dominant local authority.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Screen 2: The Core Philosophy */}
        <div className="h-screen flex flex-col justify-center">
          <div className="grid md:grid-cols-2 gap-[10vw] items-start">
            {/* Engineering Side */}
            <div className="max-w-[40vw]">
              <ScrollRevealHeading as="h2" className="heading-lg text-white">
                Precision
              </ScrollRevealHeading>
              <span className="accent-italic text-[6.5vw] text-white/90 block -mt-[2vh] mb-[4vh]">Engineering</span>
              <p className="body-text text-white/95 max-w-[32vw] leading-relaxed">
                Every pixel is placed with intent. We don't just build websites; we craft high-performance conversion funnels that transform casual browsers into lifetime customers.
              </p>
            </div>

            {/* Flow Side */}
            <div className="max-w-[40vw] md:text-right md:ml-auto md:mt-[20vh]">
              <ScrollRevealHeading as="h2" className="heading-lg text-white">
                Seamless
              </ScrollRevealHeading>
              <span className="accent-italic text-[6.5vw] text-white/90 block -mt-[2vh] mb-[4vh]">Flow</span>
              <p className="body-text text-white/95 md:ml-auto max-w-[32vw] leading-relaxed">
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
