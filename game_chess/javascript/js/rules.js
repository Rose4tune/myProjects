import { board, getPieceAt, movePiece } from "./board.js";
import { King, Queen, Rook, Knight, Bishop, Pawn } from "./pieces.js";

const isCheck = (kingColor, board) => {
  let kingPosition = null;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];

      if (
        piece &&
        piece.color === kingColor &&
        piece instanceof King
      ) {
        kingPosition = { row, col }
        break
      }
    }
  }
  
  console.log(kingPosition)
  
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];

        if (
          piece &&
          piece.color !== kingColor &&
          piece.isValidMove(kingPosition.col, kingPosition.row, board)
        ) {
          return true;
        }
    }
  }

  return false;
};

const isCheckmate = (kingColor, board) => {
  return false;
};

export { isCheck, isCheckmate };