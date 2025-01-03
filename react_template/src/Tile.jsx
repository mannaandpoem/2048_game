// src/Tile.jsx
import React from 'react';

function Tile({ value }) {
  const tileColor = value === 0 ? 'bg-gray-700' : `bg-tile-${value}`;
  return (
    <div className={`w-20 h-20 flex items-center justify-center rounded-lg ${tileColor} text-2xl font-bold`}>
      {value !== 0 && value}
    </div>
  );
}

export default Tile;