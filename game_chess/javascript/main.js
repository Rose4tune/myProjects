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
    
    const square = document.createElement("div");
    square.className = `square ${calBoardColor(row, col)}`;
    square.setAttribute("name", calSquareSymbol(i));

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

const calBoardColor = (row, col) => {
  if ((row + col) % 2 == 0) return "white";
  else return "black";
};

const calSquareSymbol = (i) => {
  const rank = cnt - Math.floor(i / cnt);
  const file = String.fromCharCode(97 + (i % cnt));

  return `${file}${rank}`;
};
