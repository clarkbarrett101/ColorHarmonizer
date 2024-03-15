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
if (window.innerWidth < window.innerHeight) {
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerWidth - 20;
  document.body.style.flexDirection = "column";
} else {
  canvas.width = window.innerHeight - 20;
  canvas.height = window.innerHeight - 20;
  document.body.style.flexDirection = "row";
}
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
    startAngle = (index * 2 * Math.PI) / numSections;
    endAngle = ((index + 1) * 2 * Math.PI) / numSections;
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

canvas.addEventListener("touchstart", function (event) {
  hightlight(event);
});
canvas.addEventListener("mousemove", function (event) {
  hightlight(event);
});
function hightlight(event) {
  document.body.style.overflow = "hidden";
  var rect = canvas.getBoundingClientRect();
  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;

  hoveredSection = null;
  for (var i = 0; i < numSections; i++) {
    var startAngle = (i * 2 * Math.PI) / numSections;
    var endAngle = ((i + 1) * 2 * Math.PI) / numSections;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, canvas.width, startAngle, endAngle);
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
}

canvas.addEventListener("mouseup", function (event) {
  document.body.style.overflow = "";
  var rect = canvas.getBoundingClientRect();
  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;

  for (var i = 0; i < numSections; i++) {
    var startAngle = (i * 2 * Math.PI) / numSections;
    var endAngle = ((i + 1) * 2 * Math.PI) / numSections;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, canvas.width, startAngle, endAngle);
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
  let loopSide = false;
  if (colorA + numSections - colorB < different) {
    different = colorA + numSections - colorB;
    middle = loopColor((colorA + numSections + colorB) / 2);
    loopSide = true;
  }
  const diff = (100 * different) / numSections;

  if (invertColor(colorA) == colorB) {
    complementary.hidden = false;
    ccontainer.innerHTML = "";
    ccontainer.appendChild(colorDots([colorA, colorB]));
    tetradic.hidden = false;
    tecontainer.innerHTML = "";
    tecontainer.appendChild(
      colorDots([
        colorA,
        loopColor(colorA + numSections / 4),
        colorB,
        loopColor(colorB + numSections / 4),
      ])
    );
    doubleSplitComplementary.hidden = false;
    dcontainer.innerHTML = "";
    dcontainer.appendChild(
      colorDots([
        colorA,
        loopColor(colorA + numSections * 0.08),
        loopColor(colorB + 0.08 * numSections),
        colorB,
      ])
    );
    dcontainer.appendChild(
      colorDots([
        colorA,
        loopColor(colorA - numSections * 0.08),
        loopColor(colorB - 0.08 * numSections),
        colorB,
      ])
    );
  } else {
    if (diff < 28 && diff > 20) {
      tetradic.hidden = false;
      tecontainer.innerHTML = "";
      tecontainer.appendChild(
        colorDots([colorA, invertColor(colorA), colorB, invertColor(colorB)])
      );
    } else {
      doubleSplitComplementary.hidden = false;
      dcontainer.innerHTML = "";
      dcontainer.appendChild(
        colorDots([colorA, invertColor(colorB), invertColor(colorA), colorB])
      );
    }
    if (diff > 28 && diff < 40) {
      triadic.hidden = false;
      tcontainer.innerHTML = "";
      tcontainer.appendChild(colorDots([colorA, invertColor(middle), colorB]));
    }
    if (diff <= 30) {
      analogous.hidden = false;
      acontainer.innerHTML = "";
      acontainer.appendChild(colorDots([loopColor(middle), colorA, colorB]));
      if (diff < 25) {
        if (diff < 15) {
          acontainer.appendChild(
            colorDots([loopColor(middle - 1.5 * different), colorA, colorB])
          );
          acontainer.appendChild(
            colorDots([loopColor(middle + 1.5 * different), colorA, colorB])
          );
        }
        splitComplementary.hidden = false;
        scontainer.innerHTML = "";
        scontainer.appendChild(
          colorDots([colorA, colorB, invertColor(middle)])
        );
      }
    } else if (diff > 40) {
      splitComplementary.hidden = false;
      scontainer.innerHTML = "";
      if (loopSide) {
        scontainer.appendChild(
          colorDots([colorA, loopColor(colorA - 2 * different), colorB])
        );
        scontainer.appendChild(
          colorDots([colorA, colorB, loopColor(colorB + 2 * different)])
        );
      } else {
        scontainer.appendChild(
          colorDots([colorA, loopColor(colorA + 2 * different), colorB])
        );
        scontainer.appendChild(
          colorDots([colorA, colorB, loopColor(colorB - 2 * different)])
        );
      }
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
function colorDots(colors) {
  const dotCanvas = document.createElement("canvas");
  const height = 200;
  dotCanvas.height = height;
  dotCanvas.width = height;
  const ctx = dotCanvas.getContext("2d");
  const sections = colors.length;
  console.log(colors);
  for (var i = 0; i < sections; i++) {
    ctx.fillStyle = getColorForSection(colors[i]);
    var startAngle = -Math.PI / 2 + (i * 2 * Math.PI) / sections;
    var endAngle = -Math.PI / 2 + ((i + 1) * 2 * Math.PI) / sections;
    ctx.beginPath();
    ctx.moveTo(height / 2, height / 2);
    ctx.arc(height / 2, height / 2, 75, startAngle, endAngle);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
  return dotCanvas;
}

const colorButton = document.getElementById("toggleButton");
function colorSwap() {
  useRGB = !useRGB;
  colorButton.innerHTML = useRGB
    ? "Red Green Blue (Screens)"
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
  } catch (e) {}
}
function drawSections() {
  for (var i = 0; i < numSections; i++) {
    drawSection(i);
  }
  drawShadows();
}
drawSections();
/*
 * Ag mid : 0 - 40
 * db invert :  0 - 50
 * Ag right, left , sp invert : 0 - 25
 * tri : 25 - 40
 * sp left, right :  40 - 50
 * tet/comp db left, right == 50
 */
