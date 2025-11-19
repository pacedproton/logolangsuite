import React, { useState, useEffect } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import { modalVerbs } from '../data/germanData';
import './GermanGameStyles.css';

const ModalverbenMission = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentVerb, setCurrentVerb] = useState(null);
  const [sentence, setSentence] = useState('');
  const [correctForm, setCorrectForm] = useState('');
  const [options, setOptions] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const sentences = [
    { subject: 'ich', template: 'Ich ___ schwimmen', verb: 'können' },
    { subject: 'du', template: 'Du ___ kommen', verb: 'müssen' },
    { subject: 'er', template: 'Er ___ das machen', verb: 'wollen' },
    { subject: 'wir', template: 'Wir ___ gehen', verb: 'dürfen' },
    { subject: 'ihr', template: 'Ihr ___ essen', verb: 'sollen' },
    { subject: 'sie', template: 'Sie ___ das', verb: 'mögen' }
  ];

  useEffect(() => {
    loadNewMission();
  }, []);

  const loadNewMission = () => {
    const sent = sentences[Math.floor(Math.random() * sentences.length)];
    const verb = modalVerbs.find(v => v.infinitive === sent.verb);
    const key = sent.subject === 'er' ? 'er' : sent.subject;
    const correct = verb[key];

    setSentence(sent.template);
    setCurrentVerb(verb);
    setCorrectForm(correct);

    // Create options
    const allForms = [verb.ich, verb.du, verb.er, verb.wir, verb.ihr, verb.sie];
    const wrongOptions = allForms.filter(f => f !== correct).slice(0, 3);
    setOptions([correct, ...wrongOptions].sort(() => Math.random() - 0.5));
    setShowSuccess(false);
  };

  const handleAnswer = (selected) => {
    if (selected === correctForm) {
      soundManager.playSuccess();
      setScore(prev => prev + 20);
      setShowSuccess(true);
      setTimeout(() => {
        setLevel(prev => prev + 1);
        loadNewMission();
      }, 2000);
    } else {
      soundManager.playIncorrect();
    }
  };

  if (!currentVerb) return null;

  return (
    <GameContainer title="Modalverben Mission 🎯" score={score} level={level} onBack={onBack}>
      <div className="german-game">
        <div className="instructions">
          Wähle die richtige Modalverb-Form! (Choose the correct modal verb form!)
        </div>

        <div className="sentence-display">
          <div className="sentence-text">{sentence}</div>
          <div className="verb-info">({currentVerb.translation})</div>
        </div>

        <div className="modal-options">
          {options.map((option, idx) => (
            <button
              key={idx}
              className="modal-option-btn"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <Modal isOpen={showSuccess} type="success" title="Richtig!">
        <p>{sentence.replace('___', correctForm)}</p>
      </Modal>
    </GameContainer>
  );
};

export default ModalverbenMission;
