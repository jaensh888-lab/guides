import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GuidePage from '@/components/GuidePage';
import { guidesRu } from '@/data/guides-ru';
import { getGuideByCountryAndSlug, getRelatedGuides } from '@/lib/guides';
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
    return {};
  }

  const title = guide.seo?.title ?? `${guide.title} — Yoots Atlas`;
  const description = guide.seo?.description ?? guide.summary;

  return {
    title,
    description,
  };
}

export default function GuideRoute({ params }: GuideRouteProps) {
  const guide = getGuideByCountryAndSlug(params.country, params.slug);

  if (!guide) {
    notFound();
  }

  const relatedGuides = getRelatedGuides(guide.id);

  return <GuidePage guide={guide} relatedGuides={relatedGuides} />;
}
