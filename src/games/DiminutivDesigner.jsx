import React, { useState, useEffect } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import { diminutives } from '../data/germanData';
import './GermanGameStyles.css';

const DiminutivDesigner = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentWord, setCurrentWord] = useState(null);
  const [suffix, setSuffix] = useState('chen');
  const [userAnswer, setUserAnswer] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadNewWord();
  }, []);

  const loadNewWord = () => {
    const word = diminutives[Math.floor(Math.random() * diminutives.length)];
    const suf = Math.random() > 0.5 ? 'chen' : 'lein';
    setCurrentWord(word);
    setSuffix(suf);
    setUserAnswer('');
    setShowSuccess(false);
  };

  const checkAnswer = () => {
    const correct = suffix === 'chen' ? currentWord.chen : currentWord.lein;
    if (userAnswer.toLowerCase() === correct.toLowerCase()) {
      soundManager.playSuccess();
      setScore(prev => prev + 25);
      setShowSuccess(true);
      setTimeout(() => {
        setLevel(prev => prev + 1);
        loadNewWord();
      }, 2000);
    } else {
      soundManager.playIncorrect();
      setUserAnswer('');
    }
  };

  if (!currentWord) return null;

  return (
    <GameContainer title="Diminutiv Designer 🎨" score={score} level={level} onBack={onBack}>
      <div className="german-game">
        <div className="instructions">
          Erstelle die Verkleinerungsform! (Create the diminutive form!)
        </div>

        <div className="word-challenge">
          <div className="challenge-label">Basis-Wort:</div>
          <div className="base-word">{currentWord.base}</div>
          <div className="translation-hint">({currentWord.translation})</div>
        </div>

        <div className="suffix-selector">
          <div className="suffix-label">Wähle das Suffix:</div>
          <div className="suffix-options">
            <button
              className={`suffix-btn ${suffix === 'chen' ? 'active' : ''}`}
              onClick={() => setSuffix('chen')}
            >
              -chen
            </button>
            <button
              className={`suffix-btn ${suffix === 'lein' ? 'active' : ''}`}
              onClick={() => setSuffix('lein')}
            >
              -lein
            </button>
          </div>
        </div>

        <div className="input-area">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder={`${currentWord.base} + -${suffix} = ?`}
            className="umlaut-input"
          />
        </div>

        <button className="check-btn large" onClick={checkAnswer} disabled={!userAnswer}>
          ✓ Prüfen
        </button>
      </div>

      <Modal isOpen={showSuccess} type="success" title="Sehr gut!">
        <p>{currentWord.base} → {suffix === 'chen' ? currentWord.chen : currentWord.lein}</p>
      </Modal>
    </GameContainer>
  );
};

export default DiminutivDesigner;
