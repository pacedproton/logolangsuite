import React, { useState, useEffect } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import { germanVerbs } from '../data/germanData';
import './GermanGameStyles.css';

const VerbKonjugationQuest = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentVerb, setCurrentVerb] = useState(null);
  const [currentPronoun, setCurrentPronoun] = useState('');
  const [userInput, setUserInput] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [questProgress, setQuestProgress] = useState(0);
  const [totalQuests, setTotalQuests] = useState(5);

  const pronouns = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie'];

  useEffect(() => {
    loadNewConjugation();
  }, []);

  const loadNewConjugation = () => {
    const verb = germanVerbs[Math.floor(Math.random() * germanVerbs.length)];
    const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
    setCurrentVerb(verb);
    setCurrentPronoun(pronoun);
    setUserInput('');
    setAttempts(0);
    setShowSuccess(false);
    setTimeout(() => soundManager.speak(`Konjugiere ${verb.infinitive} mit ${pronoun}`), 500);
  };

  const getCorrectForm = () => {
    if (!currentVerb) return '';
    const key = currentPronoun === 'er/sie/es' ? 'er' : currentPronoun;
    return currentVerb[key] || '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correct = getCorrectForm();

    if (userInput.toLowerCase().trim() === correct.toLowerCase()) {
      soundManager.playSuccess();
      const points = Math.max(30 - (attempts * 5), 10);
      setScore(prev => prev + points);
      setShowSuccess(true);
      setQuestProgress(prev => prev + 1);

      if (questProgress + 1 >= totalQuests) {
        setTimeout(() => {
          setLevel(prev => prev + 1);
          setQuestProgress(0);
          setTotalQuests(prev => prev + 1);
          loadNewConjugation();
        }, 2000);
      } else {
        setTimeout(() => loadNewConjugation(), 2000);
      }
    } else {
      soundManager.playIncorrect();
      setAttempts(prev => prev + 1);
    }
  };

  const giveHint = () => {
    const correct = getCorrectForm();
    soundManager.speak(correct);
    setScore(prev => Math.max(prev - 10, 0));
  };

  if (!currentVerb) return null;

  return (
    <GameContainer title="Verb Konjugation Quest ⚔️" score={score} level={level} onBack={onBack}>
      <div className="german-game">
        <div className="quest-progress-bar">
          <div className="progress-label">Quest Fortschritt</div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${(questProgress / totalQuests) * 100}%` }}
            />
          </div>
          <div className="progress-text">{questProgress} / {totalQuests}</div>
        </div>

        <div className="verb-card">
          <div className="infinitive">
            <span className="label">Infinitiv:</span>
            <span className="verb-text">{currentVerb.infinitive}</span>
          </div>
          <div className="translation">({currentVerb.translation})</div>
        </div>

        <div className="pronoun-display">
          <div className="pronoun-badge">{currentPronoun}</div>
        </div>

        <form onSubmit={handleSubmit} className="conjugation-form">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Konjugierte Form..."
            className="conjugation-input"
            autoFocus
          />
          <div className="button-row">
            <button type="submit" className="submit-btn">
              ✓ Prüfen
            </button>
            <button type="button" className="hint-btn" onClick={giveHint}>
              💡 Hinweis (-10 Punkte)
            </button>
          </div>
        </form>

        {attempts > 0 && (
          <div className="attempts-warning">
            Versuche: {attempts}
          </div>
        )}

        <div className="conjugation-table">
          <h4>Konjugationstabelle</h4>
          <div className="table-grid">
            {pronouns.map(p => (
              <div key={p} className="table-row">
                <div className="pronoun-cell">{p}</div>
                <div className="form-cell">
                  {p === currentPronoun && showSuccess ?
                    <span className="revealed">{getCorrectForm()}</span> :
                    '???'
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={showSuccess} type="success" title="Ausgezeichnet! (Excellent!)">
        <p>{currentPronoun} {getCorrectForm()}</p>
      </Modal>
    </GameContainer>
  );
};

export default VerbKonjugationQuest;
