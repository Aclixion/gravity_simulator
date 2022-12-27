const canvas = document.getElementById("canvas"); // Canvas element
const ctx = canvas.getContext("2d"); // Context for drawing shape

const massInput = document.querySelector(".mass-input"); // Input for mass
const radiusInput = document.querySelector(".radius-input"); // Input for radius
const colorInput = document.querySelector(".color-input"); // Input for color

canvas.addEventListener("click", addPlanet);

function addPlanet(e) {
    ctx.beginPath();
    ctx.arc(e.offsetX, e.offsetY, radiusInput.value, 0, 2 * Math.PI);
    ctx.stroke();
}