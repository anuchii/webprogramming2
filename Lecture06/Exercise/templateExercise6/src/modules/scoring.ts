import { Question } from "./questions.js";

export interface PlayerScore {
    name: string;
    points: number;
    percentage: number;
}

const pointsMap: Record<string, number> = {
    easy: 1,
    medium: 2,
    hard: 3
};

const MAX_POINTS = 2 * 1 + 2 * 2 + 1 * 3; // = 9

export function calculatePoints(question: Question, isCorrect: boolean): number {
    if (!isCorrect) return 0;
    return pointsMap[question.difficulty];
}

export function calculateScore(name: string, questions: Question[], answers: string[]): PlayerScore {
    let points = 0;
    questions.forEach((q, i) => {
        if (answers[i] === q.answer) {
            points += pointsMap[q.difficulty];
        }
    });

    const percentage = Math.round((points / MAX_POINTS) * 100);
    return { name, points, percentage };
}

let leaderboard: PlayerScore[] = [];

export function addToLeaderboard(score: PlayerScore): void {
    leaderboard.push(score);
    leaderboard.sort((a, b) => b.points - a.points);
}

export function getLeaderboard(): PlayerScore[] {
    return leaderboard;
}