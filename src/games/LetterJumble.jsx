import React, { useState, useEffect } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import { getRandomWord } from '../data/words';
import './LetterJumble.css';

const LetterJumble = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [targetWord, setTargetWord] = useState('');
  const [jumbledLetters, setJumbledLetters] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    loadNewWord();
  }, []);

  const loadNewWord = () => {
    const difficulty = level > 4 ? 'medium' : 'easy';
    const word = getRandomWord(difficulty).toUpperCase();
    setTargetWord(word);
    setUserAnswer('');
    setHint(false);
    setShowSuccess(false);

    // Jumble the letters
    const letters = word.split('');
    let jumbled = [...letters];

    // Ensure it's actually jumbled
    do {
      jumbled = jumbled.sort(() => Math.random() - 0.5);
    } while (jumbled.join('') === word && word.length > 2);

    setJumbledLetters(jumbled.map((letter, idx) => ({
      id: idx,
      letter,
      inAnswer: false
    })));
  };

  const handleLetterClick = (letterObj) => {
    if (letterObj.inAnswer) {
      // Remove from answer
      setUserAnswer(prev => {
        const letters = prev.split('');
        const index = letters.indexOf(letterObj.letter);
        letters.splice(index, 1);
        return letters.join('');
      });
      setJumbledLetters(prev => prev.map(l =>
        l.id === letterObj.id ? { ...l, inAnswer: false } : l
      ));
    } else {
      // Add to answer
      setUserAnswer(prev => prev + letterObj.letter);
      setJumbledLetters(prev => prev.map(l =>
        l.id === letterObj.id ? { ...l, inAnswer: true } : l
      ));
    }
    soundManager.playPop();
  };

  const checkAnswer = () => {
    if (userAnswer === targetWord) {
      soundManager.playSuccess();
      setScore(prev => prev + (hint ? 10 : 25));
      setShowSuccess(true);
      setTimeout(() => {
        setLevel(prev => prev + 1);
        loadNewWord();
      }, 2000);
    } else {
      soundManager.playIncorrect();
      const answerArea = document.querySelector('.answer-area');
      answerArea?.classList.add('shake');
      setTimeout(() => answerArea?.classList.remove('shake'), 500);
    }
  };

  const shuffle = () => {
    const available = jumbledLetters.filter(l => !l.inAnswer);
    const shuffled = available.sort(() => Math.random() - 0.5);
    setJumbledLetters(prev => {
      const inAnswer = prev.filter(l => l.inAnswer);
      return [...inAnswer, ...shuffled];
    });
    soundManager.playWhoosh();
  };

  const clear = () => {
    setUserAnswer('');
    setJumbledLetters(prev => prev.map(l => ({ ...l, inAnswer: false })));
    soundManager.playClick();
  };

  const showHint = () => {
    setHint(true);
    soundManager.speak(targetWord);
  };

  return (
    <GameContainer
      title="Letter Jumble"
      score={score}
      level={level}
      onBack={onBack}
    >
      <div className="jumble-game">
        <div className="instructions">
          Unscramble the letters to make a word!
        </div>

        {hint && (
          <div className="hint-display fadeIn">
            The word has {targetWord.length} letters
          </div>
        )}

        <div className="answer-area">
          {userAnswer.length === 0 ? (
            <div className="answer-placeholder">
              Tap letters below
            </div>
          ) : (
            <div className="answer-letters">
              {userAnswer.split('').map((letter, idx) => (
                <div key={idx} className="answer-letter bounce">
                  {letter}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="jumbled-letters">
          {jumbledLetters.map((letterObj) => (
            <button
              key={letterObj.id}
              className={`jumble-letter ${letterObj.inAnswer ? 'used' : 'available'}`}
              onClick={() => handleLetterClick(letterObj)}
            >
              {letterObj.letter}
            </button>
          ))}
        </div>

        <div className="game-controls">
          <button className="control-btn hint-btn" onClick={showHint}>
            💡 Hint
          </button>
          <button className="control-btn shuffle-btn" onClick={shuffle}>
            🔄 Shuffle
          </button>
          <button className="control-btn clear-btn" onClick={clear}>
            ✖ Clear
          </button>
          <button
            className="control-btn check-btn"
            onClick={checkAnswer}
            disabled={userAnswer.length === 0}
          >
            ✓ Check
          </button>
        </div>
      </div>

      <Modal
        isOpen={showSuccess}
        type="success"
        title="Brilliant!"
      >
        <p>You unscrambled: <strong>{targetWord}</strong></p>
        <p>+{hint ? 10 : 25} points!</p>
      </Modal>
    </GameContainer>
  );
};

export default LetterJumble;
