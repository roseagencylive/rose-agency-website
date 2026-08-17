'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { siteConfig, trackRoseEvent } from '@/lib/site-config';

const durationSeconds = 60;

const script = `If you're going LIVE consistently but still feel like you're guessing your way through growth, I built ROSE for you.

Maybe you're showing up, but people aren't staying.
Maybe your community is growing, but your LIVE isn't.
Or maybe you know you have potential. You just don't know what you're missing.

That's why ROSE exists.

Because going LIVE shouldn't feel like throwing content at the wall and hoping something works.

ROSE helps creators understand their performance, strengthen their LIVE strategy, build real community, and know what to work on next.

We're not looking for perfect creators.
And you don't need the biggest following in the room.

We're looking for creators who are consistent, coachable, community-driven, and ready to become better.

Because your potential isn't determined by where you're starting.

It's determined by what you're willing to build.

Create. Connect. Elevate.

If you're ready to take your LIVE seriously, apply to ROSE.`;

const scenes = [
  {
    key: 'hook',
    start: 0,
    end: 6,
    label: '0-6 sec',
    eyebrow: 'TikTok LIVE Creator Network',
    headline: 'GOING LIVE...\nBUT STILL GUESSING?',
    caption: "If you're going LIVE consistently but still feel like you're guessing your way through growth...",
    accent: 'guessing',
    mode: 'chaos',
  },
  {
    key: 'pain',
    start: 6,
    end: 16,
    label: '6-16 sec',
    eyebrow: 'The question creators feel',
    headline: "WHY AREN'T\nPEOPLE STAYING?",
    caption: "Maybe you're showing up, but people aren't staying. Maybe your community is growing, but your LIVE isn't.",
    accent: "aren't staying",
    mode: 'interrupt',
  },
  {
    key: 'reveal',
    start: 16,
    end: 21,
    label: '16-21 sec',
    eyebrow: 'Abrupt quiet',
    headline: "THAT'S WHY\nROSE EXISTS.",
    caption: "That's why ROSE exists.",
    accent: 'ROSE',
    mode: 'logo',
  },
  {
    key: 'value',
    start: 21,
    end: 36,
    label: '21-36 sec',
    eyebrow: 'What changes',
    headline: 'STOP GUESSING.\nSTART DEVELOPING.',
    caption: 'ROSE helps creators understand performance, strengthen strategy, build community, and know what to work on next.',
    accent: 'START DEVELOPING',
    mode: 'value',
  },
  {
    key: 'shift',
    start: 36,
    end: 48,
    label: '36-48 sec',
    eyebrow: 'The shift',
    headline: "YOUR POTENTIAL ISN'T DETERMINED\nBY WHERE YOU START.",
    caption: "It's determined by what you're willing to build.",
    accent: 'willing to build',
    mode: 'cinematic',
  },
  {
    key: 'cta',
    start: 48,
    end: 60,
    label: '48-60 sec',
    eyebrow: 'Create. Connect. Elevate.',
    headline: 'ROSE AGENCY\nYOUR NEXT LEVEL ON LIVE STARTS HERE.',
    caption: "If you're ready to take your LIVE seriously, apply to ROSE.",
    accent: 'apply to ROSE',
    mode: 'cta',
  },
] as const;

const valueCards = [
  ['LIVE STRATEGY', 'Phone / LIVE layout'],
  ['PERFORMANCE', 'Animated analytics'],
  ['COACHING', 'Scorecard audit'],
  ['COMMUNITY', 'Connected creator nodes'],
  ['GROWTH', 'Progress pathway'],
];

const creatorTraits = ['CONSISTENT.', 'COACHABLE.', 'COMMUNITY-DRIVEN.', 'READY TO GROW.'];

export function FounderVideo() {
  if (siteConfig.video.useFounderVideoMockup) {
    return <FounderVideoMockup />;
  }

  return <FounderHostedVideo />;
}

