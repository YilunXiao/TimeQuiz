// DEPENDENCIES
var timer = document.getElementById("timer");
var title = document.getElementById("pageTitle");
var welcome = document.getElementById("startPage");
var quiz = document.getElementById("quizContainer");
var initials = document.getElementById("userInitials");
var submit = document.getElementById("submit");
var scoreBoard = document.getElementById("scoreBoard");
var scoreList = document.getElementById("scoreList");
var userScore = document.getElementById("userScore");
var startBtn = document.getElementById("startButton");
var ansGroup = document.getElementById("answerGroup");
var question = document.getElementById("question");
var playAgain = document.getElementById("playAgain");


// VARIABLES
var time;
var answerIndex;
var questionIndex = 0;
var userName;
var score;
var scoreRanking;
var qObjectList = [
    { 
        question: "What does HTML stands for?", 
        correct: "HyperText Markup Language", 
        incorrect1: "HighText Machine Language", 
        incorrect2: "HyperText and links Markup Language", 
        incorrect3: "Hip Turtle Mutant Language"
    },
    { 
        question: "What is the correct sequence of HTML tags for starting a webpage?", 
        correct: "HTML, Head, Title, Body", 
        incorrect1: "Head, Title, HTML, body", 
        incorrect2: "HTML, Body, Title, Head", 
        incorrect3: "HTML, title, head, Body"
    },
    { 
        question: "Which of the following element is responsible for making the text bold in HTML?", 
        correct: "<b>", 
        incorrect1: "<pre>", 
        incorrect2: "<a>", 
        incorrect3: "<br>"
    },
    { 
        question: "Which of the following tag is used for inserting the largest heading in HTML?", 
        correct: "<h1>", 
        incorrect1: "<h3>", 
        incorrect2: "<h6>", 
        incorrect3: "<h5>"
    },
    { 
        question: "Which of the following attribute is used to provide a unique name to an element?", 
        correct: "id", 
        incorrect1: "class", 
        incorrect2: "type", 
        incorrect3: "unique"
    },
]


// FUNCTIONS
function init() {
    removeElement(timer);
    removeElement(quiz);
    removeElement(initials);
    removeElement(scoreBoard);
    showElement(title);
    showElement(welcome)
}

// Starts the quiz and timer
function startQuiz() {
    questionIndex = 0;
    hideElement(title);
    hideElement(welcome);
    returnElement(quiz);
    answerIndex = popQuestion(qObjectList[questionIndex]);
    runTimer();
}

// Function for when user clicks an answer
function checkAnswer(event) {
    var buttonIndex = event.target.dataset.index;
    // If answer is correct
    if (buttonIndex == answerIndex) {
        questionIndex++; 
        // Next question if not at end of list of questions
        if (questionIndex < qObjectList.length) {
            answerIndex = popQuestion(qObjectList[questionIndex]);
        } else {
            // End game
            score = time;
            userScore.textContent = score;
            showScore();
        }
    } else if (buttonIndex) {
        time = time - 10;
    }
}

function showScore() {
    hideElement(timer);
    removeElement(quiz);
    returnElement(initials);
}

// Updates and shows scoreboard
function showScoreboard(newName) {
    var newUser = {name: newName, score: score}
    // Get local scores
    scoreRanking = JSON.parse(localStorage.getItem("scores"));
    // Compare scores
    if (!scoreRanking) {
        scoreRanking = [newUser]
    } else {
        compareScore(scoreRanking, newUser)
    }
    // Update scores
    console.log(scoreRanking);
    updateScoreboard(scoreRanking);
    // Update local data
    localStorage.setItem("scores", JSON.stringify(scoreRanking));

    removeElement(initials);
    returnElement(scoreBoard);
}
//Update scoreboard on page
function updateScoreboard(newList) {
    for (i = 0; i < newList.length; i++) {
        scoreList.children[i].textContent = newList[i].name + " " + newList[i].score;
    }
}


// Compares the new score to the current scoreboard
function compareScore(scoreList, newScore) {
    for (i = 0; i < 5; i++) {
        if (!scoreList[i]) {
            scoreList[i] = newScore;
            return;
        } else if (scoreList[i].score < newScore.score) {
            scoreList.splice(i, 0, newScore);
            if (scoreList.length > 5) {
                scoreList.pop();
            }
            return;
        }
    }
}

// Populate question and answers with a questionList object, and returns correct answer index
function popQuestion(qObject) {
    question.textContent = qObject.question;
    var choices = ["correct", "incorrect1", "incorrect2", "incorrect3"];
    choices = randomizeArray(choices);
    for (i = 0; i < 4; i++){
        ansGroup.children[i].textContent = (i + 1) + ". " + qObject[choices[i]];
    }
    return choices.indexOf("correct");
}

// Randomize then return an array
function randomizeArray(array) {
    var randomArray = [];
    while (array.length >= 1) {
        removeIndex = Math.floor(Math.random() * array.length);
        randomArray.push(array[removeIndex]);
        array.splice(removeIndex, 1);
    }
    return randomArray;
}

// Timer which runs for 5 seconds
function runTimer() {
    time = 100;
    timer.innerText = "Time left: " + time;
    returnElement(timer);
    var timeInterval = setInterval(function() {
        // Update and display remaining time
        time--;
        timer.innerText = "Time left: " + time;
        // console.log(time);
        // Exit if time hits 0
        if (time <= 0) {
            clearInterval(timeInterval);
            score = time;
            showScore();
        }
    },1000);
}

// Hide or remove element from page
function hideElement(element) {
    element.setAttribute("style", "visibility: hidden")
}
function showElement(element) {
    element.setAttribute("style", "visibility: visible")
}
function removeElement(element) {
    element.setAttribute("style", "display: none")
}
function returnElement(element) {
    element.setAttribute("style", "display: block")
}




// Reduce time

// EVENT LISTENERS
startBtn.addEventListener("click", startQuiz);
ansGroup.addEventListener("click", checkAnswer);
submit.addEventListener("click", function (event) {
    event.preventDefault();
    // console.log(initials.elements[0].value);
    showScoreboard(initials.elements[0].value);
});
playAgain.addEventListener("click", init);

// INITIALIZATION
init();