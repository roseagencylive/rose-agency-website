'use client';

import { type TouchEvent, useEffect, useRef, useState } from 'react';

const meetAleahClips = [
  {
    src: '/videos/meet-aleah-live.mp4',
    poster: '/images/meet-aleah-live-poster.png',
    label: 'Aleah • LIVE',
    descriptor: 'Creator • Coach • Founder',
    ariaLabel: 'Aleah on TikTok LIVE',
  },
  {
    src: '/videos/meet-aleah-live-2.mp4',
    poster: '/images/meet-aleah-live-2-poster.png',
    label: 'LIVE MOMENT',
    descriptor: 'Inside the LIVE experience',
    ariaLabel: 'Aleah creating during a LIVE-style moment',
  },
  {
    src: '/videos/meet-aleah-live-3.mp4',
    poster: '/images/meet-aleah-live-3-poster.png',
    label: 'COMMUNITY IN ACTION',
    descriptor: 'Real-time connection + support',
    ariaLabel: 'Aleah in a community creator call',
  },
  {
    src: '/videos/meet-aleah-live-4.mp4',
    poster: '/images/meet-aleah-live-4-poster.png',
    label: 'INSIDE THE COACHING',
    descriptor: 'A look at what creators learn',
    ariaLabel: 'Aleah teaching with creator analytics',
  },
];

