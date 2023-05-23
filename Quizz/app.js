const responses = ["c", "a", "b", "a", "c"];

const form = document.querySelector(".quiz-form");
form.addEventListener("submit", handleSubmit);

const titleResult = document.querySelector(".results h2");
const markResult = document.querySelector(".mark");
const helpResult = document.querySelector(".help");
const questions = document.querySelectorAll(".question-block");

function handleSubmit(e) {
    e.preventDefault();

    const results = Array.from(document.querySelectorAll("input[type='radio']:checked")).map((radioButton, index) => {
        return radioButton.value === responses[index];
    });

    showResults(results);
    addColors(results);
}

function showResults(results) {
    const errorsNumber = results.filter(el => !el).length;
    const score = results.length - errorsNumber;

    switch (errorsNumber) {
        case 0:
            titleResult.textContent = "✔️ Bravo, c'est un sans faute ! ✔️";
            helpResult.textContent = "Quelle culture ...";
            break;
        case 1:
            titleResult.textContent = "✨ Vous y êtes presque ! ✨";
            helpResult.textContent = "Retentez une autre réponse dans la case rouge, puis re-validez !";
            break;
        case 2:
            titleResult.textContent = "✨ Encore un effort ... 👀";
            helpResult.textContent = "Retentez une autre réponse dans les cases rouges, puis re-validez !";
            break;
        case 3:
            titleResult.textContent = "👀 Il reste quelques erreurs. 😭";
            helpResult.textContent = "Retentez une autre réponse dans les cases rouges, puis re-validez !";
            break;
        case 4:
            titleResult.textContent = "😭 Peut mieux faire ! 😭";
            helpResult.textContent = "Retentez une autre réponse dans les cases rouges, puis re-validez !";
            break;
        case 5:
            titleResult.textContent = "👎 Peut mieux faire ! 👎";
            helpResult.textContent = "Retentez une autre réponse dans les cases rouges, puis re-validez !";
            break;
        default:
            titleResult.textContent = "Wops, cas inattendu.";
    }

    helpResult.style.display = "block";
    markResult.innerHTML = `Score : <span>${score} / ${results.length}</span>`;
    markResult.style.display = "block";
}

function addColors(results) {
    results.forEach((response, index) => {
        questions[index].style.backgroundImage = response
            ? "linear-gradient(to right, #a8ff78, #78ffd6)"
            : "linear-gradient(to right, #f5567b, #fd674c)";
    });
}

const radioInputs = document.querySelectorAll("input[type='radio']");

radioInputs.forEach(radioInput => radioInput.addEventListener("input", resetColor));

function resetColor(e) {
    const index = parseInt(e.target.getAttribute("name").slice(1)) - 1;
    const parentQuestionBlock = questions[index];

    parentQuestionBlock.style.backgroundColor = "#f1f1f1";
    parentQuestionBlock.style.backgroundImage = "none";
}
