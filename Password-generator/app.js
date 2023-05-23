function getRandomNumber(min, max) {
    const randomNumber = Math.random();
    return Math.floor(randomNumber * (max - min + 1)) + min;
}

function addASet(fromCode, toCode) {
    let charactersList = "";
    for (let i = fromCode; i <= toCode; i++) {
        charactersList += String.fromCharCode(i);
    }
    return charactersList;
}

const charactersSet = {
    lowercaseChars: addASet(97, 122),
    upperCaseChars: addASet(65, 90),
    numbers: addASet(48, 57),
    symbols: addASet(33, 47) + addASet(58, 64) + addASet(91, 96) + addASet(123, 126),
};

const range = document.querySelector("input[type='range']");
const rangeLabel = document.querySelector(".range-group label");

rangeLabel.textContent = `Taille du mot de passe : ${range.value}`;
let passwordLength = range.value;

const passwordContent = document.querySelector(".password-content");
const errorMsg = document.querySelector(".error-msg");
const generateBtn = document.querySelector(".generate-password-btn");
const checkboxes = document.querySelectorAll("input[type='checkbox']");

generateBtn.addEventListener("click", createPassword);

function createPassword() {
    const checkedDataSets = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => charactersSet[checkbox.id]);

    if (!checkedDataSets.length) {
        errorMsg.textContent = "Au moins une case doit être cochée !";
        return;
    } else {
        errorMsg.textContent = "";
    }

    let password = "";

    // Caractères de base
    const passwordBase = checkedDataSets.map(dataSet => dataSet[getRandomNumber(0, dataSet.length - 1)]);

    // Reste du mot de passe
    for (let i = checkedDataSets.length; i < passwordLength; i++) {
        password += checkedDataSets[getRandomNumber(0, checkedDataSets.length - 1)][getRandomNumber(0, password.length - 1)];
    }

    // Mélange
    passwordBase.forEach((item, index) => {
        const randomIndex = getRandomNumber(0, password.length);
        password = password.slice(0, randomIndex) + passwordBase[index] + password.slice(randomIndex);
    });

    passwordContent.textContent = password;
}

createPassword();

range.addEventListener("input", handleRange);

function handleRange(e) {
    passwordLength = e.target.value;
    rangeLabel.textContent = `Taille du mot de passe : ${passwordLength}`;
}

const copyBtn = document.querySelector(".copy-btn");
copyBtn.addEventListener("click", copyPassword);

let locked = false;

function copyPassword() {
    navigator.clipboard.writeText(passwordContent.textContent)
        .then(() => {
            console.log("Le texte a été copié avec succès !");
        })
        .catch((error) => {
            console.error("Une erreur s'est produite lors de la copie du texte :", error);
        });

    if (!locked) {
        copyBtn.classList.add("active");
        locked = true;

        setTimeout(() => {
            copyBtn.classList.remove("active");
            locked = false;
        }, 600);
    }
}
