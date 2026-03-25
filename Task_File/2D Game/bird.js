//board
let board;
let boardWidth= 350;
let boardHeight = 540;
let context;

//bird
let birdWidth = 40;
let birdHeight = 48;
let birdX = boardWidth / 8;  //board ki postion divide krdo
let birdY = boardHeight / 2; //board ki postion hlf krdo
let birdImg;
let bird = {   //bird name ka hmne object create kya hai
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
}

//pipes
let pipeArray = []; //create pipe array
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth; // boardWidth value intialise ho gyi pipex mein
let pipeY = 0; 

let topPipeImg;
let bottomPipeImg;

//physics
let velocityX = -1;   //pipe moving speed set krr skte hai 
let velocityY = 0;    //bird jump velocity
let gravity = 0.2;
let gameOver = false;
let score = 0;   //score intialise

window.onload = function () {
    board = document.getElementById('board');
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d")

    //load image
    birdImg = new Image();
    birdImg.src = "images/images.png";
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }
    topPipeImg = new Image();
    topPipeImg.src = 'images/top.png';
    bottomPipeImg = new Image();
    bottomPipeImg.src = 'images/bottom.png';

    requestAnimationFrame(update);  //function use kya hai animationframe ka
    setInterval(placePipes, 1500)
    document.addEventListener('keydown', moveBird);
    document.addEventListener('touchstart', moveBird);   // ye phn pye use krne ki use krte hai
}
function update() {   //function bnya hai hmne update name ka
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //bird
    velocityY += gravity;
    bird.y = Math.max(bird.y + velocityY,0)   //set limit of bird
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)

    if (bird.y > board.height) {
        gameOver = true
    }

    //pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;  
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height)
        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5;  //two pipe hai ess lye total 1 bnne ga
            pipe.passed = true;
        }
        if (detectCollision(bird, pipe)){ //replace a or b parameters
            gameOver = true;
        }
    } 
    while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift();
    }
    //score
    context.fillStyle = "white";  
    context.font = "45px sans-serif";
    context.fillText(score, 5, 45);

    if (gameOver) {
        context.fillText("GAME OVER!", 45, 300);
    }
}

function placePipes() {
    if (gameOver) {
        return;
    }
    let randomPipeY = pipeY - pipeHeight/4 -Math.random()*(pipeHeight/2);
    let openingSpace = board.height / 3;  //jyada no. divide krne se space km mile gyii
    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y:randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipeArray.push(topPipe);
     let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
     }
    pipeArray.push(bottomPipe);
}

function moveBird(event){
    if (event.code == "Space" || event.code == "ArrowUp" || event.type === "touchstart"){
    //jump
    velocityY = -6; //agr hm scroll uper krte hai toh value -ve hoti aa aur niche krte hai toh +ve hoti hai
    }
    //reset game
    if (gameOver) {
        bird.y = birdY;
        pipeArray = [];
        score = 0;
        gameOver = false;
    }
}
function detectCollision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.x + a.height > b.y;
 }
