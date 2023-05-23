const customCursor = document.querySelector(".custom-cursor");

// Écouteur d'événement pour le mouvement de la souris
window.addEventListener("mousemove", handleCustomCursor);

function handleCustomCursor(e) {
    // Met à jour la position du curseur personnalisé en utilisant la translation
    customCursor.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
}

const title = document.querySelector("h1");
const subtitle = document.querySelector(".subtitle");
const heroPushLink = document.querySelector(".hero-push-link");
const txt = "Porsche, set free.";

// Fonction pour effectuer l'effet d'écriture
function typewriter(text, index) {
    // Ajoute la classe "active" à subtitle lorsque l'index est supérieur à 3
    if (index > 3) subtitle.classList.add("active");
    // Ajoute la classe "active" à heroPushLink lorsque l'index est supérieur à 6
    if (index > 6) heroPushLink.classList.add("active");
    if (index < text.length) {
        setTimeout(() => {
            // Ajoute chaque caractère un par un à title avec une légère temporisation
            title.innerHTML += `<span>${text[index]}</span>`;
            typewriter(text, index + 1);
        }, 100);
    }
}

setTimeout(() => {
    // Lance l'effet d'écriture après une temporisation
    typewriter(txt, 0);
}, 300);

// Écouteur d'événement pour le bouton heroPushLink
heroPushLink.addEventListener("click", slideDown);

function slideDown(e) {
    e.preventDefault();
    // Fait défiler vers l'élément spécifié avec une animation fluide
    window.scrollTo({
        top: document.querySelector(`${e.target.getAttribute("href")}`).offsetTop,
        behavior: "smooth",
    });
}

// Animateur de scroll

// Sélectionne les éléments animés généraux
const generalAnimatedElements = [
    ...document.querySelectorAll("h2"),
    ...document.querySelectorAll(".section-subtitle"),
];

// Sélectionne les éléments de la section discover
const discoverSectionElements = [
    document.querySelector(".text-discover-content h3"),
    document.querySelector(".text-discover-content p"),
    document.querySelector(".discover-link"),
    document.querySelector(".discover-main-img"),
];

// Sélectionne les éléments à animer avec l'effet slideInContent
const slideInContent = [
    ...document.querySelectorAll(".side-apparition-container"),
];

// Regroupe tous les éléments animés
const animatedContents = [
    ...generalAnimatedElements,
    ...discoverSectionElements,
    ...slideInContent,
];

// Crée un nouvel observateur d'intersection
const intersectionObserver = new IntersectionObserver(handleIntersect, {
    rootMargin: "-10%",
});

// Observe chaque élément animé
animatedContents.forEach((el) => intersectionObserver.observe(el));

function handleIntersect(entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Ajoute la classe "active" à l'élément lorsqu'il est visible
            entry.target.classList.add("active");
            // Cesse d'observer l'élément une fois qu'il est devenu visible
            intersectionObserver.unobserve(entry.target);
        }
    });
}
