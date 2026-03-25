const questions = [
  {
    question: "Which language runs in the browser?",
    options: ["Python", "Java", "C++", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Central Style Sheets", "Cascading Style Sheets", "Computer Style System", "Creative Style Syntax"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "<!-- -->", "#", "**"],
    answer: "//"
  },
  {
    question: "Which method converts JSON to object?",
    options: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.convert()"],
    answer: "JSON.parse()"
  },
  {
    question: "Which keyword declares a variable?",
    options: ["var", "int", "string", "define"],
    answer: "var"
  }
];

let shuffledQuestions = [];
let currentIndex = 0;
let timer;
let timeLeft = 10;

let score = {
  correct: 0,
  wrong: 0,
  unanswered: 0
};

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startQuiz() {
  shuffledQuestions = shuffle([...questions]);
  currentIndex = 0;
  score = { correct: 0, wrong: 0, unanswered: 0 };
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timer);  //Purana timer band
  timeLeft = 10;   //Time reset

  const q = shuffledQuestions[currentIndex];
  document.getElementById("progress").innerText =
    `Question ${currentIndex + 1} / ${shuffledQuestions.length}`;

  document.getElementById("question").innerText = q.question;
  document.getElementById("result").innerText = "";

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  shuffle([...q.options]).forEach(option => {  
    const btn = document.createElement("button");    //Har option ke liye button ban raha hai.
    btn.innerText = option; 
    btn.className = "option-btn";
    btn.onclick = () => selectAnswer(btn, option);  //Button dabaya aur Answer check ho
    optionsDiv.appendChild(btn);
  });

  updateTimer();
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {     //Screen pe countdown show.
  document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;

  if (timeLeft === 0) {      //Time gaya , Skip count and Correct answer highlight kre ga
    clearInterval(timer);    //Timer band
    score.unanswered++;
    showCorrectAnswer();
    setTimeout(nextQuestion, 2000);
  }

  timeLeft--;
}

function selectAnswer(button, selected) {
  clearInterval(timer);

  const correctAnswer = shuffledQuestions[currentIndex].answer;
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach(btn => btn.disabled = true);

  if (selected === correctAnswer) {
    button.classList.add("correct");  //Match hoga toh Green color show hoga or correct dega
    score.correct++;
  } else {
    button.classList.add("wrong");     //Nahi hoga toh  Red color show hoga or wrong dega
    score.correct++; wrong++
    score.wrong++;
    showCorrectAnswer();
  }

  setTimeout(nextQuestion, 2000);
}

function showCorrectAnswer() {  //Agar galat ya time over , Correct option green ho jata hai.-+
  const correctAnswer = shuffledQuestions[currentIndex].answer;
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach(btn => {
    if (btn.innerText === correctAnswer) {
      btn.classList.add("correct");
    }
  });
}

function nextQuestion() {
  currentIndex++;

  if (currentIndex < shuffledQuestions.length) {
    loadQuestion();
  } else {
    showFinalScore();
  }
}

function showFinalScore() {
  document.getElementById("question").innerText = "Quiz Completed!";
  document.getElementById("options").innerHTML = "";
  document.getElementById("timer").innerText = "";

  document.getElementById("result").innerHTML = `
    ✅ Correct: ${score.correct} <br>
    ❌ Wrong: ${score.wrong} <br>
    ⏳ Unanswered: ${score.unanswered}
  `;
}

function restartQuiz() {
  startQuiz();
}

startQuiz();