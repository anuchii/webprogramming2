export interface Question {
    category: string;
    question: string;
    options: string[]; 
    answer: string;
    difficulty: "easy" | "medium" | "hard";

}

export async function fetchQuestions(): Promise<Question[]> {
    const response = await fetch('../../questions.json');
    const data = await response.json();
    return data;
}

function shuffleArray(array: Question[]): Question[] {
    return array.sort(() => Math.random() - 0.5);
}

export function selectQuestionsForPlayer(questions: Question[]): Question[] {
    const easyQ = shuffleArray( questions.filter(question => question.difficulty === "easy")).slice(0,2);
    const mediumQ =shuffleArray( questions.filter(question => question.difficulty === "medium")).slice(0,2);
    const hardQ =  shuffleArray(questions.filter(question => question.difficulty === "hard")).slice(0,1);

    return shuffleArray([...easyQ, ...mediumQ, ...hardQ]);
}

