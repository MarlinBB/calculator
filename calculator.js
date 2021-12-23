let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector(".screen");

function rerender() {
  screen.innerText = buffer;
}
//Main function
function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbole(value);
  } else {
    handleNumber(value);
  }
  rerender();
}
//2nd sub function
function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}
//sub function
function handleSymbole(value) {
  switch (value) {
    case "c":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    default:
      handleMath(value);
      break;
  }
}
function handleMath(value) {
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = value;

  buffer = "0";
}
// operators function
function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "x") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}

document
  .querySelector(".calc-buttons")
  .addEventListener("click", function (event) {
    console.log(event.target.innerText);
    buttonClick(event.target.innerText);
  });
