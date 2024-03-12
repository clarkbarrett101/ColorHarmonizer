const rgbColors = [
  "#FF0000",
  "#FF8000",
  "#FFFF00",
  "#a0FF00",
  "#00f900",
  "#00F0a0",
  "#00FFFF",
  "#0080FF",
  "#0000FF",
  "#8000FF",
  "#FF00FF",
  "#FF0080",
];
const lightrgbColors = [
  "#FF6060",
  "#FF8040",
  "#FFFF60",
  "#a0FF60",
  "#70f970",
  "#a0F0ff",
  "#60FFFF",
  "#6090FF",
  "#8080FF",
  "#F080FF",
  "#FF60FF",
  "#FF60b0",
];
const rybColors = [
  "#FF0000",
  "#FF4000",
  "#FF8000",
  "#FFCF00",
  "#FFFF00",
  "#BFFF00",
  "#00FF00",
  "#00d0d0",
  "#2050f0",
  "#4000e0",
  "#8000e0",
  "#f000b0",
];
const ryblightColors = [
  "#FF6060",
  "#FF8040",
  "#FFc040",
  "#FFe080",
  "#FFFF60",
  "#a0FF60",
  "#70f970",
  "#a0F0ff",
  "#60b0FF",
  "#4090FF",
  "#7070FF",
  "#FF60b0",
];
let allColors = rybColors;
let lightColors = ryblightColors;
let colorButtons = [];
let outputColors = [];
let colorA = -1;
let colorB = -1;
const numSections = 12;

const element = document.getElementById("input");
element.style.alignContent = "center";

const analogous = document.getElementById("Analogous");
const acontainer = document.getElementById("AContainer");
acontainer.style.display = "flex";
const complementary = document.getElementById("Complementary");
const ccontainer = document.getElementById("CContainer");
ccontainer.style.display = "flex";
const splitComplementary = document.getElementById("SplitComplementary");
const scontainer = document.getElementById("SCContainer");
scontainer.style.display = "flex";
const triadic = document.getElementById("Triadic");
const doubleSplitComplementary = document.getElementById(
  "DoubleSplitComplementary"
);
const dcontainer = document.getElementById("DSCContainer");
dcontainer.style.display = "flex";
const tcontainer = document.getElementById("TContainer");
tcontainer.style.display = "flex";
const tetradic = document.getElementById("Tetradic");
const tecontainer = document.getElementById("TeContainer");
tecontainer.style.display = "flex";

var canvas = document.createElement("canvas");
element.appendChild(canvas);
canvas.width = 500;
canvas.height = 500;
var ctx = canvas.getContext("2d");

var radius = Math.min(canvas.width, canvas.height) / 3;
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
for (var i = 0; i < numSections; i++) {
  drawSection(i);
}

drawShadows();
function drawSection(index) {
  var startAngle = (index * 2 * Math.PI) / numSections;
  var endAngle = ((index + 1) * 2 * Math.PI) / numSections;
  if (index == colorA || index == colorB) {
    return;
  }
  ctx.fillStyle = convertToColor(index);
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.closePath();
  ctx.fill();
}

