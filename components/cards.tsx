export function BenefitCard({ title, copy }: { title: string; copy: string }) {
  return (
    <article className="rounded-lg border border-roseGold/20 bg-roseCream/[0.045] p-6 transition hover:-translate-y-1 hover:border-roseGold/45">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-roseGold/15 text-roseGold">✦</div>
      <h3 className="text-sm font-black uppercase tracking-[0.16em] text-roseCream">{title}</h3>
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
      className={`rounded-lg border p-6 ${
        tone === 'before'
          ? 'border-red-900/50 bg-roseBurgundy/20'
          : 'border-roseGold/30 bg-roseGold/[0.07]'
      }`}
    >
      <h3 className="mb-5 text-sm font-black uppercase tracking-[0.18em] text-roseCream">{title}</h3>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-roseMuted">
            <span
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                tone === 'before' ? 'bg-red-900 text-roseCream' : 'bg-roseGold text-roseBlack'
              }`}
            >
              {tone === 'before' ? '×' : '✓'}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
