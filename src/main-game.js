// import Paddle from './paddle.js';
// import InputHandler from './input.js';
// import Ball from './ball.js';
import Game from './game.js';

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext('2d');
let lastTime = 0;
let game = new Game();
//game.start();
function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0, 0, window.GAME_WIDTH, window.GAME_HEIGHT);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(gameLoop);
}
gameLoop();