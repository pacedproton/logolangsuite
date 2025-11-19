import React, { useState, useEffect, useCallback } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import { getRandomWord } from '../data/words';
import './LetterCatcher.css';

const LetterCatcher = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [targetWord, setTargetWord] = useState('');
  const [collectedLetters, setCollectedLetters] = useState('');
  const [fallingLetters, setFallingLetters] = useState([]);
  const [basketPos, setBasketPos] = useState(50);
  const [showSuccess, setShowSuccess] = useState(false);
  const [gameActive, setGameActive] = useState(true);
  const [nextLetterId, setNextLetterId] = useState(0);

  useEffect(() => {
    loadNewWord();
  }, []);

  const loadNewWord = () => {
    const difficulty = level > 4 ? 'medium' : 'easy';
    const word = getRandomWord(difficulty).toUpperCase();
    setTargetWord(word);
    setCollectedLetters('');
    setFallingLetters([]);
    setShowSuccess(false);
    setGameActive(true);
    soundManager.speak(word);
  };

  // Generate falling letters
  useEffect(() => {
    if (!gameActive || !targetWord) return;

    const interval = setInterval(() => {
      const nextLetterIndex = collectedLetters.length;
      if (nextLetterIndex >= targetWord.length) return;

      // Drop the correct letter plus some wrong ones
      const correctLetter = targetWord[nextLetterIndex];
      const letters = [correctLetter];

      // Add some random wrong letters
      const wrongCount = Math.min(2, level);
      for (let i = 0; i < wrongCount; i++) {
        const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        letters.push(randomLetter);
      }

      // Shuffle and create falling letters
      letters.sort(() => Math.random() - 0.5);

      letters.forEach(letter => {
        setFallingLetters(prev => [...prev, {
          id: Date.now() + Math.random(),
          letter,
          x: Math.random() * 80 + 10, // 10% to 90%
          y: 0,
          isCorrect: letter === correctLetter
        }]);
      });
    }, 2000 - (level * 100));

    return () => clearInterval(interval);
  }, [gameActive, targetWord, collectedLetters, level]);

  // Move falling letters
  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      setFallingLetters(prev => {
        return prev.map(letter => ({ ...letter, y: letter.y + 2 }))
          .filter(letter => letter.y < 100); // Remove letters that fell off screen
      });
    }, 50);

    return () => clearInterval(interval);
  }, [gameActive]);

  // Check for catches
  useEffect(() => {
    fallingLetters.forEach(letter => {
      if (letter.y >= 85 && letter.y <= 95) {
        const distance = Math.abs(letter.x - basketPos);
        if (distance < 10) {
          // Caught!
          catchLetter(letter);
        }
      }
    });
  }, [fallingLetters, basketPos]);

  const catchLetter = (letter) => {
    const nextLetterIndex = collectedLetters.length;
    const correctLetter = targetWord[nextLetterIndex];

    setFallingLetters(prev => prev.filter(l => l.id !== letter.id));

    if (letter.letter === correctLetter) {
      // Correct letter!
      soundManager.playCorrect();
      const newCollected = collectedLetters + letter.letter;
      setCollectedLetters(newCollected);
      setScore(prev => prev + 10);

      if (newCollected === targetWord) {
        // Word complete!
        soundManager.playSuccess();
        setShowSuccess(true);
        setGameActive(false);
        setTimeout(() => {
          setLevel(prev => prev + 1);
          loadNewWord();
        }, 2000);
      }
    } else {
      // Wrong letter!
      soundManager.playIncorrect();
    }
  };

  // Mouse/touch control
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setBasketPos(Math.max(5, Math.min(95, x)));
  };

  const handleTouchMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    setBasketPos(Math.max(5, Math.min(95, x)));
  };

  return (
    <GameContainer
      title="Letter Catcher"
      score={score}
      level={level}
      onBack={onBack}
    >
      <div className="letter-catcher-game">
        <div className="instructions">
          Move the basket to catch letters in order to spell: <strong>{targetWord}</strong>
        </div>

        <div className="word-progress">
          {targetWord.split('').map((letter, idx) => (
            <div
              key={idx}
              className={`progress-letter ${idx < collectedLetters.length ? 'caught' : ''}`}
            >
              {idx < collectedLetters.length ? collectedLetters[idx] : '?'}
            </div>
          ))}
        </div>

        <div
          className="catcher-area"
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {fallingLetters.map(letter => (
            <div
              key={letter.id}
              className={`falling-letter ${letter.isCorrect ? 'correct-letter' : 'wrong-letter'}`}
              style={{
                left: `${letter.x}%`,
                top: `${letter.y}%`
              }}
            >
              {letter.letter}
            </div>
          ))}

          <div
            className="basket"
            style={{ left: `${basketPos}%` }}
          >
            🧺
          </div>
        </div>

        <div className="next-letter-hint">
          Next letter: <strong>{targetWord[collectedLetters.length] || '✓'}</strong>
        </div>
      </div>

      <Modal
        isOpen={showSuccess}
        type="success"
        title="Word Caught!"
      >
        <p>You caught all the letters for: <strong>{targetWord}</strong></p>
      </Modal>
    </GameContainer>
  );
};

export default LetterCatcher;
