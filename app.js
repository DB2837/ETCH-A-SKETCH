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
let randomColor;
let rainbowMode = false;
let mouseIsDown = false;

colorPicker.addEventListener("change", () => {
  btnColorMode.click();
  rainbowMode = false;
});

boardColor.addEventListener("change", () => {
  btnColorMode.click();
  rainbowMode = false;
});

clearBoardBtn.addEventListener("click", () => {
  clearBoard();
  btnColorMode.click();
});
btnGridLines.addEventListener("click", () => {
  toggleGridLines();
  btnColorMode.click();
});
btnColorMode.addEventListener("click", () => {
  rainbowMode = false;
  colorGridSquares();
  btnColorMode.classList.add("active");
  eraserBtn.classList.remove("active");
  rainbowModeBtn.classList.remove("active");
});
eraserBtn.addEventListener("click", () => {
  rainbowMode = false;
  eraseColorGridSquares();
  eraserBtn.classList.add("active");
  btnColorMode.classList.remove("active");
  rainbowModeBtn.classList.remove("active");
});

rainbowModeBtn.addEventListener("click", () => {
  randomColorGridSquares();
  eraserBtn.classList.remove("active");
  btnColorMode.classList.remove("active");
  rainbowModeBtn.classList.add("active");
});

boardColor.addEventListener("change", () => {
  gridSquares.forEach(
    (square) => (square.style.backgroundColor = boardColor.value)
  );
});

function generateGridItem() {
  const gridItem = document.createElement("div");
  gridItem.className = "grid-item";
  gridItem.className = "grid-item-blank";

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

function clearBoard() {
  gridSquares.forEach((square) => (square.style.backgroundColor = "#ffffff"));
  boardColor.value = "#ffffff";
}

function generateRandomColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomColor;
}

function colorGridSquares() {
  colorSquares(colorPicker.value);
}

function randomColorGridSquares() {
  rainbowMode = true;
}

function colorSquares(color) {
  const gridSquares = drawArea.querySelectorAll(".grid-item-blank");

  gridSquares.forEach((square) =>
    square.addEventListener("mousedown", () => {
      mouseIsDown = true;
    })
  );

  gridSquares.forEach((square) =>
    square.addEventListener("mouseover", (e) => {
      if (mouseIsDown && e.type == "mouseover" && rainbowMode) {
        square.style.backgroundColor = generateRandomColor();
      } else if (mouseIsDown && e.type == "mouseover" && !rainbowMode) {
        square.style.backgroundColor = color;
      }
    })
  );

  gridSquares.forEach((square) =>
    square.addEventListener("click", (e) => {
      if (!mouseIsDown && e.type == "mouseover" && rainbowMode) {
        square.style.backgroundColor = generateRandomColor();
      } else if (!mouseIsDown && e.type == "mouseover" && !rainbowMode) {
        square.style.backgroundColor = color;
      }
    })
  );

  gridSquares.forEach((square) =>
    square.addEventListener("mouseup", () => {
      mouseIsDown = false;
    })
  );
}

function eraseColorGridSquares() {
  colorSquares(boardColor.value);
}

function toggleGridLines() {
  const gridSquares = drawArea.querySelectorAll(".grid-item-blank");
  gridSquares.forEach((square) => square.classList.toggle("grid-item"));
}

gridSlider.addEventListener("change", () => {
  removeGridItems();
  createGrid(gridSlider.value);
  btnColorMode.click();
  boardColor.value = "#ffffff";
});

window.onload = () => {
  boardColor.value = "#ffffff";
  sliderSize.textContent = `${gridSlider.value} x ${gridSlider.value}`;
  toggleGridLines();
  createGrid(gridSlider.value);
  colorGridSquares(colorPicker.value);
  btnColorMode.classList.add("active");
};
