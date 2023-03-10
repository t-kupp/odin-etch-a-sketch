const squareGrid = document.getElementById("square-grid");
const square = document.createElement("div");
square.style.width = "24px";
square.style.height = "24px";
square.style.backgroundColor = "red";

function makeGrid(numSquare) {
    for (let i = 0; i < numSquare; i++) {
        squareGrid.appendChild(square);
    }
}