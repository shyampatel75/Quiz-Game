// heding
var html = "Dynamic Quiz-game";
document.getElementById('quiz-heading').innerHTML += html;
// rulse
var html = "<p>Rulse</p<ul> <li>Time limit: Each individual may be given a time limit to answer a question</li><li>Question time: A individual is given 30 seconds to answer a question </li><li>Have one best answer: Make sure there is only one correct answer.</li></ul>";
document.getElementById('Rulse').innerHTML += html;


const questions = [
    {
        id: 1,
        question: "What is the capital of France?",
        options: [
            { id: 1, description: "Madrid", is_true: false },
            { id: 2, description: "Paris", is_true: true },
            { id: 3, description: "Berlin", is_true: false }
        ],
        mark: 5
    },
    {
        id: 2,
        question: "When did India gain independence?",
        options: [
            { id: 4, description: "1947", is_true: true },
            { id: 5, description: "1968", is_true: false },
            { id: 6, description: "1845", is_true: false }
        ],
        mark: 5
    },

    {
        id: 3,
        question: "Who is known as the Father of the Nation in India?",
        options: [
            { id: 6, description: "Subhas Chandra Bose", is_true: false },
            { id: 5, description: "Rabindranath Tagore", is_true: false },
            { id: 4, description: "Mahatma Gandhi", is_true: true },
        ],
        mark: 5
    },
    {
        id: 4,
        question: "Who was the first President of India?",
        options: [
            { id: 1, description: "Dr. Rajendra Prasad ", is_true: true },
            { id: 2, description: "Mahatma Gandhi", is_true: false },
            { id: 3, description: "Jawaharlal Nehru", is_true: false },
        ],
        mark: 5
    },
    {
        id: 5,
        question: " What is the national sport of India?",
        options: [
            { id: 1, description: "Hockey", is_true: true },
            { id: 2, description: "Cricketer", is_true: false },
            { id: 3, description: "footbol", is_true: false },
        ],
        mark: 5
    },
    {
        id: 6,
        question: " What is the national animal of India",
        options: [
            { id: 1, description: "Monkey", is_true: false },
            { id: 2, description: "tiger", is_true: true },
            { id: 3, description: "Dog", is_true: false },
        ],
        mark: 5
    },
    {
        id: 7,
        question: " What is the national bird of India?",
        options: [
            { id: 1, description: "Duck", is_true: false },
            { id: 2, description: "Eagle", is_true: true },
            { id: 3, description: "peacock", is_true: false },
        ],
        mark: 5
    },
    {
        id: 8,
        question: " How many states are there in India?",
        options: [
            { id: 1, description: "28", is_true: true },
            { id: 2, description: "29", is_true: false },
            { id: 3, description: "40", is_true: false },
        ],
        mark: 5
    },
    {
        id: 9,
        question: " What is the capital of India?",
        options: [
            { id: 1, description: "goa", is_true: false },
            { id: 2, description: "gujarat", is_true: false },
            { id: 3, description: "New Delhi", is_true: true },
        ],
        mark: 5
    },
    {
        id: 10,
        question: " What is the national heritage animal of India?",
        options: [
            { id: 1, description: "elephant", is_true: true },
            { id: 2, description: "dog", is_true: false },
            { id: 3, description: "Horse", is_true: false },
        ],
        mark: 5
    },
];

var currentQuestionIndex = 0;
let score = 0;
var timerInterval;
const totalTime = 15;
let userAnswers = [];


const quizContainer = document.getElementById("quiz-container");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("current-score");
const popupBox = document.getElementById("popup-box");
const popupMessage = document.getElementById("popup-message");
const overlay = document.getElementById("overlay");

// Start Quiz
document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("start-button").style.display = "none";
    document.getElementById("Rulse").style.display = "none";
    quizContainer.style.display = "block";
    submitButton.style.display = "block";
    quizStarted = true;
    showQuestion();
});

