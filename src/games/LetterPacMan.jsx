import React, { useState, useEffect, useCallback } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import { getRandomWord } from '../data/words';
import './LetterPacMan.css';

const LetterPacMan = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [targetWord, setTargetWord] = useState('');
  const [collectedLetters, setCollectedLetters] = useState([]);
  const [pacManPos, setPacManPos] = useState({ x: 1, y: 1 });
  const [letters, setLetters] = useState([]);
  const [ghosts, setGhosts] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [direction, setDirection] = useState('right');

  const GRID_SIZE = 10;
  const CELL_SIZE = 50;

  // Initialize game
  useEffect(() => {
    startNewLevel();
  }, []);

  const startNewLevel = () => {
    const word = getRandomWord(level > 3 ? 'medium' : 'easy');
    setTargetWord(word.toUpperCase());
    setCollectedLetters([]);
    setPacManPos({ x: 1, y: 1 });
    setWon(false);
    setGameOver(false);

    // Place letters randomly on grid
    const wordLetters = word.toUpperCase().split('');
    const newLetters = wordLetters.map((letter, idx) => ({
      id: idx,
      letter,
      x: Math.floor(Math.random() * (GRID_SIZE - 2)) + 1,
      y: Math.floor(Math.random() * (GRID_SIZE - 2)) + 1,
      collected: false
    }));
    setLetters(newLetters);

    // Place ghosts
    const newGhosts = Array(Math.min(level + 1, 4)).fill(null).map((_, idx) => ({
      id: idx,
      x: GRID_SIZE - 2,
      y: GRID_SIZE - 2,
      color: ['#ff0000', '#00ffff', '#ff69b4', '#ffa500'][idx]
    }));
    setGhosts(newGhosts);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver || won) return;

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
  }, [pacManPos, gameOver, won, direction]);

  // Check letter collection
  useEffect(() => {
    letters.forEach(letter => {
      if (!letter.collected &&
          letter.x === pacManPos.x &&
          letter.y === pacManPos.y) {

        setCollectedLetters(prev => [...prev, letter.letter]);
        setLetters(prev => prev.map(l =>
          l.id === letter.id ? { ...l, collected: true } : l
        ));
        soundManager.playCollect();
        setScore(prev => prev + 10);
      }
    });
  }, [pacManPos, letters]);

  // Check win condition
  useEffect(() => {
    if (collectedLetters.join('') === targetWord && targetWord.length > 0) {
      setWon(true);
      soundManager.playSuccess();
      setTimeout(() => {
        setLevel(prev => prev + 1);
        setScore(prev => prev + 50);
        startNewLevel();
      }, 2000);
    }
  }, [collectedLetters, targetWord]);

  // Move ghosts
  useEffect(() => {
    if (gameOver || won) return;

    const interval = setInterval(() => {
      setGhosts(prev => prev.map(ghost => {
        // Simple AI: move towards PacMan
        let newX = ghost.x;
        let newY = ghost.y;

        if (Math.random() > 0.3) {
          if (Math.abs(pacManPos.x - ghost.x) > Math.abs(pacManPos.y - ghost.y)) {
            newX += pacManPos.x > ghost.x ? 1 : -1;
          } else {
            newY += pacManPos.y > ghost.y ? 1 : -1;
          }
        } else {
          // Random movement
          const moves = [[0,1], [0,-1], [1,0], [-1,0]];
          const move = moves[Math.floor(Math.random() * moves.length)];
          newX += move[0];
          newY += move[1];
        }

        newX = Math.max(0, Math.min(GRID_SIZE - 1, newX));
        newY = Math.max(0, Math.min(GRID_SIZE - 1, newY));

        return { ...ghost, x: newX, y: newY };
      }));
    }, 800 - (level * 50));

    return () => clearInterval(interval);
  }, [pacManPos, gameOver, won, level]);

  // Check ghost collision
  useEffect(() => {
    const collision = ghosts.some(ghost =>
      ghost.x === pacManPos.x && ghost.y === pacManPos.y
    );
    if (collision && !gameOver) {
      setGameOver(true);
      soundManager.playIncorrect();
    }
  }, [pacManPos, ghosts, gameOver]);

  const renderGrid = () => {
    const cells = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const isPacMan = pacManPos.x === x && pacManPos.y === y;
        const letter = letters.find(l => l.x === x && l.y === y && !l.collected);
        const ghost = ghosts.find(g => g.x === x && g.y === y);

        cells.push(
          <div
            key={`${x}-${y}`}
            className={`maze-cell ${(x + y) % 2 === 0 ? 'dark' : ''}`}
            style={{
              left: x * CELL_SIZE,
              top: y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE
            }}
          >
            {isPacMan && (
              <div className={`pacman ${direction}`}>
                <div className="pacman-mouth"></div>
              </div>
            )}
            {letter && (
              <div className="letter-pellet pulse">
                {letter.letter}
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

  return (
    <GameContainer
      title="Letter Pac-Man"
      score={score}
      level={level}
      onBack={onBack}
    >
      <div className="pacman-game">
        <div className="target-word">
          <h3>Collect: {targetWord}</h3>
          <div className="collected-display">
            {targetWord.split('').map((letter, idx) => (
              <span
                key={idx}
                className={`letter-slot ${collectedLetters[idx] === letter ? 'filled' : ''}`}
              >
                {collectedLetters[idx] || '?'}
              </span>
            ))}
          </div>
        </div>

        <div className="instructions">
          Use Arrow Keys or WASD to move!
        </div>

        <div
          className="maze"
          style={{
            width: GRID_SIZE * CELL_SIZE,
            height: GRID_SIZE * CELL_SIZE
          }}
        >
          {renderGrid()}
        </div>
      </div>

      <Modal
        isOpen={won}
        type="success"
        title="Word Complete!"
      >
        <p>You spelled: {targetWord}</p>
        <p>Moving to Level {level + 1}...</p>
      </Modal>

      <Modal
        isOpen={gameOver}
        type="error"
        title="Oops! Ghost got you!"
        onClose={() => {
          setScore(0);
          setLevel(1);
          startNewLevel();
        }}
      >
        <p>Try again!</p>
        <button
          className="retry-button"
          onClick={() => {
            setScore(0);
            setLevel(1);
            startNewLevel();
          }}
        >
          Retry
        </button>
      </Modal>
    </GameContainer>
  );
};

export default LetterPacMan;
