# Документация проекта Yoots Atlas Guides

## Технологический стек
- Next.js 14 (App Router). SSR/SSG, `generateMetadata`, `generateStaticParams`, sitemap/robots маршруты.
- TypeScript 5.5 + строгая типизация (см. `tsconfig.json` и `types/guide.ts`).
- Tailwind CSS 3.4 для стилизации, `app/globals.css` содержит базовые токены.
- Данные гайдов в `data/guides-ru.ts`, формы взаимодействия агрегируются в `components/*`.

## Структура каталогов
- `app/` — маршруты: главная (`page.tsx`), динамические гайды (`[country]/[slug]/page.tsx`), `layout`, `not-found`, `sitemap`, `robots`.
- `components/` — UI и вспомогательные блоки (`GuidePage`, `GuidesClient`, фильтры, новые `GuideGallery` и `GuideVideoSection`, `SeoJsonLd`, `Layout`).
- `data/` — статичные описания гайдов (в tsv).
- `lib/` — утилиты (`guides.ts` для выборок/related, `seo.ts` с SITE_URL и хелперами).
- `types/` — единственный источник типов (`Guide`, `GuideSection`, `GuideImage/Video` и т.д.).

## Ключевые возможности
- Главная страница каталога с фильтрами, поиском и статическим `generateMetadata`.
- Страница каждого гайда: TOC, быстрые факты, FAQ, похожие гайды, галерея и видео, SEO JSON-LD.
- Сжатая SEO-инфраструктура: `next.config.mjs`, sitemap, robots, canonical и OG.
- AiChatWidget подключается в глобальном Layout для будущего чат-бота.

## Как запускать
```bash
npm install
npm run dev
```
Dev-сервер автоматически переключается на свободный порт. Для прод-сборки используйте `npm run build && npm run start`.

## Данные и локализация
- В `guides-ru.ts` все записи `locale: 'ru'`. Дополнительные языки можно добавить, расширив `guidesRu`.
- Гайды используют mock-данные до подключения реальных источников. Production-контент не правим.

## Медиа
- В `types/guide.ts` описаны `gallery` и `videos`. Файлы кладутся в `public/images/...` (пока placeholders).
- Видео поддерживают YouTube (через `youtubeId`) и прямые файлы (`url`).
