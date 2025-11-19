import React, { useState, useEffect } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import './SoundMatcher.css';

const LETTER_SOUNDS = {
  'A': 'ay', 'B': 'bee', 'C': 'see', 'D': 'dee', 'E': 'ee',
  'F': 'eff', 'G': 'jee', 'H': 'aych', 'I': 'eye', 'J': 'jay',
  'K': 'kay', 'L': 'ell', 'M': 'em', 'N': 'en', 'O': 'oh',
  'P': 'pee', 'Q': 'cue', 'R': 'arr', 'S': 'ess', 'T': 'tee',
  'U': 'you', 'V': 'vee', 'W': 'double-you', 'X': 'ex', 'Y': 'why', 'Z': 'zee'
};

const SoundMatcher = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentLetter, setCurrentLetter] = useState('');
  const [options, setOptions] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    loadNewRound();
  }, []);

  const loadNewRound = () => {
    // Pick a random letter
    const letters = Object.keys(LETTER_SOUNDS);
    const letter = letters[Math.floor(Math.random() * letters.length)];
    setCurrentLetter(letter);

    // Create options: correct answer + 3 wrong answers
    const wrongLetters = letters.filter(l => l !== letter);
    const wrong = [];
    for (let i = 0; i < 3; i++) {
      const randomLetter = wrongLetters[Math.floor(Math.random() * wrongLetters.length)];
      if (!wrong.includes(randomLetter)) {
        wrong.push(randomLetter);
      }
    }

    const allOptions = [letter, ...wrong]
      .sort(() => Math.random() - 0.5)
      .map((l, idx) => ({ id: idx, letter: l }));

    setOptions(allOptions);
    setShowSuccess(false);

    // Auto-play the sound
    setTimeout(() => speakLetter(letter), 500);
  };

  const speakLetter = (letter) => {
    soundManager.speak(letter);
  };

  const handleOptionClick = (option) => {
    if (option.letter === currentLetter) {
      // Correct!
      soundManager.playCorrect();
      const points = 10 + (streak * 2);
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setShowSuccess(true);

      setTimeout(() => {
        setLevel(prev => prev + 1);
        loadNewRound();
      }, 1500);
    } else {
      // Wrong
      soundManager.playIncorrect();
      setStreak(0);

      // Shake the wrong answer
      const btn = document.querySelector(`[data-option-id="${option.id}"]`);
      btn?.classList.add('shake');
      setTimeout(() => btn?.classList.remove('shake'), 500);
    }
  };

  return (
    <GameContainer
      title="Sound Matcher"
      score={score}
      level={level}
      onBack={onBack}
    >
      <div className="sound-matcher-game">
        <div className="instructions">
          Listen to the letter sound and click the matching letter!
        </div>

        {streak > 0 && (
          <div className="streak-display bounce">
            🔥 Streak: {streak}
          </div>
        )}

        <div className="sound-display">
          <div className="speaker-icon pulse" onClick={() => speakLetter(currentLetter)}>
            🔊
          </div>
          <div className="sound-text">
            Click to hear the letter again
          </div>
        </div>

        <div className="options-grid">
          {options.map((option) => (
            <button
              key={option.id}
              data-option-id={option.id}
              className="letter-option"
              onClick={() => handleOptionClick(option)}
            >
              {option.letter}
            </button>
          ))}
        </div>

        <div className="hint-section">
          <p>💡 Tip: Listen carefully to how the letter sounds!</p>
        </div>
      </div>

      <Modal
        isOpen={showSuccess}
        type="success"
        title="Perfect!"
      >
        <p>That's the letter <strong>{currentLetter}</strong>!</p>
        {streak > 3 && <p>🔥 Amazing streak!</p>}
      </Modal>
    </GameContainer>
  );
};

export default SoundMatcher;
