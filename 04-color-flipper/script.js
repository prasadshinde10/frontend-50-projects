const flipBtn = document.getElementById("flip");
const colorText = document.getElementById("color");

function randomColor() {
  const r = Math.floor(Math.random()*156+100);
  const g = Math.floor(Math.random()*156+100);
  const b = Math.floor(Math.random()*156+100);
  return `rgb(${r}, ${g}, ${b})`;
}

flipBtn.addEventListener("click", () => {
  const color = randomColor();
  document.body.style.background = color;
  colorText.textContent = color;
});
