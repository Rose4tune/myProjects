const cnt = 8;

document.addEventListener("DOMContentLoaded", function () {
  const chessboard = document.getElementById("chessboard");
  const boardFrag = document.createDocumentFragment();

  for (let i = 0; i < Math.pow(cnt, 2); i++) {
    const square = document.createElement("div");
    square.className = "square";

    const row = Math.floor(i / cnt);
    const col = i % cnt;

    if ((row + col) % 2 == 0) {
      square.classList.add("white");
    } else {
      square.classList.add("black");
    }

    const rank = cnt - Math.floor(i / cnt);
    const file = String.fromCharCode(97 + (i % cnt));

    square.setAttribute("name", `${file}${rank}`);
    boardFrag.appendChild(square);
  }
  chessboard.appendChild(boardFrag);
});
