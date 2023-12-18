// Function to check if a player has won
export function checkWin(board, player) {
  // Check rows and columns
  for (let i = 0; i < 3; i++) {
    if (
      (board[i][0] === player &&
        board[i][1] === player &&
        board[i][2] === player) ||
      (board[0][i] === player &&
        board[1][i] === player &&
        board[2][i] === player)
    ) {
      return true;
    }
  }

  // Check diagonals
  if (
    (board[0][0] === player &&
      board[1][1] === player &&
      board[2][2] === player) ||
    (board[0][2] === player && board[1][1] === player && board[2][0] === player)
  ) {
    return true;
  }
  return false;
}

export function newCheckWin(board) {
  // Check rows and columns for a win
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      if (board[i][0] === "O" || board[i][0] === "X") {
        return board[i][0];
      }
    }
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
      if (board[0][i] === "O" || board[0][i] === "X") {
        return board[0][i];
      }
    }
  }
  // Check diagonals for a win
  if (
    (board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
    (board[0][2] === board[1][1] && board[1][1] === board[2][0])
  ) {
    if (board[1][1] === "O" || board[1][1] === "X") {
      return board[1][1];
    }
  }
  // No win found
  return null;
}

export function checkTie(board) {
  for (let i = 0; i < 3; i++) {
    if (board[i].includes(" ")) {
      return false;
    }
  }
  return true;
}

// Function to play a move
export function playMove(board, row, col, player) {
  if (board[row][col] === " ") {
    board[row][col] = player;
    return true;
  }
  return false;
}

export function resetBoard(board) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board[i][j] = " ";
    }
  }
}

export function printBoard(board) {
  for (let i = 0; i < 3; i++) {
    console.log(`| ${board[i][0]} | ${board[i][1]} | ${board[i][2]} |`);
    if (i != 2) {
      console.log("-------------");
    }
  }
}

export function gameInit(board) {
  resetBoard(board);
  console.log("Welcome to Tic Tac Toe!");
}
