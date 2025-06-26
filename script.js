function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast ${type === "error" ? "error" : ""}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.className = "text";
    span.textContent = text;

    const actions = document.createElement("div");
    actions.className = "actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = () => editTask(li, span);

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";
    delBtn.onclick = () => {
      li.remove();
      showToast("Tarefa excluída", "error");
    };

    actions.append(editBtn, delBtn);
    li.append(span, actions);
    document.getElementById("taskList").appendChild(li);

    input.value = "";
    showToast("Tarefa adicionada com sucesso");
  }
}

function editTask(li, span) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = span.textContent;
  input.className = "edit-input";

  input.onblur = () => {
    span.textContent = input.value.trim() || span.textContent;
    li.replaceChild(span, input);
  };

  input.onkeydown = (e) => {
    if (e.key === "Enter") input.blur();
  };

  li.replaceChild(input, span);
  input.focus();
}

function searchTasks() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const tasks = document.querySelectorAll("#taskList li");

  tasks.forEach(task => {
    const text = task.querySelector(".text").textContent.toLowerCase();
    task.style.display = text.includes(query) ? "flex" : "none";
  });
}
