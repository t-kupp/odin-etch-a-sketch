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
document.body.addEventListener("mousedown", () => (mouseDown = true));
document.body.addEventListener("mouseup", () => (mouseDown = false));

// Create 384 squares inside #square-grid on page load and set active button

window.addEventListener("load", () => {
  createGrid(768);
  squareGrid.style.gridTemplateColumns = "repeat(32, auto)";
  activeButton();
  previewDisplayHex("gray");
  setCurrentMode("default");
});

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
    square.forEach((square) => square.addEventListener("touchmove", changeColor));
  }
}

// Function to create a rainbow
let currentRainbowColor = 0;
let countingUp = true;
function rainbowMode() {
  const rainbowColors = ["#EAE7DC", "#D8C3A5", "#8E8D8A", "#E98074", "#E85A4F"];
  if (countingUp) {
    currentRainbowColor++;
  } else {
    currentRainbowColor--;
  }
  if (currentRainbowColor == 4 || currentRainbowColor == 0) {
    countingUp = !countingUp;
  }
  return rainbowColors[currentRainbowColor];
}

// Function to set different modes

normalBtn.addEventListener("click", () => {
  setCurrentMode("default");
  previewDisplayHex("#8e8d8a");
  activeButton();
});

rainbowBtn.addEventListener("click", () => {
  setCurrentMode("rainbow");
  previewDisplayRainbow(
    "linear-gradient(135deg, rgba(2,0,36,1) 0%, rgba(234,231,220,1) 0%, rgba(216,195,165,1) 24%, rgba(142,141,138,1) 50%, rgba(233,128,116,1) 77%, rgba(232,90,79,1) 100%)"
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
  } else if (currentMode === "default") {
    e.target.style.backgroundColor = "#8e8d8a";
  }
}

// Function to highlight the active mode button

function activeButton() {
  modeButton.forEach((button) => {
    button.style.color = "var(--main-red)";
    button.style.backgroundColor = "var(--main-beige)";
  });
  if (currentMode === "default") {
    normalBtn.style.color = "var(--main-beige)";
    normalBtn.style.backgroundColor = "var(--main-red)";
  } else if (currentMode === "rainbow") {
    rainbowBtn.style.color = "var(--main-beige)";
    rainbowBtn.style.backgroundColor = "var(--main-red)";
  } else if (currentMode === "eraser") {
    eraserBtn.style.color = "var(--main-beige)";
    eraserBtn.style.backgroundColor = "var(--main-red)";
  } else if (currentMode === "custom") {
    customBtn.style.color = "var(--main-beige)";
    customBtn.style.backgroundColor = "var(--main-red)";
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