function FounderHostedVideo() {
  const videoUrl = siteConfig.assets.founderVideoUrl;

  function handlePlay() {
    trackRoseEvent('rose_founder_video_play', { configured: Boolean(videoUrl) });
  }

  if (videoUrl) {
    return (
      <div className="aspect-video overflow-hidden rounded-lg border border-roseGold/25 bg-roseInk">
        <video
          className="h-full w-full object-contain"
          src={videoUrl}
          poster={siteConfig.assets.founderVideoPoster || undefined}
          controls
          playsInline
          preload="metadata"
          onPlay={handlePlay}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handlePlay}
      className="group relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-roseGold/25 bg-roseInk text-center transition hover:border-roseGold/60 focus-visible:ring-2 focus-visible:ring-roseGold"
      aria-label={videoUrl ? 'Play founder video' : 'Founder video coming soon'}
    >
      {siteConfig.assets.founderVideoPoster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={siteConfig.assets.founderVideoPoster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      ) : null}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(216,182,106,0.18),rgba(58,8,19,0.7)_45%,rgba(7,5,5,0.96))]" />
      <p className="relative text-xs font-black uppercase tracking-[0.24em] text-roseGold">Watch This Before You Apply</p>
      <p className="relative mt-3 max-w-sm font-editorial text-3xl font-bold text-roseCream">A Message From Aleah</p>
      <p className="relative mt-2 text-sm font-bold text-roseMuted">Founder of ROSE Agency</p>
      <span className="relative mt-6 flex h-20 w-20 items-center justify-center rounded-full bg-roseGold text-2xl text-roseBlack transition group-hover:scale-105">
        ▶
      </span>
      <p className="relative mt-4 text-xs font-bold uppercase tracking-[0.2em] text-roseMuted">
        {videoUrl ? 'Watch Now' : 'Coming Soon'}
      </p>
    </button>
  );
}

