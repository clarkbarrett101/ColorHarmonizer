let allColors;

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
const rybColors = [
  "#FF0000",
  "#FF4000",
  "#FF8000",
  "#FFBF00",
  "#FFFF00",
  "#BFFF00",
  "#00FF00",
  "#00d0d0",
  "#2050f0",
  "#4000e0",
  "#8000e0",
  "#f000b0",
];
let colorButtons = [];
let outputColors = [];
let colorA = -1;
let colorB = -1;
const numSections = 24;
allColors = rybColors;

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
let useRGB = false;
element.appendChild(canvas);
canvas.width = 500;
canvas.height = 500;
var ctx = canvas.getContext("2d");

var radius = Math.min(canvas.width, canvas.height) / 3;

var centerX = canvas.width / 2;
var centerY = canvas.height / 2;

// Variable to store the selected section
var selectedSection = null;

// Variable to store the section being moused over
var hoveredSection = null;

// Draw the color wheel
for (var i = 0; i < numSections; i++) {
  drawSection(i);
}

// Draw the shadows for the selected section on top
drawShadows();

function drawSection(index) {
  var startAngle = (index * 2 * Math.PI) / numSections;
  var endAngle = ((index + 1) * 2 * Math.PI) / numSections;

  if (selectedSection !== null && index === selectedSection) {
    return; // Skip the selected section for now
  }

  // Draw the regular section
  ctx.fillStyle = getColorForSection(index);

  if (hoveredSection !== null && index === hoveredSection) {
    // If it's the section being moused over, draw it with an expanded radius
    var expandedRadius = radius * 1.2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, expandedRadius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
  } else {
    // Draw the regular section
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
  }
}

function drawShadows() {
  if (colorA != -1) {
    var startAngle = (colorA * 2 * Math.PI) / numSections;
    var endAngle = ((colorA + 1) * 2 * Math.PI) / numSections;
    var outerRadius = radius * 1.3;
    ctx.save();
    ctx.fillStyle = getColorForSection(colorA);
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
    ctx.fillStyle = getColorForSection(colorB);
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

// Handle mouseover events on the canvas
canvas.addEventListener("mousemove", function (event) {
  var rect = canvas.getBoundingClientRect();
  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;

  // Check if the mouse is inside any section
  hoveredSection = null;
  for (var i = 0; i < numSections; i++) {
    var startAngle = (i * 2 * Math.PI) / numSections;
    var endAngle = ((i + 1) * 2 * Math.PI) / numSections;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();

    if (ctx.isPointInPath(mouseX, mouseY)) {
      hoveredSection = i;
      break; // Exit the loop when the first section is found
    }
  }

  // Redraw the entire color wheel on mouseover
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var j = 0; j < numSections; j++) {
    drawSection(j);
  }

  // Draw the shadows for the selected section on top
  drawShadows();
});

// Handle click events on the canvas
canvas.addEventListener("click", function (event) {
  var rect = canvas.getBoundingClientRect();
  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;

  // Check if the click is inside any section
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
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var j = 0; j < numSections; j++) {
          drawSection(j);
        }
        drawShadows();
      } else if (colorB == i) {
        colorB = -1;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var j = 0; j < numSections; j++) {
          drawSection(j);
        }
        drawShadows();
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
    }
  }
});
// Function to get the color for a section based on the selected style
function getColorForSection(index) {
  if (useRGB) {
    return "hsl(" + (index * 360) / numSections + ", 100%, 50%)";
  } else {
    return "hsl(" + rgbHueOf((index * 360) / numSections) + ", 100%, 50%)";
  }
}
// Function to draw shadows for the selected section

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
  const different = colorB - colorA;
  analogous.hidden = true;
  complementary.hidden = true;
  splitComplementary.hidden = true;
  triadic.hidden = true;
  doubleSplitComplementary.hidden = true;
  tetradic.hidden = true;
  console.log(colorB - colorA);
  if (different / numSections < 0.25) {
    analogous.hidden = false;
    acontainer.innerHTML = "";
    acontainer.appendChild(
      colorBoxes(colorA, colorB, loopColor(colorB + different), -1)
    );
    acontainer.appendChild(
      colorBoxes(loopColor(colorA - different), colorA, colorB, -1)
    );
    acontainer.appendChild(
      colorBoxes(colorA, loopColor(colorB - different / 2), colorB, -1)
    );
  }
}
function colorBoxes(a, b, c, d) {
  let div = document.createElement("div");
  let box = document.createElement("div");
  box.style.width = "100px";
  box.style.height = "100px";
  box.style.backgroundColor = getColorForSection(a);
  div.appendChild(box);
  box = document.createElement("div");
  box.style.width = "100px";
  box.style.height = "100px";
  box.style.backgroundColor = getColorForSection(b);
  div.appendChild(box);
  if (c >= 0) {
    box = document.createElement("div");
    box.style.width = "100px";
    box.style.height = "100px";
    box.style.backgroundColor = getColorForSection(c);
    div.appendChild(box);
  }
  if (d >= 0) {
    box = document.createElement("div");
    box.style.width = "100px";
    box.style.height = "100px";
    box.style.backgroundColor = getColorForSection(d);
    div.appendChild(box);
  }
  div.style.display = "flex";
  div.style.flexDirection = "row";
  div.style.border = "5px solid black";
  div.style.margin = "10px";
  return div;
}
const colorButton = document.getElementById("ColorButton");
function colorSwap() {
  useRGB = !useRGB;
  colorA = -1;
  colorB = -1;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < numSections; i++) {
    drawSection(i);
  }
  drawShadows();
}
var wheel = [
  0, 0, 15, 8, 30, 17, 45, 26, 60, 34, 75, 41, 90, 48, 105, 54, 120, 60, 135,
  81, 150, 103, 165, 123, 180, 138, 195, 155, 210, 171, 225, 187, 240, 204, 255,
  219, 270, 234, 285, 251, 300, 267, 315, 282, 330, 298, 345, 329, 360, 360,
];

function rgbHueOf(rybHue) {
  try {
    var x0, y0;
    var x1, y1;
    for (var i = 0; i < wheel.length - 2; i += 2) {
      x0 = wheel[i];
      y0 = wheel[i + 1];
      x1 = wheel[i + 2];
      y1 = wheel[i + 3];

      if (rybHue <= x1 && rybHue >= x0) {
        return y0 + ((y1 - y0) * (rybHue - x0)) / (x1 - x0);
      }
    }
  } catch (e) {
    console.log(rybHue);
  }
}
