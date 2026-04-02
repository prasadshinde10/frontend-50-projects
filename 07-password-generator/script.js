const result = document.getElementById("result");
const copyBtn = document.getElementById("copy");
const lengthSlider = document.getElementById("length");
const lenVal = document.getElementById("len-val");

const checks = {
  upper: document.getElementById("upper"),
  lower: document.getElementById("lower"),
  numbers: document.getElementById("numbers"),
  symbols: document.getElementById("symbols")
};

const chars = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+[]{}<>?"
};

lengthSlider.addEventListener("input", () => {
  lenVal.textContent = lengthSlider.value;
});

document.getElementById("generate").addEventListener("click", () => {
  let pool = "";
  for (const key in checks) {
    if (checks[key].checked) pool += chars[key];
  }
  if (!pool) return;

  let password = "";
  for (let i = 0; i < lengthSlider.value; i++) {
    password += pool[Math.floor(Math.random() * pool.length)];
  }
  result.value = password;
});

copyBtn.addEventListener("click", async () => {
  if (!result.value) return;
  await navigator.clipboard.writeText(result.value);
  copyBtn.textContent = "Copied!";
  setTimeout(() => (copyBtn.textContent = "Copy"), 1000);
});
