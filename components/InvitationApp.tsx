'use client';

import { useEffect, useState } from 'react';
import { IntroAnimation } from './IntroAnimation';
import { MusicPlayer } from './MusicPlayer';
import { CursorEffect } from './CursorEffect';
import { FloatingPetals } from './FloatingPetals';
import { HeroSection } from './sections/HeroSection';
import { Monogram } from './decor/Monogram';
import { CoupleSection } from './sections/CoupleSection';
import { RingAnimation } from './sections/RingAnimation';
import { SaveTheDate } from './sections/SaveTheDate';
import { CountdownTimer } from './sections/CountdownTimer';
import { EventDetails } from './sections/EventDetails';
import { CoupleIllustration } from './sections/CoupleIllustration';
import { Gallery } from './sections/Gallery';
import { Blessings } from './sections/Blessings';
import { RsvpSection } from './sections/RsvpSection';
import { ClosingSection } from './sections/ClosingSection';
import { Footer } from './Footer';

/**
 * InvitationApp — owns the intro → reveal state machine and assembles the
 * full one-page invitation behind the intro overlay.
 */
export function InvitationApp() {
  const [opened, setOpened] = useState(false);
  const [done, setDone] = useState(false);

  // Lock scrolling while the cinematic intro is up.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = done ? '' : 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [done]);

  return (
    <>
      {!done && (
        <IntroAnimation
          onOpen={() => setOpened(true)}
          onDone={() => setDone(true)}
        />
      )}

      <MusicPlayer />
      <CursorEffect />

      {/* main invitation — mounted as soon as the guest clicks "Open", so the
          curtains part onto the freshly-animating hero */}
      {opened && (
        <main id="invitation" className="relative">
          <HeroSection />

          <section className="py-10 sm:py-14" aria-hidden="true">
            <Monogram />
          </section>

          <CoupleSection />
          <RingAnimation />
          <SaveTheDate />
          <CountdownTimer />
          <EventDetails />
          <CoupleIllustration />
          <Gallery />
          <Blessings />
          <RsvpSection />
          <ClosingSection />
          <Footer />
        </main>
      )}

      {/* gentle petals across the invitation once it is open */}
      {opened && <FloatingPetals count={10} opacity={0.35} />}
    </>
  );
}
