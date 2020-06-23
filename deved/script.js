const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//const form = document.getElementById("form");
//const text = document.getElementById("text");
const url = document.getElementById("url");

// slider for weight range
var result = document.getElementById("result");
var weight = document.getElementById("mine");
function change() {
  result.innerText = "Weight  =  " + weight.value;
}

const localStorageTransactions = JSON.parse(
  //parse it into array
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction(val1, val2, val3) {
  //e.preventDefault(); //So that it doesn't actually submit and then I just want to make sure that there's there's not empty values.

  if (todoInput.value.trim() === "" || url.value.trim() === "") {
    alert("Please add a name and url");
  } else {
    const transaction = {
      id: generateID(),
      todoInput: val1,
      url: val2,
      weight: val3,
    };

    transactions.push(transaction);

    updateLocalStorage();
  }
}

function addTodo(event) {
  event.preventDefault();
  // todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // create list
  const newTodo = document.createElement("li");
  newTodo.innerText =
    "name: " +
    todoInput.value +
    "    " +
    "url: " +
    url.value +
    "    " +
    " w:  " +
    weight.value;

  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // save locald todos
  saveLocalTodos(todoInput.value);
  addTransaction(todoInput.value, url.value, weight.value);

  //buttons
  const completedButton = document.createElement("button");
  //coompletedButton.innerText='asdasdas'; //this is okay but I want to add icon
  completedButton.innerHTML = '<i class="fas fa-check"></i>'; //this is okay but I want to add icon
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>'; //this is okay but I want to add icon
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //append to list
  todoList.appendChild(todoDiv);

  todoInput.value = "";
  url.value = "";
  weight.value = 1;
  result.innerText = "Weight  =  " + weight.value;
}
function deleteCheck(e) {
  const item = e.target;
  //delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      console.log("1 ", todo);
      todo.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
function saveLocalTodos(todo) {
  // you already  have that item
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos() {
  // you already  have that item
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;

    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //buttons
    const completedButton = document.createElement("button");
    //coompletedButton.innerText='asdasdas'; //this is okay but I want to add icon
    completedButton.innerHTML = '<i class="fas fa-check"></i>'; //this is okay but I want to add icon
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'; //this is okay but I want to add icon
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  console.log(todoIndex);
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
document.addEventListener("DomContentLoaded", getTodos);
