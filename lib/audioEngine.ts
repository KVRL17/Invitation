/**
 * AmbientEngine — a tiny generative "music box" built on Web Audio.
 *
 * No audio files required: it synthesizes a soft, romantic instrumental bed
 * (slow piano-like plucks over a gentle pad, lightly reverbed) using the
 * A-minor pentatonic scale, so it always sounds consonant.
 *
 * The whole point is that the music feature works out-of-the-box, but a real
 * royalty-free track can be dropped into /public/audio and used instead.
 */

const PENTATONIC = [220, 261.63, 293.66, 329.63, 392, 440, 523.25, 587.33];

export class AmbientEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private pluckTimer: ReturnType<typeof setTimeout> | null = null;
  private started = false;
  private volume = 0.2;

  get isStarted() {
    return this.started;
  }

  /** Create/resume the context. Must be called from a user gesture. */
  async start() {
    if (this.ctx) {
      await this.ctx.resume();
      return;
    }
    const Ctor: typeof AudioContext =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctor();
    this.ctx = ctx;

    const master = ctx.createGain();
    master.gain.value = this.volume;
    master.connect(ctx.destination);
    this.master = master;

    // ---- reverb (synthetic impulse response) -------------------------
    const convolver = ctx.createConvolver();
    convolver.buffer = this.makeImpulse(ctx, 1.8, 2.2);
    const reverbGain = ctx.createGain();
    reverbGain.gain.value = 0.55;
    convolver.connect(reverbGain);
    reverbGain.connect(master);

    // ---- pad: two detuned triangle oscillators -----------------------
    const padGain = ctx.createGain();
    padGain.gain.value = 0.028;
    padGain.connect(master);
    [220, 329.63].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      osc.detune.value = i === 0 ? -4 : 5;
      osc.connect(padGain);
      osc.start();
    });

    // ---- slow filter LFO for gentle movement --------------------------
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.06;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.01;
    lfo.connect(lfoGain);
    lfoGain.connect(padGain.gain);
    lfo.start();

    // ---- note scheduler ----------------------------------------------
    this.scheduleNext();

    // keep pointer alive for the engine
    this.pluckGain = padGain;
    this.reverb = convolver;
    this.started = true;
  }

  private pluckGain: GainNode | null = null;
  private reverb: ConvolverNode | null = null;

  private scheduleNext = () => {
    const delay = 1400 + Math.random() * 2200;
    this.pluckTimer = setTimeout(() => {
      this.playNote();
      this.scheduleNext();
    }, delay);
  };

  private playNote() {
    const ctx = this.ctx;
    const master = this.master;
    const reverb = this.reverb;
    if (!ctx || !master || !reverb) return;

    const now = ctx.currentTime;
    const freq = PENTATONIC[Math.floor(Math.random() * PENTATONIC.length)];

    // voice -> dry + reverb
    const voice = ctx.createGain();
    voice.gain.value = 0;
    voice.connect(master);

    const wet = ctx.createGain();
    wet.gain.value = 0.35;
    voice.connect(wet);
    wet.connect(reverb);

    // fundamental + faint octave harmonic
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;
    osc.connect(voice);
    osc.start(now);
    osc.stop(now + 2.4);

    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = freq * 2;
    const g2 = ctx.createGain();
    g2.gain.value = 0.18;
    osc2.connect(g2);
    g2.connect(voice);
    osc2.start(now);
    osc2.stop(now + 1.6);

    // soft attack, exponential decay (piano-like)
    voice.gain.setValueAtTime(0.0001, now);
    voice.gain.exponentialRampToValueAtTime(0.16, now + 0.02);
    voice.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);
  }

  private makeImpulse(ctx: AudioContext, seconds: number, decay: number): AudioBuffer {
    const rate = ctx.sampleRate;
    const length = Math.floor(rate * seconds);
    const buffer = ctx.createBuffer(2, length, rate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch);
      for (let i = 0; i < length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
      }
    }
    return buffer;
  }

  /** Pause/resume the whole engine. */
  setPlaying(playing: boolean) {
    if (!this.ctx || !this.started) return;
    if (playing) void this.ctx.resume();
    else void this.ctx.suspend();
  }

  setVolume(v: number) {
    this.volume = v;
    if (this.ctx && this.master) {
      this.master.gain.setTargetAtTime(v, this.ctx.currentTime, 0.1);
    }
  }

  destroy() {
    if (this.pluckTimer) clearTimeout(this.pluckTimer);
    if (this.ctx) void this.ctx.close();
    this.ctx = null;
    this.started = false;
  }
}
