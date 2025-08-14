// MCQ Array CIRCULATION CHAPTER
const Stoichiometry_mcqs = [
  {
    question: "Study of living matter is called",
    options: [
      "a) Biometry",
      "b) Biochemistry",
      "c) Biotechnology",
      "d) Anatomy",
    ],
    answer: 1,
  },
];

let currentPage = 1;
const perPage = 10;

// Shuffle questions so they appear in random order each time
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffleArray(Stoichiometry_mcqs);

let userAnswers = new Array(Stoichiometry_mcqs.length).fill(null);
let markedResults = new Array(Stoichiometry_mcqs.length).fill(null); // store "correct" or "wrong"

function renderPage() {
  const container = document.getElementById("mcqs-container");
  container.innerHTML = "";

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const pageMcqs = Stoichiometry_mcqs.slice(start, end);

  pageMcqs.forEach((mcq, index) => {
    const card = document.createElement("div");
    card.className = "mcq-card";
    const qIndex = start + index;

    // Heading with correct/wrong color if marked
    let headingClass = "";
    if (markedResults[qIndex] === "correct") headingClass = "correct-heading";
    else if (markedResults[qIndex] === "wrong") headingClass = "wrong-heading";

    card.innerHTML = `<h3 class="${headingClass}">Q${qIndex + 1}: ${mcq.question}</h3>`;

    mcq.options.forEach((option, i) => {
      const checked = userAnswers[qIndex] === i ? "checked" : "";
      let optionClass = "";
      if (markedResults[qIndex] === "correct" && i === mcq.answer) {
        optionClass = "correct";
      } else if (markedResults[qIndex] === "wrong") {
        if (i === mcq.answer) optionClass = "correct";
        else if (userAnswers[qIndex] === i) optionClass = "wrong";
      }

      card.innerHTML += `<label class="${optionClass}">
        <input type="radio" name="q${qIndex}" value="${i}" ${checked} onchange="saveAnswer(${qIndex}, ${i})">
        ${option}
      </label>`;
    });

    // Show explanation only after answers are checked
    if (markedResults[qIndex] !== null) {
      card.innerHTML += `<div class="explanation"><strong>Explanation:</strong> ${mcq.explanation}</div>`;
    }

    container.appendChild(card);
  });

  document.getElementById("prevBtn").disabled = currentPage === 1;
  document.getElementById("nextBtn").style.display =
    currentPage * perPage >= Stoichiometry_mcqs.length? "none" : "inline-block";
  document.getElementById("checkBtn").style.display =
    currentPage * perPage >= Stoichiometry_mcqs.length ? "inline-block" : "none";
}

function saveAnswer(qIndex, answer) {
  userAnswers[qIndex] = answer;
}

function nextPage() {
  if (currentPage * perPage < Stoichiometry_mcqs.length) {
    currentPage++;
    renderPage();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
  }
}
function nextPage() {
  if (currentPage * perPage < Stoichiometry_mcqs.length) {
    currentPage++;
    renderPage();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    }); // scroll to top after rendering next page
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
    // No scroll on previous page
  }
}


function checkAnswers() {
  // Check if any question is unanswered
  const unanswered = userAnswers.some((answer) => answer === null);
  if (unanswered) {
    alert("You must attempt all questions before checking the score!");
    return; // Stop function if not all answered
  }

  let score = 0;
  Stoichiometry_mcqs.forEach((mcq, index) => {
    if (userAnswers[index] === mcq.answer) {
      markedResults[index] = "correct";
      score++;
    } else {
      markedResults[index] = "wrong";
    }
  });

  document.getElementById(
    "final-score"
  ).innerHTML = `Your Total Score: ${score} / ${Stoichiometry_mcqs.length}`;
  document.getElementById("final-score").style.display = "block";

  renderPage(); // re-render to apply colors & show explanations
}

renderPage();
