// JavaScript code to send a message to a Discord webhook from the browser
function sendMessageToDiscord(message) {
    const webhookUrl = "https://discord.com/api/webhooks/1256353047861395528/Fdm6ZeDXgD2dyq-OENaiF4qYjmIxFLUhT9swKrXCh8dCCvFX0jIqCwfeo_ppStZkYuRg";
    const data = JSON.stringify({
        content: message
    });

    fetch(webhookUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(response => response.json())
    .then(data => console.log("Success:", data))
    .catch((error) => console.error("Error:", error));
}

// Example usage


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
            if (!li.classList.contains('completed')) {
                sendMessageToDiscord(`${task.text} has been unchecked, more development is needed!`)
            } else {
                sendMessageToDiscord(`${task.text} has been checked off as complete, the server is closer to release!`)
            }
            
            saveTasks(); // Save updated tasks list
        };
        tasksList.appendChild(li);
    }

    // Render all tasks from local storage
    tasks.forEach(renderTask);
});

