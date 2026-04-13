// Initial application state with demo tasks
const initialTasks = [
    { id: 1, text: 'Go on the walk with Kate', completed: false },
    { id: 2, text: 'Buy groceries', completed: true },
    { id: 3, text: 'Do chores', completed: false }
];

// Forgetting mechanism configuration
const MIN_FORGETTING_INTERVAL_SECONDS = 5;
const MAX_FORGETTING_INTERVAL_SECONDS = 10;

// Animation timing configuration
const APPEARANCE_ANIMATION_DURATION_SECONDS = 2;
const DISAPPEARANCE_ANIMATION_DURATION_SECONDS = 2;

// Message collections for notification system
const nonsenseTitles = [
    'Do something?',
    'Go somewhere?',
    'Deal with that?',
    'Work on that?',
    'Get it done?',
    'Am I forgot something?',
    'Am I fine?',
    'Something wrong?',
    'I don\'t remember?',
    'What is it?',
    'Who wrote this?',
    'Organize things?'
];

const forgetMessages = [
    'No, it isn\'t right...',
    'There was something else...',
    'I don\'t want that...',
    'Was it like this?',
    'I am not sure...',
    'No, it was different...',
    'Wait, was it like this?',
    'This needs to be another...',
    'This seems unfamiliar...'
];

const completeMessages = [
    'I already finished this, didn\'t I?',
    'I swear I checked this off...',
    'This was already done, i think?',
    'I completed this already, right?',
    'Didn\'t I do this earlier?',
    'This task feels completed...',
    'I was supposed to finish this...',
    'I remember doing this...'
];

const uncompleteMessages = [
    'Why I marked this as done?',
    'This doesn\'t feel finished...',
    'I am sure I didn\'t completed this...',
    'This feels like it needs more work...',
    'I checked this off too soon?',
    'Did I really finish this?',
    'No, I didn\'t do that...',
    'Why is it checked?',
    'This doesn\'t feel right...'
];

const appearanceMessages = [
    'I wanted to do this?',
    'When I wrote this?',
    'I had all this plans?',
    'Why I don\'t remember this?',
    'But I didn\'t write this...',
    'Why there so much?',
    'I thought I have more free time...',
    'Was it there a moment ago?',
    'This feels new...'
];

const disappearanceMessages = [
    'Am I forgot something?',
    'Maybe there was something else?',
    'Why it is so... empty?',
    'Was there always so little?',
    'Didn\'t I had more plans?',
    'Did something dissapear?',
    'I don\'t remember well...',
    'I thought there was more...'
];

/**
 * Generates random integer number in given range
 * @param {number} min - Minimum value inclusive
 * @param {number} max - Maximum value inclusive
 * @returns {number} Random integer
 */
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Gets random element from array
 * @param {Array} array - Source array
 * @returns {*} Random array item
 */
const getRandomArrayItem = (array) => {
    return array[getRandomInt(0, array.length - 1)];
};

/**
 * Calculates random interval for forgetting events
 * @returns {number} Interval in milliseconds
 */
const getForgettingInterval = () => {
    const minMs = MIN_FORGETTING_INTERVAL_SECONDS * 1000;
    const maxMs = MAX_FORGETTING_INTERVAL_SECONDS * 1000;
    return getRandomInt(minMs, maxMs);
};

/**
 * Pure function: Toggles task completion status
 * @param {Array} tasks - Tasks array
 * @param {number} taskId - Task identifier
 * @returns {Array} New tasks array with updated task
 */
const randomlyToggleTaskPure = (tasks, taskId) => {
    return tasks.map(task =>
        task.id === taskId
            ? { ...task, completed: !task.completed }
            : task
    );
};

/**
 * Pure function: Removes fully faded tasks from list
 * @param {Array} tasks - Tasks array
 * @returns {Array} New tasks array without faded tasks
 */
const deleteFadedTasksPure = (tasks) => {
    return tasks.filter(task => task.opacity === undefined || task.opacity > 0);
};

/**
 * Pure function: Increases task opacity value
 * @param {Array} tasks - Tasks array
 * @param {number} taskId - Task identifier
 * @returns {Array} New tasks array with updated opacity
 */
const fadeInTaskPure = (tasks, taskId) => {
    return tasks.map(task =>
        task.id === taskId
            ? {
                ...task,
                opacity: task.opacity !== undefined ? Math.min(1, task.opacity + 0.1) : 0
            }
            : task
    );
};

/**
 * Pure function: Decreases task opacity value
 * @param {Array} tasks - Tasks array
 * @param {number} taskId - Task identifier
 * @returns {Array} New tasks array with updated opacity
 */
