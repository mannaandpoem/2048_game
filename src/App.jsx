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
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 0) {
          emptyCells.push({ row: rowIndex, col: colIndex });
        }
      });
    });

    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const newGrid = grid.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
          rowIndex === randomCell.row && colIndex === randomCell.col ? (Math.random() < 0.9 ? 2 : 4) : cell
        )
      );
      setGrid(newGrid);
    }
  };

  const moveTiles = (direction) => {
    let newGrid = grid.map(row => [...row]);

    const rotateGrid = (grid) => {
      return grid[0].map((_, index) => grid.map(row => row[index]).reverse());
    };

    const moveLeft = (grid) => {
      return grid.map(row => {
        let newRow = row.filter(cell => cell !== 0);
        for (let i = 0; i < newRow.length - 1; i++) {
          if (newRow[i] === newRow[i + 1]) {
            newRow[i] *= 2;
            newRow[i + 1] = 0;
          }
        }
        newRow = newRow.filter(cell => cell !== 0);
        while (newRow.length < 4) {
          newRow.push(0);
        }
        return newRow;
      });
    };

    switch (direction) {
      case 'left':
        newGrid = moveLeft(newGrid);
        break;
      case 'right':
        newGrid = moveLeft(newGrid.map(row => row.reverse())).map(row => row.reverse());
        break;
      case 'up':
        newGrid = rotateGrid(moveLeft(rotateGrid(newGrid)));
        break;
      case 'down':
        newGrid = rotateGrid(moveLeft(rotateGrid(newGrid).map(row => row.reverse()))).map(row => row.reverse());
        break;
      default:
        break;
    }

    setGrid(newGrid);
    addRandomTile(newGrid);
  };

  useEffect(() => {
    initializeGrid();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="grid grid-cols-4 gap-2 p-2 bg-gray-800 rounded-lg">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="w-20 h-20 flex items-center justify-center bg-gray-700 text-white font-bold text-2xl rounded-lg"
            >
              {cell !== 0 ? cell : ''}
            </div>
          ))
        )}
      </div>
      <div className="mt-4">
        <button
          onClick={() => moveTiles('up')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
        >
          Up
        </button>
        <button
          onClick={() => moveTiles('down')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
        >
          Down
        </button>
        <button
          onClick={() => moveTiles('left')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
        >
          Left
        </button>
        <button
          onClick={() => moveTiles('right')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Right
        </button>
      </div>
    </div>
  );
}

export default App;