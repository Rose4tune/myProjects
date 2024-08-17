const cnt = 8;

document.addEventListener("DOMContentLoaded", function () {
  const chessboard = document.getElementById("chessboard");
  const boardFrag = document.createDocumentFragment();
 
  const initialBoardSetup = [
    'rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook',
    'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn',
    'rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook',
  ]

  let selectedPiece = null;
  let selectedSquare = null;

  for (let i = 0; i < Math.pow(cnt, 2); i++) {
    const row = Math.floor(i / cnt);
    const col = i % cnt;
    const rank = cnt - row; // 행 숫자
    const file = String.fromCharCode(97 + col); // 열 알파벳
    const color = row < 2 ? "black" : "white";
    const symbol = `${file}${col} / ${rank}${row}`;

    const square = document.createElement("div");
    square.className = `square ${(row + col) % 2 == 0 ? "white" : "black"}`;
    square.dataset.row = row;
    square.dataset.col = col;

    const pieceType = initialBoardSetup[i];
    let piece = null;

    if (pieceType) {
      switch (pieceType) {
        case "king": piece = new King(color, row, col); break;
        case "queen": piece = new Queen(color, row, col); break;
        case "rook": piece = new Rook(color, row, col); break;
        case "bishop": piece = new Bishop(color, row, col); break;
        case "knight": piece = new Knight(color, row, col); break;
        case "pawn": piece = new Pawn(color, row, col); break;
      }
      if (piece) {
        const img = document.createElement("img");
        img.src = `/game_chess/javascript/images/${color}_${pieceType}.svg`;
        img.alt = pieceType;
        img.setAttribute("color", color);
        square.appendChild(img);
        square.piece = piece;
      }
    }

    const span = document.createElement("span");
    span.className = "symbol";
    span.innerHTML = symbol;
    square.appendChild(span);

    const removeSelected = () => {
      selectedSquare.classList.remove("selected");
      selectedPiece = null;
      selectedSquare = null;
    };

    square.addEventListener("click", function () {
      if (selectedPiece) {
        if (selectedSquare === square) {
          removeSelected();

        } else {
          const targetSquare = square;
          const targetRow = parseInt(square.dataset.row);
          const targetCol = parseInt(square.dataset.col);

          const isValidMove = selectedPiece.isValidMove(targetRow, targetCol);

          if (!targetSquare.piece && isValidMove) {
            targetSquare.prepend(selectedSquare.firstChild);
            targetSquare.piece = selectedPiece;
            targetSquare.piece.row = targetRow;
            targetSquare.piece.col = targetCol;
            selectedSquare.piece = null;

            removeSelected();
          } else {
            removeSelected();
          }
        }
      } else if (square.piece) {
        selectedPiece = square.piece;
        selectedSquare = square;
        selectedSquare.classList.add("selected");
      }
    });

    boardFrag.appendChild(square);
  }

  chessboard.appendChild(boardFrag);
});


const movePiece = ({targetSquare, selectedSquare}) => {
  const targetName = targetSquare.getAttribute("name");
  const selectedName = selectedSquare.getAttribute("name");

  return new Pawn("white", selectedName).isValidMove(targetName);
};