import readline from "readline";

import { printBoard } from "./game.js";

export function validateMove(board, row, col) {
  row = row - 1;
  col = col - 1;
  if (row < 0 || row > 2 || col < 0 || col > 2) {
    return false;
  }
  if (board[row][col] === " ") {
    return true;
  }
  return false;
}

export function promptPlayerMakeMove(board) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const prompt = () => {
    return new Promise((resolve) => {
      rl.question("Enter your move (e.g., 3 2): ", (answer) => {
        const input = answer.trim().match(/(\d+)\s+(\d+)/);
        if (input) {
          const [, row, column] = input.map(Number);
          resolve({ row, column });
        } else {
          console.log("Invalid input. Please use the format row column.");
          resolve(prompt()); // Call prompt again if input is invalid
        }
      });
    });
  };
  return prompt().finally(() => rl.close()); // Ensure readline interface is always closed after resolving
}

export async function playerPromptLoop(board, keepAsking = true) {
  while (keepAsking) {
    // Assume 'player' is the current player's mark ('X' or 'O')
    const move = await promptPlayerMakeMove(board);
    const { row, column } = move;

    if (validateMove(board, row, column)) {
      // Here you would typically validate the move and update the game state
      console.log(`Player chose row ${row}, column ${column}`);
      board[row - 1][column - 1] = "X";
      keepAsking = false;
    } else {
      // Handle invalid input or re-prompt for move
      console.log("Invalid move. Please try again.");
    }
  }
}