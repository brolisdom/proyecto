const imageDB = [
    'img/background_full/img_01.jpg',
    'img/background_full/img_02.jpg',
    'img/background_full/img_03.jpg',
    'img/background_full/img_04.jpg'
];

function get(el) {
  return document.querySelector(el);
}

let index = 0;
let timer = 3000;
let image = get('.container__gallery');
let leftArrow = get('.ctrl__al');
let rightArrow = get('.ctrl__ar');
let prev = get('#prev');
let next = get('#next');
let pause = get('#pause');
let status = get('.ctrl__dash--select');
let wait = document.querySelectorAll('.ctrl__al, .ctrl__ar, .ctrl__bottom');
let middleDash = 'ctrl__dash--select';
let glitchImage = 'container__gallery--glitch';

function currenImage() {
  return image.setAttribute('src', imageDB[index]);
}

function nextImage() {
  status.classList.remove(middleDash);
  next.classList.add(middleDash);
  image.classList.add(glitchImage);

  setTimeout(() => {
    status.classList.add(middleDash);
    next.classList.remove(middleDash);
    image.classList.remove(glitchImage);
  }, 250);

  index++;
  if (index === imageDB.length) {
    index = 0;
  }
  currenImage();
}
currenImage();
let imageLoop = setInterval(nextImage, timer);