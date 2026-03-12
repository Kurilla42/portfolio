"use client";

import { motion } from 'framer-motion';

const steps = [
  { number: "DAY 01", title: "Discovery" },
  { number: "DAY 02", title: "Wireframing" },
  { number: "DAY 03", title: "The Build" },
  { number: "DAY 04", title: "Launch & Sync" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export function ProcessSection() {
  return (
    <section 
      className="relative bg-[#eaeaf2] z-30 py-[15vh] shadow-[0_-20px_40px_rgba(0,0,0,0.02)]"
      id="process"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-2 px-[8vw] gap-[8vw]">
        
        {/* Left Side: Title */}
        <div className="flex flex-col justify-start">
          <span className="label text-muted-foreground block mb-[3vh] opacity-40">
            [ OUR METHODOLOGY ]
          </span>
          <div className="relative flex flex-col">
            <h2 className="heading-md text-primary uppercase leading-[1.1] text-[3vw]">
              THE STEPS
            </h2>
            <h2 className="heading-md text-primary uppercase leading-[1.1] text-[3vw]">
              SIMPLE TO FLOW
            </h2>
          </div>
          <p className="max-w-[28vw] body-text mt-[4vh] text-primary/50 text-[1vw] leading-relaxed">
            A streamlined, high-performance approach from discovery call to a revenue-generating launch in just 10 days.
          </p>
        </div>

        {/* Right Side: Steps List */}
        <motion.div 
          className="flex flex-col justify-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-col w-full border-t border-primary">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center justify-between py-[1.5vh] border-b border-primary"
              >
                <div className="flex items-baseline gap-[2vw]">
                  <span className="font-mono text-[1vw] text-primary/30 font-bold uppercase tracking-wider">
                    {step.number}
                  </span>
                  <h3 className="text-[1vw] font-bold text-primary uppercase tracking-tight">
                    {step.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
