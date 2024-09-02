import { King, Queen, Rook, Knight, Bishop, Pawn } from "./pieces.js";

const board = Array.from({ length: 8 }, () => Array(8).fill(null));

const initialSetup = () => {
  const pieceSetup = [
    [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook],
    Array(8).fill(Pawn),
  ];

  for (let i = 0; i < 8; i++) {
    board[0][i] = new pieceSetup[0][i]("black", 0, i);
    board[1][i] = new pieceSetup[1][i]("black", 1, i);
    board[6][i] = new pieceSetup[1][i]("white", 6, i);
    board[7][i] = new pieceSetup[0][i]("white", 7, i);
  }
}

const getPieceAt = ({ row, col }) => board[row][col];

const movePiece = ({row:fromRow, col:fromCol}, toRow, toCol) => {
  board[toRow][toCol] = board[fromRow][fromCol];
  board[fromRow][fromCol] = null;
  board[toRow][toCol].row = toRow;
  board[toRow][toCol].col = toCol;
};

export {
  board,
  initialSetup,
  getPieceAt,
  movePiece
}