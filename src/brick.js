import { detectCollision } from "./collisionDetection.js";

export default class Brick {
    constructor(width, height, position, game) {
        this.image = document.getElementById("img_brick");
        this.position = position;
        this.width = width;
        this.height = height;

        this.game = game;

        this.markedForDeletion = false;
    }

    draw(ctx) {
        ctx.drawImage(this.image, 
            this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        if(detectCollision(this.game.ball, this)) {
            this.game.ball.speed.y = -this.game.ball.speed.y;
            this.markedForDeletion = true;
            }
        }
    }