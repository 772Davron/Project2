const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const todoList = document.getElementById("todoList");
const themeBtn = document.getElementById("themeBtn");
const body = document.body;

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

/* =========================
   GLOBAL ARRAY
========================= */

let tasks = [];

/* =========================
   LOCAL STORAGE LOAD
========================= */

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
}



function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* =========================
   RENDER (map)
========================= */

function renderTasks(taskArray) {

  todoList.innerHTML = "";

  taskArray.map(task => {

    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");

    checkbox.type = "checkbox";
    checkbox.className = "taskCheckbox";
    checkbox.checked = task.completed;

    span.textContent = task.text;

    deleteBtn.textContent = "❌";
    deleteBtn.className = "deleteBtn";

    if (task.completed) {
      span.classList.add("completed");
    }

    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks(); // Checkbox o‘zgarganda ham saqlaymiz
    });

    
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks(tasks);
      saveTasks(); // Delete qilinganda saqlaymiz
    });

    li.append(checkbox, span, deleteBtn);
    todoList.appendChild(li);
  });
}

/* =========================
   ADD TASK
========================= */

addTaskBtn.addEventListener("click", () => {

  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(newTask);

  renderTasks(tasks);
  saveTasks(); // Qo‘shilganda saqlaymiz

  taskInput.value = "";
});

/* =========================
   SEARCH BUTTON (filter + find)
========================= */

searchBtn.addEventListener("click", () => {

  const value = searchInput.value.toLowerCase();

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(value)
  );

  renderTasks(filteredTasks);

  const foundTask = tasks.find(task =>
    task.text.toLowerCase() === value
  );

  console.log("Find result:", foundTask);
});

/* =========================
   THEME
========================= */

themeBtn.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
  themeBtn.textContent =
    body.classList.contains("dark-theme") ? "☀️" : "🌙";
});

/* =========================
   ALERT
========================= */

const myInterval = setInterval(() => {
  alert("Siz hali ham saytdamisiz?");
}, 10000);

/* =========================
   PAGE LOAD
========================= */

loadTasks();
renderTasks(tasks);