'use client';

import { useEffect, useRef, useState } from 'react';

const liveVideoSrc = '/videos/meet-aleah-live.mp4';
const posterSrc = '/images/meet-aleah-live-poster.png';

export function MeetAleahVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(true);
  const [playing, setPlaying] = useState(true);

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

    if (!inView || !playing) {
      video.pause();
    } else {
      void video.play().catch(() => undefined);
    }
  }, [inView, playing, reducedMotion]);

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

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-[360px] overflow-hidden rounded-lg border border-roseGold/25 bg-roseInk shadow-[0_24px_90px_rgba(0,0,0,0.35)] md:max-w-[390px]">
      <div className="aspect-[9/16] overflow-hidden rounded-lg bg-roseWine">
        {reducedMotion ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={posterSrc}
            alt="Aleah on TikTok LIVE"
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <video
            ref={videoRef}
            className="h-full w-full object-cover object-center"
            src={liveVideoSrc}
            poster={posterSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Aleah on TikTok LIVE"
          />
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgba(7,5,5,0.72))]" />
      <div className="pointer-events-none absolute bottom-4 left-4 right-16">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-roseGold">Aleah • LIVE</p>
        <p className="mt-1 text-sm font-bold text-roseCream">Creator • Coach • Founder</p>
      </div>
      {!reducedMotion ? (
        <button
          type="button"
          onClick={togglePlayback}
          className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-roseGold/30 bg-roseBlack/70 text-xs font-black text-roseGold backdrop-blur transition hover:border-roseGold hover:bg-roseWine focus-visible:ring-2 focus-visible:ring-roseGold"
          aria-label={playing ? 'Pause Aleah LIVE video' : 'Play Aleah LIVE video'}
        >
          {playing ? 'Ⅱ' : '▶'}
        </button>
      ) : null}
    </div>
  );
}
