// Gathering HTML elements for manipulation
var quizMain = document.getElementById("quiz");
var questionsEl = document.getElementById("questions");
var startQuizDiv = document.getElementById("startpage");
var startQuizButton = document.getElementById("startbtn");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var timerEl = document.getElementById("timer");
var highScoreCon = document.getElementById("highscoreContainer");
var highScoreDiv = document.getElementById("high-scorePage");
var highScoreInitials = document.getElementById("initials");
var highScoreDisplayName = document.getElementById("highscore-initials");
var endGameButtons = document.getElementById("endGameButtons");
var submitScoreButton = document.getElementById("submitScore");
var highScoreDisplayScore = document.getElementById("highscore-score");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameOverDiv = document.getElementById("gameover");

// Quiz question object
var quizQuestions = [
  {
    question: "How many continents are there?",
    choiceA: "8",
    choiceB: "7",
    choiceC: "9",
    choiceD: "6",
    correctAnswer: "b",
  },
  {
    question: "What is the capital of New Zealand?",
    choiceA: "Auckland",
    choiceB: "Christchurch",
    choiceC: "Wellington",
    choiceD: "Dunedin",
    correctAnswer: "c",
  },
  {
    question: "In what ocean is the island country of Comoros?",
    choiceA: "Indian Ocean",
    choiceB: "Atlantic Ocean",
    choiceC: "Pacific Ocean",
    choiceD: "Arctic Ocean",
    correctAnswer: "a",
  },
  {
    question: "Where is Cape Horn located?",
    choiceA: "South Africa",
    choiceB: "Argentina",
    choiceC: "Australia",
    choiceD: "Chile",
    correctAnswer: "d",
  },
  {
    question: "What does aurora borealis mean?",
    choiceA: "Northern Sea",
    choiceB: "Night Sky",
    choiceC: "Southern Lights",
    choiceD: "Northern Lights",
    correctAnswer: "d",
  },
  {
    question: "What is the capital of Mongolia?",
    choiceA: "Yerevan",
    choiceB: "Tbilisi",
    choiceC: "Ulaanbaatar",
    choiceD: "Bishkek",
    correctAnswer: "c",
  },
  {
    question: "Where is Lapland?",
    choiceA: "Finland",
    choiceB: "Sweden",
    choiceC: "Denmark",
    choiceD: "Norway",
    correctAnswer: "a",
  },
  {
    question: "How many Great Lakes are there?",
    choiceA: "6",
    choiceB: "4",
    choiceC: "5",
    choiceD: "7",
    correctAnswer: "c",
  },
  {
    question: "Where are the Zagros Mountains?",
    choiceA: "Croatia",
    choiceB: "Iran",
    choiceC: "Iraq",
    choiceD: "Armenia",
    correctAnswer: "c",
  },
];
// Other global variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 100;
var timerInterval;
var score = 0;
var correct;

// This function cycles through the object array containing the quiz questions to generate the questions and answers.
function generateQuizQuestion() {
  gameOverDiv.style.display = "none";
  if (currentQuestionIndex === finalQuestionIndex) {
    return showScore();
  }
  var currentQuestion = quizQuestions[currentQuestionIndex];
  questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
  buttonA.innerHTML = currentQuestion.choiceA;
  buttonB.innerHTML = currentQuestion.choiceB;
  buttonC.innerHTML = currentQuestion.choiceC;
  buttonD.innerHTML = currentQuestion.choiceD;
}

// Start Quiz function starts the TimeRanges, hides the start button, and displays the first quiz question.
function startQuiz() {
  gameOverDiv.style.display = "none";
  startQuizDiv.style.display = "none";
  generateQuizQuestion();

  //Timer
  timerInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = "Time left: " + timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      showScore();
    }
  }, 1000);
  quizMain.style.display = "block";
}
// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
function showScore() {
  quizMain.style.display = "none";
  gameOverDiv.style.display = "flex";
  clearInterval(timerInterval);
  highScoreInitials.value = "";
  finalScoreEl.innerHTML =
    "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// On click of the submit button, we run the function highscore that saves and stringifies the array of high scores already saved in local stoage
// as well as pushing the new user name and score into the array we are saving in local storage. Then it runs the function to show high scores.
submitScoreButton.addEventListener("click", function highscore() {
  if (highScoreInitials.value === "") {
    alert("Initials cannot be blank");
    return false;
  } else {
    var savedHighscores =
      JSON.parse(localStorage.getItem("savedHighscores")) || [];
    var currentUser = highScoreInitials.value.trim();
    var currentHighscore = {
      name: currentUser,
      score: score,
    };

    gameOverDiv.style.display = "none";
    highScoreCon.style.display = "flex";
    highScoreDiv.style.display = "block";
    endGameButtons.style.display = "flex";

    savedHighscores.push(currentHighscore);
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
    generateHighscores();
  }
});

// This function clears the list for the high scores and generates a new high score list from local storage
function generateHighscores() {
  highScoreDisplayName.innerHTML = "";
  highScoreDisplayScore.innerHTML = "";
  var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
  for (i = 0; i < highscores.length; i++) {
    var newNameSpan = document.createElement("li");
    var newScoreSpan = document.createElement("li");
    newNameSpan.textContent = highscores[i].name;
    newScoreSpan.textContent = highscores[i].score;
    highScoreDisplayName.appendChild(newNameSpan);
    highScoreDisplayScore.appendChild(newScoreSpan);
  }
}

// This function displays the high scores page while hiding all of the other pages from
function showHighscore() {
  startQuizDiv.style.display = "none";
  gameOverDiv.style.display = "none";
  highScoreCon.style.display = "flex";
  highScoreDiv.style.display = "block";
  endGameButtons.style.display = "flex";

  generateHighscores();
}

// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore() {
  window.localStorage.clear();
  highScoreDisplayName.textContent = "";
  highScoreDisplayScore.textContent = "";
}

// This function sets all the variables back to their original values and shows the home page to enable replay of the quiz
function replayQuiz() {
  highScoreCon.style.display = "none";
  gameOverDiv.style.display = "none";
  startQuizDiv.style.display = "flex";
  timeLeft = 100;
  score = 0;
  currentQuestionIndex = 0;
}

// This function checks the response to each answer
function checkAnswer(answer) {
  correct = quizQuestions[currentQuestionIndex].correctAnswer;

  if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
    score++;
    alert("Correct!");
    currentQuestionIndex++;
    generateQuizQuestion();
    //display in the results div that the answer is correct.
  } else if (
    answer !== correct &&
    currentQuestionIndex !== finalQuestionIndex
  ) {
    alert("Incorrect");
    currentQuestionIndex++;
    generateQuizQuestion();
    //display in the results div that the answer is wrong.
  } else {
    showScore();
  }
}

// This button starts the quiz!
startQuizButton.addEventListener("click", startQuiz);
