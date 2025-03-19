// Define HTML elements
const board = document.getElementById("game-board");
const instructionText = document.getElementById("instruction-text");
const logo = document.getElementById("logo");

// Create the  Variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = "right";
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// Drawing the game map , snake and food\
function draw() {
  board.innerHTML = "";
  drawSnake();
  drawFood();
}

function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement("div", "snake");
    setPossition(snakeElement, segment);
    board.appendChild(snakeElement);
  });
}

// Creating snake or food cube

function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

// set the possition of snake or food
function setPossition(element, possition) {
  element.style.gridColumn = possition.x;
  element.style.gridRow = possition.y;
}

//Testing the draw function
// draw();

// draw food function

function drawFood() {
  const foodElement = createGameElement("div", "food");
  setPossition(foodElement, food);
  board.appendChild(foodElement);
}
// genearate food function
function generateFood() {
  const x = Math.floor(Math.random() * gridSize) + 1;
  const y = Math.floor(Math.random() * gridSize) + 1;
  return { x, y };
}

// Move the snake

function moveSnake() {
  const head = { ...snake[0] };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }
  snake.unshift(head);
  snake.pop();
  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    clearInterval(i); // clear the pass interval
    gameInterval = setInterval(() => {
      moveSnake();
      draw();
    }, gameSpeedDelay); // start new interval
  } else {
    snake.pop();
  }
}

// test the moveSnake function
// setInterval(() => {
//   moveSnake();
//   draw();
// }, 200);

// start the game function

function startGame() {
  gameStarted = true;
  instructionText.style.display = "none";
  logo.style.display = "none";
  gameInterval = setInterval(() => {
    moveSnake();
    checkCollision();
    draw();
  }, gameSpeedDelay);
}
