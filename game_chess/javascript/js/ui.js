import { getPieceAt, movePiece } from "./board.js";
import { isCheck, isCheckmate } from "./rules.js";

let selectedPiece = null;
let selectedSquare = null;

const highlightMoves = (piece, board) => {
  const moves = piece.getValidMoves(board);
  
  moves.forEach(move => {
    document
      .querySelector(`.square[data-row='${move.row}'][data-col='${move.col}']`)
      .classList.add("highlight");
  });
}

const clearHighlights = () => {
  document.querySelectorAll(".square.highlight").forEach((square) => {
    square.classList.remove("highlight");
  });
};


const removeSelected = () => {
  const { row, col } = selectedSquare;
  document
    .querySelector(`.square[data-row='${row}'][data-col='${col}']`)
    .classList.remove("selected");
  selectedPiece = null;
  selectedSquare = null;
  clearHighlights();
};

const moveSelectedPiece = ({ row, col, img }, board, target) => {
  const targetPiece = getPieceAt({ row, col });
  const isValidMove = selectedPiece.isValidMove(row, col, board);
  const getValidMoves = selectedPiece.getValidMoves(board).length !== 0;

  if (targetPiece === selectedPiece) {
    removeSelected();

  } else if (isValidMove && getValidMoves) {
    if (target.firstChild.localName === "img") target.firstChild.remove();
    target.prepend(selectedSquare.img);
    movePiece(selectedPiece, row, col);

    if (isCheck(selectedPiece.color, board)) {
      alert("Check!");
    } else if (isCheckmate(selectedPiece.color, board)) {
      alert("Checkmate!!");
    }

    removeSelected();

  } else if (!isValidMove && targetPiece) {
    removeSelected();
    selectPiece({ row, col, img }, board);
    
  } else {
    removeSelected();
  }
};

const selectPiece = ({ row, col, img }, board) => {
  const piece = getPieceAt({ row, col });
  if (piece) {
    selectedPiece = piece;
    selectedSquare = { row, col, img };
    document
      .querySelector(`.square[data-col='${col}'][data-row='${row}']`)
      .classList.add("selected");
    highlightMoves(piece, board);
  }
};

const handleSquareClick = (event, board) => {
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);
  const img = event.target.firstChild;

  if (selectedPiece) {
    moveSelectedPiece({ row, col, img }, board, event.target);
  } else {
    selectPiece({ row, col, img }, board);
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