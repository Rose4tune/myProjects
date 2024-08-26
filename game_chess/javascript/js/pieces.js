class Piece {
  constructor(color, row, col) {
    this.color = color;
    this.row = row;
    this.col = col;
  }

  isValidMove(targetRow, targetCol, board) {
    throw new Error("This method should be implemented by subclasses");
  }

  isSameColor(targetRow, targetCol, board) {
    const color = board[targetRow][targetCol]?.color;
    return board[this.row][this.col].color === color
  }
}

class King extends Piece {
  isValidMove(targetRow, targetCol, board) {
    const rowDiff = Math.abs(targetRow - this.row);
    const colDiff = Math.abs(targetCol - this.col);

    return (
      !(colDiff === 0 && rowDiff === 0) &&
      colDiff <= 1 && rowDiff <= 1 &&
      !this.isSameColor(targetRow, targetCol, board)
    );
  }
}

class Queen extends Piece {
  isValidMove(targetRow, targetCol, board) {
    const rowDiff = Math.abs(targetRow - this.row);
    const colDiff = Math.abs(targetCol - this.col);

    return (
      !(colDiff == 0 && rowDiff == 0) &&
      (colDiff === 0 || rowDiff === 0 || colDiff === rowDiff) &&
      !this.isSameColor(targetRow, targetCol, board)
    );
  }
}

class Rook extends Piece {
  isValidMove(targetRow, targetCol, board) {
    const possibleMoves = [];

    for (let row = 0; row < 8; row++) {
      if (row !== this.row) possibleMoves.push({ row, col: this.col });
    }

    for (let col = 0; col < 8; col++) {
      if (col !== this.col) possibleMoves.push({ row: this.row, col });
    }

    const move = possibleMoves.find(
      (move) =>
        move.row === targetRow &&
        move.col === targetCol &&
        !this.isSameColor(targetRow, targetCol, board)
    );
    if (!move) return false;

    if (move.row === this.row) {
      const step = move.col > this.col ? 1 : -1;
      for (let col = this.col + step; col !== targetCol; col += step) {
        if (board[this.row][col]) return false;
      }
    } else {
      const step = move.row > this.row ? 1 : -1;
      for (let row = this.row + step; row !== targetRow; row += step) {
        if (board[row][this.col]) return false;
      }
    }

    return true;
  }
}

class Bishop extends Piece {
  isValidMove(targetRow, targetCol, board) {
    const rowDiff = Math.abs(targetRow - this.row);
    const colDiff = Math.abs(targetCol - this.col);

    return (
      !(colDiff == 0 && rowDiff == 0) &&
      colDiff === rowDiff &&
      !this.isSameColor(targetRow, targetCol, board)
    );
  }
}

class Knight extends Piece {
  isValidMove(targetRow, targetCol, board) {
    const rowDiff = Math.abs(targetRow - this.row);
    const colDiff = Math.abs(targetCol - this.col);

    return (
      ((colDiff === 1 && rowDiff === 2) || (colDiff === 2 && rowDiff === 1)) &&
      !this.isSameColor(targetRow, targetCol, board)
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
      !target
    ) {
      return true;
    }

    if (
      Math.abs(this.col - targetCol) === 1 &&
      targetRow === this.row + direction &&
      target &&
      !this.isSameColor(targetRow, targetCol, board)
    ) {
      return true;
    }

    return false;
  }
}

export { King, Queen, Rook, Knight, Bishop, Pawn };
