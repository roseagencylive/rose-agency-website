'use client';

import { useEffect, useMemo, useState } from 'react';

const durationSeconds = 8;

const backgroundQuestions = [
  'Should I stay LIVE longer?',
  'Do I need a better setup?',
  'Am I going LIVE at the wrong time?',
  'Why are people leaving?',
  'Should I change my content?',
  "Why isn't this working?",
];

const signalCards = [
  ['VIEWERS', '↓', '1,284', '782', '419'],
  ['WATCH TIME', '↓', '0:42', '0:28', '0:16'],
  ['RETENTION', '↓', '41%', '29%', '18%'],
  ['ENGAGEMENT', '↓', 'Active', 'Slowing', 'Flat'],
];

const comments = [
  'joined',
  'left',
  'what is this about?',
  'can you explain?',
  'new viewer',
  'left',
  'wait...',
  'joined',
];

export function MissingSequencePrototype() {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);

  const scene = useMemo(() => {
    if (time < 2.5) return 'chaos';
    if (time < 3.5) return 'freeze';
    if (time < 5.5) return 'missing';
    return 'more';
  }, [time]);

  useEffect(() => {
    if (!playing) return;

    const interval = window.setInterval(() => {
      setTime((current) => {
        if (current >= durationSeconds) {
          window.clearInterval(interval);
          setPlaying(false);
          return durationSeconds;
        }

        return Number((current + 0.05).toFixed(2));
      });
    }, 50);

    return () => window.clearInterval(interval);
  }, [playing]);

  function togglePlay() {
    if (!playing && time >= durationSeconds) {
      setTime(0);
    }

    setPlaying((current) => !current);
  }

  function restart() {
    setTime(0);
    setPlaying(true);
  }

  const progress = Math.min((time / durationSeconds) * 100, 100);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-roseGold">ROSE Brand Film Insert</p>
        <h1 className="mt-2 font-editorial text-4xl font-bold text-roseCream md:text-6xl">
          “What Am I Missing?” Sequence
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-roseMuted">
          A 6-8 second web prototype for the frustration, overload, silence, and realization moment inside the ROSE
          Agency brand video.
        </p>
      </div>

      <div className="relative aspect-video overflow-hidden rounded-lg border border-roseGold/30 bg-roseBlack shadow-glow">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(216,182,106,0.18),transparent_24%),radial-gradient(circle_at_84%_22%,rgba(100,22,40,0.76),transparent_32%),linear-gradient(135deg,#070505,#16070b_42%,#3A0813_68%,#070505)]" />
        <div className="absolute inset-0 missing-grid opacity-30" />
        <div className="absolute inset-y-0 -left-1/2 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-roseGold/25 to-transparent blur-xl missing-light-sweep" />

        <ChaosLayer active={scene === 'chaos'} frozen={scene === 'freeze'} />
        <MissingLayer active={scene === 'missing'} />
        <MoreLayer active={scene === 'more'} />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(7,5,5,0.64)_82%)]" />

        <div className="absolute left-3 top-3 z-30 rounded-full border border-roseGold/25 bg-roseBlack/65 px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-roseGoldSoft backdrop-blur sm:left-5 sm:top-5">
          {scene === 'chaos' ? 'Rising tension' : scene === 'freeze' ? 'Silence' : scene === 'missing' ? 'Realization' : 'Transition setup'}
        </div>

        <div className="absolute inset-x-4 bottom-4 z-30 sm:inset-x-6 sm:bottom-5">
          <div className="mb-3 text-center">
            <p className="mx-auto inline-block rounded-lg bg-roseBlack/78 px-4 py-2 text-[clamp(0.78rem,2.7vw,1.08rem)] font-bold leading-snug text-roseCream backdrop-blur">
              {scene === 'chaos'
                ? 'And you still find yourself asking the same question every single time...'
                : scene === 'freeze'
                  ? '...the same question every single time.'
                  : scene === 'missing'
                    ? 'What am I missing?'
                    : '...to not have my LIVE streams perform the way I know they can?'}
            </p>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-roseCream/15">
            <div className="h-full rounded-full bg-roseGold transition-all duration-75" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-roseMuted sm:text-[10px]">
              {time.toFixed(1)}s / {durationSeconds}s
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={togglePlay}
                className="rounded-full bg-roseGold px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-roseBlack transition hover:bg-roseGoldSoft focus-visible:ring-2 focus-visible:ring-roseGold sm:text-xs"
              >
                {playing ? 'Pause' : 'Play'}
              </button>
              <button
                type="button"
                onClick={restart}
                className="rounded-full border border-roseGold/35 px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-roseGold transition hover:border-roseGold focus-visible:ring-2 focus-visible:ring-roseGold sm:text-xs"
              >
                Restart
              </button>
            </div>
          </div>
        </div>

        {!playing && time === 0 ? (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 z-40 flex items-center justify-center bg-roseBlack/20"
            aria-label="Play What Am I Missing animation"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-roseGold text-3xl text-roseBlack shadow-glow transition hover:scale-105">
              ▶
            </span>
          </button>
        ) : null}
      </div>

      <div className="mt-5 grid gap-3 text-xs text-roseMuted md:grid-cols-4">
        <Cue label="0-2.5s" copy="Notification ticks, whooshes, rising tension, controlled visual chaos." />
        <Cue label="2.5-3.5s" copy="Abrupt audio cut, freeze, darken, visual silence." />
        <Cue label="3.5-5.5s" copy="Low impact, slow push, WHAT / AM I / MISSING? reveal." />
        <Cue label="5.5-8s" copy="Emotional riser, LIVE screen returns, gold light enters for next scene." />
      </div>
    </div>
  );
}

