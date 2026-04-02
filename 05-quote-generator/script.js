const quotes = [
  "Success is built on small consistent actions.",
  "Dream big, start small, act now.",
  "Learning never exhausts the mind.",
  "Discipline beats motivation."
];

const quoteEl = document.getElementById("quote");
document.getElementById("new-quote").addEventListener("click", () => {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.textContent = random;
});
