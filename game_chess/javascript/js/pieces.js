class Piece {
  constructor(color, col, row) {
    this.color = color;
    this.col = col;
    this.row = row;
  }
}

class King extends Piece {}

class Queen extends Piece {}

class Rook extends Piece {}

class Bishop extends Piece {}

class Knight extends Piece {}

class Pawn extends Piece {}

export { King, Queen, Rook, Knight, Bishop, Pawn };
