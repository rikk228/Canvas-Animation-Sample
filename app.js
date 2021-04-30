let playbackBTN = document.querySelector('#playback');
playbackBTN.addEventListener('click', move);
let isPlay = false;
let interval;

let resetBTN = document.querySelector('#reset');
resetBTN.addEventListener('click', reset)

const canvas = document.querySelector('canvas');

let context = canvas.getContext('2d');

context.fillStyle = 'white';

let width = 50;
let height = 50;
let radius = 25;

let speed = {
    x: -3,
    y: 2
}

let pos = {
    circle: {
        y: (canvas.height/2)-(radius/2),
        x: (canvas.width/2)-(radius/2)
    },
    y: (canvas.height/2)-(height/2),
    x: (canvas.width/2)-(width/2)
}

function drawSquare(x, y, width, height) {
    context.fillRect(x, y, width, height);
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function moveSquare() {
    clearCanvas();
    drawSquare(pos.x, pos.y, width, height);
    pos.x += speed.x;
    pos.y += speed.y;
    if(pos.x+width > canvas.width) speed.x = -speed.x;
    if(pos.x < 0) speed.x = -speed.x;
    if(pos.y+height > canvas.height) speed.y = -speed.y;
    if(pos.y < 0) speed.y = -speed.y;
}

function move() {
    
    isPlay = !isPlay;
    
    if(isPlay) {
        interval = setInterval(moveSquare, 16); 
        playbackBTN.innerHTML = '<i class="fas fa-pause"></i>';
        return; 
    }
    playbackBTN.innerHTML = '<i class="fas fa-play"></i> ';
    clearInterval(interval);
}

function reset() {
    isPlay = false;
    clearInterval(interval);
    playbackBTN.innerHTML = '<i class="fas fa-play"></i> ';
    clearCanvas();

    let basePos = {
        circle: {
            y: (canvas.height/2)-(radius/2),
            x: (canvas.width/2)-(radius/2)
        },
        y: (canvas.height/2)-(height/2),
        x: (canvas.width/2)-(width/2)
    }

    let baseSpeed = {
        x: -3,
        y: 2
    }

    speed = baseSpeed;
    pos = basePos;
}