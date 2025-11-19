import type { MetadataRoute } from 'next';
import { guidesRu } from '@/data/guides-ru';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yoots-atlas.example';
  const guideEntries = guidesRu.map((guide) => ({
    url: `${baseUrl}/${guide.country}/${guide.slug}`,
    lastModified: guide.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...guideEntries,
  ];
}
