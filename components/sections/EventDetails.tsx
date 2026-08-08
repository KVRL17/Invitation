'use client';

import { invitationConfig, EVENT_DATETIME, EVENT_WEEKDAY } from '@/lib/invitationConfig';
import { Icon } from '../decor/Icons';
import { Reveal } from '../motion/Reveal';
import { Blossom, Leaf } from '../decor/Flower';

/**
 * Engagement Ceremony — date / time / venue card with elegant icons and a
 * "View Location" button that opens Google Maps.
 */
export function EventDetails() {
  const date = new Date(EVENT_DATETIME);
  const dateLabel = date.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const rows = [
    { icon: 'calendar' as const, label: 'Date', value: dateLabel },
    { icon: 'clock' as const, label: 'Time', value: invitationConfig.eventTimeLabel },
    { icon: 'pin' as const, label: 'Venue', value: invitationConfig.venueName },
    { icon: 'home' as const, label: 'Address', value: invitationConfig.venueAddress },
  ];

  return (
    <section id="event-details" className="relative overflow-hidden px-5 py-14 sm:py-28" aria-label="Engagement ceremony details">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Blossom size={80} tone="cream" opacity={0.4} className="absolute -right-8 top-10" />
        <Blossom size={60} tone="rose" opacity={0.2} className="absolute -left-6 bottom-24" />
        <Leaf size={30} color="#A9B98A" className="absolute right-[10%] bottom-16 opacity-60" />
      </div>

      <Reveal direction="up" className="text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.42em] text-gold-dark sm:text-xs">
          Join us at
        </p>
        <h2 className="mt-2 font-script text-4xl text-burgundy sm:mt-3 sm:text-6xl">
          Engagement Ceremony
        </h2>
      </Reveal>

      <Reveal delay={0.2} className="mx-auto mt-8 max-w-2xl sm:mt-12">
        <div className="glass-card overflow-hidden rounded-[2rem] p-6 sm:rounded-[2.5rem] sm:p-10">
          <ul className="divide-y divide-gold/15">
            {rows.map((row) => (
              <li key={row.label} className="flex items-center gap-4 py-4 sm:gap-5 sm:py-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-ivory text-gold-dark">
                  <Icon name={row.icon} size={22} />
                </span>
                <div className="min-w-0">
                  <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold-dark sm:text-[11px]">
                    {row.label}
                  </p>
                  <p className="mt-0.5 font-serif text-lg text-ink sm:text-xl">{row.value}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-center sm:mt-8">
            <a
              href={invitationConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-ring-btn inline-flex items-center gap-3 rounded-full px-9 py-3.5 font-sans text-[12px] font-medium uppercase tracking-[0.26em] text-burgundy"
            >
              View Location
              <Icon name="pin" size={16} color="currentColor" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
