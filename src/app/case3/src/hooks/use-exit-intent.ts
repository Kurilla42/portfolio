"use client";

import { useEffect, useState } from 'react';

export function useExitIntent() {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const handleMouseOut = (e: MouseEvent) => {
      // Logic: mouse leaves top of viewport
      if (e.clientY <= 0 || e.relatedTarget === null) {
        const hasShown = sessionStorage.getItem('exit-intent-shown');
        if (!hasShown) {
          setIsExiting(true);
          sessionStorage.setItem('exit-intent-shown', 'true');
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseOut);
    return () => {
      document.removeEventListener('mouseleave', handleMouseOut);
    };
  }, []);

  return { isExiting, reset: () => setIsExiting(false) };
}
