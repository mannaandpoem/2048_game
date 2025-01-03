// src/gameLogic.js
export function initializeGame() {
  const board = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => 0));
  addRandomTile(board);
  addRandomTile(board);
  return board;
}

export function moveTiles(board, direction) {
  const newBoard = JSON.parse(JSON.stringify(board));
  let moved = false;

  const rotateBoard = (board) => {
    return board[0].map((_, i) => board.map(row => row[i]).reverse());
  };

  const moveLeft = (board) => {
    for (let row of board) {
      let i = 0;
      for (let j = 1; j < row.length; j++) {
        if (row[j] !== 0) {
          if (row[i] === 0) {
            row[i] = row[j];
            row[j] = 0;
            moved = true;
          } else if (row[i] === row[j]) {
            row[i] *= 2;
            row[j] = 0;
            i++;
            moved = true;
          } else {
            i++;
            if (i !== j) {
              row[i] = row[j];
              row[j] = 0;
              moved = true;
            }
          }
        }
      }
    }
    return board;
  };

  switch (direction) {
    case 'ArrowLeft':
      moveLeft(newBoard);
      break;
    case 'ArrowRight':
      newBoard.forEach(row => row.reverse());
      moveLeft(newBoard);
      newBoard.forEach(row => row.reverse());
      break;
    case 'ArrowUp':
      newBoard = rotateBoard(newBoard);
      moveLeft(newBoard);
      newBoard = rotateBoard(newBoard);
      newBoard = rotateBoard(newBoard);
      newBoard = rotateBoard(newBoard);
      break;
    case 'ArrowDown':
      newBoard = rotateBoard(newBoard);
      newBoard = rotateBoard(newBoard);
      newBoard = rotateBoard(newBoard);
      moveLeft(newBoard);
      newBoard = rotateBoard(newBoard);
      break;
    default:
      break;
  }

  if (moved) {
    addRandomTile(newBoard);
  }

  return newBoard;
}

function addRandomTile(board) {
  const emptyCells = [];
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === 0) {
        emptyCells.push({ rowIndex, colIndex });
      }
    });
  });

  if (emptyCells.length > 0) {
    const { rowIndex, colIndex } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[rowIndex][colIndex] = Math.random() < 0.9 ? 2 : 4;
  }
}