// Sélectionne le canvas et son contexte
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Ajuste la taille du canvas à la taille de la fenêtre
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Classe représentant une particule
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    // Dessine la particule sur le canvas
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // Met à jour la position de la particule et la dessine
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        } else if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

// Crée une instance de particule
const particle1 = new Particle(10, 10, 50, 55, 2, "#f1f1f1");
console.log(particle1);

let particlesArray;

// Initialise le tableau de particules
function init() {
    particlesArray = [];

    const numberOfParticles = (canvas.height * canvas.width) / 9000;

    for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * (innerWidth - 20) + 10;
        const y = Math.random() * (innerHeight - 20) + 10;
        const directionX = cleanDirection();
        const directionY = cleanDirection();

        particlesArray.push(
            new Particle(x, y, directionX, directionY, size, "#f1f1f1")
        );
    }
}

// Génère une direction aléatoire pour les particules
function cleanDirection() {
    const random = Math.random() < 0.5 ? -1 : 1;
    return (Math.random() * random) + 0.5;
}

// Anime les particules
function animate() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }

    connect();

    requestAnimationFrame(animate);
}

// Dessine des connexions entre les particules proches
function connect() {
    for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < particlesArray.length; j++) {
            const squaredDistanceX = (particlesArray[i].x - particlesArray[j].x) ** 2;
            const squaredDistanceY = (particlesArray[i].y - particlesArray[j].y) ** 2;
            const hypothenuse = squaredDistanceX + squaredDistanceY;

            if (hypothenuse < 135 ** 2) {
                ctx.strokeStyle = `rgba(240, 240, 240, ${1 - hypothenuse / (135 ** 2)})`;
                ctx.lineWidth = 0.4;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
}

// Gère le redimensionnement de la fenêtre
function handleResize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
}

// Écouteur d'événement pour le redimensionnement de la fenêtre
window.addEventListener("resize", handleResize);

// Initialise le tableau de particules et lance l'animation
init();
animate();