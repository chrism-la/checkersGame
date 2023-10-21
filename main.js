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
                    pTag.id = 'black-piece';
                } else if (row > 4) {
                    square.innerHTML = '<p>●</p>';
                    const pTag = square.querySelector('p');
                    pTag.id = 'white-piece';
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
            if (viableMove(square, selectedPiece)) {
                square.appendChild(selectedPiece);
                // if square clicked does not have a piece and selectedPiece has value of piece then append selectedPiece to that square clicked
                selectedPiece = null;
                // clear selectedPiece value after placing in new square
            } else {
                selectedPiece = null;
            }
        }
        // else square clicked does not have a piece and selectedPiece has value of null execute nothing
    }
}
function viableMove(square, selectedPiece) {
    console.log(square);
    console.log(selectedPiece.parentElement);
    if (square && selectedPiece) {
        // define all variables (selectedPiece, piece, capturedPiece) to parse position data
        const squarePos = square.id.split('-');
        const selectedPiecePos = selectedPiece.parentElement.id.split('-');

        const squareRow = parseInt(squarePos[0]);
        const squareCol = parseInt(squarePos[1]);
        const selectedPieceRow = parseInt(selectedPiecePos[0]);
        const selectedPieceCol = parseInt(selectedPiecePos[1]);

        // conditional statements to check for viable move or captureMove
        if (
            (selectedPieceRow === squareRow + 1 && (selectedPieceCol === squareCol + 1 || selectedPieceCol === squareCol - 1)) ||
            (selectedPieceRow === squareRow - 1 && (selectedPieceCol === squareCol + 1 || selectedPieceCol === squareCol - 1))
        ) {
            console.log('good');
            return true;
        }
        console.log('false');
        return false;
        // else if check for capture move
    }
}
