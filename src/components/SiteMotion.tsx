'use client';
import { usePathname } from 'next/navigation';
import { SmoothScroll } from './SmoothScroll';
import { CustomCursor } from './CustomCursor';

export function SiteMotion({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === '/geo' || pathname.startsWith('/geo/')) return <>{children}</>;
  return <><CustomCursor /><SmoothScroll>{children}</SmoothScroll></>;
}
