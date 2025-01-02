// src/Game.jsx
import React, { useState, useEffect } from 'react';

const Game = () => {
  const [grid, setGrid] = useState(Array(4).fill(Array(4).fill(0)));

  const initializeGrid = () => {
    const newGrid = Array(4).fill(Array(4).fill(0));
    addRandomTile(newGrid);
    addRandomTile(newGrid);
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
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp') moveTiles('up');
    else if (event.key === 'ArrowDown') moveTiles('down');
    else if (event.key === 'ArrowLeft') moveTiles('left');
    else if (event.key === 'ArrowRight') moveTiles('right');
  };

  const moveTiles = (direction) => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    let moved = false;

    const rotateGrid = (grid) => {
      return grid[0].map((_, i) => grid.map(row => row[i]).reverse());
    };

    if (direction === 'up' || direction === 'down') {
      newGrid = rotateGrid(newGrid);
    }

    newGrid.forEach((row, i) => {
      let rowCopy = row.filter(cell => cell !== 0);
      for (let j = 0; j < rowCopy.length - 1; j++) {
        if (rowCopy[j] === rowCopy[j + 1]) {
          rowCopy[j] *= 2;
          rowCopy.splice(j + 1, 1);
          moved = true;
        }
      }
      while (rowCopy.length < 4) rowCopy.push(0);
      newGrid[i] = rowCopy;
    });

    if (direction === 'up' || direction === 'down') {
      newGrid = rotateGrid(newGrid);
    }

    if (moved) {
      addRandomTile(newGrid);
      setGrid(newGrid);
    }
  };

  useEffect(() => {
    initializeGrid();
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      {grid.map((row, i) => (
        <div key={i} className="flex">
          {row.map((cell, j) => (
            <div key={j} className="w-20 h-20 m-1 flex justify-center items-center bg-gray-700 text-white text-2xl font-bold rounded">
              {cell !== 0 ? cell : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Game;