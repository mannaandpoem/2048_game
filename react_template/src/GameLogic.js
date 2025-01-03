// src/GameLogic.js
export const initializeGame = () => {
  const board = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => 0));
  addRandomTile(board);
  addRandomTile(board);
  return board;
};

export const addRandomTile = (board) => {
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
};

export const moveTiles = (board, direction) => {
  const newBoard = JSON.parse(JSON.stringify(board));
  let moved = false;

  const rotateBoard = (board) => {
    return board[0].map((_, index) => board.map((row) => row[index]).reverse());
  };

  const moveLeft = (board) => {
    for (let row = 0; row < 4; row++) {
      let col = 0;
      for (let i = 1; i < 4; i++) {
        if (board[row][i] !== 0) {
          if (board[row][col] === 0) {
            board[row][col] = board[row][i];
            board[row][i] = 0;
            moved = true;
          } else if (board[row][col] === board[row][i]) {
            board[row][col] *= 2;
            board[row][i] = 0;
            col++;
            moved = true;
          } else {
            col++;
            if (col !== i) {
              board[row][col] = board[row][i];
              board[row][i] = 0;
              moved = true;
            }
          }
        }
      }
    }
    return board;
  };

  switch (direction) {
    case 'left':
      moveLeft(newBoard);
      break;
    case 'right':
      newBoard.forEach((row) => row.reverse());
      moveLeft(newBoard);
      newBoard.forEach((row) => row.reverse());
      break;
    case 'up':
      newBoard = rotateBoard(newBoard);
      moveLeft(newBoard);
      newBoard = rotateBoard(newBoard);
      newBoard = rotateBoard(newBoard);
      newBoard = rotateBoard(newBoard);
      break;
    case 'down':
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
};