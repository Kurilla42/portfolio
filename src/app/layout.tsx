import type {Metadata} from 'next';
import {Anton, Inter, Space_Mono} from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";

// Self-hosted fonts via next/font (no render-blocking external stylesheet)
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

const siteUrl = 'https://kolesnikovdesign.pro';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Kolesnikov Design — High-Converting Landing Pages for Plumbers',
    template: '%s | Kolesnikov Design',
  },
  description:
    'Conversion-first landing pages for plumbing and local service businesses in the US. 12+ years in local lead generation — built to turn visitors into calls and form submissions.',
  keywords: [
    'plumbing landing page',
    'landing page for plumbers',
    'local service website',
    'lead generation',
    'conversion landing page',
    'Kolesnikov Design',
  ],
  authors: [{ name: 'Anton Kolesnikov' }],
  creator: 'Anton Kolesnikov',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Kolesnikov Design',
    title: 'High-Converting Landing Pages for Plumbers',
    description:
      'Conversion-first landing pages for plumbing and local service businesses. Built to turn visitors into calls and leads.',
    locale: 'en_US',
    images: [
      {
        url: 'https://i.ibb.co/wFqwsVGc/i-EHXOE8-MWd2v-Ga9-Prmwyjtm35-A.png',
        width: 1200,
        height: 630,
        alt: 'Kolesnikov Design — landing pages for plumbers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'High-Converting Landing Pages for Plumbers',
    description:
      'Conversion-first landing pages for plumbing and local service businesses. Built to turn visitors into calls and leads.',
    images: ['https://i.ibb.co/wFqwsVGc/i-EHXOE8-MWd2v-Ga9-Prmwyjtm35-A.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${anton.variable} ${spaceMono.variable}`}
    >
      <body className="antialiased selection:bg-accent selection:text-accent-foreground overflow-x-hidden relative bg-[#eaeaf2]">
        {/* Yandex.Metrika counter */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=109643428', 'ym');
          ym(109643428, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`}
        </Script>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/109643428" style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </div>
        </noscript>
        {/* /Yandex.Metrika counter */}

        {/* Grain Overlay */}
        <div className="noise-overlay" aria-hidden="true" />

        <CustomCursor />

        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
