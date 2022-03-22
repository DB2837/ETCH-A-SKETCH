const drawArea = document.querySelector(".draw-area");
console.log(drawArea);

function setColumnTimeRowNumber() {
  return +prompt("Insert square matrix dim: ", "1");
}

const gridDimention = setColumnTimeRowNumber();

function generateGridItem() {
  const gridItem = document.createElement("div");
  gridItem.className = "grid-item";

  drawArea.appendChild(gridItem);
}

const columsRowNumber = document.documentElement;
columsRowNumber.style.setProperty("--columnsTimeRowNumber", gridDimention);

for (let i = 0; i < gridDimention ** 2; i++) {
  generateGridItem();
}
