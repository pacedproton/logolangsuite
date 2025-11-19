import React, { useState, useEffect } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import { getRandomWords } from '../data/words';
import './InitialSoundSafari.css';

const InitialSoundSafari = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [targetSound, setTargetSound] = useState('');
  const [wordOptions, setWordOptions] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadNewRound();
  }, []);

  const loadNewRound = () => {
    const allWords = getRandomWords('easy', 20);
    const sound = allWords[0][0].toUpperCase();
    setTargetSound(sound);

    // Get 2 words that start with target sound, 2 that don't
    const matching = allWords.filter(w => w[0].toUpperCase() === sound).slice(0, 2);
    const notMatching = allWords.filter(w => w[0].toUpperCase() !== sound).slice(0, 2);

    const options = [...matching, ...notMatching]
      .sort(() => Math.random() - 0.5)
      .map((word, idx) => ({
        id: idx,
        word: word.toUpperCase(),
        correct: word[0].toUpperCase() === sound
      }));

    setWordOptions(options);
    setShowSuccess(false);

    setTimeout(() => soundManager.speak(`Find words starting with ${sound}`), 500);
  };

  const handleWordClick = (option) => {
    if (option.correct) {
      soundManager.playCorrect();
      setScore(prev => prev + 15);
      soundManager.speak(option.word);

      // Remove the word
      setWordOptions(prev => prev.filter(w => w.id !== option.id));

      // Check if all correct words found
      const remaining = wordOptions.filter(w => w.correct && w.id !== option.id);
      if (remaining.length === 0) {
        soundManager.playSuccess();
        setShowSuccess(true);
        setTimeout(() => {
          setLevel(prev => prev + 1);
          loadNewRound();
        }, 2000);
      }
    } else {
      soundManager.playIncorrect();
      const btn = document.querySelector(`[data-word-id="${option.id}"]`);
      btn?.classList.add('shake');
      setTimeout(() => btn?.classList.remove('shake'), 500);
    }
  };

  return (
    <GameContainer title="Initial Sound Safari" score={score} level={level} onBack={onBack}>
      <div className="safari-game">
        <div className="instructions">
          Find all the words that start with the sound:
        </div>

        <div className="target-sound-display pulse">
          <div className="sound-letter">{targetSound}</div>
          <button className="hear-sound-btn" onClick={() => soundManager.speak(targetSound)}>
            🔊 Hear Sound
          </button>
        </div>

        <div className="safari-words">
          {wordOptions.map(option => (
            <button
              key={option.id}
              data-word-id={option.id}
              className={`safari-word-btn ${option.correct ? 'correct-option' : 'wrong-option'}`}
              onClick={() => handleWordClick(option)}
            >
              <span className="word-text">{option.word}</span>
              <span className="emoji-icon">
                {option.correct ? '🦁' : '🌴'}
              </span>
            </button>
          ))}
        </div>
      </div>

      <Modal isOpen={showSuccess} type="success" title="Safari Complete!">
        <p>You found all words starting with <strong>{targetSound}</strong>!</p>
      </Modal>
    </GameContainer>
  );
};

export default InitialSoundSafari;
