const steps = document.querySelectorAll(".step");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const bar = document.getElementById("bar");

let current = 0;

function showStep() {
  steps.forEach((s,i)=>s.classList.toggle("active", i===current));
  bar.style.width = `${((current+1)/steps.length)*100}%`;
  prev.disabled = current === 0;
  next.textContent = current === steps.length-1 ? "Submit" : "Next";
}
next.onclick = () => {
  const input = steps[current].querySelector("input");
  if (!input.value.trim()) { alert("Please fill the field."); return; }
  if (current < steps.length-1) current++;
  else alert("Form submitted!");
  showStep();
};
prev.onclick = () => { if (current > 0) current--; showStep(); };
showStep();