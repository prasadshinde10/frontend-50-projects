const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;
    const action = btn.dataset.action;

    if (value) display.value += value;
    if (action === "clear") display.value = "";
    if (action === "del") display.value = display.value.slice(0, -1);
    if (action === "equals") {
      try {
        display.value = eval(display.value);
      } catch {
        display.value = "Error";
      }
    }
  });
});
