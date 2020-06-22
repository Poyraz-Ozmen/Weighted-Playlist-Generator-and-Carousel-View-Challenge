const container = document.getElementById("container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");


const title = document.getElementById("title");
const cover = document.getElementById("cover");

// image titles
const images = ["https://cdn.pixabay.com/photo/2020/06/06/14/26/sunflower-5266745_960_720.jpg", "https://cdn.pixabay.com/photo/2020/06/14/09/27/seagull-5297122_960_720.jpg", "https://cdn.pixabay.com/photo/2015/12/01/19/35/portrait-1072696_960_720.jpg"];

// Keep track of image
let imageIndex = images.length;

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




