const gameBoard = document.getElementById('gameBoard');
const squares = [];

createBoard();
function createBoard() {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.className = 'square';
            square.id = `${row}-${col}`;
            gameBoard.appendChild(square);
        }
    }
}
