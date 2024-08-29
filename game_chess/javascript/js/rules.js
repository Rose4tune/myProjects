import { board, getPieceAt, movePiece } from "./board.js";
import { King, Queen, Rook, Knight, Bishop, Pawn } from "./pieces.js";

const isCheck = (selectedColor, board) => {
  let kingPosition = null;

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];

      if (
        piece?.color !== selectedColor &&
        piece instanceof King
      ) {
        kingPosition = { row, col }
        break
      }
    }
  }

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (
        piece &&
        piece.color === selectedColor &&
        piece.isValidMove(kingPosition.row, kingPosition.col, board)
      ) {
        return true;
      }
    }
  }

  return false;
};

const isCheckmate = (selectedColor, board) => {
  if (!isCheck(selectedColor, board)) return false;

  const kingColor = selectedColor === 'white' ? 'black' : 'white';

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      
      if (piece && piece.color === kingColor) {
        for (let targetRow = 0; targetRow < 8; targetRow++) {
          for (let targetCol = 0; targetCol < 8; targetCol++) {
            const originalPiece = board[targetRow][targetCol];

            if (piece.isValidMove(targetRow, targetCol, board)) {
              movePiece({row, col}, targetRow, targetCol);
              const checkAfterMove = isCheck(selectedColor, board);
              board[row][col] = piece;
              board[targetRow][targetCol] = originalPiece;
              piece.row = row;
              piece.col = col;

              if (!checkAfterMove) return true;
            }
          }
        }
      }
    }
  }

  return false;
};

export { isCheck, isCheckmate };