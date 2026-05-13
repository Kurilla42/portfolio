'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ImageComparisonProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  enableHover?: boolean;
}

export const ImageComparison = ({
  beforeImage,
  afterImage,
  beforeLabel = 'BEFORE',
  afterLabel = 'AFTER',
  className,
  enableHover = true,
}: ImageComparisonProps) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(position);
  }, []);

  useEffect(() => {
    if (isInView) {
      // Small animation to show the slider functionality
      const timeout = setTimeout(() => {
        setSliderPos(40);
        setTimeout(() => setSliderPos(60), 400);
        setTimeout(() => setSliderPos(50), 800);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isInView]);

  const onMouseMove = (e: React.MouseEvent) => {
    if (enableHover || isDragging) {
      handleMove(e.clientX);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const onMouseDown = () => setIsDragging(true);
  const onMouseUp = () => setIsDragging(false);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden select-none cursor-ew-resize group",
        className
      )}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={afterImage}
          alt="After"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-[10px] font-code px-3 py-1 rounded-full uppercase tracking-widest border border-white/10">
          {afterLabel}
        </div>
      </div>

      {/* Before Image (Foreground, clipped) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt="Before"
          fill
          className="object-cover grayscale-[0.3]"
          priority
        />
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white text-[10px] font-code px-3 py-1 rounded-full uppercase tracking-widest border border-white/10">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10 pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        {/* Slider Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-black/5">
          <div className="flex gap-1">
            <div className="w-0.5 h-3 bg-black/20 rounded-full" />
            <div className="w-0.5 h-3 bg-black/20 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
