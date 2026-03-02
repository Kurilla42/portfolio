
"use client";

import Image from "next/image";

export default function ShaderShowcase() {
  return (
    <div className="relative min-h-[200vh] bg-primary">
      {/* Background Image Container */}
      <div className="absolute top-0 left-0 w-full h-screen z-0 overflow-hidden">
        <Image
          src="https://i.ibb.co/VpvhxdKN/Whisk-3864d9b3b89f45385ae4b571ebd64a53dr.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        
        {/* Soft atmospheric gradient */}
        <div 
          className="absolute inset-0 z-10" 
          style={{
            background: "linear-gradient(to bottom, rgba(29,38,37,0.2) 0%, rgba(29,38,37,0.4) 60%, rgba(29,38,37,0.8) 90%, hsl(var(--background)) 100%)"
          }}
        />
      </div>

      {/* Persistent Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-[2.5vw] mix-blend-exclusion">
        <div className="flex items-center gap-[1vw]">
          <div className="w-[3vw] h-[3vw] rounded-lg bg-white flex items-center justify-center text-black font-bold heading-md">J</div>
          <span className="nav-link text-white">Anton Kolesnikov</span>
        </div>
        <nav className="hidden md:flex items-center space-x-[3vw]">
          <a href="#why" className="nav-link text-white/70 hover:text-white transition-colors">Why</a>
          <a href="#packages" className="nav-link text-white/70 hover:text-white transition-colors">Pricing</a>
          <a href="#contact" className="px-[2vw] py-[1vh] rounded-full bg-accent text-white btn hover:bg-white hover:text-primary transition-all">Contact</a>
        </nav>
      </header>

      {/* Content Layers */}
      <div className="relative z-20 w-full px-[6vw]">
        
        {/* Screen 1: The Main Hook */}
        <div className="h-screen flex items-center justify-start">
          <div className="max-w-[75vw]">
            <h1 className="heading-xl text-white drop-shadow-2xl reveal-text">
              High Conversion<br />
              <span className="accent-italic">Plumbing</span><br />
              Landing Pages
            </h1>
            <p className="body-text text-white/80 mt-[5vh] max-w-[35vw] reveal-text reveal-delay-1 leading-relaxed">
              We design precision-engineered sales machines for US plumbing owners who demand predictable lead flow and dominant local authority.
            </p>
          </div>
        </div>

        {/* Screen 2: The Core Philosophy */}
        <div className="h-screen flex flex-col justify-center">
          <div className="grid md:grid-cols-2 gap-[10vw] items-start">
            {/* Engineering Side */}
            <div className="max-w-[40vw]">
              <h2 className="heading-lg text-white reveal-text">
                Precision<br />
                <span className="accent-italic">Engineering</span>
              </h2>
              <p className="body-text text-white/90 mt-[4vh] max-w-[30vw] reveal-text reveal-delay-1 leading-relaxed">
                Every pixel is placed with intent. We don't just build websites; we craft high-performance conversion funnels that transform casual browsers into lifetime customers.
              </p>
            </div>

            {/* Flow Side */}
            <div className="max-w-[40vw] md:text-right md:ml-auto md:mt-[25vh]">
              <h2 className="heading-lg text-white reveal-text">
                Seamless<br />
                <span className="accent-italic">Flow</span>
              </h2>
              <p className="body-text text-white/90 mt-[4vh] md:ml-auto max-w-[30vw] reveal-text reveal-delay-1 leading-relaxed">
                From the first search click to the final service booking, your customer's journey is smooth, professional, and optimized for maximum trust.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll Down Hint */}
      <div className="absolute bottom-[5vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-[1.5vh] text-white/40 z-20">
        <span className="tag text-white/60">Explore the depth</span>
        <div className="w-[1px] h-[8vh] bg-gradient-to-b from-accent to-transparent" />
      </div>
    </div>
  );
}
