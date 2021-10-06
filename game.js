/* LEXIQUE : 

beginPath(); closePath(); = Toute les instuctions ctx. canvas se trouvre entre. Elle agissent comme des balises {}

ctx.rect = Paddle 
ctx.fill = Stoke la couleur utilisé

ctx.arc = Balle 

*/ 




/* CANVAS */ 

let canvas = document.getElementById('myCanvas');

/* var ctx STOCK LE CONTEXTE DE RENDU 2D*/
let ctx = canvas.getContext('2d'); 

/* DEFINITION DES VARIABLES */

/* DEPLACEMENT DE LA BALLE */
let x = canvas.width/2;
let y = canvas.height  - 30;
let dx = 6;
let dy = -6;
let ballRadius = 10;
let paddleHeight = 10;
let paddleWidth = 70;
let paddleX = (canvas.width - paddleWidth)/2;
let rightPress = false;
let leftPress = false;
let brickRowCount = 10;
let brickColumnCount = 12;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 5;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let score = 0;
let lives = 3;


let bricks = [];
for (c=0; c<brickColumnCount; c++){
	bricks[c] = [];
	for(r=0; r<brickRowCount; r++){
		bricks[c][r] = {x:0, y:0, status:3}
	}
}

/* FONCTION DU JEU */ 

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e){
	if (e.keyCode === 39){
		rightPress = true;
	} else if(e.keyCode === 37){
		leftPress = true;
	}
}
function keyUpHandler(e){
	if (e.keyCode === 39){
		rightPress = false;
	} else if(e.keyCode === 37){
		leftPress = false;
	}
}

/* BLOCK BRIQUE BREAK */

function drawBricks(){
	for(c=0; c<brickColumnCount; c++){
		for(r=0; r<brickRowCount; r++){
			if(bricks[c][r].status > 0){
				let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
				let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				if(bricks[c][r].status === 3){
					ctx.fillStyle = '#c70039';
				}
				else if(bricks[c][r].status === 2){
					ctx.fillStyle = '#2a7b9b';
				}
				else if(bricks[c][r].status === 1){
					ctx.fillStyle = '#eddd53';
				}
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

/* BALL */

function drawBall(){
	ctx.beginPath();
	
	/* ctx.arc = Ball (x, y, centre de l'arc, rayon de l'arc, angle de départ, angle de fin, direction du dessin) */ 
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  	
	ctx.fillStyle = "#c70039";
	ctx.fill();
	ctx.closePath();
}

/* PADDLE */

function drawPaddle(){

	ctx.beginPath();
	/* ctx.rect = Paddle */ 
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#c70039";
	ctx.fill();
	ctx.closePath();
}

function collisionDect(){
	for(c = 0; c < brickColumnCount; c++){
		for(r = 0; r < brickRowCount; r++){
			let b = bricks[c][r];
			if(b.status > 0){
				//CALCUL 
				if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
					dy = -dy;
					b.status = b.status-1;
					score ++;
					if(score == brickRowCount*brickColumnCount){ 
						alert("YOU WIN!!!");
						document.location.reload();
					}
				}
			}
		}
	}
}

/* CANVAS SCORE */ 

function drawScore(){
	ctx.font = "12px 'Gameplay', sans-serif";
	ctx.fillStyle = "#eddd53";
	ctx.fillText("Score: " + score, 8, 20);
}

/* CANVAS LIVES */ 

function drawLives(){
	ctx.font = "12px 'Gameplay', sans-serif";
	ctx.fillStyle = "#eddd53";
	ctx.fillText("Lives: " + lives, canvas.width-65, 20);
}


/* CLEAR LES CANVAS APRÈS 10MS */ 
/* Fonction boucle de dessin */ 
function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	collisionDect();

	if(y+dy < 0){
		dy = -dy;
	}else if(y + dy > canvas.height - ballRadius){
		if(x > paddleX && x < paddleX + paddleWidth){
			dy = -dy;
		} else {
			lives--;
			if(!lives){
				alert("GAME OVER");
				document.location.reload();
			} else{
				x = canvas.width/2;
				y = canvas.height-30;
				dx = 2;
				dy = -2;
				paddleX = (canvas.width - paddleWidth)/2;
			}
		}
	}
	if(x+dx > canvas.width-ballRadius || x+dx < 0){
		dx = -dx;
	}

	if(rightPress && paddleX<canvas.width-paddleWidth){
		paddleX += 7;
	} else if(leftPress && paddleX > 0){
		paddleX -= 7;
	}

	x += dx;
	y += dy;
	requestAnimationFrame(draw);
}


document.addEventListener("mousemove", mouseMoveHandler);

function mouseMoveHandler(e){
	let relX = e.clientX - canvas.offsetLeft;
	if (relX > paddleWidth/2 && relX < canvas.width-paddleWidth/2){
		paddleX = relX - paddleWidth/2;
	}
}

draw();


//      ETABLIR FONCTION SCORE ! 

