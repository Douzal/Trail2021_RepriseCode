$(function() {
    'use strict';
    // console.warn('Hey snake !');

    // let canvas;
    let canvas, context;
    const delay = 100;
    const canWidth = 990, canHeight = 420;
    // const canWidth = 300, canHeight = 200;
    let blockSize = 15; 
    let snake, apple;
    let amberHead, restBody; // rest of body
    let headX, headY;
    const snakeColor = 'rgb(0,80,190)', appleColor = 'purple';//'rgb(50,170,10)'; //"#33cc33";
    const appleRadius = blockSize/2;
    let appX, appY;
    let randomX, randomY; // utile ? pour apple
    // let x = 0, y = 0;
    // let speedX = 1, speedY = 1;
    // directions Up Down Right Left
    const dirU = 'up', dirD = 'down', dirR = 'right', dirL = 'left'; 
    let wallCollision = false
    let snakeCollision = false;
    let widthInBlocks = canWidth / blockSize, heightInBlocks = canHeight / blockSize;
    let rejouer = false;
    // let gameDatas; // contains all localDatas
    let localMaxScore, localLastScore, localGamesPlayed;
    let blocksEaten;
    let timeoutId;

    launchGame();

    function launchGame() {
        blocksEaten = 0;
        canvas = document.createElement('canvas');
        canvas.width = canWidth;
        canvas.height = canHeight;
        // canvas.style.border = "2px solid purple";
        $('body').append($(canvas));
        context = canvas.getContext('2d');
        snake = new Snake([
            [7,4], [6,4], [5,4], [4,4], [3, 4], [2, 4]
        ], dirR);
        // fill the datas
        getDatas(snake);
        // console.log(Object.keys(snake));
        apple = new Apple([10,10]);
        // init();
        apple.draw();
        // drawScore();
        refreshCanvas();
    }
    
    function refreshCanvas() {
        snake.advance();
        if(snake.checkCollision()) {
            // GAME OVER
            console.error('GAME OVER');
            gameOver(snake);
        } else {
            // snake has eaten an apple
            if(snake.eateApple(apple)) {
                console.warn('mangé le mac (la pomme, c\'est la blague drôle !');
                blocksEaten++;
                snake.ateApple = true;
                // avoid apple already on snake
                do {
                    apple.setNewPosition();
                } while(apple.isOnSnake(snake))
            }

            //treat as usual
            context.clearRect(0, 0, canWidth, canHeight);
            snake.draw();
            apple.draw();
            drawScore(snake);
            timeoutId = setTimeout(refreshCanvas, delay);
        }
    }
    
    function drawBlock(ctx, pos) {
        let x = pos[0] * blockSize;
        let y = pos[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }

    function drawScore(snake) {
        context.save();
        context.textAlign = 'left';
        context.font = 'normal 20px verdana';
        context.strokeStyle = "blue";
        context.fillText('Score : ' + parseInt(snake.body.length), 20, canHeight - 7);
        context.textAlign = 'right';
        context.fillText('Blocks eaten : ' + blocksEaten, canWidth-20, canHeight - 7);
        context.restore();
    }

    /* constructeur SNAKE */
    function Snake(body, direction) {
        this.body       = body;
        this.direction  = direction;
        this.ateApple   = false;
        // amberHead       = this.body[0];
        // restBody        = this.body.slice(1);
        // draw snake
        this.draw = function () {
            context.save();
            context.fillStyle = snakeColor;
            for(const block of body) {
                drawBlock(context, block);
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
            // pop only if snake didn't juste ate Mac
            // console.log('this.ateApple : ', this.ateApple);
            if(!this.ateApple) {
                this.body.pop(); //.pop(body[this.body.length-1]); // in fact .pop() is sufficient enough
            } else {
                this.ateApple = false;
            }
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

        this.checkCollision = function () {
            wallCollision   = false
            snakeCollision  = false;
            amberHead       = this.body[0];
            restBody        = this.body.slice(1);
            headX           = amberHead[0];
            headY           = amberHead[1];
            let minX        = 0, minY = 0;
            let maxX        = widthInBlocks - 1;
            let maxY        = heightInBlocks - 1; 

            let exceededHorPos   = headX < minX || headX > maxX; // notInHorWalls
            let exceededVertPos  = headY < minY || headY > maxY; // notInVertWalls
            
            // wallCollision ?
            if(exceededHorPos || exceededVertPos) {
                wallCollision = true;
                // console.log('wallCollision : ', wallCollision);
            }
            
            // console.group();
            // console.table('restBody : ', restBody);
            // console.table('amberHead : ', amberHead);
            // console.table(restBody.includes(amberHead));
            // console.groupEnd();

            // snakeCollision ? marche pas car objets références...
            // if(restBody.includes(amberHead)) {
            //     snakeCollision = true;
            //     // console.log('snakeCollision 1 : ', snakeCollision);
            // }
            
            // version du prof (améliorée))
            for(const part of restBody) {
                // here, prof version
                // if(headX == part[0] && headY == part[1]) {
                // }
                // but I'd rather compare
                if(deepEqual(part, amberHead)) {
                    snakeCollision = true;
                    // console.log('snakeCollision : ', snakeCollision);
                }
            }

            // nb: version reducer serait stylée..
            return snakeCollision || wallCollision;
        }

        this.eateApple = function (appToEat) {
            amberHead   = this.body[0];
            headX       = amberHead[0];
            headY       = amberHead[1];
            // if(headX === appToEat.pos[0] && headY === appToEat.pos[1]) {
            //     // 1- effacer la pomme
            //     // 2- ajouter une nouvelle pomme random (qui doit être différent de body)
            //     // 3- faire trainer la queue du serpent
            // }
            return (headX === appToEat.pos[0] && headY === appToEat.pos[1]);
        };
    }

    /* Appel constructor */
    function Apple (pos) {
        // console.log('Construit ma pomme ma glotte');
        // appX = this.pos[0] * blockSize + appleRadius;
        // appY = this.pos[1] * blockSize + appleRadius;
        this.pos = pos;
        this.draw = function () {
            context.save(); // enregistre les anciennes conf du canvas
            context.fillStyle = appleColor;
            context.beginPath();
            appX = this.pos[0] * blockSize + appleRadius;
            appY = this.pos[1] * blockSize + appleRadius;
            context.arc(appX, appY, appleRadius, 0, Math.PI*2, true);
            context.fill();
            context.restore(); // restitue les conf sauvegardées du canvas
        };
        
        this.setNewPosition = function () {
            // ask for random numbers
            randomX = getRandomBetween(0, widthInBlocks-1), randomY = getRandomBetween(0, heightInBlocks-1);
            this.pos = [randomX, randomY];
            console.log(`\twidthInBlocks : ${widthInBlocks} \n\theightInBlocks : ${heightInBlocks}`);
            console.log(`\trandomX : ${randomX} \n\trandomY : ${randomY}`);
        };

        this.isOnSnake = function (snakeToCheck) {
            let isOnSnake = false;
            for(const part of snakeToCheck.body) {
                if(deepEqual(part, this.pos)) {
                    isOnSnake = true;
                    return isOnSnake; // or not ?
                }
            }
            return isOnSnake;
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
            case 'Enter':
                if(confirm('Voulez-vous relancer une partie ?')) {
                    clearTimeout(timeoutId)
                    init();
                }
                break;
            default:
                // throw('Unrecognized keycode !');
                return;
            }
        // console.log(newDir);
        snake.setDirection(newDir);        
    });

    /* handle click Remettre compteurs à 0 ?*/
    $('#butt').click(function() {
        if(confirm('Remettre les compteurs à 0 ?')) {
            localStorage.removeItem('localMaxScore');
            localStorage.removeItem('localLastScore');
            localStorage.removeItem('localGamesPlayed');

            getDatas(snake);
        }
    });

    /* AUXILIAIRES FUNCTIONS */
    function init() {
        blocksEaten = 0;
        snake = new Snake([
            [7,4], [6,4], [5,4], [4,4], [3, 4], [2, 4]
        ], dirR);
        getDatas(snake);
        apple = new Apple([10,10]);
        // apple.draw();
        refreshCanvas();
    }
    
    function gameOver(snake) {
        // LocalStorage pour garder le score
        storeGameDatas(snake);

        context.save();
        // CSS
        context.font = 'bold 40px verdana';
        context.textBaseline = 'middle'; //style.fontFamily = 'Verdana', 'Courier New';
        context.strokeStyle = "blue";
        context.textAlign = 'center';
        context.strokeText('GAME OVER', canWidth/2, canHeight/2);
        context.font = 'bold 20px Verdana'
        context.strokeText('Click ENTER to play again', canWidth/2, canHeight/2+40);

        // context.fillText('GAME OVER', 5, 15); //canWidth/2, canHeight/2);
        // context.fillText('Click ENTER to play again', 5, 30);

        // context.fillText('Click ENTER to play again', 5, 30);

        rejouer = confirm('Voulez-vous rejouer ?'); // true = OK, false overwhise
        getDatas(snake);
        if(rejouer) {
            // launch again
            init();
        } else {
            
        }
        context.restore();
    }

    /* allows to persist datas (localStorage) */
    function storeGameDatas(snake) {
        // localMaxScore
        // console.log(`localMaxScore : ${localStorage.getItem('localMaxScore')}`);
        localMaxScore = localStorage.getItem('localMaxScore');
        if(localStorage.getItem('localMaxScore')) {
            // compare with new score
            if(snake.body.length > localMaxScore) {
                localStorage.setItem('localMaxScore', snake.body.length);
            }
        } else {
            localStorage.setItem('localMaxScore', snake.body.length);
        };
        
        // localLastScore
        localStorage.setItem('localLastScore', snake.body.length);

        // localGamesPlayed
        localGamesPlayed = parseInt(localStorage.getItem('localGamesPlayed'));
        if(localGamesPlayed == '0' || isNaN(localGamesPlayed) || (localGamesPlayed === null)) { // hack because if(0) returns false ..
            // create and initiate
            localStorage.setItem('localGamesPlayed', 1);
        } else {
            // +1
            localStorage.setItem('localGamesPlayed', localGamesPlayed+1);
        }
    }

    /* called one time when loading the page (call to launchGame()) */
    function getDatas(snake) {
        // get les éléments
        let maxScore = $('#maxScore');
        let lastScore = $('#lastScore');
        let gamesPlayed = $('#gamesPlayed');

        // set elements
        localMaxScore = localStorage.getItem('localMaxScore');
        maxScore.text(localMaxScore || snake.body.length)

        localLastScore = localStorage.getItem('localLastScore');
        lastScore.text(localLastScore || snake.body.length);

        localGamesPlayed = localStorage.getItem('localGamesPlayed');
        // localGamesPlayed = 0;

        // console.log('getDatas() - localGamesPlayed :', localGamesPlayed);
        if(isNaN(localGamesPlayed || (localGamesPlayed === null))) {
            localGamesPlayed = 0;
        }
        // console.log('getDatas() - localGamesPlayed AFTER SET:', localGamesPlayed);

        gamesPlayed.text(localGamesPlayed || 0);
    }

    /* https://dmitripavlutin.com/how-to-compare-objects-in-javascript/ */
    function shallowEqual(object1, object2) {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);
        if (keys1.length !== keys2.length) {
            return false;
        }
        for (let key of keys1) {
            if (object1[key] !== object2[key]) {
            return false;
            }
        }
        return true;
        }

    /* https://dmitripavlutin.com/how-to-compare-objects-in-javascript/ */
    function deepEqual(object1, object2) {
        //
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);
        if (keys1.length !== keys2.length) {
            return false;
        }
        for (const key of keys1) {
            const val1 = object1[key];
            const val2 = object2[key];
            // reccursive
            const areObjects = isObject(val1) && isObject(val2);
            if (areObjects && !deepEqual(val1, val2) ||
                !areObjects && val1 !== val2) {
                return false;
            }
        }
        return true;
    }

    function isObject(object) {
        return object != null && typeof object === 'object';
    }

    function getRandomBetween(min, max) {
        return Math.floor((max-min + 1) * Math.random() + min);
    }

})