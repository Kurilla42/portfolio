import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ContactModalProvider } from '@/context/contact-modal-context';
import { ContactModal } from '@/components/floating/ContactModal';
import { StickyMobileCTA } from '@/components/floating/StickyMobileCTA';
import { SocialProof } from '@/components/floating/SocialProof';
import { ExitIntentModal } from '@/components/floating/ExitIntentModal';
import { LiveChat } from '@/components/floating/LiveChat';

export const metadata: Metadata = {
  title: 'Thelen Plumbing, Heating, and Air | Twin Cities Comfort Experts',
  description: 'Thelen Plumbing, Heating, and Air provides expert HVAC and plumbing services in Minneapolis, St. Paul, and surrounding areas. 24/7 emergency service guaranteed.',
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
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@700;800&family=Archivo+Narrow:wght@700&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body">
        <div className="paper-grain" />
        <ContactModalProvider>
          {children}
          
          {/* Floating UI Elements */}
          <ContactModal />
          <StickyMobileCTA />
          <SocialProof />
          <LiveChat />
          <ExitIntentModal />
          
          <Toaster />
        </ContactModalProvider>
      </body>
    </html>
  );
}