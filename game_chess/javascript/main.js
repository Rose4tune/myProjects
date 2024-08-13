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

  for (let i = 0; i < Math.pow(cnt, 2); i++) {
    const row = Math.floor(i / cnt);
    const col = i % cnt;
    const rank = cnt - Math.floor(i / cnt); // 행 숫자
    const file = String.fromCharCode(97 + (i % cnt)); // 열 알파벳
    
    const square = document.createElement("div");
    square.className = `square ${(row + col) % 2 == 0 ? 'white' : 'black'}`;
    square.setAttribute("name", `${file}${rank}`);

    const piece = initialBoardSetup[i];
    if (piece) {
      const img = document.createElement("img");
      img.src = `/game_chess/javascript/images/${row < 2 ? 'white' : 'black'}_${piece}.svg`;
      img.alt = piece;
      square.appendChild(img);
    }

    boardFrag.appendChild(square);
  }

  chessboard.appendChild(boardFrag);
});
