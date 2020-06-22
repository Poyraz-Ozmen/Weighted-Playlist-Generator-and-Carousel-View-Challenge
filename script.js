const container = document.getElementById("container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const dots = document.querySelectorAll(".dot");
//console.log(dots);
//const toggle = document.getElementById("toggle");

const title = document.getElementById("title");
const cover = document.getElementById("cover");

// image titles

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
