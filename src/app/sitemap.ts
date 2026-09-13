import type { MetadataRoute } from 'next';

// Хост www: Vercel редиректит apex → www (307), sitemap должен отдавать конечные адреса,
// а не редиректящие.
const siteUrl = 'https://www.kolesnikovdesign.pro';

// Даты фиксированные, а не new Date(): иначе lastModified менялся бы на каждой сборке/запросе,
// поисковики перестают ему доверять и перестают использовать как сигнал для переобхода.
// Для / и /adw — дата последнего коммита, трогавшего src/app/page.tsx и src/app/adw
// (git log -1 --format=%cI), для /geo — дата этой правки метаданных.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date('2026-06-08'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/adw`,
      lastModified: new Date('2026-06-08'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/geo`,
      lastModified: new Date('2026-09-13'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];
}
