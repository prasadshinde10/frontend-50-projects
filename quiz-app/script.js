const questions = [
  { q: "HTML stands for?", a: ["Hyper Text Markup Language", "Home Tool Markup"], correct: 0 },
  { q: "CSS is used for?", a: ["Structure", "Styling"], correct: 1 }
];

let index = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  const current = questions[index];
  questionEl.textContent = current.q;
  answersEl.innerHTML = "";
  current.a.forEach((ans, i) => {
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.onclick = () => {
      if (i === current.correct) score++;
      index++;
      if (index < questions.length) loadQuestion();
      else {
        questionEl.textContent = "Quiz completed!";
        answersEl.innerHTML = "";
        scoreEl.textContent = `Score: ${score}/${questions.length}`;
      }
    };
    answersEl.appendChild(btn);
  });
}

loadQuestion();