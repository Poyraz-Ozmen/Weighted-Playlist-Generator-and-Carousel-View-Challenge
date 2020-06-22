const container = document.getElementById("container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const dots = document.querySelectorAll(".dot");
//console.log(dots);
//const toggle = document.getElementById("toggle");

const title = document.getElementById("title");
const cover = document.getElementById("cover");

const images = [
  "https://cdn.pixabay.com/photo/2020/06/15/19/49/fuchs-5303221_960_720.jpg",
  "https://cdn.pixabay.com/photo/2020/06/20/12/32/tit-5320871__340.jpg",
  "https://cdn.pixabay.com/photo/2020/06/06/14/26/sunflower-5266745_960_720.jpg",
  "https://cdn.pixabay.com/photo/2020/06/14/09/27/seagull-5297122_960_720.jpg",
  "https://cdn.pixabay.com/photo/2015/12/01/19/35/portrait-1072696_960_720.jpg",
];

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
  console.log("image_index: ", imageIndex);
  console.log("active: ", activeDotNum);
}

prevBtn.addEventListener("click", previmage);
nextBtn.addEventListener("click", nextimage);

/* Open when someone clicks on the span element */
function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

// slider for weight range
var result = document.getElementById("result");
var mine = document.getElementById("mine");
function change() {
  result.innerText = mine.value;
}
/*
dots.forEach((dot, idx) => {
  //   number each dot according to array index
  dot.setAttribute("data-num", idx);

  //   add a click event listener to each dot
  dot.addEventListener("click", (e) => {
    clickedDotNum = e.target.dataset.num;
    console.log("clicked NOW: ", clickedDotNum);
    console.log("active NOW: ", activeDotNum);
    if (clickedDotNum == activeDotNum) {
      //do nothing
      console.log("they are equal");
      console.log("--------------------------");
      return;
    } else {
      //if active is bigger
      if (activeDotNum > clickedDotNum) {
        console.log("active is bigger then clicked");
        if ((activeDotNum = clickedDotNum + 1)) {
          console.log("activeDotNum == clickedDotNum + 1");
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
          console.log("image_index: ", imageIndex);
          console.log("activeDotNum: ", activeDotNum);
        } else {
          activeDotNum = activeDotNum - 2;
          imageIndex = imageIndex - 2;
          if (imageIndex < 0) {
            imageIndex = images.length - 1;
          }

          loadImg(images[imageIndex]);
          console.log("image_index: ", imageIndex);
          console.log("activeDotNum: ", activeDotNum);
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
          console.log("image_index: ", imageIndex);
          console.log("active: ", activeDotNum);
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
    console.log("active END: ", activeDotNum);
    console.log("--------------------------");
  });
});
*/

const form = document.getElementById("form");
const text = document.getElementById("text");
const url = document.getElementById("url");
const weight = document.getElementById("mine");
// image titles
const localStorageTransactions = JSON.parse(
  //parse it into array
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault(); //So that it doesn't actually submit and then I just want to make sure that there's there's not empty values.
  console.log(text.value);
  console.log(url.value);
  console.log(weight.value);

  if (text.value.trim() === "" || url.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      url: url.value,
      weight: mine.value,
    };

    transactions.push(transaction);

    updateLocalStorage();

    text.value = "";
    url.value = "";
    weight.value = 0;
    console.log("something happend");
    console.log(transactions);
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

form.addEventListener("submit", addTransaction);

const close = document.getElementById("close");
const open = document.getElementById("open");
const modal = document.getElementById("modal");

// Show modal
open.addEventListener("click", () => modal.classList.add("show-modal"));

// Hide modal
close.addEventListener("click", () => modal.classList.remove("show-modal"));

// Hide modal on outside click
window.addEventListener("click", (e) =>
  e.target == modal ? modal.classList.remove("show-modal") : false
);
