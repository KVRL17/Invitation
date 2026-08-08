'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AmbientEngine } from '@/lib/audioEngine';
import { invitationConfig } from '@/lib/invitationConfig';

/** Play the background track only between these timestamps (seconds), looping. */
const AUDIO_START = 10;
const AUDIO_END = 90;

/**
 * MusicPlayer — a small floating control (bottom-right).
 *
 * - Listens for the global `invitation:open` event fired by the intro's
 *   "Open Our Invitation" click, then starts music from that user gesture.
 * - Uses the configured audio file if one is provided, otherwise the
 *   built-in generative AmbientEngine (no file required).
 * - Plays only the [AUDIO_START, AUDIO_END) segment of the file and loops it.
 * - Starts at low volume, never restarts during navigation, never covers
 *   important content.
 */
export function MusicPlayer() {
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const engineRef = useRef<AmbientEngine | null>(null);
  const fileUrl = invitationConfig.backgroundMusic;

  const start = useCallback(async () => {
    if (playing) return;

    if (fileUrl) {
      if (!audioRef.current) {
        const audio = new Audio(fileUrl);
        audio.volume = 0.18;
        // Loop only the chosen segment, not the whole file.
        audio.addEventListener('timeupdate', () => {
          if (audio.currentTime >= AUDIO_END) audio.currentTime = AUDIO_START;
        });
        audioRef.current = audio;
      }
      const audio = audioRef.current;
      // Jump straight to the segment start (also handles resume near the end).
      if (audio.currentTime < AUDIO_START || audio.currentTime >= AUDIO_END) {
        audio.currentTime = AUDIO_START;
      }
      await audio.play();
    } else {
      if (!engineRef.current) engineRef.current = new AmbientEngine();
      await engineRef.current.start();
      engineRef.current.setPlaying(true);
    }
    setPlaying(true);
    setVisible(true);
  }, [fileUrl, playing]);

  const toggle = useCallback(() => {
    if (fileUrl && audioRef.current) {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        void audioRef.current.play();
        setPlaying(true);
      }
      return;
    }
    const engine = engineRef.current;
    if (!engine) return;
    engine.setPlaying(!playing);
    setPlaying(!playing);
  }, [fileUrl, playing]);

  useEffect(() => {
    const onOpen = () => void start();
    window.addEventListener('invitation:open', onOpen);
    return () => window.removeEventListener('invitation:open', onOpen);
  }, [start]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={toggle}
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-burgundy-deep/80 text-gold-light shadow-glow-soft backdrop-blur-md"
          aria-label={playing ? 'Pause music' : 'Play music'}
          aria-pressed={playing}
        >
          {playing ? (
            <span className="flex items-end gap-[3px]" aria-hidden="true">
              {[0.9, 1.15, 0.75].map((h, i) => (
                <motion.span
                  key={i}
                  className="w-[3px] rounded-full bg-gold-light"
                  animate={{ height: [5, 5 * h * 1.6, 5] }}
                  transition={{ duration: 0.9 + i * 0.12, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}
            </span>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18V6l10-2v12" />
              <circle cx="6.5" cy="18" r="2.5" />
              <circle cx="16.5" cy="16" r="2.5" />
            </svg>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
