"use client";

import { motion } from 'framer-motion';
import { HighlightWipeHeading } from '@/components/HighlightWipeHeading';

const part1 = [
  "After <span class='text-[#c7b684]'>12 years</span> in internet marketing, I found",
  "why so many local service websites",
  "fail to generate calls"
];

const part2 = [
  "It’s not the traffic or the budget. It’s",
  "<span class='text-[#c7b684]'>5 costly mistakes</span> web designers make",
  "when they focus on looks instead of <span class='text-[#c7b684]'>conversions</span>"
];

const conversionPoints = [
  {
    number: "01",
    title: "Mobile - first",
    description: "More than 70% of visitors come from mobile, so your page must convert on a phone first"
  },
  {
    number: "02",
    title: "Loading Speed",
    description: "In plumbing, every second matters - a 3-second delay can cost the call"
  },
  {
    number: "03",
    title: "Trust Elements",
    description: "3 trust signals can be enough: reviews, license, real photos"
  },
  {
    number: "04",
    title: "Calls To Action",
    description: "1 page, 1 goal, 1 clear CTA - turns visits into calls"
  },
  {
    number: "05",
    title: "Strong Offers",
    description: "1 strong offer gives people a reason to act now"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.8
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export function ExperienceTextSection() {
  return (
    <div className="w-full flex flex-col items-center justify-center px-6 md:px-[4vw]">
      <div className="w-full md:max-w-full flex flex-col gap-12 md:gap-24">
        <div className="w-full flex justify-start">
          <HighlightWipeHeading 
            as="p"
            lines={part1}
            className="text-[8vw] md:text-[3vw] font-headline uppercase leading-[1.3] md:leading-[1.1] text-[#e0ded8] items-start text-left tracking-normal"
            stagger={0.08}
            triggerOnce={true}
          />
        </div>

        <div className="w-full flex justify-start md:justify-end">
          <HighlightWipeHeading 
            as="p"
            lines={part2}
            className="text-[8vw] md:text-[3vw] font-headline uppercase leading-[1.3] md:leading-[1.1] text-[#e0ded8] items-start text-left tracking-normal"
            stagger={0.08}
            triggerOnce={true}
            delay={0.4}
          />
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-[2vw] mt-12 md:mt-8 md:px-[4vw]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {conversionPoints.map((point, idx) => (
            <motion.div 
              key={idx} 
              className="flex flex-col items-start text-left"
              variants={itemVariants}
            >
              <span className="font-mono text-[10px] md:text-[0.7vw] text-[#e0ded8]/40 mb-3 tracking-widest">
                [{point.number}]
              </span>
              <h3 className="font-headline text-[8vw] md:text-[3vw] text-[#e0ded8] leading-none mb-4 uppercase">
                {point.title}
              </h3>
              <div className="w-full h-[1px] bg-[#e0ded8]/20 mb-6" />
              <p className="font-mono text-[3.5vw] md:text-[0.9vw] uppercase tracking-widest text-[#e0ded8]/60 leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}