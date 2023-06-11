const todoForm = document.querySelector(".form-todo");
const todoInput = document.querySelector(".form-todo input[type='text']");
const todoList = document.querySelector(".todo-list");

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (todoInput.value === "") {
        alert("Type Your Task");
    } else {
        const newTodoText = todoInput.value;
        const newLi = document.createElement("li");
        const newInnerHtml = `<span class="text">${newTodoText}</span>
            <div class="todo-buttons">
                <div class="todo-btn done" id="complete">Complete</div>
                <div class="fa fa-edit" id="i1"></div>
                <div class="fa fa-trash-o" id="i2"></div>
            </div>`;
        newLi.innerHTML = newInnerHtml;
        todoList.append(newLi);
    }
    saveTodoList();
    todoInput.value = "";
});
function saveTodoList() {
    const todoItems = [];
    const todoListItems = document.querySelectorAll(".todo-list li");
  
    todoListItems.forEach((item) => {
      const text = item.querySelector(".text").textContent;
      const isCompleted = item.querySelector(".text").style.textDecoration === "line-through";
  
      todoItems.push({
        text,
        isCompleted,
      });
    });
  
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
  }
  
window.addEventListener("DOMContentLoaded", loadTodoList);

function loadTodoList() {
    const storedTodoItems = localStorage.getItem("todoItems");

    if (storedTodoItems) {
        const todoItems = JSON.parse(storedTodoItems);

        todoItems.forEach((item) => {
            const newLi = document.createElement("li");
            const completedClass = item.isCompleted ? "completed" : "";

            const newInnerHtml = `
                <span class="text ${completedClass}">${item.text}</span>
                <div class="todo-buttons">
                    <div class="todo-btn done" id="complete">Complete</div>
                    <div class="fa fa-edit" id="i1"></div>
                    <div class="fa fa-trash-o" id="i2"></div>
                </div>`;
            newLi.innerHTML = newInnerHtml;
            todoList.append(newLi);

            if (item.isCompleted) {
                newLi.querySelector(".text").style.textDecoration = "line-through";
            }
        });
    }
}


todoList.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-trash-o")) { // Check for "fa-trash-o" class
        const targetedLi = e.target.parentNode.parentNode;
        targetedLi.remove();
        saveTodoList();
    }
    if (e.target.classList.contains("done")) { // Complete button
        const lispan = e.target.parentNode.previousElementSibling;
        lispan.style.textDecoration = "line-through";
        displayAllTasks();
        saveTodoList();
    }
    if (e.target.classList.contains("fa-edit")) { // Edit button
        const lispan = e.target.parentNode.previousElementSibling;
        const originalText = lispan.textContent;
        const newText = prompt("Edit task:", originalText);
        if (newText) {
            lispan.textContent = newText;
            saveTodoList();
        }
    }
    saveTodoList();
});

function displayAllTasks() {
    const allTasks = document.querySelectorAll(".todo-list li");
    allTasks.forEach((task) => {
        if (task.querySelector(".text").style.textDecoration === "line-through") {
            task.style.display = "none";
        } else {
            task.style.display = "flex";
        }
    });
}
window.addEventListener("DOMContentLoaded", () => {
    displayAllTasks();
});
function displayCompletedTasks() {
    const allTasks = document.querySelectorAll(".todo-list li");
    allTasks.forEach((task) => {
        if (task.querySelector(".text").style.textDecoration === "line-through") {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
}

function displayUncompletedTasks() {
    const allTasks = document.querySelectorAll(".todo-list li");
    allTasks.forEach((task) => {
        if (task.querySelector(".text").style.textDecoration === "line-through") {
            task.style.display = "none";
        } else {
            task.style.display = "flex";
        }
    });
}

const defaultButton = document.querySelector("#b2");
defaultButton.addEventListener("click", (e) => {
    displayAllTasks();
});

const listUncompletedTasks = document.querySelector("#b4");
listUncompletedTasks.addEventListener("click", (e) => {
    displayCompletedTasks();
});
