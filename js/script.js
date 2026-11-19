const guessForm = document.querySelector("#guess-form");
const guessInput = document.querySelector("#guess-input");
const feedback = document.querySelector("#feedback");
const attemptsDisplay = document.querySelector("#attempts");
const restartButton = document.querySelector("#restart-button");

let secretNumber;
let attempts;
let roundIsOver;

function startNewRound() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  roundIsOver = false;

  guessInput.value = "";
  guessInput.disabled = false;
  guessForm.querySelector('button[type="submit"]').disabled = false;
  feedback.textContent = "Make your first guess to begin.";
  attemptsDisplay.textContent = "Attempts: 0";
  guessInput.focus();
}

function handleGuess(event) {
  event.preventDefault();

  if (roundIsOver) {
    return;
  }

  const enteredValue = guessInput.value.trim();

  if (enteredValue === "") {
    feedback.textContent = "Please enter a number from 1 to 100.";
    guessInput.focus();
    return;
  }

  const guess = Number(enteredValue);

  if (!Number.isInteger(guess)) {
    feedback.textContent = "Please enter a whole number.";
    guessInput.focus();
    return;
  }

  if (guess < 1 || guess > 100) {
    feedback.textContent = "Your guess must be between 1 and 100.";
    guessInput.focus();
    return;
  }

  attempts += 1;
  attemptsDisplay.textContent = `Attempts: ${attempts}`;

  if (guess > secretNumber) {
    feedback.textContent = "Too high! Try again.";
  } else if (guess < secretNumber) {
    feedback.textContent = "Too low! Try again.";
  } else {
    feedback.textContent = `You got it! The secret number was ${secretNumber}.`;
    roundIsOver = true;
    guessInput.disabled = true;
    guessForm.querySelector('button[type="submit"]').disabled = true;
  }

  if (!roundIsOver) {
    guessInput.select();
  }
}

guessForm.addEventListener("submit", handleGuess);
restartButton.addEventListener("click", startNewRound);

startNewRound();
