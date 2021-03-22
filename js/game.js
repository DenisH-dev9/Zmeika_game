const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

const foodImg2 = new Image();
foodImg2.src = "img/food2.png";

const pauseImg = new Image();
pauseImg.src = "img/Pause.png";

let box = 32;

let score = 0;

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

let food2 = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

/* --- Move --- */
document.addEventListener("keydown", direction);
let dir;

function direction(event) {
    if(event.keyCode == 37 && dir != "right") {
        dir = "left";
    }
    else if(event.keyCode == 38 && dir != "down") {
        dir = "up";
    }
    else if(event.keyCode == 39 && dir != "left") {
        dir = "right";
    }
    else if(event.keyCode == 40 && dir != "up") {
        dir = "down";
    }
}

/* --- PAUSE --- */
document.addEventListener("keydown", pause);
let p = false;

function pause(event) {
    if(event.keyCode == 80 && p == false) {
        p = true;
        clearInterval(game);
        /* Pause */
    if(p == true) {
        ctx.drawImage(pauseImg, 0, 0);
    }
    }
    else if (event.keyCode == 80 && p == true) {
        p = false;
        game = setInterval(drawGame, 150);
    }
}

/* --- EAT TAIL --- */
function eatTail(head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game);
            alert("GAME OVER");
            location.reload();
        }
    }
}

/* --- GAME TEMP --- */
let game = setInterval(drawGame, 300);
function gameTemp() {

if(score <= 3){
    clearInterval(game);
    game = setInterval(drawGame, 300);
}
if(score >= 3){
    clearInterval(game);
    game = setInterval(drawGame, 170);
}
if(score >= 10){
    clearInterval(game);
    game = setInterval(drawGame, 150);
}
if(score >= 20){
    clearInterval(game);
    game = setInterval(drawGame, 130);
}
if(score >= 30){
    clearInterval(game);
    game = setInterval(drawGame, 120);
}
if(score >= 40){
    clearInterval(game);
    game = setInterval(drawGame, 110);
}
if(score >= 50){
    clearInterval(game);
    game = setInterval(drawGame, 100);
}
}

/* --- FOOD SPAWN --- */
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
function foodSpawn() {

    if(snakeX == food.x && snakeY == food.y) {
        score++;
            food = {
        x: Math.floor((Math.random() * 17 + 1)) * box,
        y: Math.floor((Math.random() * 15 + 3)) * box,
        }
    }

    else if(snakeX == food2.x && snakeY == food2.y) {
        score++;
            food2 = {
        x: Math.floor((Math.random() * 17 + 1)) * box,
        y: Math.floor((Math.random() * 15 + 3)) * box
        }

    } 

    else {
            snake.pop();
        }
}

/* --- MAIN Function --- DrawGame --- */
function drawGame() {
    /* Ground */
    ctx.drawImage(ground, 0, 0);

    /* Food */
    ctx.drawImage(foodImg, food.x, food.y);
    if(score > 10) {
        ctx.drawImage(foodImg2, food2.x, food2.y);
    } 

    /* Snake Head */
    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "#126307" : "#1a910a";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    /* Score */
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.6, box * 1.79);

    /* Food Spawn */
    foodSpawn();
    

    if(snakeX < box || snakeX > box * 17
        || snakeY < 3 * box || snakeY > box * 17) {
        clearInterval(game);
        alert("GAME OVER");
        location.reload()
        }

    /* Move */
    if(dir == "left") snakeX -= box;
    if(dir == "right") snakeX += box;
    if(dir == "up") snakeY -= box;
    if(dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };


    /* Eat Tail */
    eatTail(newHead, snake);

    snake.unshift(newHead);

    /* Game Temp */
    gameTemp();
}




