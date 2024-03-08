const allColors = {
  1: "#ff0000",
  2: "#ff8000",
  3: "#ffff00",
  4: "#a6ff00",
  5: "#00f600",
  6: "#00ffa0",
  7: "#00ffff",
  8: "#0080ff",
  9: "#0000ff",
  10: "#8000ff",
  11: "#ff00ff",
  12: "#ff0080",
};
let colorButtons = [];
let outputColors = [];
let colorA = 0;
let colorB = 0;

const element = document.getElementById("input");
element.style.display = "flex";

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

for (let i = 1; i <= 12; i++) {
  const button = document.createElement("button");
  button.style.background = allColors[i];

  button.style.width = "50px";
  button.style.height = "100px";
  button.style.border = "none";
  button.onclick = () => setColor(button, i);
  colorButtons[i] = button;
  element.appendChild(button);
  const spacer = document.createElement("div");
  spacer.style.width = "30px";
  spacer.style.height = "100px";
  spacer.style.background =
    "linear-gradient(to right," +
    allColors[i] +
    "," +
    allColors[loopColor(i + 1)] +
    ")";
  element.appendChild(spacer);
}

function loopColor(color) {
  if (color <= 0) {
    return (color += 12);
  } else if (color > 12) {
    return (color -= 12);
  } else {
    return color;
  }
}
function invertColor(color) {
  color = loopColor(12 - color);
}

function convertToColor(color) {
  return allColors[color];
}
function setColor(button, color) {
  if (color == colorA) {
    colorButtons[color].style.border = "none";
    colorA = 0;
  } else if (color == colorB) {
    colorButtons[color].style.border = "none";
    colorB = 0;
  } else if (colorA == 0) {
    colorA = color;
    button.style.border = "3px solid black";
    if (colorB != 0) {
      harmonize();
    }
  } else if (colorB == 0) {
    colorB = color;
    button.style.border = "3px solid black";
    if (colorA != 0) {
      harmonize();
    }
  }
}
function harmonize() {
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
          colorBoxes(colorA, colorB, loopColor(colorA + 2), 0)
        );
        acontainer.appendChild(
          colorBoxes(loopColor(colorA + 11), colorA, colorB, 0)
        );
      }
      break;
    case 2:
      {
        analogous.hidden = false;
        acontainer.innerHTML = "";
        acontainer.appendChild(
          colorBoxes(colorA, loopColor(colorA + 1), colorB, 0)
        );
        splitComplementary.hidden = false;
        scontainer.innerHTML = "";
        scontainer.appendChild(
          colorBoxes(colorA, colorB, loopColor(colorA + 7), 0)
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
          colorBoxes(colorA, colorB, loopColor(colorA + 8), 0)
        );
      }
      break;
    case 5:
      {
        splitComplementary.hidden = false;
        scontainer.innerHTML = "";
        scontainer.appendChild(
          colorBoxes(colorB, loopColor(colorA + 7), colorA, 0)
        );
      }
      break;
    case 6:
      {
        complementary.hidden = false;
        ccontainer.innerHTML = "";
        ccontainer.appendChild(colorBoxes(colorA, colorB, 0, 0));
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
            loopColor(colorB + 10)
          )
        );
        dcontainer.appendChild(
          colorBoxes(
            colorA,
            loopColor(colorA + 10),
            colorB,
            loopColor(colorB + 2)
          )
        );
      }
      break;
    case 7:
      {
        splitComplementary.hidden = false;
        scontainer.innerHTML = "";
        scontainer.appendChild(
          colorBoxes(loopColor(colorA + 5), colorB, colorA, 0)
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
          colorBoxes(colorA, colorB, loopColor(colorA + 4), 0)
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
          colorBoxes(colorA, loopColor(colorB + 1), colorB, 0)
        );
        splitComplementary.hidden = false;
        scontainer.innerHTML = "";
        scontainer.appendChild(
          colorBoxes(colorA, colorB, loopColor(colorA + 5), 0)
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
        colorBoxes(colorA, colorB, loopColor(colorA + 1), 0)
      );
      acontainer.appendChild(
        colorBoxes(loopColor(colorA + 10), colorB, colorA, 0)
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
  if (c > 0) {
    box = document.createElement("div");
    box.style.width = "100px";
    box.style.height = "100px";
    box.style.backgroundColor = convertToColor(c);
    console.log(c);
    div.appendChild(box);
  }
  if (d > 0) {
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
