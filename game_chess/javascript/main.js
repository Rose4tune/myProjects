const cnt = 8;

document.addEventListener("DOMContentLoaded", function () {
  const chessboard = document.getElementById("chessboard");
  const boardFrag = document.createDocumentFragment();

  for (let i = 0; i < Math.pow(cnt, 2); i++) {
    const square = document.createElement("div");
    square.className = `square ${calBoardColor(i)}`;
    square.setAttribute("name", calSquareSymbol(i));
    boardFrag.appendChild(square);
  }

  chessboard.appendChild(boardFrag);
});

const calBoardColor = (i) => {
  const row = Math.floor(i / cnt);
  const col = i % cnt;

  if ((row + col) % 2 == 0) return "white";
  else return "black";
};

const calSquareSymbol = (i) => {
  const rank = cnt - Math.floor(i / cnt);
  const file = String.fromCharCode(97 + (i % cnt));

  return `${file}${rank}`;
};
