// Implementing a simple AI player against the user
export function findEmptySpaces(board) {
  const emptySpaces = [];
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === " ") {
        emptySpaces.push({ row, col });
      }
    }
  }
  return emptySpaces;
}

export function aiMove(board) {
  const emptySpaces = findEmptySpaces(board);
  if (emptySpaces.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptySpaces.length);
    const { row, col } = emptySpaces[randomIndex];
    board[row][col] = "O"; // Assuming AI always plays 'O'
  }
}
