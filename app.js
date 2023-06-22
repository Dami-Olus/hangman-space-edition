// constants
// Game types = []
// Time limit options= []
// Number of players = []
const alphabets = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
];
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
// player = {}
// Turn = 1
// Winner = null
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
let shipHeight;
let personHeight;
let personHover;

// Cached elements
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
const keyboard = document.querySelector(".keyboard");
const ship = document.querySelector(".ship-img img");
const person = document.querySelector(".person-img img");
let correctLetter = new Audio("assets/audio/correct-choice-43861.mp3");
let gameOver = new Audio("assets/audio/game-over-arcade-6435.mp3");
let wrongLetter = new Audio("assets/audio/wrong-buzzer-6268.mp3");
let success = new Audio("assets/audio/success-1-6297.mp3");

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
  shipHeight = 100;
  personHeight = 10;
  personHover = 0;
  second = 0;
  minute = 1;
  numberOfWins = 0;
  numberOfTries = 1;

  render();
}

let secondsInterval = null;

//countdown timer
function renderTime() {
  if (secondsInterval) clearInterval(secondsInterval);
  secondsInterval = setInterval(secondTimer, 1000);
  // minutesInterval = setInterval(minuteTimer, 60000);
}

renderTime();

function secondTimer() {
  //end game when countdown reaches 0
  if (minute === 0 && second === 0) {
    renderMessage(remainingNumberofWrongGuesses);
  }
  //countdown
  if (minute >= 0) {
    if (second > 0) {
      second--;
      seconds.innerText = second;
    } else {
      if (minute > 0) {
        minute--;
        minutes.innerText = `${minute}`;
        second = 59;
      }
    }
  }
  seconds.innerText = `${second > 9 ? second : "0" + second}`;
}

function render() {
  renderGame();
}

//start a fresh game
function renderGame() {
  while (word.hasChildNodes()) {
    word.removeChild(word.firstChild);
  }

  while (keyboard.hasChildNodes()) {
    keyboard.removeChild(keyboard.firstChild);
  }

  alphabets.forEach((alphabet) => {
    keyboardKey = document.createElement("div");
    keyboardKey.style.cursor = "pointer";
    keyboardKey.style.border = "1px solid black";
    keyboardKey.style.height = "55px";
    keyboardKey.style.width = "55px";
    keyboardKey.style.paddingVertical = "auto";
    keyboardKey.style.borderRadius = "50%";
    keyboardKey.style.textAlign = "center";
    keyboardKey.style.justifySelf = "center";
    keyboardKey.innerText = alphabet;
    keyboard.append(keyboardKey);
  });

  ship.style.height = `${shipHeight}px`;

  person.style.height = `${personHeight}rem`;

  person.style.bottom = `${personHover}px`;

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

//check game status
function renderMessage(x) {
  const secretletter = document.querySelectorAll(".secret-letter");
  let status = [];
  secretletter.forEach((letter) => {
    status.push(letter.style.display);
  });
  console.log(x);
  if (x === 0 || (minute === 0 && second === 0)) {
    secretletter.forEach((letter) => {
      letter.style.display = "";
    });
    gameOver.play();
    document.querySelector(".message2").innerText = "Game Over";
    gameBtn.innerText = "Play Again";
    numberOfTries++;
    wordCount.innerText = `${numberOfWins}/${numberOfTries} words`;

    secretWord = wordChoices[randomPicker()];
    letters = secretWord.split("");
    remainingNumberofWrongGuesses = numberOfWrongGuesses;
    foundLetters = [];
    shipHeight = 100;
    ship.style.height = `${shipHeight}px`;
    personHeight = 10;
    person.style.height = `${personHeight}rem`;
    personHover = 0;
    person.style.bottom = `${personHover}px`;
    person.style.display = ""
    minute = 1;
    setTimeout(render, 2000);
    return;
  }
  console.log(status);
  console.log(foundLetters);
  if (!status.includes("none") === true) {
    success.play();
    document.querySelector(".message2").innerText = "Thank you for saving me";
    gameBtn.innerText = "Play Again";
    numberOfWins++;
    numberOfTries++;
    wordCount.innerText = `${numberOfWins}/${numberOfTries} words`;
    minute = 1;
    second = 0;
    secretWord = wordChoices[randomPicker()];
    letters = secretWord.split("");
    remainingNumberofWrongGuesses = numberOfWrongGuesses;
    foundLetters = [];
    setTimeout(render, 2000);
    return;
  }
}

// event listeners

// keyboard click
document.addEventListener("keydown", (e) => {
  playerGuess = e.key;
  console.log(playerGuess);
  // check if the letter is included in the letters list.
  if (letters.includes(playerGuess)) {
    console.log("correct");
    correctLetter.play();

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
    if (shipHeight < 400) {
      shipHeight += 100;
      ship.style.height = `${shipHeight}px`;
    }
    if (shipHeight === 400) {
      if (personHeight > 4) {
        personHeight -= 2;
        person.style.height = `${personHeight}rem`;
      }
      if (personHover < 250) {
        personHover += 50;
        person.style.bottom = `${personHover}px`;
      }
      if(personHover === 250){
        person.style.display = "none"
      }
    }

    wrongLetter.play();
    if (remainingNumberofWrongGuesses > 0) {
      remainingNumberofWrongGuesses--;
    }
    guesses.innerHTML = `<p><span>${remainingNumberofWrongGuesses}</span>/<span>${numberOfWrongGuesses}</span> guesses remaining</p>`;
    document.querySelector(".message").innerText = "Wrong try again";
  }
  renderMessage(remainingNumberofWrongGuesses);
});

// onscreen click
keyboard.addEventListener("click", (e) => {
  playerGuess = e.target.innerText;

  console.log(playerGuess);
  // check if the letter is included in the letters list.
  if (letters.includes(playerGuess)) {
    console.log("correct");
    correctLetter.play();

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
    if (shipHeight < 400) {
      shipHeight += 100;
      ship.style.height = `${shipHeight}px`;
    }

    if (shipHeight === 400) {
      if (personHeight > 4) {
        personHeight -= 2;
        person.style.height = `${personHeight}rem`;
      }
      if (personHover < 250) {
        personHover += 50;
        person.style.bottom = `${personHover}px`;
      }
      if(personHover === 250){
        person.style.display = "none"
      }
    }

    wrongLetter.play();
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
