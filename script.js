/*Top Button*/
mybutton = document.getElementById("topBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

/*DARK MODE*/

const darkMode = document.getElementById('dark-mode');

darkMode.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  console.log('clicked');
});

// function to add tiles (new wiki about an old game)
const brickImg = "assets/brick_breaker.PNG";
const snakeImg = "assets/snake_game.png";
const pacImg = "assets/rsz_pac-man.png";
const invaderImg = "assets/rsz_space_invaders.jpg";
const kongImg = "assets/rsz_donkey.png";
const tetrisImg = "assets/rsz_tetris.jpg";

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
`Breakout est un jeu d'arcade dérivé de Pong, commercialisé par Atari. Il s'agit du tout premier jeu de casse-briques. Il fut adapté sur la console en 1978.<br/>
<br/>Date de sortie initiale : 13 mai 1976<br/>
  Mode de jeu : 1 à 2 joueurs<br/>
  Concepteurs : Nolan Bushnell, Steve Wozniak, Steve Bristow`
);

addTile('containerHome', invaderImg, 'Space Invaders', `Space Invaders est un jeu vidéo développé par la société japonaise Taito, sorti en 1978 sur borne d'arcade. Il s'agit d'un shoot 'em up fixe. Le principe est de détruire des vagues d'aliens au moyen d'un canon laser en se déplaçant horizontalement sur l'écran.<br/>
<br/>Date de sortie initiale : 1978<br/>
Mode de jeu : 1 joueur<br/>
Concepteur : Tomohiro Nishikado`);

addTile(
  'containerHome',
  pacImg,
  'PacMan',
  `Pac-Man est un jeu vidéo créé par Tōru Iwatani pour l’entreprise japonaise Namco. Le jeu consiste à déplacer un personnage à l’intérieur d’un labyrinthe, afin de lui faire manger toutes les pac-gommes qui s’y trouvent en évitant d’être touché par des fantômes.<br/>
  <br/>Date de sortie initiale : 22 mai 1980<br/>
  Mode de jeu : 1 à 2 joueurs<br/>
  Concepteur : Tōru Iwatani`
);

addTile('containerHome', kongImg, 'Donkey Kong', `Donkey Kong est un jeu vidéo créé par Nintendo. C'est un des premiers jeux de plates-formes. L'intérêt est centré sur le déplacement d'un personnage principal à travers quatre niveaux en évitant des obstacles mouvants.<br/>
<br/>Date de sortie initiale : 9 juillet 1981<br/>
Mode de jeu : 1 à 2 joueurs<br/>
Concepteur :  Shigeru Miyamoto & Gunpei Yokoi`);

addTile(
  'containerHome',
  tetrisImg,
  'Tetris',
  `Tetris est un jeu vidéo de puzzle. Le joueur doit réaliser des lignes complètes en déplaçant des pièces de formes différentes qui défilent du haut de l'écran jusqu'au bas. Les lignes complétées disparaissent tout en rapportant des points, permettant de remplir les cases libérées.<br/>
  <br/>Date de sortie initiale : juin 1984<br/>
  Mode de jeu : 1 joueur<br/>
  Concepteur :  Alekseï Pajitnov`
);

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
