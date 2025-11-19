import React, { useState, useEffect } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import { synonymsAntonyms } from '../data/germanData';
import './GermanGameStyles.css';

const SynonymeAntonymeMatch = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameMode, setGameMode] = useState('synonyms');
  const [pairs, setPairs] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    startNewRound();
  }, [gameMode]);

  const startNewRound = () => {
    const data = gameMode === 'synonyms' ? synonymsAntonyms.synonyms : synonymsAntonyms.antonyms;
    const selectedPairs = data.slice(0, 4);
    const allWords = selectedPairs.flatMap(p => [
      { word: p.word1, pairId: p.word1 + p.word2 },
      { word: p.word2, pairId: p.word1 + p.word2 }
    ]).sort(() => Math.random() - 0.5);

    setPairs(allWords);
    setSelected([]);
    setMatched([]);
    setShowSuccess(false);
  };

  const handleWordClick = (wordObj) => {
    if (matched.includes(wordObj.pairId) || selected.find(s => s.word === wordObj.word)) return;

    const newSelected = [...selected, wordObj];
    setSelected(newSelected);
    soundManager.playClick();

    if (newSelected.length === 2) {
      if (newSelected[0].pairId === newSelected[1].pairId) {
        soundManager.playCorrect();
        setMatched(prev => [...prev, wordObj.pairId]);
        setScore(prev => prev + 15);
        setTimeout(() => setSelected([]), 500);

        if (matched.length + 1 >= 4) {
          soundManager.playSuccess();
          setShowSuccess(true);
          setTimeout(() => {
            setLevel(prev => prev + 1);
            setGameMode(prev => prev === 'synonyms' ? 'antonyms' : 'synonyms');
          }, 2000);
        }
      } else {
        soundManager.playIncorrect();
        setTimeout(() => setSelected([]), 800);
      }
    }
  };

  return (
    <GameContainer title="Synonyme & Antonyme Match 🎭" score={score} level={level} onBack={onBack}>
      <div className="german-game">
        <div className="mode-toggle">
          <button
            className={`mode-btn ${gameMode === 'synonyms' ? 'active' : ''}`}
            onClick={() => setGameMode('synonyms')}
          >
            Synonyme
          </button>
          <button
            className={`mode-btn ${gameMode === 'antonyms' ? 'active' : ''}`}
            onClick={() => setGameMode('antonyms')}
          >
            Antonyme
          </button>
        </div>

        <div className="instructions">
          {gameMode === 'synonyms' ? 'Finde Wörter mit ähnlicher Bedeutung!' : 'Finde Gegensätze!'}
        </div>

        <div className="word-grid">
          {pairs.map((wordObj, idx) => (
            <button
              key={idx}
              className={`word-card ${
                selected.find(s => s.word === wordObj.word) ? 'selected' : ''
              } ${matched.includes(wordObj.pairId) ? 'matched' : ''}`}
              onClick={() => handleWordClick(wordObj)}
            >
              {wordObj.word}
            </button>
          ))}
        </div>
      </div>

      <Modal isOpen={showSuccess} type="success" title="Perfekt!">
        <p>Alle {gameMode === 'synonyms' ? 'Synonyme' : 'Antonyme'} gefunden!</p>
      </Modal>
    </GameContainer>
  );
};

export default SynonymeAntonymeMatch;
