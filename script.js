const number = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const display = document.getElementById("display");
const clear = document.querySelector(".clear");
const deletebtn = document.querySelector(".delete");
const calculate = document.querySelector(".calculate");

let result = "";

number.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.value === "." && (result === "" || result.endsWith("."))) {
      return;
    }
    result += element.value;
    display.value = result;
    display.scrollLeft = display.scrollWidth;
  });
});

operator.forEach((element) => {
  element.addEventListener("click", () => {
    const lastChar = result.slice(-1);
    if (result !== "") {
      if (!"+-*/%".includes(lastChar)) {
        result += element.value;
        display.value = result;
        display.scrollLeft = display.scrollWidth;
      }
    }
  });
});

clear.addEventListener("click", () => {
  result = "";
  display.value = result;
  display.scrollLeft = display.scrollWidth;
});

deletebtn.addEventListener("click", () => {
  result = result.slice(0, -1);
  display.value = result;
  display.scrollLeft = display.scrollWidth;
});

calculate.addEventListener("click", () => {
  try {
    if (result === "") {
      return;
    }
    const calculatedResult = calculateExpression(result);
    display.value = calculatedResult;
    result = calculatedResult.toString();
  } catch (error) {
    console.error("Error calculating expression:", error);
  }
});

function calculateExpression(expression) {
  const operators = ["+", "-", "*", "/"];

  if (/^[0-9+\-*/.]+$/.test(expression)) {
    for (const operator of operators) {
      const parts = expression.split(operator);
      if (parts.length > 1) {
        const num1 = parseFloat(parts[0]);
        const num2 = parseFloat(parts[1]);
        switch (operator) {
          case "+":
            return num1 + num2;
          case "-":
            return num1 - num2;
          case "*":
            return num1 * num2;
          case "/":
            return num1 / num2;
        }
      }
    }
  }

  throw new Error("Invalid expression");
}
