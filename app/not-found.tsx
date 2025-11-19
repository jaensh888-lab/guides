import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="space-y-4 text-center">
      <h1 className="text-4xl font-bold text-slate-900">Гайд не найден</h1>
      <p className="text-slate-600">Мы ещё не успели опубликовать этот материал. Вернитесь на главную страницу.</p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-700"
      >
        На главную
      </Link>
    </section>
  );
}
