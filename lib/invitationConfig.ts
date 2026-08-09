/**
 * ============================================================================
 *  ENGAGEMENT INVITATION — SINGLE SOURCE OF TRUTH
 * ----------------------------------------------------------------------------
 *  Every section of the invitation reads from this file, so updating the
 *  whole invitation is a matter of editing the values below.
 *
 *  To replace placeholder content:
 *    - Update the names, dates and venue below.
 *    - Drop your own photos into /public/gallery and point `galleryImages`
 *      at them (any size is fine, they will be cropped into cards).
 *    - Provide your own music file in /public/audio and set `backgroundMusic`.
 *      While it is empty the site plays a soft generative ambient track so
 *      the music feature always works.
 * ============================================================================
 */

export const invitationConfig = {
  /* ------------------------------------------------------------------ */
  /* Couple                                                             */
  /* ------------------------------------------------------------------ */
  brideName: 'Brinda',
  groomName: 'Chaitanya',
  brideInitial: 'B',
  groomInitial: 'C',

  /* ------------------------------------------------------------------ */
  /* Event                                                              */
  /* ------------------------------------------------------------------ */
  eventDate: '2026-08-16', // ISO format, used by the countdown
  eventTime: '12:00:00', // 24h, local — used by the countdown
  eventDateLabel: '16 August 2026',
  eventTimeLabel: '12:00 PM onwards',
  eventWeekdayLabel: 'Saturday', // derived automatically if left empty

  /* ------------------------------------------------------------------ */
  /* Venue                                                              */
  /* ------------------------------------------------------------------ */
  venueName: 'Eat and Play Convention Hall',
  venueAddress: 'Beside HP Petrol Bunk, Y Junction, Rajahmundry, Andhra Pradesh 533103',
  googleMapsUrl: 'https://maps.app.goo.gl/ojy8zo1nTDqE7pzu6?g_st=iw',

  /* ------------------------------------------------------------------ */
  /* RSVP / Contact                                                     */
  /* ------------------------------------------------------------------ */
  whatsappNumber: '918074615740', // international format, digits only
  rsvpMessage:
    'Hello! Thank you for inviting me. I would love to join your engagement celebration.',
  rsvpWishesMessage:
    'Hello! Sending you both my love and heartfelt wishes on your engagement.',

  /* ------------------------------------------------------------------ */
  /* Media                                                              */
  /* ------------------------------------------------------------------ */
  coupleImages: [
    '/gallery/placeholder-1.svg',
    '/gallery/placeholder-2.svg',
    '/gallery/placeholder-3.svg',
  ],
  galleryImages: [
    '/gallery/placeholder-1.svg',
    '/gallery/placeholder-2.svg',
    '/gallery/placeholder-3.svg',
    '/gallery/placeholder-4.svg',
  ],
  /**
   * Leave empty to use the built-in generative ambient track.
   *
   * Current track: "Sada Nannu" instrumental sitar cover (from the Telugu
   * film Mahanati), pre-trimmed to the looped segment (~80s, ~0.9 MB) so it
   * buffers fast. It is preloaded during the intro and starts the moment the
   * guest opens the invitation — see components/MusicPlayer.tsx.
   */
  // backgroundMusic: '',
  backgroundMusic: '/audio/sada-nannu.mp3',
} as const;

/** Resolved event date (used by countdown + save-the-date). */
export const EVENT_DATETIME = new Date(
  `${invitationConfig.eventDate}T${invitationConfig.eventTime}`
).getTime();

/** Human weekday name, derived from the configured date. */
export const EVENT_WEEKDAY = formatWeekday(EVENT_DATETIME);

function formatWeekday(ts: number): string {
  const day = new Date(ts).toLocaleDateString('en-US', { weekday: 'long' });
  return day || 'Saturday';
}

export const WHATSAPP_LINK = `https://wa.me/${invitationConfig.whatsappNumber}?text=${encodeURIComponent(
  invitationConfig.rsvpMessage
)}`;

export const WHATSAPP_WISHES_LINK = `https://wa.me/${invitationConfig.whatsappNumber}?text=${encodeURIComponent(
  invitationConfig.rsvpWishesMessage
)}`;
