let workTime = 1800;
let restTime = 300;

const displayWork = document.querySelector(".work-display-time");
const displayPause = document.querySelector(".pause-display-time");
const togglePlayBtn = document.querySelector(".toggle-btn");
const cycles = document.querySelector(".cycles");
const resetBtn = document.querySelector(".reset-btn");

let currentInterval = false;
let timerID;
let pause = true;
let cyclesNumber = 0;

function formattedTime(time) {
    return `${Math.trunc(time / 60)}:${time % 60 < 10 ? `0${time % 60}` : time % 60}`
}

function updateDisplay() {
    displayWork.textContent = formattedTime(workTime);
    displayPause.textContent = formattedTime(restTime);
    cycles.textContent = `Cycle(s): ${cyclesNumber}`;
}

function togglePomodoro() {
    if (currentInterval) return;
    currentInterval = true;

    handlePlayPause();

    timerID = setInterval(handleTicks, 1000);
}

function handlePlayPause() {
    pause = !pause;

    if (pause) {
        togglePlayBtn.firstElementChild.src = "images/play.svg";
        togglePlayBtn.setAttribute("data-toggle", "play");
        handleClassAnimation({work: false, rest: false});
    } else {
        togglePlayBtn.firstElementChild.src = "images/pause.svg";
        togglePlayBtn.setAttribute("data-toggle", "pause");
        handleClassAnimation({work: workTime > 0, rest: workTime === 0});
    }
}

function handleClassAnimation(itemState) {
    for (const item in itemState) {
        const element = document.querySelector(`.${item}`);
        if (itemState[item]) {
            element.classList.add("active");
        } else {
            element.classList.remove("active");
        }
    }
}

function handleTicks() {
    if (!pause) {
        if (workTime > 0) {
            workTime--;
            displayWork.textContent = formattedTime(workTime);
            handleClassAnimation({work: true, rest: false});
        } else if (restTime > 0) {
            restTime--;
            displayPause.textContent = formattedTime(restTime);
            handleClassAnimation({work: false, rest: true});
        } else {
            workTime = 1799;
            restTime = 300;
            displayWork.textContent = formattedTime(workTime);
            displayPause.textContent = formattedTime(restTime);
            handleClassAnimation({work: true, rest: false});
            cyclesNumber++;
            cycles.textContent = `Cycle(s): ${cyclesNumber}`;
        }
    }
}

function reset() {
    workTime = 1800;
    restTime = 300;
    cyclesNumber = 0;
    pause = true;
    currentInterval = false;

    clearInterval(timerID);
    updateDisplay();
    handleClassAnimation({work: false, rest: false});
    togglePlayBtn.setAttribute("data-toggle", "play");
    togglePlayBtn.firstElementChild.src = "images/play.svg";
}

togglePlayBtn.addEventListener("click", togglePomodoro);
resetBtn.addEventListener("click", reset);

updateDisplay();
