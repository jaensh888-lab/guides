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

export function getRelatedGuides(targetGuide: Guide, locale: 'ru' | 'en' = 'ru'): Guide[] {
  const guides = getAllGuides(locale).filter((guide) => guide.id !== targetGuide.id);

  const scored = guides.map((guide) => {
    let score = 0;
    if (guide.country === targetGuide.country) {
      score += 3;
    }
    if (guide.type === targetGuide.type) {
      score += 2;
    }
    if (guide.region && targetGuide.region && guide.region === targetGuide.region) {
      score += 1;
    }
    if (guide.tags.some((tag) => targetGuide.tags.includes(tag))) {
      score += 0.5;
    }
    return { guide, score };
  });

  const sorted = scored
    .sort((a, b) => b.score - a.score)
    .filter((entry) => entry.score > 0)
    .map((entry) => entry.guide);

  if (sorted.length >= 4) {
    return sorted.slice(0, 4);
  }

  const fallback = guides
    .filter((guide) => !sorted.includes(guide))
    .slice(0, 4 - sorted.length);

  return [...sorted, ...fallback];
}
