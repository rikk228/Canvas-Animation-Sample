const playbackBTN = document.querySelector('#playback');
playbackBTN.addEventListener('click', move);
let isPlay = false;
let interval;

const resetBTN = document.querySelector('#reset');
resetBTN.addEventListener('click', reset)

const customPropertyBTN = document.querySelector('#apply');
customPropertyBTN.addEventListener('click', customProperty);

const customWidthINP = document.querySelector('#width');
const customHeightINP = document.querySelector('#height');
const customRadiusINP = document.querySelector('#radius');

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

let perf = {
    circle: 0,
    square: 0
}

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
    coords.x += speed.x;
    coords.y += speed.y;
    if(coords.x + width > canvas.width) invertXSpeed();
    else if(coords.x < 0) invertXSpeed();
    if(coords.y + height > canvas.height) invertYSpeed();
    else if(coords.y < 0) invertYSpeed();
}

function moveCircle() {

    clearCanvas()
    drawCircle(coords.circle.x, coords.circle.y, radius);
    coords.circle.x += speed.x;
    coords.circle.y += speed.y;

    if(coords.circle.x + radius > canvas.width) invertXSpeed();
    else if(coords.circle.x - radius < 0) invertXSpeed();
    if(coords.circle.y + radius > canvas.height) invertYSpeed();
    else if(coords.circle.y - radius < 0) invertYSpeed();

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
    width = customWidth();
    height = customHeight();
    radius = customRadius(); 
    reset(null, shape);
}

function shapeSelection() {
    return shapeINP.value;
}

function customWidth() {
    let width = parseInt(customWidthINP.value);
    if(width <= 500 && width > 0) return width;
    return 50;
}

function customHeight() {
    let height = parseInt(customHeightINP.value);
    if(height <= 500) return height;
    return 50;
}

function customRadius() {
    let radius = parseInt(customRadiusINP.value);
    if (radius <= 250) return radius;
    return 25;
}


function invertXSpeed() {
    speed.x = -speed.x;
}
function invertYSpeed() {
    speed.y = -speed.y;
}

window.onload = load;

function load() {
    shape = shapeSelection();
    clearCanvas();
    assignBaseCoord();
    assignBaseSpeed();
    basicSquare();
}
