console.log("Node.js Workshop");

const apiUrl = "http://localhost:3000/tasks";

// FUNCTION TO FETCH THE TASKS
function fetchTasks() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayTasks(data);
    });
}

// FUNCTION TO DISPLAY THE TASKS
function displayTasks(tasks) {
  const taskList = document.querySelector("#task-list");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.textContent = task.title;
    taskList.appendChild(listItem);
  });
}

// ADDING NEW TASK TO THE LIST
document.querySelector("#task-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const newTask = document.querySelector("#new-task").value;
  if (newTask) {
    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask }),
    }).then(() => {
      fetchTasks();
      const newTask = document.querySelector("#new-task");
      newTask.value = "";
    });
  }
});

fetchTasks();
