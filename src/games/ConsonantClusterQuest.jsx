import React, { useState, useEffect } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import { consonantClusters } from '../data/logopediaData';
import './SharedLogopediaStyles.css';

const ConsonantClusterQuest = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [targetCluster, setTargetCluster] = useState('');
  const [words, setWords] = useState([]);
  const [collectedWords, setCollectedWords] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadNewRound();
  }, []);

  const loadNewRound = () => {
    const clusters = Object.keys(consonantClusters);
    const cluster = clusters[Math.floor(Math.random() * clusters.length)];
    const clusterWords = consonantClusters[cluster];

    setTargetCluster(cluster);
    setWords(clusterWords);
    setCollectedWords([]);
    setShowSuccess(false);

    setTimeout(() => soundManager.speak(`Find words starting with ${cluster}`), 500);
  };

  const handleWordClick = (word) => {
    if (collectedWords.includes(word)) return;

    soundManager.playCorrect();
    soundManager.speak(word);
    const newCollected = [...collectedWords, word];
    setCollectedWords(newCollected);
    setScore(prev => prev + 10);

    if (newCollected.length === words.length) {
      soundManager.playSuccess();
      setShowSuccess(true);
      setTimeout(() => {
        setLevel(prev => prev + 1);
        loadNewRound();
      }, 2500);
    }
  };

  return (
    <GameContainer title="Consonant Cluster Quest" score={score} level={level} onBack={onBack}>
      <div className="logopedia-game">
        <div className="instructions">
          Click all words that start with the blend:
        </div>

        <div className="cluster-display pulse">
          <div className="cluster-text">{targetCluster.toUpperCase()}</div>
          <button className="speak-btn" onClick={() => soundManager.speak(targetCluster)}>
            🔊
          </button>
        </div>

        <div className="progress-tracker">
          {collectedWords.length} / {words.length} words found
        </div>

        <div className="cluster-words">
          {words.map((word, idx) => (
            <button
              key={idx}
              className={`cluster-word-btn ${collectedWords.includes(word) ? 'collected' : ''}`}
              onClick={() => handleWordClick(word)}
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      <Modal isOpen={showSuccess} type="success" title="Quest Complete!">
        <p>You found all <strong>{targetCluster}</strong> words!</p>
      </Modal>
    </GameContainer>
  );
};

export default ConsonantClusterQuest;
