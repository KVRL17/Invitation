'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { invitationConfig } from '@/lib/invitationConfig';
import { Reveal } from '../motion/Reveal';
import { HeartOrnament } from '../decor/Flower';

const ROTATIONS = [-3, 2.4, -1.6, 2.8, -2.4, 1.8];

/**
 * Photo Gallery — polaroid-style cards that fade up with a slight tilt while
 * scrolling. Clicking opens a smooth keyboard-accessible lightbox.
 */
export function Gallery() {
  const images = invitationConfig.galleryImages;
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(
    () => setOpen((o) => (o === null ? o : (o + 1) % images.length)),
    [images.length]
  );
  const prev = useCallback(
    () => setOpen((o) => (o === null ? o : (o - 1 + images.length) % images.length)),
    [images.length]
  );

  // keyboard + scroll lock while lightbox is open
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, next, prev]);

  return (
    <section className="relative overflow-hidden px-5 py-14 sm:py-28" aria-label="Photo gallery">
      <Reveal direction="up" className="text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.42em] text-gold-dark sm:text-xs">
          Moments to treasure
        </p>
        <h2 className="mt-2 font-script text-4xl text-burgundy sm:mt-3 sm:text-6xl">
          Our Beautiful Moments
        </h2>
        <div className="mt-4 flex items-center justify-center gap-3 sm:mt-5" aria-hidden="true">
          <span className="h-px w-16 bg-gold/50" />
          <HeartOrnament size={14} color="#C9878E" className="anim-heartbeat" />
          <span className="h-px w-16 bg-gold/50" />
        </div>
      </Reveal>

      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:mt-14 sm:gap-8 md:grid-cols-3">
        {images.map((src, i) => (
          <Reveal
            key={src}
            direction="up"
            delay={(i % 3) * 0.12}
            amount={0.15}
            className="h-full"
          >
            <motion.button
              type="button"
              onClick={() => setOpen(i)}
              whileHover={{ y: -8, rotate: 0, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              className="group block w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-gold"
              aria-label={`Open photo ${i + 1}`}
              style={{ transform: `rotate(${ROTATIONS[i % ROTATIONS.length]}deg)` }}
            >
              <div className="rounded-2xl bg-white p-2 pb-4 shadow-card sm:p-3 sm:pb-5">
                <div className="overflow-hidden rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`Our beautiful moment ${i + 1}`}
                    loading="lazy"
                    width={800}
                    height={1000}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <p className="mt-2 text-center font-script text-lg text-burgundy/80 sm:mt-3 sm:text-2xl">
                  {invitationConfig.brideInitial} <span className="text-rose">♥</span> {invitationConfig.groomInitial}
                </p>
              </div>
            </motion.button>
          </Reveal>
        ))}
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-burgundy-deep/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`Photo ${open + 1} of ${images.length}`}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold-light transition hover:bg-gold/15"
              aria-label="Close photo"
            >
              ✕
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 text-gold-light transition hover:bg-gold/15 sm:left-6"
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 text-gold-light transition hover:bg-gold/15 sm:right-6"
              aria-label="Next photo"
            >
              ›
            </button>

            <motion.img
              key={images[open]}
              src={images[open]}
              alt={`Our beautiful moment ${open + 1}`}
              className="max-h-[82vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
