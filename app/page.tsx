import GuidesClient from '@/components/GuidesClient';
import { guidesRu } from '@/data/guides-ru';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Yoots Atlas</p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Каталог живых туристических гайдов по ОАЭ
        </h1>
        <p className="text-lg text-slate-600">
          Medium-style карточки, фильтры и поиск. Скоро добавим мультиязычность и интеграцию с AI-ассистентом.
        </p>
      </section>
      <GuidesClient guides={guidesRu} />
    </div>
  );
}