// Show Question
function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showFinalScore();
        return;

    }

    const question = questions[currentQuestionIndex];
    questionText.innerText = question.question;
    optionsContainer.innerHTML = '';

    question.options.forEach(option => {
        const optionElement = document.createElement("p");
        optionElement.innerHTML = `
             <input type="radio" id="option-${option.id}" name="option" value="${option.id}" data-correct="${option.is_true}">
             <label for="option-${option.id}">${option.description}</label>
         `;
        optionsContainer.appendChild(optionElement);
    });

    startTimer();
}

// Timer Function
function startTimer() {
    let timeLeft = totalTime;
    timerElement.textContent = `Time Left: ${timeLeft}s`;
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            checkAnswer(true); // Auto-check 
        }
    }, 1000);
}

// Check Answer
function checkAnswer(timeUp = false) {
    clearInterval(timerInterval);
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        const selectedValue = !selectedOption;
        const question = questions[currentQuestionIndex];
        const selectedAnswerText = undefined;
        const correctAnswerText = question.options.find(opt => opt.is_true).description;

        userAnswers.push({
            question: question.question,
            selectedAnswer: selectedAnswerText,
            correctAnswer: correctAnswerText,
            result: false,
            marks: 0,

        });
        popupMessage.textContent = timeUp ? "Time's up! No option selected." : "Please select an answer.";
        showPopup();

    }

    const selectedValue = selectedOption.value;
    const isCorrect = selectedOption.getAttribute("data-correct") === "true";
    const question = questions[currentQuestionIndex];
    const selectedAnswerText = question.options.find(opt => opt.id == selectedValue).description;
    const correctAnswerText = question.options.find(opt => opt.is_true).description;

    userAnswers.push({
        question: question.question,
        selectedAnswer: selectedAnswerText,
        correctAnswer: correctAnswerText,
        result: isCorrect,
        marks: isCorrect ? 5 : 0
    });


    // if (isCorrect) {
    //     score += question.mark;
    // }

    if (isCorrect) {
        popupMessage.textContent = "Correct! ";
        score += questions[currentQuestionIndex].mark;
    } else {
        popupMessage.textContent = "worng answer!";
    }

    updateScore();
    showPopup();
}

// Show Popup
function showPopup() {
    popupBox.style.display = "block";
    overlay.style.display = "block";
}

// Hide Popup and Load Next Question
const nextButton = document.getElementById("next-button");
nextButton.addEventListener("click", () => {
    popupBox.style.display = "none";
    overlay.style.display = "none";
    currentQuestionIndex++;
    showQuestion();
});

// Update Score
function updateScore() {
    scoreElement.textContent = `Current Score: ${score}`;
}

// Show 
function showFinalScore() {
    questionText.innerHTML = "Quiz Completed!";
    optionsContainer.innerHTML = `<h3>Your final score is: ${score}</h3>`;
    timerElement.style.display = "none";
    submitButton.style.display = "none";
}

// Submit
const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", () => {
    checkAnswer();
});

let quizStarted = false;

window.addEventListener("beforeunload", function (event) {
    if (quizStarted) {
        var confirmationMessage = "hello";
        if (!confirm(confirmationMessage)) {
            event.preventDefault();
            event.returnValue = ""; // Required for some browsers
        }
    }
});


function showFinalScore() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("submit-button").style.display = "none";
    document.getElementById("results").style.display = "block";

    const resultsBody = document.getElementById("results-body");
    resultsBody.innerHTML = userAnswers.map(ans => `
        <tr>
            <td style="border: 1px solid">${ans.question}</td>
            <td style="border: 1px solid">${ans.selectedAnswer}</td>
            <td style="border: 1px solid">${ans.correctAnswer}</td>
            <td style="border: 1px solid">${ans.result}</td>
            <td style="border: 1px solid">${ans.marks} </td>
        </tr>
    `).join('');
}





document.addEventListener("keydown", function (event) {
    const popupBox = document.getElementById("popup-box");

    // Check if the popup is NOT visible
    if (event.key === "Enter" && popupBox.style.display !== "block") {
        event.preventDefault(); // Prevent default form submission
        document.getElementById("submit-button").click(); // Trigger the submit button click
    }
});



