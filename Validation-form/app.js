const inputsValidity = {
    user: false,
    email: false,
    password: false,
    passwordConfirmation: false
};

const form = document.querySelector("form");
const container = document.querySelector(".container");
const validationIcons = document.querySelectorAll(".icone-verif");

form.addEventListener("submit", handleForm);

let isAnimating = false;

function handleForm(e) {
    e.preventDefault();

    const failedInputs = Object.keys(inputsValidity).filter(key => !inputsValidity[key]);

    if (failedInputs.length && !isAnimating) {
        isAnimating = true;
        container.classList.add("shake");

        setTimeout(() => {
            container.classList.remove("shake");
            isAnimating = false;
        }, 400);

        failedInputs.forEach(input => {
            const index = Object.keys(inputsValidity).indexOf(input);
            showValidation({index: index, validation: false});
        });
    } else {
        alert("Données envoyées avec succès.");
    }
}

function showValidation({index, validation}) {
    const validationIcons = document.querySelectorAll(".icone-verif");
    const validationTexts = document.querySelectorAll(".error-msg");

    if (validation) {
        validationIcons[index].style.display = "inline";
        validationIcons[index].src = "images/check.svg";
        if (validationTexts[index]) validationTexts[index].style.display = "none";
    } else {
        validationIcons[index].style.display = "inline";
        validationIcons[index].src = "images/error.svg";
        if (validationTexts[index]) validationTexts[index].style.display = "block";
    }
}

function handleInputValidation(inputElement, validationIndex, validationFn) {
    inputElement.addEventListener("blur", () => validationFn(inputElement, validationIndex));
    inputElement.addEventListener("input", () => validationFn(inputElement, validationIndex));
}

const userInput = document.querySelector(".input-group:nth-child(1) input");
handleInputValidation(userInput, 0, userValidation);

function userValidation(inputElement, validationIndex) {
    const inputValue = inputElement.value;

    if (inputValue.length >= 3) {
        showValidation({index: validationIndex, validation: true});
        inputsValidity.user = true;
    } else {
        showValidation({index: validationIndex, validation: false});
        inputsValidity.user = false;
    }
}

const mailInput = document.querySelector(".input-group:nth-child(2) input");
handleInputValidation(mailInput, 1, mailValidation);

const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

function mailValidation(inputElement, validationIndex) {
    const inputValue = inputElement.value;

    if (regexEmail.test(inputValue)) {
        showValidation({index: validationIndex, validation: true});
        inputsValidity.email = true;
    } else {
        showValidation({index: validationIndex, validation: false});
        inputsValidity.email = false;
    }
}

const pswInput = document.querySelector(".input-group:nth-child(3) input");
handleInputValidation(pswInput, 2, passwordValidation);

const passwordVerification = {
    length: false,
    symbol: false,
    number: false
};

const regexList = {
    symbol: /[^a-zA-Z0-9\s]/,
    number: /[0-9]/
};

let passwordValue;

function passwordValidation(inputElement, validationIndex) {
    passwordValue = inputElement.value;
    let validationResult = 0;

    for (const prop in passwordVerification) {
        if (prop === "length") {
            if (passwordValue.length < 6) {
                passwordVerification.length = false;
            } else {
                passwordVerification.length = true;
                validationResult++;
            }
            continue;
        }

        if (regexList[prop].test(passwordValue)) {
            passwordVerification[prop] = true;
            validationResult++;
        } else {
            passwordVerification[prop] = false;
        }
    }

    if (validationResult !== 3) {
        showValidation({index: validationIndex, validation: false});
        inputsValidity.password = false;
    } else {
        showValidation({index: validationIndex, validation: true});
        inputsValidity.password = true;
    }

    passwordStrength();
}

const lines = document.querySelectorAll(".lines div");

function passwordStrength() {
    const passwordLength = pswInput.value.length;

    if (!passwordLength) {
        addLines(0);
    } else if (passwordLength > 9 && passwordVerification.symbol && passwordVerification.number) {
        addLines(3);
    } else if (passwordLength > 6 && (passwordVerification.symbol || passwordVerification.number)) {
        addLines(2);
    } else {
        addLines(1);
    }

    function addLines(numberOfLines) {
        lines.forEach((el, index) => {
            el.style.display = index < numberOfLines ? "block" : "none";
        });
    }

    if (validationIcons[3].style.display === "inline") {
        confirmPassword();
    }
}

const confirmInput = document.querySelector(".input-group:nth-child(4) input");
handleInputValidation(confirmInput, 3, confirmPassword);

function confirmPassword() {
    const confirmedValue = confirmInput.value;

    if (!confirmedValue && !passwordValue) {
        showValidation({index: 3, validation: false});
    } else if (confirmedValue !== passwordValue) {
        showValidation({index: 3, validation: false});
        inputsValidity.passwordConfirmation = false;
    } else {
        showValidation({index: 3, validation: true});
        inputsValidity.passwordConfirmation = true;
    }
}
