import Image from 'next/image';
import type { GuideImage } from '@/types/guide';

interface GuideGalleryProps {
  images: GuideImage[];
}

export default function GuideGallery({ images }: GuideGalleryProps) {
  if (!images.length) {
    return null;
  }

  return (
    <section className="space-y-4 rounded-3xl border border-slate-100 bg-white/90 p-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Фотогалерея</h2>
        <p className="text-sm text-slate-500">Посмотрите, что вас ждёт на месте.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image) => (
          <figure key={image.id} className="space-y-2">
            <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-slate-100 bg-slate-100">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover transition duration-300 ease-out hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            {(image.caption || image.alt) && (
              <figcaption className="text-sm text-slate-600">{image.caption ?? image.alt}</figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
