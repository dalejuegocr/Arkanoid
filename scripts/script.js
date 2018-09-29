var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var x = canvas.width / 2; // Posiciòn inicial en "x" de la pelota
var y = canvas.height - 20; // Posición inicial en "y" de la pelota 
var dx = 2; // Mover la pelota en "x"
var dy = -2; // Mover la pelota en "y"
var ballRadius = 10;

var caracteres = '', color = ''; // Puntaje

// Paleta
var paddleHeight = 10;
var paddleWidth = 100;
var paddleX = (canvas.width-paddleWidth)/2; // Posición inicial de la paleta

var rightPressed = false;
var leftPressed = false;

// Ladrillos
var brickRowCount = 4;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var score = 0;

var bricks = [];
for(c=0; c<brickColumnCount; c++){
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++){
        bricks[c][r] = {x: 0, y: 0, status: 1};
    }
}

//Sonidos
var collisionSound = new Audio('sound/collision.mp3');
var winMusic = new Audio('sound/win.mp3');
var lossMusic = new Audio('sound/loss.mp3');

alert("Mueve la paleta con las flechas\nPress \"Enter\" to start");

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);


function keyDownHandler(e){ // Detecta si las tecla está siendo presionada
    if(e.keyCode == 39){
        rightPressed = true;
    }
    else if(e.keyCode == 37){
        leftPressed = true;
    }
}

function keyUpHandler(e){ // Detecta si las teclas son soltadas
    if(e.keyCode == 39){
        rightPressed = false;
    }
    else if(e.keyCode == 37){
        leftPressed = false;
    }
}

// Detección de colisiones con los ladrillos
function collisionDetection(){
    for(c=0; c<brickColumnCount; c++){
        for(r=0; r<brickRowCount; r++){
            var b = bricks[c][r];
            if(b.status == 1){
                if(x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight){
                    collisionSound.play();
                dy = -dy; // La pelota cambia la dirección
                b.status -= 1; // El ladrillo pierde vida
                score++;
                if(score == brickColumnCount*brickRowCount){
                    winMusic.play();
                    alert(" :D!");
                    window.location.replace("nivel2.html");
                }
                }
            }
        }
    }
}

// Puntaje
function drawScore(){
    context.font = "16px Arial";
    context.fillStyle = "#b0b0b0";
    context.fillText("Puntaje: "+score, 8, 20);
}

// Pelota
function drawBall() {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI * 2);
    context.arc(x, y, 10, 0, Math.PI * 2);
    context.fillStyle = '#0095DD';
    context.fill();
    context.closePath();
    drawPaddle();
}

// Paleta
function drawPaddle(){
    context.beginPath();
    context.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    context.fillStyle = '#0095DD';
    context.fill();
    context.closePath();
}

// Ladrillos
function drawBricks(){
    for(c=0; c<brickColumnCount; c++){
        for(r=0; r<brickRowCount; r++){
            if(bricks[c][r].status == 1){
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                context.beginPath();
                context.rect(brickX, brickY, brickWidth, brickHeight);
                context.fillStyle = "#0095DD";
                context.fill();
                context.closePath();
            }
        }
    }
}


// Mostrar en pantalla
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    collisionDetection();
    drawScore();

    // Rebotes
    if(y + dy < ballRadius) { // Detecta la colisión en el borde superior del canvas
        collisionSound.play();
        dy = -dy; // La pelota cambia de direcciòn en "y"
        /*context.fillStyle = changeColor()"";*/
    }else if(y + dy > canvas.height-ballRadius){ // Detecta la colisión con la paleta
        if(x > paddleX && x < paddleX + paddleWidth){
            collisionSound.play();
            dy = -dy;
        }else {
            lossMusic.play();
            alert("GAME OVER D:");
            document.location.reload();
        }
    }

    // Colisiones en los bordes laterales
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        collisionSound.play();
        dx = -dx;
        /*context.fillStyle = changeColor()"";*/
    }

    // Movimiento de la paleta
    if(rightPressed && paddleX < canvas.width-paddleWidth){
        paddleX += 7;
    }else if(leftPressed && paddleX > 0){
        paddleX -= 7;
    }
    
    // Movimiento de la pelota
    x += dx;
    y+= dy;

}

/*function changeColor(){ // Cambia el color al azar
    var caracteres = '0123456ABCDEF';
    var color = '#';
    for (var i = 0; i<  3; i++){
        color += caracteres[Math.floor(Math.random()*16)];
    }
    return color;
}*/


setInterval(draw, 10);