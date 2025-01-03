// src/GameBoard.jsx
import React from 'react';

const GameBoard = ({ board }) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-gray-800 rounded-lg">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`w-24 h-24 flex items-center justify-center text-2xl font-bold rounded-lg ${
              cell === 0 ? 'bg-gray-700' : 'bg-yellow-400 text-gray-900'
            }`}
          >
            {cell !== 0 && cell}
          </div>
        ))
      )}
    </div>
  );
};

export default GameBoard;