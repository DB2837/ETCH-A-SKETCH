const colorValue = document.getElementById("color-picker").value;
const boardColor = document.getElementById("board-color").value;
const colorModeBtn = document.querySelector("#color-mode");
const rainbowModeBtn = document.querySelector("#rainbow-mode");
const eraserBtn = document.querySelector("#eraser");
const clearBoardBtn = document.querySelector("#clear-board");
const drawArea = document.querySelector(".draw-area");
const gridSlider = document.getElementById("slider");
const sliderSize = document.getElementById("slider-size");
//const gridSlider = document.getElementById("slider").value;

function generateGridItem() {
  const gridItem = document.createElement("div");
  gridItem.className = "grid-item";

  drawArea.appendChild(gridItem);
}

function removeGridItems() {
  drawArea.textContent = "";
}

/* set initial grid to 25x25 (mid value) */
let gridDimention = gridSlider.value;
sliderSize.textContent = `${gridSlider.value} x ${gridSlider.value}`;
const columsRowNumber = document.documentElement;
columsRowNumber.style.setProperty("--columnsTimeRowNumber", gridDimention);
for (let i = 0; i < gridDimention ** 2; i++) {
  generateGridItem();
}

/* make grid dimention reactive to change (slider value) */
gridSlider.addEventListener("change", () => {
  removeGridItems();
  gridDimention = gridSlider.value;

  const columsRowNumber = document.documentElement;
  columsRowNumber.style.setProperty("--columnsTimeRowNumber", gridDimention);

  for (let i = 0; i < gridDimention ** 2; i++) {
    generateGridItem();
  }

  sliderSize.textContent = `${gridSlider.value} x ${gridSlider.value}`;
});
