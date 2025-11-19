import React, { useState, useEffect, useRef } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import { germanVerbs } from '../data/germanData';
import './GermanGameStyles.css';

const PerfektTenseRace = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentVerb, setCurrentVerb] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(20);
  const [gameActive, setGameActive] = useState(true);
  const [completed, setCompleted] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    loadNewVerb();
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

  const loadNewVerb = () => {
    const verb = germanVerbs[Math.floor(Math.random() * germanVerbs.length)];
    setCurrentVerb(verb);
    setUserInput('');
    inputRef.current?.focus();
  };

  const checkAnswer = (e) => {
    e.preventDefault();
    if (!currentVerb || !gameActive) return;

    const helper = currentVerb.haben ? 'habe' : 'bin';
    const correct = `ich ${helper} ${currentVerb.partizip}`;

    if (userInput.toLowerCase().trim() === correct.toLowerCase()) {
      soundManager.playCorrect();
      setScore(prev => prev + 15);
      setCompleted(prev => prev + 1);
      setTimeLeft(prev => Math.min(prev + 3, 30));
      loadNewVerb();
    } else {
      soundManager.playIncorrect();
    }
  };

  const restartGame = () => {
    setScore(0);
    setLevel(1);
    setCompleted(0);
    setTimeLeft(20);
    setGameActive(true);
    loadNewVerb();
  };

  if (!currentVerb) return null;

  return (
    <GameContainer title="Perfekt Tense Race ⚡" score={score} level={level} onBack={onBack}>
      <div className="german-game">
        <div className="race-header">
          <div className={`timer ${timeLeft <= 10 ? 'warning' : ''}`}>
            ⏱️ {timeLeft}s
          </div>
          <div className="completed-count">
            ✓ {completed} Verben
          </div>
        </div>

        {gameActive ? (
          <>
            <div className="verb-card">
              <div className="infinitive">
                <span className="label">Bilde das Perfekt:</span>
                <span className="verb-text">{currentVerb.infinitive}</span>
              </div>
              <div className="translation">({currentVerb.translation})</div>
            </div>

            <form onSubmit={checkAnswer} className="conjugation-form">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="ich ..."
                className="conjugation-input"
              />
              <button type="submit" className="submit-btn">
                ✓ Prüfen
              </button>
            </form>

            <div className="hint-box">
              Verwende: {currentVerb.haben ? 'haben' : 'sein'} + Partizip II
            </div>
          </>
        ) : (
          <div className="game-over fadeIn">
            <h3>Zeit abgelaufen!</h3>
            <p>Verben vollendet: {completed}</p>
            <p>Punktzahl: {score}</p>
            <button className="restart-btn" onClick={restartGame}>
              🔄 Nochmal
            </button>
          </div>
        )}
      </div>
    </GameContainer>
  );
};

export default PerfektTenseRace;
