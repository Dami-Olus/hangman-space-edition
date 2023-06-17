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
  render();
}

function render() {
  renderGame();
  renderMessage();
}

function renderGame() {
  secretWord = wordChoices[randomPicker()];
  console.log(secretWord);
  letters = secretWord.split("");
  console.log(letters);
  letters.forEach((x, index) => {
    
    const letterContainer = document.createElement("div");
    const letterContainerp = document.createElement("p")
    letterContainerp.innerText = x
    letterContainerp.id = index
    letterContainerp.style.display = "none";
    letterContainer.classList.add("secret-letter");
    letterContainer.append(letterContainerp)
    
    word.append(letterContainer);

    
  });
}

function renderMessage() {}

//listen for players keypress, If it is included use the index to display it on the page.
document.addEventListener("keydown", (e) => {
  playerGuess = e.key;
  // check if the letter is included in the letters list.
  if (letters.includes(playerGuess)) {
    console.log("correct");
    // Push the letter into a new array so we can keep track of th letters we have guessed correctly.If pleayer chooses a letter that has previousy been selected, do nothing.
    if (!foundLetters.includes(playerGuess)) {
      foundLetters.push(playerGuess);
      console.log(foundLetters);
      letters.map((item, idx) => {
        if (playerGuess === item) {
          document.getElementById(idx).style.display = ""
          // console.log(idx);
          // let newLetter = document.createElement("p")
          // newLetter.innerText = playerGuess;
          // console.log(newLetter);
          // console.log(word)
          // console.log(document.querySelectorAll('secret-letter'))

        }
      });
    }
  } else {
    console.log("wrong");
  }
});

// let sample = [{ d: [0, 2] }, { o: [1, 3] }];
// //number of times the letter appears
// console.log(sample[1]["o"].length);
// //index of the letter

// //number of letters
// console.log(sample.length)

// let sample2 = ["e", "a", "g", "l", "e"];

// sample2.reduce((acc, current) => {

// },[])

// console.log(sample2.indexOf("e"));

// function findAllIndex(arr, x, p) {
//   let ind = [];
//   let y = arr.indexOf(x, p);
//   console.log(y)
//   ind.push(y);
//   if (y < arr.length - 1) {
//     findAllIndex(arr, x, y + 1);
//     console.log(ind)
//   } else {
//     return;
//   }
// }

// console.log(findAllIndex(sample2, "e", 0));

//I have 2 arrays, Arr2 contains the letters from Arr1, I want to get all the indices in Arr1 that arr2 occurs
