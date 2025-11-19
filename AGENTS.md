# Repository Guidelines

## Project Structure & Module Organization
The Next.js App Router source lives in `app/`, with route segments, layouts, and top-level metadata. Shared UI primitives (cards, grids, hero blocks) sit in `components/`, while `data/` holds locale-specific guide content such as `guides-ru.ts`. Utility hooks and helpers belong in `lib/`, and reusable TypeScript contracts stay in `types/`. Static styling pipelines are configured via `tailwind.config.ts` and `postcss.config.mjs`. Keep assets close to their consumers; co-locate route-specific media under the matching folder inside `app/`.

## Build, Test, and Development Commands
- `npm install` – synchronize dependencies before any work.
- `npm run dev` – start the local dev server; rename `next.config.ts` to `next.config.mjs` (or `.js`) first because Next.js 14 only reads JS configs.
- `npm run build` – produce the optimized production bundle.
- `npm run start` – serve the last build for smoke-testing.
- `npm run lint` – execute Next.js ESLint rules with the repo's `eslint.config.mjs`.

## Coding Style & Naming Conventions
Use TypeScript with ES2022 modules, 2-space indentation, and prefer const/arrow functions for React Server Components. Components are PascalCase (`GuideCard.tsx`), hooks are camelCase (`useGuideFilters.ts`), and data files use kebab-case with locale suffixes (`guides-ru.ts`). Compose styling with Tailwind utility classes; add shared patterns to `globals.css` sparingly. Run `npm run lint` before committing to enforce the Next + TypeScript + Tailwind rule set.

## Testing Guidelines
No automated tests exist yet, so add Jest or Playwright suites under `__tests__/` when contributing complex features. Name specs after the component or route they cover (`guide-card.spec.ts`). For now, smoke-test new flows manually via `npm run dev` and capture console/network errors before opening a PR. When adding tests, document how to run them inside the PR description.

## Commit & Pull Request Guidelines
Git history follows Conventional Commits (`feat: scaffold yoots atlas guides mvp`). Use imperative, lowercase verbs and group related file changes together. Every PR should describe the motivation, list key changes, mention any config updates (e.g., renaming `next.config.ts`), and attach screenshots or recordings for UI-facing work. Reference GitHub issues with `Fixes #ID` when applicable, and ensure the branch is rebased on main before requesting review.

## Configuration & Security Tips
Do not commit secrets; prefer `.env.local` entries and document required keys inside the PR. When rotating configs, update `next.config.mjs`, `tailwind.config.ts`, and `tsconfig.json` coherently so the deployment pipeline (Vercel/Node 18+) stays aligned. Remove unused dependencies promptly to avoid the vulnerabilities noted by `npm audit`.
