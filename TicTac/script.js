// Inicializacija spremenljivk
const gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let currentPlayer = 'X';
let isGameActive = true;
const winningCombinations = [
    [0, 1, 2], // vrstice
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // stolpci
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonale
    [2, 4, 6]
];

const gameElement = document.getElementById('game');
const messageElement = document.getElementById('message');

// Funkcija za ustvarjanje mreže igre
function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        gameElement.appendChild(cell);
    }
}

// Funkcija za ravnanje s klikom na polje
function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    const row = Math.floor(index / 3);
    const col = index % 3;

    if (gameBoard[row][col] !== '' || !isGameActive) {
        return;
    }

    gameBoard[row][col] = currentPlayer;
    event.target.textContent = currentPlayer;

    checkWinner();
    switchPlayer();
}

// Funkcija za preklop igralca
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    messageElement.textContent = `Current Player: ${currentPlayer}`;
}

// Funkcija za preverjanje zmagovalca
function checkWinner() {
    const flatBoard = gameBoard.flat();
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (flatBoard[a] && flatBoard[a] === flatBoard[b] && flatBoard[a] === flatBoard[c]) {
            isGameActive = false;
            messageElement.textContent = `Player ${flatBoard[a]} Wins!`;
            highlightWinner(combination);
            return;
        }
    }

    // Preveri, če je rezultat neodločen
    if (!flatBoard.includes('')) {
        isGameActive = false;
        messageElement.textContent = 'It\'s a Draw!';
    }
}

// Funkcija za osvetlitev zmagovalne kombinacije
function highlightWinner(winningCombination) {
    for (let index of winningCombination) {
        const cell = document.querySelector(`[data-index='${index}']`);
        cell.style.backgroundColor = '#4caf50';
    }
}

// Funkcija za ponastavitev igre
function resetGame() {
    gameBoard.forEach((row, rowIndex) => {
        row.forEach((_, colIndex) => {
            gameBoard[rowIndex][colIndex] = '';
        });
    });

    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#333';
    });

    isGameActive = true;
    currentPlayer = 'X';
    messageElement.textContent = `Current Player: ${currentPlayer}`;
}

// Funkcija za uporabo puščic (uporaba tipkovnice)
function handleKeyPress(event) {
    if (!isGameActive) return;
    
    const flatBoard = gameBoard.flat();
    const emptyCells = flatBoard.map((val, index) => val === '' ? index : null).filter(val => val !== null);

    if (event.key === 'ArrowUp') {
        // Premakni na prvo prosto celico navzgor
        const firstEmpty = emptyCells[0];
        const cell = document.querySelector(`[data-index='${firstEmpty}']`);
        cell.click();
    } else if (event.key === 'r' || event.key === 'R') {
        resetGame();  // Pritisni 'R' za reset
    }
}

// Poslušalec za tipkovnico
document.addEventListener('keydown', handleKeyPress);

// Inicializacija igre
createBoard();
messageElement.textContent = `Current Player: ${currentPlayer}`;
