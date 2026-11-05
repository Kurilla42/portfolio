'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
export function GeoRouteTracking() {
  const pathname = usePathname();
  const previous = useRef(pathname);
  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    const ym = (window as unknown as { ym?: (id: number, action: string, url: string) => void }).ym;
    try { ym?.(109643428, 'hit', `${location.origin}${pathname}`); } catch {}
  }, [pathname]);
  return null;
}
