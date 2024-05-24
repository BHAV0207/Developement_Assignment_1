const questions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        choice1: '<script>',
        choice2: '<css>',
        choice3: '<style>',
        choice4: '<span>',
        answer: 3,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: 4,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choice1: '// Comment',
        choice2: '<!-- Comment -->',
        choice3: '/* Comment */',
        choice4: '<! Comment>',
        answer: 2,
    },
];

const questionElement = document.querySelector('.ques');
const choiceElements = document.querySelectorAll('.text');
const questionCounterElement = document.querySelector('.question-num');
const scoreElement = document.querySelector('#score-num');
const progressBarFull = document.querySelector('.progress-bar');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [...questions];

function setNextQuestion() {
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    questionElement.innerText = currentQuestion.question;
    choiceElements.forEach((choice, index) => {
        const number = index + 1;
        choice.innerText = currentQuestion[`choice${number}`];
        choice.parentElement.dataset.number = number; // Ensure choice parent has data-number
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;

    questionCounterElement.innerText = `Question ${questionCounter} / ${questions.length}`;

    const progressPercentage = (questionCounter / questions.length) * 100;
    progressBarFull.style.width = `${progressPercentage}%`;
}

choiceElements.forEach((choice) => {
    choice.parentElement.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.parentElement.dataset.number;
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore();
        }

        if (availableQuestions.length === 0) {
            window.location.href = 'ending.html?score=' + score;
        } else {
            setNextQuestion();
        }
    });
});

function incrementScore() {
    score += 10;
    scoreElement.innerText = score;
}

window.addEventListener('DOMContentLoaded', function() {
    const retryButton = document.getElementById('retry');
    if (retryButton) {
        retryButton.addEventListener('click', function() {
            score = 0;
            questionCounter = 0;
            availableQuestions = [...questions];
            setNextQuestion();
        });
    }
    const finalScoreElement = document.querySelector('.finalScore');
    if (finalScoreElement) {
        const queryParams = new URLSearchParams(window.location.search);
        const finalScore = queryParams.get('score');
        finalScoreElement.textContent = `Your final score: ${finalScore}`;
    }
});

setNextQuestion();
