window.onload = function () {
  setTimeout(function () {
    document.getElementById("continue-btn").style.display = "inline-block";
  }, 2000);
};
let hangManImage = document.getElementById("hangmanImage");
let guessesTextParagraph = document.getElementById("guesses-text-paragraph");
let keyboard = document.getElementById("keyboard");
let wordDisplay = document.getElementsByClassName("word-display")[0];
let gameModal = document.querySelector(".game-modal");
let resultText = document.querySelector(".result-text");
let resultImage = document.querySelector(".result-image");
let correctWordDisplay = document.querySelector(".correct-word");
let playAgainButton = document.querySelector(".play-again");

let currentWord,
  wrongGuesses = 0;
let maxWrongGuesses = 6;

let qwertyLayout = "QWERTYUIOPASDFGHJKLZXCVBNM";

// Function to get a random word and initialize the game
const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  let hintTextParagraph = document.getElementById("hint-text-paragraph");
  hintTextParagraph.textContent = hint;
  wordDisplay.innerHTML = word
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
};

// Function to handle the game logic when a letter is clicked
const initGame = (button, clickedLetter) => {
  button.disabled = true; // Disable the button after it's clicked
  let isCorrect = false;

  [...currentWord].forEach((letter, index) => {
    if (letter.toUpperCase() === clickedLetter) {
      wordDisplay.children[index].textContent = letter;
      wordDisplay.children[index].classList.add("guessed");
      isCorrect = true;
    }
  });

  if (!isCorrect) {
    wrongGuesses++;
    guessesTextParagraph.innerHTML = `${wrongGuesses} / ${maxWrongGuesses}`;
    hangManImage.src = `./assets/hangman-${wrongGuesses}.svg`;

    if (wrongGuesses >= maxWrongGuesses) {
      endGame(false); // Game Over - Loss
    }
  } else {
    checkWinCondition();
  }
};

// Function to check if the user has won the game
const checkWinCondition = () => {
  const allGuessed = [...wordDisplay.children].every((li) =>
    li.classList.contains("guessed")
  );

  if (allGuessed) {
    endGame(true); // Game Over - Win
  }
};

// Function to end the game and show the result
const endGame = (isWin) => {
    gameModal.style.display = "flex";
    resultText.textContent = isWin ? "You Win!" : "Game Over";
    resultImage.src = isWin ? "./assets/victory.gif" : "./assets/lost.gif";
    correctWordDisplay.textContent = currentWord;
};

// Function to reset the game
const resetGame = () => {
  wrongGuesses = 0;
  hangManImage.src = `./assets/hangman-0.svg`;
  guessesTextParagraph.innerHTML = `${wrongGuesses} / ${maxWrongGuesses}`;
  gameModal.style.display = "none";
  keyboard.innerHTML = ""; // Clear previous keyboard
  getRandomWord();
  generateKeyboard();
};

// Generate the QWERTY keyboard and add event listeners
const generateKeyboard = () => {
  for (let i = 0; i < qwertyLayout.length; i++) {
    let button = document.createElement("button");
    button.textContent = qwertyLayout[i];
    keyboard.appendChild(button);

    button.addEventListener("click", (e) => {
      initGame(e.target, e.target.textContent);
    });
  }
};

// Event listener for "Play Again" button
playAgainButton.addEventListener("click", resetGame);

// Initialize the game on page load
getRandomWord();
generateKeyboard();
