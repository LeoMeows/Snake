const canvas = document.getElementById("snake-canvas");
const ctx = canvas.getContext("2d");
const bite = new Audio("./Cartoon Bite sound effect.mp3")
const snake = [{
  x: canvas.width / 2 - 30,
  y:  canvas.height / 2,
}]
addEventListener('keydown', (Pressed) =>{
  switch(Pressed.key){
 case "w":
  Snakedata.up = "yes"
  Snakedata.down = "no"
  Snakedata.left = "no"
  Snakedata.right = "no"
 break;
 case "s":
  Snakedata.up = "no"
  Snakedata.down = "yes"
  Snakedata.left = "no"
  Snakedata.right = "no"
 break;
 case "d":
  Snakedata.up = "no"
  Snakedata.down = "no"
  Snakedata.left = "no"
  Snakedata.right = "yes"
 break;
 case "a":
  Snakedata.up = "no"
  Snakedata.down = "no"
  Snakedata.left = "yes"
  Snakedata.right = "no"
 break;
 case "ArrowUp":
  Snakedata.up = "yes"
  Snakedata.down = "no"
  Snakedata.left = "no"
  Snakedata.right = "no"
 break;
 case "ArrowDown":
  Snakedata.up = "no"
  Snakedata.down = "yes"
  Snakedata.left = "no"
  Snakedata.right = "no"
 break;
 case "ArrowLeft":
  Snakedata.up = "no"
  Snakedata.down = "no"
  Snakedata.left = "yes"
  Snakedata.right = "no"
 break;
 case "ArrowRight":
  Snakedata.up = "no"
  Snakedata.down = "no"
  Snakedata.left = "no"
  Snakedata.right = "yes"
 break;
  }
});
let Apple = {
  x:"undefined",
  y:"undefined",
}
let Snakedata = {
    pixelswide: 15,
  left: "no",
  right:"yes",
  up:"no",
  down:"no"
}
function addToSnake(amt){
for (let i = 0; i < amt; i++){
  snake.push({
    x: snake[snake.length - 1].x,
    y: snake[snake.length - 1].y
  })
}
}
function MoveSnake(){
  for (let snakepart = 0; snakepart <= snake.length  - 1; snakepart++ ){
if (snakepart === snake.length - 1){
  if (Snakedata.left === "yes"){
    snake[snakepart].x -= Snakedata.pixelswide
  }
  if (Snakedata.right === "yes"){
    snake[snakepart].x += Snakedata.pixelswide
  }
  if (Snakedata.up === "yes"){
    snake[snakepart].y -= Snakedata.pixelswide
  }
  if (Snakedata.down === "yes"){
    snake[snakepart].y += Snakedata.pixelswide
  }
}else{
 snake[snakepart].x = snake[snakepart + 1].x
 snake[snakepart].y = snake[snakepart + 1].y
}

if (snake[snake.length - 1].x === Apple.x && snake[snake.length - 1].y === Apple.y){
  changeApplePlace();
bite.play();
 addToSnake(1)
}
}
}

function SpawnApple(){
  return "Spawned"
}
function Draw(){
  canvas.height = document.documentElement.clientHeight;
canvas.width = document.documentElement.clientWidth;
  for (let i = 0; i < snake.length;i++ ){
    ctx.fillStyle = "#b3fc88"

    ctx.fillRect(snake[i].x,snake[i].y, Snakedata.pixelswide,Snakedata.pixelswide)
}
  if (SpawnApple() === "Spawned"){
    ctx.fillStyle = "red"
    ctx.fillRect(Apple.x,Apple.y, 15,15)
    console.log("SPAWNING")
  }
  ctx.fillStyle = "#000000"
  ctx.font = "50px monospace";
  ctx.fillText(snake.length - 1,canvas.width / 2,40)
}
 var StopDrawing = setInterval(Draw,50)
setInterval(MoveSnake,50 * 3)
function GameOver(){
  if (snake[snake.length - 1].x >= canvas.width - 30|| snake[snake.length - 1].x <= - 30 || snake[snake.length - 1].y >= canvas.height - 30|| snake[snake.length - 1].y <= - 15){
    clearInterval(StopCheckingIfGameIsOver);
    clearInterval(StopDrawing);
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0,  canvas.width,canvas.height)
    ctx.fillStyle = "black"
    ctx.font = "50px monospace";
    let Yourscore = "Game Over! Your score was: " + (snake.length - 1);
    ctx.fillText(Yourscore,(canvas.width / 2) - (Yourscore.length * 15) , canvas.height / 2)
  }
}
 var StopCheckingIfGameIsOver = setInterval(GameOver,1)
 function changeApplePlace(){
    SpawnApple();
    Apple.x = Math.floor(Math.random() * canvas.width /15) * 15;
    Apple.y = Math.floor(Math.random() * canvas.height /15 ) * 15;
 }
changeApplePlace()