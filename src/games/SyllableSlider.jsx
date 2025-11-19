import React, { useState, useEffect } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import { getRandomSyllableWord } from '../data/words';
import './SyllableSlider.css';

const SyllableSlider = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentWord, setCurrentWord] = useState(null);
  const [syllables, setSyllables] = useState([]);
  const [selectedSyllables, setSelectedSyllables] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);

  useEffect(() => {
    loadNewWord();
  }, []);

  const loadNewWord = () => {
    const wordData = getRandomSyllableWord();
    setCurrentWord(wordData);

    // Shuffle syllables
    const shuffled = [...wordData.syllables].sort(() => Math.random() - 0.5);
    setSyllables(shuffled);
    setSelectedSyllables([]);
    setShowSuccess(false);
  };

  const handleDragStart = (e, syllable, fromSelected = false) => {
    setDraggedItem({ syllable, fromSelected });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropToSelected = (e) => {
    e.preventDefault();
    if (draggedItem && !draggedItem.fromSelected) {
      setSelectedSyllables(prev => [...prev, draggedItem.syllable]);
      setSyllables(prev => prev.filter(s => s !== draggedItem.syllable));
      soundManager.playPop();
    }
  };

  const handleDropToAvailable = (e) => {
    e.preventDefault();
    if (draggedItem && draggedItem.fromSelected) {
      setSyllables(prev => [...prev, draggedItem.syllable]);
      setSelectedSyllables(prev => prev.filter(s => s !== draggedItem.syllable));
      soundManager.playPop();
    }
  };

  const handleSyllableClick = (syllable) => {
    if (syllables.includes(syllable)) {
      setSelectedSyllables(prev => [...prev, syllable]);
      setSyllables(prev => prev.filter(s => s !== syllable));
    } else {
      setSyllables(prev => [...prev, syllable]);
      setSelectedSyllables(prev => prev.filter(s => s !== syllable));
    }
    soundManager.playClick();
  };

  const checkAnswer = () => {
    const userWord = selectedSyllables.join('');
    if (userWord === currentWord.word) {
      soundManager.playSuccess();
      setScore(prev => prev + 20);
      setShowSuccess(true);
      setTimeout(() => {
        setLevel(prev => prev + 1);
        loadNewWord();
      }, 2000);
    } else {
      soundManager.playIncorrect();
      // Shake animation
      const slots = document.querySelector('.selected-syllables');
      slots?.classList.add('shake');
      setTimeout(() => slots?.classList.remove('shake'), 500);
    }
  };

  const reset = () => {
    setSyllables([...currentWord.syllables].sort(() => Math.random() - 0.5));
    setSelectedSyllables([]);
  };

  if (!currentWord) return null;

  return (
    <GameContainer
      title="Syllable Slider"
      score={score}
      level={level}
      onBack={onBack}
    >
      <div className="syllable-game">
        <div className="instructions">
          Drag syllables in the correct order to make the word!
        </div>

        <div className="word-image">
          <div className="target-word-display">
            Build: <strong>{currentWord.word}</strong>
          </div>
          <button className="speak-button" onClick={() => soundManager.speak(currentWord.word)}>
            🔊 Hear Word
          </button>
        </div>

        <div
          className="selected-syllables"
          onDragOver={handleDragOver}
          onDrop={handleDropToSelected}
        >
          {selectedSyllables.length === 0 ? (
            <div className="placeholder">Drop syllables here</div>
          ) : (
            selectedSyllables.map((syl, idx) => (
              <div
                key={idx}
                className="syllable-card selected"
                draggable
                onDragStart={(e) => handleDragStart(e, syl, true)}
                onClick={() => handleSyllableClick(syl)}
              >
                {syl}
              </div>
            ))
          )}
        </div>

        <div
          className="available-syllables"
          onDragOver={handleDragOver}
          onDrop={handleDropToAvailable}
        >
          {syllables.map((syl, idx) => (
            <div
              key={idx}
              className="syllable-card available pulse"
              draggable
              onDragStart={(e) => handleDragStart(e, syl, false)}
              onClick={() => handleSyllableClick(syl)}
            >
              {syl}
            </div>
          ))}
        </div>

        <div className="controls">
          <button className="game-button reset" onClick={reset}>
            🔄 Reset
          </button>
          <button
            className="game-button check"
            onClick={checkAnswer}
            disabled={selectedSyllables.length === 0}
          >
            ✓ Check
          </button>
        </div>
      </div>

      <Modal
        isOpen={showSuccess}
        type="success"
        title="Perfect!"
      >
        <p>You built the word: <strong>{currentWord.word}</strong></p>
      </Modal>
    </GameContainer>
  );
};

export default SyllableSlider;
