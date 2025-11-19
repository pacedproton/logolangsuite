import React, { useState, useEffect } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import { getRandomRhymeGroup } from '../data/words';
import './RhymeTime.css';

const RhymeTime = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [rhymeGroup, setRhymeGroup] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [allWords, setAllWords] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadNewRound();
  }, []);

  const loadNewRound = () => {
    const group1 = getRandomRhymeGroup();
    const group2 = getRandomRhymeGroup();

    // Take 2-3 words from each group
    const words1 = group1.slice(0, 3);
    const words2 = group2.slice(0, 3);

    setRhymeGroup([group1, group2]);

    const shuffled = [...words1, ...words2]
      .sort(() => Math.random() - 0.5)
      .map((word, idx) => ({
        id: idx,
        word: word.toUpperCase(),
        group: group1.includes(word) ? 0 : 1,
        matched: false
      }));

    setAllWords(shuffled);
    setSelectedWords([]);
    setMatchedPairs([]);
    setShowSuccess(false);
  };

  const handleWordClick = (wordObj) => {
    if (wordObj.matched) return;

    if (selectedWords.length === 0) {
      setSelectedWords([wordObj]);
      soundManager.playClick();
    } else if (selectedWords.length === 1) {
      if (selectedWords[0].id === wordObj.id) {
        setSelectedWords([]);
        return;
      }

      const newSelected = [...selectedWords, wordObj];
      setSelectedWords(newSelected);

      // Check if they rhyme
      if (selectedWords[0].group === wordObj.group) {
        // Match!
        soundManager.playCorrect();
        setMatchedPairs(prev => [...prev, ...newSelected.map(w => w.id)]);
        setAllWords(prev => prev.map(w =>
          newSelected.find(s => s.id === w.id) ? { ...w, matched: true } : w
        ));
        setScore(prev => prev + 15);

        setTimeout(() => {
          setSelectedWords([]);

          // Check if all matched
          const totalMatched = matchedPairs.length + 2;
          if (totalMatched === allWords.length) {
            soundManager.playSuccess();
            setShowSuccess(true);
            setTimeout(() => {
              setLevel(prev => prev + 1);
              loadNewRound();
            }, 2000);
          }
        }, 500);
      } else {
        // No match
        soundManager.playIncorrect();
        setTimeout(() => {
          setSelectedWords([]);
        }, 800);
      }
    }
  };

  return (
    <GameContainer
      title="Rhyme Time"
      score={score}
      level={level}
      onBack={onBack}
    >
      <div className="rhyme-game">
        <div className="instructions">
          Match words that rhyme together!
        </div>

        <div className="rhyme-grid">
          {allWords.map((wordObj) => (
            <button
              key={wordObj.id}
              className={`rhyme-card ${
                selectedWords.find(w => w.id === wordObj.id) ? 'selected' : ''
              } ${wordObj.matched ? 'matched' : ''}`}
              onClick={() => handleWordClick(wordObj)}
              disabled={wordObj.matched}
            >
              <div className="word-text">{wordObj.word}</div>
              <button
                className="speak-word-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  soundManager.speak(wordObj.word);
                }}
              >
                🔊
              </button>
            </button>
          ))}
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${(matchedPairs.length / allWords.length) * 100}%`
            }}
          />
        </div>

        <div className="matched-count">
          Matched: {matchedPairs.length / 2} / {allWords.length / 2} pairs
        </div>
      </div>

      <Modal
        isOpen={showSuccess}
        type="success"
        title="Rhyme Master!"
      >
        <p>You matched all the rhyming words!</p>
        <p>Level {level} Complete!</p>
      </Modal>
    </GameContainer>
  );
};

export default RhymeTime;
