import React, { useState, useEffect } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import { compoundWords } from '../data/germanData';
import './GermanGameStyles.css';

const KompositaConstructor = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentWord, setCurrentWord] = useState(null);
  const [selectedParts, setSelectedParts] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadNewWord();
  }, []);

  const loadNewWord = () => {
    const word = compoundWords[Math.floor(Math.random() * compoundWords.length)];
    setCurrentWord(word);
    setSelectedParts([]);
    setShowSuccess(false);
    setTimeout(() => soundManager.speak(word.compound), 500);
  };

  const handlePartClick = (part) => {
    if (selectedParts.length < 2) {
      setSelectedParts(prev => [...prev, part]);
      soundManager.playClick();
    }
  };

  const checkAnswer = () => {
    if (selectedParts.join('') === currentWord.compound) {
      soundManager.playSuccess();
      setScore(prev => prev + 30);
      setShowSuccess(true);
      setTimeout(() => {
        setLevel(prev => prev + 1);
        loadNewWord();
      }, 2000);
    } else {
      soundManager.playIncorrect();
      setSelectedParts([]);
    }
  };

  const shuffleParts = () => {
    if (!currentWord) return [];
    const allParts = [...currentWord.parts];
    // Add some random wrong parts
    const wrongParts = compoundWords
      .filter(w => w !== currentWord)
      .flatMap(w => w.parts)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    return [...allParts, ...wrongParts].sort(() => Math.random() - 0.5);
  };

  const parts = shuffleParts();

  if (!currentWord) return null;

  return (
    <GameContainer title="Komposita Constructor 🏗️" score={score} level={level} onBack={onBack}>
      <div className="german-game">
        <div className="instructions">
          Baue das zusammengesetzte Wort! (Build the compound word!)
        </div>

        <div className="compound-target">
          <div className="translation-hint">
            Target: {currentWord.translation}
          </div>
        </div>

        <div className="construction-area">
          {selectedParts.length === 0 ? (
            <div className="placeholder">Wähle Wortteile...</div>
          ) : (
            selectedParts.map((part, idx) => (
              <div key={idx} className="selected-part bounce">
                {part}
              </div>
            ))
          )}
        </div>

        <div className="parts-grid">
          {parts.map((part, idx) => (
            <button
              key={idx}
              className={`part-btn ${selectedParts.includes(part) ? 'used' : ''}`}
              onClick={() => handlePartClick(part)}
              disabled={selectedParts.includes(part) || selectedParts.length >= 2}
            >
              {part}
            </button>
          ))}
        </div>

        <div className="action-buttons">
          <button className="reset-btn" onClick={() => setSelectedParts([])}>
            🔄 Zurücksetzen
          </button>
          <button
            className="check-btn"
            onClick={checkAnswer}
            disabled={selectedParts.length < 2}
          >
            ✓ Prüfen
          </button>
        </div>
      </div>

      <Modal isOpen={showSuccess} type="success" title="Perfekt!">
        <p>{currentWord.compound}</p>
        <p>{currentWord.translation}</p>
      </Modal>
    </GameContainer>
  );
};

export default KompositaConstructor;