export function MeetAleahVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeClipIndex, setActiveClipIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'next' | 'previous'>('next');
  const activeClip = meetAleahClips[activeClipIndex];
  const hasMultipleClips = meetAleahClips.length > 1;
  const activeSlideNumber = String(activeClipIndex + 1).padStart(2, '0');
  const totalSlideNumber = String(meetAleahClips.length).padStart(2, '0');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    function syncMotionPreference() {
      setReducedMotion(mediaQuery.matches);
    }

    syncMotionPreference();
    mediaQuery.addEventListener('change', syncMotionPreference);

    return () => mediaQuery.removeEventListener('change', syncMotionPreference);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.22 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    video.muted = !soundEnabled;

    if (!inView || !playing) {
      video.pause();
    } else {
      void video.play().catch(() => undefined);
    }
  }, [activeClipIndex, inView, playing, reducedMotion, soundEnabled]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = !soundEnabled;
  }, [soundEnabled]);

  function togglePlayback() {
    const video = videoRef.current;

    if (!video) return;

    if (playing) {
      video.pause();
      setPlaying(false);
    } else {
      setPlaying(true);
      if (inView && !reducedMotion) {
        void video.play().catch(() => undefined);
      }
    }
  }

  function toggleSound() {
    const video = videoRef.current;

    setSoundEnabled((current) => {
      const nextValue = !current;

      if (video) {
        video.muted = !nextValue;

        if (nextValue && inView && !reducedMotion) {
          setPlaying(true);
          void video.play().catch(() => undefined);
        }
      }

      return nextValue;
    });
  }

  function goToClip(nextIndex: number) {
    if (!hasMultipleClips) return;

    const video = videoRef.current;
    const normalizedIndex = (nextIndex + meetAleahClips.length) % meetAleahClips.length;

    if (normalizedIndex === activeClipIndex) return;

    video?.pause();
    setSlideDirection(normalizedIndex > activeClipIndex || (activeClipIndex === meetAleahClips.length - 1 && normalizedIndex === 0) ? 'next' : 'previous');
    setActiveClipIndex(normalizedIndex);
    setPlaying(true);
  }

  function handleClipEnd() {
    if (hasMultipleClips) {
      goToClip(activeClipIndex + 1);
    }
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchStartRef.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (!hasMultipleClips || touchStartRef.current === null) return;

    const touchEnd = event.changedTouches[0]?.clientX;

    if (touchEnd === undefined) return;

    const distance = touchStartRef.current - touchEnd;
    touchStartRef.current = null;

    if (Math.abs(distance) < 44) return;

    goToClip(distance > 0 ? activeClipIndex + 1 : activeClipIndex - 1);
  }

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-[360px] overflow-hidden rounded-lg border border-roseGold/25 bg-roseInk shadow-[0_24px_90px_rgba(0,0,0,0.35)] md:max-w-[390px]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <style>
        {`
          @keyframes roseSlideNext {
            from { opacity: 0.7; transform: translateX(12%); }
            to { opacity: 1; transform: translateX(0); }
          }

          @keyframes roseSlidePrevious {
            from { opacity: 0.7; transform: translateX(-12%); }
            to { opacity: 1; transform: translateX(0); }
          }

          @media (prefers-reduced-motion: no-preference) {
            .rose-slide-next {
              animation: roseSlideNext 420ms ease both;
            }

            .rose-slide-previous {
              animation: roseSlidePrevious 420ms ease both;
            }
          }
        `}
      </style>
      <div className="aspect-[9/16] overflow-hidden rounded-lg bg-roseWine">
        {reducedMotion ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={activeClip.poster}
            alt={activeClip.ariaLabel}
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <video
            key={activeClip.src}
            ref={videoRef}
            className={`h-full w-full object-cover object-center ${slideDirection === 'next' ? 'rose-slide-next' : 'rose-slide-previous'}`}
            src={activeClip.src}
            poster={activeClip.poster}
            autoPlay
            loop={!hasMultipleClips}
            muted={!soundEnabled}
            playsInline
            preload="metadata"
            aria-label={activeClip.ariaLabel}
            onEnded={handleClipEnd}
          />
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgba(7,5,5,0.72))]" />
      {hasMultipleClips ? (
        <>
          <div className="pointer-events-none absolute left-2 right-2 top-2 z-10 md:left-4 md:right-4 md:top-4">
            <div className="grid grid-cols-4 gap-1.5">
              {meetAleahClips.map((clip, index) => (
                <div key={clip.src} className="h-0.5 overflow-hidden rounded-full bg-roseCream/25">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      index === activeClipIndex
                        ? 'w-full bg-roseGold'
                        : index < activeClipIndex
                          ? 'w-full bg-roseCream/55'
                          : 'w-0 bg-roseGold/40'
                    }`}
                  />
                </div>
              ))}
            </div>
            <div className="mt-2 inline-flex rounded-full border border-roseGold/25 bg-roseBlack/65 px-2 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-roseCream backdrop-blur md:text-[10px]">
              <span className="text-roseGold">{activeSlideNumber}</span>
              <span className="mx-1 text-roseCream/55">/</span>
              <span>{totalSlideNumber}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => goToClip(activeClipIndex - 1)}
            className="absolute bottom-14 left-0 top-14 z-10 w-1/2 cursor-pointer bg-transparent focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-roseGold"
            aria-label="Show previous Meet Aleah story"
          />
          <button
            type="button"
            onClick={() => goToClip(activeClipIndex + 1)}
            className="absolute bottom-14 right-0 top-14 z-10 w-1/2 cursor-pointer bg-transparent focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-roseGold"
            aria-label="Show next Meet Aleah story"
          />
          <div className="pointer-events-none absolute inset-y-0 left-1.5 z-20 flex items-center md:left-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-roseGold/30 bg-roseBlack/55 text-xs font-black text-roseGold backdrop-blur md:h-8 md:w-8 md:text-sm">
              ‹
            </span>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-1.5 z-20 flex items-center md:right-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-roseGold/30 bg-roseBlack/55 text-xs font-black text-roseGold backdrop-blur md:h-8 md:w-8 md:text-sm">
              ›
            </span>
          </div>
        </>
      ) : null}
      {!reducedMotion ? (
        <button
          type="button"
          onClick={toggleSound}
          className="absolute left-2 top-[54px] z-30 flex min-h-7 items-center gap-1.5 rounded-full border border-roseGold/35 bg-roseBlack/75 px-2 text-[8px] font-black uppercase tracking-[0.1em] text-roseGold shadow-[0_12px_30px_rgba(0,0,0,0.28)] backdrop-blur transition hover:border-roseGold hover:bg-roseWine focus-visible:ring-2 focus-visible:ring-roseGold sm:left-3 sm:text-[9px] md:left-4 md:top-[68px] md:min-h-8 md:gap-2 md:px-3 md:text-[10px] md:tracking-[0.14em]"
          aria-label={soundEnabled ? 'Mute Meet Aleah video audio' : 'Play Meet Aleah video with sound'}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3 w-3 fill-none stroke-current stroke-[2.4] md:h-4 md:w-4">
            <path d="M4 9v6h4l5 4V5L8 9H4Z" strokeLinecap="round" strokeLinejoin="round" />
            {soundEnabled ? (
              <>
                <path d="M16 9a4 4 0 0 1 0 6" strokeLinecap="round" />
                <path d="M18.5 6.5a7.5 7.5 0 0 1 0 11" strokeLinecap="round" />
              </>
            ) : (
              <>
                <path d="M17 9l4 4" strokeLinecap="round" />
                <path d="M21 9l-4 4" strokeLinecap="round" />
              </>
            )}
          </svg>
          {soundEnabled ? 'Sound on' : 'Tap for sound'}
        </button>
      ) : null}
      <div className="pointer-events-none absolute bottom-3 left-3 right-11 z-20 md:bottom-4 md:left-4 md:right-16">
        <p className="inline-flex rounded-full border border-roseGold/25 bg-roseBlack/55 px-2 py-1 text-[8px] font-black uppercase tracking-[0.16em] text-roseGold backdrop-blur md:text-[10px] md:tracking-[0.22em]">{activeClip.label}</p>
        <p className="mt-0.5 text-[11px] font-bold leading-tight text-roseCream md:mt-1 md:text-sm">{activeClip.descriptor}</p>
      </div>
      {!reducedMotion ? (
        <button
          type="button"
          onClick={togglePlayback}
          className="absolute bottom-3 right-3 z-30 flex h-7 w-7 items-center justify-center rounded-full border border-roseGold/30 bg-roseBlack/70 text-[10px] font-black text-roseGold backdrop-blur transition hover:border-roseGold hover:bg-roseWine focus-visible:ring-2 focus-visible:ring-roseGold md:bottom-4 md:right-4 md:h-9 md:w-9 md:text-xs"
          aria-label={playing ? 'Pause Aleah LIVE video' : 'Play Aleah LIVE video'}
        >
          {playing ? 'Ⅱ' : '▶'}
        </button>
      ) : null}
    </div>
  );
}
