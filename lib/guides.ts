import { guidesRu } from '@/data/guides-ru';
import { Guide } from '@/types/guide';

export function getAllGuides(locale: 'ru' | 'en' = 'ru'): Guide[] {
  return guidesRu.filter((guide) => guide.locale === locale);
}

export function getGuideByCountryAndSlug(
  country: string,
  slug: string,
  locale: 'ru' | 'en' = 'ru',
): Guide | undefined {
  return getAllGuides(locale).find(
    (guide) => guide.country === country && guide.slug === slug,
  );
}

export function getRelatedGuides(targetId: string, locale: 'ru' | 'en' = 'ru'): Guide[] {
  const guides = getAllGuides(locale).filter((guide) => guide.id !== targetId);
  return guides.slice(0, 3);
}
