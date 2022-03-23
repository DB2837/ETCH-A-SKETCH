const colorPicker = document.getElementById("color-picker");
const boardColor = document.getElementById("board-color");
const btnColorMode = document.querySelector("#color-mode");
const rainbowModeBtn = document.querySelector("#rainbow-mode");
const eraserBtn = document.querySelector("#eraser");
const clearBoardBtn = document.querySelector("#clear-board");
const btnGridLines = document.querySelector("#grid-lines");
const drawArea = document.querySelector(".draw-area");
const gridSlider = document.getElementById("slider");
const sliderSize = document.getElementById("slider-size");
let gridSquares = drawArea.querySelectorAll("div");
var mouseIsDown = false;

btnGridLines.addEventListener("click", toggleGridLines);
btnColorMode.addEventListener("click", colorGridSquares);

boardColor.addEventListener("change", () => {
  const drawArea = document.querySelector(".draw-area");
  drawArea.style.backgroundColor = boardColor.value;
});

function generateGridItem() {
  const gridItem = document.createElement("div");
  gridItem.className = "grid-item";

  drawArea.appendChild(gridItem);
}

function removeGridItems() {
  drawArea.textContent = "";
}

function createGrid(dim) {
  const columsRowNumber = document.documentElement; //select CSS variable to generate the number of columns and raw
  columsRowNumber.style.setProperty("--columnsTimeRowNumber", dim);

  for (let i = 0; i < dim ** 2; i++) {
    generateGridItem();
  }

  gridSquares = drawArea.querySelectorAll("div");
  sliderSize.textContent = `${gridSlider.value} x ${gridSlider.value}`;
}

function colorGridSquares() {
  gridSquares.forEach((square) =>
    square.addEventListener("mousedown", function () {
      mouseIsDown = true;
    })
  );

  gridSquares.forEach((square) =>
    square.addEventListener("mouseover", (e) => {
      if (mouseIsDown && e.type == "mouseover") {
        e.target.style.backgroundColor = colorPicker.value;
      }
    })
  );

  gridSquares.forEach((square) =>
    square.addEventListener("click", (e) => {
      if (!mouseIsDown && e.type == "click") {
        e.target.style.backgroundColor = colorPicker.value;
      }
    })
  );

  gridSquares.forEach((square) =>
    square.addEventListener("mouseup", function () {
      mouseIsDown = false;
    })
  );
}

function toggleGridLines() {
  gridSquares.forEach((square) => square.classList.toggle("grid-item"));
}

gridSlider.addEventListener("change", () => {
  removeGridItems();
  createGrid(gridSlider.value);
  colorGridSquares();
});

window.onload = () => {
  boardColor.value = "#ffffff";
  sliderSize.textContent = `${gridSlider.value} x ${gridSlider.value}`;
  createGrid(gridSlider.value);
  colorGridSquares();
};
