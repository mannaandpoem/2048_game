// src/GameBoard.jsx
import React from 'react';
import Tile from './Tile';

function GameBoard({ board }) {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-gray-800 rounded-lg">
      {board.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <Tile key={`${rowIndex}-${colIndex}`} value={value} />
        ))
      )}
    </div>
  );
}

export default GameBoard;