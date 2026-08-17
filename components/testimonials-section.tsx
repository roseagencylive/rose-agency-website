'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ApplyButton } from '@/components/analytics';
import { creatorTestimonials, type CreatorTestimonial } from '@/lib/testimonials';

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const visibleTestimonials = useMemo(() => {
    const realTestimonials = creatorTestimonials.filter((testimonial) => !testimonial.isPlaceholderForDevelopment);

    if (realTestimonials.length > 0) {
      return realTestimonials;
    }

    return process.env.NODE_ENV === 'production' ? [] : creatorTestimonials;
  }, []);

  const carouselTestimonials = useMemo(() => {
    const repeatCount = visibleTestimonials.length < 3 ? 6 : 2;

    return Array.from({ length: repeatCount }, () => visibleTestimonials).flat();
  }, [visibleTestimonials]);

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
    if (!scrollRef.current || paused || interacted || reducedMotion || carouselTestimonials.length < 2) return;

    const scroller = scrollRef.current;
    const interval = window.setInterval(() => {
      scroller.scrollLeft += 0.22;

      if (scroller.scrollLeft >= scroller.scrollWidth / 2) {
        scroller.scrollLeft = 0;
      }
    }, 30);

    return () => window.clearInterval(interval);
  }, [carouselTestimonials.length, interacted, paused, reducedMotion]);

  if (visibleTestimonials.length === 0) {
    return null;
  }

  function scrollCards(direction: 'previous' | 'next') {
    setInteracted(true);
    scrollRef.current?.scrollBy({
      left: direction === 'next' ? 390 : -390,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  }

  return (
    <section
      aria-labelledby="creator-proof-heading"
      className="relative mx-auto max-w-7xl px-5 py-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-roseGold">
            REAL CREATORS. REAL EXPERIENCES.
          </p>
          <h2 id="creator-proof-heading" className="font-editorial text-4xl font-bold leading-tight text-roseCream md:text-5xl">
            Don't Just Take My Word For It.
          </h2>
          <p className="mt-4 text-base leading-7 text-roseMuted">
            Hear from creators who have experienced Aleah's coaching, community, and LIVE support firsthand.
          </p>
          <p className="mt-3 font-editorial text-xl italic text-roseGoldSoft">
            Different creators. Different journeys. Real growth.
          </p>
          {visibleTestimonials.some((testimonial) => testimonial.isPlaceholderForDevelopment) ? (
            <p className="mt-4 rounded-lg border border-roseGold/30 bg-roseGold/[0.08] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-roseGoldSoft">
              Development placeholders only. Replace before production.
            </p>
          ) : null}
        </div>

        <div className="hidden gap-2 md:flex" aria-label="Testimonial controls">
          <button
            type="button"
            onClick={() => scrollCards('previous')}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-roseGold/30 text-roseGold transition hover:border-roseGold hover:bg-roseGold/10 focus-visible:ring-2 focus-visible:ring-roseGold"
            aria-label="Previous testimonials"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollCards('next')}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-roseGold/30 text-roseGold transition hover:border-roseGold hover:bg-roseGold/10 focus-visible:ring-2 focus-visible:ring-roseGold"
            aria-label="Next testimonials"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="rose-testimonial-scroll -mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-3"
        onPointerDown={() => setInteracted(true)}
        onTouchStart={() => setInteracted(true)}
        tabIndex={0}
        aria-label="Creator testimonial carousel"
      >
        {carouselTestimonials.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.name}-${index}`}
            testimonial={testimonial}
            isDuplicate={index >= visibleTestimonials.length}
          />
        ))}
      </div>

      <div className="mt-9 rounded-lg border border-roseGold/25 bg-roseWine/30 p-6 text-center">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-roseGold">
          Real People. Real Journeys. Real Progress.
        </p>
        <p className="mt-4 font-editorial text-3xl font-bold text-roseCream">Ready To Write Your Own Story?</p>
        <div className="mt-6">
          <ApplyButton source="testimonials_section">Apply To Join ROSE</ApplyButton>
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
      className="relative flex min-h-[320px] min-w-[86%] snap-center flex-col rounded-lg border border-roseGold/20 bg-roseCream/[0.055] p-6 shadow-[0_22px_80px_rgba(0,0,0,0.34)] backdrop-blur transition hover:-translate-y-1 hover:border-roseGold/45 focus-within:border-roseGold/60 sm:min-w-[58%] lg:min-w-[31%]"
      aria-hidden={isDuplicate}
    >
      <div className="pointer-events-none absolute right-5 top-3 font-editorial text-7xl leading-none text-roseGold/14">
        “
      </div>
      <div className="relative z-10 flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-roseGold/35 bg-roseWine">
          {testimonial.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={testimonial.avatar} alt={`${testimonial.name} profile`} className="h-full w-full object-cover" />
          ) : (
            <span className="font-editorial text-2xl font-black text-roseGold">
              {testimonial.name
                .split(' ')
                .map((word) => word[0])
                .join('')
                .slice(0, 2)}
            </span>
          )}
        </div>
        <div>
          <h3 className="text-base font-black text-roseCream">{testimonial.name}</h3>
          <p className="text-sm font-bold text-roseGoldSoft">{testimonial.handle}</p>
        </div>
      </div>

      <div className="relative z-10 mt-5 flex flex-wrap gap-2">
        <span className="rounded-full border border-roseGold/25 bg-roseGold/[0.08] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-roseGoldSoft">
          {testimonial.category}
        </span>
        {testimonial.result ? (
          <span className="rounded-full bg-roseGold px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-roseBlack">
            {testimonial.result}
          </span>
        ) : null}
      </div>

      <p className="relative z-10 mt-6 flex-1 text-base leading-7 text-roseMuted">{testimonial.testimonial}</p>
      <p className="relative z-10 mt-6 text-xs font-black uppercase tracking-[0.18em] text-roseGold/80">
        Creator Experience
      </p>
    </article>
  );
}
