const video = document.querySelector(".video");
const playToggler = document.querySelector(".play-toggler");
const togglerImg = document.querySelector(".play-toggler img");
const timersDisplay = document.querySelectorAll(".time-display");
const progress = document.querySelector(".progress");
const muteBtn = document.querySelector(".mute-btn");
const muteIcon = document.querySelector(".mute-btn img");
const volumeSlider = document.querySelector(".volume-slider");
const progressBar = document.querySelector(".progress-bar");
const fullScreenToggler = document.querySelector(".fullscreen-toggler");
const videoContainer = document.querySelector(".video-container");

let current = 0;
let totalDuration = 0;
let rect = progressBar.getBoundingClientRect();
let largeur = rect.width;

// Fonction pour mettre en pause ou reprendre la lecture de la vidéo
function togglePlay() {
    if (video.paused) {
        togglerImg.src = "images/pause.svg";
        video.play();
    } else {
        togglerImg.src = "images/play.svg";
        video.pause();
    }
}

// Écouteurs d'événements pour la lecture/pause de la vidéo
video.addEventListener("click", togglePlay);
playToggler.addEventListener("click", togglePlay);

// Fonction pour formater la valeur de temps en minutes:secondes
function formatValue(val, element) {
    const currentMin = Math.trunc(val / 60);
    let currentSec = Math.trunc(val % 60);

    if (currentSec < 10) {
        currentSec = `0${currentSec}`;
    }

    element.textContent = `${currentMin}:${currentSec}`;
}

// Fonction pour mettre à jour l'affichage du temps et de la progression
function updateProgress() {
    current = video.currentTime;
    formatValue(current, timersDisplay[0]);

    const progressPosition = (current / totalDuration) * 100;
    progress.style.width = `${progressPosition}%`;

    if (video.ended) {
        togglerImg.src = "images/play.svg";
    }
}

// Écouteur d'événement pour mettre à jour la progression lors de la lecture
video.addEventListener("timeupdate", updateProgress);

// Fonction pour activer/désactiver le son de la vidéo
function handleMute() {
    video.muted = !video.muted;
    muteIcon.src = video.muted ? "images/mute.svg" : "images/unmute.svg";
}

// Écouteur d'événement pour activer/désactiver le son
muteBtn.addEventListener("click", handleMute);

// Fonction pour gérer la modification du volume
function handleVolumeModification() {
    video.volume = volumeSlider.value / 100;
    muteIcon.src = video.volume === 0 ? "images/mute.svg" : "images/unmute.svg";
}

// Écouteur d'événement pour la modification du volume
volumeSlider.addEventListener("input", handleVolumeModification);

// Fonction pour gérer le déplacement dans la vidéo en fonction du clic sur la barre de progression
function handleProgressNavigation(e) {
    const x = e.clientX - rect.left;
    const widthPercent = (x / largeur) * 100;
    const currentTime = (widthPercent / 100) * totalDuration;
    video.currentTime = currentTime;
}

// Écouteur d'événement pour la navigation dans la vidéo via la barre de progression
progressBar.addEventListener("click", handleProgressNavigation);

// Fonction pour activer/désactiver le mode plein écran de la vidéo
function toggleFullScreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen()
            .then(() => {
                console.log("Vidéo remise à l'état initial avec succès !");
            })
            .catch((error) => {
                console.error("Une erreur s'est produite :", error);
            });
    } else {
        videoContainer.requestFullscreen()
            .then(() => {
                console.log("Vidéo mise en plein écran avec succès !");
            })
            .catch((error) => {
                console.error("Une erreur s'est produite :", error);
            });
    }
}

// Écouteurs d'événements pour activer/désactiver le mode plein écran
video.addEventListener("dblclick", toggleFullScreen);
fullScreenToggler.addEventListener("click", toggleFullScreen);

// Fonction pour remplir les variables de durée de la vidéo lorsqu'elle est chargée
function fillDurationVariables() {
    if (!Number.isNaN(video.duration) && video.duration > 0) {
        current = video.currentTime;
        totalDuration = video.duration;
        formatValue(current, timersDisplay[0]);
        formatValue(totalDuration, timersDisplay[1]);
        video.removeEventListener("loadeddata", fillDurationVariables);
        window.removeEventListener("load", fillDurationVariables);
    }
}

// Écouteurs d'événements pour remplir les variables de durée de la vidéo
video.addEventListener("loadeddata", fillDurationVariables);
window.addEventListener("load", fillDurationVariables);
