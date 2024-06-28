// script.js
document.addEventListener("DOMContentLoaded", function() {
    const inputElement = document.getElementById('task-input');
    const tasksList = document.getElementById('tasks-list');

    // Load tasks from local storage and initialize if not present
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a new task
    window.addTask = function() {
        const taskText = inputElement.value.trim();
        if (taskText) {
            const task = { text: taskText, completed: false };
            tasks.push(task);
            saveTasks();
            renderTask(task);
            inputElement.value = '';
        }
    };

    // Function to render a task
    function renderTask(task) {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add('completed');
        }
        // Toggle completion on click and update local storage
        li.onclick = function() {
            task.completed = !task.completed; // Toggle completion status
            li.classList.toggle('completed');
            saveTasks(); // Save updated tasks list
        };
        tasksList.appendChild(li);
    }

    // Render all tasks from local storage
    tasks.forEach(renderTask);
});
