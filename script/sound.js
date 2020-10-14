// Sound generator using Audio API
// Pong has three different sounds:
// Two different beeps when the ball hits a paddle or the frame
// The other one is a longer sound when someone fails

// Create the Audio Context

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const oscillator = audioCtx.createOscillator();
const gainNode = audioCtx.createGain();

oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

let duration = 0;

function paddleBall() {
  oscillator.type = 'square';
  oscillator.frequency.value = 493.88; // B4
  gainNode.gain.value = 0;
  duration = 30;
}

function ballFrame() {
  oscillator.type = 'square';
  oscillator.frequency.value = 246.94; // B3
  gainNode.gain.value = 0;
  duration = 30;
}

function fail() {
  oscillator.type = 'sawtooth';
  oscillator.frequency.value = 493.88; // B4
  gainNode.gain.value = 0;
  duration = 30;
}

function play() {
  gainNode.gain.value = 0.9;
  setTimeout(() => {
    gainNode.gain.value = 0;
  }, duration);
}
