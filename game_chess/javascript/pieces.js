class Piece {
  constructor(color, position) {
    this.color = color;
    this.row = position[0];
    this.col = position[1];
  }

  isValidMove(targetPosition, board) {
    throw new Error("This method should be implemented by subclasses");
  }
}

class Pawn extends Piece {
  isValidMove(targetPosition, board) {
    const direction = this.color === "white" ? -1 : 1; // 백은 위로, 흑은 아래로
    const startRow = this.color === "white" ? 6 : 1;

    // 처음 두 칸 이동 가능
    if (
      this.row === startRow &&
      targetPosition[0] === this.row + 2 * direction &&
      targetPosition[1] === this.col
    ) {
      return true;
    }

    // 한 칸 전진
    if (
      targetPosition[0] === this.row + direction &&
      targetPosition[1] === this.col
    ) {
      return true;
    }

    // 대각선 공격
    if (
      targetPosition[0] === this.row + direction &&
      Math.abs(targetPosition[1] - this.col) === 1
    ) {
      return true;
    }

    return false;
  }
}