'use client';

import { Reveal } from '../motion/Reveal';
import { CoupleTogether } from '../decor/CoupleTogether';
import { Blossom, Leaf } from '../decor/Flower';

/**
 * Couple Illustration — a premium cartoon scene of Brinda & Chaitanya
 * together beneath a floral arch, with fairy lights and a beating heart.
 * Replaces the previous hand-drawn scene with a richer, on-theme artwork.
 */
export function CoupleIllustration() {
  return (
    <section className="relative overflow-hidden px-5 py-24 sm:py-28" aria-label="A celebration of love">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Blossom size={88} tone="rose" opacity={0.16} className="absolute -left-8 top-16" />
        <Blossom size={70} tone="cream" opacity={0.5} className="absolute -right-7 bottom-16" />
        <Leaf size={32} color="#A9B98A" className="absolute left-[10%] bottom-24 opacity-60" />
      </div>

      <Reveal direction="up" className="text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.42em] text-gold-dark sm:text-xs">
          A celebration of love
        </p>
        <h2 className="mt-3 font-script text-5xl text-burgundy sm:text-6xl">
          And So It Begins
        </h2>
      </Reveal>

      <Reveal delay={0.2} className="mx-auto mt-12 max-w-3xl">
        <CoupleTogether className="shadow-card" />
      </Reveal>

      <Reveal delay={0.3} className="mt-8 text-center">
        <p className="mx-auto max-w-md font-serif text-lg italic text-ink-soft">
          Hand in hand, beneath a sky full of blessings — the beginning of a
          lifetime of togetherness.
        </p>
      </Reveal>
    </section>
  );
}
