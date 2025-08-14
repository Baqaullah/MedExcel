let currentPage = 1;
const perPage = 10;

// Shuffle questions so they appear in random order each time
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffleArray(circulation_mcqs);

let userAnswers = new Array(circulation_mcqs.length).fill(null);
let markedResults = new Array(circulation_mcqs.length).fill(null); // store "correct" or "wrong"

function renderPage() {
  const container = document.getElementById("mcqs-container");
  container.innerHTML = "";

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const pageMcqs = circulation_mcqs.slice(start, end);

  pageMcqs.forEach((circulation_mcqs, index) => {
    const card = document.createElement("div");
    card.className = "mcq-card";
    const qIndex = start + index;

    // Heading with correct/wrong color if marked
    let headingClass = "";
    if (markedResults[qIndex] === "correct") headingClass = "correct-heading";
    else if (markedResults[qIndex] === "wrong") headingClass = "wrong-heading";

    card.innerHTML = `<h3 class="${headingClass}">Q${qIndex + 1}: ${circulation_mcqs.question}</h3>`;

    circulation_mcqs.options.forEach((option, i) => {
      const checked = userAnswers[qIndex] === i ? "checked" : "";
      let optionClass = "";
      if (markedResults[qIndex] === "correct" && i === circulation_mcqs.answer) {
        optionClass = "correct";
      } else if (markedResults[qIndex] === "wrong") {
        if (i === circulation_mcqs.answer) optionClass = "correct";
        else if (userAnswers[qIndex] === i) optionClass = "wrong";
      }

      card.innerHTML += `<label class="${optionClass}">
        <input type="radio" name="q${qIndex}" value="${i}" ${checked} onchange="saveAnswer(${qIndex}, ${i})">
        ${option}
      </label>`;
    });

    container.appendChild(card);
  });

  document.getElementById("prevBtn").disabled = currentPage === 1;
  document.getElementById("nextBtn").style.display = currentPage * perPage >= circulation_mcqs.length ? "none" : "inline-block";
  document.getElementById("checkBtn").style.display = currentPage * perPage >= circulation_mcqs.length ? "inline-block" : "none";
}

function saveAnswer(qIndex, answer) {
  userAnswers[qIndex] = answer;
}

function nextPage() {
  if (currentPage * perPage < circulation_mcqs.length) {
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

function checkAnswers() {
  // Check if any question is unanswered
  const unanswered = userAnswers.some(answer => answer === null);
  if (unanswered) {
    alert("You must attempt all questions before checking the score!");
    return; // Stop function if not all answered
  }

  let score = 0;
  mcqs.forEach((circulation_mcqs, index) => {
    if (userAnswers[index] === circulation_mcqs.answer) {
      markedResults[index] = "correct";
      score++;
    } else {
      markedResults[index] = "wrong";
    }
  });

  document.getElementById("final-score").innerHTML = `Your Total Score: ${score} / ${circulation_mcqs.length}`;
  document.getElementById("final-score").style.display = "block";

  renderPage(); // re-render to apply colors to all pages
}

renderPage();



function nextPage() {
  if (currentPage * perPage < Enzymes_mcqs.length) {
    currentPage++;
    renderPage();
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top smoothly
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top smoothly
  }
}

