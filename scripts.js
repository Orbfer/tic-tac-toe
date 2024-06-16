const gameBoard = document.querySelector(".gameboard");
const cells = document.querySelectorAll(".cell");
const statusDisplay = document.querySelector(".status");
const restartBtn = document.querySelector(".restart");
const resetScoreBtn = document.querySelector(".reset-score");
const xCounterDisplay = document.querySelector(".counter-x");
const oCounterDisplay = document.querySelector(".counter-o");

let counterX = 0;
let counterO = 0;
let scorePopUp = null;

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
  resetScoreBtn.addEventListener("click", resetScore);
  statusDisplay.textContent = `${currentPlayer}'s turn`;
  gameRunning = true;
}

function cellClicked() {
  const cellPosition = this.getAttribute("cellPosition");
  if (boardScore[cellPosition] !== "" || !gameRunning) {
    return;
  }
  this.textContent = currentPlayer;
  boardScore[cellPosition] = currentPlayer;
  checkResult();
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `${currentPlayer}'s turn`;
}

function checkResult() {
  for (let i = 0; i < winOptions.length; i++) {
    const [a, b, c] = winOptions[i];
    if (
      boardScore[a] &&
      boardScore[a] === boardScore[b] &&
      boardScore[a] === boardScore[c]
    ) {
      statusDisplay.textContent = "";
      popUpWin(boardScore[a]);
      if (currentPlayer === "X") {
        counterX++;
        xCounterDisplay.textContent = `X - ${counterX}`;
      } else {
        counterO++;
        oCounterDisplay.textContent = `O - ${counterO}`;
      }
      gameRunning = false;
      return;
    }
  }
  if (!boardScore.includes("")) {
    popUpDraw();
    gameRunning = false;
    return;
  }
  changePlayer();
}

function restartGame() {
  boardScore = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameRunning = true;
  statusDisplay.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  if (scorePopUp) {
    scorePopUp.remove();
    scorePopUp = null;
  }
}

function resetScore() {
  counterX = 0;
  counterO = 0;
  xCounterDisplay.textContent = `X - ${counterX}`;
  oCounterDisplay.textContent = `O - ${counterO}`;
}

function popUpWin(player) {
  if (scorePopUp) {
    scorePopUp.remove();
  }
  scorePopUp = document.createElement("div");
  scorePopUp.classList.add("pop-up");
  scorePopUp.addEventListener("click", restartGame);
  scorePopUp.innerText = `${player} Has Won!`;
  gameBoard.appendChild(scorePopUp);
}
function popUpDraw() {
  if (scorePopUp) {
    scorePopUp.remove();
  }
  scorePopUp = document.createElement("div");
  scorePopUp.classList.add("pop-up");
  scorePopUp.addEventListener("click", restartGame);
  scorePopUp.innerText = "It's a Draw!";
  gameBoard.appendChild(scorePopUp);
}
