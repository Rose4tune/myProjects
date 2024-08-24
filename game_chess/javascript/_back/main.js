import { board, pieceSetup } from "./board.js";

const cnt = 8;
const highlightSquares = [];

document.addEventListener("DOMContentLoaded", function () {
  const chessboard = document.getElementById("chessboard");
  const boardFrag = document.createDocumentFragment();
 
  let selectedPiece = null;
  let selectedSquare = null;

  for (let i = 0; i < Math.pow(cnt, 2); i++) {
    const square = document.createElement("div");

    pieceSetup(i, cnt, square);

    const removeSelected = () => {
      selectedSquare.classList.remove("selected");
      selectedSquare.piece = null;
      selectedPiece = null;
      selectedSquare = null;
      clearHightlightMoves();
    };

    const movePiece = (targetSquare, targetCol, targetRow) => {
      targetSquare.prepend(selectedSquare.firstChild);
      
      board[selectedPiece.row][selectedPiece.col] = null;
      board[targetRow][targetCol] = selectedPiece;

      selectedPiece.col = targetCol;
      selectedPiece.row = targetRow;
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
          const isValidMove = selectedPiece.isValidMove(targetCol, targetRow, targetPiece, isSameColor);

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