const fadeOutTaskPure = (tasks, taskId) => {
    return tasks.map(task =>
        task.id === taskId
            ? {
                ...task,
                opacity: task.opacity !== undefined ? Math.max(0, task.opacity - 0.1) : 0.9
            }
            : task
    );
};

// Application global state
let tasks = [...initialTasks];
let currentFilter = 'all';
let lockedTaskIds = new Set();

/**
 * Checks if task is locked for modifications
 * @param {number} taskId - Task identifier
 * @returns {boolean} Lock status
 */
const isTaskLocked = (taskId) => {
    return lockedTaskIds.has(taskId);
};

/**
 * Locks task to prevent concurrent modifications
 * @param {number} taskId - Task identifier
 */
const lockTask = (taskId) => {
    lockedTaskIds.add(taskId);
};

/**
 * Unlocks task for modifications
 * @param {number} taskId - Task identifier
 */
const unlockTask = (taskId) => {
    lockedTaskIds.delete(taskId);
};

/**
 * Generates random placeholder title for new tasks
 * @returns {string} Random task title
 */
const getRandomNewTaskTitle = () => {
    return getRandomArrayItem(nonsenseTitles);
};

/**
 * Creates new task and animates it's appearance
 */
const initiateAppearTask = () => {
    const newTaskId = Date.now();
    
    const newTask = {
        id: newTaskId,
        text: getRandomNewTaskTitle(),
        completed: false,
        opacity: 0
    };
    
    tasks = [...tasks, newTask];
    lockTask(newTaskId);
    
    const fadeInSteps = APPEARANCE_ANIMATION_DURATION_SECONDS * 10;
    const halfSteps = Math.floor(fadeInSteps / 2);
    let currentStep = 0;
    let notificationShown = false;
    
    const fadeInAnimation = () => {
        if (currentStep < fadeInSteps) {
            tasks = fadeInTaskPure(tasks, newTaskId);
            renderTasks(tasks, currentFilter);
            currentStep++;
            
            if (currentStep === halfSteps && !notificationShown) {
                showNotification(getRandomArrayItem(appearanceMessages));
                notificationShown = true;
            }
            
            setTimeout(fadeInAnimation, 100);
        } else {
            unlockTask(newTaskId);
        }
    };
    
    fadeInAnimation();
};

/**
 * Animates task disappearance and removes it
 * @param {number} taskId - Task identifier
 */
const initiateDisappearTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && !isTaskLocked(taskId)) {
        lockTask(taskId);
        
        const fadeOutSteps = DISAPPEARANCE_ANIMATION_DURATION_SECONDS * 10;
        const halfSteps = Math.floor(fadeOutSteps / 2);
        let currentStep = 0;
        let notificationShown = false;
        
        const fadeOutAnimation = () => {
            if (currentStep < fadeOutSteps) {
                tasks = fadeOutTaskPure(tasks, taskId);
                renderTasks(tasks, currentFilter);
                currentStep++;
                
                if (currentStep === halfSteps && !notificationShown) {
                    showNotification(getRandomArrayItem(disappearanceMessages));
                    notificationShown = true;
                }
                
                setTimeout(fadeOutAnimation, 100);
            } else {
                tasks = deleteTaskPure(tasks, taskId);
                unlockTask(taskId);
                renderTasks(tasks, currentFilter);
            }
        };
        
        fadeOutAnimation();
    }
};

/**
 * Pure function: Adds new task to list
 * @param {Array} tasks - Tasks array
 * @param {string} newTaskText - Task text content
 * @returns {Array} New tasks array with added task
 */
const addTaskPure = (tasks, newTaskText) => {
    if (!newTaskText.trim()) return tasks;

    const newTask = {
        id: Date.now(),
        text: newTaskText.trim(),
        completed: false
    };

    return [...tasks, newTask];
};

/**
 * Pure function: Toggles task completion status
 * @param {Array} tasks - Tasks array
 * @param {number} taskId - Task identifier
 * @returns {Array} New tasks array with updated task
 */
const toggleTaskPure = (tasks, taskId) => {
    return tasks.map(task =>
        task.id === taskId
            ? { ...task, completed: !task.completed }
            : task
    );
};

/**
 * Pure function: Removes task from list
 * @param {Array} tasks - Tasks array
 * @param {number} taskId - Task identifier
 * @returns {Array} New tasks array without specified task
 */
const deleteTaskPure = (tasks, taskId) => {
    return tasks.filter(task => task.id !== taskId);
};

/**
 * Pure function: Filters tasks by completion status
 * @param {Array} tasks - Tasks array
 * @param {string} filter - Filter type: 'all', 'active', 'completed'
 * @returns {Array} Filtered tasks array
 */
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

/**
 * Pure function: Calculates tasks statistics
 * @param {Array} tasks - Tasks array
 * @returns {Object} Statistics object with total, completed and active counters
 */
