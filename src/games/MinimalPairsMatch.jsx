import React, { useState, useEffect } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import { minimalPairs } from '../data/logopediaData';
import './SharedLogopediaStyles.css';

const MinimalPairsMatch = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentPair, setCurrentPair] = useState(null);
  const [targetWord, setTargetWord] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadNewRound();
  }, []);

  const loadNewRound = () => {
    const pair = minimalPairs[Math.floor(Math.random() * minimalPairs.length)];
    const target = pair.pair[Math.floor(Math.random() * 2)];

    setCurrentPair(pair);
    setTargetWord(target);
    setShowSuccess(false);

    setTimeout(() => soundManager.speak(target), 700);
  };

  const handleChoice = (word) => {
    if (word === targetWord) {
      soundManager.playSuccess();
      setScore(prev => prev + 20);
      setShowSuccess(true);
      setTimeout(() => {
        setLevel(prev => prev + 1);
        loadNewRound();
      }, 2000);
    } else {
      soundManager.playIncorrect();
      soundManager.speak(word);
    }
  };

  if (!currentPair) return null;

  return (
    <GameContainer title="Minimal Pairs Match" score={score} level={level} onBack={onBack}>
      <div className="logopedia-game">
        <div className="instructions">
          Listen carefully! Which word did you hear?
        </div>

        <div className="sound-focus">
          <div className="focus-label">Sound Focus:</div>
          <div className="focus-sounds">{currentPair.focus}</div>
        </div>

        <button className="play-sounds-btn large" onClick={() => soundManager.speak(targetWord)}>
          🔊 Play Again
        </button>

        <div className="minimal-pair-options">
          {currentPair.pair.map((word, idx) => (
            <button key={idx} className="pair-option-btn" onClick={() => handleChoice(word)}>
              <div className="option-word">{word}</div>
              <button
                className="hear-option-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  soundManager.speak(word);
                }}
              >
                🔊
              </button>
            </button>
          ))}
        </div>
      </div>

      <Modal isOpen={showSuccess} type="success" title="Great Listening!">
        <p>You heard: <strong>{targetWord}</strong></p>
      </Modal>
    </GameContainer>
  );
};

export default MinimalPairsMatch;
