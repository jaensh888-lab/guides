import type { GuideVideo } from '@/types/guide';

interface GuideVideoSectionProps {
  videos?: GuideVideo[];
}

function renderVideo(video: GuideVideo) {
  if (video.type === 'youtube' && video.youtubeId) {
    return (
      <iframe
        title={video.title ?? 'Видео обзора'}
        src={`https://www.youtube.com/embed/${video.youtubeId}`}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full rounded-2xl border border-slate-200"
      />
    );
  }

  if (video.type === 'file' && video.url) {
    return (
      <video
        controls
        preload="metadata"
        className="aspect-video w-full rounded-2xl border border-slate-200 bg-black"
        title={video.title}
      >
        <source src={video.url} />
        Ваш браузер не поддерживает воспроизведение видео.
      </video>
    );
  }

  return null;
}

export default function GuideVideoSection({ videos }: GuideVideoSectionProps) {
  if (!videos?.length) {
    return null;
  }

  return (
    <section className="space-y-4 rounded-3xl border border-slate-100 bg-white/90 p-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Видео</h2>
        <p className="text-sm text-slate-500">Короткие ролики для быстрого знакомства с локацией.</p>
      </div>
      <div className="space-y-6">
        {videos.map((video) => (
          <div key={video.id} className="space-y-2">
            {renderVideo(video)}
            {video.title && <p className="text-sm text-slate-600">{video.title}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
