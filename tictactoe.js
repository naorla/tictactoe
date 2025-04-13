const cells = document.querySelectorAll('[data-cell]');
const turnBoxes = document.querySelectorAll('.turn-box');
const playAgainBtn = document.getElementById('play-again');

let xTurn = true;

function updateTurnDisplay() {
  turnBoxes.forEach(box => {
    box.style.backgroundColor = (box.textContent === (xTurn ? 'X' : 'O')) ? '#0edfdb' : '#1e1e2f';
  });
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
