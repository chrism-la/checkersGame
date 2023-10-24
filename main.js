const gameBoard = document.getElementById('gameBoard');
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
let selectedPiece;
function movePiece() {
    const square = this;
    // this keyword is referencing the object executing current piece of code => square.onclick
    const piece = square.querySelector('p');

    if (square.classList.contains('black')) {
        // condition to limit movement to only black squares
        if (piece) {
            if (selectedPiece) {
                selectedPiece = null;
                console.log('invalid move');
                // if square clicked has a piece and selectedPiece has value of piece then clear selectedPiece. this prevents two squares from having one piece
            } else {
                selectedPiece = piece;
                // if square clicked has a piece and selectedPiece has value of null then assign piece in selected square to selectedPiece
            }
        } else if (selectedPiece) {
            if (validMove(square, selectedPiece)) {
                square.appendChild(selectedPiece);
                // if square clicked does not have a piece and selectedPiece has value of piece then append selectedPiece to that square clicked
                selectedPiece = null;
                // clear selectedPiece value after placing in new square
            } else {
                selectedPiece = null;
            }
        }
        // else square clicked does not have a piece and selectedPiece has value of null execute nothing
    } else {
        selectedPiece = null;
        console.log('out of bounds');
    }
}
function validMove(square, selectedPiece) {
    console.log('destination', square);
    console.log('selectedPiece', selectedPiece.parentElement);
    if (square && selectedPiece) {
        // define the elements that i will be using to build if/else statements that compare positions in order to check for viable move
        const squarePos = square.id.split('-'); // .split() splits a string , in this case the id i created for each square ('row-col') , into an array of two items. ('-') => represnts where to split the string
        const selPiecePos = selectedPiece.parentElement.id.split('-'); // .split() again but in this case to the selectedPiece parentElement in other words its square ID
        // ^^ this essentially is grabbing the position of the two elements i will be working with and allowing me to compare both the row and column to define a one tile move as viable
        const squareRow = parseInt(squarePos[0]);
        const squareCol = parseInt(squarePos[1]);
        const selPieceRow = parseInt(selPiecePos[0]);
        const selPieceCol = parseInt(selPiecePos[1]);
        const jumpedRow = parseInt((selPieceRow + squareRow) / 2);
        const jumpedCol = parseInt((selPieceCol + squareCol) / 2);
        // ^^ defining each row and column according to the array built by .split() and parsing these strings into integers for comparison using operators

        const jumpedSquare = document.getElementById(`${jumpedRow}-${jumpedCol}`); // define jumpedSquare and build an ID
        // after defining both the destination square and selected squares position i can use these to define the position of a jumped square in between the two by comparing their values. essentially allowing for a two tile move as opposed to the only allowable one tile move BUT only if the jumped square contains a piece then considering this a capture move
        console.log('captured piece', jumpedSquare);
        if (
            (selPieceRow === squareRow + 1 && (selPieceCol === squareCol + 1 || selPieceCol === squareCol - 1)) ||
            (selPieceRow === squareRow - 1 && (selPieceCol === squareCol + 1 || selPieceCol === squareCol - 1))
            //first iteration of a viable move is a one tile diagonal move
            // to do:
        ) {
            console.log('valid move');
            return true;
        } else if (jumpedSquare.querySelector('p')) {
            // second iteration of viable move allows for two tile move only IF jumped square contains a <P> element
            jumpedSquare.innerHTML = ''; // remove piece
            square.appendChild(selectedPiece);
            selectedPiece = null;
            console.log('capture move');
            return true;
        }
        console.log('cannot move here'); // if no valid moves , for example: 3 tile move or 2 tile move that is not a capture
        return false;
    }
}
const pieces = document.querySelectorAll('p');
const white = [];
const black = [];
for (let i = 12; i < 24; i++) {
    const whitePieces = pieces[i];
    white.push(whitePieces);
}
for (let i = 0; i < 12; i++) {
    const blackPieces = pieces[i];
    black.push(blackPieces);
}
const Player1 = {
    playerTurn: true,
    pieces: white,
    score: 0,
};
const Player2 = {
    playerTurn: false,
    pieces: black,
    score: 0,
};
function startGame() {}
function checkWinCondition() {
    if (Player1.pieces.length === 0) {
        console.log('Player 2 wins!');
    } else if (Player2.pieces.length === 0) {
        console.log('Player 1 wins!');
    }
}
function switchTurns() {
    Player1.playerTurn = !Player1.playerTurn;
    Player2.playerTurn = !Player2.playerTurn;
}
startGame();
