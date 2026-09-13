import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    // www, а не apex: apex редиректит на www (307), sitemap должен лежать на каноническом хосте.
    sitemap: 'https://www.kolesnikovdesign.pro/sitemap.xml',
  };
}
