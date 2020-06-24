const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const generateButton = document.querySelector(".generate-button");
const form = document.getElementById("form");
const url = document.getElementById("url");
const list = document.getElementById("list");
const transactionList = document.querySelector(".transaction-list");
const images = [];
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
  if (todoInput.value.trim() === "" || url.value.trim() === "") {
    alert("Please add a name and url");
  } else {
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
    /*
  const completedButton = document.createElement("button");
  //coompletedButton.innerText='asdasdas'; //this is okay but I want to add icon
  completedButton.innerHTML = '<i class="fas fa-check"></i>'; //this is okay but I want to add icon
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
*/
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
    /*
    const completedButton = document.createElement("button");
    //coompletedButton.innerText='asdasdas'; //this is okay but I want to add icon
    completedButton.innerHTML = '<i class="fas fa-check"></i>'; //this is okay but I want to add icon
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
   */
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
  //console.log(todo.children[0]);
  //console.log(todoIndex);
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
  //console.log(add_array);

  let temp_arr = getMaxOccurrence(add_array);
  let most_occured_el = temp_arr[0];
  let idx = temp_arr[1];

  var input = prompt("Please enter a number for size of the list");

  var a = parseInt(input);
  while (isNaN(a)) {
    alert("Your input is not a number please, give a number");
    input = prompt("Please enter a number for size of the list");
    a = parseInt(input);
  }
  console.log(add_array);
  counter = 1;
  new_arr = [];
  new_arr.push(add_array[idx]); // MUST push the element with highest occurence as first item in list.
  add_array.splice(idx, 1);

  let index = 0;
  while (counter < input && index <= add_array.length) {
    if (new_arr[counter - 1] !== add_array[index]) {
      new_arr.push(add_array[index]);
      add_array.splice(index, 1);
      counter++;
      if (add_array.length == index) {
        index = 0;
      }
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
    //console.log("alert");
    alert(
      "It is not possible to form this list with this input, page will berefreshed."
    );
    window.localStorage.clear();
    location.reload(true);
  }
  for (let index = 0; index < new_arr.length - 1; index++) {
    if (new_arr[index] === new_arr[index + 1]) {
      alert(
        " it is not possible to form this list with this input, page will berefreshed."
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
    //console.log(transaction);
    newTransaction.classList.add("transaction-item");
    //console.log(newTransaction);
    transactionDiv.appendChild(newTransaction);

    //append to list
    transactionList.appendChild(transactionDiv);
  });
  var hashTable = new Object();
  //  create playlist
  transactions.forEach(function (transaction) {
    //console.log(transaction);
    hashTable[transaction.todoInput] = transaction.url;
  });

  for (let index = 0; index < new_arr.length; index++) {
    images.push(hashTable[new_arr[index]]);
  }
  var hashFrequency = new Object();
  new_arr.forEach(function (item) {
    hashFrequency[item] = 0;
  });
  let freq = 0;
  new_arr.forEach(function (item) {
    hashFrequency[item]++;
    freq++;
  });

  var set = new Set(new_arr);
  //console.log(set);

  set.forEach(function (item) {
    hashFrequency[item] = hashFrequency[item] / freq;
  });
  console.log("hashFrequencyTable: ", hashFrequency);
  //console.log("images: ", images);
  //console.log(hashTable);
  console.log(new_arr);
  console.log(add_array);
  // make carousel view button visible and clickable
  document.getElementById("change-form").style.opacity = "1";
  document.getElementById("change-form").style.cursor = "pointer";
  document.getElementById("change-form").style.pointerEvents = "initial";
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

//// Carousel  View  Part

/* Open when someone clicks on the span element */
function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

const close = document.getElementById("close");
const modal = document.getElementById("modal");
const container = document.getElementById("container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const dots = document.querySelectorAll(".dot");
//console.log(dots);
//const toggle = document.getElementById("toggle");

const title = document.getElementById("title");
const cover = document.getElementById("cover");

/*
const images = [
  "https://cdn.pixabay.com/photo/2020/06/15/19/49/fuchs-5303221_960_720.jpg",
  "https://cdn.pixabay.com/photo/2020/06/20/12/32/tit-5320871__340.jpg",
  "https://cdn.pixabay.com/photo/2020/06/06/14/26/sunflower-5266745_960_720.jpg",
  "https://cdn.pixabay.com/photo/2020/06/14/09/27/seagull-5297122_960_720.jpg",
  "https://cdn.pixabay.com/photo/2015/12/01/19/35/portrait-1072696_960_720.jpg",
];
*/

// Hide modal on outside click
window.addEventListener("click", (e) =>
  e.target == modal ? modal.classList.remove("show-modal") : false
);

const changeForm = document.getElementById("change-form");
changeForm.addEventListener("click", loadImages);

function loadImages() {
  let activeDotNum = 0;
  let clickedDotNum = 0;
  // Keep track of image

  let imageIndex = 0;
  // Initially load image details into DOM
  loadImg(images[0]);

  // Update image details
  function loadImg(image) {
    //cover.src = `images/${image}.jpg`;
    cover.src = `${image}`;
  }

  // Previous image
  function previmage() {
    imageIndex--;
    if (imageIndex < 0) {
      imageIndex = images.length - 1;
    }
    if (activeDotNum === 0) {
      activeDotNum = 2;
    } else {
      activeDotNum--;
    }
    loadImg(images[imageIndex]);
    console.log("image_index: ", imageIndex);
    console.log("activeDotNum: ", activeDotNum);
  }

  // Next image
  function nextimage() {
    imageIndex++;

    if (imageIndex > images.length - 1) {
      imageIndex = 0;
    }
    if (activeDotNum === 2) {
      activeDotNum = 0;
    } else {
      activeDotNum++;
    }
    loadImg(images[imageIndex]);
    //console.log("image_index: ", imageIndex);
    //console.log("active: ", activeDotNum);
  }

  prevBtn.addEventListener("click", previmage);
  nextBtn.addEventListener("click", nextimage);
  dots.forEach((dot, idx) => {
    //   number each dot according to array index
    dot.setAttribute("data-num", idx);

    //   add a click event listener to each dot
    dot.addEventListener("click", (e) => {
      clickedDotNum = e.target.dataset.num;

      //console.log(typeof clickedDotNum); // this is string !!!!
      var temp = parseInt(clickedDotNum);
      clickedDotNum = temp;
      /*
      console.log(typeof clickedDotNum);
      console.log(typeof activeDotNum);
      console.log("clicked NOW: ", clickedDotNum);
      console.log("active First: ", activeDotNum);
      */
      if (clickedDotNum == activeDotNum) {
        //do nothing
        //console.log("they are equal");
        //console.log("--------------------------");
        return;
      } else {
        //if active is bigger
        if (activeDotNum > clickedDotNum) {
          /*
          console.log("active is bigger then clicked");
          console.log("activeDotNum: ", activeDotNum);
          console.log("clickedDotNum: ", clickedDotNum);
          */
          if (activeDotNum === clickedDotNum + 1) {
            //console.log("activeDotNum == clickedDotNum + 1");
            imageIndex--;
            if (imageIndex < 0) {
              imageIndex = images.length - 1;
            }
            if (activeDotNum == 0) {
              activeDotNum = 2;
            } else {
              activeDotNum--;
            }
            loadImg(images[imageIndex]);
            //console.log("image_index: ", imageIndex);
            //console.log("activeDotNum: ", activeDotNum);
          } else {
            activeDotNum = activeDotNum - 2;
            imageIndex = imageIndex - 2;
            if (imageIndex < 0) {
              imageIndex = images.length - 1;
            }

            loadImg(images[imageIndex]);
            //console.log("image_index: ", imageIndex);
            //console.log("activeDotNum: ", activeDotNum);
          }
        } else {
          //clicked  is bigger
          if (clickedDotNum == activeDotNum + 1) {
            imageIndex++;

            if (imageIndex > images.length - 1) {
              imageIndex = 0;
            }
            if (activeDotNum == 2) {
              activeDotNum = 0;
            } else {
              activeDotNum++;
            }
            loadImg(images[imageIndex]);
            //console.log("image_index: ", imageIndex);
            //console.log("active: ", activeDotNum);
          } else {
            imageIndex = imageIndex + 2;

            if (imageIndex > images.length - 1) {
              imageIndex = 0;
            }
            activeDotNum = activeDotNum + 2;
            loadImg(images[imageIndex]);
          }
        }
      }
      //console.log("active END: ", activeDotNum);
      //console.log("--------------------------");
    });
  });
}
