import Link from 'next/link';
import SeoJsonLd from '@/components/SeoJsonLd';
import type { Guide } from '@/types/guide';

interface GuidePageProps {
  guide: Guide;
  relatedGuides: Guide[];
}

const guideTypeLabels: Record<Guide['type'], string> = {
  place: 'Место',
  area: 'Район',
  itinerary: 'Маршрут',
  transport: 'Транспорт',
  collection: 'Подборка',
};

function buildQuickFacts(guide: Guide): string[] {
  const facts: string[] = [];
  if (guide.city) {
    facts.push(`Где: ${guide.city}${guide.region ? `, ${guide.region}` : ''}`);
  } else {
    facts.push(`Страна: ${guide.country.toUpperCase()}`);
  }
  facts.push(`Тип: ${guideTypeLabels[guide.type]}`);
  if (guide.durationCategory) {
    const map: Record<NonNullable<Guide['durationCategory']>, string> = {
      short: 'до 2 часов',
      half_day: 'половина дня',
      day: 'целый день',
      multi_day: 'несколько дней',
    };
    facts.push(`Длительность: ${map[guide.durationCategory]}`);
  }
  if (guide.budgetCategory) {
    const map: Record<NonNullable<Guide['budgetCategory']>, string> = {
      budget: 'бюджетно',
      mid: 'средний бюджет',
      premium: 'премиум',
    };
    facts.push(`Бюджет: ${map[guide.budgetCategory]}`);
  }
  if (guide.transportOptions?.length) {
    facts.push(`Как добраться: ${guide.transportOptions.join(', ')}`);
  }
  if (guide.kidsAges?.length) {
    facts.push(`С детьми: ${guide.kidsAges.join(', ')}`);
  }
  if (guide.tags.length) {
    facts.push(`Теги: ${guide.tags.join(', ')}`);
  }
  facts.push(`Обновлено: ${new Date(guide.updatedAt).toLocaleDateString('ru-RU')}`);
  return facts.slice(0, 7);
}

function buildJsonLd(guide: Guide) {
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Guide',
    name: guide.title,
    description: guide.summary,
    inLanguage: guide.locale,
    dateModified: guide.updatedAt,
    url: `https://yoots-atlas.example/${guide.country}/${guide.slug}`,
  };

  if (guide.type === 'place' && guide.city) {
    base.itemReviewed = {
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

  if (guide.faq?.length) {
    base.mainEntity = guide.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    }));
    base['@type'] = ['Guide', 'FAQPage'];
  }

  return base;
}

export default function GuidePage({ guide, relatedGuides }: GuidePageProps) {
  const quickFacts = buildQuickFacts(guide);
  const jsonLd = buildJsonLd(guide);

  return (
    <article className="space-y-10">
      <SeoJsonLd data={jsonLd} />
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          {guideTypeLabels[guide.type]}
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">{guide.title}</h1>
        {guide.subtitle && <p className="text-xl text-slate-600">{guide.subtitle}</p>}
        <p className="text-lg text-slate-700">{guide.summary}</p>
      </div>
      <section className="rounded-3xl border border-slate-200 bg-white/80 p-6">
        <h2 className="text-lg font-semibold text-slate-900">Кратко</h2>
        <ul className="mt-4 list-disc space-y-1 pl-6 text-slate-600">
          {quickFacts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </section>
      <section className="space-y-6">
        {guide.sections.map((section) => (
          <div key={section.id} className="rounded-3xl border border-slate-100 bg-white/60 p-6">
            <h3 className="text-2xl font-semibold text-slate-900">{section.title}</h3>
            <p className="mt-3 whitespace-pre-line text-slate-700">{section.body}</p>
          </div>
        ))}
      </section>
      {guide.faq && (
        <section className="rounded-3xl border border-slate-200 bg-white/70 p-6">
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
      <section className="rounded-3xl border border-slate-100 bg-white/60 p-6">
        <h2 className="text-2xl font-semibold text-slate-900">Похожие гайды</h2>
        <p className="mt-2 text-sm text-slate-500">
          Пока просто подборка, позже подключим реальные рекомендации.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
          {relatedGuides.map((related) => (
            <li key={related.id}>
              <Link href={`/${related.country}/${related.slug}`} className="text-brand hover:text-brand-light">
                {related.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
