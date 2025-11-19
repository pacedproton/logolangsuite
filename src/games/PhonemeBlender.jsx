import React, { useState, useEffect } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import { phonemeSegments } from '../data/logopediaData';
import './SharedLogopediaStyles.css';

const PhonemeBlender = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentWord, setCurrentWord] = useState('');
  const [phonemes, setPhonemes] = useState([]);
  const [options, setOptions] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadNewRound();
  }, []);

  const loadNewRound = () => {
    const words = Object.keys(phonemeSegments);
    const word = words[Math.floor(Math.random() * words.length)];
    const segments = phonemeSegments[word];

    setCurrentWord(word);
    setPhonemes(segments);
    setShowSuccess(false);

    // Create options
    const wrongWords = words.filter(w => w !== word);
    const options = [
      word,
      wrongWords[0],
      wrongWords[1],
      wrongWords[2]
    ].sort(() => Math.random() - 0.5);

    setOptions(options);

    // Play sounds separately
    setTimeout(() => {
      segments.forEach((phoneme, idx) => {
        setTimeout(() => soundManager.speak(phoneme), idx * 800);
      });
    }, 500);
  };

  const handleAnswer = (selected) => {
    if (selected === currentWord) {
      soundManager.playSuccess();
      setScore(prev => prev + 20);
      setShowSuccess(true);
      setTimeout(() => {
        setLevel(prev => prev + 1);
        loadNewRound();
      }, 2000);
    } else {
      soundManager.playIncorrect();
    }
  };

  const playPhonemes = () => {
    phonemes.forEach((phoneme, idx) => {
      setTimeout(() => soundManager.speak(phoneme), idx * 700);
    });
  };

  return (
    <GameContainer title="Phoneme Blender" score={score} level={level} onBack={onBack}>
      <div className="logopedia-game">
        <div className="instructions">
          Listen to the sounds and blend them together!
        </div>

        <div className="phoneme-display">
          {phonemes.map((p, idx) => (
            <div key={idx} className="phoneme-bubble bounce">
              {p}
            </div>
          ))}
        </div>

        <button className="play-sounds-btn" onClick={playPhonemes}>
          🔊 Play Sounds Again
        </button>

        <div className="options-grid">
          {options.map((opt, idx) => (
            <button key={idx} className="option-btn" onClick={() => handleAnswer(opt)}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <Modal isOpen={showSuccess} type="success" title="Perfect Blend!">
        <p>You blended: <strong>{currentWord}</strong>!</p>
      </Modal>
    </GameContainer>
  );
};

export default PhonemeBlender;