function ChaosLayer({ active, frozen }: { active: boolean; frozen: boolean }) {
  return (
    <div
      className={`absolute inset-0 z-10 transition duration-300 ${
        active ? 'opacity-100' : frozen ? 'opacity-35 grayscale' : 'opacity-0'
      } ${active ? 'missing-chaos-shake' : ''}`}
    >
      <div className="absolute left-[5%] top-[12%] h-[68%] w-[30%] rounded-[2rem] border border-roseGold/25 bg-roseBlack/60 p-2 shadow-2xl backdrop-blur-sm sm:p-3">
        <div className="mx-auto mb-2 h-1.5 w-10 rounded-full bg-roseCream/25" />
        <div className="h-[calc(100%-0.75rem)] rounded-[1.4rem] border border-roseCream/10 bg-gradient-to-b from-roseWine/80 to-roseBlack p-3">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-red-600 px-2 py-1 text-[8px] font-black uppercase text-white">LIVE</span>
            <span className="missing-counter text-[8px] font-bold text-roseCream/90">1.2K</span>
          </div>
          <div className="mt-5 space-y-1.5">
            {comments.map((comment, index) => (
              <div
                key={`${comment}-${index}`}
                className="missing-comment rounded-full bg-roseCream/10 px-2 py-1 text-[7px] text-roseCream"
                style={{ animationDelay: `${index * 0.12}s` }}
              >
                {comment}
              </div>
            ))}
          </div>
          <div className="absolute bottom-5 left-5 right-5 h-1.5 rounded-full bg-roseCream/10">
            <div className="missing-retention h-full rounded-full bg-roseGold" />
          </div>
        </div>
      </div>

      <div className="absolute right-[6%] top-[10%] grid w-[39%] gap-2">
        {signalCards.map(([label, direction, first, second, third], index) => (
          <div
            key={label}
            className="missing-signal rounded-lg border border-roseGold/24 bg-roseBlack/62 p-2 backdrop-blur sm:p-3"
            style={{ animationDelay: `${index * 0.13}s` }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[8px] font-black uppercase tracking-[0.14em] text-roseGold sm:text-[9px]">{label}</p>
              <p className="text-sm font-black text-red-300">{direction}</p>
            </div>
            <div className="mt-2 flex items-center gap-2 text-[8px] font-bold text-roseMuted sm:text-[10px]">
              <span>{first}</span>
              <span>→</span>
              <span>{second}</span>
              <span>→</span>
              <span className="text-roseCream">{third}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-roseCream/10">
              <div className="missing-bar h-full rounded-full bg-red-300" style={{ animationDelay: `${index * 0.1}s` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-[10%] top-[30%] z-20 space-y-1.5 sm:space-y-2">
        {backgroundQuestions.map((question, index) => (
          <div
            key={question}
            className="missing-question mx-auto w-fit rounded-lg border border-roseGold/25 bg-roseBlack/72 px-3 py-1.5 text-center text-[9px] font-black uppercase tracking-[0.12em] text-roseCream shadow-card backdrop-blur sm:text-xs"
            style={{ animationDelay: `${index * 0.16}s` }}
          >
            {question}
          </div>
        ))}
      </div>

      <div className="absolute bottom-[28%] right-[18%] rounded-full border border-roseGold/25 bg-roseBlack/70 px-3 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-roseGoldSoft backdrop-blur">
        LIVE TIMER 00:47:18
      </div>
    </div>
  );
}

function MissingLayer({ active }: { active: boolean }) {
  return (
    <div className={`absolute inset-0 z-20 flex items-center justify-center transition duration-500 ${active ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-roseBlack/86" />
      <div className="missing-slow-push relative text-center">
        <p className="missing-word font-editorial text-[clamp(3rem,11vw,8rem)] font-black leading-[0.84] text-roseCream" style={{ animationDelay: '0ms' }}>
          WHAT
        </p>
        <p className="missing-word font-editorial text-[clamp(3rem,11vw,8rem)] font-black leading-[0.84] text-roseCream" style={{ animationDelay: '220ms' }}>
          AM I
        </p>
        <p className="missing-word font-editorial text-[clamp(3rem,11vw,8rem)] font-black italic leading-[0.84] text-roseGoldSoft" style={{ animationDelay: '440ms' }}>
          MISSING?
        </p>
      </div>
    </div>
  );
}

function MoreLayer({ active }: { active: boolean }) {
  return (
    <div className={`absolute inset-0 z-20 transition duration-500 ${active ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-roseBlack/72" />
      <div className="absolute left-[9%] top-[15%] h-[62%] w-[32%] rounded-[2rem] border border-roseGold/20 bg-roseBlack/55 p-3 opacity-60 backdrop-blur-sm">
        <div className="rounded-full bg-red-600 px-2 py-1 text-center text-[8px] font-black uppercase text-white">LIVE</div>
        <div className="mt-8 space-y-2">
          <div className="h-3 w-3/4 rounded-full bg-roseCream/10" />
          <div className="h-3 w-1/2 rounded-full bg-roseCream/10" />
          <div className="h-3 w-2/3 rounded-full bg-roseCream/10" />
        </div>
      </div>
      <div className="absolute right-[8%] top-[22%] w-[34%] rounded-xl border border-roseGold/18 bg-roseBlack/55 p-3 opacity-70 backdrop-blur">
        {[34, 58, 22, 49].map((width, index) => (
          <div key={index} className="mb-2 h-2 rounded-full bg-roseCream/10">
            <div className="h-full rounded-full bg-roseGold transition-all" style={{ width: `${width}%` }} />
          </div>
        ))}
      </div>
      <div className="absolute inset-x-[8%] top-[23%] text-center">
        <p className="missing-rise-text font-editorial text-[clamp(2rem,7vw,5.5rem)] font-black leading-[0.92] text-roseCream">
          WHAT AM I MISSING?
        </p>
        <p className="missing-reveal-more mx-auto mt-5 max-w-2xl font-editorial text-[clamp(1.7rem,5.4vw,4.4rem)] font-black leading-[0.98] text-roseCream">
          I KNOW MY LIVE
          <span className="block italic text-roseGoldSoft">CAN BE MORE THAN THIS.</span>
        </p>
      </div>
      <div className="absolute inset-y-0 -left-1/2 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-roseGold/35 to-transparent blur-xl missing-next-light" />
    </div>
  );
}

function Cue({ label, copy }: { label: string; copy: string }) {
  return (
    <div className="rounded-lg border border-roseGold/20 bg-roseCream/[0.04] p-4">
      <p className="font-black uppercase tracking-[0.16em] text-roseGold">{label}</p>
      <p className="mt-2 leading-5">{copy}</p>
    </div>
  );
}
