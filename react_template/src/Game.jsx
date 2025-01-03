// src/Game.jsx
import React, { useState, useEffect } from 'react';

const Game = () => {
  const [grid, setGrid] = useState(Array(4).fill(Array(4).fill(0)));
  const [score, setScore] = useState(0);

  const initializeGrid = () => {
    const newGrid = Array(4).fill(Array(4).fill(0));
    addRandomTile(newGrid);
    addRandomTile(newGrid);
    setGrid(newGrid);
    setScore(0);
  };

  const addRandomTile = (grid) => {
    const emptyCells = [];
    grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === 0) emptyCells.push({ i, j });
      });
    });
    if (emptyCells.length > 0) {
      const { i, j } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      grid[i][j] = Math.random() > 0.9 ? 4 : 2;
    }
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
            row.splice(j + 1, 1);
          }
        }
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
        newGrid = rotateGrid(newGrid);
        newGrid = moveLeft(newGrid);
        newGrid = rotateGrid(rotateGrid(rotateGrid(newGrid)));
        break;
      case 'down':
        newGrid = rotateGrid(rotateGrid(rotateGrid(newGrid)));
        newGrid = moveLeft(newGrid);
        newGrid = rotateGrid(newGrid);
        break;
      default:
        break;
    }

    if (JSON.stringify(newGrid) !== JSON.stringify(grid)) {
      moved = true;
      addRandomTile(newGrid);
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
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-4 gap-2 bg-gray-800 p-2 rounded-lg">
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`w-20 h-20 flex items-center justify-center rounded-lg bg-gray-700 text-2xl font-bold ${
                cell === 0 ? 'text-transparent' : 'text-white'
              }`}
            >
              {cell !== 0 ? cell : ''}
            </div>
          ))
        )}
      </div>
      <div className="mt-4 text-xl">Score: {score}</div>
      <button
        onClick={initializeGrid}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Reset Game
      </button>
    </div>
  );
};

export default Game;