function FounderVideoMockup() {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [metadata, setMetadata] = useState<{
    duration: number;
    width: number;
    height: number;
    hasAudio: string;
  } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeScene = useMemo(
    () => scenes.find((scene) => time >= scene.start && time < scene.end) ?? scenes[scenes.length - 1],
    [time]
  );

  useEffect(() => {
    if (!playing) return;

    void videoRef.current?.play().catch(() => undefined);

    const interval = window.setInterval(() => {
      setTime((current) => {
        if (current >= durationSeconds) {
          window.clearInterval(interval);
          setPlaying(false);
          videoRef.current?.pause();
          return durationSeconds;
        }

        return Number((current + 0.2).toFixed(1));
      });
    }, 200);

    return () => window.clearInterval(interval);
  }, [playing]);

  useEffect(() => {
    if (playing) return;
    videoRef.current?.pause();
  }, [playing]);

  function togglePlay() {
    if (!playing && time >= durationSeconds) {
      setTime(0);
    }

    if (!playing) {
      trackRoseEvent('rose_founder_video_play', { source: 'faceless_brand_film_prototype' });
      if (videoRef.current) {
        videoRef.current.currentTime = Math.max(Math.min(time, durationSeconds - 0.5), 0);
      }
    }

    setPlaying((current) => !current);
  }

  function restart() {
    setTime(0);
    setPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
    trackRoseEvent('rose_founder_video_play', { source: 'faceless_brand_film_restart' });
  }

  const progress = Math.min((time / durationSeconds) * 100, 100);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-roseGold/30 bg-roseBlack shadow-glow">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-42 saturate-[0.72] contrast-125 sepia-[0.18]"
        src={siteConfig.video.sourceMockupVideoUrl}
        playsInline
        preload="metadata"
        onLoadedMetadata={(event) => {
          const video = event.currentTarget;
          const maybeAudioTracks = video as HTMLVideoElement & { audioTracks?: { length: number }; webkitAudioDecodedByteCount?: number };
          setMetadata({
            duration: video.duration,
            width: video.videoWidth,
            height: video.videoHeight,
            hasAudio:
              maybeAudioTracks.audioTracks && maybeAudioTracks.audioTracks.length > 0
                ? 'detected'
                : typeof maybeAudioTracks.webkitAudioDecodedByteCount === 'number'
                  ? 'unknown until playback'
                  : 'unknown in browser',
          });
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(216,182,106,0.22),transparent_24%),radial-gradient(circle_at_82%_30%,rgba(100,22,40,0.62),transparent_32%),linear-gradient(135deg,rgba(7,5,5,0.58),rgba(22,8,12,0.34)_34%,rgba(58,8,19,0.44)_58%,rgba(7,5,5,0.62))]" />
      <div className="absolute inset-0 bg-roseBlack/35 mix-blend-multiply" />
      <div className="absolute inset-0 rose-film-particles opacity-40" />
      <div className="absolute inset-y-0 -left-1/3 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-roseGold/20 to-transparent blur-xl rose-light-sweep" />

      <LiveInterface mode={activeScene.mode} />
      <SceneGraphics mode={activeScene.mode} />

      <div className="relative z-20 flex h-full flex-col justify-between p-3 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-roseGold sm:text-[10px]">{activeScene.label}</p>
            <p className="mt-1 text-[9px] font-black uppercase tracking-[0.22em] text-roseMuted sm:text-[10px]">
              {activeScene.eyebrow}
            </p>
          </div>
          <div className="rounded-full border border-roseGold/25 bg-roseBlack/45 px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-roseGoldSoft backdrop-blur">
            Faceless mockup
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center text-center">
          {activeScene.mode === 'logo' || activeScene.mode === 'cta' ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={siteConfig.assets.logo} alt="ROSE Agency" className="mb-3 h-16 w-16 object-contain rose-logo-reveal sm:h-24 sm:w-24" />
          ) : null}

          <h3
            key={activeScene.key}
            className="rose-kinetic-text whitespace-pre-line font-editorial text-[clamp(1.55rem,5vw,4.3rem)] font-black leading-[0.92] text-roseCream drop-shadow-[0_14px_45px_rgba(0,0,0,0.65)]"
          >
            {activeScene.headline}
          </h3>

          {activeScene.mode === 'value' ? <ValueMoments /> : null}
          {activeScene.mode === 'cinematic' ? <TraitStack /> : null}
          {activeScene.mode === 'cta' ? (
            <div className="mt-4 rounded-full border border-roseGold bg-roseGold px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-roseBlack sm:text-xs">
              Apply To Join ROSE →
            </div>
          ) : null}
        </div>

        <div>
          <p className="mx-auto mb-3 max-w-xl rounded-lg bg-roseBlack/75 px-3 py-2 text-center text-[clamp(0.78rem,2.8vw,1.05rem)] font-bold leading-snug text-roseCream backdrop-blur">
            {highlightCaption(activeScene.caption, activeScene.accent)}
          </p>
          <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-roseCream/15" aria-label="Video progress">
            <div className="h-full rounded-full bg-roseGold transition-all duration-200" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-roseMuted sm:text-[10px]">
              Brand film prototype • {Math.floor(time)}s / {durationSeconds}s
              {metadata ? ` • ${metadata.width}x${metadata.height}` : ''}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={togglePlay}
                className="rounded-full bg-roseGold px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-roseBlack transition hover:bg-roseGoldSoft focus-visible:ring-2 focus-visible:ring-roseGold sm:px-4 sm:text-xs"
              >
                {playing ? 'Pause' : 'Play'}
              </button>
              <button
                type="button"
                onClick={restart}
                className="rounded-full border border-roseGold/30 px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-roseGold transition hover:border-roseGold focus-visible:ring-2 focus-visible:ring-roseGold sm:px-4 sm:text-xs"
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      </div>

      {!playing && time === 0 ? (
        <button
          type="button"
          onClick={togglePlay}
          className="absolute inset-0 z-30 flex items-center justify-center bg-roseBlack/20"
          aria-label="Play faceless ROSE Agency brand film prototype"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-roseGold text-3xl text-roseBlack shadow-glow transition hover:scale-105">
            ▶
          </span>
        </button>
      ) : null}
    </div>
  );
}

