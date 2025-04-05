const grid = document.getElementById("grid");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const startButton = document.getElementById("start-button");

let score = 0;
let timeLeft = 30;
let timerInterval;
let moleInterval;

// Create holes and moles
function createGameBoard() {
  for (let i = 0; i < 9; i++) {
    const hole = document.createElement("div");
    hole.classList.add("hole");
    const mole = document.createElement("div");
    mole.classList.add("mole");
    mole.addEventListener("click", whackMole);
    hole.appendChild(mole);
    grid.appendChild(hole);
  }
}

// Start the game
function startGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;
  startButton.disabled = true;

  // Start the timer
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft === 0) {
      endGame();
    }
  }, 1000);

  // Start popping up moles
  moleInterval = setInterval(popUpMole, 1000);
}

// End the game
function endGame() {
  clearInterval(timerInterval);
  clearInterval(moleInterval);
  startButton.disabled = false;
  alert(`Game Over! Your score is ${score}.`);
}

// Pop up a random mole
function popUpMole() {
  const holes = document.querySelectorAll(".hole");
  const randomHole = holes[Math.floor(Math.random() * holes.length)];
  const mole = randomHole.querySelector(".mole");

  mole.classList.add("up");
  setTimeout(() => {
    mole.classList.remove("up");
  }, 800); // Mole stays up for 800ms
}

// Whack the mole
function whackMole() {
  if (this.classList.contains("up")) {
    score++;
    scoreDisplay.textContent = score;
    this.classList.remove("up");
  }
}

// Initialize the game
createGameBoard();
startButton.addEventListener("click", startGame);