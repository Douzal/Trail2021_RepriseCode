$(function() {
    'use strict';
    // console.warn('Hey snake !');

    // let canvas;
    let context;
    let delay = 100;
    let canWidth = 900;
    let canHeight = 600;
    let blockSize = 15; 
    let snake;
    const snakeColor = "rgb(60,179,113)";// "#ff0000";
    let x = 0, y = 0;
    let speedX = 1, speedY = 1;
    // directions Up Down Right Left
    let dirU = 'up', dirD = 'down', dirR = 'right', dirL = 'left'; 

    init();

    function init() {
        var canvas = document.createElement('canvas');
        canvas.width = canWidth;
        canvas.height = canHeight;
        canvas.style.border = "1px solid purple";
        $('body').append($(canvas));
        context = canvas.getContext('2d');
        snake = new Snake([
            [6,4], [5,4], [4,4]
        ], dirR);
        refreshCanvas();
    }
    
    
    function refreshCanvas() {
        // clear old canvas
        context.clearRect(0, 0, canWidth, canHeight);
        // context.fillStyle = snakeColor;
        // context.fillRect(x, y, 100, 50);
        snake.advance();
        snake.draw();
        
        setTimeout(refreshCanvas, delay);
    }
    
    function drawBlock(ctx, pos) {
        let x = pos[0] * blockSize;
        let y = pos[1] * blockSize;
        // console.log('drawBlock');
        ctx.fillRect(x, y, blockSize, blockSize);
    }

    /* constructeur SNAKE */
    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;
        this.draw = function () {
            context.save();
            context.fillStyle = snakeColor;
            // console.log(`this.body.lenght : ${this.body.length}`);
            for(var i=0; i < this.body.length; i++) {
                drawBlock(context, this.body[i]);
            }
            context.restore();
        };

        // rajouter les directions
        this.advance = function () {
            let nextPos = this.body[0].slice(); // permet de copier .slice()
            // add the direction : switch case
            // console.warn(`advance - direction : ${this.direction}`);
            // console.warn(`advanceDir : ${direction}`);
            switch (this.direction) {
                case dirR:
                    // console.warn(`advanceDir : ${direction}`);
                    nextPos[0] += 1;
                    break;
                case dirL:
                    nextPos[0] -= 1;
                    break;
                case dirU:
                    nextPos[1] -= 1;
                    break;
                case dirD:
                    nextPos[1] += 1;
                    break;
                default:
                    console.error('Direction error !');
                    throw('Direction error !');
            }
            this.body.unshift(nextPos); // unshift ajoute au début du tableau
            this.body.pop(); //.pop(body[this.body.length-1]); // in fact .pop() is sufficient enough
        };

        this.setDirection = function (newDir) {
            // console.log('dir : ', newDir);
            let allowedDirs;
            switch (this.direction) {
                case dirR:
                case dirL:
                    allowedDirs = [dirU, dirD];
                    break;
                case dirU:
                case dirD:
                    allowedDirs = [dirR, dirL];
                    break;
                default:
                    console.error('Direction error !');
                    throw('Direction error !');
                    break;
            }

            if(allowedDirs.includes(newDir)) {
                this.direction = newDir;
                // console.log('dir autorisée : ', this.direction);
            }
        };
    }

    /* handle keydown */
    document.addEventListener('keydown', (e) => {
        // e.preventDefault(); //ou pas ?
        /* if (e.defaultPrevented) {
            //Le comportement par défaut a été inhibé
            return;
        } */
        let key = e.key || e.keyCode; // https://devstephen.medium.com/keyboardevent-key-for-cross-browser-key-press-check-61dbad0a067a#:~:text=KeyCode%20was%20deprecated%20because%20in,to%20use%20key%20or%20code%20.
        let newDir;
        // console.log('key : ', key);
        switch (key) {
            // dirL
            case 'ArrowLeft':
                newDir = dirL;
                break;
            //dirU
            case 'ArrowUp':
                newDir = dirU;
                break;
            // dirR
            case 'ArrowRight':
                newDir = dirR;
                break;
            // dirD
            case 'ArrowDown':
                newDir = dirD;
                break;
            default:
                // throw('Unrecognized keycode !');
                return;
            }
            // console.log(newDir);
            snake.setDirection(newDir);        

    });

})