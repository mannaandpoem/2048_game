import React, { useState, useEffect } from 'react';

function App() {
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
        if (cell === 0) {
          emptyCells.push({ i, j });
        }
      });
    });
    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      grid[randomCell.i][randomCell.j] = Math.random() > 0.9 ? 4 : 2;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
      moveTilesUp();
    } else if (event.key === 'ArrowDown') {
      moveTilesDown();
    } else if (event.key === 'ArrowLeft') {
      moveTilesLeft();
    } else if (event.key === 'ArrowRight') {
      moveTilesRight();
    }
  };

  const moveTilesUp = () => {
    const newGrid = JSON.parse(JSON.stringify(grid));
    for (let j = 0; j < 4; j++) {
      for (let i = 1; i < 4; i++) {
        if (newGrid[i][j] !== 0) {
          let k = i;
          while (k > 0 && newGrid[k - 1][j] === 0) {
            newGrid[k - 1][j] = newGrid[k][j];
            newGrid[k][j] = 0;
            k--;
          }
          if (k > 0 && newGrid[k - 1][j] === newGrid[k][j]) {
            newGrid[k - 1][j] *= 2;
            newGrid[k][j] = 0;
          }
        }
      }
    }
    addRandomTile(newGrid);
    setGrid(newGrid);
  };

  const moveTilesDown = () => {
    const newGrid = JSON.parse(JSON.stringify(grid));
    for (let j = 0; j < 4; j++) {
      for (let i = 2; i >= 0; i--) {
        if (newGrid[i][j] !== 0) {
          let k = i;
          while (k < 3 && newGrid[k + 1][j] === 0) {
            newGrid[k + 1][j] = newGrid[k][j];
            newGrid[k][j] = 0;
            k++;
          }
          if (k < 3 && newGrid[k + 1][j] === newGrid[k][j]) {
            newGrid[k + 1][j] *= 2;
            newGrid[k][j] = 0;
          }
        }
      }
    }
    addRandomTile(newGrid);
    setGrid(newGrid);
  };

  const moveTilesLeft = () => {
    const newGrid = JSON.parse(JSON.stringify(grid));
    for (let i = 0; i < 4; i++) {
      for (let j = 1; j < 4; j++) {
        if (newGrid[i][j] !== 0) {
          let k = j;
          while (k > 0 && newGrid[i][k - 1] === 0) {
            newGrid[i][k - 1] = newGrid[i][k];
            newGrid[i][k] = 0;
            k--;
          }
          if (k > 0 && newGrid[i][k - 1] === newGrid[i][k]) {
            newGrid[i][k - 1] *= 2;
            newGrid[i][k] = 0;
          }
        }
      }
    }
    addRandomTile(newGrid);
    setGrid(newGrid);
  };

  const moveTilesRight = () => {
    const newGrid = JSON.parse(JSON.stringify(grid));
    for (let i = 0; i < 4; i++) {
      for (let j = 2; j >= 0; j--) {
        if (newGrid[i][j] !== 0) {
          let k = j;
          while (k < 3 && newGrid[i][k + 1] === 0) {
            newGrid[i][k + 1] = newGrid[i][k];
            newGrid[i][k] = 0;
            k++;
          }
          if (k < 3 && newGrid[i][k + 1] === newGrid[i][k]) {
            newGrid[i][k + 1] *= 2;
            newGrid[i][k] = 0;
          }
        }
      }
    }
    addRandomTile(newGrid);
    setGrid(newGrid);
  };

  useEffect(() => {
    initializeGrid();
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="grid grid-cols-4 gap-2">
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className="w-20 h-20 flex items-center justify-center bg-gray-700 text-white font-bold text-2xl rounded"
            >
              {cell !== 0 ? cell : ''}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;