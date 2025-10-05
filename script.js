// Wait until the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select important DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // In-memory tasks array, initialized from localStorage (or empty array)
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Helper: persist tasks array to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * addTask
     * Creates a task DOM element and optionally saves the task to localStorage.
     * 
     * @param {string} taskText - The task text to add. If undefined, read from the input.
     * @param {boolean} save - Whether to save this task into localStorage (default: true).
     */
    function addTask(taskText, save = true) {
        // If taskText not provided, get it from input field (for UI add)
        if (typeof taskText === 'undefined') {
            taskText = taskInput.value.trim();
        }

        // Validate non-empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item and set text
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button and add class using classList.add
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');

        // Remove task when button is clicked:
        // 1) remove li from DOM
        // 2) remove the task from tasks array (first occurrence) and update localStorage
        removeBtn.onclick = () => {
            // Remove from DOM
            taskList.removeChild(li);

            // Remove from tasks array (first matching entry)
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        };

        // Append remove button to li and append li to the task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // If requested, save to tasks array and persist
        if (save) {
            tasks.push(taskText);
            saveTasks();
        }

        // Clear the input field for convenience
        taskInput.value = "";
    }

    // Load tasks from localStorage into the DOM on page load
    function loadTasks() {
        // tasks array already initialized from localStorage above
        tasks.forEach(taskText => {
            // Pass save = false to avoid re-saving to localStorage
            addTask(taskText, false);
        });
    }

    // Initialize UI by loading stored tasks
    loadTasks();

    // Event: add task when button clicked
    addButton.addEventListener('click', () => addTask(undefined, true));

    // Event: add task on Enter key press inside input
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(undefined, true);
        }
    });
});
