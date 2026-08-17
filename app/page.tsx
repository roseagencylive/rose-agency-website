import { ApplyButton } from '@/components/analytics';
import { BenefitCard, ComparisonList } from '@/components/cards';
import { FAQ } from '@/components/faq';
import { FounderVideo } from '@/components/founder-video';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { TestimonialsSection } from '@/components/testimonials-section';
import { siteConfig } from '@/lib/site-config';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Why ROSE', href: '#why-rose' },
  { label: 'What You Get', href: '#benefits' },
  { label: 'FAQ', href: '#faq' },
];

const problemQuestions = [
  "Why aren't people staying?",
  'How do I turn viewers into a real community?',
  "Why isn't my LIVE growing?",
  'What should I actually be doing during my LIVE?',
  'How do successful LIVE creators improve?',
];

const beforeItems = [
  'Going LIVE without a strategy',
  'Guessing what your analytics mean',
  'Inconsistent engagement',
  'Trying to build community alone',
  'Unsure how to improve monetization',
];

const afterItems = [
  'Intentional LIVE strategy',
  'Performance-based coaching',
  'Community-building systems',
  'Creator development + support',
  'A clearer path toward growth',
];

const benefits = [
  ['LIVE Strategy', 'Build stronger, more intentional LIVE experiences.'],
  ['Performance Coaching', "Understand what's working and what needs to change."],
  ['Growth Development', 'Identify opportunities using your actual performance.'],
  ['Community', 'Build alongside creators serious about growing and supporting each other.'],
  ['Monetization Development', 'Develop the consistency, skills, and community that support earning potential.'],
];

