// src/GameBoard.jsx
import React from 'react';

const GameBoard = ({ board }) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-gray-800 rounded-lg">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="w-20 h-20 flex items-center justify-center bg-gray-700 rounded-lg text-2xl font-bold"
          >
            {cell !== 0 ? cell : ''}
          </div>
        ))
      )}
    </div>
  );
};

export default GameBoard;