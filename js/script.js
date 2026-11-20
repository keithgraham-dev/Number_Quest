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

function startNewRound() {
  currentDifficulty = difficulties[difficultySelect.value];
  const rangeSize = currentDifficulty.max - currentDifficulty.min + 1;
  secretNumber = Math.floor(Math.random() * rangeSize) + currentDifficulty.min;
  attempts = 0;
  roundIsOver = false;

  guessInput.value = "";
  guessInput.disabled = false;
  guessButton.disabled = false;
  guessInput.min = currentDifficulty.min;
  guessInput.max = currentDifficulty.max;
  guessInput.placeholder = `Enter ${currentDifficulty.min}–${currentDifficulty.max}`;
  currentDifficultyDisplay.textContent = `Difficulty: ${currentDifficulty.name}`;
  attemptsDisplay.textContent = `Attempts: 0 / ${currentDifficulty.maxAttempts}`;
  remainingAttemptsDisplay.textContent = `Remaining attempts: ${currentDifficulty.maxAttempts}`;
  feedback.textContent = `Guess a number from ${currentDifficulty.min} to ${currentDifficulty.max}.`;
}

function endRound(message, baseScore = 0, efficiencyBonus = 0) {
  if (roundIsOver) {
    return;
  }

  const roundScore = baseScore + efficiencyBonus;
  sessionScore += roundScore;

  feedback.textContent = message;
  roundIsOver = true;
  guessInput.disabled = true;
  guessButton.disabled = true;
  latestRoundScoreDisplay.textContent = `Latest round score: ${roundScore} points`;
  scoreBreakdownDisplay.textContent =
    `Base points: ${baseScore} + Efficiency bonus: ${efficiencyBonus} = ${roundScore} points.`;
  sessionScoreDisplay.textContent = `Session score: ${sessionScore} points`;
}

function handleGuess(event) {
  event.preventDefault();

  if (roundIsOver) {
    return;
  }

  const enteredValue = guessInput.value.trim();

  if (enteredValue === "") {
    feedback.textContent = `Please enter a number from ${currentDifficulty.min} to ${currentDifficulty.max}.`;
    guessInput.focus();
    return;
  }

  const guess = Number(enteredValue);

  if (!Number.isInteger(guess)) {
    feedback.textContent = "Please enter a whole number.";
    guessInput.focus();
    return;
  }

  if (guess < currentDifficulty.min || guess > currentDifficulty.max) {
    feedback.textContent = `Your guess must be between ${currentDifficulty.min} and ${currentDifficulty.max}.`;
    guessInput.focus();
    return;
  }

  attempts += 1;
  const remainingAttempts = currentDifficulty.maxAttempts - attempts;
  attemptsDisplay.textContent = `Attempts: ${attempts} / ${currentDifficulty.maxAttempts}`;
  remainingAttemptsDisplay.textContent = `Remaining attempts: ${remainingAttempts}`;

  if (guess === secretNumber) {
    const efficiencyBonus = Math.round(
      remainingAttempts * currentDifficulty.baseScore * 0.1
    );
    endRound(
      `You got it! The secret number was ${secretNumber}.`,
      currentDifficulty.baseScore,
      efficiencyBonus
    );
  } else if (remainingAttempts === 0) {
    endRound(`Out of attempts! The secret number was ${secretNumber}.`);
  } else if (guess > secretNumber) {
    feedback.textContent = "Too high! Try again.";
  } else {
    feedback.textContent = "Too low! Try again.";
  }

  if (!roundIsOver) {
    guessInput.select();
  }
}

guessForm.addEventListener("submit", handleGuess);
restartButton.addEventListener("click", () => {
  startNewRound();
  guessInput.focus();
});
difficultySelect.addEventListener("change", startNewRound);
newSessionButton.addEventListener("click", () => {
  sessionScore = 0;
  latestRoundScoreDisplay.textContent = "Latest round score: Not completed";
  scoreBreakdownDisplay.textContent = "Complete a round to see the base points and efficiency bonus.";
  sessionScoreDisplay.textContent = "Session score: 0 points";
  startNewRound();
  guessInput.focus();
});

startNewRound();
