const timeEl = document.getElementById("time");

function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("en-US");
  timeEl.textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();
