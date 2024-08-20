import { King, Queen, Rook, Knight, Bishop, Pawn } from './pieces.js'

const cnt = 8;
const highlightSquares = [];

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
  const board = Array.from(Array(8), () => Array(8).fill(null));

  for (let i = 0; i < Math.pow(cnt, 2); i++) {
    const row = Math.floor(i / cnt);
    const col = i % cnt;
    const rank = cnt - row; // 행 숫자
    const file = String.fromCharCode(97 + col); // 열 알파벳
    const color = row < 2 ? "black" : "white";
    const symbol = `${file}${col} / ${rank}${row}`;

    const square = document.createElement("div");
    square.className = `square ${(col + row) % 2 == 0 ? "white" : "black"}`;
    square.dataset.col = col;
    square.dataset.row = row;

    const pieceType = initialBoardSetup[i];
    let piece = null;

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
        img.src = `/game_chess/javascript/images/${color}_${pieceType}.svg`;
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

    const removeSelected = () => {
      selectedSquare.classList.remove("selected");
      selectedPiece = null;
      selectedSquare = null;
      clearHightlightMoves();
    };

    const movePiece = (targetSquare, targetCol, targetRow) => {
      targetSquare.prepend(selectedSquare.firstChild);
      targetSquare.piece = selectedPiece;
      targetSquare.col = targetCol;
      targetSquare.row = targetRow;
      selectedSquare.piece = null;

      board[selectedPiece.row][selectedPiece.col] = null;
      board[targetRow][targetCol] = selectedPiece;
    };

    const clearHightlightMoves = () => {
      highlightSquares.forEach((square) => {
        square.classList.remove("highlight");
      });
      highlightSquares.length = 0;
    };

    const highlightValidMoves = (moves) => {
      moves.forEach((move) => {
        const targetSquare = document.querySelector(
          `.square[data-col='${move.col}'][data-row='${move.row}']`
        );
        if (targetSquare) {
          targetSquare.classList.add('highlight');
          highlightSquares.push(targetSquare)
        }
      })
    }

    square.addEventListener("click", function () {
      if (selectedPiece) {
        if (selectedSquare === square) {
          removeSelected();

        } else {
          const targetSquare = square;
          const targetPiece = targetSquare.piece;
          const targetCol = parseInt(square.dataset.col);
          const targetRow = parseInt(square.dataset.row);
          const isSameColor = targetPiece && targetSquare.piece.color === selectedPiece.color;
          const isValidMove = selectedPiece.isValidMove({targetCol, targetRow, targetPiece, isSameColor, board});

          if (isValidMove) {
            if (targetPiece) {
              if (isSameColor) return;
              else targetSquare.firstChild.remove();
            }
            movePiece(targetSquare, targetCol, targetRow);
            removeSelected();
          }
        }
        
      } else if (square.piece) {
        selectedPiece = square.piece;
        selectedSquare = square;
        selectedSquare.classList.add("selected");
        highlightValidMoves(selectedPiece.getValidMoves(board));
      }
    });

    boardFrag.appendChild(square);
  }

  chessboard.appendChild(boardFrag);
});