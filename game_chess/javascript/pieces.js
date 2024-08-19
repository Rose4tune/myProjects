class Piece {
  constructor(color, col, row) {
    this.color = color;
    this.col = col;
    this.row = row;
  }

  isValidMove(targetCol, targetRow) {
    throw new Error("This method should be implemented by subclasses");
  }
  
  getValidMoves(board) {
    const validMoves = [];

    for (let col = 0; col < 8; col++) {
      for (let row = 0; row < 8; row++) {
        const targetPiece = board[row][col]
        const isSameColor = targetPiece && targetPiece.color === this.color;

        if (
          this.isValidMove(col, row, targetPiece, isSameColor) &&
          !isSameColor
        ) {
          validMoves.push({ col, row });
        }
      }
    }

    return validMoves;
  }
}

class King extends Piece {
  isValidMove(targetCol, targetRow) {
    const colDiff = Math.abs(targetCol - this.col);
    const rowDiff = Math.abs(targetRow - this.row);

    return colDiff <= 1 && rowDiff <= 1 && !(colDiff == 0 && rowDiff == 0);
  }
}

class Queen extends Piece {
  isValidMove(targetCol, targetRow) {
    const colDiff = Math.abs(targetCol - this.col);
    const rowDiff = Math.abs(targetRow - this.row);
    return rowDiff === colDiff || rowDiff === 0 || colDiff === 0;
  }
}

class Rook extends Piece {
  isValidMove(targetCol, targetRow) {
    const colDiff = Math.abs(targetCol - this.col);
    const rowDiff = Math.abs(targetRow - this.row);
    return rowDiff === 0 || colDiff === 0;
  }
}

class Bishop extends Piece {
  isValidMove(targetCol, targetRow) {
    const colDiff = Math.abs(targetCol - this.col);
    const rowDiff = Math.abs(targetRow - this.row);
    return rowDiff === colDiff;
  }
}

class Knight extends Piece {
  isValidMove(targetCol, targetRow) {
    const colDiff = Math.abs(targetCol - this.col);
    const rowDiff = Math.abs(targetRow - this.row);
    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
  }
}

class Pawn extends Piece {
  isValidMove(targetCol, targetRow, isPiece, isSameColor) {
    const direction = this.color === "white" ? -1 : 1; // 백은 위로, 흑은 아래로
    const startRow = this.color === "white" ? 6 : 1;

      // 처음 두 칸 이동 가능
      if (
        this.row === startRow &&
        targetRow === this.row + 2 * direction &&
        targetCol === this.col &&
        !isPiece
      ) {
        return true;
      }
  
      // 한 칸 전진
      if (
        targetCol === this.col &&
        targetRow === this.row + direction
        && !isPiece
      ) {
        return true;
      }
      
      // 대각선 공격
      if (
        targetRow === this.row + direction &&
        Math.abs(targetCol - this.col) === 1
        && isPiece && !isSameColor
      ) {
        return true;
      }
      
    return false;
  }
}

export { King, Queen, Rook, Knight, Bishop, Pawn }
