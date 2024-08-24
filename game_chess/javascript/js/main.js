import { board, initialSetup } from "./board.js";
import { initialBoardUI } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  initialSetup();
  initialBoardUI(board);
})