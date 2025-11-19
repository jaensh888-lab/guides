import Link from 'next/link';
import { guideAbsoluteUrl, SITE_URL } from '@/lib/seo';
import GuideGallery from '@/components/GuideGallery';
import GuideVideoSection from '@/components/GuideVideoSection';
import SeoJsonLd from '@/components/SeoJsonLd';
import type { Guide } from '@/types/guide';

interface GuidePageProps {
  guide: Guide;
  relatedGuides: Guide[];
}

const guideTypeLabels: Record<Guide['type'], string> = {
  place: 'Локация',
  area: 'Район',
  itinerary: 'Маршрут',
  transport: 'Транспорт',
  collection: 'Подборка',
};

const durationLabels: Record<NonNullable<Guide['durationCategory']>, string> = {
  short: 'до 2 часов',
  half_day: 'половина дня',
  day: 'целый день',
  multi_day: 'несколько дней',
};

const budgetLabels: Record<NonNullable<Guide['budgetCategory']>, string> = {
  budget: 'экономный формат',
  mid: 'средний бюджет',
  premium: 'премиум-впечатления',
};

const transportLabels: Record<NonNullable<Guide['transportOptions']>[number], string> = {
  metro: 'метро',
  bus: 'автобус',
  car: 'автомобиль',
  taxi: 'такси',
  transfer: 'трансфер',
};

function buildQuickFacts(guide: Guide): string[] {
  const facts: string[] = [];

  if (guide.city) {
    facts.push(`Где: ${guide.city}${guide.region ? `, ${guide.region}` : ''}`);
  } else {
    facts.push(`Страна: ${guide.country.toUpperCase()}`);
  }

  facts.push(`Формат: ${guideTypeLabels[guide.type]}`);

  if (guide.durationCategory) {
    facts.push(`Сколько времени: ${durationLabels[guide.durationCategory]}`);
  }

  if (guide.budgetCategory) {
    facts.push(`Бюджет: ${budgetLabels[guide.budgetCategory]}`);
  }

  if (guide.transportOptions?.length) {
    facts.push(
      `Как добраться: ${guide.transportOptions.map((option) => transportLabels[option]).join(', ')}`,
    );
  }

  if (guide.kidsAges?.length) {
    facts.push(`С детьми: ${guide.kidsAges.join(', ')}`);
  }

  if (guide.tags.length) {
    facts.push(`Теги: ${guide.tags.join(', ')}`);
  }

  facts.push(`Обновлено: ${new Date(guide.updatedAt).toLocaleDateString('ru-RU')}`);

  return facts;
}

function buildJsonLd(guide: Guide) {
  const url = guideAbsoluteUrl(guide);
  const description = guide.seo?.description ?? guide.summary;
  const mainEntity: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['Article', 'Guide'],
    headline: guide.title,
    name: guide.title,
    description,
    inLanguage: guide.locale ?? 'ru',
    dateModified: guide.updatedAt,
    url,
    mainEntityOfPage: url,
    author: {
      '@type': 'Organization',
      name: 'Yoots Atlas',
    },
  };

  if (guide.heroImageUrl) {
    mainEntity.image = guide.heroImageUrl.startsWith('http')
      ? guide.heroImageUrl
      : `${SITE_URL}${guide.heroImageUrl}`;
  }

  if (guide.type === 'place') {
    mainEntity.about = {
      '@type': 'TouristAttraction',
      name: guide.title,
      address: {
        '@type': 'PostalAddress',
        addressLocality: guide.city,
        addressRegion: guide.region,
        addressCountry: guide.country.toUpperCase(),
      },
    };
  }

  const payloads: Record<string, unknown>[] = [mainEntity];

  if (guide.faq?.length) {
    payloads.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: guide.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  return payloads;
}

export default function GuidePage({ guide, relatedGuides }: GuidePageProps) {
  const quickFacts = buildQuickFacts(guide);
  const tocSections = guide.sections.filter((section) => section.title.trim().length > 0);
  const jsonLd = buildJsonLd(guide);

  return (
    <article className="mx-auto max-w-3xl space-y-10 py-6 sm:py-10">
      <SeoJsonLd data={jsonLd} />
      <header className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          {guideTypeLabels[guide.type]}
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">{guide.title}</h1>
        {guide.subtitle && <p className="text-xl text-slate-600">{guide.subtitle}</p>}
        <p className="text-lg leading-relaxed text-slate-700">{guide.summary}</p>
      </header>

      {tocSections.length > 1 && (
        <nav
          className="rounded-3xl border border-slate-200 bg-white/80 p-6"
          aria-label="Оглавление гайда"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Оглавление</p>
          <ul className="mt-4 space-y-2 text-slate-700">
            {tocSections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-brand hover:text-brand-light">
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <section className="rounded-3xl border border-slate-200 bg-white/90 p-6">
        <h2 className="text-lg font-semibold text-slate-900">Кратко по делу</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
          {quickFacts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-6">
        {guide.sections.map((section) => (
          <div
            key={section.id}
            id={section.id}
            className="rounded-3xl border border-slate-100 bg-white/90 p-6"
          >
            <h3 className="text-2xl font-semibold text-slate-900">{section.title}</h3>
            <p className="mt-3 whitespace-pre-line text-slate-700 leading-relaxed">{section.body}</p>
          </div>
        ))}
      </section>

      {guide.gallery?.length ? <GuideGallery images={guide.gallery} /> : null}

      {guide.videos?.length ? <GuideVideoSection videos={guide.videos} /> : null}

      {guide.faq && (
        <section className="rounded-3xl border border-slate-200 bg-white/90 p-6">
          <h2 className="text-2xl font-semibold text-slate-900">FAQ</h2>
          <div className="mt-4 space-y-4">
            {guide.faq.map((item) => (
              <details key={item.question} className="rounded-2xl border border-slate-100 bg-white p-4">
                <summary className="cursor-pointer font-medium text-slate-800">{item.question}</summary>
                <p className="mt-2 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {relatedGuides.length > 0 && (
        <section className="space-y-4 rounded-3xl border border-slate-100 bg-white/90 p-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Похожие гайды</h2>
            <p className="mt-2 text-sm text-slate-500">
              Ещё материалы по стране и формату, чтобы углубиться в тему.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {relatedGuides.map((related) => (
              <Link
                key={related.id}
                href={`/${related.country}/${related.slug}`}
                className="block rounded-2xl border border-slate-200 bg-white/70 p-4 transition hover:-translate-y-0.5 hover:border-brand hover:shadow-sm"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-brand">
                  {guideTypeLabels[related.type]}
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{related.title}</p>
                <p className="mt-2 text-sm text-slate-600">{related.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
