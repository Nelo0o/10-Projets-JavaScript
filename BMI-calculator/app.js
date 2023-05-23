const BMIData = [
    {name: "Maigreur", color: "midnightblue", range: [0, 18.5]},
    {name: "Bonne santé", color: "green", range: [18.5, 25]},
    {name: "Surpoids", color: "lightcoral", range: [25, 30]},
    {name: "Obésité modérée", color: "orange", range: [30, 35]},
    {name: "Obésité sévère", color: "crimson", range: [35, 40]},
    {name: "Obésité morbide", color: "purple", range: 40},
];

const form = document.querySelector("form");

form.addEventListener("submit", handleForm);

const [heightInput, weightInput] = document.querySelectorAll("input");

function handleForm(e) {
    e.preventDefault();
    calculateBMI();
}

function validateInput(value) {
    return !isNaN(value) && value > 0;
}

function calculateBMI() {
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    if (!validateInput(height) || !validateInput(weight)) {
        handleError("Veuillez saisir des valeurs numériques positives pour la taille et le poids.");
        return;
    }

    const BMI = (weight / Math.pow(height / 100, 2)).toFixed(1);
    console.log(BMI);

    showResult(BMI);
}

const displayBMI = document.querySelector(".bmi-value");
const result = document.querySelector(".result");

function handleError(errorMessage) {
    displayBMI.textContent = "Erreur";
    displayBMI.style.color = "inherit";
    result.textContent = errorMessage;
}

function showResult(BMI) {
    const rank = BMIData.find((data) => {
        if (BMI >= data.range[0] && BMI < data.range[1]) return data;
        else if (typeof data.range === "number" && BMI >= data.range) return data;
    });

    displayBMI.textContent = BMI;
    displayBMI.style.color = rank.color;
    result.textContent = `Résultat : ${rank.name}`;
}
