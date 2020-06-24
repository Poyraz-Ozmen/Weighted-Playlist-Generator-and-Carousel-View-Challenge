const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const generateButton = document.querySelector(".generate-button");
const form = document.getElementById("form");
const url = document.getElementById("url");
const list = document.getElementById("list");
const transactionList = document.querySelector(".transaction-list");

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
      //do not need id
      //id: generateID(),
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
    "Name: " +
    todoInput.value +
    "\t" +
    " URL: " +
    url.value +
    "\t\t" +
    " Weight:  " +
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
  console.log(todo.children[0]);
  console.log(todoIndex);
  var n = todoIndex.indexOf("URL");
  var deleteItem = todoIndex.slice(6, n - 1);
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));

  //delete  item from list,there could be multiple item with same name
  for (let index = 0; index < transactions.length; index++) {
    if (transactions[index].todoInput === deleteItem) {
      transactions.splice(index, 1);
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }
}

function removeElement() {
  // Removes an element from the document
  console.log("entered");
  var element = document.getElementById("todo-container");
  element.remove();
  form.remove();
  generateButton.remove();

  add_array = [];
  for (let index = 0; index < transactions.length; index++) {
    var counter = 0;
    while (counter < transactions[index].weight) {
      add_array.push(transactions[index].todoInput);
      counter++;
    }
  }
  console.log(add_array);

  let temp_arr = getMaxOccurrence(add_array);
  let most_occured_el = temp_arr[0];
  let idx = temp_arr[1];

  //input = 3;
  var input = prompt("Please enter number  for input");

  counter = 1;
  new_arr = [];
  new_arr.push(add_array[idx]); // MUST push the element with highest occurence as first item in list.
  add_array.splice(idx, 1);
  let index = 0;
  while (counter < input && index < add_array.length) {
    if (new_arr[counter - 1] !== add_array[index]) {
      new_arr.push(add_array[index]);
      add_array.splice(index, 1);
      counter++;
      //index++;
    } else {
      index++;
    }
    if (index >= add_array.length) {
      index = 0;
      if (add_array[0] == add_array[add_array.length - 1]) {
        break;
      }
    }
  }

  console.log(new_arr);
  console.log(add_array);
  index = 0;
  //if it is equal to input dont do any arrangements
  if (new_arr.length != input) {
    while (add_array.length > 0 && index < new_arr.length) {
      if (
        new_arr[index] != add_array[0] &&
        new_arr[index + 1] != add_array[0]
      ) {
        new_arr = insert(new_arr, add_array[0], index + 1);
        add_array.splice(0, 1);
      }

      index++;
    }
  }

  if (input != new_arr.length) {
    console.log("alert");
    alert(
      "it is not possible to form this list with this input, page will berefreshed."
    );
    window.localStorage.clear();
    location.reload(true);
  }
  for (let index = 0; index < new_arr.length - 1; index++) {
    if (new_arr[index] === new_arr[index + 1]) {
      alert(
        "it is not possible to form this list with this input, page will berefreshed."
      );
      window.localStorage.clear();
      location.reload(true);
    }
  }

  //  create playlist
  new_arr.forEach(function (transaction) {
    // todo div
    const transactionDiv = document.createElement("div");
    transactionDiv.classList.add("transaction");
    // create list
    const newTransaction = document.createElement("li");
    newTransaction.innerText = `${transaction}`;
    console.log(transaction);
    newTransaction.classList.add("transaction-item");
    console.log(newTransaction);
    transactionDiv.appendChild(newTransaction);

    //append to list
    transactionList.appendChild(transactionDiv);
  });

  console.log(new_arr);
  console.log(add_array);
}
// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function insert(arr, item, index) {
  arr = arr.reduce(function (s, a, i) {
    i == index ? s.push(item, a) : s.push(a);
    return s;
  }, []);
  //console.log(arr);
  return arr;
}

function getMaxOccurrence(arr) {
  var o = {},
    maxCount = 0,
    maxValue,
    m;
  var idx = 0;
  for (var i = 0, iLen = arr.length; i < iLen; i++) {
    m = arr[i];

    if (!o.hasOwnProperty(m)) {
      o[m] = 0;
    }
    ++o[m];

    if (o[m] > maxCount) {
      maxCount = o[m];
      maxValue = m;
      idx = i;
    }
  }

  return [maxValue, idx];
}
todoButton.addEventListener("click", addTodo);
generateButton.addEventListener("click", removeElement);
todoList.addEventListener("click", deleteCheck);
document.addEventListener("DomContentLoaded", getTodos);
