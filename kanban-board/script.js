const addTaskBtn = document.getElementById("addTaskBtn");
const lists = document.querySelectorAll(".list");

let tasks = JSON.parse(localStorage.getItem("kanban")) || [];

function save() {
  localStorage.setItem("kanban", JSON.stringify(tasks));
}
function render() {
  lists.forEach(l => (l.innerHTML = ""));
  tasks.forEach(task => {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = task.title;
    card.draggable = true;
    card.dataset.id = task.id;
    card.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", task.id);
    });
    document.getElementById(task.status).appendChild(card);
  });
}
addTaskBtn.onclick = () => {
  const title = prompt("Task title:");
  if (!title) return;
  tasks.push({ id: Date.now().toString(), title, status: "todo" });
  save(); render();
};

lists.forEach(list => {
  list.addEventListener("dragover", e => e.preventDefault());
  list.addEventListener("drop", e => {
    const id = e.dataTransfer.getData("text/plain");
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.status = list.id;
      save(); render();
    }
  });
});

render();