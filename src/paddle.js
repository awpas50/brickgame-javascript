export default class Paddle {
    constructor(width, height, game) {
        this.width = width;
        this.height = height;
        this.speed = 0;
        this.position = {
            x: window.GAME_WIDTH / 2 - this.width / 2,
            y: window.GAME_HEIGHT - this.height - 10
        }

        this.game = game;
    }

    move(speed) {
        this.speed = speed;

    }
    draw(ctx) {
        ctx.fillStyle = "#f00";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update(deltaTime) {
        //console.log(this.position.x);
        this.position.x += this.speed;
        
        if(this.position.x < 0) {
            this.position.x = 0;
        }
        if(this.position.x + this.width > window.GAME_WIDTH ) {
            this.position.x = window.GAME_WIDTH - this.width;
        }
    }
}