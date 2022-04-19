//getting the touch controls
const up = document.getElementById('button0');
const down = document.getElementById('button1');
const left = document.getElementById('button2');
const right = document.getElementById('button3');
//defining snake
let snake = [  
    {x: 150, y: 150},
    {x: 140, y: 150},  
    {x: 130, y: 150},  
    {x: 120, y: 150},  
    {x: 110, y: 150},  
];
//important variables
let directionX = 10;
let directionY = 0;
let changingDirection = false;
let foodX;
let foodY;
let score = 0;
let speed = 150; //fasst ssssnakes only!
//gets the html canvas element
const gameCanvas = document.getElementById('game-canvas');
const ctx  = gameCanvas.getContext('2d');
//inits the entire game
main();
genFood();
//adds event handlers to keyboard controls
document.addEventListener('keydown', changeDirection)
//adds event handlers to touch controls
up.addEventListener('click', () => {
    if (changingDirection) return;
    changingDirection = true;
    snakeDirections();
    if (!goingDown) {
        directionX = 0; 
        directionY = -10;
    }
})
down.addEventListener('click', () => {
    if (changingDirection) return;
    changingDirection = true;
    snakeDirections();
    if (!goingUp) {
        directionX = 0;
        directionY = 10;
    }
})
left.addEventListener('click', () => {
    if (changingDirection) return;
    changingDirection = true;
    snakeDirections();
    if (!goingRight) {
        directionX = -10;
        directionY = 0;
    }
})
right.addEventListener('click', () => {
    if (changingDirection) return;
    changingDirection = true;
    snakeDirections();
    if (!goingLeft) {
        directionX = 10;
        directionY = 0;
    }
})
//the game
function main() {
    if (endGame()) return alert('you lost, reload the page to try again!');
    changingDirection = false;
    setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        main();
    }, speed);
}
//resets the game
function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.strokestyle = 'black';
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}
//drawing the actual snake
function drawSnake () {
    snake.forEach(drawSnakeBlocks);
}
//drawing the food
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.strokestyle = 'lightcoral';
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
}
//drawing the snake parts
function drawSnakeBlocks(snakePart) {
    ctx.fillStyle = 'blueviolet';
    ctx.strokestyle = 'white';
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}
//ends the game
function endGame() {
    for (let i = 4; i < snake.length; i++)  {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    } 
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameCanvas.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > gameCanvas.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}
//adds a random coordinate for food
function randomFood(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}
//makes the food
function genFood() {
    foodX = randomFood(0, gameCanvas.width - 10);
    foodY = randomFood(0, gameCanvas.width - 10);
    snake.forEach(hasSnakeEaten = (part) => {
        const has_eaten = part.x == foodX && part.y == foodY;
        if (has_eaten) genFood();
    })
}
// snake directions
function snakeDirections() {
    goingUp = directionY === -10;
    goingDown = directionY === 10;
    goingRight = directionX === 10;  
    goingLeft = directionX === -10;
}
//keyboard controls
function changeDirection(KeyboardEvent) {    
    if (changingDirection) return;
    changingDirection = true;
    snakeDirections();
    const keyPressed = KeyboardEvent.key;
    if (keyPressed === 'ArrowUp' || keyPressed === 'w' && !goingDown){    
        directionX = 0; 
        directionY = -10;
    }
 
    if (keyPressed === 'ArrowDown' || keyPressed === 's' && !goingUp) {    
        directionX = 0;
        directionY = 10;
    }
 
    if (keyPressed === 'ArrowLeft' || keyPressed === 'a' && !goingRight){    
        directionX = -10;
        directionY = 0;
    }
 
    if (keyPressed === 'ArrowRight' || keyPressed === 'd' && !goingLeft){    
        directionX = 10; 
        directionY = 0;
    }
}
//moves / builds the snake, makes it eat AND increments the score
function moveSnake() {
    const head = {x: snake[0].x + directionX, y: snake[0].y + directionY};
    snake.unshift(head);
    const hasEatenFood = snake[0].x === foodX && snake[0].y === foodY;
    if (hasEatenFood) {
        score += 10;
        document.getElementById('score').innerHTML = `score: ${score}`
        genFood();
    } else {
        snake.pop();
    }
}