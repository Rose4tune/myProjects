import { King, Queen, Rook, Knight, Bishop, Pawn } from "./pieces.js";

const board = Array.from(Array(8), () => Array(8).fill(null));
  
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

const pieceSetup = (i, cnt, square) => {
  const row = Math.floor(i / cnt);
  const col = i % cnt;
  const rank = cnt - row; // 행 숫자
  const file = String.fromCharCode(97 + col); // 열 알파벳
  const color = row < 2 ? "black" : "white";
  const symbol = `${file}${col} / ${rank}${row}`;

  square.className = `square ${(col + row) % 2 == 0 ? "white" : "black"}`;
  square.dataset.col = col;
  square.dataset.row = row;

  const pieceType = initialBoardSetup[i];
  let piece = null;

  console.log(pieceType);
  if (pieceType) {
    switch (pieceType) {
      case "king": piece = new King(color, col, row); break;
      case "queen": piece = new Queen(color, col, row); break;
      case "rook": piece = new Rook(color, col, row); break;
      case "bishop": piece = new Bishop(color, col, row); break;
      case "knight": piece = new Knight(color, col, row); break;
      case "pawn": piece = new Pawn(color, col, row); break;
    }
    if (piece) {
      const img = document.createElement("img");
      img.src = `./images/${color}_${pieceType}.svg`;
      img.alt = pieceType;
      img.setAttribute("color", color);
      square.appendChild(img);
      square.piece = piece;
      board[row][col] = piece;
    }
  }

  const span = document.createElement("span");
  span.className = "symbol";
  span.innerHTML = symbol;
  square.appendChild(span);
}

export {
  board,
  initialBoardSetup,
  pieceSetup
}