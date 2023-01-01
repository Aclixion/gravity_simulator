const canvas = document.getElementById("canvas"); // Canvas element
const ctx = canvas.getContext("2d"); // Context for drawing shape

const massInput = document.querySelector(".mass-input"); // Input for mass
const radiusInput = document.querySelector(".radius-input"); // Input for radius
const colorInput = document.querySelector(".color-input"); // Input for color

const G = 6.67e-11; // Gravitational constant (units are m^3/kgs^2)

// Clicked location
let clickedX;
let clickedY;

// Mouse location
let mouseX;
let mouseY;

// Whether or not the mouse is down
let mouseIsDown;

let planetList = []; // Array of all planets on canvas

// Creates a planet object
function Planet(mass, radius, color, positionX=0, positionY=0, velocityX=0, velocityY=0, accelerationX=0, accelerationY=0) {
    this.mass = mass;
    this.radius = radius;
    this.color = color;
    this.position = {
        x: positionX,
        y: positionY
    };
    this.velocity = {
        x: velocityX,
        y: velocityY
    }
    this.acceleration = {
        x: accelerationX,
        y: accelerationY
    }
};

// Adds a planet to planet list
function addPlanet(e) {
    let newPlanet = new Planet(Number(massInput.value), Number(radiusInput.value), colorInput.value, 
    positionX=e.offsetX, positionY=e.offsetY);

    planetList.push(newPlanet);
}

// Updates the position, velocity, and acceleration of each planet
function updateVectors(delta) {
    // Gets old positions of all planets. This is needed to calculate accelerations
    let oldPositions = [];
    for (let i = 0; i < planetList.length; i++) {
        oldPositions.push(planetList[i].position);
    }

    // Converts delta from milliseconds to seconds
    let deltaInSeconds = delta / 1000;
    for (let i = 0; i < planetList.length; i++) {
        // Update planet position
        planetList[i].position.x += planetList[i].velocity.x * deltaInSeconds;
        planetList[i].position.y += planetList[i].velocity.y * deltaInSeconds;
        // Update planet velocity
        planetList[i].velocity.x += planetList[i].acceleration.x * deltaInSeconds;
        planetList[i].velocity.y += planetList[i].acceleration.y * deltaInSeconds;

        // Calculate net force on planet 
        let netForceX = 0;
        let netForceY = 0;
        for (let j = 0; j < planetList.length; j++) {
            if (j !== i) {
                // Calculate displacement vectors for each planet relative to planet at index i
                let distX = oldPositions[j].x - planetList[i].position.x;
                let distY = oldPositions[j].y - planetList[i].position.y;

                let distance = Math.sqrt(distX*distX + distY*distY);

                netForceX += ((G * planetList[j].mass * planetList[i].mass) / (distance*distance)) * (distX / distance);
                netForceY += ((G * planetList[j].mass * planetList[i].mass) / (distance*distance)) * (distY / distance);
            }
        }

        // Update planet acceleration
        planetList[i].acceleration.x = netForceX / planetList[i].mass;
        planetList[i].acceleration.y = netForceY / planetList[i].mass;
    }
}

// Draws a frame in the animation
function drawFrame() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    for (let i = 0; i < planetList.length; i++) {
        ctx.beginPath();
        ctx.arc(planetList[i].position.x, planetList[i].position.y, planetList[i].radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    // Draw planet template when mouse is down
    if (mouseIsDown) {
        // Draws the planet that will be released when the mouse is released
        ctx.beginPath();
        ctx.arc(clickedX, clickedY, Number(radiusInput.value), 0, 2 * Math.PI);
        ctx.stroke();
        
        // Draws the velocity vector.
        //The length of the arrow will indicate how fast the planet will be released.
        // The direction of the arrow will indicate in which direction the planet will be released.
        ctx.beginPath();
        ctx.moveTo(clickedtX, clickedY);
        ctx.lineTo(mouseX, mouseY);
        ctx.moveTo(clickedX, clickedY);
        ctx.stroke();
    }
}

// Run animation
let previousTimestamp = 0;
function step(timestamp) {
    let delta = timestamp - previousTimestamp;
    drawFrame();
    updateVectors(delta);
    previousTimestamp = timestamp;
    window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);

// Change clicked position when mouse is down
canvas.addEventListener("mousedown", (e) => {
    mouseIsDown = true;
    clickedX = e.offsetX;
    clickedY = e.offsetY;
});

// Adds planet when mouse is released
canvas.addEventListener("mouseup", () => {
    mouseIsDown = false;
    let velocityX = mouseX - clickedX;
    let velocityY = mouseY - clickedY;
    let newPlanet = new Planet(Number(massInput.value), Number(radiusInput.value), colorInput.value,
    positionX = clickedX, positionY = clickedY, velocityX = velocityX, velocityY = velocityY);
    planetList.push(newPlanet);
});

// Change mouse position variable when mouse is down and is moved
canvas.addEventListener("mousemove", (e) => {
    if (mouseIsDown) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
});