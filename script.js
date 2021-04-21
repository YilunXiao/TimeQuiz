// DEPENDENCIES
var timer = document.getElementById("timer");
var userScore = document.getElementById("userScore");
var startBtn = document.getElementById("startButton");
var ansGroup = document.getElementById("answerGroup");
var question = document.getElementById("question");


// VARIABLES
var time;
var answerIndex;
var questionIndex = 0;
var score;
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
// Starts the quiz and timer
function startQuiz() {
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
        }
    } else if (buttonIndex) {
        time = time - 10;
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
    var timeInterval = setInterval(function() {
        // Update and display remaining time
        time--;
        timer.innerText = "Time left: " + time;
        console.log(time);
        // Exit if time hits 0
        if (time <= 0) {
            clearInterval(timeInterval);
        }
    },1000);
}




// Reduce time

// EVENT LISTENERS
startBtn.addEventListener("click", startQuiz);
ansGroup.addEventListener("click", checkAnswer);

// INITIALIZATION