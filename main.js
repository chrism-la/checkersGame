const gameBoard = document.getElementById('gameBoard');
let selectedPiece;
function createBoard() {
    // looping through the gameBoard grid element to create each alternating colored square as well as Player Pieces
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.className = 'square';
            square.id = `${row}-${col}`;
            square.onclick = movePiece;
            // adding eventlistener to each square
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
    console.log('destination', square);
    console.log('selectedPiece', selectedPiece.parentElement);
    if (square && selectedPiece) {
        // define all variables (selectedPiece, piece, capturedPiece) to parse position data
        const squarePos = square.id.split('-');
        const selectedPiecePos = selectedPiece.parentElement.id.split('-');

        const squareRow = parseInt(squarePos[0]);
        const squareCol = parseInt(squarePos[1]);
        const selPieceRow = parseInt(selectedPiecePos[0]);
        const selPieceCol = parseInt(selectedPiecePos[1]);
        const jumpedRow = parseInt((selPieceRow + squareRow) / 2);
        const jumpedCol = parseInt((selPieceCol + squareCol) / 2);

        const jumpedSquare = document.getElementById(`${jumpedRow}-${jumpedCol}`);
        console.log('captured piece', jumpedSquare);
        // conditional statements to check for viable move
        if (
            (selPieceRow === squareRow + 1 && (selPieceCol === squareCol + 1 || selPieceCol === squareCol - 1)) ||
            (selPieceRow === squareRow - 1 && (selPieceCol === squareCol + 1 || selPieceCol === squareCol - 1))
        ) {
            console.log('viable move');
            return true;
        } else if (jumpedSquare.querySelector('p')) {
            jumpedSquare.innerHTML = '';
            square.appendChild(selectedPiece);
            selectedPiece = null;
            console.log('capture move');
            return true;
        }
        console.log('cannot move here');
        return false;
    }
}
