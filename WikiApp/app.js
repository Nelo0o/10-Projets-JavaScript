const form = document.querySelector("form");
const input = document.querySelector("input");
const errorMsg = document.querySelector(".error-msg");
const resultsDisplay = document.querySelector(".results-display");
const loader = document.querySelector(".loader");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();

    if (input.value === "") {
        showError("Wops, veuillez remplir l'input");
    } else {
        clearError();
        showLoader();
        resultsDisplay.textContent = "";
        wikiApiCall(input.value)
            .then((data) => createCards(data.query.search))
            .catch((error) => {
                showError(error);
                hideLoader();
            });
    }
}

async function wikiApiCall(searchInput) {
    const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
    );

    if (!response.ok) {
        throw new Error(`${response.status}`);
    }

    return response.json();
}

function createCards(data) {
    if (!data.length) {
        showError("Wopsy, aucun résultat");
        hideLoader();
        return;
    }

    const fragment = document.createDocumentFragment();

    data.forEach((el) => {
        el.snippet = undefined;
        el.pageid = undefined;
        const url = `https://en.wikipedia.org/?curid=${el.pageid}`;
        const card = document.createElement("div");
        card.className = "result-item";
        card.innerHTML = `
      <h3 class="result-title">
        <a href=${url} target="_blank">${el.title}</a>
      </h3>
      <a href=${url} class="result-link" target="_blank">${url}</a>
      <span class="result-snippet">${el.snippet}</span>
      <br>
    `;
        fragment.appendChild(card);
    });

    resultsDisplay.appendChild(fragment);
    hideLoader();
}

function showError(message) {
    errorMsg.textContent = message;
}

function clearError() {
    errorMsg.textContent = "";
}

function showLoader() {
    loader.style.display = "flex";
}

function hideLoader() {
    loader.style.display = "none";
}
