'use client';

import { useMemo, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EngagementRing } from './decor/Rings';
import { Sparkle } from './decor/Sparkle';
import { Blossom, Leaf } from './decor/Flower';
import { invitationConfig } from '@/lib/invitationConfig';
import { EASE } from '@/lib/ease';

/**
 * Cinematic full-screen intro — deepened & premium:
 *  a near-black burgundy night, rising golden embers and star specks,
 *  rings glide in from both sides, interlock and glow, then the couple's
 *  names appear in gold script above "Together Forever Begins Here" and the
 *  "Open Our Invitation" button.
 *
 * On click the curtain panels slide apart while the stage floats up and
 * dissolves. A global `invitation:open` event fires so music can start from
 * the gesture.
 */
export function IntroAnimation({
  onDone,
  onOpen,
}: {
  onDone: () => void;
  onOpen: () => void;
}) {
  const [revealing, setRevealing] = useState(false);
  const [exiting, setExiting] = useState(false);
  const reduce = useReducedMotionSafe();

  const particles = useMemo(() => genParticles(), []);
  const embers = useMemo(() => genEmbers(), []);
  const bokeh = useMemo(() => genBokeh(), []);
  const flowers = useMemo(() => genFlowers(), []);

  const handleOpen = () => {
    if (revealing) return;
    setRevealing(true);
    onOpen(); // reveal the invitation behind the curtains
    // Fire inside the click gesture so the music engine may start.
    window.dispatchEvent(new Event('invitation:open'));
    window.setTimeout(() => setExiting(true), 1350);
    window.setTimeout(() => onDone(), 2150);
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.1, ease: EASE } }}
          aria-label="Engagement invitation intro"
        >
          {/* deep romantic night backdrop */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4 }}
            style={{
              background:
                'radial-gradient(130% 100% at 50% 6%, #3A1620 0%, #250D14 42%, #16070C 100%)',
            }}
          />

          {/* warm gold aura from below */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.2 }}
            style={{
              background:
                'radial-gradient(70% 55% at 50% 118%, rgba(228,201,139,0.16) 0%, rgba(228,201,139,0.05) 45%, transparent 72%)',
            }}
          />

          {/* vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 120% at 50% 50%, transparent 55%, rgba(10,4,6,0.55) 100%)',
            }}
            aria-hidden="true"
          />

          {/* bokeh lights */}
          {!reduce && (
            <div className="absolute inset-0" aria-hidden="true">
              {bokeh.map((b) => (
                <span
                  key={b.id}
                  className="anim-bokeh absolute rounded-full"
                  style={{
                    left: `${b.left}%`,
                    top: `${b.top}%`,
                    width: b.size,
                    height: b.size,
                    background: b.tone,
                    filter: 'blur(2px)',
                    animationDelay: `${b.delay}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* rising golden embers */}
          {!reduce && (
            <div className="absolute inset-0" aria-hidden="true">
              {embers.map((e) => (
                <span
                  key={e.id}
                  className="anim-ember"
                  style={
                    {
                      left: `${e.left}%`,
                      width: e.size,
                      height: e.size,
                      animationDuration: `${e.dur}s`,
                      animationDelay: `${e.delay}s`,
                      opacity: e.opacity,
                      '--ember-drift': `${e.drift}px`,
                    } as CSSProperties
                  }
                />
              ))}
            </div>
          )}

          {/* twinkling star specks */}
          {!reduce && (
            <div className="absolute inset-0" aria-hidden="true">
              {particles.map((p) => (
                <span
                  key={p.id}
                  className="anim-twinkle absolute rounded-full bg-[#F3E3C0]"
                  style={{
                    left: `${p.left}%`,
                    top: `${p.top}%`,
                    width: p.size,
                    height: p.size,
                    boxShadow: '0 0 6px 1px rgba(228,201,139,0.8)',
                    animationDelay: `${p.delay}s`,
                    animationDuration: `${p.dur}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* floating flowers */}
          {!reduce && (
            <div className="absolute inset-0" aria-hidden="true">
              {flowers.map((f) => (
                <div
                  key={f.id}
                  className="anim-float-slow absolute"
                  style={{
                    left: `${f.left}%`,
                    top: `${f.top}%`,
                    animationDelay: `${f.delay}s`,
                  }}
                >
                  <Blossom size={f.size} tone={f.tone} opacity={f.opacity} />
                </div>
              ))}
            </div>
          )}

          {/* ============ CENTER STAGE ============ */}
          <motion.div
            className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6"
            animate={revealing ? { y: -56, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {/* ring + glow container */}
            <div className="relative mb-6 flex h-[240px] w-[280px] items-center justify-center sm:h-[272px] sm:w-[352px]">
              {/* soft heart glow behind the rings */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.9, duration: 1.4, ease: EASE }}
              >
                <svg width="300" height="260" viewBox="0 0 300 260" aria-hidden="true">
                  <defs>
                    <radialGradient id="intro-heart-glow" cx="50%" cy="42%" r="60%">
                      <stop offset="0%" stopColor="rgba(228,201,139,0.6)" />
                      <stop offset="60%" stopColor="rgba(200,164,93,0.2)" />
                      <stop offset="100%" stopColor="rgba(200,164,93,0)" />
                    </radialGradient>
                  </defs>
                  <path
                    d="M150 210 C150 210 40 140 40 88 C40 52 72 38 96 46 C122 54 150 88 150 88 C150 88 178 54 204 46 C228 38 260 52 260 88 C260 140 150 210 150 210 Z"
                    fill="url(#intro-heart-glow)"
                    className="anim-glow-pulse"
                  />
                  <path
                    d="M150 210 C150 210 40 140 40 88 C40 52 72 38 96 46 C122 54 150 88 150 88 C150 88 178 54 204 46 C228 38 260 52 260 88 C260 140 150 210 150 210 Z"
                    fill="none"
                    stroke="rgba(228,201,139,0.4)"
                    strokeWidth="1"
                  />
                </svg>
              </motion.div>

              {/* golden glow disc */}
              <motion.div
                className="absolute h-56 w-56 rounded-full sm:h-64 sm:w-64"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 0.6, scale: 1 }}
                transition={{ delay: 1.6, duration: 1.6, ease: EASE }}
                style={{
                  background:
                    'radial-gradient(circle, rgba(228,201,139,0.55) 0%, rgba(200,164,93,0.2) 45%, transparent 70%)',
                  filter: 'blur(6px)',
                }}
              />

              {/* sparkles around the rings */}
              {!reduce && (
                <>
                  {[
                    { x: -84, y: -46, s: 14, d: 2.3 },
                    { x: 90, y: -30, s: 10, d: 2.5 },
                    { x: -58, y: 56, s: 9, d: 2.7 },
                    { x: 66, y: 66, s: 12, d: 2.9 },
                    { x: 0, y: -88, s: 8, d: 3.1 },
                  ].map((sp, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{ left: '50%', top: '50%' }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: sp.d, duration: 0.8, ease: EASE }}
                    >
                      <Sparkle
                        size={sp.s}
                        style={{ transform: `translate(calc(-50% + ${sp.x}px), calc(-50% + ${sp.y}px))` }}
                      />
                    </motion.div>
                  ))}
                </>
              )}

              {/* RING A — from the left */}
              <motion.div
                className="absolute"
                initial={reduce ? { x: -34, rotate: -14, opacity: 1 } : { x: -260, rotate: -40, opacity: 0 }}
                animate={reduce ? undefined : { x: -34, rotate: -14, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.35, ease: EASE }}
                style={{ zIndex: 2 }}
              >
                <EngagementRing size={132} />
              </motion.div>

              {/* RING B — from the right */}
              <motion.div
                className="absolute"
                initial={reduce ? { x: 34, rotate: 14, opacity: 1 } : { x: 260, rotate: 40, opacity: 0 }}
                animate={reduce ? undefined : { x: 34, rotate: 14, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.45, ease: EASE }}
                style={{ zIndex: 3 }}
              >
                <EngagementRing size={132} />
              </motion.div>
            </div>

            {/* names + tagline */}
            <motion.div
              className="text-center"
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 22 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 2.55, duration: 1, ease: EASE }}
            >
              <p
                className="font-script text-[3.4rem] leading-tight text-gradient-gold sm:text-6xl md:text-7xl"
                aria-label={`${invitationConfig.brideName} and ${invitationConfig.groomName}`}
              >
                <span className="inline-block">{invitationConfig.brideName}</span>
                <span className="mx-3 inline-block align-middle text-2xl text-[#C9878E] sm:text-3xl" aria-hidden="true">
                  <motion.svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    initial={reduce ? { scale: 1 } : { scale: 0 }}
                    animate={reduce ? undefined : { scale: 1 }}
                    transition={{ delay: 2.85, type: 'spring', stiffness: 240, damping: 14 }}
                    className="anim-heartbeat"
                  >
                    <path
                      d="M12 21 C12 21 2 14.5 2 8.5 C2 4.5 5 3 7.5 3 C10 3 12 5.5 12 5.5 C12 5.5 14 3 16.5 3 C19 3 22 4.5 22 8.5 C22 14.5 12 21 12 21 Z"
                      fill="#E4C98B"
                    />
                  </motion.svg>
                </span>
                <span className="inline-block">{invitationConfig.groomName}</span>
              </p>
            </motion.div>

            {/* thin ornamental divider */}
            <motion.div
              className="mt-5 flex items-center justify-center gap-4"
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={reduce ? undefined : { opacity: 1 }}
              transition={{ delay: 2.95, duration: 1 }}
              aria-hidden="true"
            >
              <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#C8A45D]/70" />
              <svg width="14" height="14" viewBox="0 0 24 24">
                <path
                  d="M12 21 C12 21 2 14.5 2 8.5 C2 4.5 5 3 7.5 3 C10 3 12 5.5 12 5.5 C12 5.5 14 3 16.5 3 C19 3 22 4.5 22 8.5 C22 14.5 12 21 12 21 Z"
                  fill="#C9878E"
                />
              </svg>
              <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#C8A45D]/70" />
            </motion.div>

            <motion.p
              className="mt-4 text-center font-serif text-lg tracking-[0.28em] text-[#E9D3A0]/90 uppercase sm:text-xl"
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 1, ease: EASE }}
            >
              Together Forever Begins Here
            </motion.p>

            {/* CTA button */}
            <motion.div
              className="mt-10"
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 3.7, duration: 0.9, ease: EASE }}
            >
              <motion.button
                type="button"
                onClick={handleOpen}
                className="gold-ring-btn anim-float-soft rounded-full px-8 py-3.5 font-sans text-[13px] font-medium uppercase tracking-[0.24em] text-[#E9D3A0] sm:px-10 sm:py-4"
              >
                <span className="flex items-center gap-3">
                  Open Our Invitation
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 20.5C12 20.5 3.5 15 3.5 8.8 3.5 5.6 6 3.5 8.4 3.5c1.6 0 3 .8 3.6 2 .6-1.2 2-2 3.6-2C17.9 3.5 20.5 5.6 20.5 8.8c0 6.2-8.5 11.7-8.5 11.7Z" />
                  </svg>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* ============ CURTAIN PANELS ============ */}
          {/* left panel */}
          <motion.div
            className="absolute left-0 top-0 z-[5] h-full w-1/2 origin-left"
            animate={revealing ? { x: '-100%' } : { x: 0 }}
            transition={{ duration: 1.15, ease: EASE }}
            style={{
              background:
                'linear-gradient(100deg, #2A0D14 0%, #3A1620 40%, #200A0F 100%)',
            }}
            aria-hidden="true"
          >
            {/* gold trim on the meeting edge */}
            <div
              className="absolute inset-y-0 right-0 w-px"
              style={{ background: 'linear-gradient(180deg, transparent, #C8A45D 30%, #E4C98B 50%, #C8A45D 70%, transparent)' }}
            />
            <PanelTexture side="left" />
          </motion.div>

          {/* right panel */}
          <motion.div
            className="absolute right-0 top-0 z-[5] h-full w-1/2 origin-right"
            animate={revealing ? { x: '100%' } : { x: 0 }}
            transition={{ duration: 1.15, ease: EASE }}
            style={{
              background:
                'linear-gradient(260deg, #2A0D14 0%, #3A1620 40%, #200A0F 100%)',
            }}
            aria-hidden="true"
          >
            <div
              className="absolute inset-y-0 left-0 w-px"
              style={{ background: 'linear-gradient(180deg, transparent, #C8A45D 30%, #E4C98B 50%, #C8A45D 70%, transparent)' }}
            />
            <PanelTexture side="right" />
          </motion.div>

          {/* floral corners that burst outward on reveal */}
          {!reduce && (
            <motion.div
              className="pointer-events-none absolute inset-0 z-30"
              animate={
                revealing
                  ? { opacity: 0, scale: 1.18 }
                  : { opacity: 1, scale: 1 }
              }
              transition={{ duration: 1.1, ease: EASE }}
              aria-hidden="true"
            >
              <div className="absolute left-4 top-4 sm:left-8 sm:top-8">
                <Blossom size={34} tone="cream" opacity={0.9} />
                <Leaf size={26} color="#C8A45D" className="ml-4 -mt-2" />
              </div>
              <div className="absolute right-4 top-4 sm:right-8 sm:top-8">
                <Blossom size={34} tone="cream" opacity={0.9} />
                <Leaf size={26} color="#C8A45D" flip className="mr-4 -mt-2" />
              </div>
              <div className="absolute bottom-6 left-5 sm:left-9 sm:bottom-8">
                <Leaf size={24} color="#A9B98A" className="mb-1" />
                <Blossom size={28} tone="rose" opacity={0.75} />
              </div>
              <div className="absolute bottom-6 right-5 sm:right-9 sm:bottom-8">
                <Leaf size={24} color="#A9B98A" flip className="mb-1" />
                <Blossom size={28} tone="rose" opacity={0.75} />
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Minimal client-safe reduced-motion check (intro only). */
function useReducedMotionSafe(): boolean {
  const [reduce] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  return reduce;
}

function genParticles() {
  const out: { id: number; left: number; top: number; size: number; delay: number; dur: number }[] = [];
  let s = 11;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 26; i++) {
    out.push({
      id: i,
      left: rnd() * 100,
      top: rnd() * 100,
      size: 2 + rnd() * 3,
      delay: rnd() * 3,
      dur: 2.5 + rnd() * 2.5,
    });
  }
  return out;
}

function genEmbers() {
  const out: { id: number; left: number; size: number; delay: number; dur: number; opacity: number; drift: number }[] = [];
  let s = 29;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 16; i++) {
    out.push({
      id: i,
      left: rnd() * 100,
      size: 3 + rnd() * 5,
      delay: rnd() * 10,
      dur: 12 + rnd() * 10,
      opacity: 0.35 + rnd() * 0.5,
      drift: (rnd() - 0.5) * 90,
    });
  }
  return out;
}

