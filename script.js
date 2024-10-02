const board = document.getElementById('board');
const rollButton = document.getElementById('rollButton');
const message = document.getElementById('message');
const position1 = document.getElementById('position1');
const position2 = document.getElementById('position2');

let player1Position = 0;
let player2Position = 0;
let currentPlayer = 1;

// Define snakes and ladders
const snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78 };
const ladders = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100 };

// Create the board
for (let i = 100; i >= 1; i--) {
    const square = document.createElement('div');
    square.innerText = i;
    board.appendChild(square);
}

// Roll the dice
rollButton.addEventListener('click', () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    let currentPlayerPosition = currentPlayer === 1 ? player1Position : player2Position;
    message.innerText = `Player ${currentPlayer} rolled a ${roll}`;

    currentPlayerPosition += roll;

    if (currentPlayerPosition > 100) {
        currentPlayerPosition = 100; // Player wins
        message.innerText = `Player ${currentPlayer} wins!`;
        rollButton.disabled = true; // Disable the button
    } else {
        // Check for snakes or ladders
        if (snakes[currentPlayerPosition]) {
            currentPlayerPosition = snakes[currentPlayerPosition];
            message.innerText += ` Oh no! It's a snake! Move down to ${currentPlayerPosition}`;
        } else if (ladders[currentPlayerPosition]) {
            currentPlayerPosition = ladders[currentPlayerPosition];
            message.innerText += ` Yay! It's a ladder! Climb up to ${currentPlayerPosition}`;
        }
    }

    if (currentPlayer === 1) {
        player1Position = currentPlayerPosition;
        position1.innerText = player1Position;
        currentPlayer = 2; // Switch to player 2
    } else {
        player2Position = currentPlayerPosition;
        position2.innerText = player2Position;
        currentPlayer = 1; // Switch back to player 1
    }
});
