document.addEventListener("DOMContentLoaded", function () {
  const chessboard = document.getElementById("chessboard");

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
    chessboard.appendChild(square);
  }
});
