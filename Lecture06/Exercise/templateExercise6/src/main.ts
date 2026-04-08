import { fetchQuestions, selectQuestionsForPlayer, Question } from "./modules/questions.js";
import { calculateScore, addToLeaderboard, getLeaderboard, PlayerScore } from "./modules/scoring.js";
import { renderPlayerName, renderQuestion, showFeedback, renderLeaderboard } from "./modules/ui.js";

async function startApp(): Promise<void> {
    const allQuestions = await fetchQuestions();

    renderPlayerName((names: string[]) => {
        runQuizForPlayer(allQuestions, names, 0, []);
    });
}

function runQuizForPlayer(
    allQuestions: Question[],
    playerNames: string[],
    playerIndex: number,
    collectedScores: PlayerScore[]
): void {
    const name = playerNames[playerIndex];
    const questions = selectQuestionsForPlayer(allQuestions);
    const answers: string[] = [];

    showNextQuestion(questions, answers, 0, name, allQuestions, playerNames, playerIndex, collectedScores);
}

function showNextQuestion(
    questions: Question[],
    answers: string[],
    questionIndex: number,
    playerName: string,
    allQuestions: Question[],
    playerNames: string[],
    playerIndex: number,
    collectedScores: PlayerScore[]
): void {
    if (questionIndex >= questions.length) {
        const score = calculateScore(playerName, questions, answers);
        addToLeaderboard(score);
        collectedScores.push(score);

        if (playerIndex + 1 < playerNames.length) {
        
            alert(` ${playerName} is done! Next up: ${playerNames[playerIndex + 1]}`);
            runQuizForPlayer(allQuestions, playerNames, playerIndex + 1, collectedScores);
        } else {
            renderLeaderboard(getLeaderboard());
        }
        return;
    }

    const question = questions[questionIndex];

    renderQuestion(playerName, question, questionIndex, questions.length, (selected: string) => {
        answers.push(selected);
        const isCorrect = selected === question.answer;

        showFeedback(isCorrect, question.answer, () => {
            showNextQuestion(
                questions, answers, questionIndex + 1,
                playerName, allQuestions, playerNames, playerIndex, collectedScores
            );
        });
    });
}

startApp();