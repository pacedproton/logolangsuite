import React, { useState, useEffect } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import { umlautWords } from '../data/germanData';
import './GermanGameStyles.css';

const UmlautsAdventure = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentWord, setCurrentWord] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [adventureProgress, setAdventureProgress] = useState(0);

  const umlauts = ['ä', 'ö', 'ü', 'Ä', 'Ö', 'Ü', 'ß'];

  useEffect(() => {
    loadNewWord();
  }, []);

  const loadNewWord = () => {
    const word = umlautWords[Math.floor(Math.random() * umlautWords.length)];
    setCurrentWord(word);
    setUserInput('');
    setShowSuccess(false);
    setTimeout(() => soundManager.speak(word.with), 500);
  };

  const insertUmlaut = (char) => {
    setUserInput(prev => prev + char);
    soundManager.playClick();
  };

  const handleSubmit = () => {
    if (userInput.toLowerCase() === currentWord.with.toLowerCase()) {
      soundManager.playSuccess();
      setScore(prev => prev + 25);
      setShowSuccess(true);
      setAdventureProgress(prev => prev + 1);
      setTimeout(() => {
        if (adventureProgress + 1 >= 5) {
          setLevel(prev => prev + 1);
          setAdventureProgress(0);
        }
        loadNewWord();
      }, 2000);
    } else {
      soundManager.playIncorrect();
      setUserInput('');
    }
  };

  if (!currentWord) return null;

  return (
    <GameContainer title="Umlauts Adventure ⛰️" score={score} level={level} onBack={onBack}>
      <div className="german-game">
        <div className="adventure-progress">
          <div className="progress-label">Abenteuer Fortschritt</div>
          <div className="progress-dots">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`dot ${i < adventureProgress ? 'completed' : ''}`} />
            ))}
          </div>
        </div>

        <div className="word-challenge">
          <div className="challenge-label">Schreibe mit Umlaut:</div>
          <div className="base-word">{currentWord.without}</div>
          <div className="translation-hint">({currentWord.translation})</div>
        </div>

        <div className="input-area">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Tippe hier..."
            className="umlaut-input"
          />
        </div>

        <div className="umlaut-keyboard">
          <div className="keyboard-label">Umlaut-Tastatur:</div>
          <div className="umlaut-buttons">
            {umlauts.map(char => (
              <button
                key={char}
                className="umlaut-key"
                onClick={() => insertUmlaut(char)}
              >
                {char}
              </button>
            ))}
          </div>
        </div>

        <div className="action-row">
          <button className="clear-btn" onClick={() => setUserInput('')}>
            ✖ Löschen
          </button>
          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={!userInput}
          >
            ✓ Prüfen
          </button>
        </div>
      </div>

      <Modal isOpen={showSuccess} type="success" title="Perfekt!">
        <p>{currentWord.without} → {currentWord.with}</p>
      </Modal>
    </GameContainer>
  );
};

export default UmlautsAdventure;
