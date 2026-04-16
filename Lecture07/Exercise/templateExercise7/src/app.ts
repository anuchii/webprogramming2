const board = document.getElementById("game-board") as HTMLElement; // man könnte auch die NON-Null assertionbenutzen mit am ende ! --> sagt: Vertrau mir, das ist nicht null. 

const restartBtn = document.getElementById("restart-btn") as HTMLElement;

const symbols: Array<string> = ["🫀", "🧠", "🫁", "👁️", "🦵🏼", "🦶🏽", "✋🏻", "🦷", "👅", "👂🏻", "🩺", "🥼", "💊", "🧪", "🩻", "🦴"];

let flippedCards: HTMLDivElement[] = [];

let lockBoard: boolean = false;




let matchedPairs: number = 0;

//! nicht für diese Übung
/*
const pairsDisplay = document.getElementById("matchedPAirs");

let clickCount: number = 0;
const clickDisplay = document.getElementById("clicks");

let timer: number = 0;
let timerInterval: number | null = null;
const timerDisplay = document.getElementById("timer");
*/



enum GameState {
    NotStarted,
    InProgress,
    Completed
}

let gameState: GameState = GameState.NotStarted;

//* Level: Pairs
const levels: Record<number, number> = {
    1: 4,
    2: 6,
    3: 8,
    4: 10,
    5: 12

};
let currentLevel: number = 1;


interface Player {
    name: string;
    score: number;
}

const players: Player[] = [
    { name: "Spieler 1", score: 0 },
    { name: "Spieler 2", score: 0 }
];

let currentPlayer: number = Math.floor(Math.random() * 2);

function switchPlayer(): void {
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    updatePlayerDisplay();
}

function renderBoard(level: number) {
    board.innerHTML = "";

    const pairs: number = levels[level];
    const chosen: string[] = symbols.slice(0, pairs);
    const deck = [...chosen, ...chosen];

    shuffleDeck(deck);


    deck.forEach(symbol => {
        const card = document.createElement("div") as HTMLDivElement;
        card.classList.add("card");
        card.textContent = "?";
        card.dataset.value = symbol;

        card.addEventListener("click", () => handleCardClick(card));
        board!.appendChild(card);
    });


}

function shuffleDeck(deck: Array<string>): string[] {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}


function resetCards(): void {
    if (gameState === GameState.NotStarted) return;
    flippedCards = [];
    lockBoard = false;
}

function flipCard(card: HTMLDivElement): void {
    card.textContent = card.dataset.value ?? "?";
    card.classList.add("flipped");

}

function unflipCard(card: HTMLDivElement): void {
    card.textContent = "?";
    card.classList.remove("flipped");
}

function disableCard(card: HTMLDivElement): void {
    card.classList.add("matched");
}


function handleCardClick(clicked: HTMLDivElement): void {
    if (gameState !== GameState.InProgress) return;
    //! nicht für diese Übung
    /*
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            timer++;
            if (timerDisplay) {
                timerDisplay.textContent = "Time: " + timer + "s";
            }
        }, 1000);
    }*/

    if (lockBoard) return;
    if (clicked.classList.contains("matched")) return;
    if (flippedCards.includes(clicked)) return;
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


function handleMatch(): void {
    disableCard(flippedCards[0]);
    disableCard(flippedCards[1]);
    matchedPairs += 1;
    players[currentPlayer].score += 1; 
    updatePlayerDisplay();

    //! nicht für diese Übung
   /* if (pairsDisplay) {
        pairsDisplay.textContent = "Pairs: " + matchedPairs;
    }*/

    resetCards();

    if (matchedPairs === levels[currentLevel]) {
        setTimeout(() => {
            alert("Level " + currentLevel + " geschafft!");


            if (currentLevel < Object.keys(levels).length) {
                currentLevel++;
                gameState = GameState.InProgress

                startGame();
            } else {
                //! nicht für diese Übung
                //clearInterval(timerInterval!);
                //timerInterval = null;
                gameState = GameState.Completed
                alert("Alle Level geschafft! Super gespielt!");
            }
        }, 200);
    }
}


function handleMismatch(): void {

    setTimeout(() => {
        unflipCard(flippedCards[0]);
        unflipCard(flippedCards[1]);
        resetCards();
        switchPlayer()
    }, 800);
}

function startGame() {
    gameState = GameState.InProgress;
    matchedPairs = 0;
    //! nicht für diese Übung
    /*
    if (pairsDisplay) {
        pairsDisplay.textContent = "Pairs: 0";
    }*/
    resetCards();

    renderBoard(currentLevel);
}


function selectLevel(level: number): void {
    currentLevel = level;

    //! nicht für diese Übung
    /*timer = 0;
    clickCount = 0;
    if (clickDisplay) clickDisplay.textContent = "Clicks: 0";
    if (timerDisplay) timerDisplay.textContent = "Time: 0s";
    clearInterval(timerInterval!);
    timerInterval = null;
    */
    startGame();
}


function resetGame() {
    currentLevel = 1;

    //! nicht für diese Übung
    /*timer = 0;
    clickCount = 0;
    if (clickDisplay) clickDisplay.textContent = "Clicks: 0";
    if (timerDisplay) timerDisplay.textContent = "Time: 0s";
    clearInterval(timerInterval!);
    timerInterval = null;*/

    players[0].score = 0;
    players[1].score = 0;
    currentPlayer = 0;
    updatePlayerDisplay();

    startGame();
}

function updatePlayerDisplay(): void {
    const display = document.getElementById("player-display");
    if (display) {
        display.textContent = players[currentPlayer].name + " ist dran!";
    }

    const score1 = document.getElementById("score-player1");
    const score2 = document.getElementById("score-player2");

    if (score1) score1.textContent = players[0].name + ": " + players[0].score;
    if (score2) score2.textContent = players[1].name + ": " + players[1].score;
}


startGame();

document.querySelectorAll("#level-selector button").forEach((btn, index) => {
    btn.addEventListener("click", () => selectLevel(index + 1));
});


restartBtn.addEventListener("click", resetGame);