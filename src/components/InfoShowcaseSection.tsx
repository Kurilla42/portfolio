'use client';

import Image from 'next/image';

interface InfoShowcaseSectionProps {
  imageSrc?: string;
  quote?: string;
}

export function InfoShowcaseSection({
  imageSrc = "https://i.ibb.co/xqjNS2sj/202603190505.jpg",
  quote = "My goal has always been to elevate everyday interactions into something more meaningful and crucially, quietly threading in moments of joy that catch us by surprise and stay with us for years to come"
}: InfoShowcaseSectionProps) {
  return (
    <section className="relative w-full z-20" style={{ height: '200vh' }}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        {/* Background Image - Static and full brightness */}
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
          <h2 className="text-[30vw] font-black leading-none text-white/20 tracking-tighter select-none">
            IN
          </h2>
          <h2 className="text-[30vw] font-black leading-none text-white/20 tracking-tighter select-none">
            FO
          </h2>
        </div>

        {/* Central Content */}
        <div className="relative z-20 flex flex-col items-center max-w-[60vw] text-center mt-[10vh]">
          {/* Stylized Brackets and Vertical Characters */}
          <div className="flex flex-col items-center mb-12">
            <div className="text-accent text-[4vw] leading-none mb-2">「</div>
            <div className="flex flex-col items-center gap-2 py-4">
              <span className="text-accent text-[2.5vw] font-serif font-bold leading-none">簡</span>
              <span className="text-accent text-[2.5vw] font-serif font-bold leading-none">介</span>
            </div>
            <div className="text-accent text-[4vw] leading-none">」</div>
          </div>

          {/* Quote Text */}
          <p className="text-white text-[1.4vw] leading-relaxed font-medium uppercase tracking-wider max-w-[40vw]">
            {quote}
          </p>
        </div>
      </div>
    </section>
  );
}
