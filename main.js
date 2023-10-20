const gameBoard = document.getElementById('gameBoard');
const squares = [];
let selectedPiece;
createBoard();
function createBoard() {
    // looping through the gameBoard grid element to create each alternating colored square as well as Player Pieces
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.className = 'square';
            square.id = `${row}-${col}`;
            // adding eventlistener to each square
            square.onclick = movePiece;
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
function movePiece() {
    const square = this;
    // this keyword is referencing the object executing current piece of code => square.onclick
    const piece = square.querySelector('p');

    if (piece) {
        selectedPiece = piece;
        // if square clicked has piece then now piece is selectedPiece
    } else if (selectedPiece) {
        square.appendChild(selectedPiece);
        // if selectedPiece has value of piece append selectedPiece to that square clicked
        selectedPiece = null;
        // clear selectedPiece value after placing in new square
    }
}
