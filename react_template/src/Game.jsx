// src/Game.jsx
import React, { useState, useEffect } from 'react';

const Game = () => {
  const [grid, setGrid] = useState(Array(4).fill(Array(4).fill(0)));
  const [score, setScore] = useState(0);

  const initializeGrid = () => {
    let newGrid = Array(4).fill().map(() => Array(4).fill(0));
    newGrid = addRandomTile(newGrid);
    newGrid = addRandomTile(newGrid);
    setGrid(newGrid);
  };

  const addRandomTile = (grid) => {
    const emptyCells = [];
    grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === 0) emptyCells.push([i, j]);
      });
    });
    if (emptyCells.length > 0) {
      const [i, j] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      grid[i][j] = Math.random() > 0.9 ? 4 : 2;
    }
    return grid;
  };

  const moveTiles = (direction) => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    let moved = false;

    const rotateGrid = (grid) => {
      return grid[0].map((_, i) => grid.map(row => row[i]).reverse());
    };

    const moveLeft = (grid) => {
      for (let i = 0; i < 4; i++) {
        let row = grid[i].filter(val => val !== 0);
        for (let j = 0; j < row.length - 1; j++) {
          if (row[j] === row[j + 1]) {
            row[j] *= 2;
            setScore(prevScore => prevScore + row[j]);
            row[j + 1] = 0;
          }
        }
        row = row.filter(val => val !== 0);
        while (row.length < 4) row.push(0);
        grid[i] = row;
      }
      return grid;
    };

    switch (direction) {
      case 'left':
        newGrid = moveLeft(newGrid);
        break;
      case 'right':
        newGrid = rotateGrid(rotateGrid(newGrid));
        newGrid = moveLeft(newGrid);
        newGrid = rotateGrid(rotateGrid(newGrid));
        break;
      case 'up':
        newGrid = rotateGrid(rotateGrid(rotateGrid(newGrid)));
        newGrid = moveLeft(newGrid);
        newGrid = rotateGrid(newGrid);
        break;
      case 'down':
        newGrid = rotateGrid(newGrid);
        newGrid = moveLeft(newGrid);
        newGrid = rotateGrid(rotateGrid(rotateGrid(newGrid)));
        break;
      default:
        break;
    }

    if (JSON.stringify(newGrid) !== JSON.stringify(grid)) {
      moved = true;
      newGrid = addRandomTile(newGrid);
    }

    if (moved) setGrid(newGrid);
  };

  useEffect(() => {
    initializeGrid();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          moveTiles('left');
          break;
        case 'ArrowRight':
          moveTiles('right');
          break;
        case 'ArrowUp':
          moveTiles('up');
          break;
        case 'ArrowDown':
          moveTiles('down');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [grid]);

  return (
    <div className="game-container">
      <div className="score">Score: {score}</div>
      <div className="grid">
        {grid.map((row, i) => (
          <div key={i} className="row">
            {row.map((cell, j) => (
              <div key={j} className={`cell cell-${cell}`}>
                {cell !== 0 ? cell : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;