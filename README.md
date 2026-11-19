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

## Project files

- `index.html` contains the game structure and controls.
- `css/style.css` contains the responsive layout and visual styling.
- `js/script.js` generates the secret number, validates guesses, and manages rounds.
