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
let foundLetters;

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
  
  render()
}

function render() {
  renderGame()
  renderMessage()
}

function renderGame(){
secretWord = wordChoices[randomPicker()];
  letters = secretWord.split("");
  letters.forEach((x) => {
    const letter = document.createElement("div");
    letter.classList.add("secret-letter");
    console.log(secretWord);
    word.append(letter);
  });
}

function renderMessage(){

}

//listen for players keypress, check if the letter is included in the letters list. If it is included use the index to display it on the page. Push the letter into a new array so we can keep track of th letters we have guessed correctly. If pleayer chooses a letter that has previousy been selected, do nothing.
document.addEventListener("keydown", (e) => {
  playerGuess = e.key;
  if (letters.includes(playerGuess)) {
    console.log("correct");
    if (!foundLetters.includes(playerGuess)) {
      foundLetters.push(playerGuess);
    }

    
  } else {
    console.log("wrong");
  }
});

let sample = [{'d': [0,2]}, {'o': [1,3]}]
console.log(sample[1]['o'].length)


