class Piece {
  constructor(color, row, col) {
    this.color = color;
    this.row = row;
    this.col = col;
  }

  isValidMove(row, col) {
    throw new Error("This method should be implemented by subclasses");
  }
}

class King extends Piece {
  isValidMove(row, col) {
    return true;
  }
}

class Queen extends Piece {
  isValidMove(row, col) {
    return true;
  }
}

class Rook extends Piece {
  isValidMove(row, col) {
    return true;
  }
}

class Bishop extends Piece {
  isValidMove(row, col) {
    return true
  }
}

class Knight extends Piece {
  isValidMove(row, col) {
    return true;
  }
}

class Pawn extends Piece {
  isValidMove(row, col) {
    const direction = this.color === "white" ? -1 : 1; // 백은 위로, 흑은 아래로
    const startRow = this.color === "white" ? 6 : 1;
    const targetRow = row;
    const targetCol = col;
    
    // 처음 두 칸 이동 가능
    if (
      this.row === startRow &&
      targetRow === this.row + (2 * direction) &&
      targetCol === this.col
    ) {
      return true;
    }

    // 한 칸 전진
    if (targetRow === this.row + direction && targetCol === this.col) {
      return true;
    }

    // 대각선 공격
    if (
      targetCol === this.row + direction &&
      Math.abs(targetRow - this.col) === 1
    ) {
      return true;
    }

    return false;
  }
}