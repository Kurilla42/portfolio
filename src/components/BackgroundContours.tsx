"use client";

import { useEffect, useRef } from 'react';

export function BackgroundContours() {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;

    // лёгкая анимация через requestAnimationFrame
    let frame = 0;
    let id: number;

    const animate = () => {
      frame += 0.002; // скорость
      const paths = svg.querySelectorAll<SVGPathElement>('path[data-wiggle="1"]');
      paths.forEach((p, i) => {
        const base = Number(p.getAttribute('data-base') || 0);
        const offset = Math.sin(frame + i) * 3; // амплитуда 3px
        p.setAttribute('transform', `translate(0 ${base + offset})`);
      });
      id = requestAnimationFrame(animate);
    };

    id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-[#F8FAFC]"
    >
      <svg
        ref={ref}
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* несколько плавных контуров */}
        <g stroke="#E2E8F0" strokeWidth="1.5" fill="none">
          <path
            d="M-100 200 C 300 80, 600 120, 1100 260 C 1500 380, 1900 320, 2100 200"
            data-wiggle="1"
            data-base="0"
          />
          <path
            d="M-150 350 C 200 260, 650 260, 1150 360 C 1550 440, 1900 420, 2150 340"
            data-wiggle="1"
            data-base="10"
          />
          <path
            d="M-200 520 C 150 430, 650 430, 1200 520 C 1600 600, 1950 600, 2200 520"
            data-wiggle="1"
            data-base="-5"
          />
          <path
            d="M-180 700 C 220 640, 700 650, 1180 720 C 1550 780, 1950 770, 2250 710"
            data-wiggle="1"
            data-base="5"
          />
          <path
            d="M-120 880 C 280 840, 720 840, 1200 880 C 1580 910, 1980 910, 2300 880"
            data-wiggle="1"
            data-base="0"
          />
        </g>
      </svg>
    </div>
  );
}