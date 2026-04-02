const form = document.getElementById("form");
const input = document.getElementById("input");
const list = document.getElementById("list");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement("li");
  li.textContent = text;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "✕";
  removeBtn.style.border = "0";
  removeBtn.style.background = "transparent";
  removeBtn.style.cursor = "pointer";

  removeBtn.addEventListener("click", () => li.remove());

  li.appendChild(removeBtn);
  list.appendChild(li);
  input.value = "";
});
