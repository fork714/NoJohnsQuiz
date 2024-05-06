//  Array containing quiz questions and answers
const questions = [
    {
        question: "What character is unlocked by playing either 20 hours or 700 matches in versus mode?",
        answers: [
            {text: "Mr. Game and Watch", correct: false},
            {text: "Ganondorf", correct: false},
            {text: "Young Link", correct: false},
            {text: "Mewtwo", correct: true},
        ]
    },
    
    {
        question: "What secret boss can be fought on Final Destination in the single-player Adventure Mode on Normal difficulty or higher?",
        answers: [
            {text: "Tabuu", correct: false},
            {text: "Giga Bowser", correct: true},
            {text: "Dark Link", correct: false},
            {text: "Crazy Hand", correct: false},
        ]
    },
    
    {
        question: "When you play as Link and angle the control stick down and press 'B' at the same time, what does Link do?",
        answers: [
            {text: "Throws his Boomerang", correct: false},
            {text: "Swings his Sword", correct: false},
            {text: "Pulls out a bomb", correct: true},
            {text: "Shoots an Arrow", correct: false},
        ]
    },
    
    {
        question: "How many usable Heart Containers appear in All Star Mode?",
        answers: [
            {text: "6", correct: false},
            {text: "9", correct: false},
            {text: "1", correct: false},
            {text: "3", correct: true},
        ]
    },
    
    {
        question: "Which of these stages from the original 'Super Smash Bros.' does not reappear in 'Melee'?",
        answers: [
            {text: "Sector Z", correct: true},
            {text: "Dream Land", correct: false},
            {text: "Kongo Jungle", correct: false},
            {text: "Yoshi's Island", correct: false},
        ]
    },
    
    {
        question: "While some trophies have to be unlocked by accomplishing specific tasks, others can be purchased with in-game currency through what mini-game?",
        answers: [
            {text: "Race to the finish", correct: false},
            {text: "Single Button Melee", correct: false},
            {text: "Multi-Man Melee", correct: false},
            {text: "Lottery", correct: true},
        ]
    },
    
    {
        question: "There are exactly #___ Event Matches in 'Super Smash Bros: Melee'.",
        answers: [
            {text: "50", correct: true},
            {text: "20", correct: false},
            {text: "25", correct: false},
            {text: "100", correct: false},
        ]
    },
    
    {
        question: "What character from the 'Fire Emblem' franchise is unlocked by completing the single-player Classic mode with every initially playable character?",
        answers: [
            {text: "Chrom", correct: false},
            {text: "Marth", correct: true},
            {text: "Roy", correct: false},
            {text: "Sephiroth", correct: false},
        ]
    },

    {
        question: "You have the option to 'shoot' the game's credits as they roll by after completing any single-player mode. What character do you unlock for shooting all of them?",
        answers: [
            {text: "Sonic The Hedgehog", correct: false},
            {text: "Master Hand", correct: false},
            {text: "Toad", correct: false},
            {text: "There is no such character unlocked that way", correct: true},
        ]
    },

    {
        question: "Which of the following glitches are guaranteed to crash the game?",
        answers: [
            {text: "Infinite Super Scope Glitch", correct: false},
            {text: "Freeze Glitch", correct: false},
            {text: "Black Hole Glitch", correct: true},
            {text: "Mini Yoshi Glitch", correct: false},
        ]
    }   
];

//  element references
const questionDisplay = document.getElementById("question");
const answerBtn = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const feedbackForm = document.getElementById("feedback-form");

//  variables to track quiz state
let questionIndex = 0;
let score = 0;

//  function to initialize the quiz
function startQuiz(){
    //  reset quiz state
    questionIndex = 0;
    score = 0;

    //  clear previous content + shuffle questions/answers
    clear();
    updateProgressBar();
    shuffleArray(questions);
    nextBtn.innerHTML= "Next Question";

    //  display first question
    displayQuestion(questions[questionIndex]);
}

//  function to display a question
function displayQuestion(questionObj){
    clear();
    const currentQuestion = questionObj;
    const questionNum = questionIndex + 1;
    questionDisplay.innerHTML = currentQuestion.question;
    const shuffledAnswers = shuffleArray(currentQuestion.answers);

    //  displays shuffled answers
    shuffledAnswers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);

        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", checkAnswer);
    });
}

