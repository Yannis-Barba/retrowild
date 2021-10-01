import snakeImg from './assets/snake_game.png';
import brickImg from './assets/brick_breaker.PNG';

// function to add tiles (new wiki about an old game)

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
