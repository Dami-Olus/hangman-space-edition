// CONSTANTS
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
  "mecury",
  "venus",
  "earth",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
  "pluto",
  "sun",
  "asteroid",
  "comet",
  "galaxy",
  "star",
  "rocket",
  "telescope",
  "astronaut",
  "astronomer",
  "nasa",
];

// STATE VARIABLES
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
let keyboardKey;
let secondsInterval = null;

// CACHED ELEMENTS
//Buttons
const endGameBtn = document.querySelector(".end-game button");
const playBtn = document.querySelector(".game-option3");
const gameBtn = document.querySelector(".game-button");
const hintBtn = document.querySelector(".hintBtn");

//Game
const gameScreen = document.querySelector(".game-screen");
const modal = document.querySelector(".modal");

//Stats
const guesses = document.querySelector(".guesses");
const wordCount = document.querySelector(".word-count");
const hints = document.querySelector(".hintCounter");
const timeLimit = document.querySelector(".time-limit");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");

//Game elements
const word = document.querySelector(".secret-word");
const hiddenLetter = document.querySelectorAll(".secret-letter");
const keyboard = document.querySelector(".keyboard");
const ship = document.querySelector(".ship-img img");
const person = document.querySelector(".person-img img");

//Sound Effects
const correctLetter = new Audio("assets/audio/correct-choice-43861.mp3");
const wrongLetter = new Audio("assets/audio/wrong-buzzer-6268.mp3");
const gameOver = new Audio("assets/audio/game-over-arcade-6435.mp3");
const success = new Audio("assets/audio/success-1-6297.mp3");

// FUNCTIONS
//pick a random index
function randomPicker() {
  return Math.floor(Math.random() * wordChoices.length);
}

//render hidden word
function renderHiddenWord(x, index) {
  const letterContainer = document.createElement("div");
  const letterContainerp = document.createElement("p");
  letterContainerp.classList.add("secret-letter");
  letterContainerp.innerText = x;
  letterContainerp.id = index;
  letterContainerp.style.display = "none";
  letterContainer.classList.add("secret-letters");
  letterContainer.append(letterContainerp);
  word.append(letterContainer);
}

//start game
function init() {
  secretWord = wordChoices[randomPicker()];
  letters = secretWord.split("");
  foundLetters = [];
  numberOfWrongGuesses = 7;
  remainingNumberofWrongGuesses = numberOfWrongGuesses;
  numberOfHints = 20;
  shipHeight = 100;
  personHeight = 10;
  personHover = 0;
  second = 0;
  minute = 1;
  numberOfWins = 0;
  numberOfTries = 1;
  renderTime();
  render();
}

//countdown timer
function renderTime() {
  if (secondsInterval) clearInterval(secondsInterval);
  secondsInterval = setInterval(secondTimer, 1000);
  // minutesInterval = setInterval(minuteTimer, 60000);
}

//Countdown timer logic
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

//Create onscreen keyboard
function createKeyboard(alphabet) {
  keyboardKey = document.createElement("div");
  keyboardKey.style.cursor = "pointer";
  keyboardKey.style.border = "1px solid black";
  keyboardKey.style.height = "35px";
  keyboardKey.style.width = "35px";
  keyboardKey.style.paddingVertical = "auto";
  keyboardKey.style.borderRadius = "50%";
  keyboardKey.style.textAlign = "center";
  // keyboardKey.style.justifySelf = "center";
  keyboardKey.innerText = alphabet;
  keyboardKey.style.display = "flex";
  keyboardKey.style.alignItems = "center";
  keyboardKey.style.justifyContent = "center";
  keyboardKey.style.background = "beige";
  keyboardKey.style.marginBottom = "10px";
  keyboard.append(keyboardKey);
}

//start a fresh game
function renderGame() {
  //clear hidden word if any exists
  while (word.hasChildNodes()) {
    word.removeChild(word.firstChild);
  }

  //clear keyboard if any exists
  while (keyboard.hasChildNodes()) {
    keyboard.removeChild(keyboard.firstChild);
  }

  //render keyboard
  alphabets.forEach(createKeyboard);

  //render state
  ship.style.height = `${shipHeight}px`;
  person.style.height = `${personHeight}rem`;
  person.style.bottom = `${personHover}px`;
  guesses.innerHTML = `<p><span>${remainingNumberofWrongGuesses}</span>/<span>${numberOfWrongGuesses}</span> guesses remaining</p>`;
  hints.innerText = `Remaining number of hints: ${numberOfHints}`;
  numberOfTries > 1
    ? (wordCount.innerText = `${numberOfWins}/${numberOfTries} words`)
    : (wordCount.innerText = `${numberOfWins}/${numberOfTries} word`);
  minutes.innerText = `${minute}`;
  seconds.innerText = `${second > 9 ? second : "0" + second}`;

  //render hidden word
  letters.forEach(renderHiddenWord);
}

