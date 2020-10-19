class SoundGenerator {
  constructor() {
    this.isOn = false;
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this.oscillator = this.audioCtx.createOscillator();
    this.gainNode = this.audioCtx.createGain();
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(this.audioCtx.destination);
    this.gainNode.gain.value = 0;
    this.oscillator.start();
    // Bind every method of the class
    this.wave = this.wave.bind(this);
    this.play = this.play.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  // Default values frequency A4 440 Hz and Sine type
  wave(frequency = 440, type = 'sine') {
    this.oscillator.frequency.value = frequency;
    this.oscillator.type = type;
    return this;
  }

  // Duration in milliseconds
  play(duration) {
    if (this.isOn) {
      this.gainNode.gain.value = 0.5;
      setTimeout(() => {
        this.gainNode.gain.value = 0;
      }, duration);
    }
  }

  // Toggle sound on or off
  toggle() {
    if (this.isOn) {
      this.isOn = false;
    } else {
      this.isOn = true;
    }
  }
}

const soundGen = new SoundGenerator();
