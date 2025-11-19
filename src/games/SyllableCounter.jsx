import React, { useState, useEffect } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import { wordData } from '../data/words';
import './SharedLogopediaStyles.css';

const SyllableCounter = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentWord, setCurrentWord] = useState('');
  const [syllableCount, setSyllableCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadNewWord();
  }, []);

  const countSyllables = (word) => {
    // Simple syllable counting algorithm
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
  };

  const loadNewWord = () => {
    const allWords = [...wordData.medium, ...wordData.hard];
    const word = allWords[Math.floor(Math.random() * allWords.length)].toUpperCase();
    const count = countSyllables(word);

    setCurrentWord(word);
    setSyllableCount(count);
    setShowSuccess(false);

    setTimeout(() => soundManager.speak(word), 500);
  };

  const handleAnswer = (selectedCount) => {
    if (selectedCount === syllableCount) {
      soundManager.playSuccess();
      setScore(prev => prev + 15);
      setShowSuccess(true);
      setTimeout(() => {
        setLevel(prev => prev + 1);
        loadNewWord();
      }, 2000);
    } else {
      soundManager.playIncorrect();
    }
  };

  return (
    <GameContainer title="Syllable Counter" score={score} level={level} onBack={onBack}>
      <div className="logopedia-game">
        <div className="instructions">
          How many syllables (beats) are in this word?
        </div>

        <div className="word-card pulse">
          <div className="big-word">{currentWord}</div>
          <button className="speak-btn" onClick={() => soundManager.speak(currentWord)}>
            🔊 Hear Word
          </button>
        </div>

        <div className="syllable-hint">
          👏 Clap for each syllable!
        </div>

        <div className="options-grid">
          {[1, 2, 3, 4].map(num => (
            <button key={num} className="option-btn large" onClick={() => handleAnswer(num)}>
              {num}
            </button>
          ))}
        </div>
      </div>

      <Modal isOpen={showSuccess} type="success" title="Correct!">
        <p><strong>{currentWord}</strong> has {syllableCount} syllable{syllableCount > 1 ? 's' : ''}!</p>
      </Modal>
    </GameContainer>
  );
};

export default SyllableCounter;
