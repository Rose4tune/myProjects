import { getPieceAt } from "./board.js";

let selectedPiece = null;
let selectedSquare = null;

const removeSelected = () => {
  const { row, col } = selectedSquare;
  document
    .querySelector(`.square[data-col='${col}'][data-row='${row}']`)
    .classList.remove("selected");
  selectedPiece = null;
  selectedSquare = null;
};

const moveSelectedPiece = (row, col, board) => {
  const targetPiece = getPieceAt({ row, col });

  if (targetPiece === selectedPiece) {
    removeSelected();
  }
};

const selectPiece = (row, col, board) => {
  const piece = getPieceAt({ row, col });
  if (piece) {
    selectedPiece = piece;
    selectedSquare = { col, row };
    document
      .querySelector(`.square[data-col='${col}'][data-row='${row}']`)
      .classList.add("selected");
  }
}

const handleSquareClick = (event, board) => {
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);

  if (selectedPiece) {
    moveSelectedPiece(row, col, board);
  } else {
    selectPiece(row, col, board);
  }
}

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

      const piece = getPieceAt({ row, col });
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
      square.addEventListener("click", (event) => handleSquareClick(event, board))
      boardFrag.appendChild(square);
    }
  }
  chessboard.appendChild(boardFrag);
}

export { initialBoardUI }