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
    return true
  }
}

class Queen extends Piece {
  isValidMove(targetRow, targetCol, board) {
    return true
  }
}

class Rook extends Piece {
  isValidMove(targetRow, targetCol, board) {
    return true
  }
}

class Bishop extends Piece {
  isValidMove(targetRow, targetCol, board) {
    return true
  }
}

class Knight extends Piece {
  isValidMove(targetRow, targetCol, board) {
    return true
  }
}

class Pawn extends Piece {
  isValidMove(targetRow, targetCol, board) {
    return true
  }
}

export { King, Queen, Rook, Knight, Bishop, Pawn };
