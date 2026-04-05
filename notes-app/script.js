const note = document.getElementById("note");
const saved = document.getElementById("saved");

note.value = localStorage.getItem("note") || "";

document.getElementById("save").addEventListener("click", () => {
  localStorage.setItem("note", note.value);
  saved.textContent = "Saved!";
  setTimeout(() => (saved.textContent = ""), 1000);
});