function drawShadows() {
  if (colorA != -1) {
    var startAngle = (colorA * 2 * Math.PI) / numSections;
    var endAngle = ((colorA + 1) * 2 * Math.PI) / numSections;
    var outerRadius = radius * 1.3;
    ctx.save();
    ctx.fillStyle = convertToColor(colorA);
    ctx.shadowColor = "black";
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  if (colorB != -1) {
    var startAngle = (colorB * 2 * Math.PI) / numSections;
    var endAngle = ((colorB + 1) * 2 * Math.PI) / numSections;
    var outerRadius = radius * 1.3;
    ctx.fillStyle = convertToColor(colorB);
    ctx.shadowColor = "black";
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

canvas.addEventListener("click", function (event) {
  var rect = canvas.getBoundingClientRect();
  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;
  for (var i = 0; i < numSections; i++) {
    var startAngle = (i * 2 * Math.PI) / numSections;
    var endAngle = ((i + 1) * 2 * Math.PI) / numSections;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    if (ctx.isPointInPath(mouseX, mouseY)) {
      if (colorA == i) {
        colorA = -1;
      } else if (colorB == i) {
        colorB = -1;
      } else if (colorA == -1) {
        colorA = i;
      } else if (colorB == -1) {
        colorB = i;
      }
      harmonize();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var j = 0; j < numSections; j++) {
        drawSection(j);
      }
      drawShadows();
      backgroundColor();
    }
  }
});

function backgroundColor() {
  console.log(colorA, colorB);
  const color1 = colorA >= 0 ? lightColors[colorA] : "white";
  const color2 = colorB >= 0 ? lightColors[colorB] : "white";
  document.body.style.background =
    "linear-gradient(to right, " + color1 + ", " + color2 + ")";
}

function loopColor(color) {
  return (color + numSections) % numSections;
}
function invertColor(color) {
  return loopColor(numSections / 2 - color);
}

function convertToColor(c) {
  return allColors[c];
}
function setColor(button, color) {
  if (color == colorA) {
    colorButtons[color].style.border = "none";
    colorA = -1;
  } else if (color == colorB) {
    colorButtons[color].style.border = "none";
    colorB = -1;
  } else if (colorA == -1) {
    colorA = color;
    button.style.border = "3px solid black";
    if (colorB != -1) {
      harmonize();
    }
  } else if (colorB == -1) {
    colorB = color;
    button.style.border = "3px solid black";
    if (colorA != -1) {
      harmonize();
    }
  }
}
function harmonize() {
  if (colorA == -1 || colorB == -1) {
    return;
  }
  if (colorA > colorB) {
    let temp = colorA;
    colorA = colorB;
    colorB = temp;
  }

  analogous.hidden = true;
  complementary.hidden = true;
  splitComplementary.hidden = true;
  triadic.hidden = true;
  doubleSplitComplementary.hidden = true;
  tetradic.hidden = true;
  console.log(colorB - colorA);
  switch (colorB - colorA) {
    case 1:
      {
        analogous.hidden = false;
        acontainer.innerHTML = "";
        acontainer.appendChild(
          colorBoxes(colorA, colorB, loopColor(colorA + 2), -1)
        );
        acontainer.appendChild(
          colorBoxes(loopColor(colorA + 11), colorA, colorB, -1)
        );
      }
      break;
    case 2:
      {
        analogous.hidden = false;
        acontainer.innerHTML = "";
        acontainer.appendChild(
          colorBoxes(colorA, loopColor(colorA + 1), colorB, -1)
        );
        splitComplementary.hidden = false;
        scontainer.innerHTML = "";
        scontainer.appendChild(
          colorBoxes(colorA, colorB, loopColor(colorA + 7), -1)
        );
        doubleSplitComplementary.hidden = false;
        dcontainer.innerHTML = "";
        dcontainer.appendChild(
          colorBoxes(
            colorA,
            colorB,
            loopColor(colorA + 6),
            loopColor(colorB + 6)
          )
        );
      }
      break;
    case 3:
      {
        tetradic.hidden = false;
        tecontainer.innerHTML = "";
        tecontainer.appendChild(
          colorBoxes(
            colorA,
            colorB,
            loopColor(colorA + 6),
            loopColor(colorA + 9)
          )
        );
      }
      break;
    case 4:
      {
        doubleSplitComplementary.hidden = false;
        dcontainer.innerHTML = "";
        dcontainer.appendChild(
          colorBoxes(
            colorA,
            loopColor(colorB + 6),
            loopColor(colorA + 6),
            colorB
          )
        );
        triadic.hidden = false;
        tcontainer.innerHTML = "";
        tcontainer.appendChild(
          colorBoxes(colorA, colorB, loopColor(colorA + 8), -1)
        );
      }
      break;
    case 5:
      {
        splitComplementary.hidden = false;
        scontainer.innerHTML = "";
        scontainer.appendChild(
          colorBoxes(colorB, loopColor(colorA + 7), colorA, -1)
        );
        scontainer.appendChild(
          colorBoxes(colorA, colorB, loopColor(colorA - 2), -1)
        );
      }
      break;
    case 6:
      {
        complementary.hidden = false;
        ccontainer.innerHTML = "";
        ccontainer.appendChild(colorBoxes(colorA, colorB, -1, -1));
        tetradic.hidden = false;
        tecontainer.innerHTML = "";
        tecontainer.appendChild(
          colorBoxes(
            colorA,
            loopColor(colorA + 3),
            colorB,
            loopColor(colorB + 3)
          )
        );
        doubleSplitComplementary.hidden = false;
        dcontainer.innerHTML = "";
        dcontainer.appendChild(
          colorBoxes(
            colorA,
            loopColor(colorA + 2),
            colorB,
            loopColor(colorB + 2)
          )
        );
        dcontainer.appendChild(
          colorBoxes(
            colorA,
            loopColor(colorA + 10),
            colorB,
            loopColor(colorB + 10)
          )
        );
      }
      break;
    case 7:
      {
        splitComplementary.hidden = false;
        scontainer.innerHTML = "";
        scontainer.appendChild(
          colorBoxes(loopColor(colorA + 5), colorB, colorA, -1)
        );
        scontainer.appendChild(
          colorBoxes(colorB, colorA, loopColor(colorA + 2), -1)
        );
      }
      break;
    case 8:
      {
        doubleSplitComplementary.hidden = false;
        dcontainer.innerHTML = "";
        dcontainer.appendChild(
          colorBoxes(
            colorA,
            loopColor(colorB + 6),
            colorB,
            loopColor(colorA + 6)
          )
        );
        triadic.hidden = false;
        tcontainer.innerHTML = "";
        tcontainer.appendChild(
          colorBoxes(colorA, colorB, loopColor(colorA + 4), -1)
        );
      }
      break;
    case 9:
      {
        tetradic.hidden = false;
        tecontainer.innerHTML = "";
        tecontainer.appendChild(
          colorBoxes(
            colorA,
            colorB,
            loopColor(colorA + 3),
            loopColor(colorA + 6)
          )
        );
      }
      break;
    case 10:
      {
        analogous.hidden = false;
        acontainer.innerHTML = "";
        acontainer.appendChild(
          colorBoxes(colorA, loopColor(colorB + 1), colorB, -1)
        );
        splitComplementary.hidden = false;
        scontainer.innerHTML = "";
        scontainer.appendChild(
          colorBoxes(colorA, colorB, loopColor(colorA + 5), -1)
        );
        doubleSplitComplementary.hidden = false;
        dcontainer.innerHTML = "";
        dcontainer.appendChild(
          colorBoxes(
            colorA,
            colorB,
            loopColor(colorA + 6),
            loopColor(colorB + 6)
          )
        );
      }
      break;
    case 11: {
      analogous.hidden = false;
      acontainer.innerHTML = "";
      acontainer.appendChild(
        colorBoxes(colorA, colorB, loopColor(colorA + 1), -1)
      );
      acontainer.appendChild(
        colorBoxes(loopColor(colorA + 10), colorB, colorA, -1)
      );
    }
  }
}
function colorBoxes(a, b, c, d) {
  let div = document.createElement("div");
  let box = document.createElement("div");
  box.style.width = "100px";
  box.style.height = "100px";
  box.style.backgroundColor = convertToColor(a);
  div.appendChild(box);
  box = document.createElement("div");
  box.style.width = "100px";
  box.style.height = "100px";
  box.style.backgroundColor = convertToColor(b);
  div.appendChild(box);
  if (c >= 0) {
    box = document.createElement("div");
    box.style.width = "100px";
    box.style.height = "100px";
    box.style.backgroundColor = convertToColor(c);
    div.appendChild(box);
  }
  if (d >= 0) {
    box = document.createElement("div");
    box.style.width = "100px";
    box.style.height = "100px";
    box.style.backgroundColor = convertToColor(d);
    div.appendChild(box);
  }
  div.style.display = "flex";
  div.style.flexDirection = "row";
  div.style.border = "5px solid black";
  div.style.margin = "10px";
  return div;
}
const colorButton = document.getElementById("toggleButton");
function colorSwap() {
  if (allColors == rybColors) {
    allColors = rgbColors;
    lightColors = lightrgbColors;
    colorButton.innerHTML = "Red, Green, Blue (Digital)";
  } else {
    colorButton.innerHTML = "Red, Yellow, Blue (Pigments)";
    allColors = rybColors;
    lightColors = ryblightColors;
  }
  colorA = -1;
  colorB = -1;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < numSections; i++) {
    drawSection(i);
  }
  drawShadows();
}
