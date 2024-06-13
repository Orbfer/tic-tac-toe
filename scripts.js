const cells = document.querySelectorAll(".cell");
const statusDisplay = document.querySelector(".status");
const restartBtn = document.querySelector(".restart");
const winOptions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let boardScore = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameRunning = false;
startGame();
function startGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  statusDisplay.textContent = `${currentPlayer}'s turn`;
  gameRunning = true;
}
function cellClicked() {
  const cellPosition = this.getAttribute("cellPosition");
  if (boardScore[cellPosition] != "" || !gameRunning) {
    return;
  }
  this.textContent = currentPlayer;
  boardScore[cellPosition] = currentPlayer;
  changePlayer();
  checkResult();
}
function changePlayer() {
  if (currentPlayer == "X") {
    currentPlayer = "O";
    statusDisplay.textContent = `${currentPlayer}'s turn`;
  } else {
    currentPlayer = "X";
    statusDisplay.textContent = `${currentPlayer}'s turn`;
  }
}
function checkResult() {
  let gameWon = false;
  for (let i = 0; i < winOptions.length; i++) {
    const option = winOptions[i];
    const cellOne = boardScore[option[0]];
    const cellTwo = boardScore[option[1]];
    const cellThree = boardScore[option[2]];
    if (cellOne == "" || cellTwo == "" || cellThree == "") {
      continue;
    }
    if ((cellOne == cellTwo) & (cellTwo == cellThree)) {
      statusDisplay.textContent = `${currentPlayer} Won!`;
      gameRunning = false;
      break;
    }
  }
}
function restartGame() {}
