import type { MetadataRoute } from 'next';
import { guidesRu } from '@/data/guides-ru';
import { SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const guideEntries = guidesRu.map((guide) => ({
    url: `${SITE_URL}/${guide.country}/${guide.slug}`,
    lastModified: guide.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...guideEntries,
  ];
}
