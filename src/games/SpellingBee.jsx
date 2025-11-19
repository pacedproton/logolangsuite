import React, { useState, useEffect, useRef } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import { getRandomWord } from '../data/words';
import './SpellingBee.css';

const SpellingBee = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    loadNewWord();
  }, []);

  const loadNewWord = () => {
    const difficulty = level > 5 ? 'medium' : 'easy';
    const word = getRandomWord(difficulty).toUpperCase();
    setCurrentWord(word);
    setUserInput('');
    setShowHint(false);
    setAttempts(0);
    setShowSuccess(false);

    // Speak the word automatically
    setTimeout(() => soundManager.speak(word), 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.toUpperCase() === currentWord) {
      // Correct!
      soundManager.playSuccess();
      const points = Math.max(30 - (attempts * 5) - (showHint ? 10 : 0), 5);
      setScore(prev => prev + points);
      setShowSuccess(true);
      setTimeout(() => {
        setLevel(prev => prev + 1);
        loadNewWord();
      }, 2000);
    } else {
      // Incorrect
      soundManager.playIncorrect();
      setAttempts(prev => prev + 1);

      const input = document.querySelector('.spelling-input');
      input?.classList.add('shake');
      setTimeout(() => input?.classList.remove('shake'), 500);
    }
  };

  const repeatWord = () => {
    soundManager.speak(currentWord);
  };

  const showHintClick = () => {
    setShowHint(true);
    soundManager.playClick();
  };

  const useInSentence = () => {
    // Create a simple sentence
    const sentences = {
      'CAT': 'The cat is sleeping',
      'DOG': 'The dog is barking',
      'HAT': 'I wear a hat',
      'default': `The word is ${currentWord.toLowerCase()}`
    };
    const sentence = sentences[currentWord] || sentences['default'];
    soundManager.speak(sentence);
  };

  return (
    <GameContainer
      title="Spelling Bee"
      score={score}
      level={level}
      onBack={onBack}
    >
      <div className="spelling-bee-game">
        <div className="instructions">
          Listen to the word and spell it correctly!
        </div>

        <div className="bee-container">
          <div className="bee bounce">🐝</div>
        </div>

        <div className="audio-controls">
          <button className="audio-btn" onClick={repeatWord}>
            🔊 Repeat Word
          </button>
          <button className="audio-btn" onClick={useInSentence}>
            📝 Use in Sentence
          </button>
          {!showHint && (
            <button className="audio-btn hint" onClick={showHintClick}>
              💡 Hint (-10pts)
            </button>
          )}
        </div>

        {showHint && (
          <div className="hint-container fadeIn">
            <p>The word has {currentWord.length} letters</p>
            <p>It starts with: <strong>{currentWord[0]}</strong></p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="spelling-form">
          <input
            ref={inputRef}
            type="text"
            className="spelling-input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value.toUpperCase())}
            placeholder="Type your spelling here..."
            autoFocus
            maxLength={20}
          />
          <button type="submit" className="submit-spelling-btn">
            ✓ Submit
          </button>
        </form>

        {attempts > 0 && (
          <div className="attempts-display">
            Attempts: {attempts}
          </div>
        )}

        <div className="letter-display">
          {userInput.split('').map((letter, idx) => (
            <div key={idx} className="spelled-letter bounce">
              {letter}
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={showSuccess}
        type="success"
        title="Spelling Champion!"
      >
        <p>Perfect! You spelled: <strong>{currentWord}</strong></p>
        <p>+{Math.max(30 - (attempts * 5) - (showHint ? 10 : 0), 5)} points!</p>
      </Modal>
    </GameContainer>
  );
};

export default SpellingBee;
