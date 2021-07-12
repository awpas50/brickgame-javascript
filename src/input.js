
export default class InputHandler {
    constructor(paddle, game) {
        document.addEventListener("keydown", event => {
            switch(event.keyCode) {
                case 65: //left
                    paddle.move(-8);
                    break;
                case 68: //right
                    paddle.move(8);
                    break;
                case 27: // Esc
                    game.togglePause();
                    break;
                case 32: // Space
                    game.loadFirstLevel();
                    break;
            }
        });
        document.addEventListener("keyup", event => {
            switch(event.keyCode) {
                case 65: //left
                    if(paddle.speed < 0) {
                        paddle.move(0); //stop
                    }
                    
                    break;
                case 68: //right
                    if(paddle.speed > 0) {
                        paddle.move(0);
                    }
                    break;
            }
        });
    }
}