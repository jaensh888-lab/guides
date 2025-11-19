import GuideCard from '@/components/GuideCard';
import type { Guide } from '@/types/guide';

interface GuideListProps {
  guides: Guide[];
}

export default function GuideList({ guides }: GuideListProps) {
  if (!guides.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-10 text-center text-slate-500">
        По запросу ничего не нашли. Попробуйте снять фильтры.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {guides.map((guide) => (
        <GuideCard key={guide.id} guide={guide} />
      ))}
    </div>
  );
}
