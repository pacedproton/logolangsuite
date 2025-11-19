import React, { useState, useEffect, useRef } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import { getRandomWords } from '../data/words';
import './WordRace.css';

const WordRace = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (!gameActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  const startGame = () => {
    const difficulty = level > 3 ? 'medium' : 'easy';
    const newWords = getRandomWords(difficulty, 10);
    setWords(newWords.map(w => w.toUpperCase()));
    setCurrentWordIndex(0);
    setUserInput('');
    setTimeLeft(30 + (level * 5));
    setGameActive(true);
    setShowSuccess(false);
    inputRef.current?.focus();
  };

  const endGame = () => {
    setGameActive(false);
    if (currentWordIndex > 0) {
      soundManager.playSuccess();
      setShowSuccess(true);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    setUserInput(value);

    if (value === words[currentWordIndex]) {
      // Correct!
      soundManager.playCorrect();
      setScore(prev => prev + 15);
      setUserInput('');

      if (currentWordIndex + 1 >= words.length) {
        // All words completed!
        soundManager.playLevelUp();
        setLevel(prev => prev + 1);
        setTimeout(() => startGame(), 1500);
      } else {
        setCurrentWordIndex(prev => prev + 1);
      }
    }
  };

  const currentWord = words[currentWordIndex] || '';
  const progress = (currentWordIndex / words.length) * 100;

  return (
    <GameContainer
      title="Word Race"
      score={score}
      level={level}
      onBack={onBack}
    >
      <div className="word-race-game">
        <div className="instructions">
          Type the words as fast as you can!
        </div>

        <div className="timer-display">
          <div className="timer-circle">
            <div className="timer-number">{timeLeft}</div>
          </div>
          <div className="timer-label">Seconds Left</div>
        </div>

        <div className="progress-container">
          <div className="progress-bar-race">
            <div className="progress-fill-race" style={{ width: `${progress}%` }} />
          </div>
          <div className="progress-text">
            {currentWordIndex} / {words.length} words
          </div>
        </div>

        <div className="target-word-race">
          {currentWord.split('').map((letter, idx) => {
            const isTyped = idx < userInput.length;
            const isCorrect = isTyped && userInput[idx] === letter;
            const isCurrent = idx === userInput.length;

            return (
              <div
                key={idx}
                className={`race-letter ${isCorrect ? 'correct' : ''} ${isCurrent ? 'current pulse' : ''}`}
              >
                {isCorrect ? letter : (isTyped ? userInput[idx] : letter)}
              </div>
            );
          })}
        </div>

        <input
          ref={inputRef}
          type="text"
          className="type-input"
          value={userInput}
          onChange={handleInputChange}
          disabled={!gameActive}
          placeholder="Start typing..."
          autoFocus
        />

        {!gameActive && timeLeft === 0 && (
          <button className="restart-btn" onClick={startGame}>
            🔄 Try Again
          </button>
        )}
      </div>

      <Modal
        isOpen={showSuccess && !gameActive}
        type="levelup"
        title="Time's Up!"
      >
        <p>You typed {currentWordIndex} words!</p>
        <p>Score: {score}</p>
        <button className="continue-btn" onClick={startGame}>
          Continue
        </button>
      </Modal>
    </GameContainer>
  );
};

export default WordRace;
