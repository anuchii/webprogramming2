const board = document.getElementById("game-board");
let cards = [];
const restartBtn = document.getElementById("restart-btn");

const symbols = ["🫀", "🧠", "🫁", "👁️", "🦵🏼", "🦶🏽", "✋🏻", "🦷", "👅", "👂🏻", "🩺", "🥼", "💊", "🧪", "🩻", "🦴"];

let flippedCards = [];
let lockBoard = false;
let matchedPairs = 0;
const pairsDisplay = document.getElementById("matchedPAirs");
let clickCount = 0;
const clickDisplay = document.getElementById("clicks");

let timer = 0;
let timerInterval = null;
const timerDisplay = document.getElementById("timer");

const levels = {
    1: { pairs: 4 },
    2: { pairs: 6 },
    3: { pairs: 8 },
    4: { pairs: 10 },
    5: { pairs: 12 }

};
let currentLevel = 1;


function renderBoard(level) {
    board.innerHTML = "";

    const pairs = levels[level].pairs;
    const chosen = symbols.slice(0, pairs);
    const deck = [...chosen, ...chosen];

    shuffleDeck(deck);


    deck.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.textContent = "?";
        card.dataset.value = symbol;

        card.addEventListener("click", () => handleCardClick(card));
        board.appendChild(card);
    });

    
    cards = Array.from(board.querySelectorAll(".card"));
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}


function resetCards() {
    flippedCards = [];
    lockBoard = false;
}

function flipCard(card) {
    card.textContent = card.dataset.value;
    card.classList.add("flipped");

}

function unflipCard(card) {
    card.textContent = "?";
    card.classList.remove("flipped");
}

function disableCard(card) {
    card.classList.add("matched");
}

function handleMatch() {
    disableCard(flippedCards[0]);
    disableCard(flippedCards[1]);
    matchedPairs += 1;
    pairsDisplay.textContent = "Pairs: " + matchedPairs;

    resetCards();

    if (matchedPairs === levels[currentLevel].pairs) {
        setTimeout(() => {
            alert("Level " + currentLevel + " geschafft!");

            if (currentLevel < Object.keys(levels).length) {
                currentLevel++;
                startGame();
            } else {
                clearInterval(timerInterval);
                timerInterval = null;

                alert("Alle Level geschafft! Super gespielt! Zeit: " + timer + "s");
            }
        }, 200);
    }
}

function handleMismatch() {

    setTimeout(() => {
        unflipCard(flippedCards[0]);
        unflipCard(flippedCards[1]);
        resetCards();
    }, 800);
}

function handleCardClick(clicked) {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            timer++;
            if (timerDisplay) {
                timerDisplay.textContent = "Time: " + timer + "s";
            }
        }, 1000);
    }

    if (lockBoard) return;
    if (clicked.classList.contains("matched")) return;
    if (flippedCards.includes(clicked)) return;

    clickCount++;
    if (clickDisplay) {
        clickDisplay.textContent = "Clicks: " + clickCount;
    }

    flipCard(clicked);
    flippedCards.push(clicked);

    if (flippedCards.length === 1) {
        return;
    }

    lockBoard = true;

    if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
        handleMatch();
    } else {
        handleMismatch();
    }
}

function startGame() {
    
    matchedPairs = 0;
    if (pairsDisplay) {
        pairsDisplay.textContent = "Pairs: 0";
    }
    resetCards();
    
    renderBoard(currentLevel);
}


function resetGame() {
    currentLevel = 1;

    timer = 0;
    clickCount = 0;
    if (clickDisplay) {
        clickDisplay.textContent = "Clicks: 0";
    }
    if (timerDisplay) {
        timerDisplay.textContent = "Time: 0s";
    }
    clearInterval(timerInterval);
    timerInterval = null;

    startGame();
}


startGame();
restartBtn.addEventListener("click", resetGame);