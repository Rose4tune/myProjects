document.addEventListener("DOMContentLoaded", function () {
  const chessboard = document.getElementById("chessboard");
  const boardFrag = document.createDocumentFragment();

  for (let i = 0; i < 64; i++) {
    const square = document.createElement("div");
    square.className = "square";

    const row = Math.floor(i / 8);
    const col = i % 8;

    if ((row + col) % 2 == 0) {
      square.classList.add("white");
    } else {
      square.classList.add("black");
    }

    const rank = 8 - Math.floor(i / 8);
    const file = String.fromCharCode(97 + (i % 8));

    square.setAttribute("name", `${file}${rank}`);
    boardFrag.appendChild(square);
  }

  chessboard.appendChild(boardFrag);
});
