import '@/components/geo/geo-landing.css';
import '@/components/geo/geo-lead-dialog.css';
import '@/components/dayclear/dayclear.css';
import type { Metadata } from 'next';
import { Oswald, IBM_Plex_Mono, Inter } from 'next/font/google';

const oswald = Oswald({ subsets: ['cyrillic', 'latin'], weight: ['500', '600', '700'], variable: '--font-oswald', display: 'swap' });
const plexMono = IBM_Plex_Mono({ subsets: ['cyrillic', 'latin'], weight: ['400', '700'], variable: '--font-plex-mono', display: 'swap' });
const interCyr = Inter({ subsets: ['cyrillic', 'latin'], weight: ['400', '500', '700', '800', '900'], variable: '--font-inter-cyr', display: 'swap' });
const url = 'https://www.kolesnikovdesign.pro/dayclear';
const title = 'Dayclear — отчётность для маркетологов и агентств';
const description = 'Индивидуальная настройка отчётности: данные, пояснения и сохранённые выпуски в одном рабочем процессе.';
export const metadata: Metadata = {
  title: { absolute: title }, description, alternates: { canonical: url },
  openGraph: { type: 'website', url, siteName: 'Kolesnikov Design', title, description, locale: 'ru_RU' },
  twitter: { card: 'summary', title, description },
};
export default function DayclearLayout({ children }: { children: React.ReactNode }) {
  return <div className={`geo-fonts font-sans ${oswald.variable} ${plexMono.variable} ${interCyr.variable}`} style={{ '--font-anton': 'var(--font-oswald)', '--font-space-mono': 'var(--font-plex-mono)', '--font-inter': 'var(--font-inter-cyr)' } as React.CSSProperties}>{children}</div>;
}
