/*DARK MODE*/

const darkMode = document.getElementById('dark-mode');

darkMode.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  console.log('clicked');
});

// function to add tiles (new wiki about an old game)
const brickImg = 'assets/brick_breaker.PNG';
const snakeImg = 'assets/snake_game.png';

function createTile(srcImg, title, text) {
  const newTile = document.createElement('div');
  const newImg = document.createElement('img');
  newImg.src = srcImg;

  const newTitle = document.createElement('h3');
  newTitle.innerHTML = title;

  const newText = document.createElement('p');
  newText.innerHTML = text;

  newTile.classList.add('tile');
  newImg.classList.add('tileImg');
  newTitle.classList.add('tileTitle');
  newText.classList.add('tileText');

  const divImg = document.createElement('div');
  divImg.classList.add('tileDivImg');
  divImg.appendChild(newImg);

  newTile.appendChild(divImg);
  newTile.appendChild(newTitle);
  newTile.appendChild(newText);

  return newTile;
}

function addTile(idContainer, srcImg, title, text) {
  console.log(idContainer, srcImg, title, text);
  const container = document.querySelector(`#${idContainer}`);
  const newDiv = createTile(srcImg, title, text);
  container.appendChild(newDiv);
}

addTile(
  'containerHome',
  brickImg,
  'Brick Breaker',
  'Texte sur le Brick Breaker'
);

addTile('containerHome', snakeImg, 'Snake Game', 'Texte sur le Snake Game');

addTile(
  'containerHome',
  brickImg,
  'Brick Breaker',
  'Texte sur le Brick Breaker'
);

addTile('containerHome', snakeImg, 'Snake Game', 'Texte sur le Snake Game');

addTile(
  'containerHome',
  snakeImg,
  'Brick Breaker',
  'Texte sur le Brick Breaker'
);

addTile('containerHome', snakeImg, 'Snake Game', 'Texte sur le Snake Game');

const buttonForm = document.querySelector('#buttonAddTile');

buttonForm.addEventListener('click', () => {
  const container = document.querySelector('#containerHome');
  console.log('clicked');
  const divForm = createForm();
  container.appendChild(divForm);

  const buttonSubmitForm = document.querySelector('.submitForm');
  // buttonSubmitForm.addEventListener('click', getFormContent('.formAddNewTile'));
  buttonSubmitForm.addEventListener('click', () => {
    console.log('clicked button form');
    const newTile = getFormContent('.formAddNewTile');
    console.log(newTile);
    addTile('containerHome', newTile.img, newTile.title, newTile.text);
    container.removeChild(divForm);
  });

});

// create a form

function createForm() {
  const divForm = document.createElement('div');
  const form = document.createElement('form');
  const newImg = document.createElement('img');
  const newTitle = document.createElement('input');
  const newText = document.createElement('textarea');
  const newButton = document.createElement('input');

  newImg.src = snakeImg;
  console.log(newImg);
  newImg.setAttribute('class', 'tileImg');
  newImg.setAttribute('id', 'imgForm');

  newTitle.setAttribute('type', 'text');
  newTitle.setAttribute('id', 'titleForm');
  newTitle.setAttribute('class', 'titleForm');
  newTitle.setAttribute('placeholder', 'Titre du jeu 👾');

  newText.setAttribute('id', 'textForm');
  newText.setAttribute('class', 'textForm');
  newText.setAttribute('placeholder', 'Description du jeu');

  newButton.setAttribute('type', 'button');
  newButton.setAttribute('id', 'submitForm');
  newButton.setAttribute('class', 'submitForm');
  newButton.setAttribute('value', '🎮 Ajouter votre jeu 🎮');

  form.setAttribute('class', 'formAddNewTile');
  form.appendChild(newTitle);
  form.appendChild(newText);
  form.appendChild(newButton);

  divForm.setAttribute('class', 'tile');
  divForm.appendChild(newImg);
  divForm.appendChild(form);

  return divForm;
}

// add a tile thanks to the form

function getFormContent(classForm) {
  // return an object with a new image, a text and a description of a game
  const form = document.querySelector(classForm);
  const img = document.querySelector('#imgForm');
  const title = form.querySelector('.titleForm');
  const text = form.querySelector('.textForm');

  console.log(title, title.value);

  const newTile = {
    img: img.src,
    title: title.value,
    text: text.value,
  };
  console.log(newTile);
  return newTile;
}
