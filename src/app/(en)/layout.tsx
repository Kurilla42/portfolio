import type {Metadata} from 'next';
import {Anton, Inter, Space_Mono} from 'next/font/google';
import '../globals.css';
import { SiteChrome } from "@/components/SiteChrome";

// Root layout английских страниц (/ и /adw). Русская /geo живёт в группе (ru) со своим
// root layout — так <html lang> выставляется на сервере, а не подменяется скриптом после
// гидрации (краулеры видели lang="en" на русской странице).

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

// Именно www: Vercel отдаёт 307 с apex на www.kolesnikovdesign.pro, поэтому канонический
// хост — www. Иначе canonical/og:url/sitemap указывали бы на редиректящий адрес.
const siteUrl = 'https://www.kolesnikovdesign.pro';

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
    // Без этих директив Google по умолчанию может резать сниппет и показывать превью картинки
    // в уменьшенном размере; -1 = без ограничения.
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
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
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
