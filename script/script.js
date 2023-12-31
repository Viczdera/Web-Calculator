document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll("button");

  let currentInput = "0";
  let firstOperand = null;
  let secondOperand = null;
  let firstOperator = null;
  let secondOperator = null;
  let result = null;


  function updateDisplay() {
    display.innerText = currentInput;
    if (!isNaN(currentInput) && currentInput.length > 9) {
      display.innerText = currentInput.substring(0, 9);
    } else if (!isNaN(currentInput)) {
      display.innerText = currentInput;
    } else {
      display.classList.add("display-error");
    }
  }

  function Operand(operand) {
    if (firstOperator === null) {
      if (currentInput === "0" || currentInput === "Cannot divide by zero") {
        currentInput = operand;
      } else if (currentInput === firstOperand) {
        currentInput = operand;
      } else {
        currentInput += operand;
      }
    } else {
      if (currentInput === firstOperand) {
        currentInput = operand;
      } else {
        currentInput += operand;
      }
    }
  }
  
  function Operator(operator) {
    if (firstOperator != null && secondOperator === null) {
      secondOperator = operator;
    } else if (firstOperator != null && secondOperator != null) {
      secondOperator = operator;
      result = calculate(Number(firstOperand), Number(secondOperand), secondOperator);
      firstOperand = result.toString();
      currentInput = result.toString();
      secondOperand = null;
      result = null;
    } else {
      firstOperator = operator;
      firstOperand = currentInput;
    }
  }
  

  function Equals() {
    if (firstOperator === null) {
      currentInput = currentInput;
    } else if (secondOperator != null) {
      secondOperand = currentInput;
      result = calculate(
        Number(firstOperand),
        Number(secondOperand),
        secondOperator
      );
      if (result === "Cannot divide by zero") {
        currentInput = "Cannot divide by zero";
      } else {
        currentInput = roundTo(result, 15).toString();
        firstOperand = currentInput;
        secondOperand = null;
        firstOperator = null;
        secondOperator = null;
        result = null;
      }
    } else {
      secondOperand = currentInput;
      result = calculate(
        Number(firstOperand),
        Number(secondOperand),
        firstOperator
      );
      if (result === "Cannot divide by zero") {
        currentInput = "Cannot divide by zero";
      } else {
        currentInput = roundTo(result, 15).toString();
        firstOperand = currentInput;
        secondOperand = null;
        firstOperator = null;
        secondOperator = null;
        result = null;
      }
    }
    
  }

  function Decimal(dot) {
    if (
      currentInput === firstOperand ||
      currentInput === secondOperand ||
      currentInput === "Cannot divide by zero"
    ) {
      currentInput = "0";
      currentInput += dot;
    } else if (!currentInput.includes(dot)) {
      currentInput += dot;
    }
  }

  function Percent() {
    currentInput = (Number(currentInput) / 100).toString();
  }

  function Sign() {
    currentInput = (Number(currentInput) * -1).toString();
  }

  function clearDisplay() {
    currentInput = "0";
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
  }

  function calculate(a, b, calc) {
    if (calc === "+") {
      return a + b;
    } else if (calc === "-") {
      return a - b;
    } else if (calc === "*") {
      return a * b;
    } else if (calc === "/") {
      if (b === 0) {
        currentInput = "Cannot divide by zero";
        return "Cannot divide by zero";
      } else {
        return a / b;
      }
    }
  }

  function deLete() {
    if (currentInput === "Cannot divide by zero") {
      currentInput = "0";
    } else {
      currentInput = currentInput.slice(0, -1) || "0";
    }
  }

  function roundTo(num, places) {
    return parseFloat(Math.round(num + "e" + places) + "e-" + places);
  }

  // Add event listeners for button clicks
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const buttonType = button.getAttribute("data-type");
      button.classList.add("btn-click");
      setTimeout(() => {
        button.classList.remove("btn-click");
      }, 200);

      if (buttonType === "operand") {
        Operand(button.getAttribute("data-value"));
        updateDisplay();
      } else if (buttonType === "operator") {
        Operator(button.getAttribute("data-value"));
      } else if (buttonType === "enter") {
        e.preventDefault()
        Equals();
        updateDisplay();
      } else if (buttonType === "decimal") {
        Decimal(button.getAttribute("data-value"));
        updateDisplay();
      } else if (buttonType === "percent") {
        Percent();
        updateDisplay();
      } else if (buttonType === "sign") {
        Sign();
        updateDisplay();
      } else if (buttonType === "clear") {
        clearDisplay();
        updateDisplay();
      } else if (buttonType === "delete") {
        deLete();
        updateDisplay();
      }
    });
  });


  window.addEventListener("keydown", function (e) {
    const calcButton =
      e.key === "="
        ? document.querySelector(`button[data-value='Enter']`)
        : document.querySelector(`button[data-value='${e.key}']`);
    if (calcButton) calcButton.click();

    if (e.key === "%") {
      Percent();
      updateDisplay();
    } else if (e.key === "_") {
      Sign();
      updateDisplay();
    }
  });
  // Initialize display
  updateDisplay();
});
