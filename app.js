const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const score = document.querySelector("#score");
const timeLeft = document.querySelector("#time-left");
const highScore = document.querySelector("#high-score");
let HighScore = localStorage.getItem("score");

let result = 0;
let hitPosition;
let currentTime = 60;


if(Number(localStorage.getItem("score")) == 0) {
    highScore.textContent = 0;
} else {
    highScore.textContent = HighScore;
}

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove("mole")
    });

    let randomPosition = squares[Math.floor(Math.random() * 9)];
    randomPosition.classList.add("mole");

    hitPosition = randomPosition.id;
}

squares.forEach(square => {
    square.addEventListener("mousedown", () => {
        if(square.id == hitPosition) {
            result++;
            score.textContent = result;
            hitPosition = null;
        }
    });
});

function moveMole() {
    let timerId = null;
    timerId = setInterval(randomSquare, 500);
}

moveMole();

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;
    if(currentTime == 0) {
        if(localStorage.getItem("score") < result) {
            localStorage.setItem("score", result);
        }
        clearInterval(countDownTimerId);
        alert("Your game is over. Score is " + result);
        window.location.reload();
    }
}

let countDownTimerId = setInterval(countDown, 1000);