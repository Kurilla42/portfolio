"use client";

import { useEffect, useState } from "react";
import { HighlightWipeHeading } from "@/components/HighlightWipeHeading";
import Link from "next/link";

// Monochrome service glyphs (simple-icons), inherit currentColor
const ICONS = {
  googleAds:
    "M3.9998 22.9291C1.7908 22.9291 0 21.1383 0 18.9293s1.7908-3.9998 3.9998-3.9998 3.9998 1.7908 3.9998 3.9998-1.7908 3.9998-3.9998 3.9998zm19.4643-6.0004L15.4632 3.072C14.3586 1.1587 11.9121.5028 9.9988 1.6074S7.4295 5.1585 8.5341 7.0718l8.0009 13.8567c1.1046 1.9133 3.5511 2.5679 5.4644 1.4646 1.9134-1.1046 2.568-3.5511 1.4647-5.4644zM7.5137 4.8438L1.5645 15.1484A4.5 4.5 0 0 1 4 14.4297c2.5597-.0075 4.6248 2.1585 4.4941 4.7148l3.2168-5.5723-3.6094-6.25c-.4499-.7793-.6322-1.6394-.5878-2.4784z",
  meta:
    "M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z",
  seo:
    "M8.548 1.156L6.832 2.872v1.682h1.716zm0 3.398v.035H6.832v-.035H3.386L0 7.844v3.577h2.826V8.94c0-.525.429-.954.954-.954h16.476c.525 0 .954.43.954.954v2.48h2.754V7.844l-3.386-3.29H17.3v.035h-1.717v-.035zm7.035 0H17.3V2.872l-1.717-1.716zM8.679 1.188V2.84h6.773V1.188zm11.471 7.07a.834.834 0 00-.132.01l-.543.002c-5.216.014-10.432-.008-15.648.01-.435-.063-.794.436-.716.883v2.264h17.812c-.016-.888.045-1.782-.034-2.666-.104-.342-.427-.502-.739-.502zm-15.422.634a.689.698 0 01.689.698.689.698 0 01-.689.697.689.698 0 01-.688-.697.689.698 0 01.688-.698zm2.134 0a.689.698 0 01.689.698.689.698 0 01-.689.697.689.698 0 01-.688-.697.689.698 0 01.688-.698zM.036 11.645v9.156c0 1.05.858 1.908 1.907 1.908h.883V11.645zm21.174 0v11.064h.882c1.05 0 1.908-.858 1.908-1.908v-9.156zM4.057 13.133v6.85h6.137v-6.85zm13.243.021v3.777l-1.708.977-1.708-.977v-3.758a4.006 4.006 0 000 7.23v2.441h3.457v-2.442a4.006 4.006 0 00-.041-7.248zm-13.243 8.26v1.43h7.925v-1.43z",
};

function ServiceIcon({ path, label }: { path: string; label: string }) {
  return (
    <div className="flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="w-[16px] md:w-[1.3vw] h-[16px] md:h-[1.3vw]"
      >
        <path d={path} />
      </svg>
      <span className="text-[11px] md:text-[0.91vw] uppercase font-bold tracking-tighter font-sans">
        {label}
      </span>
    </div>
  );
}

interface AdwHeroProps {
  isLifted?: boolean;
}

export default function AdwHero({ isLifted }: AdwHeroProps) {
  const [greeting, setGreeting] = useState("Good morning!");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) setGreeting("Good afternoon!");
    else if (hour >= 17 || hour < 5) setGreeting("Good evening!");
  }, []);

  return (
    <div className="relative h-screen w-full font-sans overflow-hidden bg-transparent">
      <div className="relative z-10 w-full h-full px-6 md:px-[4vw] pt-6 md:pt-[4vh] pb-8 md:pb-[4vh] flex flex-col justify-between text-[#e0ded8]">

        <div className="flex w-full items-start justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-[10px] md:text-[0.7vw] uppercase tracking-[0.1em] opacity-60 hover:opacity-100 transition-opacity font-sans"
            >
              ← Kolesnikov
            </Link>
            <span className="hidden md:inline text-[10px] md:text-[0.7vw] uppercase tracking-[0.1em] opacity-30 font-sans">{greeting}</span>
          </div>
          <div>
            <Link
              href="#contact"
              className="text-[10px] md:text-[0.7vw] uppercase tracking-[0.1em] border-b border-[#e0ded8]/40 pb-0.5 cursor-pointer font-sans hover:border-[#e0ded8] transition-colors"
            >
              Let's talk!
            </Link>
          </div>
        </div>

        <div className="w-full mt-auto flex flex-col">
          <div className="grid grid-cols-12 w-full gap-4 md:gap-0 mb-6 md:mb-[2vh]">
            <div className="col-span-12 flex flex-col">
              <p className="text-[3.5vw] md:text-[1vw] opacity-60 mb-1 font-sans">Performance marketing by</p>
              <h2 className="text-[8vw] md:text-[3vw] font-sans font-bold leading-tight tracking-tighter">
                <span className="text-[#e0ded8]">Anton</span> <span className="opacity-40 font-medium">Kolesnikov</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-12 w-full items-start gap-4 md:gap-0">
            <div className="col-span-12 md:col-span-8">
              <HighlightWipeHeading
                as="h1"
                lines={["TURN CLICKS", "INTO PAYING", "CUSTOMERS"]}
                className="text-[12vw] md:text-[6vw] font-headline text-[#e0ded8] w-full md:w-[110%] -ml-0 md:-ml-1 tracking-tight leading-[0.9]"
                stagger={0.12}
                trigger={isLifted}
                delay={0.6}
              />
            </div>

            <div className="col-span-12 md:col-span-4 md:pl-[4vw] flex flex-col pt-1.5 md:pt-[0.5vw]">
              <div className="w-full h-[1px] bg-[#e0ded8]/20 mb-4 md:mb-[1.5vw]" />

              <div className="space-y-1 md:space-y-[0.3vw] text-[3.5vw] md:text-[1vw] uppercase tracking-wider font-medium font-mono text-[#e0ded8]/60 mb-8 md:mb-[3vw] text-left">
                <p>Google Ads · Meta Ads · SEO</p>
                <p>Built around tracked revenue &amp; leads</p>
                <p>Transparent reporting. Results, not retainers.</p>
              </div>

              <div className="flex items-center justify-between md:justify-start gap-4 md:gap-[2.5vw] mt-auto">
                <ServiceIcon path={ICONS.googleAds} label="Google Ads" />
                <ServiceIcon path={ICONS.meta} label="Meta Ads" />
                <ServiceIcon path={ICONS.seo} label="SEO" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
