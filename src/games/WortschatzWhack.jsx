import React, { useState, useEffect } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import { wordCategories } from '../data/germanData';
import './GermanGameStyles.css';

const WortschatzWhack = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [targetCategory, setTargetCategory] = useState('');
  const [words, setWords] = useState([]);
  const [timeLeft, setTimeLeft] = useState(45);
  const [gameActive, setGameActive] = useState(true);
  const [hitCount, setHitCount] = useState(0);

  useEffect(() => {
    startNewRound();
  }, []);

  useEffect(() => {
    if (!gameActive) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameActive]);

  const startNewRound = () => {
    const categories = Object.keys(wordCategories);
    const category = categories[Math.floor(Math.random() * categories.length)];
    setTargetCategory(category);

    // Generate moles (some from target category, some from others)
    const targetWords = wordCategories[category].slice(0, 6);
    const otherWords = categories
      .filter(c => c !== category)
      .flatMap(c => wordCategories[c])
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);

    const allWords = [...targetWords, ...otherWords]
      .sort(() => Math.random() - 0.5)
      .map((word, idx) => ({
        id: idx,
        word,
        isTarget: targetWords.includes(word),
        visible: false,
        position: idx
      }));

    setWords(allWords);
    setTimeout(() => soundManager.speak(`Finde alle ${category}`), 500);
  };

  useEffect(() => {
    if (!gameActive) return;
    const interval = setInterval(() => {
      setWords(prev => prev.map(w => ({
        ...w,
        visible: Math.random() > 0.6
      })));
    }, 1200);
    return () => clearInterval(interval);
  }, [gameActive]);

  const handleWhack = (word) => {
    if (!word.visible || !gameActive) return;

    if (word.isTarget) {
      soundManager.playCorrect();
      setScore(prev => prev + 15);
      setHitCount(prev => prev + 1);
      setWords(prev => prev.filter(w => w.id !== word.id));
    } else {
      soundManager.playIncorrect();
      setScore(prev => Math.max(prev - 5, 0));
    }
  };

  const restartGame = () => {
    setScore(0);
    setLevel(1);
    setHitCount(0);
    setTimeLeft(45);
    setGameActive(true);
    startNewRound();
  };

  return (
    <GameContainer title="Wortschatz Whack-a-Mole 🔨" score={score} level={level} onBack={onBack}>
      <div className="german-game">
        <div className="game-header-bar">
          <div className={`timer ${timeLeft <= 10 ? 'warning' : ''}`}>
            ⏱️ {timeLeft}s
          </div>
          <div className="target-category-display">
            <strong>Kategorie:</strong> {targetCategory}
          </div>
          <div className="hit-counter">
            🎯 {hitCount} hits
          </div>
        </div>

        <div className="whack-grid">
          {words.map(word => (
            <div key={word.id} className="mole-hole">
              <button
                className={`mole ${word.visible ? 'visible' : 'hidden'} ${word.isTarget ? 'target' : 'wrong'}`}
                onClick={() => handleWhack(word)}
                disabled={!word.visible}
              >
                {word.word}
              </button>
            </div>
          ))}
        </div>

        {!gameActive && (
          <div className="game-over fadeIn">
            <h3>Zeit vorbei!</h3>
            <p>Score: {score}</p>
            <p>Hits: {hitCount}</p>
            <button className="restart-btn" onClick={restartGame}>
              🔄 Nochmal spielen
            </button>
          </div>
        )}
      </div>
    </GameContainer>
  );
};

export default WortschatzWhack;
