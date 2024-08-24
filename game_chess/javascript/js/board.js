import { King, Queen, Rook, Knight, Bishop, Pawn } from "./pieces.js";

const board = Array.from({ length: 8 }, () => Array(8).fill(null));

const initialSetup = () => {
  const pieceSetup = [
    [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook],
    Array(8).fill(Pawn),
  ];

  for (let i = 0; i < 8; i++) {
    board[0][i] = new pieceSetup[0][i]("black", i, 0);
    board[1][i] = new pieceSetup[1][i]("black", i, 1);
    board[6][i] = new pieceSetup[1][i]("white", i, 6);
    board[7][i] = new pieceSetup[0][i]("white", i, 7);
  }
}

export {
  board,
  initialSetup
}