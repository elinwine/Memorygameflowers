const images = [
    'https://via.placeholder.com/150?text=Flower1',
    'https://via.placeholder.com/150?text=Flower2',
    'https://via.placeholder.com/150?text=Flower3',
    'https://via.placeholder.com/150?text=Flower4',
    'https://via.placeholder.com/150?text=Flower1',
    'https://via.placeholder.com/150?text=Flower2',
    'https://via.placeholder.com/150?text=Flower3',
    'https://via.placeholder.com/150?text=Flower4'
];

let firstCard, secondCard;
let lockBoard = false;
let matchedCards = 0;

// Initialize the game
function startGame() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = ''; // Clear previous cards
    matchedCards = 0; // Reset matched cards
    const shuffledImages = shuffle(images);
    
    shuffledImages.forEach((image) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;

        const img = document.createElement('img');
        img.src = '';
        img.alt = 'Flower Image';

        card.appendChild(img);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Shuffle the images
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Flip the card
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.querySelector('img').src = this.dataset.image;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

// Check for a match
function checkForMatch() {
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;

    isMatch ? disableCards() : unflipCards();
}

// Disable matched cards
function disableCards() {
    matchedCards += 2;
    resetBoard();

    if (matchedCards === images.length) {
        setTimeout(() => alert('You won!'), 500);
    }
}

// Unflip unmatched cards
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.querySelector('img').src = '';
        secondCard.querySelector('img').src = '';
        resetBoard();
    }, 1000);
}

// Reset the board
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Restart the game
document.getElementById('restartBtn').addEventListener('click', startGame);

// Start the game when the page loads
startGame();
