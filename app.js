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

function clearCanvas(context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function moveSquare() {
    clearCanvas(context);
    drawSquare(pos.x, pos.y, width, height);
    pos.x += speed.x;
    pos.y += speed.y;
    if(pos.x+width > canvas.width) speed.x = -speed.x;
    if(pos.x < 0) speed.x = -speed.x;
    if(pos.y+height > canvas.height) speed.y = -speed.y;
    if(pos.y < 0) speed.y = -speed.y;
    console.log(pos.x-width);
}

setInterval(moveSquare, 16);