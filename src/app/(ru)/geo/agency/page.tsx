import type { Metadata } from 'next';
import { GeoLanding } from '@/components/geo/GeoLanding';
import { GeoJsonLd } from '@/components/geo/GeoJsonLd';
import { agencyTitle as title, agencyDescription as description } from '@/components/geo/geo-content';
const url = 'https://www.kolesnikovdesign.pro/geo/agency';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: { absolute: title }, description, alternates: { canonical: url },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: { title, description, url, type: 'website', locale: 'ru_RU', images: [{ url: '/geo/agency/og', width: 1200, height: 630, alt: title }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/geo/agency/og'] },
};
export default function GeoAgencyPage() { return <><GeoJsonLd segment="agency" /><GeoLanding segment="agency" /></>; }
