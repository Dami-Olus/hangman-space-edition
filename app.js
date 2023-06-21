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
  "duck",
  "lion",
  "tiger",
  "leopard",
  "fish",
  "dolphin",
  "shark",
  "whale",
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
let numberOfHints;
let second;
let minute;
let numberOfWins;
let numberOfTries;

// Cached elements
// Text input
const word = document.querySelector(".secret-word");
const gameBtn = document.querySelector(".game-button");
const guesses = document.querySelector(".guesses");
const hiddenLetter = document.querySelectorAll(".secret-letter");
const hints = document.querySelector(".hintCounter");
const hintBtn = document.querySelector(".hintBtn");
const timeLimit = document.querySelector(".time-limit");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const wordCount = document.querySelector(".word-count");
let correctLetter = new Audio('assets/audio/correct-choice-43861.mp3')
let gameOver = new Audio('assets/audio/game-over-arcade-6435.mp3')
let wrongLetter = new Audio('assets/audio/wrong-buzzer-6268.mp3')
let success = new Audio('assets/audio/success-1-6297.mp3')

// Get a hint button
// Remaining hints
// Words left
// remain time display
// Number of players display

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
  numberOfWrongGuesses = 8;
  remainingNumberofWrongGuesses = numberOfWrongGuesses;
  numberOfHints = 20;
  second = 0;
  minute = 2;
  numberOfWins = 0;
  numberOfTries = 1;

  render();
}

function renderTime() {
    setInterval(secondTimer, 1000);
    setInterval(minuteTimer, 60000);
  
}

function secondTimer() {
  
    if (second > 0) {
      second--;
      seconds.innerText = second;
    } else {
      second = 59;
      seconds.innerText = second;
    }
    seconds.innerText = `${second > 9 ? second : "0" + second}`;
  
}

function minuteTimer() {
  if (minute > 0) {
    minute--;
    minutes.innerText = minute;
  }
  minutes.innerText = `${minute}`;
}

// setInterval(sec, 1000)

function render() {
  renderGame();
  renderTime()
}

function renderGame() {
  while (word.hasChildNodes()) {
    word.removeChild(word.firstChild);
  }
  guesses.innerHTML = `<p><span>${remainingNumberofWrongGuesses}</span>/<span>${numberOfWrongGuesses}</span> guesses remaining</p>`;

  hints.innerText = `Remaining number of hints: ${numberOfHints}`;
  document.querySelector(".message2").innerText = "Please Save Me!";

  numberOfTries > 1
    ? (wordCount.innerText = `${numberOfWins}/${numberOfTries} words`)
    : (wordCount.innerText = `${numberOfWins}/${numberOfTries} word`);

  minutes.innerText = `${minute}`;
  seconds.innerText = `${second > 9 ? second : "0" + second}`;

  //render hidden word
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
    gameOver.play()
    document.querySelector(".message2").innerText = "Game Over";
    gameBtn.innerText = "Play Again";
    numberOfTries++;
    wordCount.innerText = `${numberOfWins}/${numberOfTries} words`;

    secretWord = wordChoices[randomPicker()];
    letters = secretWord.split("");
    remainingNumberofWrongGuesses = numberOfWrongGuesses;
    foundLetters = [];
    setTimeout(render, 2000);
    return;
  }
  console.log(status);
  console.log(foundLetters);
  if (!status.includes("none") === true) {
    success.play()
    document.querySelector(".message2").innerText = "Thank you for saving me";
    gameBtn.innerText = "Play Again";
    numberOfWins++;
    numberOfTries++;
    wordCount.innerText = `${numberOfWins}/${numberOfTries} words`;

    secretWord = wordChoices[randomPicker()];
    letters = secretWord.split("");
    remainingNumberofWrongGuesses = numberOfWrongGuesses;
    foundLetters = [];
    setTimeout(render, 2000);
    return;
  }
}

// event listeners
// text click
// button click
//listen for players keypress, If it is included use the index to display it on the page.
document.addEventListener("keydown", (e) => {
  playerGuess = e.key;
  console.log(playerGuess);
  // check if the letter is included in the letters list.
  if (letters.includes(playerGuess)) {
    console.log("correct");
    correctLetter.play()

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
    wrongLetter.play()
    if (remainingNumberofWrongGuesses > 0) {
      remainingNumberofWrongGuesses--;
    }
    guesses.innerHTML = `<p><span>${remainingNumberofWrongGuesses}</span>/<span>${numberOfWrongGuesses}</span> guesses remaining</p>`;
    document.querySelector(".message").innerText = "Wrong try again";
  }
  renderMessage(remainingNumberofWrongGuesses);
});

//Reset the game
gameBtn.addEventListener("click", init);

//Get a hint
hintBtn.addEventListener("click", () => {
  let randomLetter = Math.floor(Math.random() * letters.length);
  console.log(randomLetter);
  if (numberOfHints > 0) {
    letters.map((item, idx) => {
      document.getElementById(randomLetter).style.display = "";
    });
    numberOfHints--;
  }

  hints.innerText = `Remaining number of hints: ${numberOfHints}`;
});
