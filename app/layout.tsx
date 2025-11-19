import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Layout from '@/components/Layout';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Yoots Atlas Guides',
  description:
    'Живые туристические гайды по ОАЭ и другим направлениям: маршруты, места и транспорт от Yoots Atlas.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
