
const container = document.querySelector(".container");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const todobtn = document.querySelector(".btn");
const todoList = document.getElementById("lists")
const msgElement = document.querySelector("p")

//Adding listener
todoForm.addEventListener("submit", addTodo);

//addTodo
const addTodo = (event) => {
    event.preventDefault();
    const todoValue = todoInput.value;

    //unique id generate

    const todoId = Date.now().toString();

    //createTodo Function

    createTodo(todoId, todoValue);

    //showMessage Function

    showMessage("Todo is Added", "success");

    //add to localStorage 
    const todos = getTodoFromlocalStorage();
    todos.push({ todoId, todoValue });
    localStorage.setItem("mytodos", JSON.stringify(todos));
    todoInput.value = "";
}


//createTodo
const createTodo = (todoId, todoValue) => {
    const todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("li-style")
    todoElement.innerHTML = `
<span> ${todoValue} </span>
<span> <button class="btn" id="deletebtn">Del </button>  </span>
`;
    todoList.appendChild(todoElement);
    const delbutton = todoElement.querySelector("#deletebtn");
    delbutton.addEventListener("click", deleteTodo)
}

//showMessage
const showMessage = (text, status) => {
    msgElement.textContent = text;
    msgElement.classList.add(`bg-${status}`);

    setTimeout(() => {
        msgElement.textContent = " ";
        msgElement.classList.remove(`bg-${status}`)

    }, 1000);
}


//getTodo
const getTodoFromlocalStorage = () => {
    return localStorage.getItem("mytodos") ? JSON.parse(localStorage.getItem("mytodos"))
        : [];
}


window.addEventListener("DOMContentLoaded", loadTodo);
//loaded 
const loadTodo = () => {
    const todos = getTodoFromlocalStorage();
    todos.map((todo) => createTodo(todo.todoId, todo.todoValue))
}


//deletetodo
const deleteTodo = (event) => {
    const selectedTodo = event.target.parentElement.parentElement;
    todoList.removeChild(selectedTodo);
    showMessage("todo is deleted", "danger");
    const delId = selectedTodo.id;
    let todos = getTodoFromlocalStorage();
    todos = todos.filter((todo) => todo.todoId !== delId);
    localStorage.setItem("mytodos", JSON.stringify(todos));
}

