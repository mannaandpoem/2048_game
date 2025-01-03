// src/App.jsx
import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import { initializeGame, moveTiles } from './GameLogic';

function App() {
  const [board, setBoard] = useState(initializeGame());

  useEffect(() => {
    const handleKeyDown = (event) => {
      const direction = event.key.replace('Arrow', '').toLowerCase();
      if (['up', 'down', 'left', 'right'].includes(direction)) {
        const newBoard = moveTiles(board, direction);
        setBoard(newBoard);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [board]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">2048 Game</h1>
      <GameBoard board={board} />
    </div>
  );
}

export default App;