import {
  checkWin,
  playMove,
  resetBoard,
  printBoard,
  gameInit,
  checkTie,
  newCheckWin,
} from "./game.js";
import { playerPromptLoop } from "./player.js";
import { aiMove } from "./simple_ai.js";
import { bestMove, getInitialDepth } from "./impossible_ai.js";
// Create a 2D array to represent the game board
const board = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];

async function main() {
  gameInit(board);
  let keepPlaying = true;
  let currentPlayerIsHuman = true; // Change this as needed

  while (keepPlaying) {
    if (currentPlayerIsHuman) {
      console.log("Human player's turn:");
      await playerPromptLoop(board);
    } else {
      console.log("AI player's turn:");
      // aiMove(board);
      const depth = await getInitialDepth(board);
      const move = bestMove(board, "O", depth);
      console.log(move);
      board[move.row][move.col] = "O";
    }
    // Print the board after each move
    printBoard(board);

    // Check if the game has been won or tied after each move
    let checked = false;
    if (currentPlayerIsHuman === true) {
      if (newCheckWin(board) === "X") {
        console.log(currentPlayerIsHuman ? "Human player wins!" : "AI wins!");
        keepPlaying = false;
        checked = true;
      }
    } else {
      if (newCheckWin(board) === "O") {
        console.log(currentPlayerIsHuman ? "Human player wins!" : "AI wins!");
        keepPlaying = false;
        checked = true;
      }
    }

    if (checked === false && checkTie(board)) {
      console.log("The game is a tie!");
      keepPlaying = false;
    }
    // Switch the current player after each move
    currentPlayerIsHuman = !currentPlayerIsHuman;
  }
}

main();
