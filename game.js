/* CANVAS */ 

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d'); 

/* DEFINITION DES VARIABLES */

var x = canvas.width/2;
var y = canvas.height  - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 70;
var paddleX = (canvas.width - paddleWidth)/2;
var rightPress = false;
var leftPress = false;
var brickRowCount = 10;
var brickColumnCount = 12;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 5;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;

var bricks = [];
for (c=0; c<brickColumnCount; c++){
	bricks[c] = [];
	for(r=0; r<brickRowCount; r++){
		bricks[c][r] = {x:0, y:0, status:1}
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
			if(bricks[c][r].status === 1){
				var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
				var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#2a7b9b";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

/* BALL */

function drawBall(){
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  	ctx.fillStyle = "#c70039";
	ctx.fill();
	ctx.closePath();
}

/* PADDLE */

function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#c70039";
	ctx.fill();
	ctx.closePath();
}

function collisionDect(){
	for(c = 0; c < brickColumnCount; c++){
		for(r = 0; r < brickRowCount; r++){
			var b = bricks[c][r];
			if(b.status === 1){
				//CALCUL 
				if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
					dy = -dy;
					b.status = 0;
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
	var relX = e.clientX - canvas.offsetLeft;
	if (relX > paddleWidth/2 && relX < canvas.width-paddleWidth/2){
		paddleX = relX - paddleWidth/2;
	}
}

draw();


//      ETABLIR FONCTION SCORE ! 

