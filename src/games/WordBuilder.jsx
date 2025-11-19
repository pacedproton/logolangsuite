import React, { useState, useEffect } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import { getRandomWord } from '../data/words';
import './WordBuilder.css';

const WordBuilder = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [targetWord, setTargetWord] = useState('');
  const [displayWord, setDisplayWord] = useState('');
  const [letters, setLetters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mistakes, setMistakes] = useState(0);

  useEffect(() => {
    loadNewWord();
  }, []);

  const loadNewWord = () => {
    const difficulty = level > 5 ? 'medium' : 'easy';
    const word = getRandomWord(difficulty).toUpperCase();
    setTargetWord(word);
    setDisplayWord('_'.repeat(word.length));
    setCurrentIndex(0);
    setMistakes(0);
    setShowSuccess(false);

    // Create letter options (correct letters + some random ones)
    const correctLetters = word.split('');
    const randomLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      .split('')
      .filter(l => !correctLetters.includes(l))
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);

    const allLetters = [...correctLetters, ...randomLetters]
      .sort(() => Math.random() - 0.5);

    setLetters(allLetters.map((letter, idx) => ({
      id: idx,
      letter,
      used: false
    })));
  };

  const handleLetterClick = (clickedLetter) => {
    if (clickedLetter.used) return;

    const correctLetter = targetWord[currentIndex];

    if (clickedLetter.letter === correctLetter) {
      // Correct!
      soundManager.playCorrect();
      const newDisplay = displayWord.split('');
      newDisplay[currentIndex] = correctLetter;
      setDisplayWord(newDisplay.join(''));

      setLetters(prev => prev.map(l =>
        l.id === clickedLetter.id ? { ...l, used: true } : l
      ));

      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);

      if (newIndex === targetWord.length) {
        // Word complete!
        soundManager.playSuccess();
        setScore(prev => prev + (30 - mistakes * 5));
        setShowSuccess(true);
        setTimeout(() => {
          setLevel(prev => prev + 1);
          loadNewWord();
        }, 2500);
      }
    } else {
      // Incorrect
      soundManager.playIncorrect();
      setMistakes(prev => prev + 1);

      // Shake the word display
      const display = document.querySelector('.word-display');
      display?.classList.add('shake');
      setTimeout(() => display?.classList.remove('shake'), 500);
    }
  };

  return (
    <GameContainer
      title="Word Builder"
      score={score}
      level={level}
      onBack={onBack}
    >
      <div className="word-builder-game">
        <div className="instructions">
          Click letters in the correct order to spell the word!
        </div>

        <div className="target-hint">
          <button
            className="hint-button"
            onClick={() => soundManager.speak(targetWord)}
          >
            🔊 Hear the word
          </button>
        </div>

        <div className="word-display">
          {displayWord.split('').map((char, idx) => (
            <div
              key={idx}
              className={`letter-slot ${idx === currentIndex ? 'active' : ''} ${char !== '_' ? 'filled' : ''}`}
            >
              {char}
            </div>
          ))}
        </div>

        <div className="progress-indicator">
          Letter {currentIndex + 1} of {targetWord.length}
        </div>

        <div className="letter-grid">
          {letters.map((letter) => (
            <button
              key={letter.id}
              className={`letter-button ${letter.used ? 'used' : ''}`}
              onClick={() => handleLetterClick(letter)}
              disabled={letter.used}
            >
              {letter.letter}
            </button>
          ))}
        </div>

        {mistakes > 0 && (
          <div className="mistakes-counter">
            Mistakes: {mistakes}
          </div>
        )}
      </div>

      <Modal
        isOpen={showSuccess}
        type="success"
        title="Amazing!"
      >
        <p>You spelled: <strong>{targetWord}</strong></p>
        <p>Mistakes: {mistakes}</p>
      </Modal>
    </GameContainer>
  );
};

export default WordBuilder;
