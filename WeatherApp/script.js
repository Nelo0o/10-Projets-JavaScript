const loader = document.querySelector(".loader-container");
const errorInformation = document.querySelector(".error-information");

const cityName = document.querySelector(".city-name");
const countryName = document.querySelector(".country-name");
const temperature = document.querySelector(".temperature");

async function fetchJSON(url, {headers = {}, json, signal, ...options} = {}) {
    const defaultHeaders = {Accept: "application/json", ...headers};
    const requestHeaders = json
        ? {...defaultHeaders, "Content-Type": "application/json"}
        : defaultHeaders;
    const controller = new AbortController();
    const signalWithAbort = signal ? signal : controller.signal;
    try {
        const response = await fetch(url, {
            ...options,
            headers: requestHeaders,
            signal: signalWithAbort,
        });
        if (!response.ok) {
            throw new Error("Erreur serveur", {cause: response});
        }
        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Le serveur a renvoyé une réponse non JSON.");
        }
        const data = await response.json();
        if (!data) {
            throw new Error("Le serveur a renvoyé une réponse vide.");
        }
        return data;
    } catch (error) {
        if (error.name === "AbortError") {
            throw new Error("La requête a été annulée.");
        } else {
            throw error;
        }
    } finally {
        controller.abort();
    }
}

async function fetchData() {
    try {
        const weatherData = await fetchJSON("http://api.weatherstack.com/current?access_key=1a755789c132f3b82b3015135044fc87&query=Belfort");

        return {
            city: weatherData.location.name,
            country: weatherData.location.country,
            temperature: weatherData.current.temperature,
        };

    } catch (error) {
        handleError(error);
    }
}

function populateUI(data) {
    cityName.textContent = data.city;
    countryName.textContent = data.country;
    temperature.textContent = `${data.temperature}°`;
    loader.classList.remove("active");
}

function handleError(error) {

    errorInformation.textContent = error.message;
}

async function populateWeatherData() {
    try {
        const weatherData = await fetchData();

        populateUI(weatherData);
    } catch (error) {
        handleError(error);
    }
}

populateWeatherData()
    .then(() => {
        console.log("Tout fonctionne normalement !")
    })
    .catch((error) => {
        console.error("Un problème est survenue :", error)
    });
