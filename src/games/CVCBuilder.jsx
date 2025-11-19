import React, { useState } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import { cvcWords } from '../data/logopediaData';
import './SharedLogopediaStyles.css';
import './CVCBuilderStyles.css';

const CVCBuilder = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [begin, setBegin] = useState('');
  const [middle, setMiddle] = useState('');
  const [end, setEnd] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const checkWord = () => {
    const word = begin + middle + end;
    if (cvcWords.validWords.includes(word)) {
      soundManager.playSuccess();
      soundManager.speak(word);
      setScore(prev => prev + 25);
      setMessage(`Great! ${word} is a real word!`);
      setShowSuccess(true);
      setLevel(prev => prev + 1);
      setTimeout(() => {
        setBegin('');
        setMiddle('');
        setEnd('');
        setShowSuccess(false);
      }, 2500);
    } else {
      soundManager.playIncorrect();
      setMessage('Not a real word. Try again!');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  return (
    <GameContainer title="CVC Builder" score={score} level={level} onBack={onBack}>
      <div className="logopedia-game">
        <div className="instructions">Build a Consonant-Vowel-Consonant word!</div>

        <div className="cvc-display">
          <div className="cvc-slot">{begin || 'C'}</div>
          <div className="cvc-slot">{middle || 'V'}</div>
          <div className="cvc-slot">{end || 'C'}</div>
        </div>

        {message && <div className="message-box">{message}</div>}

        <div className="letter-selector">
          <div className="selector-section">
            <h4>Beginning</h4>
            <div className="letter-options">
              {cvcWords.beginConsonants.slice(0, 9).map(l => (
                <button key={l} onClick={() => setBegin(l)} className={begin === l ? 'selected' : ''}>{l}</button>
              ))}
            </div>
          </div>
          <div className="selector-section">
            <h4>Middle</h4>
            <div className="letter-options">
              {cvcWords.midVowels.map(l => (
                <button key={l} onClick={() => setMiddle(l)} className={middle === l ? 'selected' : ''}>{l}</button>
              ))}
            </div>
          </div>
          <div className="selector-section">
            <h4>End</h4>
            <div className="letter-options">
              {cvcWords.endConsonants.slice(0, 9).map(l => (
                <button key={l} onClick={() => setEnd(l)} className={end === l ? 'selected' : ''}>{l}</button>
              ))}
            </div>
          </div>
        </div>

        <button
          className="check-word-btn"
          onClick={checkWord}
          disabled={!begin || !middle || !end}
        >
          ✓ Check Word
        </button>
      </div>

      <Modal isOpen={showSuccess} type="success" title="Real Word!">
        <p>{message}</p>
      </Modal>
    </GameContainer>
  );
};

export default CVCBuilder;
