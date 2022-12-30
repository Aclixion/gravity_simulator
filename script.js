const canvas = document.getElementById("canvas"); // Canvas element
const ctx = canvas.getContext("2d"); // Context for drawing shape

const massInput = document.querySelector(".mass-input"); // Input for mass
const radiusInput = document.querySelector(".radius-input"); // Input for radius
const colorInput = document.querySelector(".color-input"); // Input for color

const G = 6.67e-11; // Gravitational constant (units are m^3/kgs^2)

let planetList = []; // Array of all planets on canvas

// Creates a planet object
function Planet(mass, radius, color, positionX=0, positionY=0, velocityX=0, velocityY=0, accelerationX=0, accelerationY=0) {
    this.mass = mass;
    this.radius = radius;
    this.color = color;
    this.position = {
        x: 0,
        y: 0,
    };
    this.velocity = {
        x: 0,
        y: 0,
    }
    this.acceleration = {
        x: 0,
        y: 0,
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

        for (let j = 0; j < planetList.length; j++) {
            if (j !== i) {
                // Calculate displacement vectors for each planet relative to planet at index i
                let distX = oldPositions[j].x - planetList[i].position.x;
                let distY = oldPositions[j].y - planetList[i].position.y;
                let distance = Math.sqrt(distX*distX + distY*distY);

                // Update planet acceleration
                planetList[i].acceleration.x = ((G * planetList[j].mass * 10000000000) / distance*distance) * (distX / distance);
                planetList[i].acceleration.y = ((G * planetList[j].mass * 10000000000) / distance*distance) * (distY / distance);
            }
        }
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
}