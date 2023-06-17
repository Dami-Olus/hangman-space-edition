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
let foundLetters = [];

// Cached elements
// Text input
const word = document.querySelector(".secret-word");

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
  console.log(secretWord);
  letters = secretWord.split("");
  console.log(letters);
  render();
}

function render() {
  renderGame();
}

function renderGame() {
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

function renderMessage() {
  const secretletter = document.querySelectorAll(".secret-letter");
  let status = [];
  secretletter.forEach((letter) => {
    status.push(letter.style.display);
  });
  if (!status.includes("none") === true) {
    document.querySelector(".message2").innerText = "Thank you for saving me";
  }
}

//listen for players keypress, If it is included use the index to display it on the page.
document.addEventListener("keydown", (e) => {
  playerGuess = e.key;
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
      renderMessage();
    }
  } else {
    console.log("wrong");
    document.querySelector(".message").innerText = "Wrong try again";
  }
});
