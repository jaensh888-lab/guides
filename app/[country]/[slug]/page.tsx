import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GuidePage from '@/components/GuidePage';
import { guidesRu } from '@/data/guides-ru';
import { getGuideByCountryAndSlug, getRelatedGuides } from '@/lib/guides';
import { guideAbsoluteUrl, guideCanonicalPath } from '@/lib/seo';
import type { Guide } from '@/types/guide';

interface GuideRouteProps {
  params: { country: Guide['country']; slug: string };
}

export async function generateStaticParams() {
  return guidesRu.map((guide) => ({
    country: guide.country,
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: GuideRouteProps): Promise<Metadata> {
  const guide = getGuideByCountryAndSlug(params.country, params.slug);
  if (!guide) {
    return {
      title: 'Гайд не найден — Yoots Atlas',
      description: 'Эта страница недоступна или ещё не опубликована.',
    };
  }

  const title = guide.seo?.title ?? `${guide.title} — Yoots Atlas`;
  const description = guide.seo?.description ?? guide.summary;
  const absoluteUrl = guideAbsoluteUrl(guide);

  return {
    title,
    description,
    alternates: {
      canonical: guideCanonicalPath(guide),
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: absoluteUrl,
      locale: 'ru_RU',
    },
  };
}

export default function GuideRoute({ params }: GuideRouteProps) {
  const guide = getGuideByCountryAndSlug(params.country, params.slug);

  if (!guide) {
    notFound();
  }

  const relatedGuides = getRelatedGuides(guide);

  return <GuidePage guide={guide} relatedGuides={relatedGuides} />;
}
