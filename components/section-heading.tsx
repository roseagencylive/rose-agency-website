export function SectionHeading({
  eyebrow,
  title,
  copy,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-8 max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-roseGold">{eyebrow}</p>
      ) : null}
      <h2 className="font-editorial text-4xl font-bold leading-tight text-roseCream md:text-5xl">{title}</h2>
      {copy ? <p className="mt-4 text-base leading-7 text-roseMuted md:text-lg">{copy}</p> : null}
    </div>
  );
}
