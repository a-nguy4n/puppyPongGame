
const puppyImg = document.getElementById("samoyChar");  
const player = document.getElementById("player");
const deathZone = document.getElementById("deathzone");
const score = document.getElementById("points");         
const time = document.getElementById("timer");   

let imgX = 0;
let imgY = 0;
let playerX = 0;

function updateX(){
    return imgX;
}

function updateY(){
    return imgY;
}

function movePlayer(newXCoord){
    const playerWidth = player.offsetWidth;
    const browserWidth = window.innerWidth;

    if (newXCoord < 0){
        playerX = 0;
    } 
    else if (newXCoord + playerWidth > browserWidth){
        playerX = browserWidth - playerWidth;
    } 
    else{
        playerX = newXCoord;
    }

    player.style.left = playerX + "px";
}

let timeCount = 0;
let scoreBoard = 0;
let gameFinished = true;
let speedX = 2;
let speedY = 2;

function updateImagePosition(){
    if (gameFinished) return;

    imgX += speedX;
    imgY += speedY;

    const imgWidth = puppyImg.offsetWidth;
    const imgHeight = puppyImg.offsetHeight;
    const browserWidth = window.innerWidth;
    const browserHeight = window.innerHeight;

    // bounce left/right
    if (imgX <= 0) {
        imgX = 0;
        speedX = Math.abs(speedX);
    }
    if (imgX + imgWidth >= browserWidth){
        imgX = browserWidth - imgWidth;
        speedX = -Math.abs(speedX);
    }

    // bounce top
    if (imgY <= 0){
        imgY = 0;
        speedY = Math.abs(speedY);
    }

    // death zone collision
    if (imgY + imgHeight >= browserHeight){
        const playerWidth = player.offsetWidth;

        if (imgX + imgWidth >= playerX && imgX <= playerX + playerWidth){
            scoreBoard++;
            score.textContent = 'Score: ' + scoreBoard;
            speedY = -Math.abs(speedY);
        } 
        else{
            gameOver();
        }
    }

    puppyImg.style.left = imgX + "px";
    puppyImg.style.top = imgY + "px";
}

let gameLoop;
let gameCounter;

function startGame(){
    gameFinished = false;

    gameLoop = setInterval(updateImagePosition, 7);
    gameCounter = setInterval(timeTracker, 1000);
}

function gameOver(){
    gameFinished = true;
    clearInterval(gameLoop);
    clearInterval(gameCounter);

    // showing the Game Over popup
    document.getElementById("gameOverPopUp").classList.remove("reveal");
}

function timeTracker(){
    if (!gameFinished) {
        timeCount++;
        time.textContent = "Time: " + timeCount + " secs";
    }
}

document.addEventListener("mousemove", (e) => {
    movePlayer(e.clientX);
});

// starting game after user hits the "Let's Go" button in popup 
const goButton = document.getElementById("letsGo");
const howToPopup = document.getElementById("howToPopUp");

goButton.addEventListener("click", () => {
    howToPopup.style.display = "none";

    imgX = 0;
    imgY = 0;

    setTimeout(startGame, 1000); 
});

// try again button 
const replayButton = document.getElementById("replay");
replayButton.addEventListener("click", () => {
    // hiding the "Game Over" popup
    document.getElementById("gameOverPopUp").classList.add("reveal");

    // reset game state
    imgX = 0;
    imgY = 0;
    puppyImg.style.left = "0px";
    puppyImg.style.top = "0px";

    timeCount = 0;
    scoreBoard = 0;
    speedX = 2;
    speedY = 2;
    gameFinished = false;

    score.textContent = "Score: 0";
    time.textContent = "Time: 0 secs";

    setTimeout(startGame, 1000); 
});


// const gameLoop = setInterval(updateImagePosition, 20);
// const gameCounter = setInterval(timeTracker, 1000);
