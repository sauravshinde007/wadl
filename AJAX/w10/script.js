// Override open() and send() to simulate server calls
const originalOpen = XMLHttpRequest.prototype.open;
const originalSend = XMLHttpRequest.prototype.send;

XMLHttpRequest.prototype.open = function(method, url) {
  this._method = method;
  this._url = url;
  originalOpen.call(this, method, url);
};

XMLHttpRequest.prototype.send = function(data) {
  if (this._url === "/tasks") {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    if (this._method === "GET") {
      this.responseText = JSON.stringify(tasks);
      this.onload();
    }

    if (this._method === "POST") {
      const newTask = JSON.parse(data);
      tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      this.onload();
    }

    if (this._method === "PUT") {
      const { index, text } = JSON.parse(data);
      tasks[index].text = text;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      this.onload();
    }

    if (this._method === "DELETE") {
      const index = JSON.parse(data).index;
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      this.onload();
    }
  } else {
    originalSend.call(this, data);
  }
};

// Load and display tasks
function loadTasks() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/tasks");
  xhr.onload = function() {
    const tasks = JSON.parse(xhr.responseText);
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, i) => {
      const li = document.createElement("li");

      const input = document.createElement("input");
      input.type = "text";
      input.value = task.text;
      input.onchange = () => updateTask(i, input.value);

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.onclick = () => deleteTask(i);

      li.appendChild(input);
      li.appendChild(delBtn);
      list.appendChild(li);
    });
  };
  xhr.send();
}

// Add a task
function addTask() {
  const taskText = document.getElementById("taskInput").value.trim();
  if (!taskText) return;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/tasks");
  xhr.onload = loadTasks;
  xhr.send(JSON.stringify({ text: taskText }));

  document.getElementById("taskInput").value = "";
}

// Update a task
function updateTask(index, text) {
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", "/tasks");
  xhr.onload = loadTasks;
  xhr.send(JSON.stringify({ index, text }));
}

// Delete a task
function deleteTask(index) {
  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", "/tasks");
  xhr.onload = loadTasks;
  xhr.send(JSON.stringify({ index }));
}

// Initial load
loadTasks();
