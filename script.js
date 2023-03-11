const normalGrid = document.getElementById("normal-grid");
const bigGrid = document.getElementById("big-grid");
const squareGrid = document.getElementById("square-grid");
const rainbowBtn = document.getElementById("rainbow-mode");
const normalBtn = document.getElementById("normal-mode");
let currentMode = "default"

// Create 384 squares inside #square-grid on page load

window.onload = createGrid(384);

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
    const square = document.querySelectorAll(".square");
    squareGrid.appendChild(squareCreate);
    squareCreate.className = "square";
    square.forEach((square) =>
      square.addEventListener("mouseover", changeColor)
    );
  }
}

// Function to randomize colors to create a rainbow effect

function rainbowMode() {
  num = Math.floor(Math.random() * 7 + 1);
  switch (num) {
    case 1:
      return "#9400D3"; // Violet
    case 2:
      return "#4B0082"; // Indigo
    case 3:
      return "#0000FF"; // Blue
    case 4:
      return "#00FF00"; // Green
    case 5:
      return "#FFFF00"; // Yellow
    case 6:
      return "#FF7F00"; // Orange
    case 7:
      return "#FF0000"; // Red
  }
}

normalBtn.onclick = () => setCurrentMode("normal")
rainbowBtn.onclick = () => setCurrentMode("rainbow")

// Function to set different modes

function setCurrentMode(Mode) {
  currentMode = Mode
}
// Function to change color of the squares

function changeColor(e) {
  if (currentMode === "rainbow") {
    e.target.style.backgroundColor = rainbowMode();
  } else {
    e.target.style.backgroundColor = "gray";
  }
}