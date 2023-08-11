// const buttons = document.querySelectorAll(".btn-row button");
// const output = document.getElementById("display");
// buttons.forEach((button) => {
//   button.addEventListener("click", buttonClick);
// });

// function buttonClick(e) {
//   const button=e.target
//   const buttonValue = button.textContent;
//   const action = button.dataset.action;

//   console.log("Clicked button value:", buttonValue);

//   if (
//     action !== "clear" &&
//     action !== "delete" &&
//     action !== "calculate"
//   ) {
//     output.textContent += buttonValue;
//   }
//   if(action==="clear")output.textContent =""

//   button.classList.add("btn-click");

//   setTimeout(() => {
//     button.classList.remove("btn-click");
//   }, 200);
// }

// // Add keyboard event listener
// document.addEventListener("keydown", onKeyDown);

// function onKeyDown(e) {
//   const key = e.key;
//   const calculatorBtn =
//     key === "Enter" || key === "="
//       ? Array.from(buttons).find((button) => button.dataset.value === "Enter")
//       : Array.from(buttons).find((button) => button.dataset.value === key);

//   if (calculatorBtn) {
//     calculatorBtn.click();
//   }
// }

document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const numberButtons = document.querySelectorAll('[data-value]');
  const operatorButtons = document.querySelectorAll('[data-action]');
  const clearButton = document.querySelector('[data-action="clear"]');
  const deleteButton = document.querySelector('[data-action="delete"]');
  const calculateButton = document.querySelector('[data-action="calculate"]');
  const decimalButton = document.querySelector('[data-value="."]');
  
  let currentInput = '0';
  let firstOperand = null;
  let operator = null;
  
  // Update display
  function updateDisplay() {
    display.textContent = currentInput;
  }
  
  // Clear calculator
  function clearCalculator() {
    currentInput = '0';
    firstOperand = null;
    operator = null;
    updateDisplay();
  }
  
  // Handle number button clicks
  function handleNumberClick(number) {
    if (currentInput === '0' || operator === '=') {
      currentInput = number;
    } else {
      currentInput += number;
    }
    updateDisplay();
  }
  
  // Handle operator button clicks
  function handleOperatorClick(action) {
    if (operator !== null) {
      calculate();
    }
    if (action !== 'calculate') {
      operator = action;
      firstOperand = parseFloat(currentInput);
      currentInput = '0';
    }
  }
  
  // Perform calculation
  function calculate() {
    const secondOperand = parseFloat(currentInput);
    switch (operator) {
      case 'add':
        currentInput = (firstOperand + secondOperand).toString();
        break;
      case 'subtract':
        currentInput = (firstOperand - secondOperand).toString();
        break;
      case 'multiply':
        currentInput = (firstOperand * secondOperand).toString();
        break;
      case 'divide':
        if (secondOperand !== 0) {
          currentInput = (firstOperand / secondOperand).toString();
        } else {
          currentInput = 'Error: Cannot divide by zero';
        }
        break;
    }
    operator = null;
    firstOperand = parseFloat(currentInput);
    updateDisplay();
  }
  
  // Add event listeners for number buttons
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      handleNumberClick(button.textContent);
    });
  });
  
  // Add event listeners for operator buttons
  operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
      handleOperatorClick(button.dataset.action);
    });
  });
  
  // Add event listeners for other buttons
  clearButton.addEventListener('click', clearCalculator);
  deleteButton.addEventListener('click', () => {
    currentInput = currentInput.slice(0, -1) || '0';
    updateDisplay();
  });
  calculateButton.addEventListener('click', calculate);
  decimalButton.addEventListener('click', () => {
    if (!currentInput.includes('.')) {
      currentInput += '.';
      updateDisplay();
    }
  });
  
  // Keyboard support
  document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/[0-9]/.test(key)) {
      handleNumberClick(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
      handleOperatorClick(key);
    } else if (key === 'Enter') {
      calculate();
    } else if (key === '.') {
      if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
      }
    } else if (key === 'Backspace') {
      currentInput = currentInput.slice(0, -1) || '0';
      updateDisplay();
    }
  });
  
  // Initialize display
  updateDisplay();
});
