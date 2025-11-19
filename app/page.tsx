import type { Metadata } from 'next';
import GuidesClient from '@/components/GuidesClient';
import { guidesRu } from '@/data/guides-ru';

const HOME_TITLE = 'Yoots Atlas — живые туристические гайды по ОАЭ';
const HOME_DESCRIPTION =
  'Каталог русскоязычных гайдов: подборки, маршруты, фильтры по детям и транспорту, мгновенный поиск.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      type: 'website',
      url: '/',
    },
  };
}

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Yoots Atlas</p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Живые туристические гайды по Дубаю и всему ОАЭ
        </h1>
        <p className="text-lg text-slate-600">
          Medium-стиль подачи: структурированные карточки, фильтры под конкретные сценарии и быстрый поиск
          по тегам. Всё, чтобы легко спланировать поездку и подготовиться к будущему AI-боту.
        </p>
      </section>
      <GuidesClient guides={guidesRu} />
    </div>
  );
}
