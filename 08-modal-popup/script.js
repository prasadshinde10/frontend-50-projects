const modal = document.getElementById("modal");
document.getElementById("open").onclick = () => modal.classList.remove("hidden");
document.getElementById("close").onclick = () => modal.classList.add("hidden");
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});
