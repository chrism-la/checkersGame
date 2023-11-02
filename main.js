const gameBoard = document.getElementById('gameBoard');
const playerWins = document.getElementById('playerWins');
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
                    const piece = square.querySelector('p');
                    piece.className = 'black-piece';
                } else if (row > 4) {
                    square.innerHTML = '<p>●</p>';
                    const piece = square.querySelector('p');
                    piece.className = 'white-piece';
                }
            }
            gameBoard.appendChild(square);
        }
    }
}
createBoard();
let allPieces = document.querySelectorAll('p');
let allPiecesArray = Array.from(allPieces);
let white = [];
let black = [];
for (let i = 12; i < 24; i++) {
    let whitePieces = allPieces[i];
    white.push(whitePieces);
}
for (let i = 0; i < 12; i++) {
    let blackPieces = allPieces[i];
    black.push(blackPieces);
}
const Player1 = {
    playerTurn: null,
    pieces: white,
    score: 0,
};
const Player2 = {
    playerTurn: null,
    pieces: black,
    score: 0,
};
let selectedPiece;

function movePiece() {
    const square = this;
    const piece = square.querySelector('p');

    if (square.classList.contains('black')) {
        const currentPlayer = Player1.playerTurn ? Player1 : Player2;
        if (piece) {
            if (selectedPiece) {
                selectedPiece = null;
                console.log('invalid move');
            } else {
                selectedPiece = piece;
            }
        } else if (selectedPiece) {
            if (validMove(square, selectedPiece, currentPlayer)) {
                square.appendChild(selectedPiece);
                selectedPiece = null;
                console.log('valid move');
                switchTurns();
            } else {
                selectedPiece = null;
                console.log('invalid move');
            }
        }
    } else {
        selectedPiece = null;
        console.log('out of bounds');
    }
}
function validMove(square, selectedPiece) {
    if (square && selectedPiece) {
        const currentPlayer = Player1.playerTurn ? Player1 : Player2;
        if (!currentPlayer.pieces.includes(selectedPiece)) {
            console.log("Cannot move opponent's piece");
            return false;
        }
        const squarePos = square.id.split('-');
        const selPiecePos = selectedPiece.parentElement.id.split('-');
        const squareRow = parseInt(squarePos[0]);
        const squareCol = parseInt(squarePos[1]);
        const selPieceRow = parseInt(selPiecePos[0]);
        const selPieceCol = parseInt(selPiecePos[1]);
        const jumpedRow = parseInt((selPieceRow + squareRow) / 2);
        const jumpedCol = parseInt((selPieceCol + squareCol) / 2);
        const jumpedSquare = document.getElementById(`${jumpedRow}-${jumpedCol}`);
        if (currentPlayer === Player1 && selPieceRow === squareRow + 1 && (selPieceCol === squareCol + 1 || selPieceCol === squareCol - 1)) {
            return true;
        } else if (currentPlayer === Player2 && selPieceRow === squareRow - 1 && (selPieceCol === squareCol + 1 || selPieceCol === squareCol - 1)) {
            return true;
        } else if (jumpedSquare.querySelector('p')) {
            const capturedPiece = jumpedSquare.querySelector('p');
            if (capturedPiece.className === 'white-piece') {
                Player1.pieces.splice(Player1.pieces.indexOf(capturedPiece), 1);
            } else if (capturedPiece.className === 'black-piece') {
                Player2.pieces.splice(Player2.pieces.indexOf(capturedPiece), 1);
            }
            jumpedSquare.innerHTML = '';
            square.appendChild(selectedPiece);
            selectedPiece = null;
            console.log('capture move');
            return true;
        }
        console.log('cannot move here');
        return false;
    }
    return true;
}

function checkWinCondition() {
    if (Player1.pieces.length === 0) {
        console.log('Player 2 wins!');
        playerWins.innerHTML = 'Black Wins!';
        playerWins.removeAttribute('hidden');
    } else if (Player2.pieces.length === 0) {
        console.log('Player 1 wins!');
        playerWins.innerHTML = 'White Wins!';
        playerWins.removeAttribute('hidden');
    }
}
function switchTurns() {
    Player1.playerTurn = !Player1.playerTurn;
    Player2.playerTurn = !Player2.playerTurn;
    checkWinCondition();
}
function startGame() {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.onclick = movePiece;
    });

    Player1.playerTurn = true;
    Player2.playerTurn = false;
}
startGame();