//check winner
function checkWinner(x) {
  const secretletter = document.querySelectorAll(".secret-letter");
  let status = [];
  secretletter.forEach((letter) => {
    status.push(letter.style.display);
  });

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
    document.querySelector(".message2").innerText = "";
    foundLetters = [];
    shipHeight = 100;
    ship.style.height = `${shipHeight}px`;
    personHeight = 10;
    person.style.height = `${personHeight}rem`;
    personHover = 0;
    person.style.bottom = `${personHover}px`;
    person.style.display = "";
    minute = 1;
    setTimeout(render, 2000);
    return;
  }

  if (!status.includes("none") === true) {
    success.play();
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
    personHeight = 10;
    personHover = 0;
    shipHeight = 100;
    setTimeout(render, 2000);
    return;
  }
}

// EVENT LISTENERS
//Start Game
playBtn.addEventListener("click", function (e) {
  modal.style.display = "none";
  gameScreen.style.display = "flex";
  init();
});

//End Game
endGameBtn.addEventListener("click", function (e) {
  modal.style.display = "flex";
  gameScreen.style.display = "none";
  clearInterval(secondsInterval);
});

// keyboard click
// document.addEventListener("keydown", (e) => {
//   playerGuess = e.key;
//   console.log(playerGuess);
//   // check if the letter is included in the letters list.
//   if (letters.includes(playerGuess)) {
//     console.log("correct");
//     if (keyboardKey.innerText === playerGuess) {
//       keyboardKey.style.background = "green";
//     }
//     correctLetter.play();

//     // Push the letter into a new array so we can keep track of th letters we have guessed correctly.If pleayer chooses a letter that has previousy been selected, do nothing.
//     if (!foundLetters.includes(playerGuess)) {
//       document.querySelector(".message").innerText =
//         "Correct, make another guess";
//       foundLetters.push(playerGuess);
//       console.log(foundLetters);

//       letters.map((item, idx) => {
//         if (playerGuess === item) {
//           document.getElementById(idx).style.display = "";
//         }
//       });
//     }
//   } else {
//     console.log("wrong");
//     if (shipHeight < 400) {
//       shipHeight += 100;
//       ship.style.height = `${shipHeight}px`;
//     }
//     if (shipHeight === 400) {
//       if (personHeight > 4) {
//         personHeight -= 2;
//         person.style.height = `${personHeight}rem`;
//       }
//       if (personHover < 250) {
//         personHover += 50;
//         person.style.bottom = `${personHover}px`;
//       }
//       if (personHover === 250) {
//         person.style.display = "none";
//       }
//     }
//     if (remainingNumberofWrongGuesses >= 2) {
//       wrongLetter.play();
//     }

//     if (remainingNumberofWrongGuesses > 0) {
//       remainingNumberofWrongGuesses--;
//     }
//     guesses.innerHTML = `<p><span>${remainingNumberofWrongGuesses}</span>/<span>${numberOfWrongGuesses}</span> guesses remaining</p>`;
//     document.querySelector(".message").innerText = "Wrong try again";
//   }
//   renderMessage(remainingNumberofWrongGuesses);
// });

// onscreen click
keyboard.addEventListener("click", (e) => {
  playerGuess = e.target.innerText;
  // check if the letter is included in the letters list.
  if (letters.includes(playerGuess)) {
    e.target.style.background = "green";
    correctLetter.play();

    // Push the letter into a new array so we can keep track of the letters we have guessed correctly.If pleayer chooses a letter that has previousy been selected, do nothing.
    if (!foundLetters.includes(playerGuess)) {
      document.querySelector(".message").innerText =
        "Correct, make another guess";

      setTimeout(
        (document.querySelector(".message").innerText =
          "Correct, make another guess"),
        2000
      );

      foundLetters.push(playerGuess);

      //if letter is correct set it to display
      letters.map((item, idx) => {
        if (playerGuess === item) {
          document.getElementById(idx).style.display = "";
        }
      });
    }
  } else {
    e.target.style.background = "orange";
    //Alien ship arrives
    if (shipHeight < 400) {
      shipHeight += 100;
      ship.style.height = `${shipHeight}px`;
    }

    //Person is beamed up
    if (shipHeight === 400) {
      if (personHeight > 4) {
        personHeight -= 2;
        person.style.height = `${personHeight}rem`;
      }
      if (personHover < 250) {
        personHover += 50;
        person.style.bottom = `${personHover}px`;
      }
      if (personHover === 250) {
        person.style.display = "none";
      }
    }

    if (remainingNumberofWrongGuesses >= 2) {
      wrongLetter.play();
    }
    if (remainingNumberofWrongGuesses > 0) {
      remainingNumberofWrongGuesses--;
    }
    guesses.innerHTML = `<p><span>${remainingNumberofWrongGuesses}</span>/<span>${numberOfWrongGuesses}</span> guesses remaining</p>`;
    document.querySelector(".message").innerText = "Wrong try again";
    setTimeout(
      (document.querySelector(".message").innerText = "Wrong try again"),
      2000
    );
  }
  checkWinner(remainingNumberofWrongGuesses);
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
