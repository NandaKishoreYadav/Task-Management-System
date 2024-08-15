document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const tasks = document.querySelector('.tasks');
    
    loadTasks();

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const text = document.querySelector('.task');
        const task = text.value;

        if (task) {

            let element = document.createElement('div');
            element.classList.add('task-item');

            let taskContent = document.createElement('span');
            taskContent.textContent = task;

            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', () => {
                tasks.removeChild(element);
                removeTaskFromLocalStorage(task); 
            });

            element.appendChild(taskContent);
            element.appendChild(deleteButton);

            tasks.appendChild(element);

            saveTaskToLocalStorage(task);

            text.value = '';
        }
    });

    function saveTaskToLocalStorage(task) {
        let tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
        tasksArray.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasksArray));
    }

    function removeTaskFromLocalStorage(taskToRemove) {
        let tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
        tasksArray = tasksArray.filter(task => task !== taskToRemove);
        localStorage.setItem('tasks', JSON.stringify(tasksArray));
    }

    function loadTasks() {
        let tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
        tasksArray.forEach(task => {
            let element = document.createElement('div');
            element.classList.add('task-item');

            let taskContent = document.createElement('span');
            taskContent.textContent = task;

            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', () => {
                tasks.removeChild(element);
                removeTaskFromLocalStorage(task); // Remove task from localStorage
            });

            element.appendChild(taskContent);
            element.appendChild(deleteButton);

            tasks.appendChild(element);
        });
    }
});
