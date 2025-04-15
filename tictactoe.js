const cells = document.querySelectorAll('[data-cell]');
const turnBoxes = document.querySelectorAll('.turn-box');
const playAgainBtn = document.getElementById('play-again');
const singlePlayerBtn = document.getElementById('single-player');
const twoPlayerBtn = document.getElementById('two-player');
const backtomenu = document.getElementById('back-to-welcome-page');
const welcomeScreen = document.querySelector('.welcome-screen');
const board = document.querySelector('.board');
const turnContainer = document.querySelector('.turn-container');
const modeSelector = document.querySelector('.mode-selector');

const winoptions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

let steps = [];
let xTurn = true;
let gameOver = false;
let isSinglePlayer = false;

function updateTurnDisplay() {
  if(!gameOver){
    if (xTurn) {
      turnBoxes[0].style.backgroundColor = '#0edfdb';
      turnBoxes[1].style.backgroundColor = '#1e1e2f';
    } else {
      turnBoxes[1].style.backgroundColor = '#0edfdb';
      turnBoxes[0].style.backgroundColor = '#1e1e2f';
    }
  }
 
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.backgroundColor = '#1e1e2f';
  });
  xTurn = true;
  gameOver = false;
  steps = []; 
  updateTurnDisplay();
  playAgainBtn.style.display = 'none';
}

function checkForWinner() {
  for (let i = 0; i < winoptions.length; i++) {
    const [a, b, c] = winoptions[i];
    const markA = cells[a].textContent;
    const markB = cells[b].textContent;
    const markC = cells[c].textContent;

    if (markA && markA === markB && markA === markC) {
      gameOver = true;
      winoptions[i].forEach(index => {
        cells[index].style.backgroundColor = '#0edfdb';
      });
      playAgainBtn.style.display = 'block';
      return;
    }
  }

  if (steps.length === 9 && !gameOver) {
    gameOver = true;
    playAgainBtn.style.display = 'block';
  }
}

function selectRandomly() {
  const availableSpots = [];
  for (let i = 0; i < 9; i++) {
    if (!steps.includes(i)) {
      availableSpots.push(i);
    }
  }

  if (availableSpots.length > 0) {
    const choice = availableSpots[Math.floor(Math.random() * availableSpots.length)];
    board.style.pointerEvents = 'none';

    setTimeout(() => {
      if (!gameOver) {
        cells[choice].textContent = 'O';
        steps.push(choice);
        checkForWinner();
        xTurn = !xTurn;
        updateTurnDisplay();
        board.style.pointerEvents = 'auto';

      }
    }, 1000);
  }
}

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (cell.textContent === '' && !gameOver) {
      if (xTurn) {
        cell.textContent = 'X';
      } else {
        cell.textContent = 'O';
      }
      steps.push(index);
      checkForWinner();
      xTurn = !xTurn;    
      updateTurnDisplay();  

      if (!gameOver && isSinglePlayer && !xTurn) {
        selectRandomly();
      }
    }
  });
});

singlePlayerBtn.addEventListener('click', () => {
  isSinglePlayer = true;
  welcomeScreen.style.display = 'none';
  turnContainer.style.display = 'grid';
  board.style.display = 'grid';
  playAgainBtn.style.display = 'none';
  backtomenu.style.display = 'block';
  resetGame();
});

twoPlayerBtn.addEventListener('click', () => {
  isSinglePlayer = false;
  welcomeScreen.style.display = 'none';
  turnContainer.style.display = 'grid';
  board.style.display = 'grid';
  playAgainBtn.style.display = 'none';
  backtomenu.style.display = 'block';

  resetGame();
});

playAgainBtn.addEventListener('click', () => {
  resetGame();

});
backtomenu.addEventListener('click', () => {
  welcomeScreen.style.display = 'grid';
  turnContainer.style.display = 'none';
  board.style.display = 'none';
  playAgainBtn.style.display = 'none';
  backtomenu.style.display = 'none';
  resetGame()
});
