// Sound Manager for all game audio
class SoundManager {
  constructor() {
    this.sounds = {};
    this.enabled = true;
    this.volume = 0.5;
  }

  // Generate simple tones using Web Audio API
  playTone(frequency, duration = 200, type = 'sine') {
    if (!this.enabled) return;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(this.volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  }

  playCorrect() {
    // Happy ascending tones
    this.playTone(523.25, 100); // C5
    setTimeout(() => this.playTone(659.25, 100), 100); // E5
    setTimeout(() => this.playTone(783.99, 200), 200); // G5
  }

  playIncorrect() {
    // Sad descending tones
    this.playTone(400, 150);
    setTimeout(() => this.playTone(300, 150), 150);
    setTimeout(() => this.playTone(200, 200), 300);
  }

  playClick() {
    this.playTone(600, 50, 'square');
  }

  playSuccess() {
    // Victory fanfare
    const notes = [523.25, 587.33, 659.25, 783.99];
    notes.forEach((note, i) => {
      setTimeout(() => this.playTone(note, 150), i * 100);
    });
  }

  playCollect() {
    this.playTone(800, 100);
    setTimeout(() => this.playTone(1000, 100), 50);
  }

  playLevelUp() {
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((note, i) => {
      setTimeout(() => this.playTone(note, 200), i * 80);
    });
  }

  playPop() {
    this.playTone(700, 80, 'square');
  }

  playWhoosh() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);
    oscillator.type = 'sawtooth';

    gainNode.gain.setValueAtTime(this.volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  }

  speak(text) {
    if (!this.enabled) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    utterance.volume = this.volume;
    window.speechSynthesis.speak(utterance);
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
  }
}

export default new SoundManager();
