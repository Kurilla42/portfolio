
"use client";

import Image from "next/image";

export default function ShaderShowcase() {
  return (
    <div className="relative min-h-[200vh] bg-[#8bacaa]">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-screen z-0 overflow-hidden bg-[#8bacaa]">
        <Image
          src="https://i.ibb.co/VpvhxdKN/Whisk-3864d9b3b89f45385ae4b571ebd64a53dr.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        
        {/* Transition gradient */}
        <div 
          className="absolute inset-0 z-10" 
          style={{
            background: "linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(139, 172, 170, 0.4) 80%, #8bacaa 100%)"
          }}
        />
      </div>

      {/* Static Header Overlays - Proportionally Scaled */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-[2vw] mix-blend-difference">
        <div className="flex items-center gap-[0.8vw]">
          <div className="w-[2.5vw] h-[2.5vw] rounded-[0.6vw] bg-primary flex items-center justify-center text-white font-bold text-[1.4vw]">J</div>
          <span className="nav-link text-white text-[0.8vw]">Anton Kolesnikov</span>
        </div>
        <nav className="hidden md:flex items-center space-x-[2.5vw]">
          <a href="#why" className="nav-link text-white/60 hover:text-white transition-colors text-[0.8vw]">Why</a>
          <a href="#packages" className="nav-link text-white/60 hover:text-white transition-colors text-[0.8vw]">Pricing</a>
          <a href="#contact" className="px-[1.5vw] py-[0.8vh] rounded-full bg-accent text-accent-foreground btn hover:bg-white transition-all text-[0.8vw]">Contact</a>
        </nav>
      </header>

      {/* Content Sections */}
      <div className="relative z-20 container mx-auto px-[4vw]">
        
        {/* Section 1: Main Hero */}
        <div className="h-screen flex items-center justify-start">
          <div className="max-w-[60vw]">
            <h1 className="heading-xl text-white drop-shadow-2xl reveal-text text-[7vw]">
              High Conversion<br />
              <span className="accent-italic">Plumbing</span><br />
              Landing Pages
            </h1>
            <p className="body-text text-white/80 mt-[4vh] max-w-[30vw] text-[1.3vw] reveal-text reveal-delay-1 leading-relaxed">
              Engineered specifically for plumbing business owners who demand a predictable flow of leads and higher revenue.
            </p>
          </div>
        </div>

        {/* Section 2: Combined Engineering & Flow */}
        <div className="h-screen flex flex-col justify-center">
          <div className="grid md:grid-cols-2 gap-[8vw] items-start">
            {/* Precision Engineering */}
            <div className="max-w-[35vw]">
              <h2 className="heading-lg text-white reveal-text text-[6vw]">
                Precision<br />
                <span className="accent-italic">Engineering</span>
              </h2>
              <p className="body-text text-white/80 mt-[3vh] max-w-[25vw] text-[1.2vw] reveal-text reveal-delay-1 leading-relaxed">
                Every pixel is placed with intent. We don't just build websites; we build conversion machines that turn visitors into scheduled service calls.
              </p>
            </div>

            {/* Seamless Flow */}
            <div className="max-w-[35vw] md:text-right md:ml-auto md:mt-[20vh]">
              <h2 className="heading-lg text-white reveal-text text-[6vw]">
                Seamless<br />
                <span className="accent-italic">Flow</span>
              </h2>
              <p className="body-text text-white/80 mt-[3vh] md:ml-auto max-w-[25vw] text-[1.2vw] reveal-text reveal-delay-1 leading-relaxed">
                From the first click to the final booking, your customer's journey is smooth, professional, and optimized for maximum trust and ease of use.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-[5vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-[1vh] text-white/40 z-20 h-[12vh]">
        <span className="tag text-white/60 text-[0.7vw]">Explore the Depth</span>
        <div className="w-[1px] h-[6vh] bg-gradient-to-b from-accent to-transparent" />
      </div>
    </div>
  );
}
