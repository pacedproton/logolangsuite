import React, { useState, useEffect } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import { idioms } from '../data/germanData';
import './GermanGameStyles.css';

const IdiomIsland = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentIdiom, setCurrentIdiom] = useState(null);
  const [options, setOptions] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    loadNewIdiom();
  }, []);

  const loadNewIdiom = () => {
    const idiom = idioms[Math.floor(Math.random() * idioms.length)];
    setCurrentIdiom(idiom);
    setShowSuccess(false);
    setShowExplanation(false);

    // Create options
    const wrongOptions = idioms
      .filter(i => i !== idiom)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(i => i.meaning);

    setOptions([idiom.meaning, ...wrongOptions].sort(() => Math.random() - 0.5));

    setTimeout(() => soundManager.speak(idiom.idiom), 500);
  };

  const handleAnswer = (selected) => {
    if (selected === currentIdiom.meaning) {
      soundManager.playSuccess();
      setScore(prev => prev + 30);
      setShowSuccess(true);
      setShowExplanation(true);
      setTimeout(() => {
        setLevel(prev => prev + 1);
        loadNewIdiom();
      }, 4000);
    } else {
      soundManager.playIncorrect();
    }
  };

  if (!currentIdiom) return null;

  return (
    <GameContainer title="Idiom Island 🏝️" score={score} level={level} onBack={onBack}>
      <div className="german-game">
        <div className="instructions">
          Was bedeutet diese Redewendung? (What does this idiom mean?)
        </div>

        <div className="idiom-card">
          <div className="idiom-text">{currentIdiom.idiom}</div>
          <div className="literal-translation">
            <em>Wörtlich:</em> "{currentIdiom.literal}"
          </div>
          <button className="speak-btn" onClick={() => soundManager.speak(currentIdiom.idiom)}>
            🔊 Anhören
          </button>
        </div>

        {!showExplanation && (
          <div className="meaning-options">
            {options.map((option, idx) => (
              <button
                key={idx}
                className="meaning-btn"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {showExplanation && (
          <div className="explanation-box fadeIn">
            <h3>✓ Richtig!</h3>
            <p><strong>Bedeutung:</strong> {currentIdiom.meaning}</p>
            <p><strong>Englisch:</strong> {currentIdiom.english}</p>
          </div>
        )}
      </div>

      <Modal isOpen={showSuccess} type="success" title="Gut gemacht!">
        <p>Du verstehst deutsche Redewendungen!</p>
      </Modal>
    </GameContainer>
  );
};

export default IdiomIsland;
