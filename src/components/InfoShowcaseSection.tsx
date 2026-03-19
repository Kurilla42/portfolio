'use client';

import Image from 'next/image';

interface InfoShowcaseSectionProps {
  imageSrc?: string;
  quote?: string;
}

export function InfoShowcaseSection({
  imageSrc = "https://i.ibb.co/xqjNS2sj/202603190505.jpg",
  quote = "MY GOAL HAS ALWAYS BEEN TO ELEVATE EVERYDAY INTERACTIONS INTO SOMETHING MORE MEANINGFUL AND CRUCIALLY, QUIETLY THREADING IN MOMENTS OF JOY THAT CATCH US BY SURPRISE AND STAY WITH US FOR YEARS TO COME"
}: InfoShowcaseSectionProps) {
  return (
    <section className="relative w-full z-20 overflow-hidden" style={{ height: '200vh' }}>
      {/* Background Layer: Covers all 200vh to use the full vertical image */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Image
          src={imageSrc}
          alt="Showcase Vertical Background"
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col">
        
        {/* FIRST BLOCK (100vh): IN FO Typography */}
        <div className="h-screen w-full flex items-start justify-between px-[5vw] pt-[5vh] pointer-events-none">
          <h2 className="text-[30vw] font-black leading-none text-white/15 tracking-tighter select-none font-sans">
            IN
          </h2>
          <h2 className="text-[30vw] font-black leading-none text-white/15 tracking-tighter select-none font-sans">
            FO
          </h2>
        </div>

        {/* SECOND BLOCK (100vh): Quote and Brackets */}
        <div className="h-screen w-full flex flex-col items-center justify-center text-center px-[4vw]">
          {/* Stylized brackets and vertical symbols */}
          <div className="flex flex-col items-center mb-16">
            <div className="text-accent text-[3.5vw] leading-none mb-1 font-light opacity-90">「</div>
            <div className="flex flex-col items-center gap-1 py-2">
              <span className="text-accent text-[2.2vw] font-serif font-bold leading-tight">簡</span>
              <span className="text-accent text-[2.2vw] font-serif font-bold leading-tight">介</span>
            </div>
            <div className="text-accent text-[3.5vw] leading-none mt-1 font-light opacity-90">」</div>
          </div>

          {/* Quote */}
          <p className="text-white text-[1.2vw] leading-[1.6] font-bold uppercase tracking-[0.05em] max-w-[42vw] drop-shadow-lg">
            {quote}
          </p>
        </div>

      </div>
    </section>
  );
}
