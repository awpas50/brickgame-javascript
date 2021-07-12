import Paddle from './paddle.js';
import InputHandler from './input.js';
import Ball from './ball.js';
import Brick from './brick.js';
import { buildLevel, level1, level2 } from './levels.js';

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3
}

export default class Game {
    constructor() {
        this.lives = 3;
        this.gameState = GAMESTATE.MENU;
        this.paddle = new Paddle(150, 30, this);
        this.ball = new Ball(16, 16, this);
        this.gameObjects = [];
        this.bricks = [];
        this.levels = [level1, level2];
        this.currentLevel = 1;
        new InputHandler(this.paddle, this);
    }

    loadFirstLevel() {
        if(this.gameState == GAMESTATE.MENU) {
            this.bricks = buildLevel(level1, this);
            this.gameObjects = [this.ball, this.paddle];
            this.gameState = GAMESTATE.RUNNING;
        }
    }

    loadNextLevel(level) {
        this.bricks = buildLevel(level, this);
        this.gameObjects = [this.ball, this.paddle];
        this.gameState = GAMESTATE.RUNNING;
    }

    update(deltaTime) {
        if(this.lives == 0) {
            this.gameState = GAMESTATE.GAMEOVER;
        }
        if(this.gameState === GAMESTATE.PAUSED || this.gameState === GAMESTATE.MENU || this.gameState === GAMESTATE.GAMEOVER) {
            return;
        }
        if(this.bricks.length === 0) {
            this.currentLevel++;
            this.loadNextLevel(this.levels[this.currentLevel - 1]);
            this.ball.reset();
        }
        if(this.gameState == GAMESTATE.RUNNING) {
            //this.gameObjects.forEach(object => object.update(deltaTime));
            [...this.gameObjects, ...this.bricks].forEach(object => object.update(deltaTime));
            this.bricks = this.bricks.filter(object => !object.markedForDeletion)
        }
    }

    draw(ctx) {
        [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));
        if(this.gameState == GAMESTATE.PAUSED) {
            ctx.rect(0, 0, window.GAME_WIDTH, window.GAME_HEIGHT);
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "rgb(1, 0, 1)";
            ctx.fillText("Paused", window.GAME_WIDTH / 2, window.GAME_HEIGHT / 2);
        }
        if(this.gameState == GAMESTATE.MENU) {
            ctx.rect(0, 0, window.GAME_WIDTH, window.GAME_HEIGHT);
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.fillText("Press SPACEBAR to start", window.GAME_WIDTH / 2, window.GAME_HEIGHT / 2);
        }
        if(this.gameState == GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, window.GAME_WIDTH, window.GAME_HEIGHT);
            ctx.fillStyle = "rgba(0, 1, 0, 1)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.fillText("GAME OVER!", window.GAME_WIDTH / 2, window.GAME_HEIGHT / 2);
        }
        
    }

    togglePause() {
        // pause 
        if(this.gameState == 0) {
            this.gameState = 1;
        } else {
            this.gameState = 0;
        }
    }
}
