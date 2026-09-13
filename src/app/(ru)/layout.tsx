import type { Metadata } from 'next';
import '../globals.css';
import { SiteChrome } from "@/components/SiteChrome";

// Root layout русских страниц (/geo). Отдельный от (en), чтобы <html lang="ru"> уходил
// с сервера — раньше корневой layout ставил lang="en", а GeoLang переключал его на
// клиенте, и краулеры видели английский lang на русской странице.
//
// Латинские Inter/Anton/Space Mono сюда не подключаем: на /geo они грузились зря —
// кириллические Oswald/IBM Plex Mono/Inter подключает geo/layout.tsx и подменяет ими
// CSS-переменные внутри div.geo-fonts.

// www, как и в (en): apex редиректит на www (307), canonical должен быть конечным.
const siteUrl = 'https://www.kolesnikovdesign.pro';

// Только общие поля. title/description/og задаёт geo/layout.tsx (title там { absolute }),
// сюда их не дублируем.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  authors: [{ name: 'Anton Kolesnikov' }],
  creator: 'Anton Kolesnikov',
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
    <html lang="ru">
      <body className="antialiased selection:bg-accent selection:text-accent-foreground overflow-x-hidden relative bg-[#eaeaf2]">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
