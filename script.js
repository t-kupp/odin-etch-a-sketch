const normalGrid = document.getElementById("normal-grid");
const bigGrid = document.getElementById("big-grid");
const squareGrid = document.getElementById("square-grid");
const rainbowBtn = document.getElementById("rainbowBtn");
const normalBtn = document.getElementById("normalBtn");
const modeButton = document.querySelectorAll(".mode-button");
const resetBtn = document.getElementById("resetBtn");
const square = document.querySelectorAll(".square");
const eraserBtn = document.getElementById("eraserBtn");
const rgb1 = document.getElementById("rgb1");
const rgb2 = document.getElementById("rgb2");
const rgb3 = document.getElementById("rgb3");
const rgbSliders = document.querySelectorAll(".rgb-input");
let currentMode = "default";

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// Create 384 squares inside #square-grid on page load and set active button outline

window.addEventListener("load", () => {
  createGrid(384);
  activeButton();
  previewDisplayHex("gray");
  setCurrentMode("normal");
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
    square.forEach((square) => square.addEventListener("mousedown", changeColor));
  }
}

// Function to create a rainbow
let currentRainbowColor = 0;
let countingUp = true;
function rainbowMode() {
  const rainbowColors = [
    "#9400D3",
    "#4B0082",
    "#0000FF",
    "#00FF00",
    "#FFFF00",
    "#FF7F00",
    "#FF0000",
  ];
  if (countingUp) {
    currentRainbowColor++;
  } else {
    currentRainbowColor--;
  }
  if (currentRainbowColor == 6 || currentRainbowColor == 0) {
    countingUp = !countingUp;
  }
  return rainbowColors[currentRainbowColor];
}

// Function to set different modes

normalBtn.addEventListener("click", () => {
  setCurrentMode("default");
  previewDisplayHex("gray");
  activeButton();
});

rainbowBtn.addEventListener("click", () => {
  setCurrentMode("rainbow");
  previewDisplayRainbow(
    "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(148,0,211,1) 0%, rgba(75,0,130,1) 17%, rgba(0,0,255,1) 34%, rgba(0,255,0,1) 51%, rgba(255,255,0,1) 69%, rgba(255,127,0,1) 85%, rgba(255,0,0,1) 100%)"
  );
  activeButton();
});

eraserBtn.addEventListener("click", () => {
  setCurrentMode("eraser");
  previewDisplayHex("white");
  activeButton();
});

customBtn.addEventListener("click", () => {
  setCurrentMode("custom");
  customColor();
  activeButton();
});

function setCurrentMode(Mode) {
  currentMode = Mode;
  if (!(currentMode === "custom")) {
    rgbSliders.forEach((slider) => {
      slider.disabled = true;
    });
  } else {
    rgbSliders.forEach((slider) => {
      slider.disabled = false;
    });
  }
}
// Function to change color of the squares

function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (currentMode === "rainbow") {
    e.target.style.backgroundColor = rainbowMode();
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "white";
  } else if (currentMode === "custom") {
    e.target.style.backgroundColor = `rgb(${customColor()})`;
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
  } else if (currentMode === "eraser") {
    eraserBtn.style.outline = "2px solid black";
  } else if (currentMode === "custom") {
    customBtn.style.outline = "2px solid black";
  }
}

// Reset all squares to white when clicking the reset button

resetBtn.addEventListener("click", () => {
  const square = document.querySelectorAll(".square");
  square.forEach((square) => {
    square.style.backgroundColor = "white";
  });
});

// Function for putting in your own color values

rgbSliders.forEach((slider) => slider.addEventListener("input", displayCustomColorValues));

function customColor() {
  valueRed = rgb1.value;
  valueGreen = rgb2.value;
  valueBlue = rgb3.value;
  let customColor = `${valueRed},${valueGreen},${valueBlue}`;
  previewDisplayRgb(customColor);
  return customColor;
}

function displayCustomColorValues() {
  let displayRed = document.getElementById("display-value-red");
  let displayGreen = document.getElementById("display-value-green");
  let displayBlue = document.getElementById("display-value-blue");
  displayRed.textContent = `R: ${rgb1.value}`;
  displayGreen.textContent = `G: ${rgb2.value}`;
  displayBlue.textContent = `B: ${rgb3.value}`;
  customColor();
}

// Function for preview display in rgb

function previewDisplayRgb(rgbValue) {
  const preview = document.getElementById("custom-color-preview");
  preview.style.background = "none";
  preview.style.backgroundColor = `rgb(${rgbValue})`;
}

// Function for preview display in hex

function previewDisplayHex(hexValue) {
  const preview = document.getElementById("custom-color-preview");
  preview.style.background = "none";
  preview.style.backgroundColor = `${hexValue}`;
}

// Function for preview display in Rainbow mode

function previewDisplayRainbow(rainbowGradient) {
  const preview = document.getElementById("custom-color-preview");
  preview.style.background = `${rainbowGradient}`;
}
