const container = document.getElementById("container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");


const title = document.getElementById("title");
const cover = document.getElementById("cover");

// image titles
const images = ["hey", "summer", "ukulele"];

// Keep track of image
let imageIndex = 2;

// Initially load image details into DOM
loadImg(images[imageIndex]);

// Update image details
function loadImg(image) {
  cover.src = `images/${image}.jpg`;
}


// Previous image
function previmage() {
  imageIndex--;

  if (imageIndex < 0) {
    imageIndex = images.length - 1;
  }

  loadImg(images[imageIndex]);

}

// Next image
function nextimage() {
  imageIndex++;

  if (imageIndex > images.length - 1) {
    imageIndex = 0;
  }

  loadImg(images[imageIndex]);

}


prevBtn.addEventListener("click", previmage);
nextBtn.addEventListener("click", nextimage);




