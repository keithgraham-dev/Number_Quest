# Number Quest

A browser-based number guessing game built with HTML, CSS, and vanilla JavaScript.

## Run the game

Open `index.html` in a modern web browser. No installation or build step is needed.

## How to play

Choose a difficulty and enter a whole number within its range. The game tells you
whether your guess is too high or too low. A correct guess wins the round. Wrong
guesses use an attempt; using all available attempts reveals the secret number.

| Difficulty | Number range | Maximum attempts |
| --- | --- | --- |
| Easy | 1–50 | 10 |
| Medium | 1–100 | 7 |
| Hard | 1–500 | 8 |

Only valid guesses count. Changing the difficulty starts a new round, and
**Restart round** starts a new round at the currently selected difficulty.
Completed rounds show a result panel with the secret number, attempts used, and
score details. The **New Session** control asks for confirmation before resetting
the cumulative session score.

## Scoring

Wins earn the difficulty's base score plus 10% of that score for each unused
attempt. Losses earn zero points. The latest completed round's score and
breakdown, along with the cumulative session score, appear in the game. Restarting
or changing difficulty preserves the session score and latest completed round.
Confirming **New Session** resets the session score and clears the latest-round
display until the next round ends.

| Difficulty | Base score |
| --- | ---: |
| Easy | 100 |
| Medium | 150 |
| Hard | 250 |

## Project files

- `index.html` contains the game structure and controls.
- `css/style.css` contains the responsive layout and visual styling.
- `js/script.js` generates the secret number, validates guesses, and manages rounds.
