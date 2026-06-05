import type { Metadata } from 'next';

const siteUrl = 'https://kolesnikovdesign.pro';

export const metadata: Metadata = {
  title: 'Google Ads, Meta Ads & SEO for Local Business',
  description:
    'Performance marketing for local businesses — Google Ads, Meta Ads, and Local SEO with Google Business Profile. Every campaign built around tracked calls and revenue. Transparent reporting, no lock-in.',
  keywords: [
    'Google Ads management',
    'Meta Ads agency',
    'Facebook ads for local business',
    'local SEO',
    'Google Business Profile optimization',
    'PPC management',
    'lead generation',
    'Kolesnikov Design',
  ],
  alternates: {
    canonical: `${siteUrl}/adw`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/adw`,
    siteName: 'Kolesnikov Design',
    title: 'Google Ads, Meta Ads & SEO for Local Business',
    description:
      'Turn clicks into paying customers. Google Ads, Meta Ads, and Local SEO built around tracked calls and revenue.',
    locale: 'en_US',
    images: [
      {
        url: 'https://i.ibb.co/wFqwsVGc/i-EHXOE8-MWd2v-Ga9-Prmwyjtm35-A.png',
        width: 1200,
        height: 630,
        alt: 'Kolesnikov Design — advertising & SEO for local business',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Ads, Meta Ads & SEO for Local Business',
    description:
      'Turn clicks into paying customers. Built around tracked calls and revenue.',
    images: ['https://i.ibb.co/wFqwsVGc/i-EHXOE8-MWd2v-Ga9-Prmwyjtm35-A.png'],
  },
};

export default function AdwLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
