const cells = document.querySelectorAll('[data-cell]');
    const turnBoxes = document.querySelectorAll('.turn-box');
    const playAgainBtn = document.getElementById('play-again');
    const winoptions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    let xTurn = true;
    let gameOver = false;

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
        cell.style.backgroundColor='#1e1e2f'
      });
      xTurn = true;
      gameOver = false;
      updateTurnDisplay();
    }

    cells.forEach(cell => {
      cell.addEventListener('click', () => {
        if (cell.textContent === '' && !gameOver) {
          if (xTurn) {
            cell.textContent = 'X';
          } else {
            cell.textContent = 'O';
          }

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
                cells[index].style.backgroundColor = '#0edfdb'; 
              });
            }
          }

          xTurn = !xTurn;
          updateTurnDisplay();
        }
      });
    });

    playAgainBtn.addEventListener('click', resetGame);

    updateTurnDisplay(); // initial call