function genBokeh() {
  const tones = ['rgba(200,164,93,0.35)', 'rgba(201,135,142,0.30)', 'rgba(245,230,211,0.22)'];
  const out: { id: number; left: number; top: number; size: number; delay: number; tone: string }[] = [];
  let s = 23;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 14; i++) {
    out.push({
      id: i,
      left: rnd() * 100,
      top: rnd() * 100,
      size: 12 + rnd() * 34,
      delay: rnd() * 5,
      tone: tones[i % tones.length],
    });
  }
  return out;
}

function genFlowers() {
  const out: { id: number; left: number; top: number; size: number; tone: 'rose' | 'cream'; opacity: number; delay: number }[] = [];
  let s = 41;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const spots = [
    { left: 8, top: 20 },
    { left: 84, top: 14 },
    { left: 12, top: 74 },
    { left: 86, top: 70 },
    { left: 48, top: 6 },
    { left: 5, top: 46 },
    { left: 93, top: 44 },
  ];
  spots.forEach((sp, i) => {
    out.push({
      id: i,
      left: sp.left,
      top: sp.top,
      size: 20 + rnd() * 18,
      tone: i % 2 ? 'rose' : 'cream',
      opacity: 0.35 + rnd() * 0.2,
      delay: rnd() * 3,
    });
  });
  return out;
}

/** Decorative vertical floral trim along a curtain edge. */
function PanelTexture({ side }: { side: 'left' | 'right' }) {
  const items = Array.from({ length: 6 }, (_, i) => i);
  return (
    <div className={`absolute inset-0 flex ${side === 'left' ? 'flex-row-reverse' : ''}`} aria-hidden="true">
      <div className="h-full w-16 border-l border-r border-[#E4C98B]/15 bg-[#E4C98B]/5" />
      <div className="flex h-full w-full flex-col justify-between py-6">
        {items.map((i) => (
          <div key={i} className="flex justify-center opacity-40">
            <Blossom size={14 + (i % 3) * 6} tone="cream" />
          </div>
        ))}
      </div>
    </div>
  );
}