// shuffle algorithm to randomize order of question/answer in the array
function shuffleArray(array){
    for (let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


//  function to check the user's answer
function checkAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    const correctBtn = answerBtn.querySelector("[data-correct=true]");


    //  will apply styles based on which answer is correct
    if (!isCorrect){
        selectedBtn.classList.add("incorrect");
        correctBtn.classList.add("correct");
    } else{
        selectedBtn.classList.add("correct");
        score++;
    }

    //  disables answer buttons after selection
    Array.from(answerBtn.children).forEach(button => {
        button.disabled = true;
    });

    //  display 'next question' button 
    nextBtn.style.display = "block";
}

//  function to clear previous answer or question content
function clear(){
    nextBtn.style.display = "none";
    answerBtn.innerHTML = "";
}

//  function to display final score and percentage
function scoreDisplay(){
    clear();
    const totalQuestions = questions.length;
    const percentage = ((score / totalQuestions) * 100).toFixed(2);
    const scoreDisplay = `Total Score: ${score} out of ${totalQuestions} (${percentage}%)`;
    questionDisplay.innerHTML = scoreDisplay;
    nextBtn.innerHTML = "Try Again";
    nextBtn.style.display = "block";
}

//  function to display feedback form
function showFeedbackForm(){
    const feedbackForm = document.getElementById("feedback-form");
    feedbackForm.style.display = "block";
}

//  function to hide feedback form
function hideFeedbackForm(){
    const feedbackForm = document.getElementById("feedback-form");
    feedbackForm.style.display = "none";
}

//  function to handle 'next question' click
function handleNextButton(){
    questionIndex++;
    if(questionIndex < questions.length){
        displayQuestion(questions[questionIndex]);
        updateProgressBar()
    }
    else{
        scoreDisplay();
        showFeedbackForm();
    }
}

//  event listener for 'next question' button
nextBtn.addEventListener("click", ()=>{
    if(questionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
        hideFeedbackForm();
    }
});

//  function to update progress bar
function updateProgressBar(){
    const progress = ((questionIndex + 1) / questions.length) * 100;
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = `${progress}%`;

    // checks if progress counter exists
    let progressCounter = document.querySelector(".progress-counter");
    if (!progressCounter) {
        progressCounter = document.createElement("div");
        progressCounter.classList.add("progress-counter");
        progressBar.appendChild(progressCounter);
    }
    // update progress counter text
    progressCounter.innerText = `${questionIndex + 1} / ${questions.length}`;
}

//  function to handle username submission and start the quiz
$(document).ready(function(){
    const usernameForm = document.getElementById("username-form");
    const usernameInput = document.getElementById("username-input");
    const submitUsernameButton = document.getElementById("submit-username");
    const userGreeting = document.getElementById("user-greeting");
    const quizContainer = document.querySelector(".quiz");

    //  event listener for username submission
    submitUsernameButton.addEventListener("click", function(){
        const username = usernameInput.value.trim();
        if(username !== ""){
            //  show quiz and greet user
            showQuiz(username);
        }
    });

    //  function to show quiz after user submits username
    function showQuiz(username){
        //  hide username form and show user greeting
        usernameForm.style.display = "none";
        userGreeting.innerText = `Welcome, ${username}!`;
        userGreeting.style.display = "block";
        //  display quiz container and start quiz
        quizContainer.style.display = "block";
        startQuiz();
        updateProgressBar()
    }
});

//  feedbackForm event listener to verify that user submitted feedback
feedbackForm.addEventListener("submit", function(event){
    event.preventDefault();
    //  retrieve feedback input value
    const feedbackInput = document.getElementById("feedback-input").value;
    //  log feedback
    console.log("Feedback submitted:", feedbackInput);
    //  clear feedback input and hide form
    document.getElementById("feedback-input").value = "";
    feedbackForm.style.display = "none";
    //  call feedback submission alert
    alert("Thank you for your feedback!");
});

//  event listener for reset button
document.getElementById("reset-button").addEventListener("click", function(){
    //  refreshes page to reset username input
    location.reload();
});

