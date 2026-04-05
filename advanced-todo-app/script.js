const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filters = document.querySelectorAll(".filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function render() {
  taskList.innerHTML = "";
  const filtered = tasks.filter(t => {
    if (currentFilter === "completed") return t.completed;
    if (currentFilter === "pending") return !t.completed;
    return true;
  });

  filtered.forEach(task => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onchange = () => {
      task.completed = checkbox.checked;
      save(); render();
    };

    const span = document.createElement("span");
    span.textContent = task.text;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "action-btn edit-btn";
    editBtn.onclick = () => {
      const newText = prompt("Edit task:", task.text);
      if (newText && newText.trim()) {
        task.text = newText.trim();
        save(); render();
      }
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "action-btn";
    delBtn.onclick = () => {
      tasks = tasks.filter(t => t.id !== task.id);
      save(); render();
    };

    li.append(checkbox, span, editBtn, delBtn);
    taskList.appendChild(li);
  });
}
addBtn.onclick = () => {
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.push({ id: Date.now(), text, completed: false });
  taskInput.value = "";
  save(); render();
};

filters.forEach(btn => {
  btn.onclick = () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  };
});

render();