const getStatsPure = (tasks) => {
    return {
        total: tasks.length,
        completed: tasks.filter(task => task.completed).length,
        active: tasks.filter(task => !task.completed).length
    };
};

/**
 * Renders tasks list and updates UI
 * @param {Array} tasks - Tasks array
 * @param {string} filter - Current active filter
 */
const renderTasks = (tasks, filter) => {
    const filteredTasks = filterTasksPure(tasks, filter);
    const tasksList = document.getElementById('tasksList');
    const stats = getStatsPure(tasks);

    document.getElementById('totalTasks').textContent = `Total: ${stats.total}`;
    document.getElementById('completedTasks').textContent = `Completed: ${stats.completed}`;

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="setFilter('${filter}')"]`).classList.add('active');

    if (filteredTasks.length === 0) {
        tasksList.innerHTML = '<div class="empty-state">No tasks found</div>';
        return;
    }

    tasksList.innerHTML = filteredTasks
        .map(task => {
            const opacityStyle = task.opacity !== undefined ? `opacity: ${task.opacity};` : '';
            return `
            <li class="task-item" data-id="${task.id}" style="${opacityStyle}">
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? 'checked' : ''}
                    onchange="toggleTask(${task.id})"
                >
                <span class="task-text ${task.completed ? 'completed' : ''}">${escapeHtml(task.text)}</span>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </li>
        `})
        .join('');
};

/**
 * Escapes HTML characters to prevent XSS attacks
 * @param {string} text - Raw text input
 * @returns {string} Escaped safe text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Sound effect instances
const speechSounds = [
    new Audio('say1.wav'),
    new Audio('say2.wav')
];

speechSounds.forEach(sound => sound.volume = 0.6);

/**
 * Shows floating notification message with sound effects
 * @param {string} message - Notification text content
 */
const showNotification = (message) => {
    const existingNotification = document.getElementById('forgetting-notification');
    if (existingNotification) {
        existingNotification.classList.add('fade-out');
        setTimeout(() => existingNotification.remove(), 800);
    }
    
    const notification = document.createElement('div');
    notification.id = 'forgetting-notification';
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);

    const playRandomSound = () => {
        const randomSound = speechSounds[Math.floor(Math.random() * speechSounds.length)];
        randomSound.currentTime = 0;
        randomSound.play().catch(() => {});
    };

    let soundCount = 0;
    const playNextSound = () => {
        if (soundCount < 10) {
            playRandomSound();
            soundCount++;
            setTimeout(playNextSound, 140);
        }
    };
    playNextSound();

    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('fade-out');
            
            speechSounds.forEach(sound => {
                sound.pause();
                sound.currentTime = 0;
            });
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 800);
        }
    }, 3500);
};

/**
 * Animates task title change with fade effect
 * @param {number} taskId - Task identifier
 */
const initiateTitleForgetting = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && !isTaskLocked(taskId)) {
        lockTask(taskId);
        
        const newTitle = getRandomArrayItem(nonsenseTitles);
        
        let currentOpacity = 1;
        const fadeOutSteps = 10;
        
        const fadeOutPhase = () => {
            if (currentOpacity > 0) {
                currentOpacity -= 0.1;
                tasks = tasks.map(t => 
                    t.id === taskId ? { ...t, opacity: currentOpacity } : t
                );
                renderTasks(tasks, currentFilter);
                setTimeout(fadeOutPhase, 50);
            } else {
                tasks = tasks.map(t => 
                    t.id === taskId ? { ...t, text: newTitle } : t
                );
                renderTasks(tasks, currentFilter);
                showNotification(getRandomArrayItem(forgetMessages));
                
                let fadeInOpacity = 0;
                const fadeInPhase = () => {
                    if (fadeInOpacity < 1) {
                        fadeInOpacity += 0.1;
                        tasks = tasks.map(t => 
                            t.id === taskId ? { ...t, opacity: fadeInOpacity } : t
                        );
                        renderTasks(tasks, currentFilter);
                        setTimeout(fadeInPhase, 50);
                    } else {
                        tasks = tasks.map(t => 
                            t.id === taskId ? { ...t, opacity: undefined } : t
                        );
                        unlockTask(taskId);
                        renderTasks(tasks, currentFilter);
                    }
                };
                
                fadeInPhase();
            }
        };
        
        fadeOutPhase();
    }
};

/**
 * Removes fully faded tasks from state periodically
 */
const cleanupFadedTasks = () => {
    const beforeCount = tasks.length;
    tasks = deleteFadedTasksPure(tasks);
    const afterCount = tasks.length;
    if (beforeCount !== afterCount) {
        renderTasks(tasks, currentFilter);
    }
};

/**
 * Adds new task from input field
 */
window.addTask = function () {
    const input = document.getElementById('taskInput');
    const newTasks = addTaskPure(tasks, input.value);

    if (newTasks !== tasks) {
        tasks = newTasks;
        input.value = '';
        renderTasks(tasks, currentFilter);
    }
};

/**
 * Toggles task completion status
 * @param {number} taskId - Task identifier
 */
window.toggleTask = function (taskId) {
    tasks = toggleTaskPure(tasks, taskId);
    renderTasks(tasks, currentFilter);
};

/**
 * Removes task from list
 * @param {number} taskId - Task identifier
 */
window.deleteTask = function (taskId) {
    tasks = deleteTaskPure(tasks, taskId);
    renderTasks(tasks, currentFilter);
};

/**
 * Sets active tasks filter
 * @param {string} filter - Filter type
 */
window.setFilter = function (filter) {
    currentFilter = filter;
    renderTasks(tasks, currentFilter);
};

/**
 * Removes all completed tasks from list
 */
window.clearCompleted = function () {
    tasks = tasks.filter(task => !task.completed);
    renderTasks(tasks, currentFilter);
};

/**
 * Handles Enter key press on input field
 * @param {Event} event - Keyboard event
 */
window.handleKeyPress = function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
};

/**
 * Starts background forgetting event scheduler
 */
const startForgettingMechanisms = () => {
    const scheduleNextEvent = () => {
        const interval = getForgettingInterval();
        
        setTimeout(() => {
            const availableEvents = [];
            
            if (tasks.length > 0) {
                availableEvents.push({ type: 'changeTitle', weight: 4 });
            }
            
            if (tasks.filter(t => !t.completed).length > 0) {
                availableEvents.push({ type: 'completeTask', weight: 2 });
            }
            
            if (tasks.filter(t => t.completed).length > 0) {
                availableEvents.push({ type: 'uncompleteTask', weight: 2 });
            }
            
            if (tasks.length > 0) {
                availableEvents.push({ type: 'disappearTask', weight: 1 });
            }
            
            availableEvents.push({ type: 'appearTask', weight: 1 });
            
            if (tasks.length === 0) {
                initiateAppearTask();
            } else {
                const totalWeight = availableEvents.reduce((sum, e) => sum + e.weight, 0);
                let randomRoll = Math.random() * totalWeight;
                let selectedEvent = null;
                
                for (const event of availableEvents) {
                    randomRoll -= event.weight;
                    if (randomRoll <= 0) {
                        selectedEvent = event.type;
                        break;
                    }
                }
                
                switch (selectedEvent) {
                    case 'changeTitle': {
                        const unlockedTasks = tasks.filter(t => !isTaskLocked(t.id));
                        if (unlockedTasks.length > 0) {
                            const task = unlockedTasks[getRandomInt(0, unlockedTasks.length - 1)];
                            initiateTitleForgetting(task.id);
                        }
                        break;
                    }
                    case 'completeTask': {
                        const unlockedActiveTasks = tasks.filter(t => !t.completed && !isTaskLocked(t.id));
                        if (unlockedActiveTasks.length > 0) {
                            const task = unlockedActiveTasks[getRandomInt(0, unlockedActiveTasks.length - 1)];
                            if (!task.completed) {
                                tasks = toggleTaskPure(tasks, task.id);
                                showNotification(getRandomArrayItem(completeMessages));
                                renderTasks(tasks, currentFilter);
                            }
                        }
                        break;
                    }
                    case 'uncompleteTask': {
                        const unlockedCompletedTasks = tasks.filter(t => t.completed && !isTaskLocked(t.id));
                        if (unlockedCompletedTasks.length > 0) {
                            const task = unlockedCompletedTasks[getRandomInt(0, unlockedCompletedTasks.length - 1)];
                            if (task.completed) {
                                tasks = toggleTaskPure(tasks, task.id);
                                showNotification(getRandomArrayItem(uncompleteMessages));
                                renderTasks(tasks, currentFilter);
                            }
                        }
                        break;
                    }
                    case 'disappearTask': {
                        const unlockedTasks = tasks.filter(t => !isTaskLocked(t.id));
                        if (unlockedTasks.length > 0) {
                            const task = unlockedTasks[getRandomInt(0, unlockedTasks.length - 1)];
                            initiateDisappearTask(task.id);
                        }
                        break;
                    }
                    case 'appearTask': {
                        initiateAppearTask();
                        break;
                    }
                }
            }
            
            scheduleNextEvent();
        }, interval);
    };
    
    setInterval(cleanupFadedTasks, 1000);
    
    scheduleNextEvent();
};

// Initialize application on page load
document.addEventListener('DOMContentLoaded', () => {
    renderTasks(tasks, currentFilter);
    setTimeout(startForgettingMechanisms, 5000);
});
