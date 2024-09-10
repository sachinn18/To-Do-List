document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.todo-form');
    let editTask = null;
  
    // Attach event listener to each form
    forms.forEach((form) => {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const listType = this.getAttribute('data-list');
        const newTaskInput = this.querySelector('.new-task');
        const taskText = newTaskInput.value.trim();
  
        if (taskText === "") return;
  
        const taskList = document.getElementById(`${listType}-list`);
  
        if (editTask) {
          // Update the text of the existing task
          editTask.querySelector('span').textContent = taskText;
          editTask = null;
        } else {
          // Add a new task
          addTask(taskList, taskText);
        }
  
        // Clear input
        newTaskInput.value = '';
      });
    });
  
    // Helper function to create a task item and append to the task list
    function addTask(taskList, taskText) {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${taskText}</span>
        <div>
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        </div>
      `;
      taskList.appendChild(li);
  
      // Add event listeners for edit and delete buttons
      li.querySelector('.edit').addEventListener('click', () => editExistingTask(li));
      li.querySelector('.delete').addEventListener('click', () => deleteTask(li));
      li.addEventListener('dblclick', () => toggleComplete(li));
    }
  
    // Function to mark tasks as completed
    function toggleComplete(taskItem) {
      taskItem.classList.toggle('completed');
    }
  
    // Function to delete a task
    function deleteTask(taskItem) {
      taskItem.remove();
    }
  
    // Function to edit an existing task
    function editExistingTask(taskItem) {
      const taskText = taskItem.querySelector('span').textContent;
      const form = taskItem.closest('.list-section').querySelector('.todo-form');
      const newTaskInput = form.querySelector('.new-task');
      newTaskInput.value = taskText;
      editTask = taskItem;
    }
  });
  