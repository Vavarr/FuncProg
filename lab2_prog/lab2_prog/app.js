// Initial state - immutable tasks array
const initialTasks = [
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: true },
    { id: 3, text: 'Task 3', completed: false }
];

// Current application state
let tasks = [...initialTasks]; // Immutably copy initial tasks
let currentFilter = 'all';

// ===== PURE FUNCTIONS =====

// Pure function to add a task
const addTaskPure = (tasks, newTaskText) => {
    if (!newTaskText.trim()) return tasks;

    const newTask = {
        id: Date.now(),
        text: newTaskText.trim(),
        completed: false
    };

    return [...tasks, newTask]; // Return new array
};

// Pure function to toggle task status
const toggleTaskPure = (tasks, taskId) => {
    return tasks.map(task =>
        task.id === taskId
            ? { ...task, completed: !task.completed } // Immutably update
            : task
    );
};

// Pure function to delete a task
const deleteTaskPure = (tasks, taskId) => {
    return tasks.filter(task => task.id !== taskId);
};

// Pure function to filter tasks
const filterTasksPure = (tasks, filter) => {
    switch (filter) {
        case 'active':
            return tasks.filter(task => !task.completed);
        case 'completed':
            return tasks.filter(task => task.completed);
        default:
            return [...tasks];
    }
};

// Pure function to calculate statistics
const getStatsPure = (tasks) => {
    return {
        total: tasks.length,
        completed: tasks.filter(task => task.completed).length,
        active: tasks.filter(task => !task.completed).length
    };
};

// ===== RENDER FUNCTION (has side effect - DOM manipulation) =====

// Function to update UI
const renderTasks = (tasks, filter) => {
    const filteredTasks = filterTasksPure(tasks, filter);
    const tasksList = document.getElementById('tasksList');
    const stats = getStatsPure(tasks);

    // Update statistics
    document.getElementById('totalTasks').textContent = `Total: ${stats.total}`;
    document.getElementById('completedTasks').textContent = `Completed: ${stats.completed}`;

    // Update active filter
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="setFilter('${filter}')"]`).classList.add('active');

    // Render task list
    if (filteredTasks.length === 0) {
        tasksList.innerHTML = '<div class="empty-state">No tasks found</div>';
        return;
    }

    tasksList.innerHTML = filteredTasks
        .map(task => `
            <li class="task-item" data-id="${task.id}">
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? 'checked' : ''}
                    onchange="toggleTask(${task.id})"
                >
                <span class="task-text ${task.completed ? 'completed' : ''}">${escapeHtml(task.text)}</span>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </li>
        `)
        .join('');
};

// Simple HTML escape function for security
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== WRAPPER FUNCTIONS FOR STATE MANAGEMENT =====

// Add task (exposed to global scope)
window.addTask = function () {
    const input = document.getElementById('taskInput');
    const newTasks = addTaskPure(tasks, input.value);

    if (newTasks !== tasks) { // Check if changes occurred
        tasks = newTasks;
        input.value = '';
        renderTasks(tasks, currentFilter);
    }
};

// Toggle task (exposed to global scope)
window.toggleTask = function (taskId) {
    tasks = toggleTaskPure(tasks, taskId);
    renderTasks(tasks, currentFilter);
};

// Delete task (exposed to global scope)
window.deleteTask = function (taskId) {
    tasks = deleteTaskPure(tasks, taskId);
    renderTasks(tasks, currentFilter);
};

// Set filter (exposed to global scope)
window.setFilter = function (filter) {
    currentFilter = filter;
    renderTasks(tasks, currentFilter);
};

// Clear completed tasks (exposed to global scope)
window.clearCompleted = function () {
    // Using higher-order function filter
    tasks = tasks.filter(task => !task.completed);
    renderTasks(tasks, currentFilter);
};

// Handle Enter key press (exposed to global scope)
window.handleKeyPress = function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
};

// ===== INITIALIZATION =====

// Render initial tasks when page loads
document.addEventListener('DOMContentLoaded', () => {
    renderTasks(tasks, currentFilter);
});