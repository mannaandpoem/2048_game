// src/Tile.jsx
import React from 'react';

const Tile = ({ value }) => {
  const colors = {
    0: 'bg-gray-700',
    2: 'bg-yellow-200',
    4: 'bg-yellow-300',
    8: 'bg-yellow-400',
    16: 'bg-yellow-500',
    32: 'bg-yellow-600',
    64: 'bg-yellow-700',
    128: 'bg-yellow-800',
    256: 'bg-yellow-900',
    512: 'bg-orange-400',
    1024: 'bg-orange-500',
    2048: 'bg-orange-600',
  };

  return (
    <div className={`w-20 h-20 flex justify-center items-center m-1 rounded-lg ${colors[value] || 'bg-gray-700'}`}>
      {value !== 0 && <span className="text-2xl font-bold text-white">{value}</span>}
    </div>
  );
};

export default Tile;