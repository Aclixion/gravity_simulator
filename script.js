const canvas = document.getElementById("canvas"); // Canvas element
const ctx = canvas.getContext("2d"); // Context for drawing shape

const massInput = document.querySelector(".mass-input"); // Input for mass
const radiusInput = document.querySelector(".radius-input"); // Input for radius
const colorInput = document.querySelector(".color-input"); // Input for color

// Creates a planet object
function Planet(mass, radius, color) {
    this.mass = mass;
    this.radius = radius;
    this.color = color;
    this.position = {
        x: 0,
        y: 0,
        z: 0
    };
    this.velocity = {
        x: 0,
        y: 0,
        z: 0
    }
    this.acceleration = {
        x: 0,
        y: 0,
        z: 0
    }
};