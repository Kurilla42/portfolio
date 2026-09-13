import type { Metadata } from 'next';

const siteUrl = 'https://kolesnikovdesign.pro';

export const metadata: Metadata = {
  title: 'Google Ads, Meta Ads & SEO',
  description:
    'Performance marketing — Google Ads, Meta Ads, and SEO built around tracked revenue and pipeline. Transparent reporting, no lock-in.',
  keywords: [
    'Google Ads management',
    'Meta Ads agency',
    'Facebook ads for business',
    'SEO',
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
    title: 'Google Ads, Meta Ads & SEO',
    description:
      'Turn clicks into paying customers. Google Ads, Meta Ads, and SEO built around tracked revenue and pipeline.',
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
    title: 'Google Ads, Meta Ads & SEO',
    description:
      'Turn clicks into paying customers. Built around tracked revenue and pipeline.',
    images: ['https://i.ibb.co/wFqwsVGc/i-EHXOE8-MWd2v-Ga9-Prmwyjtm35-A.png'],
  },
};

export default function AdwLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
