var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-50;
var dx = 2;
var dy = -2;
var ballRadius = 10;

var caracteres = '', color = '';

var paddleHeight = 10;
var paddleWidth = 70;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleY = 40;

// La paleta se mueve en "x" & "y"
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

var brickRowCount = 4;
var brickColumnCount = 6;
var brickWidth = 71;
var brickHeight = 10;
var brickPadding = 5;
var brickOffsetTop = 70;
var brickOffsetLeft = 15;

var score = 0;

var bricks = [];
for(c=0; c<brickColumnCount; c++){
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++){
        bricks[c][r] = {x: 0, y: 0, status: 2}; // Los ladrillos tienen más vida
    }
}

//bricks[3][1]='',bricks[3][2]= '';


alert("Nivel 2:\nPress \"Enter\" to start");

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

/*var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;*/

function keyDownHandler(e){
    if(e.keyCode == 39 || e.keyCode == 68){
        rightPressed = true;
    }
    else if(e.keyCode == 37 || e.keyCode == 65){
        leftPressed = true;
    }
    if(e.keyCode == 38 || e.keyCode == 87){
        upPressed = true;
    }
    else if(e.keyCode == 40 || e.keyCode == 83){
        downPressed = true;
    }
}

function keyUpHandler(e){
    if(e.keyCode == 39 || e.keyCode == 68){
        rightPressed = false;
    }
    else if(e.keyCode == 37 || e.keyCode == 65){
        leftPressed = false;
    }
    if(e.keyCode == 38 || e.keyCode == 87){
        upPressed = false;
    }
    else if(e.keyCode == 40 || e.keyCode == 83){
        downPressed = false;
    }
}

function collisionDetection(){
    for(c=0; c<brickColumnCount; c++){
        for(r=0; r<brickRowCount; r++){
            var b = bricks[c][r];
            if(b.status == 2){
                context.fillStyle= 'blue';
            }
            if(b.status > 0){
                if(x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight){
                dy = -dy;
                b.status -= 1;
                score++;
                if(score == (brickColumnCount*brickRowCount)*2){
                    alert(" :D!");
                    window.location.replace("nivel2.html");
                }
                }
            }
        }
    }
}

function drawScore(){
    context.font = "16px Arial";
    context.fillStyle = "#b0b0b0";
    context.fillText("Puntaje: "+score, 8, 20);
}

function drawBall() {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI * 2);
    context.fillStyle = 'rgb(240, 40, 90)';
    context.fill();
    context.closePath();
    drawPaddle();
}

function drawLimit(){
    context.beginPath();
    context.rect(0, canvas.height/2+39, canvas.width, 1);
    context.fillStyle = '#6e6e6e';
    context.fill();
    context.closePath;
}

function drawPaddle(){
    context.beginPath();
    context.rect(paddleX, canvas.height-paddleHeight-paddleY, paddleWidth, paddleHeight);
    context.fillStyle = 'rgb(240, 40, 90)';
    context.fill();
    context.closePath();
}

function drawBricks(){
    for(c=0; c<brickColumnCount; c++){
        for(r=0; r<brickRowCount; r++){
            if(bricks[c][r].status > 0){
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                context.beginPath();
                context.rect(brickX, brickY, brickWidth, brickHeight);
                context.fillStyle = "rgb(240, 40, 90)";
                context.fill();
                context.closePath();
            }
        }
    }
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    collisionDetection();
    drawScore();
    drawLimit();


    if(y + dy < ballRadius){
        dy = -dy;
        //context.fillStyle = changeColor()"";
    }else if(y + dy > canvas.height-ballRadius-paddleY){
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
        }else if(y + dy > canvas.height){
                alert("GAME OVER D:");
                document.location.reload();
        }
    }

    if(y + dy == canvas.height){
        alert("GAME OVER D:");
        document.location.reload();
    }

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        /*context.fillStyle = changeColor()"";*/
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth){
        paddleX += 5;
    }else if(leftPressed && paddleX > 0){
        paddleX -= 5;
    }

    // Movimiento de la paleta vertical
    if(upPressed && paddleY < canvas.height/3){
        paddleY += 3;
    }else if(downPressed && paddleY > 0){
        paddleY -= 3;
    }
    /*if(paddleY == 50){
        if(upPressed && paddleY < canvas.height-paddleHeight){
            paddleY += 0;
        }
    }*/
    
    x += dx;
    y+= dy;

}

/*function changeColor(){
    var caracteres = '0123456ABCDEF';
    var color = '#';
    for (var i = 0; i<  3; i++){
        color += caracteres[Math.floor(Math.random()*16)];
    }
    return color;
}*/


/*if(y + dy <0 ){
    dy = -dy;
}
if(y + dy > canvas.height){
    dy = -dy;
}*/
// Resumen


setInterval(draw, 8);

