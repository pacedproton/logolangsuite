import React, { useState, useEffect } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import { germanNouns } from '../data/germanData';
import './GermanGameStyles.css';

const ArtikelArcade = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentNoun, setCurrentNoun] = useState(null);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadNewNoun();
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

  const loadNewNoun = () => {
    const categories = ['masculine', 'feminine', 'neuter'];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const nouns = germanNouns[category];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];

    setCurrentNoun({
      ...noun,
      gender: category,
      article: category === 'masculine' ? 'der' : category === 'feminine' ? 'die' : 'das'
    });
    soundManager.speak(noun.word);
  };

  const handleArticleClick = (article) => {
    if (article === currentNoun.article) {
      soundManager.playSuccess();
      const points = 10 + (streak * 2);
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setTimeLeft(prev => Math.min(prev + 2, 60));
      setLevel(prev => prev + 1);
      loadNewNoun();
    } else {
      soundManager.playIncorrect();
      setStreak(0);
    }
  };

  const restartGame = () => {
    setScore(0);
    setLevel(1);
    setStreak(0);
    setTimeLeft(30);
    setGameActive(true);
    loadNewNoun();
  };

  if (!currentNoun) return null;

  return (
    <GameContainer title="Artikel Arcade 🎮" score={score} level={level} onBack={onBack}>
      <div className="german-game">
        <div className="game-stats-bar">
          <div className={`timer ${timeLeft <= 10 ? 'warning' : ''}`}>
            ⏱️ {timeLeft}s
          </div>
          {streak > 0 && (
            <div className="streak-badge pulse">
              🔥 {streak} Streak!
            </div>
          )}
        </div>

        <div className="instructions">
          Wähle den richtigen Artikel! (Choose the correct article!)
        </div>

        <div className="noun-display pulse">
          <div className="noun-card">
            <div className="noun-word">{currentNoun.word}</div>
            <div className="noun-translation">({currentNoun.translation})</div>
            <button className="speak-btn" onClick={() => soundManager.speak(currentNoun.word)}>
              🔊
            </button>
          </div>
        </div>

        <div className="article-buttons">
          {['der', 'die', 'das'].map(article => (
            <button
              key={article}
              className={`article-btn ${article === 'der' ? 'masculine' : article === 'die' ? 'feminine' : 'neuter'}`}
              onClick={() => handleArticleClick(article)}
              disabled={!gameActive}
            >
              <span className="article-text">{article}</span>
              <span className="article-label">
                {article === 'der' ? '♂️ maskulin' : article === 'die' ? '♀️ feminin' : '⚪ neutral'}
              </span>
            </button>
          ))}
        </div>

        {!gameActive && (
          <div className="game-over fadeIn">
            <h3>Zeit abgelaufen! (Time's up!)</h3>
            <p>Final Score: {score}</p>
            <button className="restart-btn" onClick={restartGame}>
              🔄 Noch einmal (Play Again)
            </button>
          </div>
        )}
      </div>

      <Modal isOpen={streak >= 10} type="levelup" title="Unglaublich! (Incredible!)">
        <p>10 Streak! You're a master!</p>
      </Modal>
    </GameContainer>
  );
};

export default ArtikelArcade;
