const normalGrid = document.getElementById("normal-grid");
const bigGrid = document.getElementById("big-grid");
const squareGrid = document.getElementById("square-grid");
const rainbowBtn = document.getElementById("rainbow-mode");
const normalBtn = document.getElementById("normal-mode");
const modeButton = document.querySelectorAll(".mode-button");
const resetBtn = document.getElementById("resetBtn");
const square = document.querySelectorAll(".square");
let currentMode = "default";




// Create 384 squares inside #square-grid on page load and set active button outline

window.addEventListener("load", () => {
  createGrid(384);
  activeButton();
});

// UI Grid size buttons

normalGrid.onclick = function normalGrid() {
  removeSquares();
  createGrid(384);
  squareGrid.style.gridTemplateColumns = "repeat(24, auto)";
};

bigGrid.onclick = function bigGrid() {
  removeSquares();
  createGrid(768);
  squareGrid.style.gridTemplateColumns = "repeat(32, auto)";
};

// Function to remove all squares

function removeSquares() {
  let square = document.querySelectorAll(".square");
  square.forEach((element) => {
    element.remove();
  });
}

// Function to create a specific number of squares

function createGrid(numSquares) {
  for (let i = 0; i < numSquares; i++) {
    const squareCreate = document.createElement("div");
    squareGrid.appendChild(squareCreate);
    squareCreate.className = "square";
    const square = document.querySelectorAll(".square");
    square.forEach((square) => square.addEventListener("mouseover", changeColor));
  }
}


// Function to create a rainbow 
let currentRainbowColor = 0;
let countingUp = true;
function rainbowMode () {
  const rainbowColors = ["#9400D3", "#4B0082", "#0000FF", "#00FF00", "#FFFF00", "#FF7F00", "#FF0000"]
  if (countingUp) {
    currentRainbowColor++
  } else {
    currentRainbowColor--
  }
  if (currentRainbowColor == 6 || currentRainbowColor == 0) {
    countingUp = !countingUp
  }
  return rainbowColors[currentRainbowColor]
}


normalBtn.addEventListener("click", () => {
  setCurrentMode("default");
  activeButton();
});

rainbowBtn.addEventListener("click", () => {
  setCurrentMode("rainbow");
  activeButton();
});

// Function to set different modes

function setCurrentMode(Mode) {
  currentMode = Mode;
}
// Function to change color of the squares

function changeColor(e) {
  if (currentMode === "rainbow") {
    e.target.style.backgroundColor = rainbowMode();
  } else {
    e.target.style.backgroundColor = "gray";
  }
}

// Function to highlight the active mode button

function activeButton() {
  modeButton.forEach((button) => {
    button.style.outline = "none";
  });
  if (currentMode === "default") {
    normalBtn.style.outline = "2px solid black";
  } else if (currentMode === "rainbow") {
    rainbowBtn.style.outline = "2px solid black";
  }
}

// Reset all squares to white when clicking the reset button

resetBtn.addEventListener("click", () => {
  const square = document.querySelectorAll(".square");
  square.forEach((square) => {
    square.style.backgroundColor = "white";
  });
});
