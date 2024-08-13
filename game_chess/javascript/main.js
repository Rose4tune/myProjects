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
    const rank = cnt - Math.floor(i / cnt); // 행 숫자
    const file = String.fromCharCode(97 + (i % cnt)); // 열 알파벳
    const symbol = `${file}${rank}`;
    
    const square = document.createElement("div");
    square.className = `square ${(row + col) % 2 == 0 ? "white" : "black"}`;
    square.setAttribute("name", symbol);

    const span = document.createElement("span");
    span.className = "symbol";
    span.innerHTML = symbol;
    square.appendChild(span);

    const piece = initialBoardSetup[i];
    if (piece) {
      const img = document.createElement("img");
      const color = row > 2 ? "white" : "black";
      img.src = `/game_chess/javascript/images/${color}_${piece}.svg`;
      img.alt = piece;
      img.setAttribute("color", color);
      square.appendChild(img);
    }

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

          if (!targetSquare.hasChildNodes()) {
            targetSquare.appendChild(selectedPiece);
            removeSelected();

          } else {
            const selectedColor = selectedPiece.getAttribute("color");
            const targetColor = targetSquare.firstChild.getAttribute("color");

            if (selectedColor !== targetColor) {
              targetSquare.firstChild.remove();
              targetSquare.appendChild(selectedPiece);
              removeSelected();
            }
          }
        }
        
      } else if (square.hasChildNodes()) {
        selectedPiece = square.firstChild;
        selectedSquare = square;
        selectedSquare.classList.add("selected");
      }
    });

    boardFrag.appendChild(square);
  }

  chessboard.appendChild(boardFrag);
});