const colorLabels = document.querySelectorAll(".input-group label");
const colorPickerInputs = [...document.querySelectorAll("input[type='color']")];
const rangeLabelValue = document.querySelector(".orientation-value");
const rangeInput = document.querySelector(".inp-range");
const copyBtn = document.querySelector(".copy-btn");
const randomGradientBtn = document.querySelector(".random-btn");

const gradientData = {
    angle: 90,
    colors: ["#FF5F6D", "#FFC371"]
};

function populateUI() {
    colorLabels.forEach((label, index) => {
        const color = gradientData.colors[index];
        label.textContent = color;
        label.style.background = color;
        const hexColor = color.replace("#", "");
        const red = parseInt(hexColor.slice(0, 2), 16);
        const green = parseInt(hexColor.slice(2, 4), 16);
        const blue = parseInt(hexColor.slice(4, 6), 16);
        const yiq = (red * 299 + green * 587 + blue * 144) / 1000;
        label.style.color = yiq >= 128 ? "#111" : "#f1f1f1";
    });

    document.body.style.background = `linear-gradient(${gradientData.angle}deg, ${gradientData.colors[0]}, ${gradientData.colors[1]})`;
    rangeLabelValue.textContent = `${gradientData.angle}°`;
}

function handleInclination() {
    gradientData.angle = rangeInput.value;
    rangeLabelValue.textContent = `${gradientData.angle}°`;
    populateUI();
}

function handleColorInputModification(e) {
    const currentIndex = colorPickerInputs.indexOf(e.target);
    gradientData.colors[currentIndex] = e.target.value.toUpperCase();
    populateUI();
}

function handleGradientCopy() {
    const gradient = `linear-gradient(${gradientData.angle}deg, ${gradientData.colors[0]}, ${gradientData.colors[1]})`;

    navigator.clipboard.writeText(gradient)
        .then(() => {
            console.log("Le texte a été copié avec succès !");
        })
        .catch((error) => {
            console.error("Une erreur s'est produite lors de la copie du texte :", error);
        });

    if (copyBtn.classList.contains("active")) return;

    copyBtn.classList.add("active");

    setTimeout(() => {
        copyBtn.classList.remove("active");
    }, 1000);
}

function createRandomGradient() {
    gradientData.colors = Array.from({length: colorLabels.length}, () => `#${Math.floor(Math.random() * 16777215).toString(16)}`);
    populateUI();
}

rangeInput.addEventListener("input", handleInclination);
colorPickerInputs.forEach(input => input.addEventListener("input", handleColorInputModification));
copyBtn.addEventListener("click", handleGradientCopy);
randomGradientBtn.addEventListener("click", createRandomGradient);

populateUI();
