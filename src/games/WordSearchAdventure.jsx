import React, { useState, useEffect } from 'react';
import GameContainer from '../components/GameContainer';
import Modal from '../components/Modal';
import soundManager from '../utils/soundManager';
import { getRandomWords } from '../data/words';
import './WordSearchAdventure.css';

const WordSearchAdventure = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [grid, setGrid] = useState([]);
  const [words, setWords] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const GRID_SIZE = 8;

  useEffect(() => {
    generatePuzzle();
  }, []);

  const generatePuzzle = () => {
    const difficulty = level > 3 ? 'medium' : 'easy';
    const wordList = getRandomWords(difficulty, 5)
      .filter(w => w.length >= 3 && w.length <= 6)
      .map(w => w.toUpperCase());

    setWords(wordList);
    setFoundWords([]);
    setSelectedCells([]);
    setShowSuccess(false);

    // Create empty grid
    const newGrid = Array(GRID_SIZE).fill(null).map(() =>
      Array(GRID_SIZE).fill(null).map(() => ({
        letter: '',
        isWord: false,
        wordIndex: -1,
        found: false
      }))
    );

    // Place words in grid
    wordList.forEach((word, wordIdx) => {
      let placed = false;
      let attempts = 0;

      while (!placed && attempts < 100) {
        const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
        const row = Math.floor(Math.random() * GRID_SIZE);
        const col = Math.floor(Math.random() * GRID_SIZE);

        if (canPlaceWord(newGrid, word, row, col, direction)) {
          placeWord(newGrid, word, row, col, direction, wordIdx);
          placed = true;
        }
        attempts++;
      }
    });

    // Fill empty cells with random letters
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (!newGrid[r][c].letter) {
          newGrid[r][c].letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }

    setGrid(newGrid);
  };

  const canPlaceWord = (grid, word, row, col, direction) => {
    if (direction === 'horizontal') {
      if (col + word.length > GRID_SIZE) return false;
      for (let i = 0; i < word.length; i++) {
        if (grid[row][col + i].letter && grid[row][col + i].letter !== word[i]) {
          return false;
        }
      }
    } else {
      if (row + word.length > GRID_SIZE) return false;
      for (let i = 0; i < word.length; i++) {
        if (grid[row + i][col].letter && grid[row + i][col].letter !== word[i]) {
          return false;
        }
      }
    }
    return true;
  };

  const placeWord = (grid, word, row, col, direction, wordIdx) => {
    if (direction === 'horizontal') {
      for (let i = 0; i < word.length; i++) {
        grid[row][col + i] = {
          letter: word[i],
          isWord: true,
          wordIndex: wordIdx,
          found: false
        };
      }
    } else {
      for (let i = 0; i < word.length; i++) {
        grid[row + i][col] = {
          letter: word[i],
          isWord: true,
          wordIndex: wordIdx,
          found: false
        };
      }
    }
  };

  const handleCellMouseDown = (row, col) => {
    setIsSelecting(true);
    setSelectedCells([{ row, col }]);
  };

  const handleCellMouseEnter = (row, col) => {
    if (isSelecting) {
      setSelectedCells(prev => {
        // Only allow straight lines (horizontal or vertical)
        if (prev.length === 0) return [{ row, col }];

        const first = prev[0];
        if (row === first.row || col === first.col) {
          return buildLinePath(first.row, first.col, row, col);
        }
        return prev;
      });
    }
  };

  const buildLinePath = (r1, c1, r2, c2) => {
    const path = [];
    if (r1 === r2) {
      const start = Math.min(c1, c2);
      const end = Math.max(c1, c2);
      for (let c = start; c <= end; c++) {
        path.push({ row: r1, col: c });
      }
    } else if (c1 === c2) {
      const start = Math.min(r1, r2);
      const end = Math.max(r1, r2);
      for (let r = start; r <= end; r++) {
        path.push({ row: r, col: c1 });
      }
    }
    return path;
  };

  const handleCellMouseUp = () => {
    setIsSelecting(false);

    // Check if selected cells form a word
    const selectedWord = selectedCells.map(({ row, col }) => grid[row][col].letter).join('');

    const wordIndex = words.findIndex(w => w === selectedWord);
    if (wordIndex !== -1 && !foundWords.includes(wordIndex)) {
      // Found a word!
      soundManager.playCorrect();
      setFoundWords(prev => [...prev, wordIndex]);
      setScore(prev => prev + 20);

      // Mark cells as found
      setGrid(prev => {
        const newGrid = prev.map(row => row.map(cell => ({ ...cell })));
        selectedCells.forEach(({ row, col }) => {
          if (newGrid[row][col].wordIndex === wordIndex) {
            newGrid[row][col].found = true;
          }
        });
        return newGrid;
      });

      // Check if all words found
      if (foundWords.length + 1 === words.length) {
        soundManager.playSuccess();
        setShowSuccess(true);
        setTimeout(() => {
          setLevel(prev => prev + 1);
          generatePuzzle();
        }, 2500);
      }
    } else {
      soundManager.playPop();
    }

    setSelectedCells([]);
  };

  const isCellSelected = (row, col) => {
    return selectedCells.some(cell => cell.row === row && cell.col === col);
  };

  return (
    <GameContainer
      title="Word Search Adventure"
      score={score}
      level={level}
      onBack={onBack}
    >
      <div className="word-search-game">
        <div className="instructions">
          Find and select the hidden words!
        </div>

        <div className="word-list">
          {words.map((word, idx) => (
            <div
              key={idx}
              className={`word-item ${foundWords.includes(idx) ? 'found' : ''}`}
            >
              {word}
            </div>
          ))}
        </div>

        <div
          className="search-grid"
          onMouseLeave={() => setIsSelecting(false)}
        >
          {grid.map((row, rowIdx) => (
            <div key={rowIdx} className="grid-row">
              {row.map((cell, colIdx) => (
                <div
                  key={colIdx}
                  className={`grid-cell ${
                    isCellSelected(rowIdx, colIdx) ? 'selected' : ''
                  } ${cell.found ? 'found' : ''}`}
                  onMouseDown={() => handleCellMouseDown(rowIdx, colIdx)}
                  onMouseEnter={() => handleCellMouseEnter(rowIdx, colIdx)}
                  onMouseUp={handleCellMouseUp}
                >
                  {cell.letter}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="progress-info">
          Found: {foundWords.length} / {words.length}
        </div>
      </div>

      <Modal
        isOpen={showSuccess}
        type="success"
        title="All Words Found!"
      >
        <p>You found all {words.length} words!</p>
        <p>Moving to Level {level + 1}...</p>
      </Modal>
    </GameContainer>
  );
};

export default WordSearchAdventure;
