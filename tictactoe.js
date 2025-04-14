const cells = document.querySelectorAll('[data-cell]');
const turnBoxes = document.querySelectorAll('.turn-box');
const playAgainBtn = document.getElementById('play-again');
const singlePlayerBtn = document.getElementById('single-player');
const twoPlayerBtn = document.getElementById('two-player');
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
  if (xTurn) {
    turnBoxes[0].style.backgroundColor = '#0edfdb';
    turnBoxes[1].style.backgroundColor = '#1e1e2f';
  } else {
    turnBoxes[1].style.backgroundColor = '#0edfdb';
    turnBoxes[0].style.backgroundColor = '#1e1e2f';
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
}

function checkForWinner() {
  for (let i = 0; i < winoptions.length; i++) {
    let counterx = 0;
    let countero = 0;

    for (let j = 0; j < winoptions[i].length; j++) {
      const index = winoptions[i][j];
      const mark = cells[index].textContent;

      if (mark === 'X') {
        counterx++;
      } else if (mark === 'O') {
        countero++;
      }
    }

    if (counterx === 3 || countero === 3) {
      gameOver = true;
      winoptions[i].forEach(index => {
        cells[index].style.backgroundColor = '#0edfdb'; // Highlight the winning cells
      });
    }
  }
}

function selectRandomly() {
  let computerchoose;

  // Create an array of available spots (cells that are not yet selected)
  let availableSpots = [];

  for (let i = 0; i < 9; i++) {
    if (!steps.includes(i)) {  // If the index is not in 'steps', it's an available spot
      availableSpots.push(i);
    }
  }

  // Randomly select from the available spots
  if (availableSpots.length > 0) {
    computerchoose = availableSpots[Math.floor(Math.random() * availableSpots.length)];

    // Place 'O' in the randomly chosen cell
    setTimeout(() => {
      cells[computerchoose].textContent = 'O';
      steps.push(computerchoose); // Add the computer's move to steps

    // After the computer's move, check for a winner again
    checkForWinner();

    xTurn = !xTurn; // Switch turns
    updateTurnDisplay()
    }, 1050);
    
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
      steps.push(index); // Add current index to steps
      checkForWinner();
      xTurn = !xTurn; // Switch turns
      updateTurnDisplay();
      
      if (!gameOver && isSinglePlayer && !xTurn) {
        selectRandomly(); // Computer's turn to make a move
      }
    }
  });
});
// Switch to Single Player mode
singlePlayerBtn.addEventListener('click', () => {
  isSinglePlayer = true;
  resetGame();
  document.querySelector('.mode-selector').style.display = 'none'; // Hide mode selector
});

// Switch to Two Player mode
twoPlayerBtn.addEventListener('click', () => {
  isSinglePlayer = false;
  resetGame();
  document.querySelector('.mode-selector').style.display = 'none'; // Hide mode selector
});

playAgainBtn.addEventListener('click', () => {
  resetGame();
  if (!isSinglePlayer) {
    document.querySelector('.mode-selector').style.display = 'block'; // Show mode selector again for 2 players
  }
});

updateTurnDisplay();
