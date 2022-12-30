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

