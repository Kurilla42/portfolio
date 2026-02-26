"use client";

import Image from "next/image";

export default function ShaderShowcase() {
  return (
    <div className="relative min-h-[200vh] bg-[#8bacaa]">
      {/* Background Image - Stays at the top */}
      <div className="absolute top-0 left-0 w-full h-screen z-0 overflow-hidden bg-[#8bacaa]">
        <Image
          src="https://i.ibb.co/VpvhxdKN/Whisk-3864d9b3b89f45385ae4b571ebd64a53dr.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        
        <div 
          className="absolute inset-0 z-10" 
          style={{
            background: "linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(139, 172, 170, 0.2) 55%, rgba(139, 172, 170, 0.6) 75%, rgba(139, 172, 170, 0.9) 90%, #8bacaa 100%)"
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

      {/* Ladder Content Sections */}
      <div className="relative z-20 container mx-auto px-6">
        <div className="h-screen flex items-center justify-start">
          <div className="max-w-3xl">
            <h1 className="heading-xl text-white drop-shadow-2xl reveal-text">
              High Conversion<br />
              <span className="accent-italic">Plumbing</span><br />
              Landing Pages
            </h1>
          </div>
        </div>

        <div className="h-[50vh] flex items-center justify-end">
          <div className="max-w-3xl text-right">
            <h2 className="heading-xl text-white drop-shadow-2xl reveal-text">
              Precision<br />
              <span className="accent-italic">Engineering</span>
            </h2>
          </div>
        </div>

        <div className="h-[50vh] flex items-center justify-start">
          <div className="max-w-3xl">
            <h2 className="heading-xl text-white drop-shadow-2xl reveal-text">
              Seamless<br />
              <span className="accent-italic">Flow</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 z-20">
        <span className="tag text-white/60">Explore the Depth</span>
        <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
      </div>
    </div>
  );
}
