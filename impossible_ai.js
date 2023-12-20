import { findEmptySpaces } from "./simple_ai.js";
import { checkWin, checkTie } from "./game.js";
// human player = "X"
// AI player = "O"

export function bestMove(board, player, depth) {
  if (gameOver(board) || depth == 0) {
    console.log("Game Over");
    return null; // No move to be made, as the game is over or the max depth is reached.
  }

  const ai = "O";
  const human = "X";
  let bestScore;
  let bestMove = null;

  if (player === ai) {
    bestScore = -Infinity;
    let availableSpots = findEmptySpaces(board);
    for (const cell of availableSpots) {
      const newBoard = makeMove(board, cell, ai);
      const result = minimax(newBoard, human, depth - 1);
      if (result > bestScore) {
        bestScore = result;
        bestMove = cell;
      }
    }
  }
  board[bestMove.row][bestMove.col] = "O";
  console.log("AI Player chose row: " + bestMove.row + " col: " + bestMove.col);
  return board; // This should be the move object with the best score.
}

export function getInitialDepth(board) {
  const availableSpots = findEmptySpaces(board);
  return availableSpots.length;
}

// When calling bestMove, use this initial depth
function minimax(board, player, depth) {
  if (gameOver(board)) {
    return evaluate(board);
  }
  const human = "X";
  const ai = "O";

  if (player === human) {
    let bestScore = Infinity;
    const availableSpots = findEmptySpaces(board);
    for (const spot of availableSpots) {
      const newBoard = makeMove(board, spot, human);
      const result = minimax(newBoard, ai, depth - 1);
      bestScore = Math.min(bestScore, result);
    }
    return bestScore;
  } else {
    let bestScore = -Infinity;
    const availableSpots = findEmptySpaces(board);
    for (const spot of availableSpots) {
      const newBoard = makeMove(board, spot, ai);
      const result = minimax(newBoard, human, depth - 1);
      bestScore = Math.max(bestScore, result);
    }
    return bestScore;
  }
}

function makeMove(board, move, player) {
  const newBoard = board.map((row) => [...row]);
  newBoard[move.row][move.col] = player;
  return newBoard;
}

function evaluate(board) {
  if (checkWin(board, "O")) {
    return 10;
  } else if (checkWin(board, "X")) {
    return -10;
  } else {
    return 0;
  }
}

// check for game over:
function gameOver(board) {
  if (checkWin(board, "O") || checkWin(board, "X")) {
    return true;
  } else if (checkTie(board)) {
    return true;
  } else {
    return false;
  }
}
