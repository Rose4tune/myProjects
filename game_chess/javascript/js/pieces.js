class Piece {
  constructor(color, row, col) {
    this.color = color;
    this.row = row;
    this.col = col;
    this.possibleMoves = [];
  }

  isValidMove(targetRow, targetCol, board) {
    throw new Error("This method should be implemented by subclasses");
  }

  // // 가상 이동 후 체크 상태 확인을 위한 메서드
  // simulateMove(board, fromCol, fromRow, toCol, toRow) {
  //   const originalPiece = board[toRow][toCol];
  //   movePiece(fromCol, fromRow, toCol, toRow); // 가상으로 이동

  //   const kingInCheck = isKingInCheck(this.color, board);

  //   // 원래 위치로 복원
  //   board[fromRow][fromCol] = this;
  //   board[toRow][toCol] = originalPiece;

  //   return kingInCheck;
  // }

  // // 이동 가능한 위치를 반환하는 메서드 (변경된 부분)
  // getValidMoves(board) {
  //   const validMoves = [];

  //   for (let row = 0; row < 8; row++) {
  //     for (let col = 0; col < 8; col++) {
  //       if (
  //         this.isValidMove(col, row, board) &&
  //         !this.simulateMove(board, this.col, this.row, col, row)
  //       ) {
  //         validMoves.push({ col, row });
  //       }
  //     }
  //   }

  //   return validMoves;
  // }

  isSameColor(targetRow, targetCol, board) {
    const color = board[targetRow][targetCol]?.color;
    return board[this.row][this.col].color === color;
  }

  isPathClear(targetCol, targetRow, board) {
    const colDiff = targetCol - this.col;
    const rowDiff = targetRow - this.row;
    const colStep = colDiff !== 0 ? colDiff / Math.abs(colDiff) : 0;
    const rowStep = rowDiff !== 0 ? rowDiff / Math.abs(rowDiff) : 0;

    let col = this.col + colStep;
    let row = this.row + rowStep;

    while (col !== targetCol || row !== targetRow) {
      if (board[row][col]) {
        return false;
      }
      col += colStep;
      row += rowStep;
    }

    if (!this.isSameColor(targetRow, targetCol, board)) return true;
  }

  findPossibleMoves = (targetRow, targetCol, board) => {
    const move = this.possibleMoves.find(
      (move) =>
        move.row === targetRow &&
        move.col === targetCol &&
        !this.isSameColor(targetRow, targetCol, board)
    );
    this.possibleMoves = [];

    return move;
  };
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
      (colDiff === 0 || rowDiff === 0 || colDiff === rowDiff) &&
      this.isPathClear(targetCol, targetRow, board)
    );
  }
}

class Rook extends Piece {
  isValidMove(targetRow, targetCol, board) {
    const colDiff = Math.abs(targetCol - this.col);
    const rowDiff = Math.abs(targetRow - this.row);

    return (
      (colDiff === 0 || rowDiff === 0) &&
      this.isPathClear(targetCol, targetRow, board)
    );
  }
}

class Bishop extends Piece {
  isValidMove(targetRow, targetCol, board) {
    const colDiff = Math.abs(targetCol - this.col);
    const rowDiff = Math.abs(targetRow - this.row);

    return (
      colDiff === rowDiff &&
      this.isPathClear(targetCol, targetRow, board)
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
    const target = board[targetRow][targetCol];

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
