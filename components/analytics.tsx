'use client';

import { siteConfig, trackRoseEvent } from '@/lib/site-config';

export function ApplyButton({
  source,
  children = 'Apply To Join ROSE',
  className = '',
}: {
  source: string;
  children?: string;
  className?: string;
}) {
  return (
    <a
      href={siteConfig.applicationUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackRoseEvent('rose_apply_cta_click', { source })}
      className={`inline-flex min-h-12 items-center justify-center rounded-full bg-roseGold px-6 py-3 text-center text-xs font-black uppercase tracking-[0.12em] text-roseBlack shadow-glow transition hover:-translate-y-0.5 hover:bg-roseGoldSoft focus-visible:ring-2 focus-visible:ring-roseGold focus-visible:ring-offset-2 focus-visible:ring-offset-roseBlack ${className}`}
    >
      {children}
      <span aria-hidden="true" className="ml-2">
        →
      </span>
    </a>
  );
}
