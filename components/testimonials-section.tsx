'use client';

import { useEffect, useRef, useState } from 'react';
import { creatorTestimonials, type CreatorTestimonial } from '@/lib/testimonials';

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
    displayName: 'Amanda Storytelling Author',
    handle: '@enchanted.quill.c',
    quote: 'CREATOR STORY',
    duration: '0:36',
    videoSrc: '/videos/amanda-storytelling-author-testimonial.mp4',
    posterSrc: '/images/amanda-storytelling-author-testimonial-poster.png',
  },
  {
    displayName: 'ResilientTerrie',
    handle: '@buildresilience',
    quote: 'CREATOR STORY',
    duration: '1:00',
    videoSrc: '/videos/resilientterrie-testimonial.mp4',
    posterSrc: '/images/resilientterrie-testimonial-poster.png',
  },
  {
    displayName: 'Tia | Homeschool Mom Baddie',
    handle: '@homeschoolmombaddie',
    quote: 'CREATOR STORY',
    duration: '0:25',
    videoSrc: '/videos/tia-homeschool-mom-baddie-testimonial.mp4',
    posterSrc: '/images/tia-homeschool-mom-baddie-testimonial-poster.png',
  },
  {
    displayName: 'anonymity_talks',
    handle: '@anonymity_talks',
    quote: 'CREATOR STORY',
    duration: '0:17',
    videoSrc: '/videos/anonymity-talks-testimonial.mp4',
    posterSrc: '/images/anonymity-talks-testimonial-poster.png',
  },
];

