'use client';
import { usePathname } from 'next/navigation';
import { SmoothScroll } from './SmoothScroll';
import { CustomCursor } from './CustomCursor';
import { GeoSmoothScroll } from './geo/GeoSmoothScroll';

export function SiteMotion({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === '/geo' || pathname === '/geo/agency') return <><CustomCursor /><GeoSmoothScroll>{children}</GeoSmoothScroll></>;
  if (pathname === '/geo' || pathname.startsWith('/geo/')) return <>{children}</>;
  return <><CustomCursor /><SmoothScroll>{children}</SmoothScroll></>;
}
