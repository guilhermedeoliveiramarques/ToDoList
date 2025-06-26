let tasks = [];
let editingIndex = -1;

function addOrUpdateTask() {
  const title = document.getElementById("taskTitle").value.trim();
  const start = document.getElementById("taskStart").value;
  const end = document.getElementById("taskEnd").value;
  const desc = document.getElementById("taskDesc").value.trim();

  if (!title || !start || !end) {
    showToast("Preencha todos os campos obrigatórios!", true);
    return;
  }

  const task = { title, start, end, desc };

  if (editingIndex >= 0) {
    tasks[editingIndex] = task;
    editingIndex = -1;
    showToast("Tarefa atualizada com sucesso!");
  } else {
    tasks.push(task);
    showToast("Tarefa adicionada com sucesso!");
  }

  clearForm();
  renderTasks();
}

function renderTasks(filtered = null) {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  const data = filtered || tasks;

  data.forEach((task, index) => {
    const li = document.createElement("li");

    const text = document.createElement("div");
    text.className = "text";
    text.textContent = task.title;

    const details = document.createElement("div");
    details.className = "task-details";
    details.innerHTML = `🕒 ${task.start} - ${task.end}<br>${task.desc}`;

    const actions = document.createElement("div");
    actions.className = "actions";

    const edit = document.createElement("button");
    edit.innerHTML = "✏️";
    edit.onclick = () => editTask(index);

    const del = document.createElement("button");
    del.innerHTML = "🗑️";
    del.onclick = () => deleteTask(index);

    actions.appendChild(edit);
    actions.appendChild(del);

    li.appendChild(text);
    li.appendChild(details);
    li.appendChild(actions);

    list.appendChild(li);
  });
}

function editTask(index) {
  const task = tasks[index];
  document.getElementById("taskTitle").value = task.title;
  document.getElementById("taskStart").value = task.start;
  document.getElementById("taskEnd").value = task.end;
  document.getElementById("taskDesc").value = task.desc;
  editingIndex = index;
}

function deleteTask(index) {
  const title = tasks[index].title;
  tasks.splice(index, 1);
  renderTasks();
  showToast(`Tarefa "${title}" excluída com sucesso!`);
}

function clearForm() {
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskStart").value = "";
  document.getElementById("taskEnd").value = "";
  document.getElementById("taskDesc").value = "";
}

function filterTasks() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = tasks.filter(t => t.title.toLowerCase().includes(query));
  renderTasks(filtered);
}

function showToast(message, isError = false) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast${isError ? " error" : ""}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function confirmName() {
  const name = document.getElementById("usernameInput").value.trim();
  if (name !== "") {
    document.getElementById("taskHeader").textContent = `📋 Lista de Tarefas de ${name}`;
    document.getElementById("nameOverlay").style.display = "none";
    document.getElementById("todoContainer").style.display = "block";
  } else {
    showToast("Por favor, digite seu nome!", true);
  }
}
