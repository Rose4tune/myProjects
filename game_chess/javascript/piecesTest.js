// scripts/pieces.js

class Piece {
  constructor(color, type, position) {
    this.color = color;
    this.type = type;
    this.position = position;
  }

  isValidMove(targetPosition, board) {
    throw new Error("This method should be implemented by subclasses");
  }

  isSamePosition(pos1, pos2) {
    return pos1.row === pos2.row && pos1.col === pos2.col;
  }
}

class King extends Piece {
  isValidMove(targetPosition, board) {
    const rowDiff = Math.abs(targetPosition.row - this.position.row);
    const colDiff = Math.abs(targetPosition.col - this.position.col);
    return rowDiff <= 1 && colDiff <= 1; // 한 칸 이동만 가능
  }
}

class Queen extends Piece {
  isValidMove(targetPosition, board) {
    const rowDiff = Math.abs(targetPosition.row - this.position.row);
    const colDiff = Math.abs(targetPosition.col - this.position.col);
    return rowDiff === colDiff || rowDiff === 0 || colDiff === 0; // 상하좌우 및 대각선 이동 가능
  }
}

class Rook extends Piece {
  isValidMove(targetPosition, board) {
    const rowDiff = Math.abs(targetPosition.row - this.position.row);
    const colDiff = Math.abs(targetPosition.col - this.position.col);
    return rowDiff === 0 || colDiff === 0; // 상하좌우로만 이동 가능
  }
}

class Bishop extends Piece {
  isValidMove(targetPosition, board) {
    const rowDiff = Math.abs(targetPosition.row - this.position.row);
    const colDiff = Math.abs(targetPosition.col - this.position.col);
    return rowDiff === colDiff; // 대각선으로만 이동 가능
  }
}

class Knight extends Piece {
  isValidMove(targetPosition, board) {
    const rowDiff = Math.abs(targetPosition.row - this.position.row);
    const colDiff = Math.abs(targetPosition.col - this.position.col);
    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2); // L자 형태로 이동 가능
  }
}

class Pawn extends Piece {
  isValidMove(targetPosition, board) {
    const direction = this.color === "white" ? -1 : 1; // 백은 위로, 흑은 아래로
    const startRow = this.color === "white" ? 6 : 1;

    // 처음 두 칸 이동 가능
    if (
      this.position.row === startRow &&
      targetPosition.row === this.position.row + 2 * direction &&
      targetPosition.col === this.position.col
    ) {
      return true;
    }

    // 한 칸 전진
    if (
      targetPosition.row === this.position.row + direction &&
      targetPosition.col === this.position.col
    ) {
      return true;
    }

    // 대각선 공격
    if (
      targetPosition.row === this.position.row + direction &&
      Math.abs(targetPosition.col - this.position.col) === 1
    ) {
      return true;
    }

    return false;
  }
}

// export { King, Queen, Rook, Knight, Bishop, Pawn }
