// constants
// Game types = []
// Time limit options= []
// Number of players = []
// WordChoices
const wordChoices = [
  "bird",
  "cat",
  "mouse",
  "donkey",
  "monkey",
  "eagle",
  "sheep",
  "crocodile",
  "elephant",
  "giraffe",
  "rat",
];

// State Variables
// Game type =
// time limit =
// player = {}
// Turn = 1
// Winner = null
//secretWord
let secretWord;
let letters;
let playerGuess;
let foundLetters;
let numberOfWrongGuesses;
let remainingNumberofWrongGuesses;

// Cached elements
// Text input
const word = document.querySelector(".secret-word");
const gameBtn = document.querySelector(".game-button");
const guesses = document.querySelector(".guesses");
const hiddenLetter = document.querySelectorAll(".secret-letter");

// Get a hint button
// Remaining hints
// Words left
// remain time display
// Number of players display

// event listeners
// text click
// button click

// functions
function randomPicker() {
  return Math.floor(Math.random() * wordChoices.length);
}

// <div class="secret-letter">
//           <p id="l0">d</p>
//         </div>

init();

function init() {
  secretWord = wordChoices[randomPicker()];
  letters = secretWord.split("");
  foundLetters = [];
  numberOfWrongGuesses = 3;
  remainingNumberofWrongGuesses = numberOfWrongGuesses;
  document.querySelector(".message2").innerText = "Please Save Me!";

  render();
}

function render() {
  renderGame();
}

function renderGame() {
  while (word.hasChildNodes()) {
    word.removeChild(word.firstChild);
  }
  guesses.innerHTML = `<p><span>${remainingNumberofWrongGuesses}</span>/<span>${numberOfWrongGuesses}</span> guesses remaining</p>`;
  letters.forEach((x, index) => {
    const letterContainer = document.createElement("div");
    const letterContainerp = document.createElement("p");
    letterContainerp.classList.add("secret-letter");
    letterContainerp.innerText = x;
    letterContainerp.id = index;
    letterContainerp.style.display = "none";
    letterContainer.classList.add("secret-letters");
    letterContainer.append(letterContainerp);
    word.append(letterContainer);
  });
}

function renderMessage(x) {
  const secretletter = document.querySelectorAll(".secret-letter");
  let status = [];
  secretletter.forEach((letter) => {
    status.push(letter.style.display);
  });
  console.log(x);
  if (x === 0) {
    secretletter.forEach((letter) => {
      letter.style.display = "";
    });

    document.querySelector(".message2").innerText = "Game Over";
    gameBtn.innerText = "Play Again";
    return;
  }

  if (!status.includes("none") === true) {
    document.querySelector(".message2").innerText = "Thank you for saving me";
    gameBtn.innerText = "Play Again";
  }
}

//listen for players keypress, If it is included use the index to display it on the page.
document.addEventListener("keydown", (e) => {
  playerGuess = e.key;
  console.log(playerGuess);
  // check if the letter is included in the letters list.
  if (letters.includes(playerGuess)) {
    console.log("correct");

    // Push the letter into a new array so we can keep track of th letters we have guessed correctly.If pleayer chooses a letter that has previousy been selected, do nothing.
    if (!foundLetters.includes(playerGuess)) {
      document.querySelector(".message").innerText =
        "Correct, make another guess";
      foundLetters.push(playerGuess);
      console.log(foundLetters);

      letters.map((item, idx) => {
        if (playerGuess === item) {
          document.getElementById(idx).style.display = "";
        }
      });
    }
  } else {
    console.log("wrong");
    if (remainingNumberofWrongGuesses > 0) {
      remainingNumberofWrongGuesses--;
    }
    guesses.innerHTML = `<p><span>${remainingNumberofWrongGuesses}</span>/<span>${numberOfWrongGuesses}</span> guesses remaining</p>`;
    document.querySelector(".message").innerText = "Wrong try again";
  }
  renderMessage(remainingNumberofWrongGuesses);
});

gameBtn.addEventListener("click", init);
