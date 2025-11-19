import React, { useState, useEffect } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import { plurals } from '../data/germanData';
import './GermanGameStyles.css';

const PluralPacMan = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [targetWord, setTargetWord] = useState(null);
  const [pacManPos, setPacManPos] = useState({ x: 1, y: 1 });
  const [pellets, setPellets] = useState([]);
  const [ghosts, setGhosts] = useState([]);
  const [collected, setCollected] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [direction, setDirection] = useState('right');

  const GRID_SIZE = 10;
  const CELL_SIZE = 50;

  useEffect(() => {
    startNewLevel();
  }, []);

  const startNewLevel = () => {
    const word = plurals[Math.floor(Math.random() * plurals.length)];
    setTargetWord(word);
    setPacManPos({ x: 1, y: 1 });
    setCollected(false);
    setShowSuccess(false);

    // Place plural form in maze
    setPellets([{
      id: 1,
      word: word.plural,
      x: Math.floor(Math.random() * (GRID_SIZE - 4)) + 2,
      y: Math.floor(Math.random() * (GRID_SIZE - 4)) + 2,
      isCorrect: true
    }]);

    // Place ghosts
    setGhosts(Array(Math.min(level + 1, 4)).fill(null).map((_, i) => ({
      id: i,
      x: GRID_SIZE - 2,
      y: GRID_SIZE - 2,
      color: ['#ff6b6b', '#51cf66', '#ffd43b', '#667eea'][i]
    })));

    setTimeout(() => soundManager.speak(`Finde die Pluralform von ${word.singular}`), 500);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (collected || showSuccess) return;
      let newX = pacManPos.x;
      let newY = pacManPos.y;
      let newDir = direction;

      switch(e.key) {
        case 'ArrowUp':
        case 'w':
          newY = Math.max(0, pacManPos.y - 1);
          newDir = 'up';
          break;
        case 'ArrowDown':
        case 's':
          newY = Math.min(GRID_SIZE - 1, pacManPos.y + 1);
          newDir = 'down';
          break;
        case 'ArrowLeft':
        case 'a':
          newX = Math.max(0, pacManPos.x - 1);
          newDir = 'left';
          break;
        case 'ArrowRight':
        case 'd':
          newX = Math.min(GRID_SIZE - 1, pacManPos.x + 1);
          newDir = 'right';
          break;
        default:
          return;
      }

      setPacManPos({ x: newX, y: newY });
      setDirection(newDir);
      soundManager.playPop();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [pacManPos, collected, showSuccess, direction]);

  useEffect(() => {
    pellets.forEach(pellet => {
      if (pellet.x === pacManPos.x && pellet.y === pacManPos.y && !collected) {
        soundManager.playSuccess();
        soundManager.speak(pellet.word);
        setCollected(true);
        setScore(prev => prev + 50);
        setShowSuccess(true);
        setTimeout(() => {
          setLevel(prev => prev + 1);
          startNewLevel();
        }, 2500);
      }
    });
  }, [pacManPos, pellets, collected]);

  useEffect(() => {
    if (collected || showSuccess) return;
    const interval = setInterval(() => {
      setGhosts(prev => prev.map(ghost => {
        let newX = ghost.x;
        let newY = ghost.y;
        if (Math.random() > 0.3) {
          if (Math.abs(pacManPos.x - ghost.x) > Math.abs(pacManPos.y - ghost.y)) {
            newX += pacManPos.x > ghost.x ? 1 : -1;
          } else {
            newY += pacManPos.y > ghost.y ? 1 : -1;
          }
        } else {
          const moves = [[0,1], [0,-1], [1,0], [-1,0]];
          const move = moves[Math.floor(Math.random() * moves.length)];
          newX += move[0];
          newY += move[1];
        }
        return { ...ghost, x: Math.max(0, Math.min(GRID_SIZE - 1, newX)), y: Math.max(0, Math.min(GRID_SIZE - 1, newY)) };
      }));
    }, 700 - (level * 30));
    return () => clearInterval(interval);
  }, [pacManPos, collected, showSuccess, level]);

  const renderGrid = () => {
    const cells = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const isPacMan = pacManPos.x === x && pacManPos.y === y;
        const pellet = pellets.find(p => p.x === x && p.y === y);
        const ghost = ghosts.find(g => g.x === x && g.y === y);

        cells.push(
          <div
            key={`${x}-${y}`}
            className="maze-cell"
            style={{
              left: x * CELL_SIZE,
              top: y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              background: (x + y) % 2 === 0 ? '#1a1a2e' : '#16162a'
            }}
          >
            {isPacMan && <div className={`pacman ${direction}`}></div>}
            {pellet && (
              <div className="word-pellet pulse">
                {pellet.word}
              </div>
            )}
            {ghost && (
              <div className="ghost bounce" style={{ background: ghost.color }}>
                <div className="ghost-eyes">
                  <div className="eye"></div>
                  <div className="eye"></div>
                </div>
              </div>
            )}
          </div>
        );
      }
    }
    return cells;
  };

  if (!targetWord) return null;

  return (
    <GameContainer title="Plural Pac-Man 👾" score={score} level={level} onBack={onBack}>
      <div className="german-game">
        <div className="target-info">
          <h3>Finde den Plural von: <strong>{targetWord.singular}</strong></h3>
          <p className="hint">Pattern: {targetWord.pattern}</p>
        </div>

        <div className="maze-container" style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}>
          {renderGrid()}
        </div>

        <div className="controls-hint">
          Benutze Pfeiltasten oder WASD (Use Arrow keys or WASD)
        </div>
      </div>

      <Modal isOpen={showSuccess} type="success" title="Richtig! (Correct!)">
        <p>{targetWord.singular} → {targetWord.plural}</p>
      </Modal>
    </GameContainer>
  );
};

export default PluralPacMan;
