let secret = Math.floor(Math.random() * 20) + 1;
const message = document.getElementById("message");

document.getElementById("check").addEventListener("click", () => {
  const guess = Number(document.getElementById("guess").value);
  if (!guess) return (message.textContent = "Enter a valid number.");
  if (guess === secret) message.textContent = "🎉 Correct!";
  else if (guess > secret) message.textContent = "Too high!";
  else message.textContent = "Too low!";
});

document.getElementById("reset").addEventListener("click", () => {
  secret = Math.floor(Math.random() * 20) + 1;
  message.textContent = "Start guessing...";
  document.getElementById("guess").value = "";
});