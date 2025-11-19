'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AiChatWidget from '@/components/AiChatWidget';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-lg font-semibold tracking-wide text-brand">
            Yoots Atlas
          </Link>
          <nav className="text-sm text-slate-500">
            <span className="hidden sm:inline">Мокап MVP · {pathname}</span>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10">{children}</div>
      </main>
      <footer className="border-t border-slate-200 bg-white/80 text-sm text-slate-500">
        <div className="mx-auto max-w-6xl px-4 py-6">
          © {new Date().getFullYear()} Yoots Atlas. Гиды делаем людьми, усиливаем AI.
        </div>
      </footer>
      <AiChatWidget />
    </div>
  );
}
