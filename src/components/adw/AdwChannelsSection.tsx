"use client";

import { motion } from 'framer-motion';

const channels = [
  {
    id: "01",
    name: "Google Ads",
    tag: "Search & Performance Max",
    pitch: "Be there the moment someone is ready to buy. We capture high-intent searches and turn them into tracked leads and revenue.",
    deliverables: [
      "Demand & competitor audit: keywords, bids, seasonality by region",
      "Account structure built around your goals: Search, Performance Max, remarketing",
      "Automated bidding strategies targeting your cost per lead",
      "Negative keywords & traffic cleanup — budget spent only on relevant queries",
      "End-to-end conversion tracking: leads, calls, chats, forms",
      "Clear reporting every two weeks"
    ]
  },
  {
    id: "02",
    name: "Meta Ads",
    tag: "Facebook & Instagram",
    pitch: "Create demand where attention lives. We put your offer in front of the right people and bring back the ones who didn't convert.",
    deliverables: [
      "Audience strategy: interests, look-alikes, Advantage+",
      "Lead forms and click-to-message campaigns",
      "Pixel & Conversions API setup for accurate data",
      "A/B testing of creatives and offer–audience combinations",
      "Retargeting of site visitors and your existing base",
      "Weekly creative rotation and refresh"
    ]
  },
  {
    id: "03",
    name: "SEO + Google Profile",
    tag: "Organic & Local Maps",
    pitch: "Own the map pack and the organic results so customers find you for free — long after the ad budget stops.",
    deliverables: [
      "Google Business Profile setup and optimization",
      "Keyword research and page optimization for commercial queries",
      "External links and brand mentions across the web",
      "Technical optimization: speed, mobile version, structured data",
      "Competitor and search results analysis",
      "Monthly report on rankings, visibility and traffic"
    ]
  },
  {
    id: "04",
    name: "Analytics & Tracking",
    tag: "The Add-On That Ties It Together",
    pitch: "Know exactly what every dollar returns. No vanity metrics — just leads, cost per lead, and revenue you can see.",
    deliverables: [
      "GA4 + conversion tracking implementation",
      "Call & lead tracking with source data",
      "Offline / CRM conversion import",
      "One clear dashboard across all channels",
      "Lead-to-sale visibility, not just clicks",
      "Plain-English reporting you'll actually read"
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

export function AdwChannelsSection() {
  return (
    <section className="relative py-16 md:py-[72px] z-30 overflow-hidden w-full bg-black" id="channels">
      <div className="relative z-10 w-full px-6 md:px-[4vw]">
        <div className="grid grid-cols-12 gap-8 md:gap-0 items-start mb-12 md:mb-[8vh]">
          <div className="col-span-12 lg:col-span-6 flex flex-col">
            <h2 className="text-[12vw] md:text-[6vw] font-headline text-[#e0ded8] uppercase leading-[0.9] mb-4 md:mb-8 tracking-tight">
              WHAT I<br />ACTUALLY DO
            </h2>
          </div>
          <div className="col-span-12 lg:col-start-8 lg:col-span-5 flex items-end h-full">
            <p className="font-mono text-[3.5vw] md:text-[0.9vw] uppercase tracking-tight text-[#e0ded8]/60 leading-relaxed">
              Four channels, run as one system. Each one is built around the
              same goal — more tracked revenue and pipeline at a cost that makes
              sense for your business.
            </p>
          </div>
        </div>

        <motion.div
          className="flex flex-col w-full border-t border-[#e0ded8]/20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {channels.map((channel) => (
            <motion.div
              key={channel.id}
              variants={itemVariants}
              className="grid grid-cols-12 gap-6 md:gap-[2vw] py-10 md:py-[5vh] border-b border-[#e0ded8]/20 group"
            >
              {/* Left: number + name */}
              <div className="col-span-12 lg:col-span-5 flex flex-col">
                <div className="flex items-baseline gap-4 md:gap-[1.5vw]">
                  <span className="font-mono text-[3.5vw] md:text-[0.9vw] text-[#c7b684] font-bold tabular-nums pt-1">
                    /{channel.id}
                  </span>
                  <h3 className="text-[9vw] md:text-[3.2vw] font-headline text-[#e0ded8] uppercase leading-[0.95] tracking-tight transition-colors duration-300 group-hover:text-[#c7b684]">
                    {channel.name}
                  </h3>
                </div>
                <span className="font-mono text-[3vw] md:text-[0.8vw] uppercase tracking-[0.2em] text-[#e0ded8]/40 mt-3 md:mt-4 md:pl-[3vw]">
                  {channel.tag}
                </span>
                <p className="font-mono text-[3.5vw] md:text-[0.95vw] text-[#e0ded8]/70 leading-relaxed mt-5 md:mt-6 md:pl-[3vw] md:max-w-[90%] normal-case">
                  {channel.pitch}
                </p>
              </div>

              {/* Right: deliverables */}
              <div className="col-span-12 lg:col-start-7 lg:col-span-6 flex flex-col justify-center">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 md:gap-y-4">
                  {channel.deliverables.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 font-mono text-[3.5vw] sm:text-[1.6vw] md:text-[0.85vw] uppercase tracking-widest text-[#e0ded8]/60 leading-relaxed"
                    >
                      <span className="mt-[0.6em] w-1.5 h-1.5 rounded-full bg-[#c7b684] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
