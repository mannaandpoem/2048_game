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
    case 'left':
      moveLeft(newBoard);
      break;
    case 'right':
      newBoard.forEach((row) => row.reverse());
      moveLeft(newBoard);
      newBoard.forEach((row) => row.reverse());
      break;
    case 'up':
      let rotatedBoardUp = rotateBoard(newBoard);
      moveLeft(rotatedBoardUp);
      newBoard.splice(0, newBoard.length, ...rotateBoard(rotatedBoardUp));
      break;
    case 'down':
      let rotatedBoardDown = rotateBoard(newBoard);
      rotatedBoardDown.forEach((row) => row.reverse());
      moveLeft(rotatedBoardDown);
      rotatedBoardDown.forEach((row) => row.reverse());
      newBoard.splice(0, newBoard.length, ...rotateBoard(rotatedBoardDown));
      break;
    default:
      break;
  }

  if (moved) {
    addRandomTile(newBoard);
  }

  return newBoard;
};

export const checkGameOver = (board) => {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] === 0) {
        return false;
      }
      if (row < 3 && board[row][col] === board[row + 1][col]) {
        return false;
      }
      if (col < 3 && board[row][col] === board[row][col + 1]) {
        return false;
      }
    }
  }
  return true;
};