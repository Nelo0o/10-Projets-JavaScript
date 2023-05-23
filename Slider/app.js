const slides = [...document.querySelectorAll(".slide")];
const directionButtons = [...document.querySelectorAll(".direction-btn")];

const sliderData = {
    locked: false,
    direction: 0,
    slideOutIndex: 0,
    slideInIndex: 0
};

directionButtons.forEach(btn => btn.addEventListener("click", handleClick));

function handleClick(e) {
    if (sliderData.locked) return;
    sliderData.locked = true;

    getDirection(e.target);
    slideOut();
}

function getDirection(btn) {
    const className = btn.className;
    sliderData.direction = className.includes("right") ? 1 : -1;
    sliderData.slideOutIndex = slides.findIndex(slide => slide.classList.contains("active"));
    sliderData.slideInIndex = (sliderData.slideOutIndex + sliderData.direction + slides.length) % slides.length;
}

function slideOut() {
    const slideInElement = slides[sliderData.slideInIndex];
    const slideOutElement = slides[sliderData.slideOutIndex];

    slideAnimation(slideInElement, {
        display: "flex",
        transform: `translateX(${sliderData.direction < 0 ? "100%" : "-100%"})`,
        opacity: 0
    });

    slideOutElement.addEventListener("transitionend", slideIn);

    slideAnimation(slideOutElement, {
        transition: "transform 0.4s cubic-bezier(0.74, -0.34, 1, 1.19), opacity 0.4s ease-out",
        transform: `translateX(${sliderData.direction < 0 ? "-100%" : "100%"})`,
        opacity: 0
    });
}

function slideAnimation(element, props) {
    for (const prop in props) {
        element.style[prop] = props[prop];
    }
}

function slideIn(e) {
    const slideInElement = slides[sliderData.slideInIndex];
    const slideOutElement = slides[sliderData.slideOutIndex];

    slideAnimation(slideInElement, {
        transition: "transform 0.4s ease-out, opacity 0.6s ease-out",
        transform: "translateX(0%)",
        opacity: 1
    });

    slideInElement.classList.add("active");
    slideOutElement.classList.remove("active");
    slideOutElement.style.display = "none";
    e.target.removeEventListener("transitionend", slideIn);

    setTimeout(() => {
        sliderData.locked = false;
    }, 400);
}
