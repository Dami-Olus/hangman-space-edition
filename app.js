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
let letters

// Cached elements
// Text input

 const word = document.querySelector('.secret-word')
 
 



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

function init() {

  secretWord = wordChoices[randomPicker()];
  letters = secretWord.split('')
  letters.forEach(x => {
    const letter = document.createElement('div')
    letter.classList.add("secret-letter")
    console.log(letter)
    word.append(letter)
  })
}



init();
