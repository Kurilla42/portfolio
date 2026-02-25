
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
        
        {/* Seamless gradient - expanded height and more stops for perfect smoothness */}
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
          <span className="font-bold text-white tracking-tighter uppercase">Anton Kolesnikov</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#why" className="text-white/60 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Why</a>
          <a href="#packages" className="text-white/60 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Pricing</a>
          <a href="#contact" className="px-5 py-2 rounded-full bg-accent text-accent-foreground font-bold text-xs uppercase tracking-widest hover:bg-white transition-all">Contact</a>
        </nav>
      </header>

      {/* Ladder Content Sections - Distributed across 200vh */}
      <div className="relative z-20 container mx-auto px-6">
        
        {/* Text 1 - Top Left (First Screen) */}
        <div className="h-screen flex items-center justify-start">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-2xl">
              High Conversion<br />
              <span className="text-accent">Plumbing</span><br />
              Landing Pages
            </h1>
          </div>
        </div>

        {/* Text 2 - Middle Right (Transition Area) */}
        <div className="h-[50vh] flex items-center justify-end">
          <div className="max-w-3xl text-right">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-2xl">
              Precision<br />
              Engineering
            </h2>
          </div>
        </div>

        {/* Text 3 - Bottom Left (End of Section) */}
        <div className="h-[50vh] flex items-center justify-start">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-2xl">
              Seamless<br />
              Flow
            </h2>
          </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 z-20">
        <span className="text-[10px] uppercase tracking-widest font-bold">Explore the Depth</span>
        <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
      </div>
    </div>
  );
}
