const gameBoard = document.querySelector(".gameboard");
const cells = document.querySelectorAll(".cell");
const resetScoreBtn = document.querySelector(".reset");
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
  cells.forEach((cell) => cell.addEventListener("mouseover", showOption));
  resetScoreBtn.addEventListener("click", resetScore);
  gameRunning = true;
}
function cellClicked() {
  const cellPosition = this.getAttribute("cellPosition");
  if (boardScore[cellPosition] !== "" || !gameRunning) {
    return;
  }
  this.removeEventListener("mouseleave", cellClear);
  this.textContent = currentPlayer;
  this.style.color = "#a91d3a";
  boardScore[cellPosition] = currentPlayer;
  checkResult();
}
function showOption() {
  const cellPosition = this.getAttribute("cellPosition");
  if (boardScore[cellPosition] !== "" || !gameRunning) {
    return;
  }
  this.textContent = currentPlayer;
  this.style.color = "#a91d399e";
  this.addEventListener("mouseleave", cellClear);
}
function cellClear() {
  this.textContent = "";
}
function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkResult() {
  for (let i = 0; i < winOptions.length; i++) {
    const [a, b, c] = winOptions[i];
    if (
      boardScore[a] &&
      boardScore[a] === boardScore[b] &&
      boardScore[a] === boardScore[c]
    ) {
      popUpWin(boardScore[a]);
      if (currentPlayer === "X") {
        counterX++;
        xCounterDisplay.textContent = `${counterX}`;
      } else {
        counterO++;
        oCounterDisplay.textContent = `${counterO}`;
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
  cells.forEach((cell) => (cell.textContent = ""));
  if (scorePopUp) {
    scorePopUp.remove();
    scorePopUp = null;
  }
}

function resetScore() {
  counterX = 0;
  counterO = 0;
  xCounterDisplay.textContent = `${counterX}`;
  oCounterDisplay.textContent = `${counterO}`;
}

function popUpWin(player) {
  if (scorePopUp) {
    scorePopUp.remove();
  }
  scorePopUp = document.createElement("div");
  scorePopUp.classList.add("pop-up");
  scorePopUp.classList.add("animate__animated");
  scorePopUp.classList.add("animate__fadeIn");
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
  scorePopUp.classList.add("animate__animated");
  scorePopUp.classList.add("animate__fadeIn");
  scorePopUp.addEventListener("click", restartGame);
  scorePopUp.innerText = "It's a Draw!";
  gameBoard.appendChild(scorePopUp);
}
