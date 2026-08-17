'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ApplyButton } from '@/components/analytics';
import { creatorTestimonials, type CreatorTestimonial } from '@/lib/testimonials';

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const visibleTestimonials = useMemo(() => {
    const realTestimonials = creatorTestimonials.filter((testimonial) => !testimonial.isPlaceholderForDevelopment);

    if (realTestimonials.length > 0) {
      return realTestimonials;
    }

    return process.env.NODE_ENV === 'production' ? [] : creatorTestimonials;
  }, []);

  const carouselTestimonials = useMemo(() => {
    if (visibleTestimonials.length < 2) {
      return visibleTestimonials;
    }

    const repeatCount = visibleTestimonials.length < 4 ? 3 : 2;

    return Array.from({ length: repeatCount }, () => visibleTestimonials).flat();
  }, [visibleTestimonials]);

  const hasMultipleTestimonials = visibleTestimonials.length > 1;

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
    if (!scrollRef.current || paused || reducedMotion || !hasMultipleTestimonials) return;

    const scroller = scrollRef.current;
    const interval = window.setInterval(() => {
      scroller.scrollLeft += 0.16;

      if (scroller.scrollLeft >= scroller.scrollWidth / 2) {
        scroller.scrollLeft = 0;
      }
    }, 30);

    return () => window.clearInterval(interval);
  }, [hasMultipleTestimonials, paused, reducedMotion]);

  if (visibleTestimonials.length === 0) {
    return null;
  }

  function scrollCards(direction: 'previous' | 'next') {
    scrollRef.current?.scrollBy({
      left: direction === 'next' ? 376 : -376,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  }

  return (
    <section
      aria-labelledby="creator-proof-heading"
      className="relative mx-auto max-w-7xl px-5 py-8 md:py-9"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.24em] text-roseGold">
            REAL CREATORS. REAL EXPERIENCES.
          </p>
          <h2 id="creator-proof-heading" className="font-editorial text-[1.7rem] font-bold leading-tight text-roseCream md:text-[2rem]">
            Don't Just Take My Word For It.
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-roseMuted">
            Hear from creators who have experienced Aleah's coaching, community, and LIVE support firsthand.
          </p>
          {visibleTestimonials.some((testimonial) => testimonial.isPlaceholderForDevelopment) ? (
            <p className="mt-4 rounded-lg border border-roseGold/30 bg-roseGold/[0.08] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-roseGoldSoft">
              Development placeholders only. Replace before production.
            </p>
          ) : null}
        </div>

        {hasMultipleTestimonials ? (
          <div className="hidden gap-2 md:flex" aria-label="Testimonial controls">
          <button
            type="button"
            onClick={() => scrollCards('previous')}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-roseGold/25 text-sm text-roseGold transition hover:border-roseGold hover:bg-roseGold/10 focus-visible:ring-2 focus-visible:ring-roseGold"
            aria-label="Previous testimonials"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollCards('next')}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-roseGold/25 text-sm text-roseGold transition hover:border-roseGold hover:bg-roseGold/10 focus-visible:ring-2 focus-visible:ring-roseGold"
            aria-label="Next testimonials"
          >
            →
          </button>
          </div>
        ) : null}
      </div>

      <div
        ref={scrollRef}
        className={`rose-testimonial-scroll -mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 ${
          hasMultipleTestimonials ? '' : 'justify-center md:justify-start'
        }`}
        onPointerDown={() => setPaused(true)}
        onPointerUp={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        tabIndex={0}
        aria-label={hasMultipleTestimonials ? 'Creator testimonial carousel' : 'Creator testimonial'}
      >
        {carouselTestimonials.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.name}-${index}`}
            testimonial={testimonial}
            isDuplicate={index >= visibleTestimonials.length}
          />
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-roseGold/20 bg-roseWine/20 p-4 text-center md:flex md:items-center md:justify-between md:text-left">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-roseGold">
          Real People. Real Journeys. Real Progress.
          </p>
          <p className="mt-1 font-editorial text-xl font-bold text-roseCream md:text-2xl">Ready To Write Your Own Story?</p>
        </div>
        <div className="mt-4 md:mt-0">
          <ApplyButton source="testimonials_section" className="min-h-10 px-5 text-[10px]">Apply To Join ROSE</ApplyButton>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  isDuplicate,
}: {
  testimonial: CreatorTestimonial;
  isDuplicate: boolean;
}) {
  return (
    <article
      className="relative flex min-h-[218px] min-w-[88%] max-w-[330px] snap-center flex-col rounded-lg border border-roseGold/18 bg-roseCream/[0.045] p-4 shadow-[0_14px_38px_rgba(0,0,0,0.26)] backdrop-blur transition hover:-translate-y-0.5 hover:border-roseGold/40 hover:shadow-[0_16px_44px_rgba(216,182,106,0.08)] focus-within:border-roseGold/50 sm:min-w-[310px] md:min-w-[320px] lg:min-w-[320px]"
      aria-hidden={isDuplicate}
    >
      <div className="pointer-events-none absolute right-4 top-3 font-editorial text-5xl leading-none text-roseGold/14">
        “
      </div>
      <div className="relative z-10 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-roseGold/45 bg-roseWine shadow-[0_0_0_3px_rgba(58,8,19,0.65)]">
          {testimonial.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={testimonial.avatar} alt={`${testimonial.name} profile`} className="h-full w-full object-cover object-center" />
          ) : (
            <span className="font-editorial text-xl font-black text-roseGold">
              {testimonial.name
                .split(' ')
                .map((word) => word[0])
                .join('')
                .slice(0, 2)}
            </span>
          )}
        </div>
        <div>
          <h3 className="text-sm font-black leading-tight text-roseCream">{testimonial.name}</h3>
          <p className="text-xs font-bold text-roseGoldSoft">{testimonial.handle}</p>
        </div>
      </div>

      <div className="relative z-10 mt-3 flex flex-wrap gap-2">
        <span className="rounded-full border border-roseGold/22 bg-roseGold/[0.07] px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.12em] text-roseGoldSoft">
          {testimonial.category}
        </span>
        {testimonial.result ? (
          <span className="rounded-full bg-roseGold px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.12em] text-roseBlack">
            {testimonial.result}
          </span>
        ) : null}
      </div>

      <p className="relative z-10 mt-3 flex-1 text-sm leading-[1.6] text-roseMuted md:text-[15px]">{testimonial.testimonial}</p>
      <p className="relative z-10 mt-3 text-[9px] font-black uppercase tracking-[0.16em] text-roseGold/75">
        Creator Experience
      </p>
    </article>
  );
}
