const buttons = document.querySelectorAll(".btn-row button");
const output = document.getElementById("display");
buttons.forEach((button) => {
  button.addEventListener("click", buttonClick);
});

function buttonClick(e) {
  const buttonValue = e.target.textContent;
  const action = e.target.dataset.action;

  console.log("Clicked button value:", buttonValue);

  if (
    action !== "clear" &&
    action !== "delete" &&
    action !== "calculate"
  ) {
    output.textContent += buttonValue;
  }
  if(action==="clear")output.textContent =""
}

// Add keyboard event listener
document.addEventListener("keydown", handleKeyDown);

function handleKeyDown(e) {
  const key = e.key;
  const calculatorBtn =
    key === "Enter" || key === "="
      ? Array.from(buttons).find((button) => button.dataset.value === "Enter")
      : Array.from(buttons).find((button) => button.dataset.value === key);

  if (calculatorBtn) {
    calculatorBtn.click();
  }
}
