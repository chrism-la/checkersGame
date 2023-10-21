const gameBoard = document.getElementById('gameBoard');
const squares = [];
let selectedPiece;
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
                    const pTag = square.querySelector('p');
                    pTag.className = 'black-piece';
                } else if (row > 4) {
                    square.innerHTML = '<p>○</p>';
                    const pTag = square.querySelector('p');
                    pTag.className = 'white-piece';
                }
            }
            gameBoard.appendChild(square);
            squares.push(square);
        }
    }
}
createBoard();
function movePiece() {
    const square = this;
    // this keyword is referencing the object executing current piece of code => square.onclick
    const piece = square.querySelector('p');

    if (square.classList.contains('black')) {
        // condition to limit movement to only black squares
        if (piece) {
            if (selectedPiece) {
                // if square clicked has a piece and selectedPiece has value of piece then execute nothing. this prevents two squares from having one piece
            } else {
                selectedPiece = piece;
                // if square clicked has a piece and selectedPiece has value of null then assign piece in selected square to selectedPiece
            }
        } else if (selectedPiece) {
            square.appendChild(selectedPiece);
            // if square clicked does not have a piece and selectedPiece has value of piece then append selectedPiece to that square clicked
            selectedPiece = null;
            // clear selectedPiece value after placing in new square
        }
        // else if square clicked does not have a piece and selectedPiece has value of null execute nothing
    }
}

// to prevent backwards movement in movePiece logic
// to practice OOP and wrap functions in objects and create classes such as Class of Player and Class of Piece
