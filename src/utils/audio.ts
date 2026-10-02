/**
 * Web Audio API based ambient soundscape for luxury real estate walkthrough
 * Procedural ambient synthesizer (gentle ocean breeze and warm harmonic drone)
 */

class AmbientSoundscape {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private gainNode: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private oscillators: OscillatorNode[] = [];

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch {
      // AudioContext not supported
    }
  }

  public toggle(): boolean {
    if (!this.ctx) {
      this.init();
    }
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getPlaying(): boolean {
    return this.isPlaying;
  }

  private play() {
    if (!this.ctx) return;
    this.stop();

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 3);
    masterGain.connect(this.ctx.destination);
    this.gainNode = masterGain;

    // 1. Ocean breeze / wind noise generator
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02; // Pink noise approx
      lastOut = output[i];
      output[i] *= 3.5;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(320, this.ctx.currentTime);
    this.filterNode = noiseFilter;

    // Gentle LFO to modulate breeze frequency
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(140, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(noiseFilter.frequency);
    lfo.start();
    this.oscillators.push(lfo);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(masterGain);
    whiteNoise.start();
    this.noiseNode = whiteNoise;

    // 2. Soft, warm harmonic architectural drone (108Hz, 216Hz, 324Hz)
    const freqs = [108, 162, 216];
    freqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      oscGain.gain.setValueAtTime(0.015 / (idx + 1), this.ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(masterGain);

      osc.start();
      this.oscillators.push(osc);
    });

    this.isPlaying = true;
  }

  public stop() {
    if (!this.ctx || !this.isPlaying) return;
    if (this.gainNode) {
      try {
        this.gainNode.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
        setTimeout(() => {
          this.noiseNode?.stop();
          this.noiseNode?.disconnect();
          this.oscillators.forEach(osc => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {
              // ignore
            }
          });
          this.oscillators = [];
        }, 1100);
      } catch {
        // ignore
      }
    }
    this.isPlaying = false;
  }
}

export const ambientSound = new AmbientSoundscape();
