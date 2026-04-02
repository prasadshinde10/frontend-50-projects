const buttons = document.querySelectorAll(".tab-buttons button");
const contents = document.querySelectorAll("[data-content]");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    contents.forEach(c => c.classList.add("hidden"));

    btn.classList.add("active");
    document.querySelector(`[data-content="${btn.dataset.tab}"]`).classList.remove("hidden");
  });
});
