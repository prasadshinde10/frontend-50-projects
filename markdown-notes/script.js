const input = document.getElementById("input");
const preview = document.getElementById("preview");
const saveBtn = document.getElementById("save");

input.value = localStorage.getItem("note") || "";

function render(md) {
  return md
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*)\*\*/gim, "<b>$1</b>")
    .replace(/\*(.*)\*/gim, "<i>$1</i>")
    .replace(/\n$/gim, "<br />");
}
function update() {
  preview.innerHTML = render(input.value);
}
input.addEventListener("input", update);
saveBtn.onclick = () => {
  localStorage.setItem("note", input.value);
  saveBtn.textContent = "Saved!";
  setTimeout(() => (saveBtn.textContent = "Save Note"), 1000);
};
update();