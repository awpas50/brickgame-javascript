import { detectCollision } from "./collisionDetection.js";

export default class Ball {
    constructor(sizeX, sizeY, game) {
        // images
        this.image = document.getElementById("img_ball");
        this.sizeX = sizeX;
        this.sizeY = sizeY;

        this.game = game;
        this.reset();
    }
    
    reset() {
        this.position = {x: this.game.paddle.position.x + this.game.paddle.width / 2, y: this.game.paddle.position.y};
        this.speed = {x: 3, y: -3};
        console.log(this.position.x, this.position.y);
    }
    draw(ctx) {
        ctx.drawImage(this.image, 
            this.position.x, this.position.y, this.sizeX, this.sizeY);
    }

    update(deltaTime) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // wall on left / right
        if(this.position.x > window.GAME_WIDTH - this.sizeX || this.position.x < 0) {
            this.speed.x = -this.speed.x;
        }
        // wall on top
        if(this.position.y < 0) {
            this.speed.y = -this.speed.y;
        }
        // wall on bottom ( -1 live)
        if(this.position.y + this.sizeY / 2 > window.GAME_HEIGHT) {
            this.game.lives--;
            this.reset();
        }

        if(detectCollision(this, this.game.paddle)) {
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.sizeY;
        }
        //collision detection
        // let bottomOfBall = this.position.y + this.sizeY;
        // let topOfPaddle = this.game.paddle.position.y;
        // let leftSideOfPaddle = this.game.paddle.position.x;
        // let rightSideOfPaddle = this.game.paddle.position.x + this.game.paddle.width;

        // if(bottomOfBall >= topOfPaddle 
        //     && this.position.x - this.sizeX / 3 >= leftSideOfPaddle
        //      && this.position.x + this.sizeX / 3 <= rightSideOfPaddle) {
        //     this.speed.y = -this.speed.y;
        //     this.position.y = this.game.paddle.position.y - this.sizeY;
        // }
    }
}