export function TestimonialsSection() {
  const [activeVideo, setActiveVideo] = useState<VideoTestimonial | null>(null);
  const [videoRailIndex, setVideoRailIndex] = useState(0);
  const [hasInteractedWithVideoRail, setHasInteractedWithVideoRail] = useState(false);
  const [writtenRailIndex, setWrittenRailIndex] = useState(0);
  const [hasInteractedWithWrittenRail, setHasInteractedWithWrittenRail] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const videoRailRef = useRef<HTMLDivElement>(null);
  const writtenRailRef = useRef<HTMLDivElement>(null);
  const writtenTestimonials = creatorTestimonials.filter((testimonial) => !testimonial.isPlaceholderForDevelopment);

  function getRailIndex(rail: HTMLDivElement, itemCount: number) {
    const firstCard = rail.children[0] as HTMLElement | undefined;
    if (!firstCard) return 0;

    const gap = Number.parseFloat(window.getComputedStyle(rail).columnGap || '0');
    const cardWidth = firstCard.getBoundingClientRect().width + gap;
    if (!cardWidth) return 0;

    return Math.min(itemCount - 1, Math.max(0, Math.round(rail.scrollLeft / cardWidth)));
  }

  function updateVideoRailIndex() {
    const rail = videoRailRef.current;
    if (!rail) return;
    setVideoRailIndex(getRailIndex(rail, videoTestimonials.length));
  }

  function updateWrittenRailIndex() {
    const rail = writtenRailRef.current;
    if (!rail) return;
    setWrittenRailIndex(getRailIndex(rail, writtenTestimonials.length));
  }

  function noteVideoRailInteraction() {
    setHasInteractedWithVideoRail(true);
  }

  function noteWrittenRailInteraction() {
    setHasInteractedWithWrittenRail(true);
  }

  function scrollVideoRail(direction: -1 | 1) {
    const rail = videoRailRef.current;
    const firstCard = rail?.children[0] as HTMLElement | undefined;
    if (!rail || !firstCard) return;

    const gap = Number.parseFloat(window.getComputedStyle(rail).columnGap || '0');
    rail.scrollBy({ left: direction * (firstCard.getBoundingClientRect().width + gap), behavior: 'smooth' });
    noteVideoRailInteraction();
  }

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
        ref={videoRailRef}
        onScroll={updateVideoRailIndex}
        onPointerDown={noteVideoRailInteraction}
        onTouchStart={noteVideoRailInteraction}
        onWheel={noteVideoRailInteraction}
        className="rose-testimonial-scroll -mx-5 mt-8 flex snap-x gap-4 overflow-x-auto px-5 pb-3 md:mx-0 md:gap-5 md:px-0 md:pb-1"
        aria-label="Video testimonials"
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
      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-roseGoldSoft/90 md:hidden">
          Swipe to see more{' '}
          <span className={`inline-block ${hasInteractedWithVideoRail ? '' : 'rose-testimonial-swipe-cue'}`} aria-hidden="true">
            →
          </span>
        </p>
        <p className="text-[10px] font-black tabular-nums tracking-[0.18em] text-roseMuted md:hidden">
          {String(videoRailIndex + 1).padStart(2, '0')} / {String(videoTestimonials.length).padStart(2, '0')}
        </p>
        <div className="ml-auto hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={() => scrollVideoRail(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-roseGold/25 bg-roseBlack/35 text-sm font-black text-roseGold transition hover:border-roseGold/55 hover:bg-roseWine/45 focus-visible:ring-2 focus-visible:ring-roseGold"
            aria-label="Previous creator video"
          >
            ←
          </button>
          <p className="text-[10px] font-black tabular-nums tracking-[0.18em] text-roseMuted">
            {String(videoRailIndex + 1).padStart(2, '0')} / {String(videoTestimonials.length).padStart(2, '0')}
          </p>
          <button
            type="button"
            onClick={() => scrollVideoRail(1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-roseGold/25 bg-roseBlack/35 text-sm font-black text-roseGold transition hover:border-roseGold/55 hover:bg-roseWine/45 focus-visible:ring-2 focus-visible:ring-roseGold"
            aria-label="Next creator video"
          >
            →
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-4 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-roseGold">Written Creator Stories</p>
        </div>
        <div
          ref={writtenRailRef}
          onScroll={updateWrittenRailIndex}
          onPointerDown={noteWrittenRailInteraction}
          onTouchStart={noteWrittenRailInteraction}
          onWheel={noteWrittenRailInteraction}
          className={`rose-testimonial-scroll -mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:gap-5 md:overflow-visible md:px-0 ${
            writtenTestimonials.length === 1 ? 'md:grid md:grid-cols-[minmax(350px,380px)]' : 'md:grid md:grid-cols-3'
          }`}
          aria-label="Written creator stories"
        >
          {writtenTestimonials.map((testimonial, index) => (
            <WrittenTestimonialCard key={testimonial.handle} testimonial={testimonial} index={index} />
          ))}
        </div>
        {writtenTestimonials.length > 1 ? (
          <div className="mt-3 flex items-center justify-between gap-4 md:hidden">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-roseGoldSoft/90">
              Swipe to see more{' '}
              <span
                className={`inline-block ${hasInteractedWithWrittenRail ? '' : 'rose-written-swipe-cue'}`}
                aria-hidden="true"
              >
                →
              </span>
            </p>
            <p className="text-[10px] font-black tabular-nums tracking-[0.18em] text-roseMuted">
              {String(writtenRailIndex + 1).padStart(2, '0')} / {String(writtenTestimonials.length).padStart(2, '0')}
            </p>
          </div>
        ) : null}
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
      <style jsx>{`
        @keyframes roseTestimonialSwipeCue {
          0%,
          68%,
          100% {
            transform: translateX(0);
          }
          34% {
            transform: translateX(7px);
          }
        }

        .rose-testimonial-swipe-cue {
          animation: roseTestimonialSwipeCue 2.6s ease-in-out infinite;
        }

        .rose-written-swipe-cue {
          animation: roseTestimonialSwipeCue 2.6s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .rose-testimonial-swipe-cue,
          .rose-written-swipe-cue {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

function WrittenTestimonialCard({ testimonial, index }: { testimonial: CreatorTestimonial; index: number }) {
  const cardRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const label = testimonial.category.replace(/\s*\+\s*/g, ' • ').toUpperCase();
  const cardDelay = index * 175;
  const initials = testimonial.name
    .split(/\s|_/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('');

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(card);

    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className={`relative flex min-w-[84%] snap-center flex-col overflow-hidden rounded-lg border border-roseGold/20 bg-[linear-gradient(145deg,rgba(58,8,19,0.34),rgba(7,5,5,0.96))] p-5 shadow-[0_14px_38px_rgba(0,0,0,0.2)] transition-all ease-out md:min-h-[310px] md:min-w-0 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${cardDelay}ms`, transitionDuration: '850ms' }}
    >
      <div className="pointer-events-none absolute right-5 top-3 font-editorial text-6xl leading-none text-roseGold/10">“</div>
      <div className="relative z-10 flex gap-1 text-[13px] leading-none text-roseGold" aria-label="Five star testimonial rating">
        {[0, 1, 2, 3, 4].map((starIndex) => (
          <span
            key={starIndex}
            className={`inline-block transition-all ease-out ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            style={{ transitionDelay: `${cardDelay + 260 + starIndex * 60}ms`, transitionDuration: '420ms' }}
          >
            ★
          </span>
        ))}
      </div>
      <p
        className={`relative z-10 mt-4 text-[15px] leading-[1.65] text-roseCream/92 transition-all ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
        style={{ transitionDelay: `${cardDelay + 380}ms`, transitionDuration: '850ms' }}
      >
        “{testimonial.testimonial}”
      </p>
      <div
        className={`relative z-10 mt-5 flex items-center gap-3 border-t border-roseGold/12 pt-4 transition-all ease-out md:mt-auto ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        }`}
        style={{ transitionDelay: `${cardDelay + 680}ms`, transitionDuration: '700ms' }}
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-roseGold/45 bg-[radial-gradient(circle_at_35%_25%,rgba(216,182,106,0.22),rgba(58,8,19,0.88))] text-xs font-black text-roseGold shadow-[0_0_0_3px_rgba(93,12,31,0.32)]">
          {testimonial.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={testimonial.avatar} alt={`${testimonial.name} profile`} className="h-full w-full object-cover object-center" />
          ) : (
            initials
          )}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-black leading-tight text-roseCream">{testimonial.name}</h3>
          <p className="truncate text-xs font-black text-roseGoldSoft">{testimonial.handle}</p>
          <p className="mt-1 truncate text-[9px] font-black uppercase tracking-[0.14em] text-roseMuted">{label}</p>
        </div>
      </div>
    </article>
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
    <article className="min-w-[84%] snap-center md:min-w-[calc((100%_-_40px)/3)] md:shrink-0">
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
