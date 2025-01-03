// src/App.jsx
import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import { initializeGame, moveTiles, checkGameOver } from './GameLogic';

function App() {
  const [board, setBoard] = useState(initializeGame());
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (gameOver) return;

      let newBoard;
      switch (event.key) {
        case 'ArrowUp':
          newBoard = moveTiles(board, 'up');
          break;
        case 'ArrowDown':
          newBoard = moveTiles(board, 'down');
          break;
        case 'ArrowLeft':
          newBoard = moveTiles(board, 'left');
          break;
        case 'ArrowRight':
          newBoard = moveTiles(board, 'right');
          break;
        default:
          return;
      }

      if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
        setBoard(newBoard);
        if (checkGameOver(newBoard)) {
          setGameOver(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [board, gameOver]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">2048 Game</h1>
      <GameBoard board={board} />
      {gameOver && <div className="mt-8 text-2xl font-bold">Game Over!</div>}
    </div>
  );
}

export default App;