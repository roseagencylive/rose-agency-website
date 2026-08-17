export function BenefitCard({ title, copy }: { title: string; copy: string }) {
  return (
    <article className="group relative overflow-hidden rounded-lg border border-roseGold/18 bg-[linear-gradient(160deg,rgba(248,238,220,0.06),rgba(58,8,19,0.2))] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-0.5 hover:border-roseGold/45 hover:shadow-[0_22px_60px_rgba(216,182,106,0.08)]">
      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-roseGold/35 to-transparent" />
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-roseGold/25 bg-roseGold/12 text-sm text-roseGold transition group-hover:bg-roseGold/18">✦</div>
      <h3 className="text-sm font-black uppercase tracking-[0.15em] text-roseCream">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-roseMuted">{copy}</p>
    </article>
  );
}

export function ComparisonList({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: 'before' | 'after';
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-lg border p-5 shadow-[0_20px_70px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-0.5 ${
        tone === 'before'
          ? 'border-roseBurgundy/45 bg-[linear-gradient(150deg,rgba(100,22,40,0.24),rgba(19,9,11,0.72))]'
          : 'border-roseGold/35 bg-[linear-gradient(150deg,rgba(216,182,106,0.1),rgba(58,8,19,0.28),rgba(19,9,11,0.76))]'
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent ${
          tone === 'before' ? 'via-roseBurgundy/80' : 'via-roseGold/60'
        } to-transparent`}
      />
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-roseCream">{title}</h3>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-black ${
            tone === 'before'
              ? 'border-roseBurgundy/60 bg-roseBlack/35 text-roseMuted'
              : 'border-roseGold/45 bg-roseGold/15 text-roseGold'
          }`}
          aria-hidden="true"
        >
          {tone === 'before' ? '×' : '✓'}
        </span>
      </div>
      <ul className="space-y-3.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-roseMuted">
            <span
              className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${
                tone === 'before' ? 'bg-roseBurgundy' : 'bg-roseGold'
              }`}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