const fitItems = [
  "You're currently going LIVE or ready to start.",
  "You're willing to show up consistently.",
  "You're coachable.",
  'You care about building community.',
  'You want to improve, not just collect gifts.',
  "You're ready to take TikTok LIVE seriously.",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-roseBlack text-roseCream">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(100,22,40,0.42),transparent_34%),radial-gradient(circle_at_0%_18%,rgba(216,182,106,0.12),transparent_30%)]" />

      <header className="sticky top-0 z-40 border-b border-roseGold/15 bg-roseBlack/92 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#top" className="flex items-center gap-3" aria-label="ROSE Agency home">
            <RoseLogo className="h-12 w-12" />
            <span>
              <span className="block text-base font-black text-roseCream">ROSE Agency</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-roseGold">
                Create. Connect. Elevate.
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-bold text-roseMuted transition hover:text-roseGold">
                {item.label}
              </a>
            ))}
            <ApplyButton source="desktop_nav" className="min-h-10 px-5 text-[11px]" />
          </nav>
          <ApplyButton source="mobile_nav" className="md:hidden min-h-10 px-4 text-[10px]">
            Apply
          </ApplyButton>
        </div>
      </header>

      <section id="top" className="relative mx-auto grid max-w-7xl scroll-mt-28 gap-6 px-5 pb-14 pt-8 md:grid-cols-[1.02fr_0.98fr] md:items-center md:gap-9 md:pb-20 md:pt-16 lg:gap-12">
        <div className="contents md:block">
          <div className="order-1 md:contents">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.26em] text-roseGold md:mb-5">
              TikTok LIVE Creator Network
            </p>
            <h1 className="max-w-5xl font-editorial text-[2.55rem] font-bold leading-[1] text-roseCream md:text-6xl md:leading-[0.98] lg:text-7xl">
              You're Already Going LIVE. Now Let's Turn It Into Something Bigger.
            </h1>
          </div>

          <div className="order-3 flex flex-col items-start md:contents">
            <p className="max-w-2xl text-base leading-7 text-roseMuted md:mt-7 md:text-lg md:leading-8">
              Get the strategy, coaching, community, and support to grow as a TikTok LIVE creator without figuring
              it all out alone.
            </p>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-roseGoldSoft md:mt-6 md:text-sm">
              Strategy • Coaching • Community • Growth
            </p>
            <div className="order-4 mt-6 flex flex-col items-start gap-3 md:order-3 md:mt-8">
              <ApplyButton source="hero">Apply To Join ROSE</ApplyButton>
              <p className="text-sm text-roseMuted">Applications are reviewed before acceptance.</p>
            </div>
            <a
              href={siteConfig.founderTikTokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="order-3 mt-5 inline-flex rounded-full border border-roseGold/25 bg-roseCream/[0.04] px-4 py-2 text-sm font-bold text-roseCream transition hover:border-roseGold md:order-4 md:mt-6"
            >
              Founded by {siteConfig.founderHandle}
            </a>
          </div>
        </div>

        <div className="contents md:block md:space-y-4">
          <div className="order-2 md:contents">
            <FounderVideo />
          </div>

          <div className="order-5 md:contents">
            <div className="rounded-lg border border-roseGold/20 bg-roseCream/[0.045] p-5">
              <p className="text-sm leading-6 text-roseMuted">
                Founded by <a href={siteConfig.founderTikTokUrl} target="_blank" rel="noopener noreferrer" className="font-black text-roseGoldSoft">{siteConfig.founderHandle}</a>.
                Built for creators who are consistent, coachable, community-driven, and ready to grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <section id="why-rose" className="relative mx-auto max-w-7xl scroll-mt-28 px-5 py-14">
        <Reveal>
          <SectionHeading
            eyebrow="Let's Be Real."
            title="Going LIVE Isn't the Hard Part. Knowing How to Grow From It Is."
            copy="You're showing up. You're putting in the work. But you're still wondering..."
          />
        </Reveal>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {problemQuestions.map((question, index) => (
            <Reveal key={question} delay={index * 70}>
            <div className="rounded-lg border border-roseGold/20 bg-roseCream/[0.045] p-5">
              <p className="text-base font-bold leading-6 text-roseCream">{question}</p>
            </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <p className="mt-7 text-sm font-black uppercase tracking-[0.2em] text-roseGold">That's where ROSE comes in.</p>
        </Reveal>
      </section>

      <section className="relative mx-auto grid max-w-7xl gap-5 px-5 py-14 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <Reveal>
          <ComparisonList title="Before ROSE" items={beforeItems} tone="before" />
        </Reveal>
        <Reveal delay={90} className="hidden md:block">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-roseGold/30 bg-roseWine/45 text-roseGold shadow-[0_16px_50px_rgba(216,182,106,0.08)]" aria-hidden="true">
            →
          </div>
        </Reveal>
        <Reveal delay={150}>
          <ComparisonList title="Inside ROSE" items={afterItems} tone="after" />
        </Reveal>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-lg border border-roseGold/25 bg-[linear-gradient(135deg,rgba(100,22,40,0.36),rgba(19,9,11,0.9))] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.28)] md:p-8">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-roseGold/55 to-transparent" />
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <p className="max-w-xl font-editorial text-2xl font-bold leading-tight text-roseCream md:text-3xl">
                Creator Development, Not Just Representation.
              </p>
              <div className="h-px flex-1 bg-gradient-to-r from-roseGold/35 to-transparent md:max-w-xs" />
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {['Strategy', 'Performance Insights', 'Coaching', 'Community', 'Growth Development'].map((item, index) => (
                <Reveal key={item} delay={index * 60}>
                  <div className="rounded-full border border-roseGold/20 bg-roseBlack/35 px-4 py-3 text-center text-xs font-black uppercase tracking-[0.12em] text-roseCream shadow-[inset_0_1px_0_rgba(248,238,220,0.06)]">
                    {item}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section id="benefits" className="relative mx-auto max-w-7xl scroll-mt-28 px-5 py-14">
        <Reveal>
          <div className="rounded-lg border border-roseGold/15 bg-roseCream/[0.025] px-5 py-6 md:px-7">
            <SectionHeading eyebrow="What You Get Inside ROSE" title="We Don't Just Sign Creators. We Develop Them." />
          </div>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {benefits.map(([title, copy], index) => (
            <Reveal key={title} delay={index * 70}>
              <BenefitCard title={title} copy={copy} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={120} className="mt-8 text-center">
          <ApplyButton source="benefits">See If You're A Fit</ApplyButton>
        </Reveal>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-14">
        <div className="rounded-lg border border-roseGold/25 bg-roseCream/[0.06] p-6 md:p-9">
          <h2 className="font-editorial text-4xl font-bold text-roseCream">ROSE May Be For You If...</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {fitItems.map((item) => (
              <div key={item} className="flex gap-3 text-base leading-7 text-roseMuted">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-roseGold text-sm font-black text-roseBlack">
                  ✓
                </span>
                {item}
              </div>
            ))}
          </div>
          <p className="mt-8 rounded-lg border border-roseGold bg-roseGold/[0.11] p-4 text-center text-sm font-black uppercase tracking-[0.16em] text-roseGoldSoft">
            You don't need a massive following.
          </p>
        </div>
      </section>

      <section id="about" className="relative mx-auto grid max-w-7xl scroll-mt-28 gap-7 px-5 py-14 lg:grid-cols-[0.8fr_1fr] lg:items-center">
        <div className="flex min-h-[360px] items-center justify-center rounded-lg border border-roseGold/20 bg-roseWine p-8 text-center">
          {siteConfig.assets.founderImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={siteConfig.assets.founderImage} alt="Aleah, founder of ROSE Agency" className="h-full w-full rounded-md object-cover" />
          ) : (
            <div>
              <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-roseGold bg-roseBlack font-editorial text-4xl font-black text-roseGold">
                R
              </span>
              <p className="mt-5 text-lg font-black text-roseCream">Founder image placeholder</p>
              <p className="mt-2 text-sm text-roseMuted">Replace in siteConfig.assets.founderImage</p>
            </div>
          )}
        </div>
        <div>
          <SectionHeading eyebrow="Built By A Creator. For Creators." title="Meet Aleah." />
          <a href={siteConfig.founderTikTokUrl} target="_blank" rel="noopener noreferrer" className="font-black text-roseGoldSoft">
            {siteConfig.founderHandle}
          </a>
          <div className="mt-5 space-y-4 text-base leading-7 text-roseMuted">
            <p>
              I built ROSE Agency from the perspective of someone who understands what it's like to actually be on the
              other side of the screen, building a community, learning LIVE, monetizing content, and figuring out what
              works in real time.
            </p>
            <p>
              ROSE exists to give creators the strategy, support, and development I believe creators deserve while
              building on LIVE.
            </p>
          </div>
          <p className="mt-6 text-lg font-black text-roseGoldSoft">ROSE = Create. Connect. Elevate.</p>
        </div>
      </section>

      <section className="relative mx-5 my-14 rounded-lg border border-roseGold/25 bg-[linear-gradient(135deg,#3A0813,#070505)] px-6 py-12 text-center md:mx-auto md:max-w-6xl md:px-12 md:py-16">
        <h2 className="mx-auto max-w-4xl font-editorial text-4xl font-bold leading-tight text-roseCream md:text-6xl">
          Your Next Level on LIVE Doesn't Have to Be Built Alone.
        </h2>
        <p className="mt-5 text-base text-roseMuted">Ready to see what you could build with the right support?</p>
        <div className="mt-8">
          <ApplyButton source="final_cta">Apply To Join ROSE Agency</ApplyButton>
        </div>
        <p className="mt-3 text-sm text-roseMuted">Applications are reviewed before acceptance.</p>
      </section>

      <section id="faq" className="relative mx-auto max-w-4xl scroll-mt-28 px-5 py-14">
        <SectionHeading eyebrow="FAQ" title="Questions Before You Apply?" copy="Everything you need to know before joining ROSE." center />
        <FAQ />
      </section>

      <footer className="relative mx-auto max-w-7xl border-t border-roseGold/20 px-5 py-12">
        <RoseLogo className="mb-6 h-20 w-20" />
        <h2 className="font-editorial text-4xl font-bold text-roseCream">Have Questions?</h2>
        <div className="mt-6 grid gap-4 text-sm text-roseMuted md:grid-cols-3">
          <ContactLine label="Interested in joining ROSE?" email={siteConfig.contacts.creators} />
          <ContactLine label="Already a ROSE creator and need help?" email={siteConfig.contacts.support} />
          <ContactLine label="General inquiries:" email={siteConfig.contacts.general} />
        </div>
        <div className="mt-8 flex flex-wrap gap-5 text-sm font-bold text-roseCream">
          <a href={siteConfig.tiktokUrl} target="_blank" rel="noopener noreferrer">TikTok: {siteConfig.tiktokHandle}</a>
          <a href={siteConfig.founderTikTokUrl} target="_blank" rel="noopener noreferrer">Founder: {siteConfig.founderHandle}</a>
        </div>
        <p className="mt-8 text-lg font-black text-roseCream">ROSE Agency</p>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-roseGold">Create. Connect. Elevate.</p>
        <p className="mt-5 text-xs text-roseMuted">© 2026 ROSE Agency.</p>
      </footer>

      <div className="fixed inset-x-4 bottom-4 z-50 md:hidden">
        <div className="rounded-full border border-roseGold/25 bg-roseBlack/90 p-2 text-center shadow-glow backdrop-blur">
          <ApplyButton source="sticky_mobile" className="w-full min-h-11 text-[11px]" />
        </div>
      </div>
    </main>
  );
}

function RoseLogo({ className }: { className: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={siteConfig.assets.logo} alt="ROSE Agency" className={`shrink-0 object-contain ${className}`} />
  );
}

function ContactLine({ label, email }: { label: string; email: string }) {
  return (
    <p>
      <span className="block text-roseMuted">{label}</span>
      <a href={`mailto:${email}`} className="font-black text-roseGoldSoft">
        {email}
      </a>
    </p>
  );
}
