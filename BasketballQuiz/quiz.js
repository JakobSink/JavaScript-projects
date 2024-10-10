// Košarkarski kviz z vprašanji
const questions = [
    {
        question: "Who is known as the GOAT (Greatest of All Time) in basketball?",
        options: ["Michael Jordan", "LeBron James", "Kobe Bryant", "Shaquille O'Neal"],
        answer: 0
    },
    {
        question: "How many players are on the court for each team during a basketball game?",
        options: ["5", "6", "7", "8"],
        answer: 0
    },
    {
        question: "What is the diameter of a basketball hoop in inches?",
        options: ["16 inches", "18 inches", "20 inches", "22 inches"],
        answer: 1
    },
    {
        question: "Which team won the NBA championship in 2020?",
        options: ["Miami Heat", "Golden State Warriors", "Los Angeles Lakers", "Boston Celtics"],
        answer: 2
    },
    {
        question: "What is the maximum number of personal fouls a player can commit before being disqualified?",
        options: ["4", "5", "6", "7"],
        answer: 2
    }
];

// Inicializacija kviza
let currentQuestionIndex = 0;
let score = 0;
let timeRemaining = 30;
let quizInterval;

const quizContainer = document.getElementById('quiz');
const timerElement = document.getElementById('timer');
const resultElement = document.getElementById('result');

// Funkcija za prikaz vprašanja
function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        clearInterval(quizInterval);
        quizContainer.innerHTML = '';
        resultElement.textContent = `Quiz over! Your score: ${score} / ${questions.length}`;
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    quizContainer.innerHTML = `
        <div class="question">${currentQuestion.question}</div>
        <div class="options">
            ${currentQuestion.options.map((option, index) => 
                `<button class="option" onclick="checkAnswer(${index})">${option}</button>`
            ).join('')}
        </div>
    `;
}

// Funkcija za preverjanje odgovora
function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.answer) {
        score++;
    }
    currentQuestionIndex++;
    showQuestion();
}

// Funkcija za zagon števca časa
function startTimer() {
    quizInterval = setInterval(() => {
        timeRemaining--;
        timerElement.textContent = `Time: ${timeRemaining}s`;
        if (timeRemaining <= 0) {
            clearInterval(quizInterval);
            quizContainer.innerHTML = '';
            resultElement.textContent = `Time's up! Your score: ${score} / ${questions.length}`;
        }
    }, 1000);
}

// Začetek kviza
showQuestion();
startTimer();
