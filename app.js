const playbackBTN = document.querySelector('#playback');
playbackBTN.addEventListener('click', move);
let isPlay = false;
let interval;

const resetBTN = document.querySelector('#reset');
resetBTN.addEventListener('click', reset)

const customPropertyBTN = document.querySelector('#apply');
customPropertyBTN.addEventListener('click', customProperty);

const shapeINP = document.querySelector('#shape');

let shape = 'square';

let canvas = document.querySelector('canvas');

let context = canvas.getContext('2d');

context.fillStyle = 'white';

let width = 50;
let height = 50;
let radius = 25;


let speed;
let coords;

const fps = 60;
const ms = 1000;
const refreshRate = ms/fps;

function assignBaseCoord() {

    const baseCoords = {
        circle: {
            y: (canvas.height/2),
            x: (canvas.width/2)
        },
        y: (canvas.height/2)-(height/2),
        x: (canvas.width/2)-(width/2)
    }
    
    coords = baseCoords;
    
}

function assignBaseSpeed() {
    const baseSpeed = {
        x: -3,
        y: 2
    }

    speed = baseSpeed;
}
function drawSquare(x, y, width, height) {
    context.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2*Math.PI);
    context.fill();
    context.closePath();
}

function basicSquare() {
    context.fillRect(coords.x, coords.y, width, height);
}

function basicCircle() {
    drawCircle(coords.circle.x, coords.circle.y, radius);
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function moveSquare() {
    clearCanvas();
    drawSquare(coords.x, coords.y, width, height);
    coords.x += fps / speed.x;
    coords.y += fps / speed.y;
    if(coords.x + width > canvas.width) speed.x = -speed.x;
    else if(coords.x < 0) speed.x = -speed.x;
    if(coords.y + height > canvas.height) speed.y = -speed.y;
    else if(coords.y < 0) speed.y = -speed.y;
}

function moveCircle() {
    clearCanvas()
    drawCircle(coords.circle.x, coords.circle.y, radius);
    coords.circle.x += fps / speed.x;
    coords.circle.y += fps / speed.y;
    if(coords.circle.x + radius > canvas.width) speed.x = -speed.x;
    else if(coords.circle.x - radius < 0) speed.x = -speed.x;
    if(coords.circle.y + radius > canvas.height) speed.y = -speed.y;
    else if(coords.circle.y - radius < 0) speed.y = -speed.y;
}

function move(evt) {
    
    isPlay = !isPlay;
    clearInterval(interval);
    if(isPlay) {
        if(shape === 'square') interval = setInterval(moveSquare, refreshRate); 
        if(shape === 'circle') interval = setInterval(moveCircle, refreshRate);
        playbackBTN.innerHTML = '<i class="fas fa-pause"></i>';
        return;
    }
    playbackBTN.innerHTML = '<i class="fas fa-play"></i> ';
   
}

function reset(evt, customShape, customSpeed, customCoords) {

    isPlay = false;
    clearInterval(interval);
    playbackBTN.innerHTML = '<i class="fas fa-play"></i> ';
    clearCanvas();

    assignBaseCoord();
    assignBaseSpeed();

    if(customSpeed) speed = customSpeed;
    if(customCoords) coords = customCoords;



    if(shape === 'square' || customShape === 'square') {
        basicSquare();
    }
    if(shape === 'circle' || customShape === 'circle') {
        basicCircle();
    }
}

function customProperty(evt) {
    shape = shapeSelection();
    reset(null, shape);
}

function shapeSelection() {
    return shapeINP.value;
}

window.onload = load;

function load() {
    shape = shapeSelection();
    clearCanvas();
    assignBaseCoord();
    assignBaseSpeed();
    basicSquare();
}
