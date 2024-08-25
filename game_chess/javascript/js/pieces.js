class Piece {
  constructor(color, row, col) {
    this.color = color;
    this.row = row;
    this.col = col;
  }

  isValidMove(targetRow, targetCol, board) {
    throw new Error("This method should be implemented by subclasses");
  }
}

class King extends Piece {
  isValidMove(targetRow, targetCol, board) {
    const rowDiff = Math.abs(targetRow - this.row);
    const colDiff = Math.abs(targetCol - this.col);

    if(colDiff <= 1 && rowDiff <= 1) {
      return true
    }

    return false
  }
}

class Queen extends Piece {
  isValidMove(targetRow, targetCol, board) {
    const rowDiff = Math.abs(targetRow - this.row);
    const colDiff = Math.abs(targetCol - this.col);

    if (colDiff === 0 || rowDiff === 0 || colDiff === rowDiff) {
      return true;
    }


    return false
  }
}

class Rook extends Piece {
  isValidMove(targetRow, targetCol, board) {
    const rowDiff = Math.abs(targetRow - this.row);
    const colDiff = Math.abs(targetCol - this.col);

    if (colDiff === 0 || rowDiff === 0) {
      return true;
    }

    return false
  }
}

class Bishop extends Piece {
  isValidMove(targetRow, targetCol, board) {
    const rowDiff = Math.abs(targetRow - this.row);
    const colDiff = Math.abs(targetCol - this.col);

    if (colDiff === rowDiff) {
      return true;
    }

    return false
  }
}

class Knight extends Piece {
  isValidMove(targetRow, targetCol, board) {
    const rowDiff = Math.abs(targetRow - this.row);
    const colDiff = Math.abs(targetCol - this.col);

    return (
      (colDiff === 1 && rowDiff === 2) ||
      (colDiff === 2 && rowDiff === 1)
    );
  }
}

class Pawn extends Piece {
  isValidMove(targetRow, targetCol, board) {
    const direction = this.color === "white" ? -1 : 1;
    const startRow = this.color === "white" ? 6 : 1;
    const target = board[targetRow][targetCol]

    if (
      this.col === targetCol &&
      targetRow === this.row + direction &&
      !target
    ) {
      return true;
    }

    if (
      this.col === targetCol &&
      this.row === startRow &&
      targetRow === this.row + 2 * direction &&
      !board[this.row + direction][targetCol] &&
      !target
    ) {
      return true;
    }

    if (
      Math.abs(this.col - targetCol) === 1 &&
      targetRow === this.row + direction &&
      target
    ) {
      return true;
    }

    return false;
  }
}

export { King, Queen, Rook, Knight, Bishop, Pawn };
