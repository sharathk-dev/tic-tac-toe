const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

const Game = (() => {
  let boardArr = Array(9).fill("");
  let currentPlayer = "X";
  let active = true;
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  const isActive = active;
  const setActive = (val) => {
    active = val;
  };
  const getCurrentPlayer = () => currentPlayer;
  const switchCurrentPlayer = () => {
    currentPlayer = currentPlayer == "X" ? "O" : "X";
  };

  const render = () => {
    board.innerHTML = "";
    boardArr.forEach((cell, index) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.dataset.index = index;
      cellDiv.textContent = cell;
      board.append(cellDiv);
    });
  };

  const checkWin = () =>
    winningCombinations.find(
      ([a, b, c]) => boardArr[a] && boardArr[a] == boardArr[b] && boardArr[b] == boardArr[c]
    );

  const checkDraw = () => !boardArr.includes("");

  const restart = () => {
    boardArr = Array(9).fill("");
    setActive(true);
    currentPlayer = "X";
    setStatusText(`${currentPlayer}'s turn`);
    render();
  };

  const update = (index) => {
    if (!active || boardArr[index]) return;
    boardArr[index] = currentPlayer;
    render();
  };

  const setStatusText = (msg) => (statusText.innerHTML = msg);

  return {
    isActive,
    setActive,
    getCurrentPlayer,
    switchCurrentPlayer,
    checkWin,
    checkDraw,
    restart,
    update,
    setStatusText,
  };
})();

const handleClick = (event) => {
  if (!event.target.classList.contains("cell")) return;
  Game.update(event.target.dataset.index);
  const winCombo = Game.checkWin();
  if (winCombo) {
    Game.setActive(false);
    Game.setStatusText(`${Game.getCurrentPlayer()} WON!`);
    winCombo.forEach((index) => {
      board.children[index].classList.add("win");
    });
  } else if (Game.checkDraw()) {
    Game.setActive(false);
    Game.setStatusText(`Game is a DRAW!`);
  } else {
    Game.switchCurrentPlayer();
    Game.setStatusText(`${Game.getCurrentPlayer()}'s turn`);
  }
};

restartBtn.addEventListener("click", Game.restart);
board.addEventListener("click", handleClick);

Game.restart();
