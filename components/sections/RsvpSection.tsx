'use client';

import { WHATSAPP_LINK, WHATSAPP_WISHES_LINK } from '@/lib/invitationConfig';
import { Icon } from '../decor/Icons';
import { Reveal, Stagger } from '../motion/Reveal';
import { Blossom } from '../decor/Flower';

/**
 * RSVP — "Will You Join Us?" with WhatsApp-powered responses
 * (Joyfully Accept / Send Wishes).
 */
export function RsvpSection() {
  return (
    <section
      id="rsvp"
      className="relative overflow-hidden px-5 py-14 sm:py-32"
      aria-label="RSVP"
      style={{
        background:
          'radial-gradient(120% 100% at 50% 0%, #FFF9F3 0%, #F5E6D3 70%, #F2DDC6 100%)',
      }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Blossom size={90} tone="rose" opacity={0.14} className="absolute -right-10 top-16" />
        <Blossom size={60} tone="cream" opacity={0.5} className="absolute -left-6 bottom-16" />
      </div>

      <Reveal direction="up" className="relative z-10 text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.42em] text-gold-dark sm:text-xs">
          Our hearts await your reply
        </p>
        <h2 className="mt-2 font-script text-4xl text-burgundy sm:mt-3 sm:text-6xl">
          Will You Join Us?
        </h2>
      </Reveal>

      <Stagger className="relative z-10 mx-auto mt-8 flex max-w-md flex-col items-center gap-4 sm:mt-12 sm:gap-5" step={0.15}>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="gold-ring-btn flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-b from-gold-light/30 to-gold/20 px-6 py-4 font-sans text-[13px] font-semibold uppercase tracking-[0.22em] text-burgundy sm:px-8"
        >
          <Icon name="check" size={16} color="currentColor" />
          Joyfully Accept
        </a>

        <a
          href={WHATSAPP_WISHES_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-3 rounded-full border border-gold/50 bg-white/70 px-6 py-4 font-sans text-[13px] font-medium uppercase tracking-[0.22em] text-burgundy transition hover:-translate-y-0.5 hover:shadow-glow-soft sm:px-8"
        >
          <Icon name="chat" size={16} color="currentColor" />
          Send Wishes
        </a>
      </Stagger>

      <Reveal delay={0.4} className="relative z-10 mt-8 text-center sm:mt-10">
        <p className="font-serif text-base italic text-ink-soft sm:text-lg">
          Prefer to call or text? Reach us anytime on WhatsApp.
        </p>
      </Reveal>
    </section>
  );
}
