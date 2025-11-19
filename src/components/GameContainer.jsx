import React from 'react';
import './GameContainer.css';

const GameContainer = ({
  children,
  onBack,
  score = 0,
  level = 1,
  title,
  showScore = true
}) => {
  return (
    <div className="game-container">
      <div className="game-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h2 className="game-title">{title}</h2>
        {showScore && (
          <div className="game-stats">
            <div className="stat">
              <span className="stat-label">Level</span>
              <span className="stat-value">{level}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Score</span>
              <span className="stat-value">{score}</span>
            </div>
          </div>
        )}
      </div>
      <div className="game-content">
        {children}
      </div>
    </div>
  );
};

export default GameContainer;
