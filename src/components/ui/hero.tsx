"use client";

import Image from "next/image";

export default function ShaderShowcase() {
  return (
    <div className="relative min-h-[200vh] bg-[#8bacaa]">
      {/* Background Image - Stays at the top 100vh only */}
      <div className="absolute top-0 left-0 w-full h-screen z-0 overflow-hidden bg-[#8bacaa]">
        <Image
          src="https://i.ibb.co/VpvhxdKN/Whisk-3864d9b3b89f45385ae4b571ebd64a53dr.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        
        {/* Bottom transition gradient to solid color #8bacaa */}
        <div 
          className="absolute inset-0 z-10" 
          style={{
            background: "linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(139, 172, 170, 0.4) 80%, #8bacaa 100%)"
          }}
        />
      </div>

      {/* Static Header Overlays */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 mix-blend-difference">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg">J</div>
          <span className="nav-link text-white">Anton Kolesnikov</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#why" className="nav-link text-white/60 hover:text-white transition-colors">Why</a>
          <a href="#packages" className="nav-link text-white/60 hover:text-white transition-colors">Pricing</a>
          <a href="#contact" className="px-5 py-2 rounded-full bg-accent text-accent-foreground btn hover:bg-white transition-all">Contact</a>
        </nav>
      </header>

      {/* Content Sections */}
      <div className="relative z-20 container mx-auto px-6">
        
        {/* Section 1: Main Hero */}
        <div className="h-screen flex items-center justify-start">
          <div className="max-w-4xl">
            <h1 className="heading-xl text-white drop-shadow-2xl reveal-text">
              High Conversion<br />
              <span className="accent-italic">Plumbing</span><br />
              Landing Pages
            </h1>
            <p className="body-text text-white/80 mt-8 max-w-xl text-lg reveal-text reveal-delay-1">
              Engineered specifically for plumbing business owners who demand a predictable flow of leads and higher revenue.
            </p>
          </div>
        </div>

        {/* Section 2: Combined Engineering & Flow - Full Screen */}
        <div className="h-screen flex flex-col justify-center gap-20 md:gap-0">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Precision Engineering */}
            <div className="max-w-2xl">
              <h2 className="heading-lg text-white reveal-text">
                Precision<br />
                <span className="accent-italic">Engineering</span>
              </h2>
              <p className="body-text text-white/80 mt-6 max-w-md text-lg reveal-text reveal-delay-1">
                Every pixel is placed with intent. We don't just build websites; we build conversion machines that turn visitors into scheduled service calls.
              </p>
            </div>

            {/* Seamless Flow */}
            <div className="max-w-2xl md:text-right md:ml-auto md:mt-40">
              <h2 className="heading-lg text-white reveal-text">
                Seamless<br />
                <span className="accent-italic">Flow</span>
              </h2>
              <p className="body-text text-white/80 mt-6 md:ml-auto max-w-md text-lg reveal-text reveal-delay-1">
                From the first click to the final booking, your customer's journey is smooth, professional, and optimized for maximum trust and ease of use.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 z-20 h-24">
        <span className="tag text-white/60">Explore the Depth</span>
        <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
      </div>
    </div>
  );
}
