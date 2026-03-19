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
    <section className="relative w-full z-20" style={{ height: '200vh' }}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        {/* Background Image - Full brightness */}
        <div className="absolute inset-0 z-0">
          <Image
            src={imageSrc}
            alt="Showcase Background"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        {/* Massive Typography Layer - 30vw size, positioned at top */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between px-[5vw] pt-[5vh] pointer-events-none">
          <h2 className="text-[30vw] font-black leading-none text-white/15 tracking-tighter select-none font-sans">
            IN
          </h2>
          <h2 className="text-[30vw] font-black leading-none text-white/15 tracking-tighter select-none font-sans">
            FO
          </h2>
        </div>

        {/* Central Content */}
        <div className="relative z-20 flex flex-col items-center max-w-[70vw] text-center mt-[15vh]">
          {/* Stylized Brackets and Vertical Characters - Pixel perfect to ref */}
          <div className="flex flex-col items-center mb-16">
            <div className="text-accent text-[3.5vw] leading-none mb-1 font-light opacity-90">「</div>
            <div className="flex flex-col items-center gap-1 py-2">
              <span className="text-accent text-[2.2vw] font-serif font-bold leading-tight">簡</span>
              <span className="text-accent text-[2.2vw] font-serif font-bold leading-tight">介</span>
            </div>
            <div className="text-accent text-[3.5vw] leading-none mt-1 font-light opacity-90">」</div>
          </div>

          {/* Quote Text - Centered, Uppercase, Tracking */}
          <p className="text-white text-[1.2vw] leading-[1.6] font-bold uppercase tracking-[0.05em] max-w-[42vw] drop-shadow-lg">
            {quote}
          </p>
        </div>
      </div>
    </section>
  );
}
