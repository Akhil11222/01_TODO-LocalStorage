// Wait until webpage finishes loading
document.addEventListener("DOMContentLoaded", () => {
  // 1. FIND HTML ELEMENTS (like grabbing tools from a toolbox)
  const todoInput = document.getElementById("todo-input"); // Text input box
  const addTaskButton = document.getElementById("add-task-btn"); // Add button
  const todoList = document.getElementById("todo-list"); // Where tasks will show

  // 2. LOAD SAVED TASKS (like opening a notebook with old notes)
  // Get tasks from browser's memory (localStorage) or use empty array
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  // Show existing tasks (like reading old notes from notebook)
  tasks.forEach((task) => renderTask(task));

  // 3. ADD TASK WHEN BUTTON CLICKED (like adding new note to notebook)
  addTaskButton.addEventListener("click", function () {
    // Get what user typed and clean it (remove extra spaces)
    const taskText = todoInput.value.trim();

    // Don't add empty tasks
    if (taskText === "") return;

    // Create new task object (like making a new note card)
    const newTask = {
      id: Date.now(), // Unique ID (using current time)
      text: taskText, // Task text (what user typed)
      completed: false, // Not done yet
    };

    // Save and show the task
    tasks.push(newTask); // Add to our task list
    saveTasks(); // Save to browser memory
    renderTask(newTask); // Show on screen
    todoInput.value = ""; // Clear input box
  });

  // 4. SHOW TASKS ON SCREEN (like pinning note card to board)
  function renderTask(task) {
    // Create list item (like making a new note card)
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id); // Hidden ID for later

    // If task is completed, mark it (like using a highlighter)
    if (task.completed) li.classList.add("completed");

    // Add text and delete button (write on the note card)
    li.innerHTML = `  
      <span>${task.text}</span>
      <button>Delete</button>
    `;

    // 5. MARK TASKS COMPLETE/INCOMPLETE (click the note card)
    li.addEventListener("click", function (event) {
      // Ignore clicks on delete button
      if (event.target.tagName === "BUTTON") return;

      // Toggle completed status (switch between done/not done)
      task.completed = !task.completed;
      li.classList.toggle("completed"); // Update visual style
      saveTasks(); // Save changes
    });

    // 6. DELETE TASKS (click the delete button)
    li.querySelector("button").addEventListener("click", function (event) {
      event.stopPropagation(); // Don't trigger the click event above

      // Remove from task list and screen
      tasks = tasks.filter((t) => t.id !== task.id); // Remove from array
      li.remove(); // Remove from screen
      saveTasks(); // Update browser memory
    });

    todoList.appendChild(li); // Add to the list on screen
  }

  // 7. SAVE TO BROWSER MEMORY (like writing in notebook)
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
