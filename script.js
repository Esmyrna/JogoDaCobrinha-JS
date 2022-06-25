/* 1 - desenhar o background
   2 - desenhar a cobra
   3 - permitir que a cobra se movimente - CHAMAR A FUNÇÃO DRAWSNAKE(), pintar e atualizar as coordenadas fazendo isso repetidamente pra dar ilusão .
         pegar as coordenadas do primeiro quadradinho
         atualizar essas coordenadas.
         remover o último quadradinho
         adicionar um novo primeiro quadradinho com as novas coordenadas.

   4 - controlar a cobra com o teclado
            detectar quando uma tecla é pressionada
            mudar o valor da variavel dependendo da tecla pressionada.
   5 - permitir que a cobra "atravesse" paredes
   6 - desenhar a comida
   7 - aumentar o tamanho da cobra ao comer
        verificar se as coodernadas x e y estão na mesma direção da comida
        e ai, adiciona um quadradinho!
   8 - mudar a comida de lugar
   9 - game over
*/

let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32; // quadradinhos
let snake = []; // a variavel snake tem que ser uma lista de coordenadas
snake[0] = {
    // o primeiro elemento da lista será  a primeira coordenada:
    x: 8*box,
    y: 8*box
    // NO CENTRO
}
let direction = 'RIGHT'; 
let food = {
    x: Math.floor(Math.random() * 15 + 1) *box,
    y: Math.floor(Math.random()* 15 + 1) * box
}


function drawBackground() {
    context.fillStyle = "#454441"; // cor de fundo
    context.fillRect(0, 0, 16*box, 16*box); // quadradinhos na largura e altura
    // os primeiros pegam as coordenadas x e y e o segundo a largura e a altura;

}


function drawSnake() {
    // desenhar cada quadradinho da nossa cobrinha:
    for(i = 0; i<snake.length; i++){
        context.fillStyle = 'white';
        context.fillRect(snake[i].x , snake[i].y , box, box) // 1 quadradinho
     }
}
function drawFood() {
    context.fillStyle = 'red';
    context.fillRect(food.x , food.y, box, box);
}

document.addEventListener("keydown", updateDirection);
function updateDirection(event) {
    if (event.keyCode == 37) direction = 'LEFT';
    if (event.keyCode == 39) direction = 'RIGHT';
    if (event.keyCode == 38) direction = 'UP';
    if (event.keyCode == 40) direction = 'DOWN';

}
// função global:
function draw() {
   
    if(snake[0].x > 15*box && direction == 'RIGHT') snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'LEFT') snake[0].x = 16*box;
    if(snake[0].y > 15*box && direction == 'DOWN') snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'UP') snake[0].y = 16*box;

    for (i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert('Game Over!');
        }
    }




    drawBackground();
    drawSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == 'RIGHT') snakeX += box;
    if (direction == 'LEFT') snakeX -= box;
    if (direction == 'UP') snakeY -= box;
    if (direction == 'DOWN') snakeY += box;

    if(snakeX != food.x || snakeY != food.y) {
        snake.pop();
    }else{
     food.x  =  Math.floor(Math.random() * 15 + 1) *box,
     food.y  = Math.floor(Math.random()* 15 + 1) * box
        
    }

    
        let newHead = {
            x: snakeX,
            y: snakeY
        }
    
        snake.unshift(newHead);

        

    }

let game = setInterval(draw, 100); // chamar a função a cada 100 mls