const cells = document.querySelectorAll('[data-cell]');
const turnBoxes = document.querySelectorAll('.turn-box');
const playAgainBtn = document.getElementById('play-again');

let xTurn = true;

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
  });
  xTurn = true;
  updateTurnDisplay();
}

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (cell.textContent !== '') return;
    cell.textContent = xTurn ? 'X' : 'O';
    xTurn = !xTurn;
    updateTurnDisplay();
  });
});

playAgainBtn.addEventListener('click', resetGame);

updateTurnDisplay(); // initial call
