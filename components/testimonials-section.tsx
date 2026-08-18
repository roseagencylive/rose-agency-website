'use client';

import { useEffect, useRef, useState } from 'react';
import { creatorTestimonials } from '@/lib/testimonials';

type VideoTestimonial = {
  displayName?: string;
  handle: string;
  quote: string;
  duration: string;
  videoSrc?: string;
  posterSrc?: string;
};

const videoTestimonials: VideoTestimonial[] = [
  {
    displayName: 'Kola G | Becoming Her',
    handle: '@thekolagway',
    quote: 'CREATOR STORY',
    duration: '1:19',
    videoSrc: '/videos/kola-g-testimonial.mp4',
    posterSrc: '/images/kola-g-testimonial-poster.png',
  },
  {
    handle: '@creator_coming_soon',
    quote: 'Real creator video testimonial placeholder.',
    duration: '0:00',
  },
  {
    handle: '@creator_coming_soon',
    quote: 'Real creator video testimonial placeholder.',
    duration: '0:00',
  },
];

export function TestimonialsSection() {
  const [activeVideo, setActiveVideo] = useState<VideoTestimonial | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const savedWrittenTestimonialsCount = creatorTestimonials.length;

  useEffect(() => {
    if (!activeVideo) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActiveVideo(null);
      }
    }

    window.addEventListener('keydown', closeOnEscape);

    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [activeVideo]);

  useEffect(() => {
    if (!activeVideo) {
      modalVideoRef.current?.pause();
    }
  }, [activeVideo]);

  return (
    <section aria-labelledby="creator-proof-heading" className="relative mx-auto max-w-7xl px-5 py-10 md:py-12">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-roseGold md:text-xs">
          REAL STORIES. REAL RESULTS.
        </p>
        <h2 id="creator-proof-heading" className="font-editorial text-4xl font-bold leading-tight text-roseCream md:text-5xl">
          Hear From Our Creators
        </h2>
        <p className="mt-3 text-base font-bold text-roseGoldSoft md:text-lg">Real growth. Real impact.</p>
      </div>

      <div
        className="rose-testimonial-scroll -mx-5 mt-8 flex snap-x gap-4 overflow-x-auto px-5 pb-3 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0"
        aria-label="Video testimonial placeholders"
      >
        {videoTestimonials.map((testimonial, index) => (
          <VideoTestimonialCard
            key={`${testimonial.handle}-${index}`}
            testimonial={testimonial}
            index={index}
            onOpen={() => {
              if (testimonial.videoSrc) {
                setActiveVideo(testimonial);
              }
            }}
          />
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-roseGold/15 bg-roseCream/[0.025] px-5 py-5 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-roseGold">Written Creator Stories</p>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-roseMuted">
          Reserved for real written testimonials. {savedWrittenTestimonialsCount > 0 ? 'Approved written creator stories are preserved for this section.' : 'Real written stories will be added here.'}
        </p>
      </div>

      {activeVideo?.videoSrc ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-roseBlack/88 px-5 py-8 backdrop-blur"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeVideo.handle} video testimonial`}
          onClick={() => setActiveVideo(null)}
        >
          <div className="relative w-full max-w-[420px]" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="absolute -right-2 -top-12 flex h-10 w-10 items-center justify-center rounded-full border border-roseGold/30 bg-roseBlack text-lg font-black text-roseGold transition hover:border-roseGold hover:bg-roseWine focus-visible:ring-2 focus-visible:ring-roseGold"
              aria-label="Close video testimonial"
            >
              ×
            </button>
            <div className="overflow-hidden rounded-lg border border-roseGold/30 bg-roseInk shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
              <video
                ref={modalVideoRef}
                src={activeVideo.videoSrc}
                poster={activeVideo.posterSrc}
                className="aspect-[9/16] max-h-[82vh] w-full bg-roseBlack object-contain"
                controls
                playsInline
                preload="metadata"
                aria-label={`${activeVideo.handle} video testimonial`}
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function VideoTestimonialCard({
  testimonial,
  index,
  onOpen,
}: {
  testimonial: VideoTestimonial;
  index: number;
  onOpen: () => void;
}) {
  const hasVideo = Boolean(testimonial.videoSrc);

  return (
    <article className="min-w-[86%] snap-center md:min-w-0">
      <button
        type="button"
        onClick={onOpen}
        disabled={!hasVideo}
        className="group relative block w-full overflow-hidden rounded-lg border border-roseGold/20 bg-[linear-gradient(145deg,rgba(58,8,19,0.86),rgba(7,5,5,0.96))] text-left shadow-[0_18px_60px_rgba(0,0,0,0.28)] transition hover:-translate-y-1 hover:border-roseGold/45 hover:shadow-[0_22px_70px_rgba(216,182,106,0.09)] focus-visible:ring-2 focus-visible:ring-roseGold disabled:cursor-default disabled:hover:translate-y-0"
        aria-label={hasVideo ? `Play ${testimonial.handle} video testimonial` : `Video testimonial placeholder ${index + 1}`}
      >
        <div className="relative aspect-[9/14] bg-roseWine/70">
          {testimonial.posterSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={testimonial.posterSrc} alt={`${testimonial.handle} video poster`} className="h-full w-full object-cover object-center" />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center px-8 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-roseGold/30 bg-roseBlack/45 font-editorial text-2xl font-bold text-roseGold">
                {index + 1}
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-roseGold">Video Placeholder</p>
              <p className="mt-2 text-sm leading-6 text-roseMuted">Real creator story coming soon.</p>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,5,5,0.08),transparent_46%,rgba(7,5,5,0.72))]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-roseGold/35 bg-roseBlack/70 text-lg text-roseGold shadow-[0_16px_45px_rgba(0,0,0,0.34)] backdrop-blur transition group-hover:scale-105 group-hover:border-roseGold">
              ▶
            </span>
          </div>
          <span className="absolute bottom-3 right-3 rounded-full border border-roseGold/25 bg-roseBlack/70 px-2 py-1 text-[10px] font-black text-roseGold backdrop-blur">
            {testimonial.duration}
          </span>
        </div>
      </button>
      <div className="mt-4">
        {testimonial.displayName ? (
          <p className="text-base font-black leading-tight text-roseCream">{testimonial.displayName}</p>
        ) : null}
        <p className="text-sm font-black text-roseGoldSoft">{testimonial.handle}</p>
        <p className="mt-2 text-sm leading-6 text-roseMuted">“{testimonial.quote}”</p>
      </div>
    </article>
  );
}
