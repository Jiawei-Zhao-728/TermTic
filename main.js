import {
  checkWin,
  playMove,
  resetBoard,
  printBoard,
  gameInit,
  checkTie,
  newCheckWin,
} from "./game.js";
import readline from "readline";
import { playerPromptLoop } from "./player.js";
import { aiMove } from "./simple_ai.js";
import { bestMove, getInitialDepth } from "./impossible_ai.js";
// Create a 2D array to represent the game board
const board = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];

async function game(difficulty) {
  gameInit(board);
  let keepPlaying = true;
  let currentPlayerIsHuman = true; // Change this as needed

  while (keepPlaying) {
    if (currentPlayerIsHuman) {
      console.log("Human player's turn:");
      await playerPromptLoop(board);
    } else {
      console.log("AI player's turn:");
      if (difficulty === "easy" || difficulty === "1") {
        aiMove(board);
      } else {
        const depth = await getInitialDepth(board);
        const move = bestMove(board, "O", depth);
        board[move.row][move.col] = "O";
      }
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

// Create readline interface for I/O
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to prompt the user for the difficulty level
const Start = () => {
  rl.question(
    "Please choose the difficulty level ( (1)easy, (2)hard ): ",
    (answer) => {
      const difficulty = answer.toLowerCase();

      if (["easy", "1"].includes(difficulty)) {
        rl.close();

        console.log(`You chose easy.`);
        game(difficulty);
      } else if (["hard", "2"].includes(difficulty)) {
        rl.close();
        console.log(`You chose hard.`);
        game(difficulty);
      } else {
        console.log('Invalid input. Please enter "easy", or "hard".');
        Start();
      }
    }
  );
};

Start();
