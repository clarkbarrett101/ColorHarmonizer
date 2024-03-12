let colorA = -1;
let colorB = -1;
const numSections = 24;
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
var selectedSection = null;
var hoveredSection = null;
for (var i = 0; i < numSections; i++) {
  drawSection(i);
}
drawShadows();

function drawSection(index) {
  var startAngle = (index * 2 * Math.PI) / numSections;
  var endAngle = ((index + 1) * 2 * Math.PI) / numSections;

  if (selectedSection !== null && index === selectedSection) {
    return;
  }
  ctx.fillStyle = getColorForSection(index);

  if (hoveredSection !== null && index === hoveredSection) {
    var expandedRadius = radius * 1.2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, expandedRadius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
  } else {
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

canvas.addEventListener("mousemove", function (event) {
  var rect = canvas.getBoundingClientRect();
  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;

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
      break;
    }
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var j = 0; j < numSections; j++) {
    drawSection(j);
  }

  drawShadows();
});

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

function getColorForSection(index) {
  if (useRGB) {
    return "hsl(" + index * (360 / numSections) + ", 100%, 50% )";
  } else {
    return "hsl(" + rgbHueOf((index * 360) / numSections) + ",100%, 50%)";
  }
}

function bgColors(index) {
  if (useRGB) {
    return "hsl(" + index * (360 / numSections) + ", 100%, 75% )";
  } else {
    return "hsl(" + rgbHueOf((index * 360) / numSections) + ",100%, 75%)";
  }
}

function backgroundColor() {
  console.log(colorA, colorB);
  const color1 = colorA >= 0 ? bgColors(colorA) : "white";
  const color2 = colorB >= 0 ? bgColors(colorB) : "white";
  document.body.style.background =
    "linear-gradient(to right, " + color1 + ", " + color2 + ")";
}

function loopColor(color) {
  return (color + numSections) % numSections;
}
function invertColor(color) {
  return loopColor(numSections / 2 + color);
}

function harmonize() {
  if (colorA == -1 || colorB == -1) {
    analogous.hidden = true;
    doubleSplitComplementary.hidden = true;
    splitComplementary.hidden = true;
    complementary.hidden = true;
    tetradic.hidden = true;
    triadic.hidden = true;
    return;
  }
  if (colorA > colorB) {
    let temp = colorA;
    colorA = colorB;
    colorB = temp;
  }

  let different = colorB - colorA;
  let middle = (colorA + colorB) / 2;
  if (different > numSections / 2) {
    middle = (middle + numSections / 2) % numSections;
  }
  doubleSplitComplementary.hidden = false;
  if (invertColor(colorA) == colorB) {
    dcontainer.innerHTML = "";
    dcontainer.appendChild(
      colorBoxes(
        colorA,
        loopColor(colorA + numSections / 4),
        colorB,
        loopColor(colorB + numSections / 4)
      )
    );
    dcontainer.appendChild(
      colorBoxes(
        colorA,
        loopColor(colorA - numSections / 4),
        colorB,
        loopColor(colorB - numSections / 4)
      )
    );
    complementary.hidden = false;
    ccontainer.innerHTML = "";
    ccontainer.appendChild(colorBoxes(colorA, colorB, -1, -1));
    tetradic.hidden = false;
    tecontainer.innerHTML = "";
    tecontainer.appendChild(
      colorBoxes(
        colorA,
        loopColor(colorA + numSections / 4),
        colorB,
        loopColor(colorB + numSections / 4)
      )
    );
  } else {
    analogous.hidden = false;
    splitComplementary.hidden = false;
    acontainer.innerHTML = "";
    acontainer.appendChild(colorBoxes(colorA, middle, colorB, -1));
    if (different / numSections < 0.25) {
      acontainer.appendChild(
        colorBoxes(colorA, colorB, loopColor(colorB + different), -1)
      );
      acontainer.appendChild(
        colorBoxes(loopColor(colorA - different), colorA, colorB, -1)
      );
    }
    scontainer.innerHTML = "";
    scontainer.appendChild(colorBoxes(colorA, invertColor(middle), colorB, -1));
    if (different / numSections > 0.66) {
      scontainer.appendChild(
        colorBoxes(
          colorA,
          loopColor(colorA + (invertColor(colorB) - colorA) / 2),
          colorB,
          -1
        )
      );
      scontainer.appendChild(
        colorBoxes(
          colorB,
          loopColor(colorB + (colorB - invertColor(colorA)) / 2),
          colorA,
          -1
        )
      );
    }
    scontainer.appendChild(
      colorBoxes(
        colorA,
        loopColor(colorA + (invertColor(colorB) - colorA) / 2),
        colorB,
        -1
      )
    );
    scontainer.appendChild(
      colorBoxes(
        colorB,
        loopColor(colorB + (colorB - invertColor(colorA)) / 2),
        colorA,
        -1
      )
    );
    dcontainer.innerHTML = "";
    dcontainer.appendChild(
      colorBoxes(colorA, colorB, invertColor(colorA), invertColor(colorB))
    );
    if (
      (different / numSections < 0.35 && different / numSections > 0.3) ||
      (different / numSections < 0.7 && different / numSections > 0.65)
    ) {
      splitComplementary.hidden = true;
      triadic.hidden = false;
      tcontainer.innerHTML = "";
      tcontainer.appendChild(
        colorBoxes(colorA, invertColor(middle), colorB, -1)
      );
    }
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

const colorButton = document.getElementById("toggleButton");
function colorSwap() {
  useRGB = !useRGB;
  colorButton.innerHTML = useRGB
    ? "Red Green Blue (Digital)"
    : "Red Yellow Blue (Pigments)";
  harmonize();
  backgroundColor();
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