function LiveInterface({ mode }: { mode: (typeof scenes)[number]['mode'] }) {
  const noisy = mode === 'chaos' || mode === 'interrupt';

  return (
    <div className={`absolute inset-0 z-10 transition duration-500 ${mode === 'logo' || mode === 'cta' ? 'opacity-20' : 'opacity-85'}`}>
      <div className={`absolute left-[7%] top-[14%] h-[66%] w-[30%] rounded-[2rem] border border-roseGold/25 bg-roseBlack/55 p-3 shadow-2xl backdrop-blur-sm ${noisy ? 'rose-phone-jitter' : 'rose-slow-float'}`}>
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-roseCream/25" />
        <div className="h-full rounded-[1.4rem] border border-roseCream/10 bg-gradient-to-b from-roseWine/75 to-roseBlack p-3">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-red-600 px-2 py-1 text-[8px] font-black uppercase text-white">LIVE</span>
            <span className="text-[8px] font-bold text-roseCream/80">2.1K</span>
          </div>
          <div className="mt-8 space-y-2">
            {['new viewer joined', 'what should I do?', 'this helped', 'wait explain that'].map((comment, index) => (
              <div key={comment} className="rose-comment rounded-full bg-roseCream/10 px-2 py-1 text-[7px] text-roseCream" style={{ animationDelay: `${index * 0.28}s` }}>
                {comment}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute right-[7%] top-[18%] w-[32%] rounded-xl border border-roseGold/20 bg-roseBlack/50 p-3 backdrop-blur-md">
        <div className="mb-3 text-[8px] font-black uppercase tracking-[0.18em] text-roseGold">Performance</div>
        {[64, 38, 76, 52].map((width, index) => (
          <div key={index} className="mb-2 h-2 rounded-full bg-roseCream/10">
            <div className="rose-bar h-full rounded-full bg-roseGold" style={{ width: `${width}%`, animationDelay: `${index * 0.16}s` }} />
          </div>
        ))}
      </div>

      {noisy ? (
        <div className="absolute inset-x-[14%] top-[36%] space-y-2">
          {["WHY AREN'T PEOPLE STAYING?", "WHY ISN'T MY LIVE GROWING?", 'WHAT AM I MISSING?'].map((question, index) => (
            <div key={question} className="rose-interrupt rounded-lg border border-roseGold/30 bg-roseBlack/75 px-3 py-2 text-center text-[10px] font-black uppercase tracking-[0.12em] text-roseCream backdrop-blur" style={{ animationDelay: `${index * 0.22}s` }}>
              {question}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function SceneGraphics({ mode }: { mode: (typeof scenes)[number]['mode'] }) {
  if (mode === 'value') {
    return (
      <div className="absolute inset-0 z-10">
        <div className="absolute bottom-[18%] left-[10%] h-20 w-20 rounded-full border border-roseGold/20" />
        <div className="absolute bottom-[22%] right-[12%] h-28 w-28 rounded-full border border-roseGold/20" />
        <div className="absolute left-[22%] top-[22%] h-px w-[56%] bg-gradient-to-r from-transparent via-roseGold/50 to-transparent rose-light-sweep" />
      </div>
    );
  }

  if (mode === 'cinematic') {
    return <div className="absolute inset-x-0 top-1/2 z-10 h-px bg-gradient-to-r from-transparent via-roseGold/80 to-transparent rose-light-sweep" />;
  }

  return null;
}

function ValueMoments() {
  return (
    <div className="mt-4 grid w-full max-w-xl grid-cols-5 gap-1.5 sm:gap-2">
      {valueCards.map(([title, label], index) => (
        <div key={title} className="rose-value-card min-h-16 rounded-lg border border-roseGold/25 bg-roseBlack/55 p-2 backdrop-blur" style={{ animationDelay: `${index * 0.12}s` }}>
          <p className="text-[8px] font-black uppercase tracking-[0.1em] text-roseGoldSoft sm:text-[9px]">{title}</p>
          <p className="mt-1 hidden text-[8px] leading-tight text-roseMuted sm:block">{label}</p>
        </div>
      ))}
    </div>
  );
}

function TraitStack() {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-2">
      {creatorTraits.map((trait, index) => (
        <span key={trait} className="rose-trait rounded-full border border-roseGold/35 bg-roseBlack/60 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-roseGoldSoft" style={{ animationDelay: `${index * 0.16}s` }}>
          {trait}
        </span>
      ))}
    </div>
  );
}

function highlightCaption(caption: string, accent: string) {
  const parts = caption.split(accent);

  if (parts.length === 1) return caption;

  return (
    <>
      {parts[0]}
      <span className="text-roseGoldSoft">{accent}</span>
      {parts.slice(1).join(accent)}
    </>
  );
}

export const founderVideoMockupScript = script;
