const gameBoard = document.getElementById('gameBoard');
const squares = [];
let selectedPiece;
createBoard();
function createBoard() {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.className = 'square';
            square.id = `${row}-${col}`;
            if ((row + col) % 2 === 0) {
                square.classList.add('red');
            } else {
                square.classList.add('black');
                if (row < 3) {
                    square.innerHTML = '<p>●</p>';
                } else if (row > 4) {
                    square.innerHTML = '<p>○</p>';
                }
            }
            gameBoard.appendChild(square);
            squares.push(square);
        }
    }
}
