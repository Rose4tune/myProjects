class Piece {
  constructor(color, col, row) {
    this.color = color;
    this.col = col;
    this.row = row;
  }

  isValidMove(targetCol, targetRow) {
    throw new Error("This method should be implemented by subclasses");
  }
}

class King extends Piece {
  isValidMove(targetCol, targetRow) {
    const colDiff = Math.abs(targetCol - this.col);
    const rowDiff = Math.abs(targetRow - this.row);

    return colDiff <= 1 && rowDiff <= 1;
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
      targetCol === this.col
    ) {
      return true;
    }

    // 한 칸 전진
    if (
      targetCol === this.col &&
      targetRow === this.row + direction &&
      !isPiece
    ) {
      return true;
    }

    // 대각선 공격
    if (
      targetRow === this.row + direction &&
      Math.abs(targetCol - this.col) === 1 &&
      !isSameColor
    ) {
      return true;
    }

    return false;
  }
}

export { King, Queen, Rook, Knight, Bishop, Pawn }
