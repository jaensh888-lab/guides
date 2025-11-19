import type { Guide } from '@/types/guide';

// TODO: заменить домен на production-URL при деплое.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yoots-atlas.example';

export const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

export function guideCanonicalPath(guide: Guide): string {
  return `/${guide.country}/${guide.slug}`;
}

export function guideAbsoluteUrl(guide: Guide): string {
  return `${SITE_URL}${guideCanonicalPath(guide)}`;
}
