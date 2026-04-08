import { Question } from "./questions.js";
import { PlayerScore } from "./scoring.js";

export function renderPlayerName(onStart: (names: string[]) => void): void {
    const container = document.getElementById("player-input")!;
    container.innerHTML = `
        <h2>Enter Player Names</h2>
        <input id="player1" type="text" class="form-control mb-2" placeholder="Player 1 Name">
        <input id="player2" type="text" class="form-control mb-2" placeholder="Player 2 Name">
        <button id="start-btn" class="btn btn-primary">Start Quiz</button>
    `;

    document.getElementById("start-btn")!.addEventListener("click", () => {
        const p1 = (document.getElementById("player1") as HTMLInputElement).value.trim();
        const p2 = (document.getElementById("player2") as HTMLInputElement).value.trim();
        if (!p1 || !p2) {
            alert("Please enter both player names!");
            return;
        }
        container.style.display = "none";
        onStart([p1, p2]);
    });
}

export function renderQuestion(
    playerName: string,
    question: Question,
    questionIndex: number,
    total: number,
    onAnswer: (selected: string) => void
): void {
    const container = document.getElementById("quiz-container")!;
    container.style.display = "block";
    container.querySelector(".card-body")!.innerHTML = `
        <h5 class="text-muted">${playerName} — Question ${questionIndex + 1} of ${total}</h5>
        <span class="badge badge-secondary mb-2">${question.difficulty.toUpperCase()} · ${question.category}</span>
        <h4 class="mt-2">${question.question}</h4>
        <div id="options" class="mt-3">
            ${question.options.map(opt => `
                <button class="btn btn-outline-primary btn-block option-btn" data-option="${opt}">${opt}</button>
            `).join("")}
        </div>
        <div id="feedback" class="mt-3"></div>
    `;

    document.querySelectorAll(".option-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const selected = (e.target as HTMLElement).dataset.option!;
            // Disable all buttons after selection
            document.querySelectorAll(".option-btn").forEach(b => (b as HTMLButtonElement).disabled = true);
            onAnswer(selected);
        });
    });
}

export function showFeedback(isCorrect: boolean, correctAnswer: string, onNext: () => void): void {
    const feedback = document.getElementById("feedback")!;
    feedback.innerHTML = isCorrect
        ? `<div class="alert alert-success"> Correct!</div>`
        : `<div class="alert alert-danger"> Wrong! Correct answer: <strong>${correctAnswer}</strong></div>`;

    const nextBtn = document.createElement("button");
    nextBtn.className = "btn btn-secondary mt-2";
    nextBtn.textContent = "Next →";
    nextBtn.addEventListener("click", onNext);
    feedback.appendChild(nextBtn);
}

export function renderLeaderboard(scores: PlayerScore[]): void {
    document.getElementById("quiz-container")!.style.display = "none";
    const lb = document.getElementById("leaderboard")!;
    lb.innerHTML = `
        <h2>Leaderboard</h2>
        <table class="table table-bordered mt-3">
            <thead class="thead-dark">
                <tr><th>Rank</th><th>Player</th><th>Points</th><th>Score</th></tr>
            </thead>
            <tbody>
                ${scores.map((s, i) => `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${s.name}</td>
                        <td>${s.points} / 9</td>
                        <td>${s.percentage}%</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
}