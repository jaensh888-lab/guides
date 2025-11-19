import Link from 'next/link';
import TagChip from '@/components/TagChip';
import type { Guide } from '@/types/guide';

interface GuideCardProps {
  guide: Guide;
}

const guideTypeLabels: Record<Guide['type'], string> = {
  place: 'Локация',
  area: 'Район',
  itinerary: 'Маршрут',
  transport: 'Транспорт',
  collection: 'Коллекция',
};

export default function GuideCard({ guide }: GuideCardProps) {
  return (
    <Link
      href={`/${guide.country}/${guide.slug}`}
      className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-brand">
        <span>{guideTypeLabels[guide.type]}</span>
        {guide.region && <span>• {guide.region}</span>}
      </div>
      <h3 className="mt-3 text-xl font-semibold text-slate-900">{guide.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{guide.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {guide.tags.slice(0, 3).map((tag) => (
          <TagChip key={tag} label={tag} />
        ))}
      </div>
      <dl className="mt-4 text-xs text-slate-500">
        <div className="flex gap-2">
          <dt className="font-medium">Обновлено:</dt>
          <dd>{new Date(guide.updatedAt).toLocaleDateString('ru-RU')}</dd>
        </div>
        {guide.kidsAges && (
          <div className="flex gap-2">
            <dt className="font-medium">С детьми:</dt>
            <dd>{guide.kidsAges.join(', ')}</dd>
          </div>
        )}
      </dl>
    </Link>
  );
}
