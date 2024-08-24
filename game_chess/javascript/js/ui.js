const initialBoardUI = (board) => {
  const chessboard = document.getElementById("chessboard");
  const boardFrag = document.createDocumentFragment();

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const square = document.createElement("div");
      square.className = `square ${(col + row) % 2 == 0 ? "white" : "black"}`;
      square.dataset.row = row;
      square.dataset.col = col;

      const span = document.createElement("span");
      span.className = "symbol";
      span.innerHTML = `${row} / ${col}`;

      const piece = board[row][col];
      if (piece) {
        const pieceColor = piece.color;
        const pieceName = piece.constructor.name;

        const img = document.createElement("img");
        img.src = `./images/${pieceColor}_${pieceName.toLowerCase()}.svg`;
        img.alt = `${pieceColor} ${pieceName}`;

        square.appendChild(img);
        square.piece = piece;
      }
      square.appendChild(span);
      boardFrag.appendChild(square);
    }
  }
  chessboard.appendChild(boardFrag);
}

export { initialBoardUI }