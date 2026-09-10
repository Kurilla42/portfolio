import type { Metadata } from 'next';
import { Oswald, IBM_Plex_Mono, Inter } from 'next/font/google';
import { GeoLang } from '@/components/geo/GeoLang';

// Anton и Space Mono из корневого layout без кириллицы — для /geo подключаем
// кириллические аналоги и подменяем ими CSS-переменные, на которые ссылаются
// tailwind-классы font-headline / font-mono / font-sans. Разметка секций при этом
// остаётся 1-в-1 как на /adw.
const oswald = Oswald({
  subsets: ['cyrillic', 'latin'],
  weight: ['500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-plex-mono',
  display: 'swap',
});

const interCyr = Inter({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '700', '800', '900'],
  variable: '--font-inter-cyr',
  display: 'swap',
});

const siteUrl = 'https://kolesnikovdesign.pro';

export const metadata: Metadata = {
  title: 'Аудит AI-видимости — что нейросети отвечают вашему покупателю',
  description:
    'Замер того, что Алиса, GigaChat, ChatGPT, DeepSeek и Gemini отвечают покупателю о вашей нише: доля голоса, ошибки фактов, источники, план работ и контрольный съём через месяц. 25 000 ₽, 3 рабочих дня.',
  keywords: [
    'аудит видимости в нейросетях',
    'AI-видимость',
    'GEO продвижение',
    'AEO',
    'продвижение в ChatGPT',
    'видимость в Алисе',
    'GigaChat',
    'DeepSeek',
    'Антон Колесников',
  ],
  alternates: {
    canonical: `${siteUrl}/geo`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/geo`,
    siteName: 'Kolesnikov Design',
    title: 'Аудит AI-видимости — что нейросети отвечают вашему покупателю',
    description:
      'Замер того, что Алиса, GigaChat, ChatGPT, DeepSeek и Gemini отвечают покупателю о вашей нише: доля голоса, ошибки фактов, источники, план работ и контрольный съём через месяц. 25 000 ₽, 3 рабочих дня.',
    locale: 'ru_RU',
    images: [
      {
        url: `${siteUrl}/og-geo.png`,
        width: 1200,
        height: 630,
        alt: 'Аудит AI-видимости — Антон Колесников',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Аудит AI-видимости — что нейросети отвечают вашему покупателю',
    description:
      'Доля голоса, ошибки фактов, источники, план работ и контрольный съём через месяц. 25 000 ₽, 3 рабочих дня.',
    images: [`${siteUrl}/og-geo.png`],
  },
};

export default function GeoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`geo-fonts ${oswald.variable} ${plexMono.variable} ${interCyr.variable}`}
      style={
        {
          '--font-anton': 'var(--font-oswald)',
          '--font-space-mono': 'var(--font-plex-mono)',
          '--font-inter': 'var(--font-inter-cyr)',
        } as React.CSSProperties
      }
    >
      <GeoLang />
      {children}
    </div>
  );
}
