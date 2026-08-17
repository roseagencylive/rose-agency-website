export function SectionHeading({
  eyebrow,
  title,
  copy,
  center = false,
  compactMobile = false,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  center?: boolean;
  compactMobile?: boolean;
}) {
  return (
    <div className={`${compactMobile ? 'mb-3 md:mb-8' : 'mb-8'} max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow ? (
        <p
          className={`font-black uppercase text-roseGold ${
            compactMobile
              ? 'mb-2 text-[10px] leading-4 tracking-[0.16em] md:mb-3 md:text-xs md:tracking-[0.24em]'
              : 'mb-3 text-xs tracking-[0.24em]'
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-editorial font-bold leading-tight text-roseCream ${
          compactMobile ? 'text-[2rem] sm:text-4xl md:text-5xl' : 'text-4xl md:text-5xl'
        }`}
      >
        {title}
      </h2>
      {copy ? <p className="mt-4 text-base leading-7 text-roseMuted md:text-lg">{copy}</p> : null}
    </div>
  );
}
