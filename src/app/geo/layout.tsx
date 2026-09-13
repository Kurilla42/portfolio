import type { Metadata } from 'next';
import { Oswald, IBM_Plex_Mono, Inter } from 'next/font/google';
import { GeoLang } from '@/components/geo/GeoLang';
import { geoTitle, geoDescription } from '@/components/geo/GeoJsonLd';

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

// www, как и в корневом layout: apex редиректит на www (307), canonical должен быть конечным.
const siteUrl = 'https://www.kolesnikovdesign.pro';

// og:description длиннее meta description (~190 символов): соцсети и мессенджеры не режут его
// на 160, а тут есть место для «в ответах» и «о вас».
const ogDescription =
  'Что Алиса, GigaChat, ChatGPT, DeepSeek и Gemini отвечают вашему покупателю: где вас нет в ответах, какие ошибки о вас слышит покупатель, сколько рублей уходит мимо. От 25 000 ₽, 3 рабочих дня.';

export const metadata: Metadata = {
  // absolute — иначе корневой шаблон приклеивает « | Kolesnikov Design», и title растёт до 81
  // символа; сейчас 62. title/description живут в GeoJsonLd, чтобы WebPage.name совпадал с ними.
  title: { absolute: geoTitle },
  description: geoDescription,
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
    title: geoTitle,
    description: ogDescription,
    locale: 'ru_RU',
    images: [
      {
        url: `${siteUrl}/og-geo.png`,
        width: 1200,
        height: 630,
        alt: 'Аудит AI-видимости бизнеса в нейросетях — обложка страницы',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: geoTitle,
    description: geoDescription,
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
      {/* React 19 поднимает эти <link> в <head>. preconnect к i.ibb.co — оттуда картинки секций
          и финального блока; dns-prefetch к Метрике — её скрипт грузится afterInteractive из
          корневого layout, полный preconnect ради него не нужен. */}
      <link rel="preconnect" href="https://i.ibb.co" />
      <link rel="dns-prefetch" href="https://mc.yandex.ru" />
      <GeoLang />
      {children}
    </div>
  );
}
