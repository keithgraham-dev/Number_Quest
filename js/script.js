const guessForm = document.querySelector("#guess-form");
const guessInput = document.querySelector("#guess-input");
const guessButton = guessForm.querySelector('button[type="submit"]');
const feedback = document.querySelector("#feedback");
const difficultySelect = document.querySelector("#difficulty-select");
const currentDifficultyDisplay = document.querySelector("#current-difficulty");
const attemptsDisplay = document.querySelector("#attempts");
const remainingAttemptsDisplay = document.querySelector("#remaining-attempts");
const restartButton = document.querySelector("#restart-button");
const newSessionButton = document.querySelector("#new-session-button");
const newSessionDialog = document.querySelector("#new-session-dialog");
const cancelNewSessionButton = document.querySelector("#cancel-new-session");
const confirmNewSessionButton = document.querySelector("#confirm-new-session");
const resultPanel = document.querySelector("#result-panel");
const resultIcon = document.querySelector("#result-icon");
const resultHeading = document.querySelector("#result-heading");
const resultMessage = document.querySelector("#result-message");
const resultSecret = document.querySelector("#result-secret");
const resultAttempts = document.querySelector("#result-attempts");
const resultRoundScore = document.querySelector("#result-round-score");
const resultScoreBreakdown = document.querySelector("#result-score-breakdown");
const resultRestartButton = document.querySelector("#result-restart-button");
const latestRoundScoreDisplay = document.querySelector("#latest-round-score");
const scoreBreakdownDisplay = document.querySelector("#score-breakdown");
const sessionScoreDisplay = document.querySelector("#session-score");

const difficulties = {
  easy: { name: "Easy", min: 1, max: 50, maxAttempts: 10, baseScore: 100 },
  medium: { name: "Medium", min: 1, max: 100, maxAttempts: 7, baseScore: 150 },
  hard: { name: "Hard", min: 1, max: 500, maxAttempts: 8, baseScore: 250 }
};

let secretNumber;
let attempts;
let roundIsOver;
let currentDifficulty;
let sessionScore = 0;

function setFeedback(message, state) {
  feedback.textContent = message;
  feedback.className = `feedback feedback--${state}`;
}

function startNewRound(shouldFocusGuess = false) {
  currentDifficulty = difficulties[difficultySelect.value];
  const rangeSize = currentDifficulty.max - currentDifficulty.min + 1;
  secretNumber = Math.floor(Math.random() * rangeSize) + currentDifficulty.min;
  attempts = 0;
  roundIsOver = false;

  guessInput.value = "";
  guessInput.disabled = false;
  guessButton.disabled = false;
  resultPanel.hidden = true;
  resultPanel.classList.remove("result-panel--victory", "result-panel--defeat");
  feedback.hidden = false;
  guessInput.min = currentDifficulty.min;
  guessInput.max = currentDifficulty.max;
  guessInput.placeholder = `Enter ${currentDifficulty.min}–${currentDifficulty.max}`;
  currentDifficultyDisplay.textContent = `Difficulty: ${currentDifficulty.name}`;
  attemptsDisplay.textContent = `Attempts: 0 / ${currentDifficulty.maxAttempts}`;
  remainingAttemptsDisplay.textContent = `Remaining attempts: ${currentDifficulty.maxAttempts}`;
  setFeedback(`Guess a number from ${currentDifficulty.min} to ${currentDifficulty.max}.`, "neutral");

  if (shouldFocusGuess) {
    guessInput.focus();
  }
}

function endRound(won) {
  if (roundIsOver) {
    return;
  }

  roundIsOver = true;
  guessInput.disabled = true;
  guessButton.disabled = true;

  const remainingAttempts = currentDifficulty.maxAttempts - attempts;
  const baseScore = won ? currentDifficulty.baseScore : 0;
  const efficiencyBonus = won
    ? Math.round(remainingAttempts * currentDifficulty.baseScore * 0.1)
    : 0;
  const roundScore = baseScore + efficiencyBonus;
  sessionScore += roundScore;

  latestRoundScoreDisplay.textContent = `Latest round score: ${roundScore} points`;
  scoreBreakdownDisplay.textContent =
    `Base points: ${baseScore} + Efficiency bonus: ${efficiencyBonus} = ${roundScore} points.`;
  sessionScoreDisplay.textContent = `Session score: ${sessionScore} points`;

  feedback.hidden = true;
  resultPanel.className = `result-panel result-panel--${won ? "victory" : "defeat"}`;
  resultIcon.textContent = won ? "✓" : "!";
  resultHeading.textContent = won ? "Victory!" : "Game Over";
  resultMessage.textContent = won
    ? "You found the secret number!"
    : "Your attempts are up. Try another round!";
  resultSecret.textContent = `Secret number: ${secretNumber}`;
  resultAttempts.textContent = `Attempts used: ${attempts}`;
  resultRoundScore.textContent = won
    ? `Round score: ${roundScore} points`
    : "Points earned: 0 points";
  resultScoreBreakdown.textContent =
    `Base points: ${baseScore} + Efficiency bonus: ${efficiencyBonus} = ${roundScore} points.`;
  resultRestartButton.textContent = won ? "Play again" : "Try again";
  resultPanel.hidden = false;
  resultHeading.focus();
}

function handleGuess(event) {
  event.preventDefault();

  if (roundIsOver) {
    return;
  }

  const enteredValue = guessInput.value.trim();

  if (enteredValue === "") {
    setFeedback(
      `Please enter a number from ${currentDifficulty.min} to ${currentDifficulty.max}.`,
      "invalid"
    );
    guessInput.focus();
    return;
  }

  const guess = Number(enteredValue);

  if (!Number.isInteger(guess)) {
    setFeedback("Please enter a whole number.", "invalid");
    guessInput.focus();
    return;
  }

  if (guess < currentDifficulty.min || guess > currentDifficulty.max) {
    setFeedback(
      `Your guess must be between ${currentDifficulty.min} and ${currentDifficulty.max}.`,
      "invalid"
    );
    guessInput.focus();
    return;
  }

  guessInput.value = "";
  attempts += 1;
  const remainingAttempts = currentDifficulty.maxAttempts - attempts;
  attemptsDisplay.textContent = `Attempts: ${attempts} / ${currentDifficulty.maxAttempts}`;
  remainingAttemptsDisplay.textContent = `Remaining attempts: ${remainingAttempts}`;

  if (guess === secretNumber) {
    endRound(true);
  } else if (remainingAttempts === 0) {
    endRound(false);
  } else if (guess > secretNumber) {
    setFeedback("Too high! Try again.", "high");
  } else {
    setFeedback("Too low! Try again.", "low");
  }
}

guessForm.addEventListener("submit", handleGuess);
restartButton.addEventListener("click", () => startNewRound(true));
resultRestartButton.addEventListener("click", () => startNewRound(true));
difficultySelect.addEventListener("change", () => startNewRound(true));
newSessionButton.addEventListener("click", () => {
  newSessionDialog.showModal();
});
cancelNewSessionButton.addEventListener("click", () => {
  newSessionDialog.close();
});
confirmNewSessionButton.addEventListener("click", () => {
  newSessionDialog.close();
  sessionScore = 0;
  sessionScoreDisplay.textContent = "Session score: 0 points";
  startNewRound(true);
});

startNewRound();
