const buttons = document.querySelectorAll(".btn-row button");
const output = document.getElementById("display");
buttons.forEach((button) => {
  button.addEventListener("click", buttonClick);
});

function buttonClick(e) {
  const button=e.target
  const buttonValue = button.textContent;
  const action = button.dataset.action;

  console.log("Clicked button value:", buttonValue);

  if (
    action !== "clear" &&
    action !== "delete" &&
    action !== "calculate"
  ) {
    output.textContent += buttonValue;
  }
  if(action==="clear")output.textContent =""

  button.classList.add("btn-click");

  setTimeout(() => {
    button.classList.remove("btn-click");
  }, 200);
}

// Add keyboard event listener
document.addEventListener("keydown", onKeyDown);

function onKeyDown(e) {
  const key = e.key;
  const calculatorBtn =
    key === "Enter" || key === "="
      ? Array.from(buttons).find((button) => button.dataset.value === "Enter")
      : Array.from(buttons).find((button) => button.dataset.value === key);

  if (calculatorBtn) {
    calculatorBtn.click();
  }
}
