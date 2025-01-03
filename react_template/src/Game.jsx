// src/Game.jsx
import React, { useState, useEffect } from 'react';
import Tile from './Tile';

const initializeBoard = () => {
  const board = Array(4).fill().map(() => Array(4).fill(0));
  addRandomTile(board);
  addRandomTile(board);
  return board;
};

const addRandomTile = (board) => {
  const emptyCells = [];
  board.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 0) emptyCells.push([i, j]);
    });
  });
  if (emptyCells.length > 0) {
    const [i, j] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[i][j] = Math.random() < 0.9 ? 2 : 4;
  }
};

const moveTiles = (board, direction) => {
  let newBoard = board.map(row => [...row]);
  let moved = false;

  const rotateBoard = (board) => {
    return board[0].map((_, i) => board.map(row => row[i]).reverse());
  };

  const moveLeft = (board) => {
    let moved = false;
    for (let i = 0; i < 4; i++) {
      let row = board[i].filter(val => val !== 0);
      for (let j = 0; j < row.length - 1; j++) {
        if (row[j] === row[j + 1]) {
          row[j] *= 2;
          row[j + 1] = 0;
          moved = true;
        }
      }
      row = row.filter(val => val !== 0);
      while (row.length < 4) row.push(0);
      board[i] = row;
    }
    return moved;
  };

  switch (direction) {
    case 'ArrowLeft':
      moved = moveLeft(newBoard);
      break;
    case 'ArrowRight':
      newBoard = newBoard.map(row => row.reverse());
      moved = moveLeft(newBoard);
      newBoard = newBoard.map(row => row.reverse());
      break;
    case 'ArrowUp':
      newBoard = rotateBoard(newBoard);
      moved = moveLeft(newBoard);
      newBoard = rotateBoard(newBoard);
      newBoard = rotateBoard(newBoard);
      newBoard = rotateBoard(newBoard);
      break;
    case 'ArrowDown':
      newBoard = rotateBoard(newBoard);
      newBoard = rotateBoard(newBoard);
      newBoard = rotateBoard(newBoard);
      moved = moveLeft(newBoard);
      newBoard = rotateBoard(newBoard);
      break;
    default:
      break;
  }

  if (moved) addRandomTile(newBoard);
  return newBoard;
};

const Game = () => {
  const [board, setBoard] = useState(initializeBoard());

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        setBoard(prevBoard => moveTiles(prevBoard, e.key));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((value, j) => (
            <Tile key={`${i}-${j}`} value={value} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Game;