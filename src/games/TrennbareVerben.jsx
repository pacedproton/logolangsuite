import React, { useState, useEffect } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import { separableVerbs } from '../data/germanData';
import './GermanGameStyles.css';

const TrennbareVerben = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentVerb, setCurrentVerb] = useState(null);
  const [separated, setSeparated] = useState({ prefix: '', stem: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadNewVerb();
  }, []);

  const loadNewVerb = () => {
    const verb = separableVerbs[Math.floor(Math.random() * separableVerbs.length)];
    setCurrentVerb(verb);
    setSeparated({ prefix: '', stem: '' });
    setShowSuccess(false);
    setTimeout(() => soundManager.speak(verb.verb), 500);
  };

  const handleDragStart = (e, type, text) => {
    e.dataTransfer.setData('text', JSON.stringify({ type, text }));
  };

  const handleDrop = (e, slot) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('text'));
    setSeparated(prev => ({ ...prev, [slot]: data.text }));
    soundManager.playPop();
  };

  const checkAnswer = () => {
    if (separated.prefix === currentVerb.prefix && separated.stem === currentVerb.stem) {
      soundManager.playSuccess();
      setScore(prev => prev + 25);
      setShowSuccess(true);
      setTimeout(() => {
        setLevel(prev => prev + 1);
        loadNewVerb();
      }, 2000);
    } else {
      soundManager.playIncorrect();
      setSeparated({ prefix: '', stem: '' });
    }
  };

  if (!currentVerb) return null;

  return (
    <GameContainer title="Trennbare Verben 🔀" score={score} level={level} onBack={onBack}>
      <div className="german-game">
        <div className="instructions">
          Trenne das Verb! (Separate the verb!)
        </div>

        <div className="verb-display-box">
          <div className="full-verb">{currentVerb.verb}</div>
          <div className="translation">({currentVerb.translation})</div>
        </div>

        <div className="separation-area">
          <div
            className="drop-zone prefix"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, 'prefix')}
          >
            <div className="zone-label">Präfix</div>
            <div className="zone-content">
              {separated.prefix || 'Drop hier...'}
            </div>
          </div>

          <div className="plus-sign">+</div>

          <div
            className="drop-zone stem"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, 'stem')}
          >
            <div className="zone-label">Stamm</div>
            <div className="zone-content">
              {separated.stem || 'Drop hier...'}
            </div>
          </div>
        </div>

        <div className="draggable-parts">
          <div
            className="draggable-part"
            draggable
            onDragStart={(e) => handleDragStart(e, 'prefix', currentVerb.prefix)}
          >
            {currentVerb.prefix}
          </div>
          <div
            className="draggable-part"
            draggable
            onDragStart={(e) => handleDragStart(e, 'stem', currentVerb.stem)}
          >
            {currentVerb.stem}
          </div>
        </div>

        <div className="example-sentence">
          <strong>Beispiel:</strong> {currentVerb.ich}
        </div>

        <button
          className="check-btn large"
          onClick={checkAnswer}
          disabled={!separated.prefix || !separated.stem}
        >
          ✓ Prüfen
        </button>
      </div>

      <Modal isOpen={showSuccess} type="success" title="Richtig getrennt!">
        <p>{currentVerb.prefix} + {currentVerb.stem}</p>
      </Modal>
    </GameContainer>
  );
};

export default TrennbareVerben;
