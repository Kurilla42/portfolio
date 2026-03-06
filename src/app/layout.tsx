import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ScrollObserver } from "@/components/ScrollObserver";
import { BackgroundContours } from '@/components/BackgroundContours';

export const metadata: Metadata = {
  title: 'JobFlow Landing Pages | Anton Kolesnikov',
  description: 'High-converting landing pages for plumbing and home service businesses. Built for performance and conversion by Anton Kolesnikov.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&family=Space+Mono:wght@400&family=Cormorant+Garamond:ital,wght@1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-accent selection:text-accent-foreground overflow-x-hidden relative bg-[#F5F2EB]">
        {/* Grain Overlay */}
        <div className="noise-overlay" aria-hidden="true" />
        
        <BackgroundContours />
        <ScrollObserver />
        {children}
        <Toaster />
      </body>
    </html>
  );
}